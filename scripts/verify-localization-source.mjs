import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const reviewRoot = resolve(root, "localization/es-US");
const shellFiles = [
  "src/i18n/routes.ts",
  "src/layouts/BaseLayout.astro",
  "src/components/seo/SEOHead.astro",
  "src/components/layout/Navbar.astro",
  "src/components/layout/Footer.astro",
].map((file) => resolve(root, file));
const ledgerPath = resolve(reviewRoot, "approval-ledger.json");
const claimLedgerPath = resolve(reviewRoot, "claim-ledger.md");
const manifestPath = resolve(root, "src/content/i18n/es-US/publication-manifest.json");
const pageIds = new Set(["home", "about", "contact", "services"]);
const canonical = (value) => Array.isArray(value) ? `[${value.map(canonical).join(",")}]` : value && typeof value === "object" ? `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}` : JSON.stringify(value);
const digest = (value) => createHash("sha256").update(canonical(value)).digest("hex");
const fail = (message) => { throw new Error(message); };

export const verifyRecords = (ledger, manifest) => {
  if (ledger.schemaVersion !== 1 || ledger.locale !== "es-US") fail("Invalid approval ledger schema.");
  const used = new Set();
  for (const [pageId, route] of Object.entries(ledger.routes)) {
    if (!pageIds.has(pageId)) fail(`Unknown Spanish route: ${pageId}`);
    if (!route || !["staged", "approved"].includes(route.state) || !Array.isArray(route.requiredBlocks)) fail(`Incomplete review route: ${pageId}`);
    for (const blockId of route.requiredBlocks) {
      const block = ledger.blocks[blockId];
      if (!block || block.state !== "approved") fail(`Missing approved block: ${blockId}`);
      if (block.sha256 !== digest(block.acceptedValue)) fail(`Changed approved block: ${blockId}`);
      used.add(blockId);
    }
  }
  for (const blockId of Object.keys(ledger.blocks)) if (!used.has(blockId)) fail(`Orphan approved block: ${blockId}`);
  if (!manifest) return [];
  if (manifest.schemaVersion !== 1 || manifest.locale !== "es-US") fail("Invalid publication manifest schema.");
  for (const [blockId, block] of Object.entries(manifest.blocks)) if (!ledger.blocks[blockId] || ledger.blocks[blockId].sha256 !== block.sha256) fail(`Unknown or changed promoted block: ${blockId}`);
  return Object.entries(manifest.routes).flatMap(([pageId, route]) => {
    const reviewed = ledger.routes[pageId];
    if (!pageIds.has(pageId) || !reviewed || !route || route.state !== reviewed.state || canonical(route.requiredBlocks) !== canonical(reviewed.requiredBlocks) || route.requiredBlocks.some((blockId) => !manifest.blocks[blockId])) fail(`Incomplete publication route: ${pageId}`);
    return route.state === "approved" ? [pageId] : [];
  });
};

