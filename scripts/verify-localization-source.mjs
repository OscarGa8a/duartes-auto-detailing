import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { englishHomeContent, spanishHomeContent } from "../src/i18n/home-content.ts";
import { spanishAboutContent } from "../src/i18n/spanish-about-content.ts";
import { englishContactContent, spanishContactContent } from "../src/i18n/contact-content.ts";
import { englishShellContent, spanishShellContent } from "../src/i18n/shell-content.ts";
import { getCanonicalPagePath, getShellDestinationPath, publishedSpanishPageIds } from "../src/i18n/routes.ts";
import { services } from "../src/data/services.ts";
import { spanishServicesContent, spanishServicesContentDigest } from "../src/i18n/spanish-services-content.ts";

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
const approvedSpanishDigests = {
  shell: "702d3c0059d1ef3e048b1064050209ddb7c77b59cf55a821a3369cbf1058ae25",
  home: "6c259ed9ecb79022dd778d8fad74ec6d287a9b02e084664ec2a2de8e732b4b2d",
  about: "29dc14fa4af33cd95392115c82693bb7263e37464288862953c4e9e5a684c645",
  contact: "0812252896e042a485682a2716c7e7792deb7dbf41f405cccb38fc2294ecafaf",
  services: "8d2cd90a9f164f7a0c1f10b110ec32e1e925a63bf244d6de4fbbf52d1b5caadf",
};
const verifyApprovedSpanishSources = () => {
  for (const [name, value] of Object.entries({ shell: spanishShellContent, home: spanishHomeContent, about: spanishAboutContent, contact: spanishContactContent, services: spanishServicesContent })) {
    const actual = digest(value);
    if (actual !== approvedSpanishDigests[name]) fail(`Approved Spanish ${name} digest mismatch: ${actual}`);
    console.log(`Approved Spanish ${name} digest: ${actual}`);
  }
};
const verifyHomeDiscountBannerContract = () => {
  const types = readFileSync(resolve(root, "src/i18n/content-types.ts"), "utf8");
  if (!types.includes("export type HomeContentWithDiscountBanner") || !types.includes('policy: HomeSectionPolicy & { discountBanner: "include" };') || !types.includes("discountBanner: HomeDiscountBanner;") || !types.includes("export type HomeContentWithoutDiscountBanner") || !types.includes('policy: HomeSectionPolicy & { discountBanner: "omit" };') || !types.includes("discountBanner?: never;")) fail("Home discount-banner type must require included content and forbid omitted content.");
  if (englishHomeContent.policy.discountBanner !== "include" || !Object.hasOwn(englishHomeContent, "discountBanner")) fail("English Home must include its discount banner subtree.");
  if (spanishHomeContent.policy.discountBanner !== "omit" || Object.hasOwn(spanishHomeContent, "discountBanner")) fail("Spanish Home must omit its discount banner subtree.");
};

export const verifyRecords = (ledger, manifest) => {
  const expectedBlocks = Object.keys(approvedSpanishDigests).sort();
  const expectedRoutes = {
    home: ["shell", "home"],
    about: ["shell", "about"],
    contact: ["shell", "contact"],
    services: ["shell", "services"],
  };
  if (ledger.schemaVersion !== 1 || ledger.locale !== "es-US" || canonical(Object.keys(ledger.blocks).sort()) !== canonical(expectedBlocks) || canonical(Object.keys(ledger.routes).sort()) !== canonical(Object.keys(expectedRoutes).sort())) fail("Approval ledger must close over exactly the approved Spanish blocks and routes.");
  for (const blockId of expectedBlocks) {
    const block = ledger.blocks[blockId];
    if (!block || block.state !== "approved" || block.sha256 !== approvedSpanishDigests[blockId]) fail(`Changed approved block: ${blockId}`);
  }
  for (const [pageId, requiredBlocks] of Object.entries(expectedRoutes)) {
    const route = ledger.routes[pageId];
    if (!route || route.state !== "approved" || canonical(route.requiredBlocks) !== canonical(requiredBlocks)) fail(`Incomplete review route: ${pageId}`);
  }
  if (!manifest || manifest.schemaVersion !== 1 || manifest.locale !== "es-US" || canonical(Object.keys(manifest.blocks).sort()) !== canonical(expectedBlocks) || canonical(Object.keys(manifest.routes).sort()) !== canonical(Object.keys(expectedRoutes).sort())) fail("Publication manifest must close over exactly the approved Spanish blocks and routes.");
  for (const blockId of expectedBlocks) if (manifest.blocks[blockId]?.sha256 !== approvedSpanishDigests[blockId]) fail(`Unknown or changed promoted block: ${blockId}`);
  for (const [pageId, requiredBlocks] of Object.entries(expectedRoutes)) {
    const route = manifest.routes[pageId];
    if (!route || route.state !== "approved" || canonical(route.requiredBlocks) !== canonical(requiredBlocks)) fail(`Incomplete publication route: ${pageId}`);
  }
  return Object.keys(expectedRoutes);
};

