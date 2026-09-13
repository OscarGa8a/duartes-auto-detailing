#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import process from 'node:process';

const DEFAULT_URL = 'https://duartesautodetailing.com/';
const LIGHTHOUSE_VERSION = '13.4.1';
const DEFAULT_WINDOWS_CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MAX_RUNS = 10;
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const LAB_AUDITS = {
  fcp: 'first-contentful-paint',
  lcp: 'largest-contentful-paint',
  speedIndex: 'speed-index',
  tbt: 'total-blocking-time',
  cls: 'cumulative-layout-shift',
};

function printHelp() {
  console.log(`Usage: pnpm audit:lighthouse:production

Audits production HTTPS only. Configuration:
  LIGHTHOUSE_URL         Production HTTPS URL (default: ${DEFAULT_URL})
  LIGHTHOUSE_RUNS        Sequential runs per profile, 1-${MAX_RUNS} (default: 3)
  LIGHTHOUSE_REPORT_DIR  Directory for LHR JSON and summary.json (default: OS temp)
  CHROME_PATH            Explicit Chrome executable path

WSL runs the pinned Windows Lighthouse CLI (${LIGHTHOUSE_VERSION}) from a Windows-local temporary directory. Reports are controlled lab measurements; TBT is a lab responsiveness proxy, not field INP.`);
}

function fail(message) {
  throw new Error(message);
}

function parseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`LIGHTHOUSE_URL must be a valid production HTTPS URL; received ${JSON.stringify(value)}.`);
  }
  if (url.protocol !== 'https:') {
    fail(`LIGHTHOUSE_URL must use HTTPS; received ${url.href}. Astro dev/dist targets are not supported.`);
  }
  return url.href;
}

function parseRuns(value) {
  if (!/^\d+$/.test(value)) fail(`LIGHTHOUSE_RUNS must be an integer from 1 to ${MAX_RUNS}; received ${JSON.stringify(value)}.`);
  const runs = Number(value);
  if (!Number.isSafeInteger(runs) || runs < 1 || runs > MAX_RUNS) fail(`LIGHTHOUSE_RUNS must be an integer from 1 to ${MAX_RUNS}; received ${JSON.stringify(value)}.`);
  return runs;
}

function isWsl() {
  return process.platform === 'linux' && /microsoft|wsl/i.test(os.release());
}

function quotePowerShell(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

function wslpath(direction, value) {
  const result = spawnSync('wslpath', [direction, value], { encoding: 'utf8' });
  if (result.status !== 0 || !result.stdout.trim()) fail(`Unable to convert path for WSL/Windows execution: ${value}`);
  return result.stdout.trim();
}

function toWindowsPath(value) {
  return isWsl() && path.isAbsolute(value) ? wslpath('-w', value) : value;
}

function toHostPath(value) {
  return isWsl() ? wslpath('-u', value) : value;
}

function runPowerShell(command, { capture = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', ['-NoProfile', '-Command', command], {
      stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    });
    let stdout = '';
    let stderr = '';
    if (capture) {
      child.stdout.on('data', (chunk) => { stdout += chunk; });
      child.stderr.on('data', (chunk) => { stderr += chunk; });
    }
    child.once('error', (error) => reject(new Error(`Unable to start PowerShell: ${error.message}. This WSL runner requires powershell.exe and Windows Node/npm.`)));
    child.once('exit', (code, signal) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`Windows Lighthouse command failed (${signal ? `signal ${signal}` : `exit ${code}`})${stderr.trim() ? `: ${stderr.trim()}` : ''}`));
    });
  });
}

async function makeWindowsTempDirectory(prefix) {
  const command = `$directory = Join-Path ([IO.Path]::GetTempPath()) ${quotePowerShell(`${prefix}-${process.pid}-${Date.now()}`)}; [IO.Directory]::CreateDirectory($directory) | Out-Null; Write-Output $directory`;
  const { stdout } = await runPowerShell(command, { capture: true });
  const directory = stdout.trim();
  if (!directory) fail('PowerShell did not return a Windows temporary directory.');
  return directory;
}