const files = (directory) => existsSync(directory) ? readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(resolve(directory, entry.name)) : [resolve(directory, entry.name)]) : [];
const verifyDraftBoundary = () => {
  const sources = files(resolve(root, "src")).concat(files(resolve(root, "public")));
  for (const file of sources) if (/localization\/es-US\/drafts?\//.test(readFileSync(file, "utf8"))) fail(`Deployable source references review drafts: ${file}`);
  const deployable = files(resolve(root, "src/content/i18n/es-US"));
  if (!existsSync(manifestPath) && deployable.length) fail("Deployable Spanish content requires a publication manifest.");
  if (existsSync(resolve(root, "src/pages/es"))) fail("Spanish pages must not exist before publication.");
};
const verifyHomeContracts = () => {
  const page = readFileSync(resolve(root, "src/pages/index.astro"), "utf8");
  const composition = readFileSync(resolve(root, "src/components/sections/home/HomeComposition.astro"), "utf8");
  const homeContent = readFileSync(resolve(root, "src/i18n/home-content.ts"), "utf8");
  const sections = ["HeroSection", "WhyDuartes", "FeaturedPackages", "Testimonials", "Gallery", "DiscountBanner"];
  if (!page.includes("<HomeComposition content={englishHomeContent} />")) fail("Home page must render through the shared composition.");
  if (/<(?:div|main|section)\b/.test(composition)) fail("Home composition must not add wrapper markup.");
  const sectionPositions = sections.map((section) => composition.indexOf(`<${section}`));
  if (sectionPositions.some((position, index) => position === -1 || (index > 0 && position < sectionPositions[index - 1]))) fail("Home composition must retain the current section order.");
  if (!composition.includes("content.policy.testimonials === 'include' && <Testimonials />")) fail("Testimonials must use the explicit inclusion policy.");
  if (!homeContent.includes('"es-US": { testimonials: "omit" }')) fail("Future Spanish home policy must omit testimonials.");
};
const verifyShellContracts = () => {
  const [routes, layout, seoHead, navbar, footer] = shellFiles.map((file) => readFileSync(file, "utf8"));
  const shellSources = [layout, seoHead, navbar, footer];
  if (!routes.includes("export const publishedSpanishPageIds: readonly PageId[] = [];")) fail("Published Spanish route registry must remain empty during WU-2.");
  if (!routes.includes("getPublishedCounterpart") || !routes.includes("getCandidateRoutePair(pageId)")) fail("Published counterparts must resolve from the candidate route registry.");
  if (/\bPublishedCounterpart\b/.test(routes) || shellSources.some((source) => /state:\s*[\"']published[\"']|\bPublishedCounterpart\b|counterpart\?:/.test(source))) fail("Shell callers must not be able to assert counterpart publication.");
  if (!layout.includes("locale = 'en-US'") || !layout.includes('lang={localeDefinition.htmlLang}') || !layout.includes("pageId?: PageId")) fail("Base layout must default to English and accept only a logical page ID.");
  if (!seoHead.includes("locale = 'en-US'") || !seoHead.includes('content={localeDefinition.ogLocale}') || !seoHead.includes("getPublishedCounterpart(pageId, locale)") || !seoHead.includes('{counterpartHref && (')) fail("SEO alternates must resolve a published counterpart from the registry.");
  for (const [name, source] of [["Navbar", navbar], ["Footer", footer]]) {
    if (!source.includes("pageId?: PageId") || !source.includes("getPublishedCounterpart(pageId, locale)") || !source.includes("{counterpart && (")) fail(`${name} must resolve language switches from the published route registry.`);
  }
};

const approved = (value) => ({ state: "approved", acceptedValue: value, sha256: digest(value) });
const selfTest = () => {
  const block = approved({ label: "reviewed" });
  const ledger = { schemaVersion: 1, locale: "es-US", blocks: { "home.meta": block }, routes: { home: { state: "approved", requiredBlocks: ["home.meta"] } } };
  const manifest = { schemaVersion: 1, locale: "es-US", blocks: { "home.meta": { sha256: block.sha256 } }, routes: { home: { state: "approved", requiredBlocks: ["home.meta"] } } };
  if (verifyRecords(ledger, manifest).join() !== "home") fail("Approved fixture did not publish home.");
  const cases = [
    ["missing block", { ...ledger, routes: { home: { state: "approved", requiredBlocks: ["missing"] } } }],
    ["changed wording", { ...ledger, blocks: { "home.meta": { ...block, acceptedValue: { label: "changed" } } } }],
    ["unknown route", { ...ledger, routes: { unknown: ledger.routes.home } }],
    ["incomplete route", { ...ledger, routes: { home: {} } }],
    ["orphan block", { ...ledger, blocks: { ...ledger.blocks, orphan: block } }],
  ];
  for (const [name, invalid] of cases) { try { verifyRecords(invalid, manifest); fail(`Fixture passed: ${name}`); } catch (error) { if (error.message === `Fixture passed: ${name}`) throw error; } }
  try { verifyRecords(ledger, { ...manifest, blocks: {} }); fail("Fixture passed: missing dependency"); } catch (error) { if (error.message === "Fixture passed: missing dependency") throw error; }
  if (verifyRecords({ ...ledger, routes: { home: { state: "staged", requiredBlocks: ["home.meta"] } } }, { ...manifest, routes: { home: { state: "staged", requiredBlocks: ["home.meta"] } } }).length) fail("Draft route published.");
  console.log("i18n source self-tests passed");
};

const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
const claimLedger = readFileSync(claimLedgerPath, "utf8");
if (!claimLedger.includes("# Spanish Claim Ledger") || !claimLedger.includes("## Evidence schema")) fail("Invalid Spanish claim ledger.");
verifyDraftBoundary();
verifyHomeContracts();
verifyShellContracts();
const published = verifyRecords(ledger, existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : null);
if (published.length) fail("No Spanish route may publish during WU-1.");
if (process.argv.includes("--self-test")) selfTest();
console.log("i18n source verification passed (no Spanish content published)");