const files = (directory) => existsSync(directory) ? readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(resolve(directory, entry.name)) : [resolve(directory, entry.name)]) : [];
const verifyDraftBoundary = () => {
  const sources = files(resolve(root, "src")).concat(files(resolve(root, "public")));
  for (const file of sources) if (/localization\/es-US\/drafts?\//.test(readFileSync(file, "utf8"))) fail(`Deployable source references review drafts: ${file}`);
  const deployable = files(resolve(root, "src/content/i18n/es-US"));
  if (!existsSync(manifestPath) || !deployable.length) fail("Published Spanish content requires a publication manifest.");
  for (const page of ["src/pages/es/index.astro", "src/pages/es/[...page].astro"]) if (!existsSync(resolve(root, page))) fail(`Missing published Spanish page source: ${page}`);
};
const verifyHomeContracts = () => {
  const page = readFileSync(resolve(root, "src/pages/index.astro"), "utf8");
  const composition = readFileSync(resolve(root, "src/components/sections/home/HomeComposition.astro"), "utf8");
  const homeContent = readFileSync(resolve(root, "src/i18n/home-content.ts"), "utf8");
  const hero = readFileSync(resolve(root, "src/components/sections/home/HeroSection.astro"), "utf8");
  const featuredPackages = readFileSync(resolve(root, "src/components/sections/home/FeaturedPackages.astro"), "utf8");
  const discountBanner = readFileSync(resolve(root, "src/components/sections/home/DiscountBanner.astro"), "utf8");
  const sections = ["HeroSection", "WhyDuartes", "FeaturedPackages", "Testimonials", "Gallery", "DiscountBanner"];
  if (!page.includes("const { metadata } = englishHomeContent;") || !page.includes("title={metadata.title}") || !page.includes("description={metadata.description}") || !page.includes("imageAlt={metadata.socialImageAlt}") || !page.includes('locale="en-US"') || !page.includes('pageId="home"') || !page.includes('<HomeComposition content={englishHomeContent} locale="en-US" />')) fail("Home page must consume English metadata and explicit logical locale/page identity.");
  if (/<(?:div|main|section)\b/.test(composition)) fail("Home composition must not add wrapper markup.");
  const sectionPositions = sections.map((section) => composition.indexOf(`<${section}`));
  if (sectionPositions.some((position, index) => position === -1 || (index > 0 && position < sectionPositions[index - 1]))) fail("Home composition must retain the current section order.");
  if (!composition.includes("const { content, locale = \"en-US\" }") || !composition.includes("<HeroSection content={content.hero} locale={locale} />") || !composition.includes("<FeaturedPackages content={content.featuredPackages} locale={locale} />") || !composition.includes("content.policy.testimonials === 'include' && <Testimonials />") || !composition.includes("homeContent.policy.discountBanner === \"include\"") || !composition.includes("hasDiscountBanner(content) && <DiscountBanner content={content.discountBanner} locale={locale} />")) fail("Home composition must forward locale and omit whole optional section subtrees.");
  if (!homeContent.includes('"es-US": { testimonials: "omit", discountBanner: "omit" }')) fail("Future Spanish home policy must omit testimonials and the discount banner.");
  if (getCanonicalPagePath("contact", "en-US") !== "/contact/" || getCanonicalPagePath("contact", "es-US") !== "/es/contact/" || getCanonicalPagePath("services", "en-US") !== "/services/" || getCanonicalPagePath("services", "es-US") !== "/es/services/" || !hero.includes('getCanonicalPagePath("contact", locale)') || !hero.includes('getCanonicalPagePath("services", locale)') || !featuredPackages.includes('getCanonicalPagePath("services", locale)') || !discountBanner.includes('getCanonicalPagePath("contact", locale)')) fail("Home CTAs must resolve canonical locale page destinations.");
  if (!featuredPackages.includes('locale === "en-US" ? `/services/${service.slug}` : servicesHref') || !featuredPackages.includes("href={serviceHref(service)}") || featuredPackages.includes("href={`/services/${service.slug}`}")) fail("Featured package cards must keep English details and use the Spanish catalog candidate.");
  if (discountBanner.includes("englishHomeContent") || !discountBanner.includes("content: HomeDiscountBanner")) fail("Discount banner must require explicit included content without an English fallback.");
  if (!hero.includes("formattedNumber(config.vehiclesDetailed)") || !featuredPackages.includes("services.slice(0, 3)") || !featuredPackages.includes("image={service.images[0]}")) fail("Home metrics, service data, and media must remain runtime-owned.");
};
const verifyAboutContracts = () => {
  const page = readFileSync(resolve(root, "src/pages/about.astro"), "utf8");
  const composition = readFileSync(resolve(root, "src/components/sections/about/AboutComposition.astro"), "utf8");
  const standard = readFileSync(resolve(root, "src/components/sections/about/StandardSection.astro"), "utf8");
  const pillars = readFileSync(resolve(root, "src/components/sections/about/PillarsSection.astro"), "utf8");
  const aboutContent = readFileSync(resolve(root, "src/i18n/about-content.ts"), "utf8");
  const spanishAboutSource = readFileSync(resolve(root, "src/i18n/spanish-about-content.ts"), "utf8");
  const contentTypes = readFileSync(resolve(root, "src/i18n/content-types.ts"), "utf8");
  const sections = ["PageHero", "StandardSection", "PillarsSection", "BehindTheShine", "CTABanner"];
  if (!page.includes("<AboutComposition content={englishAboutContent} />") || /<(?:PageHero|StandardSection|PillarsSection|BehindTheShine|CTABanner)\b/.test(page)) fail("About page must render only through the shared composition.");
  if (!page.includes('import { getCanonicalPagePath } from "../i18n/routes";') || !page.includes('const locale = "en-US";') || !page.includes('const pageId = "about";') || !page.includes("const schemaPath = getCanonicalPagePath(pageId, locale);") || !page.includes("schemaPath,") || !page.includes("metadata.schemaName,") || !page.includes("resolveAboutTemplate(metadata.schemaDescription),") || !page.includes("locale={locale}") || !page.includes("pageId={pageId}")) fail("About must declare logical English identity and derive its schema path and fields from typed metadata.");
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
  if (/phoneUSE164|phoneUSNational|phoneFormatted|\+1\d{10}/.test(spanishAboutSource)) fail("Spanish About content must not define contact destinations.");
  const templates = [
    spanishAboutContent.metadata.description,
    spanishAboutContent.metadata.schemaDescription,
    spanishAboutContent.hero.description,
    spanishAboutContent.standard.description,
  ];
  const expectedMetricOrders = [
    ["yearsOfExperience", "vehiclesDetailed"],
    ["yearsOfExperience", "vehiclesDetailed"],
    ["yearsOfExperience"],
    ["yearsOfExperience", "vehiclesDetailed", "bayAreaLocations"],
  ];
  for (const [index, template] of templates.entries()) {
    const placeholders = [...template.template.matchAll(/\{([a-zA-Z]+)\}/g)].map(([, metric]) => metric);
    if (canonical(placeholders) !== canonical(template.metrics) || canonical(template.metrics) !== canonical(expectedMetricOrders[index])) fail("Spanish About templates must use only approved runtime metrics in order.");
  }
  if (/\b(?:config|formattedNumber|yearsOfExperience:\s*\d|vehiclesDetailed:\s*\d|bayAreaLocations:\s*\d)\b/.test(spanishAboutSource)) fail("Spanish About must not own runtime metric values or formatting.");
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
  if (!page.includes("import { getCanonicalPagePath } from '../i18n/routes';") || !page.includes('const locale = "en-US";') || !page.includes('const pageId = "contact";') || !page.includes("const schemaPath = getCanonicalPagePath(pageId, locale);") || !page.includes("getPageJsonLd(site, 'ContactPage', schemaPath, metadata.schemaName, metadata.schemaDescription)") || !page.includes("locale={locale}") || !page.includes("pageId={pageId}")) fail("Contact must declare logical English identity and derive canonical schema fields from typed metadata.");
  if (/<(?:div|main|section)\b/.test(composition)) fail("Contact composition must not add wrapper markup.");
  const sections = ["PageHero", "ContactSection", "ServiceMap"];
  const positions = sections.map((section) => composition.indexOf(`<${section}`));
  if (positions.some((position, index) => position === -1 || (index > 0 && position < positions[index - 1]))) fail("Contact composition must retain the current section order.");
  if (!composition.includes('import type { ContactContent, ContactContentWithServiceMap } from "../../../i18n/content-types";') || !composition.includes('const hasServiceMap = (content: ContactContent): content is ContactContentWithServiceMap => content.policy.serviceMap === "include";') || !composition.includes('{hasServiceMap(content) && <ServiceMap content={content.map} />}') || !content.includes('"en-US": { serviceMap: "include" }') || !content.includes('"es-US": { serviceMap: "omit" }')) fail("Contact map policy must narrow through a local include guard before rendering the complete map subtree.");
  if (!types.includes("export type ContactContentWithServiceMap") || !types.includes('policy: { serviceMap: "include" };') || !types.includes("map: ContactMapContent;") || !types.includes("export type ContactContentWithoutServiceMap") || !types.includes('policy: { serviceMap: "omit" };') || !types.includes("map?: never;") || !types.includes("export type ContactContent = ContactContentWithServiceMap | ContactContentWithoutServiceMap;")) fail("Contact types must require included maps and forbid omitted maps.");
  if (!types.includes("export interface ContactMessageChannelContent") || !types.includes("ContactChannelContent,") || !content.includes("preparedStatus") || !englishContactContent.form.preparedStatus.includes("prepared but not sent") || !spanishContactContent.form.preparedStatus.includes("preparado, pero no se envió") || !form.includes('role="status" aria-live="polite"') || form.includes("form.reset()")) fail("Contact form status must truthfully preserve submitted values.");
  if (/description:\s*["'](?:phone|@duartes_detailing)|@duartes_detailing|phoneFormatted|phoneUSE164/.test(content)) fail("Localized Contact channels must not own canonical display or destination data.");
  if (!options.includes("info: config.phoneFormatted") || !options.includes("info: '@duartes_detailing'") || !options.includes("https://wa.me/${config.phoneUSE164}") || !options.includes("sms:${config.phoneUSE164}") || !options.includes("https://www.instagram.com/direct/t/17842345695295426") || !options.includes("instagram://user?username=duartes_detailing")) fail("Contact channels must retain canonical destinations and mobile fallback.");
  if (!map.includes('import type { ContactMapContent } from "../../../i18n/content-types";') || !map.includes("content: ContactMapContent;") || map.includes('ContactContent["map"]')) fail("ServiceMap must require the named non-optional ContactMapContent prop after composition narrows inclusion.");
  if (!map.includes("37.63506596297662") || !map.includes("-122.08118753590793") || !map.includes("aria-describedby=\"service-map-help\"")) fail("Contact map must retain canonical coordinates and accessibility relationship.");
  if (englishContactContent.policy.serviceMap !== "include" || !Object.hasOwn(englishContactContent, "map")) fail("English Contact must retain its complete map subtree.");
  if (spanishContactContent.policy.serviceMap !== "omit" || Object.hasOwn(spanishContactContent, "map")) fail("Spanish Contact must omit the complete map subtree.");
  const channelOrder = spanishContactContent.channels.map((channel) => channel.title);
  if (canonical(channelOrder) !== canonical(["Escríbenos por WhatsApp", "Envíanos un mensaje de texto", "Envíanos un mensaje directo por Instagram"])) fail("Spanish Contact channels must retain approved channel order.");
  const spanishContact = JSON.stringify(spanishContactContent);
  if (/phoneUSE164|phoneFormatted|@duartes_detailing|https?:\/\/|instagram:\/\/|\+1\d{10}|37\.63506596297662|-122\.08118753590793/.test(spanishContact)) fail("Spanish Contact must not own phone, handle, URL, or coordinate destinations.");
};

const verifyServicesContracts = () => {
  const page = readFileSync(resolve(root, "src/pages/services/index.astro"), "utf8");
  const composition = readFileSync(resolve(root, "src/components/sections/services/ServicesComposition.astro"), "utf8");
  const section = readFileSync(resolve(root, "src/components/sections/services/ServicesSection.astro"), "utf8");
  const grid = readFileSync(resolve(root, "src/components/sections/services/ServicesGrid.astro"), "utf8");
  const card = readFileSync(resolve(root, "src/components/sections/services/ServiceCard.astro"), "utf8");
  const content = readFileSync(resolve(root, "src/i18n/services-content.ts"), "utf8");
  const spanishContent = readFileSync(resolve(root, "src/i18n/spanish-services-content.ts"), "utf8");
  const types = readFileSync(resolve(root, "src/i18n/content-types.ts"), "utf8");
  const verifierSource = readFileSync(new URL(import.meta.url), "utf8");
  const retiredBlanketSpanishMessage = ["Services content must not publish Spanish ", "wording."].join("");
  const ids = ["interior-detail", "exterior-detail", "paint-correction", "ceramic-coating", "full-detail", "seat-upholstery-deep-cleaning", "headlight-restoration", "clay-bar-decontamination"];
  const exactKeys = (value, keys, label) => {
    if (!value || typeof value !== "object" || Array.isArray(value) || canonical(Object.keys(value)) !== canonical(keys)) fail(`${label} must contain exactly: ${keys.join(", ")}.`);
  };
  const sections = ["PageHero", "ServicesSection", "DiscountBanner"];
  if (!page.includes('const locale = "en-US";') || !page.includes('const pageId = "services";') || !page.includes('<ServicesComposition content={englishServicesContent} locale={locale} />') || !page.includes("locale={locale}") || !page.includes("pageId={pageId}") || /<(?:PageHero|ServicesSection|DiscountBanner)\b/.test(page)) fail("Services page must explicitly identify the English locale/page and render only through the shared composition.");
  if (composition.indexOf("<PageHero") === -1 || /<(?:div|main)\b/.test(composition.slice(0, composition.indexOf("<PageHero")))) fail("Services composition must not add a wrapper before PageHero.");
  const positions = sections.map((sectionName) => composition.indexOf(`<${sectionName}`));
  if (positions.some((position, index) => position === -1 || (index > 0 && position < positions[index - 1]))) fail("Services composition must retain the current section order.");

  const approvedDigest = "8d2cd90a9f164f7a0c1f10b110ec32e1e925a63bf244d6de4fbbf52d1b5caadf";
  if (spanishServicesContentDigest !== approvedDigest || digest(spanishServicesContent) !== approvedDigest) fail("Spanish Services content must canonicalize to the approved digest and export that exact digest.");
  exactKeys(spanishServicesContent, ["policy", "metadata", "hero", "intro", "grid", "cards"], "Spanish Services content");
  exactKeys(spanishServicesContent.policy, ["areaTeaser", "englishDetailDisclosure"], "Spanish Services policy");
  exactKeys(spanishServicesContent.metadata, ["title", "description", "socialImageAlt", "schemaName", "schemaDescription"], "Spanish Services metadata");
  exactKeys(spanishServicesContent.hero, ["eyebrow", "title", "description"], "Spanish Services hero");
  exactKeys(spanishServicesContent.intro, ["eyebrow", "title", "description", "benefits", "imageAlt", "processEyebrow", "processDescription"], "Spanish Services intro");
  if (!Array.isArray(spanishServicesContent.intro.benefits) || spanishServicesContent.intro.benefits.length !== 3) fail("Spanish Services intro must retain its approved three-benefit order.");
  spanishServicesContent.intro.benefits.forEach((benefit, index) => exactKeys(benefit, ["title", "description"], `Spanish Services benefit ${index}`));
  exactKeys(spanishServicesContent.grid, ["eyebrow", "title", "description"], "Spanish Services grid");
  exactKeys(spanishServicesContent.cards, ["detailAction", "englishDetailDisclosure", "byServiceId"], "Spanish Services cards");
  if (spanishServicesContent.policy.areaTeaser !== "omit" || spanishServicesContent.policy.englishDetailDisclosure !== "required" || Object.hasOwn(spanishServicesContent, "areaTeaser")) fail("Spanish Services must structurally omit its area teaser and require the English-detail disclosure.");
  if (verifierSource.includes(retiredBlanketSpanishMessage)) fail("The retired blanket Spanish Services-content prohibition must not coexist with approved-source assertions.");

  if (canonical(services.map(({ id }) => id)) !== canonical(ids) || canonical(Object.keys(spanishServicesContent.cards.byServiceId)) !== canonical(ids)) fail("Spanish card presentation must cover the canonical ServiceIds exactly in canonical order.");
  for (const id of ids) exactKeys(spanishServicesContent.cards.byServiceId[id], ["displayName", "summary"], `Spanish card ${id}`);
  if (/\b(?:slug|href|route|image|media|price|schema|relatedSlugs|ctaLine|includes)\b/.test(JSON.stringify(spanishServicesContent.cards.byServiceId))) fail("Spanish card presentation must not own canonical service facts.");
  if (!content.includes("services.map(({ id, name, description }) => [id, { displayName: name, summary: description }])")) fail("English card presentation must derive canonical names and current descriptions.");
  if (!grid.includes("services.map") || !card.includes("const href = `/services/${service.slug}`") || !card.includes("src={service.images[0]}")) fail("Canonical service records must retain card order, routing, and media.");
  if (!types.includes('export type ServicesAreaTeaser =') && !types.includes('type ServicesAreaTeaser =')) fail("Services types must discriminate structural area-teaser omission.");
  if (!types.includes('areaTeaser?: never') || !types.includes('export interface ServicesPromotionPolicy') || !types.includes('discountBanner: "include" | "omit"')) fail("Services types must forbid omitted teaser copy and model banner policy separately.");

  const disclosure = grid.indexOf('{englishDetailDisclosure && <p');
  const cards = grid.indexOf('<div class="grid grid-cols-1');
  const serviceComponents = [composition, section, grid, card];
  const disclosureRenderSites = serviceComponents.reduce((count, source) => count + (source.match(/\{englishDetailDisclosure\s*&&\s*<p\b/g) ?? []).length, 0);
  if (!grid.includes('content.policy.englishDetailDisclosure === "required"') || disclosureRenderSites !== 1 || disclosure === -1 || cards === -1 || disclosure > cards || card.includes("englishDetailDisclosure")) fail("The required disclosure must have exactly one pre-grid render site and none in ServiceCard.");
  if (!section.includes("<ServicesCatalogIntro content={content.intro} />") || !section.includes("<ServicesGrid content={content} />")) fail("Services sections must consume typed presentation content.");
  const areaTeaserIncludeChecks = (composition.match(/servicesContent\.policy\.areaTeaser === "include"/g) ?? []).length;
  const areaTeaserPresenceChecks = (composition.match(/areaTeaser === undefined/g) ?? []).length;
  const areaTeaserTemplateAccesses = (composition.match(/areaTeaserContent\.(?:eyebrow|title|description|action)\b/g) ?? []).length;
  const validatedAreaTeaserHelper = /function getAreaTeaser\([^)]*ServicesContent\): NonNullable<ServicesContent\["areaTeaser"\]> \| undefined/.test(composition);
  const teaserRendersOnlyFromHelper = composition.includes("{areaTeaserContent && (") && areaTeaserTemplateAccesses === 4 && !composition.includes("areaTeaserContent.areaTeaser.") && !/\{content\.areaTeaser\./.test(composition);
  if (areaTeaserIncludeChecks !== 1 || areaTeaserPresenceChecks !== 1 || !validatedAreaTeaserHelper || !teaserRendersOnlyFromHelper || !composition.includes('promotionPolicy.discountBanner === "include"') || !composition.includes('<DiscountBanner content={englishHomeContent.discountBanner} locale={locale} />') || !content.includes('"en-US": { areaTeaser: "include", englishDetailDisclosure: "not-required", discountBanner: "include" }') || !content.includes('"es-US": { areaTeaser: "omit", englishDetailDisclosure: "required", discountBanner: "omit" }')) fail("Services promotion policies must validate included teaser content, render it only from the helper, and preserve locale-gated banner omission.");
  if (!/<\/div>\{englishDetailDisclosure\s*&&\s*<p\b/.test(grid)) fail("The false English disclosure branch must be adjacent to existing markup and byte-neutral.");
  if (/discountBanner|promot|oferta|descuento/i.test(spanishContent)) fail("Spanish Services source must not invent discount-banner copy.");

  const spanishPages = ["src/pages/es/index.astro", "src/pages/es/[...page].astro"].map((file) => readFileSync(resolve(root, file), "utf8"));
  if (spanishPages.some((page) => !page.includes('locale={locale}')) || !spanishPages[0].includes('pageId={pageId}') || !spanishPages[1].includes('getCanonicalPagePath(pageId, locale)')) fail("Spanish pages must use explicit locale/page identity and canonical schema paths.");
  if (!spanishPages[0].includes('<HomeComposition content={spanishHomeContent} locale={locale} />') || !spanishPages[1].includes('<AboutComposition content={spanishAboutContent} />') || !spanishPages[1].includes('<ContactComposition content={spanishContactContent} />') || !spanishPages[1].includes('<ServicesComposition content={spanishServicesContent} locale={locale} />')) fail("Spanish pages must render only approved typed content through shared compositions.");
  if (/service-detail|services\/\[slug\]/.test(spanishPages.join("\n"))) fail("Spanish publication must not add a service-detail route.");
};

const verifyShellContracts = () => {
  const [routes, layout, seoHead, navbar, footer] = shellFiles.map((file) => readFileSync(file, "utf8"));
  const shellSources = [layout, seoHead, navbar, footer];
  if (!routes.includes('export const publishedSpanishPageIds: readonly PageId[] = ["home", "about", "contact", "services"];')) fail("Published Spanish route registry must activate exactly four page IDs.");
  if (!routes.includes("getPublishedCounterpart") || !routes.includes("getCandidateRoutePair(pageId)")) fail("Published counterparts must resolve from the candidate route registry.");
  if (/\bPublishedCounterpart\b/.test(routes) || shellSources.some((source) => /state:\s*[\"']published[\"']|\bPublishedCounterpart\b|counterpart\?:/.test(source))) fail("Shell callers must not be able to assert counterpart publication.");
  if (!layout.includes("locale = 'en-US'") || !layout.includes('lang={localeDefinition.htmlLang}') || !layout.includes("pageId?: PageId")) fail("Base layout must default to English and accept only a logical page ID.");
  if (!seoHead.includes("locale = 'en-US'") || !seoHead.includes('content={localeDefinition.ogLocale}') || !seoHead.includes("getPublishedCounterpart(pageId, locale)") || !seoHead.includes('{counterpartHref && (')) fail("SEO alternates must resolve a published counterpart from the registry.");
  if (!routes.includes("export type ShellDestination") || !routes.includes("export const getShellDestinationPath") || !routes.includes('destination === "service-area-bay-area-en"')) fail("Shell destinations must resolve only through the canonical route registry.");
  if (getShellDestinationPath("home", "en-US") !== "/" || getShellDestinationPath("home", "es-US") !== "/es/" || getShellDestinationPath("service-area-bay-area-en", "en-US") !== "/service-area/bay-area/" || getShellDestinationPath("service-area-bay-area-en", "es-US") !== "/service-area/bay-area/") fail("Shell destinations must resolve canonical locale paths and the English-only service area.");
  if (/"href"\s*:/.test(JSON.stringify(englishShellContent)) || /"href"\s*:/.test(JSON.stringify(spanishShellContent))) fail("Localized shell content must not own hrefs.");
  if (!layout.includes("const shellContent = locale === 'es-US' ? spanishShellContent : englishShellContent;") || !layout.includes("<Navbar content={shellContent} locale={locale} pageId={pageId} />") || !layout.includes("<Footer content={shellContent} locale={locale} pageId={pageId} />")) fail("Base layout must derive and pass locale-matched shell content.");
  if (!navbar.includes("getShellDestinationPath") || !navbar.includes("navigationIcons") || !navbar.includes("content.brandLogoAlt") || !navbar.includes("content.languageControl.label") || !navbar.includes("content.languageControl.destinationLabel") || !navbar.includes("aria-label={languageControlLabel}") || !navbar.includes("content.menu.openLabel") || !navbar.includes("content.menu.closeLabel") || !navbar.includes("content.menu.heading") || !navbar.includes("content.menu.subtitle") || !navbar.includes("content.menu.currentPageLabel") || !navbar.includes("content.menu.openSectionLabel")) fail("Navbar must consume shell content and resolve canonical destinations.");
  if ((navbar.match(/aria-label=\{content\.menu\.closeLabel\}/g) ?? []).length !== 2 || /aria-label=["'](?:Open menu|Close menu)["']|>\s*Duartes menu\s*<|>\s*Premium mobile detailing, one tap away\.\s*</.test(navbar)) fail("Navbar must not retain hard-coded approved shell labels.");
  if (!footer.includes("getShellDestinationPath") || !footer.includes("content.brandLogoAlt") || !footer.includes("content.footer.navigationLabel") || !footer.includes("content.footer.socialLabel") || !footer.includes("content.footer.links") || !footer.includes("content.footer.copyrightSuffix") || !footer.includes("content.footer.socialLinks") || !footer.includes("content.languageControl.label") || !footer.includes("content.languageControl.destinationLabel") || !footer.includes("aria-label={languageControlLabel}")) fail("Footer must consume shell labels and resolve canonical destinations.");
  for (const [name, source] of [["Navbar", navbar], ["Footer", footer]]) {
    if (!source.includes("pageId?: PageId") || !source.includes("getPublishedCounterpart(pageId, locale)") || !source.includes("{counterpart && (")) fail(`${name} must resolve language switches from the published route registry.`);
  }
};

const selfTest = () => {
  const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (verifyRecords(ledger, manifest).join() !== "home,about,contact,services") fail("Approved fixture did not publish the exact route set.");
  const cases = [
    ["changed digest", { ...ledger, blocks: { ...ledger.blocks, home: { ...ledger.blocks.home, sha256: "changed" } } }],
    ["unknown route", { ...ledger, routes: { ...ledger.routes, unknown: ledger.routes.home } }],
    ["incomplete route", { ...ledger, routes: { ...ledger.routes, home: {} } }],
  ];
  for (const [name, invalid] of cases) { try { verifyRecords(invalid, manifest); fail(`Fixture passed: ${name}`); } catch (error) { if (error.message === `Fixture passed: ${name}`) throw error; } }
  try { verifyRecords(ledger, { ...manifest, blocks: {} }); fail("Fixture passed: missing dependency"); } catch (error) { if (error.message === "Fixture passed: missing dependency") throw error; }
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
verifyHomeDiscountBannerContract();
verifyApprovedSpanishSources();
const published = verifyRecords(ledger, existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : null);
if (canonical(published) !== canonical(["home", "about", "contact", "services"]) || canonical(publishedSpanishPageIds) !== canonical(published)) fail("Publication registry must activate exactly the approved four Spanish routes.");
if (process.argv.includes("--self-test")) selfTest();
console.log("i18n source verification passed for the four published Spanish routes.");
