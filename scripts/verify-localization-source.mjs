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
const verifyAboutContracts = () => {
  const page = readFileSync(resolve(root, "src/pages/about.astro"), "utf8");
  const composition = readFileSync(resolve(root, "src/components/sections/about/AboutComposition.astro"), "utf8");
  const standard = readFileSync(resolve(root, "src/components/sections/about/StandardSection.astro"), "utf8");
  const pillars = readFileSync(resolve(root, "src/components/sections/about/PillarsSection.astro"), "utf8");
  const aboutContent = readFileSync(resolve(root, "src/i18n/about-content.ts"), "utf8");
  const contentTypes = readFileSync(resolve(root, "src/i18n/content-types.ts"), "utf8");
  const sections = ["PageHero", "StandardSection", "PillarsSection", "BehindTheShine", "CTABanner"];
  if (!page.includes("<AboutComposition content={englishAboutContent} />") || /<(?:PageHero|StandardSection|PillarsSection|BehindTheShine|CTABanner)\b/.test(page)) fail("About page must render only through the shared composition.");
  if (/<(?:div|main|section)\b/.test(composition)) fail("About composition must not add wrapper markup.");
  const positions = sections.map((section) => composition.indexOf(`<${section}`));
  if (positions.some((position, index) => position === -1 || (index > 0 && position < positions[index - 1]))) fail("About composition must retain the current section order.");
  if (!page.includes("imageAlt={metadata.socialImageAlt}")) fail("About metadata must provide the shared SEO image alt.");
  if (!composition.includes("config.phoneUSE164") || !composition.includes("encodeURIComponent(content.cta.smsMessage)")) fail("About SMS destination must derive from canonical phone data and typed content.");
  const canonicalCounters = ["aboutMetricValues.vehiclesDetailed", "aboutMetricValues.yearsOfExperience", "aboutMetricValues.bayAreaLocations"];
  if (canonicalCounters.some((counter, index) => !standard.includes(counter) || !standard.includes(`content.counters[${index}]`))) fail("About counters must retain canonical metric order with localized labels only.");
  if (!standard.includes('data-count-duration="1800"') || !standard.includes('data-count-duration="1100"') || !standard.includes('data-count-duration="1600"')) fail("About counters must retain their canonical timing.");
  if (!pillars.includes('const pillarIcons = ["tabler:check", "tabler:target-arrow", "tabler:star-filled"] as const;') || !pillars.includes("name={pillarIcons[index]}")) fail("About pillar icons must remain canonical component data.");
  if (!contentTypes.includes("counters: readonly [string, string, string];") || !contentTypes.includes("items: readonly [") || /tabler:|metric:\s*[\"'](?:yearsOfExperience|vehiclesDetailed|bayAreaLocations)/.test(aboutContent)) fail("Localized About content must contain fixed labels and copy only.");
  if (!contentTypes.includes('export type AboutMetric = "yearsOfExperience" | "vehiclesDetailed" | "bayAreaLocations"') || !aboutContent.includes("Unknown About metric placeholder") || !aboutContent.includes("formattedNumber(config.vehiclesDetailed)")) fail("About metric placeholders must be typed, canonical, and deterministic.");
  if (/phoneUSE164|phoneUSNational|phoneFormatted|\+1\d{10}/.test(aboutContent)) fail("Localized About content must not define contact destinations.");
};

const verifyContactContracts = () => {
  const page = readFileSync(resolve(root, "src/pages/contact.astro"), "utf8");
  const composition = readFileSync(resolve(root, "src/components/sections/contact/ContactComposition.astro"), "utf8");
  const options = readFileSync(resolve(root, "src/components/sections/contact/ContactOptions.astro"), "utf8");
  const form = readFileSync(resolve(root, "src/components/sections/contact/ContactForm.astro"), "utf8");
  const map = readFileSync(resolve(root, "src/components/sections/contact/ServiceMap.astro"), "utf8");
  const content = readFileSync(resolve(root, "src/i18n/contact-content.ts"), "utf8");
  const types = readFileSync(resolve(root, "src/i18n/content-types.ts"), "utf8");
  if (!page.includes("<ContactComposition content={englishContactContent} />") || !page.includes("imageAlt={metadata.socialImageAlt}") || /<(?:PageHero|ContactSection|ServiceMap)\b/.test(page)) fail("Contact page must render only through the shared composition with localized metadata.");
  if (/<(?:div|main|section)\b/.test(composition)) fail("Contact composition must not add wrapper markup.");
  const sections = ["PageHero", "ContactSection", "ServiceMap"];
  const positions = sections.map((section) => composition.indexOf(`<${section}`));
  if (positions.some((position, index) => position === -1 || (index > 0 && position < positions[index - 1]))) fail("Contact composition must retain the current section order.");
  if (!composition.includes('content.policy.serviceMap === "include" && <ServiceMap content={content.map} />') || !content.includes('"en-US": { serviceMap: "include" }') || !content.includes('"es-US": { serviceMap: "omit" }')) fail("Contact map policy must conditionally omit the whole map subtree.");
  if (!types.includes("export interface ContactMessageChannelContent") || !types.includes("ContactChannelContent,") || !content.includes("preparedStatus") || !content.includes("prepared but not sent") || !form.includes('role="status" aria-live="polite"') || form.includes("form.reset()")) fail("Contact form status must truthfully preserve submitted values.");
  if (/description:\s*["'](?:phone|@duartes_detailing)|@duartes_detailing|phoneFormatted|phoneUSE164/.test(content)) fail("Localized Contact channels must not own canonical display or destination data.");
  if (!options.includes("info: config.phoneFormatted") || !options.includes("info: '@duartes_detailing'") || !options.includes("https://wa.me/${config.phoneUSE164}") || !options.includes("sms:${config.phoneUSE164}") || !options.includes("https://www.instagram.com/direct/t/17842345695295426") || !options.includes("instagram://user?username=duartes_detailing")) fail("Contact channels must retain canonical destinations and mobile fallback.");
  if (!map.includes("37.63506596297662") || !map.includes("-122.08118753590793") || !map.includes("aria-describedby=\"service-map-help\"")) fail("Contact map must retain canonical coordinates and accessibility relationship.");
  if (/\b(?:Spanish|Español|Contacto|Enviar mensaje)\b/.test(content)) fail("Contact content must not publish Spanish copy.");
};

const verifyServicesContracts = () => {
  const page = readFileSync(resolve(root, "src/pages/services/index.astro"), "utf8");
  const composition = readFileSync(resolve(root, "src/components/sections/services/ServicesComposition.astro"), "utf8");
  const section = readFileSync(resolve(root, "src/components/sections/services/ServicesSection.astro"), "utf8");
  const grid = readFileSync(resolve(root, "src/components/sections/services/ServicesGrid.astro"), "utf8");
  const card = readFileSync(resolve(root, "src/components/sections/services/ServiceCard.astro"), "utf8");
  const services = readFileSync(resolve(root, "src/data/services.ts"), "utf8");
  const content = readFileSync(resolve(root, "src/i18n/services-content.ts"), "utf8");
  const types = readFileSync(resolve(root, "src/i18n/content-types.ts"), "utf8");
  const sections = ["PageHero", "ServicesSection", "DiscountBanner"];
  if (!page.includes("<ServicesComposition content={englishServicesContent} />") || /<(?:PageHero|ServicesSection|DiscountBanner)\b/.test(page)) fail("Services page must render only through the shared composition.");
  if (composition.indexOf("<PageHero") === -1 || /<(?:div|main)\b/.test(composition.slice(0, composition.indexOf("<PageHero")))) fail("Services composition must not add a wrapper before PageHero.");
  const positions = sections.map((sectionName) => composition.indexOf(`<${sectionName}`));
  if (positions.some((position, index) => position === -1 || (index > 0 && position < positions[index - 1]))) fail("Services composition must retain the current section order.");
  if (!composition.includes('content.policy.areaTeaser === "include"') || !content.includes('"es-US": { areaTeaser: "omit", englishDetailDisclosure: "required" }') || !grid.includes('content.policy.englishDetailDisclosure === "required" && !englishDetailDisclosure') || !card.includes("englishDetailDisclosure &&")) fail("Future Spanish Services policy must omit the area teaser and disclose English-only detail destinations.");
  if (!types.includes("export interface ServicesContent") || !types.includes("ServicesCardPresentation") || !types.includes("Record<import(\"../data/services\").ServiceId")) fail("Services content must use an exhaustive ServiceId presentation contract.");
  const ids = ["interior-detail", "exterior-detail", "paint-correction", "ceramic-coating", "full-detail", "seat-upholstery-deep-cleaning", "headlight-restoration", "clay-bar-decontamination"];
  for (const id of ids) {
    if (!services.includes(`id: "${id}"`) || !content.includes(`"${id}": {}`)) fail(`Missing canonical or presentation ServiceId: ${id}`);
  }
  if ((services.match(/\bid: "/g) ?? []).length !== ids.length) fail("Canonical services must define one unique ServiceId each.");
  const imageLink = card.indexOf('<a href={href} class="block w-full h-full">');
  const image = card.indexOf("src={service.images[0]}");
  const detailButton = card.indexOf('<Button href={href}');
  if (!grid.includes("services.map") || !grid.includes("<ServiceCard service={service}") || !card.includes("const href = `/services/${service.slug}`") || imageLink === -1 || image === -1 || detailButton === -1 || imageLink > image || image > detailButton) fail("Services cards must preserve canonical image-before-button detail links.");
  if (!section.includes("<ServicesCatalogIntro content={content.intro} />") || !section.includes("<ServicesGrid content={content} />")) fail("Services sections must consume typed presentation content.");
  if (/\b(?:Spanish|Español|Servicios|Ver detalles)\b/.test(content)) fail("Services content must not publish Spanish wording.");
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
verifyAboutContracts();
verifyContactContracts();
verifyServicesContracts();
verifyShellContracts();
const published = verifyRecords(ledger, existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : null);
if (published.length) fail("No Spanish route may publish during WU-1.");
if (process.argv.includes("--self-test")) selfTest();
console.log("i18n source verification passed (no Spanish content published)");
