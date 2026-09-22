import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import lighthouse from 'lighthouse';

const root = process.cwd();
const distDir = path.resolve(root, 'dist');
const chromePath = '/home/oscar/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';
const libDir = '/home/oscar/code/duartes-auto-detailing/.agents/libs/usr/lib/x86_64-linux-gnu';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function createStaticServer(port = 4321) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
      if (reqPath.endsWith('/')) reqPath += 'index.html';
      let filePath = path.join(distDir, reqPath);

      if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
        filePath += '.html';
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }

      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

function launchChrome(port = 9222) {
  const child = spawn(
    chromePath,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      `--remote-debugging-port=${port}`,
    ],
    {
      env: {
        ...process.env,
        LD_LIBRARY_PATH: `${libDir}:${process.env.LD_LIBRARY_PATH || ''}`,
      },
      stdio: 'ignore',
    }
  );

  return new Promise((resolve, reject) => {
    const checkPort = async (retries = 20) => {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) return resolve(child);
      } catch {}
      if (retries <= 0) return reject(new Error('Timed out waiting for Chrome debugging port'));
      setTimeout(() => checkPort(retries - 1), 250);
    };
    checkPort();
  });
}

async function auditUrl(url, preset, port) {
  const options = {
    port,
    logLevel: 'error',
    output: 'json',
  };

  const config = preset === 'desktop'
    ? {
        extends: 'lighthouse:default',
        settings: {
          formFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
          throttling: {
            rttMs: 40,
            throughputKbps: 10 * 1024,
            cpuSlowdownMultiplier: 1,
          },
        },
      }
    : {
        extends: 'lighthouse:default',
        settings: {
          formFactor: 'mobile',
        },
      };

  const runnerResult = await lighthouse(url, options, config);
  const { categories, audits } = runnerResult.lhr;

  const opportunities = Object.entries(audits)
    .filter(([_, a]) => a.details?.type === 'opportunity' && typeof a.score === 'number' && a.score < 0.9)
    .map(([id, a]) => ({ id, title: a.title, savings: a.displayValue || '' }));

  const diagnostics = Object.entries(audits)
    .filter(([id, a]) => ['largest-contentful-paint-element', 'render-blocking-resources', 'layout-shifts'].includes(id) && typeof a.score === 'number' && a.score < 0.9)
    .map(([id, a]) => ({ id, title: a.title, value: a.displayValue || '' }));

  const categoryIssues = {};
  for (const [catId, cat] of Object.entries(categories)) {
    if (cat && typeof cat.score === 'number' && cat.score < 1) {
      categoryIssues[catId] = cat.auditRefs
        .filter(ref => audits[ref.id]?.score !== null && audits[ref.id]?.score < 1)
        .map(ref => ({ id: ref.id, title: audits[ref.id]?.title, items: audits[ref.id]?.details?.items }));
    }
  }

  return {
    scores: {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
    },
    metrics: {
      fcp: audits['first-contentful-paint']?.displayValue,
      lcp: audits['largest-contentful-paint']?.displayValue,
      tbt: audits['total-blocking-time']?.displayValue,
      cls: audits['cumulative-layout-shift']?.displayValue,
      speedIndex: audits['speed-index']?.displayValue,
    },
    opportunities,
    diagnostics,
    categoryIssues,
    lcpElement: audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet || audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.nodeLabel,
  };
}

async function run() {
  const port = 54321;
  const cdpPort = 9223;
  console.log(`🚀 Starting local static server on http://127.0.0.1:${port} ...`);
  const server = await createStaticServer(port);

  console.log(`🌐 Launching headless Chromium on port ${cdpPort} ...`);
  const chrome = await launchChrome(cdpPort);

  try {
    const pathArg = process.argv.find(a => a.startsWith('--path='))?.split('=')[1] || '/';
    const cleanRoute = pathArg.startsWith('/') ? pathArg : `/${pathArg}`;
    const normalizedRoute = cleanRoute.endsWith('/') ? cleanRoute : `${cleanRoute}/`;
    const enRoute = normalizedRoute;
    const esRoute = normalizedRoute === '/' ? '/es/' : `/es${normalizedRoute}`;
    const pageName = normalizedRoute === '/' ? 'Home' : normalizedRoute.replace(/\//g, ' ').trim().toUpperCase();

    const targets = [
      { name: `${pageName} EN (Desktop)`, url: `http://127.0.0.1:${port}${enRoute}`, preset: 'desktop' },
      { name: `${pageName} EN (Mobile)`,  url: `http://127.0.0.1:${port}${enRoute}`, preset: 'mobile' },
      { name: `${pageName} ES (Desktop)`, url: `http://127.0.0.1:${port}${esRoute}`, preset: 'desktop' },
      { name: `${pageName} ES (Mobile)`,  url: `http://127.0.0.1:${port}${esRoute}`, preset: 'mobile' },
    ];

    const results = [];

    for (const target of targets) {
      console.log(`\n⏳ Running Lighthouse for ${target.name} (${target.url}) ...`);
      const result = await auditUrl(target.url, target.preset, cdpPort);
      results.push({ target: target.name, ...result.scores, ...result.metrics, opportunities: result.opportunities, categoryIssues: result.categoryIssues });
    }

    console.log('\n📊 === LIGHTHOUSE AUDIT RESULTS ===\n');
    console.table(results.map(r => ({
      Target: r.target,
      Performance: r.performance,
      Accessibility: r.accessibility,
      'Best Practices': r.bestPractices,
      SEO: r.seo,
      LCP: r.lcp,
      CLS: r.cls,
      TBT: r.tbt,
    })));

    for (const r of results) {
      if (r.metrics?.lcp) {
        const lcpItem = r.lcpElement ? ` (element: ${r.lcpElement})` : '';
        console.log(`\n🎯 LCP for ${r.target}: ${r.metrics.lcp}${lcpItem}`);
      }
      if (r.opportunities && r.opportunities.length > 0) {
        console.log(`\n💡 Opportunities for ${r.target}:`);
        for (const opp of r.opportunities) {
          console.log(`   - ${opp.title}: ${opp.savings}`);
        }
      }
      if (r.categoryIssues && Object.keys(r.categoryIssues).length > 0) {
        console.log(`\n⚠️ Category Issues for ${r.target}:`);
        for (const [cat, issues] of Object.entries(r.categoryIssues)) {
          if (issues.length > 0) {
            console.log(`   [${cat}]:`);
            for (const issue of issues) {
              console.log(`     - ${issue.title}`);
              if (issue.items && issue.items.length > 0) {
                console.log(`       Nodes: ${issue.items.map(i => i.node?.snippet || i.node?.selector || '').filter(Boolean).slice(0, 3).join(' | ')}`);
              }
            }
          }
        }
      }
    }

  } finally {
    console.log('\n🧹 Cleaning up processes...');
    chrome.kill();
    server.close();
  }
}

run().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