function resolveChromePath() {
  const configured = process.env.CHROME_PATH;
  const chromePath = configured ? toWindowsPath(configured) : DEFAULT_WINDOWS_CHROME;
  return chromePath;
}

async function assertWindowsPrerequisites(chromePath) {
  const command = `if (-not (Test-Path -LiteralPath ${quotePowerShell(chromePath)} -PathType Leaf)) { Write-Error ${quotePowerShell(`Chrome was not found at ${chromePath}. Set CHROME_PATH to an installed chrome.exe.`)}; exit 1 }; if (-not (Get-Command npx.cmd -ErrorAction SilentlyContinue)) { Write-Error 'npx.cmd was not found. Install Node.js for Windows so the pinned Lighthouse CLI can run.'; exit 1 }`;
  await runPowerShell(command, { capture: true });
}

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function numberOrNull(value) {
  return Number.isFinite(value) ? value : null;
}

function extractRun(lhr, index, reportFile) {
  const scores = Object.fromEntries(CATEGORIES.map((category) => [category, numberOrNull(lhr.categories[category]?.score == null ? NaN : lhr.categories[category].score * 100)]));
  const labMetrics = Object.fromEntries(Object.entries(LAB_AUDITS).map(([name, audit]) => [name, numberOrNull(lhr.audits[audit]?.numericValue)]));
  return { run: index, reportFile, scores, labMetrics };
}

function summarizeProfile(profile, config, runs) {
  return {
    profile,
    config,
    runs,
    medianScores: Object.fromEntries(CATEGORIES.map((category) => [category, median(runs.map((run) => run.scores[category]))])),
    medianLabMetrics: Object.fromEntries(Object.keys(LAB_AUDITS).map((metric) => [metric, median(runs.map((run) => run.labMetrics[metric]))])),
  };
}

async function windowsFileExists(filePath) {
  const command = `if (Test-Path -LiteralPath ${quotePowerShell(filePath)} -PathType Leaf) { exit 0 }; exit 1`;
  try {
    await runPowerShell(command, { capture: true });
    return true;
  } catch {
    return false;
  }
}

async function removeWindowsDirectory(directory) {
  await runPowerShell(`if (Test-Path -LiteralPath ${quotePowerShell(directory)}) { Remove-Item -LiteralPath ${quotePowerShell(directory)} -Recurse -Force }`, { capture: true }).catch(() => {});
}

async function clearReportFile(reportPath) {
  const quotedPath = quotePowerShell(reportPath);
  const command = [
    `if (Test-Path -LiteralPath ${quotedPath}) {`,
    `  if (-not (Test-Path -LiteralPath ${quotedPath} -PathType Leaf)) { Write-Error 'Lighthouse report path exists but is not a file.'; exit 1 }`,
    `  Remove-Item -LiteralPath ${quotedPath} -Force -ErrorAction Stop`,
    '}',
    `if (Test-Path -LiteralPath ${quotedPath}) { Write-Error 'Unable to clear the existing Lighthouse report file.'; exit 1 }`,
  ].join('; ');
  await runPowerShell(command, { capture: true });
}

async function hasUsableLhr(reportPath) {
  try {
    const lhr = JSON.parse(await readFile(toHostPath(reportPath), 'utf8'));
    return !lhr.runtimeError
      && typeof lhr.lighthouseVersion === 'string'
      && CATEGORIES.every((category) => Number.isFinite(lhr.categories?.[category]?.score));
  } catch {
    return false;
  }
}

async function runWindowsLighthouse({ executionDir, targetUrl, chromePath, profile, reportPath }) {
  await clearReportFile(reportPath);
  const chromeProfileDir = await makeWindowsTempDirectory('lighthouse-chrome-profile');
  const argumentsForCli = [
    quotePowerShell(targetUrl),
    "'--output=json'",
    `--output-path=${quotePowerShell(reportPath)}`,
    `--only-categories=${quotePowerShell(CATEGORIES.join(','))}`,
    `--chrome-path=${quotePowerShell(chromePath)}`,
    `--chrome-flags=${quotePowerShell(`--user-data-dir=${chromeProfileDir} --no-first-run --no-default-browser-check`)}`,
  ];
  if (profile === 'desktop') argumentsForCli.push("'--preset=desktop'");
  const command = [
    `$env:CHROME_PATH=${quotePowerShell(chromePath)}`,
    `Set-Location -LiteralPath ${quotePowerShell(executionDir)}`,
    `& npx.cmd --yes --package ${quotePowerShell(`lighthouse@${LIGHTHOUSE_VERSION}`)} lighthouse ${argumentsForCli.join(' ')}`,
    'exit $LASTEXITCODE',
  ].join('; ');
  try {
    await runPowerShell(command, { capture: true });
  } catch (error) {
    if (!await windowsFileExists(reportPath) || !await hasUsableLhr(reportPath)) throw error;
  } finally {
    await removeWindowsDirectory(chromeProfileDir);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) return printHelp();
  if (args.length) fail(`Unknown argument(s): ${args.join(' ')}. Use --help for usage.`);

  const targetUrl = parseUrl(process.env.LIGHTHOUSE_URL || DEFAULT_URL);
  const runCount = parseRuns(process.env.LIGHTHOUSE_RUNS || '3');
  if (process.platform !== 'win32' && !isWsl()) fail('This runner requires Windows Node directly or WSL with powershell.exe to use Windows Chrome.');

  const chromePath = resolveChromePath();
  await assertWindowsPrerequisites(chromePath);
  const executionDir = await makeWindowsTempDirectory('lighthouse-cli');
  const windowsReportDir = process.env.LIGHTHOUSE_REPORT_DIR
    ? toWindowsPath(path.resolve(process.env.LIGHTHOUSE_REPORT_DIR))
    : await makeWindowsTempDirectory('lighthouse-production-reports');
  const reportDir = toHostPath(windowsReportDir);
  await mkdir(reportDir, { recursive: true });

  try {
    const profiles = [
      { name: 'mobile', config: 'default-mobile' },
      { name: 'desktop', config: 'lighthouse-desktop-config' },
    ];
    const profileResults = [];
    let metadata = null;

    for (const profile of profiles) {
      const runs = [];
      for (let index = 1; index <= runCount; index += 1) {
        const filename = `${profile.name}-run-${String(index).padStart(2, '0')}.lhr.json`;
        const reportPath = path.win32.join(windowsReportDir, filename);
        await runWindowsLighthouse({ executionDir, targetUrl, chromePath, profile: profile.name, reportPath });
        const lhr = JSON.parse(await readFile(path.join(reportDir, filename), 'utf8'));
        runs.push(extractRun(lhr, index, filename));
        metadata ||= {
          lighthouseVersion: lhr.lighthouseVersion ?? LIGHTHOUSE_VERSION,
          userAgent: lhr.environment?.networkUserAgent ?? lhr.userAgent ?? lhr.environment?.hostUserAgent ?? null,
        };
      }
      profileResults.push(summarizeProfile(profile.name, profile.config, runs));
    }

    const summary = {
      targetUrl,
      timestamp: new Date().toISOString(),
      lighthouseVersion: metadata?.lighthouseVersion ?? LIGHTHOUSE_VERSION,
      chrome: { executable: chromePath, userAgent: metadata?.userAgent ?? null },
      userAgent: metadata?.userAgent ?? null,
      runCount,
      measurement: {
        type: 'controlled-lab',
        metrics: { fcp: 'First Contentful Paint (ms)', lcp: 'Largest Contentful Paint (ms)', speedIndex: 'Speed Index (ms)', tbt: 'Total Blocking Time (ms); lab responsiveness proxy, not field INP', cls: 'Cumulative Layout Shift (unitless)' },
      },
      profiles: profileResults,
    };
    await writeFile(path.join(reportDir, 'summary.json'), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify({ status: 'ok', targetUrl, reportDir, runCount, profiles: profileResults.map(({ profile, medianScores, medianLabMetrics }) => ({ profile, medianScores, medianLabMetrics })) }));
  } finally {
    await removeWindowsDirectory(executionDir);
  }
}

main().catch((error) => {
  console.error(JSON.stringify({ status: 'error', message: error.message }));
  process.exitCode = 1;
});
