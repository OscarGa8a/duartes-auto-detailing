import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const siteBase = process.env.SITE_URL ?? "https://duartesautodetailing.com";

const serviceAreaRoutes = new Map([
	["/service-area/bay-area/", "Bay Area"],
	["/service-area/walnut-creek/", "Walnut Creek"],
	["/service-area/alameda/", "Alameda"],
	["/service-area/fremont/", "Fremont"],
	["/service-area/hayward/", "Hayward"],
	["/service-area/oakland/", "Oakland"],
	["/service-area/berkeley/", "Berkeley"],
	["/service-area/richmond/", "Richmond"],
	["/service-area/livermore/", "Livermore"],
	["/service-area/palo-alto/", "Palo Alto"],
	["/service-area/san-jose/", "San Jose"],
	["/service-area/san-mateo/", "San Mateo"],
	["/service-area/pleasanton/", "Pleasanton"],
	["/service-area/union-city/", "Union City"],
	["/service-area/san-leandro/", "San Leandro"],
	["/service-area/dublin/", "Dublin"],
	["/service-area/castro-valley/", "Castro Valley"],
	["/service-area/san-francisco/", "San Francisco"],
]);

const staticRedirects = new Map([
	["/service-area/walnut/", "/service-area/walnut-creek/"],
]);

const expectedServiceAreaCities = [...serviceAreaRoutes.values()].filter(
	(name) => name !== "Bay Area",
);
const expectedRelatedCityRoutes = new Map([
	["/service-area/walnut-creek/", ["/service-area/pleasanton/", "/service-area/dublin/", "/service-area/livermore/"]],
	["/service-area/alameda/", ["/service-area/oakland/", "/service-area/berkeley/", "/service-area/san-leandro/"]],
	["/service-area/fremont/", ["/service-area/union-city/", "/service-area/hayward/", "/service-area/castro-valley/"]],
	["/service-area/hayward/", ["/service-area/castro-valley/", "/service-area/union-city/", "/service-area/fremont/"]],
	["/service-area/oakland/", ["/service-area/alameda/", "/service-area/berkeley/", "/service-area/san-leandro/"]],
	["/service-area/berkeley/", ["/service-area/oakland/", "/service-area/alameda/", "/service-area/richmond/"]],
	["/service-area/richmond/", ["/service-area/berkeley/", "/service-area/oakland/", "/service-area/alameda/"]],
	["/service-area/livermore/", ["/service-area/pleasanton/", "/service-area/dublin/", "/service-area/walnut-creek/"]],
	["/service-area/palo-alto/", ["/service-area/san-mateo/", "/service-area/san-jose/", "/service-area/san-francisco/"]],
	["/service-area/san-jose/", ["/service-area/fremont/", "/service-area/palo-alto/", "/service-area/san-mateo/"]],
	["/service-area/san-mateo/", ["/service-area/palo-alto/", "/service-area/san-francisco/", "/service-area/san-jose/"]],
	["/service-area/pleasanton/", ["/service-area/dublin/", "/service-area/livermore/", "/service-area/walnut-creek/"]],
	["/service-area/union-city/", ["/service-area/fremont/", "/service-area/hayward/", "/service-area/castro-valley/"]],
	["/service-area/san-leandro/", ["/service-area/hayward/", "/service-area/oakland/", "/service-area/alameda/"]],
	["/service-area/dublin/", ["/service-area/pleasanton/", "/service-area/livermore/", "/service-area/walnut-creek/"]],
	["/service-area/castro-valley/", ["/service-area/hayward/", "/service-area/san-leandro/", "/service-area/union-city/"]],
	["/service-area/san-francisco/", ["/service-area/san-mateo/", "/service-area/palo-alto/", "/service-area/oakland/"]],
]);
const cityServiceAreaRoutes = new Set(expectedRelatedCityRoutes.keys());
const unsupportedCityPageClaims = /\b(?:shoreline exposure|campus-area driving|daily commuting|commuting|family schedules|family routines|family vehicles|city dust|road grime|weekend travel|workday appointments|multi-car households|longer commutes|school routes|school schedules|outdoor plans|busy week|packed day|popular detailing options|recommended services|nearby priority pages|physical presence|storefront|neighborhood expertise|same-day|fastest|guarantee|travel time|minutes away|miles away|parking permission)\b/i;

const expectedWeekdays = [
	"https://schema.org/Monday",
	"https://schema.org/Tuesday",
	"https://schema.org/Wednesday",
	"https://schema.org/Thursday",
	"https://schema.org/Friday",
	"https://schema.org/Saturday",
	"https://schema.org/Sunday",
];
const expectedBusinessId = new URL("#duartes-auto-detailing", siteBase).href;
const expectedWebsiteId = new URL("#website", siteBase).href;
const expectedLogoUrl = new URL("/images/logo.png", siteBase).href;
const expectedFallbackSocialImage =
	"https://res.cloudinary.com/dkq4plo7s/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/og-image_usi1ab";
const cloudinaryImageUrl = (publicId, transformations) =>
	`https://res.cloudinary.com/dkq4plo7s/image/upload/${transformations}/${publicId}`;
const serviceImageTransformations = "f_auto,q_auto,w_1200,h_630,c_fill";
const expectedLlmsH1 = "Duartes Auto Detailing";
const expectedLlmsSummary =
	"Mobile auto detailing for vehicles in the Bay Area, including Alameda, Berkeley, Castro Valley, Dublin, Fremont, Hayward, Livermore, Oakland, Palo Alto, Pleasanton, Richmond, San Francisco, San Jose, San Leandro, San Mateo, Union City, and Walnut Creek.";
const expectedLlmsSections = ["Primary Business Pages", "Services", "Service Areas"];
const expectedLlmsLinks = new Set([
	"https://duartesautodetailing.com/",
	"https://duartesautodetailing.com/about/",
	"https://duartesautodetailing.com/contact/",
	"https://duartesautodetailing.com/services/",
	"https://duartesautodetailing.com/services/interior-detailing/",
	"https://duartesautodetailing.com/services/exterior-detailing/",
	"https://duartesautodetailing.com/services/paint-correction/",
	"https://duartesautodetailing.com/services/ceramic-coating/",
	"https://duartesautodetailing.com/services/full-detailing/",
	"https://duartesautodetailing.com/services/seat-upholstery-deep-cleaning/",
	"https://duartesautodetailing.com/services/headlight-restoration/",
	"https://duartesautodetailing.com/services/clay-bar-decontamination/",
	...serviceAreaRoutes.keys()].map((route) => new URL(route, siteBase).href),
);
const forbiddenLlmsFacts = [
	[/\b(?:appointment-only|private)\s+(?:Hayward\s+)?address\b/i, "private appointment-only address"],
	[/\b\d{1,5}\s+[\w.'-]+(?:\s+[\w.'-]+){0,4}\s+(?:street|st\.?|avenue|ave\.?|road|rd\.?|boulevard|blvd\.?|drive|dr\.?|lane|ln\.?|court|ct\.?)\b/i, "street address"],
	[/[$€£]|\b(?:price|pricing|cost|rate|starting at)\b/i, "prices"],
	[/\b(?:rating|rated|review(?:s)?|stars?)\b/i, "ratings or reviews"],
	[/\b(?:guarantee|guaranteed)\b/i, "guarantees"],
	[/\b\d{1,3}(?:,\d{3})+\b|\b\d+\+?\s+years?\b/i, "unverifiable statistics"],
	[/\b(?:rank(?:ing)?|AI[- ]visibility|search visibility|citation(?:s)?)\b/i, "ranking or AI-visibility claims"],
];

const expectedServiceDetails = new Map([
	["/services/interior-detailing/", { name: "Interior Detail", publicId: "img14_yapstm" }],
	["/services/exterior-detailing/", { name: "Exterior Detail", publicId: "img10_ny7bbo" }],
	["/services/paint-correction/", { name: "Paint Correction", publicId: "img1_pl62ks" }],
	["/services/ceramic-coating/", { name: "Ceramic Coating", publicId: "img1_yqzcqr" }],
	["/services/full-detailing/", { name: "Full Detail (Interior - Exterior)", publicId: "img5_tfs4mg" }],
	["/services/seat-upholstery-deep-cleaning/", { name: "Seat & Upholstery Deep Cleaning", publicId: "img4_yy8jcu" }],
	["/services/headlight-restoration/", { name: "Headlight Restoration", publicId: "img1_q5lnkj" }],
	["/services/clay-bar-decontamination/", { name: "Clay Bar Decontamination", publicId: "img1_ufdvdm" }],
]);
const expectedExplicitSocialImages = new Map([
	["/", cloudinaryImageUrl("og-image_usi1ab", "f_auto,q_auto")],
	["/services/", cloudinaryImageUrl("img14_yapstm", serviceImageTransformations)],
	...Array.from(expectedServiceDetails, ([route, service]) => [
		route,
		cloudinaryImageUrl(service.publicId, serviceImageTransformations),
	]),
]);
const expectedPageSchemas = new Map([
	[
		"/about/",
		{
			type: "AboutPage",
			name: "About Duartes Auto Detailing",
			description:
				"Meet Duartes Auto Detailing — 6+ years of experience, with over 10,000 vehicles detailed throughout the Bay Area, California.",
			relationship: "about",
		},
	],
	[
		"/contact/",
		{
			type: "ContactPage",
			name: "Contact Duartes Auto Detailing",
			description:
				"Book Bay Area mobile auto detailing via WhatsApp, text message, Instagram, or email. Duartes Auto Detailing is a 100% mobile service.",
			relationship: "mainEntity",
		},
	],
]);
const expectedTelephone = "+16692868649";
const expectedSameAs = new Set([
	"https://www.tiktok.com/@duartesdetailing",
	"https://www.facebook.com/profile.php?id=61577394432288",
	"https://www.instagram.com/duartes_detailing/",
]);
const expectedAutoWashOffers = new Map([
	["Interior Detail", "Interior Detail"],
	["Exterior Detail", "Exterior Detail"],
	["Paint Correction", "Paint Correction"],
	["Ceramic Coating", "Ceramic Coating"],
	["Full Detail (Interior - Exterior)", "Full Detail (Interior - Exterior)"],
	["Seat & Upholstery Deep Cleaning", "Seat & Upholstery Deep Cleaning"],
	["Headlight Restoration", "Headlight Restoration"],
	["Clay Bar Decontamination", "Clay Bar Decontamination"],
]);
const forbiddenAutoWashProperties = new Set([
	"address",
	"priceRange",
	"hasMap",
	"aggregateRating",
	"review",
	"reviews",
]);

const failures = [];

function fail(file, message) {
	failures.push(`${relative(process.cwd(), file)}: ${message}`);
}

function getHtmlFiles(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) return getHtmlFiles(path);
		return entry.isFile() && entry.name === "index.html" ? [path] : [];
	});
}

function getSitemapFiles(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) return getSitemapFiles(path);
		return entry.isFile() && /^sitemap.*\.xml$/i.test(entry.name) ? [path] : [];
	});
}

function getRoute(file) {
	const rel = relative(distDir, file).split(sep).join("/");
	const withoutIndex = rel.replace(/(^|\/)index\.html$/, "$1");
	return `/${withoutIndex}`.replace(/\/\/$/, "/");
}

function decodeHtml(value) {
	return value
		.replace(/&#(x[\da-f]+|\d+);/gi, (_, entity) =>
			String.fromCodePoint(
				entity.toLowerCase().startsWith("x")
					? Number.parseInt(entity.slice(1), 16)
					: Number.parseInt(entity, 10),
			),
		)
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">");
}

function normalizePath(pathname) {
	if (pathname === "/") return pathname;
	return pathname.replace(/\/$/, "");
}

function getRobotsDirectives(robots) {
	return new Set(
		(robots ?? "")
			.toLowerCase()
			.split(",")
			.map((directive) => directive.trim())
			.filter(Boolean),
	);
}

function getTitle(html) {
	const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
	return title ? decodeHtml(title) : undefined;
}

function getAttrs(tag) {
	return Object.fromEntries(
		[...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map(
			([, key, , value]) => [key.toLowerCase(), decodeHtml(value)],
		),
	);
}

function findTag(html, tagName, predicate) {
	const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
	return tags.find((tag) => predicate(getAttrs(tag)));
}

function getMeta(html, attrName, attrValue) {
	const tag = findTag(html, "meta", (attrs) => attrs[attrName] === attrValue);
	return tag ? getAttrs(tag).content : undefined;
}

function getLink(html, rel) {
	const tag = findTag(html, "link", (attrs) => attrs.rel === rel);
	return tag ? getAttrs(tag).href : undefined;
}

function getHrefPaths(hrefs) {
	return hrefs.flatMap((href) => {
		if (
			!href ||
			href.startsWith("#") ||
			href.startsWith("mailto:") ||
			href.startsWith("tel:")
		)
			return [];

		try {
			const url = new URL(href, siteBase);
			return url.origin === new URL(siteBase).origin ? [url.pathname] : [];
		} catch {
			return [];
		}
	});
}

function getInternalHrefPaths(html) {
	const hrefs = [...html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi)].map(
		([, , href]) => decodeHtml(href),
	);
	return getHrefPaths(hrefs);
}

function getRouteLinks(html) {
	const hrefs = [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi)].map(
		([, , href]) => decodeHtml(href),
	);
	return new Set(getHrefPaths(hrefs));
}

function isUnpublishedSpanishPath(pathname) {
	return pathname === "/es" || pathname.startsWith("/es/");
}

function getSitemapLocations(files) {
	return files.flatMap((file) => {
		const xml = readFileSync(file, "utf8");
		return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(([, loc]) =>
			decodeHtml(loc.trim()),
		);
	});
}

function getText(html) {
	return decodeHtml(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function getH1Contexts(html) {
	const contexts = [];
	const ancestors = [];
	const voidElements = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

	for (const match of html.matchAll(/<\/?([a-z][\w:-]*)\b[^>]*>/gi)) {
		const [tag, tagName] = match;
		const normalizedTagName = tagName.toLowerCase();

		if (tag.startsWith("</")) {
			const ancestorIndex = ancestors.map((ancestor) => ancestor.tagName).lastIndexOf(normalizedTagName);
			if (ancestorIndex !== -1) ancestors.splice(ancestorIndex);
			continue;
		}

		const attrs = getAttrs(tag);
		if (normalizedTagName === "h1") contexts.push({ attrs, ancestors: [...ancestors] });
		if (!voidElements.has(normalizedTagName) && !tag.endsWith("/>")) {
			ancestors.push({ tagName: normalizedTagName, attrs });
		}
	}

	return contexts;
}

function isHiddenOnMobile(attrs) {
	const classes = new Set((attrs.class ?? "").split(/\s+/).filter(Boolean));
	return (
		classes.has("hidden") ||
		[...classes].some((className) => /^max-(?:sm|md|lg|xl|2xl):hidden$/.test(className))
	);
}

function isMobileHiddenH1(h1) {
	if (isHiddenOnMobile(h1.attrs)) return true;

	return h1.ancestors.some((ancestor) => {
		if (!isHiddenOnMobile(ancestor.attrs)) return false;
		return [...(ancestor.attrs.class ?? "").split(/\s+/)].some((className) =>
			/^(?:sm|md|lg|xl|2xl):(block|inline|inline-block|flex|grid|contents|table)$/.test(className),
		);
	});
}

function getVisibleFaqs(html) {
	return [...html.matchAll(/<details\b[^>]*>[\s\S]*?<summary\b[^>]*>([\s\S]*?)<\/summary>[\s\S]*?<p\b[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/details>/gi)].map(
		([, question, answer]) => ({ question: getText(question), answer: getText(answer) }),
	);
}

function normalizeCityGuide(guide) {
	const cityAndRegionTokens = [...expectedServiceAreaCities, "Bay Area", "East Bay", "Tri-Valley", "Peninsula", "South Bay", "San Francisco"]
		.sort((left, right) => right.length - left.length)
		.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
	return getText(guide)
		.toLowerCase()
		.replace(new RegExp(`\\b(?:${cityAndRegionTokens.join("|")})\\b`, "gi"), "")
		.replace(/\s+/g, " ")
		.trim();
}

function isValidFaqPage(faqPage) {
	return (
		faqPage?.["@context"] === "https://schema.org" &&
		faqPage?.["@type"] === "FAQPage" &&
		Array.isArray(faqPage.mainEntity) &&
		faqPage.mainEntity.every(
			(item) =>
				item?.["@type"] === "Question" &&
				typeof item.name === "string" &&
				item.acceptedAnswer?.["@type"] === "Answer" &&
				typeof item.acceptedAnswer.text === "string",
		)
	);
}

function getJsonLdBlocks(html) {
	return [
		...html.matchAll(
			/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
		),
	]
		.map(([, json]) => json.trim())
		.filter(Boolean);
}

function parseJsonLd(file, blocks) {
	return blocks.flatMap((block) => {
		try {
			const parsed = JSON.parse(block);
			return Array.isArray(parsed) ? parsed : [parsed];
		} catch (error) {
			fail(file, `invalid JSON-LD (${error.message})`);
			return [];
		}
	});
}

function hasJsonLdType(items, type) {
	return items.some((item) => item?.["@type"] === type);
}

function findJsonLdType(items, type) {
	return items.find((item) => item?.["@type"] === type);
}

function stringifyJsonLd(value) {
	return JSON.stringify(value ?? {});
}

function hasForbiddenAutoWashData(value) {
	if (!value || typeof value !== "object") return false;
	if (Array.isArray(value)) return value.some(hasForbiddenAutoWashData);
	return (
		value["@type"] === "PostalAddress" ||
		Object.entries(value).some(
			([key, nestedValue]) =>
				forbiddenAutoWashProperties.has(key) || hasForbiddenAutoWashData(nestedValue),
		)
	);
}

function hasLegacyWalnutArea(value) {
	if (value === "Walnut, California") return true;
	if (!value || typeof value !== "object") return false;
	return Array.isArray(value)
		? value.some(hasLegacyWalnutArea)
		: Object.values(value).some(hasLegacyWalnutArea);
}

function verifyAutoWash(file, autoWash) {
	if (hasForbiddenAutoWashData(autoWash)) {
		fail(file, "AutoWash JSON-LD must not expose address, ratings, reviews, price, or map data");
	}
	if (hasLegacyWalnutArea(autoWash)) {
		fail(file, "AutoWash JSON-LD must not include legacy Walnut, California");
	}
	if (autoWash["@id"] !== expectedBusinessId) {
		fail(file, `AutoWash JSON-LD @id must be ${expectedBusinessId}`);
	}
	if (autoWash.telephone !== expectedTelephone) {
		fail(file, `AutoWash JSON-LD telephone must be ${expectedTelephone}`);
	}
	if (autoWash.logo !== expectedLogoUrl || autoWash.image !== expectedLogoUrl) {
		fail(file, `AutoWash JSON-LD logo and image must be ${expectedLogoUrl}`);
	}
	if (
		!Array.isArray(autoWash.sameAs) ||
		autoWash.sameAs.length !== expectedSameAs.size ||
		new Set(autoWash.sameAs).size !== expectedSameAs.size ||
		!autoWash.sameAs.every((url) => expectedSameAs.has(url))
	) {
		fail(file, "AutoWash JSON-LD sameAs must match the filtered HTTPS social profiles");
	}
	const offers = autoWash.makesOffer;
	const offeredServiceNames = new Set(
		Array.isArray(offers) ? offers.map((offer) => offer?.itemOffered?.name) : [],
	);
	if (
		!Array.isArray(offers) ||
		offers.length !== expectedAutoWashOffers.size ||
		offeredServiceNames.size !== expectedAutoWashOffers.size ||
		![...expectedAutoWashOffers.keys()].every((name) => offeredServiceNames.has(name)) ||
		offers.some(
			(offer) =>
				offer?.["@type"] !== "Offer" ||
				offer.itemOffered?.["@type"] !== "Service" ||
				expectedAutoWashOffers.get(offer.itemOffered.name) !==
					offer.itemOffered.serviceType ||
				offer.itemOffered.provider?.["@id"] !== expectedBusinessId,
		)
	) {
		fail(file, "AutoWash JSON-LD makesOffer must exactly match the eight canonical services");
	}

	const openingHours = autoWash.openingHoursSpecification;
	if (!Array.isArray(openingHours) || openingHours.length !== 1) {
		fail(file, "AutoWash JSON-LD must include one OpeningHoursSpecification");
	} else {
		const [specification] = openingHours;
		const days = specification?.dayOfWeek;
		if (
			specification?.["@type"] !== "OpeningHoursSpecification" ||
			specification.opens !== "06:00" ||
			specification.closes !== "20:00" ||
			!Array.isArray(days) ||
			days.length !== expectedWeekdays.length ||
			!expectedWeekdays.every((day) => days.includes(day))
		) {
			fail(file, "AutoWash JSON-LD hours must cover Monday-Sunday from 06:00 to 20:00");
		}
	}

	const areas = autoWash.areaServed;
	if (!Array.isArray(areas)) {
		fail(file, "AutoWash JSON-LD areaServed must include the Bay Area and every confirmed city");
		return;
	}

	const bayArea = areas.find((area) => area?.["@type"] === "AdministrativeArea");
	if (bayArea?.name !== "Bay Area, California") {
		fail(file, "AutoWash JSON-LD areaServed must include Bay Area, California");
	}
	for (const city of expectedServiceAreaCities) {
		const servedCity = areas.find((area) => area?.name === `${city}, California`);
		if (
			servedCity?.["@type"] !== "City" ||
			servedCity.containedInPlace?.["@type"] !== "AdministrativeArea" ||
			servedCity.containedInPlace.name !== "Bay Area, California"
		) {
			fail(file, `AutoWash JSON-LD areaServed must include ${city}, California`);
		}
	}
}

function verifyLlmsOutput() {
	const llmsFile = join(distDir, "llms.txt");
	const llmsFullFile = join(distDir, "llms-full.txt");

	if (!existsSync(llmsFile)) {
		fail(distDir, "missing generated llms.txt");
	} else {
		const llms = readFileSync(llmsFile, "utf8");
		const lines = llms.split(/\r?\n/);
		if (lines[0] !== `# ${expectedLlmsH1}`) fail(llmsFile, `H1 must be # ${expectedLlmsH1}`);
		if (!lines.includes(`> ${expectedLlmsSummary}`)) fail(llmsFile, "missing or incorrect summary blockquote");

		const sections = lines.filter((line) => line.startsWith("## ")).map((line) => line.slice(3));
		if (JSON.stringify(sections) !== JSON.stringify(expectedLlmsSections)) {
			fail(llmsFile, `H2 sections must exactly be ${expectedLlmsSections.join(", ")}`);
		}

		const markdownLinks = [...llms.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(([, href]) => href);
		const listLinks = lines
			.filter((line) => /^- \[[^\]]+\]\([^)]+\): .+$/.test(line))
			.map((line) => line.match(/\[[^\]]+\]\(([^)]+)\)/)?.[1]);
		if (markdownLinks.length !== listLinks.length) fail(llmsFile, "every Markdown link must use an unordered-list item with a v2 colon description");
		if (listLinks.length !== expectedLlmsLinks.size) {
			fail(llmsFile, `must contain exactly ${expectedLlmsLinks.size} unordered canonical links`);
		}
		if (new Set(listLinks).size !== listLinks.length) fail(llmsFile, "must not contain duplicate links");

		for (const href of listLinks) {
			try {
				const url = new URL(href);
				if (url.protocol !== "https:" || url.origin !== siteBase || url.href !== href) {
					fail(llmsFile, `link must be an absolute canonical HTTPS URL: ${href}`);
				}
			} catch {
				fail(llmsFile, `link must be an absolute canonical HTTPS URL: ${href}`);
			}
			if (!expectedLlmsLinks.has(href)) fail(llmsFile, `unexpected link ${href}`);
		}
		for (const href of expectedLlmsLinks) {
			if (!listLinks.includes(href)) fail(llmsFile, `missing required link ${href}`);
		}
		if (llms.includes("https://duartesautodetailing.com/service-area/walnut/")) {
			fail(llmsFile, "must not include the legacy /service-area/walnut/ route");
		}
		for (const [pattern, description] of forbiddenLlmsFacts) {
			if (pattern.test(llms)) fail(llmsFile, `must not include ${description}`);
		}
	}
	if (existsSync(llmsFullFile)) fail(llmsFullFile, "llms-full.txt must not be generated");
}

function expectedJsonLdTypes(route) {
	if (route === "/") return ["AutoWash", "WebSite"];
	if (route === "/services/") return ["AutoWash", "ItemList"];
	if (route !== "/services/" && route.startsWith("/services/"))
		return ["AutoWash", "Service", "BreadcrumbList"];
	if (serviceAreaRoutes.has(route))
		return ["AutoWash", "Service", "BreadcrumbList"];
	if (expectedPageSchemas.has(route)) return [expectedPageSchemas.get(route).type];
	return [];
}

if (!existsSync(distDir)) {
	console.error(
		"dist/ was not found. Run `pnpm build` before `pnpm run test:seo`.",
	);
	process.exit(1);
}

verifyLlmsOutput();

const htmlFiles = getHtmlFiles(distDir);
const sitemapFiles = getSitemapFiles(distDir);

if (htmlFiles.length === 0) {
	console.error(
		"No generated HTML files found in dist/. Run `pnpm build` first.",
	);
	process.exit(1);
}

const generatedRoutes = new Set(htmlFiles.map(getRoute));
if ([...generatedRoutes].some(isUnpublishedSpanishPath)) {
	fail(distDir, "Spanish routes must not be generated before publication");
}
const generatedServiceDetailRoutes = new Set(
	[...generatedRoutes].filter(
		(route) => route !== "/services/" && route.startsWith("/services/"),
	),
);
const expectedServiceDetailRoutes = new Set(expectedServiceDetails.keys());
for (const route of expectedServiceDetailRoutes) {
	if (!generatedServiceDetailRoutes.has(route)) {
		fail(distDir, `missing generated service-detail route ${route}`);
	}
}
for (const route of generatedServiceDetailRoutes) {
	if (!expectedServiceDetailRoutes.has(route)) {
		fail(distDir, `unexpected generated service-detail route ${route}`);
	}
}
const routeFiles = new Map(htmlFiles.map((file) => [getRoute(file), file]));
const sitemapLocations = getSitemapLocations(sitemapFiles);
const sitemapLocationSet = new Set(sitemapLocations);
if (sitemapLocations.some((location) => isUnpublishedSpanishPath(new URL(location).pathname))) {
	fail(distDir, "sitemap must not include unpublished Spanish routes");
}
const titles = new Map();
const descriptions = new Map();
const normalizedCityGuides = new Map();

if (sitemapFiles.length === 0) {
	fail(distDir, "missing generated sitemap XML files");
}

for (const location of sitemapLocations) {
	if (sitemapLocations.filter((item) => item === location).length > 1) {
		fail(distDir, `sitemap contains duplicate <loc> ${location}`);
	}
}

const robotsFile = join(distDir, "robots.txt");
if (!existsSync(robotsFile)) {
	fail(distDir, "missing generated robots.txt");
} else {
	const sitemapReferences = [...readFileSync(robotsFile, "utf8").matchAll(/^sitemap:\s*(\S+)\s*$/gim)].map(
		([, reference]) => reference,
	);
	if (sitemapReferences.length === 0) {
		fail(robotsFile, "robots.txt must reference a generated sitemap file");
	}
	for (const reference of sitemapReferences) {
		try {
			const sitemapUrl = new URL(reference, siteBase);
			const matchesGeneratedSitemap = sitemapFiles.some(
				(file) => new URL(relative(distDir, file).split(sep).join("/"), siteBase).href === sitemapUrl.href,
			);
			if (!matchesGeneratedSitemap) {
				fail(robotsFile, `references missing generated sitemap ${reference}`);
			}
		} catch (error) {
			fail(robotsFile, `invalid sitemap reference ${reference} (${error.message})`);
		}
	}
}

for (const route of serviceAreaRoutes.keys()) {
	if (!generatedRoutes.has(route))
		fail(distDir, `missing generated service-area route ${route}`);

	const expectedSitemapUrl = new URL(route, siteBase).href;
	if (!sitemapLocationSet.has(expectedSitemapUrl)) {
		fail(
			distDir,
			`sitemap must include service-area route ${expectedSitemapUrl}`,
		);
	}
}

for (const [from, to] of staticRedirects) {
	const redirectFile = routeFiles.get(from);
	if (!redirectFile) {
		fail(distDir, `missing generated redirect route ${from}`);
		continue;
	}

	const html = readFileSync(redirectFile, "utf8");
	if (!html.includes(`http-equiv="refresh" content="0;url=${to}"`)) {
		fail(redirectFile, `must redirect to ${to}`);
	}

	const redirectUrl = new URL(from, siteBase).href;
	if (sitemapLocationSet.has(redirectUrl)) {
		fail(redirectFile, `redirect URL ${redirectUrl} must not appear in sitemap output`);
	}
}

for (const [route, file] of routeFiles) {
	if (staticRedirects.has(route)) continue;
	const links = getRouteLinks(readFileSync(file, "utf8"));

	if (!links.has("/service-area/bay-area/")) {
		fail(file, "internal navigation must link to /service-area/bay-area/");
	}
}

const servicesFile = routeFiles.get("/services/");
if (servicesFile) {
	const servicesLinks = getRouteLinks(readFileSync(servicesFile, "utf8"));
	if (!servicesLinks.has("/service-area/bay-area/")) {
		fail(servicesFile, "services page must link to /service-area/bay-area/");
	}
}

const hubFile = routeFiles.get("/service-area/bay-area/");
if (hubFile) {
	const hubLinks = getRouteLinks(readFileSync(hubFile, "utf8"));
	for (const route of serviceAreaRoutes.keys()) {
		if (route !== "/service-area/bay-area/" && !hubLinks.has(route)) {
			fail(hubFile, `service-area hub must link to ${route}`);
		}
	}
}

for (const file of htmlFiles) {
	const html = readFileSync(file, "utf8");
	const route = getRoute(file);
	if (staticRedirects.has(route)) continue;
	if (!/<html\b[^>]*\blang=["']en-US["']/i.test(html)) fail(file, "html lang must be en-US");
	if (/\bhreflang=["']/i.test(html) || /<link\b[^>]*\brel=["']alternate["']/i.test(html)) {
		fail(file, "must not publish alternate language metadata without a published counterpart");
	}
	if (getInternalHrefPaths(html).some(isUnpublishedSpanishPath)) fail(file, "must not link to unpublished Spanish routes");
	const expectedCanonical = new URL(route, siteBase);
	const title = getTitle(html);
	const description = getMeta(html, "name", "description");
	const robots = getMeta(html, "name", "robots");
	const canonical = getLink(html, "canonical");
	const ogUrl = getMeta(html, "property", "og:url");
	const ogTitle = getMeta(html, "property", "og:title");
	const ogDescription = getMeta(html, "property", "og:description");
	const ogLocale = getMeta(html, "property", "og:locale");
	const ogImage = getMeta(html, "property", "og:image");
	const ogImageAlt = getMeta(html, "property", "og:image:alt");
	const twitterCard = getMeta(html, "name", "twitter:card");
	const twitterTitle = getMeta(html, "name", "twitter:title");
	const twitterDescription = getMeta(html, "name", "twitter:description");
	const twitterImage = getMeta(html, "name", "twitter:image");
	const twitterImageAlt = getMeta(html, "name", "twitter:image:alt");

	if (!title) fail(file, "missing <title>");
	if (!description) fail(file, "missing meta description");
	const robotsDirectives = getRobotsDirectives(robots);
	if (robotsDirectives.has("noindex") || robotsDirectives.has("nofollow")) {
		fail(file, "robots meta must not include noindex or nofollow");
	}
	if (!robotsDirectives.has("index") || !robotsDirectives.has("follow")) {
		fail(file, "robots meta must explicitly allow indexing and following");
	}
	if (!canonical) fail(file, "missing canonical link");
	const h1Contexts = getH1Contexts(html);
	if (h1Contexts.length !== 1) {
		fail(file, "indexable pages must contain exactly one <h1>");
	}
	if (route === "/" && h1Contexts.length === 1 && isMobileHiddenH1(h1Contexts[0])) {
		fail(file, "the sole homepage <h1> must remain visible on mobile");
	}

	if (title) {
		const duplicate = titles.get(title);
		if (duplicate) fail(file, `duplicate <title> also used by ${relative(process.cwd(), duplicate)}`);
		titles.set(title, file);
	}
	if (description) {
		const duplicate = descriptions.get(description);
		if (duplicate) fail(file, `duplicate meta description also used by ${relative(process.cwd(), duplicate)}`);
		descriptions.set(description, file);
	}

	if (canonical) {
		try {
			const canonicalUrl = new URL(canonical);
			if (canonicalUrl.origin !== expectedCanonical.origin) {
				fail(
					file,
					`canonical origin ${canonicalUrl.origin} does not match ${expectedCanonical.origin}`,
				);
			}
			const canonicalPathMatches = serviceAreaRoutes.has(route)
				? canonicalUrl.pathname === expectedCanonical.pathname
				: normalizePath(canonicalUrl.pathname) ===
					normalizePath(expectedCanonical.pathname);

			if (!canonicalPathMatches) {
				fail(
					file,
					`canonical path ${canonicalUrl.pathname} does not match route ${expectedCanonical.pathname}`,
				);
			}
		} catch (error) {
			fail(file, `invalid canonical URL (${error.message})`);
		}

		if (sitemapLocations.filter((location) => location === canonical).length !== 1) {
			fail(file, `canonical ${canonical} must appear exactly once in sitemap output`);
		}
	}

	if (ogUrl !== canonical) fail(file, "og:url must match canonical");
	if (ogTitle !== title) fail(file, "og:title must match <title>");
	if (ogDescription !== description)
		fail(file, "og:description must match meta description");
	if (ogLocale !== "en_US") fail(file, "og:locale must be en_US");
	if (/es_US/i.test(html)) fail(file, "must not expose unpublished Spanish locale metadata");
	if (!ogImage || !new URL(ogImage).protocol.startsWith("http")) {
		fail(file, "og:image must be an absolute URL");
	}
	if (!ogImageAlt) fail(file, "missing og:image:alt");
	if (expectedPageSchemas.has(route) && ogImage !== expectedFallbackSocialImage) {
		fail(file, `must use global social image fallback ${expectedFallbackSocialImage}`);
	}
	const expectedExplicitSocialImage = expectedExplicitSocialImages.get(route);
	if (expectedExplicitSocialImage) {
		if (ogImage !== expectedExplicitSocialImage) {
			fail(file, `og:image must use explicit image ${expectedExplicitSocialImage}`);
		}
		if (ogImage === expectedFallbackSocialImage) {
			fail(file, "og:image must not use the global fallback when an explicit image exists");
		}
	}
	if (twitterCard !== "summary_large_image") {
		fail(file, "twitter:card must be summary_large_image");
	}

	if (twitterTitle !== title) fail(file, "twitter:title must match <title>");
	if (twitterDescription !== description)
		fail(file, "twitter:description must match meta description");
	if (!twitterImage || !new URL(twitterImage).protocol.startsWith("http")) {
		fail(file, "twitter:image must be an absolute URL");
	}
	if (!twitterImageAlt) fail(file, "missing twitter:image:alt");
	if (twitterImage !== ogImage) fail(file, "twitter:image must match og:image");
	if (expectedExplicitSocialImage && twitterImage !== expectedExplicitSocialImage) {
		fail(file, `twitter:image must use explicit image ${expectedExplicitSocialImage}`);
	}
	if (twitterImage === expectedFallbackSocialImage && expectedExplicitSocialImage) {
		fail(file, "twitter:image must not use the global fallback when an explicit image exists");
	}
	if (twitterImageAlt !== ogImageAlt) {
		fail(file, "twitter:image:alt must match og:image:alt");
	}

	const jsonLd = parseJsonLd(file, getJsonLdBlocks(html));
	for (const autoWash of jsonLd.filter((item) => item?.["@type"] === "AutoWash")) {
		verifyAutoWash(file, autoWash);
	}

	const pageSchema = expectedPageSchemas.get(route);
	if (pageSchema) {
		const pageJsonLd = findJsonLdType(jsonLd, pageSchema.type);
		const expectedPageUrl = new URL(route, siteBase).href;
		const expectedPageId = new URL("#webpage", expectedPageUrl).href;
		if (pageJsonLd?.["@id"] !== expectedPageId) {
			fail(file, `${pageSchema.type} JSON-LD @id must be ${expectedPageId}`);
		}
		if (pageJsonLd?.url !== expectedPageUrl) {
			fail(file, `${pageSchema.type} JSON-LD url must be ${expectedPageUrl}`);
		}
		if (pageJsonLd?.name !== pageSchema.name) {
			fail(file, `${pageSchema.type} JSON-LD name must be ${pageSchema.name}`);
		}
		if (pageJsonLd?.description !== pageSchema.description) {
			fail(file, `${pageSchema.type} JSON-LD description must match page metadata`);
		}
		if (pageJsonLd?.isPartOf?.["@id"] !== expectedWebsiteId) {
			fail(file, `${pageSchema.type} JSON-LD isPartOf must reference ${expectedWebsiteId}`);
		}
		if (pageJsonLd?.[pageSchema.relationship]?.["@id"] !== expectedBusinessId) {
			fail(file, `${pageSchema.type} JSON-LD ${pageSchema.relationship} must reference ${expectedBusinessId}`);
		}
	}

	const requiredJsonLdTypes = expectedJsonLdTypes(route);
	if (requiredJsonLdTypes.length > 0) {
		for (const type of requiredJsonLdTypes) {
			if (!hasJsonLdType(jsonLd, type)) fail(file, `missing ${type} JSON-LD`);
		}
		const expectedService = expectedServiceDetails.get(route);
		if (expectedService) {
			const serviceJsonLd = findJsonLdType(jsonLd, "Service");
			if (serviceJsonLd?.name !== expectedService.name) {
				fail(file, `service-detail Service JSON-LD name must be ${expectedService.name}`);
			}
			const breadcrumbList = findJsonLdType(jsonLd, "BreadcrumbList");
			const expectedBreadcrumbs = [
				{ position: 1, name: "Home", item: new URL("/", siteBase).href },
				{ position: 2, name: "Services", item: new URL("/services/", siteBase).href },
				{ position: 3, name: expectedService.name, item: new URL(route, siteBase).href },
			];
			if (
				JSON.stringify(breadcrumbList?.itemListElement) !==
				JSON.stringify(expectedBreadcrumbs.map((item) => ({ "@type": "ListItem", ...item })))
			) {
				fail(file, "service-detail BreadcrumbList must exactly match the ordered route hierarchy");
			}
		}

		const expectedAreaName = serviceAreaRoutes.get(route);
		if (expectedAreaName) {
			const serviceJsonLd = findJsonLdType(jsonLd, "Service");
			const serviceJson = stringifyJsonLd(serviceJsonLd);
			const expectedServiceUrl = new URL(route, siteBase).href;
			const expectedServiceId = new URL("#service", expectedServiceUrl).href;

			if (!serviceJsonLd?.areaServed)
				fail(file, "service-area Service JSON-LD must include areaServed");
			if (serviceJsonLd?.["@id"] !== expectedServiceId) {
				fail(
					file,
					`service-area Service JSON-LD @id must be ${expectedServiceId}`,
				);
			}
			if (serviceJsonLd?.url !== expectedServiceUrl) {
				fail(
					file,
					`service-area Service JSON-LD url must be ${expectedServiceUrl}`,
				);
			}
			if (!serviceJson.includes(expectedAreaName)) {
				fail(
					file,
					`service-area Service JSON-LD areaServed must reference ${expectedAreaName}`,
				);
			}
			if (!title?.includes(expectedAreaName))
				fail(file, `title must reference ${expectedAreaName}`);
			if (!description?.toLowerCase().includes("mobile auto detailing")) {
				fail(
					file,
					"service-area meta description must reference mobile auto detailing",
				);
			}

			if (route !== "/service-area/bay-area/") {
				const relatedCityRoutes = expectedRelatedCityRoutes.get(route);
				const linkedCityRoutes = [...getRouteLinks(html)].filter((link) => cityServiceAreaRoutes.has(link));
				if (!relatedCityRoutes || JSON.stringify(linkedCityRoutes) !== JSON.stringify(relatedCityRoutes)) {
					fail(file, "must link to its configured three related city routes in order, with no self or unknown city links");
				}
				if (!getText(html).includes(`Featured services for ${expectedAreaName}`)) {
					fail(file, "must use the neutral Featured services heading");
				}
				if (unsupportedCityPageClaims.test(getText(html))) {
					fail(file, "must not include unsupported local-condition or customer-behavior claims");
				}
				const cityGuideMarkup = html.match(/<[^>]*\bdata-city-service-guide\b[^>]*>([\s\S]*?)<\/[^>]+>/i);
				if (!cityGuideMarkup) {
					fail(file, "must include a data-city-service-guide element");
				} else {
					const normalizedGuide = normalizeCityGuide(cityGuideMarkup[1]);
					if (normalizedGuide.length < 180) {
						fail(file, "city service guidance must be at least 180 normalized characters");
					}
					normalizedCityGuides.set(route, normalizedGuide);
				}
				const faqPage = findJsonLdType(jsonLd, "FAQPage");
				if (!isValidFaqPage(faqPage)) {
					fail(file, "service-area page must include a valid FAQPage JSON-LD block");
				} else {
					const visibleFaqs = getVisibleFaqs(html);
					const schemaFaqs = faqPage.mainEntity.map((item) => ({
						question: item.name,
						answer: item.acceptedAnswer.text,
					}));
					if (JSON.stringify(visibleFaqs) !== JSON.stringify(schemaFaqs)) {
						fail(file, "visible FAQs must exactly match FAQPage JSON-LD");
					}
					const faqText = schemaFaqs.map((faq) => `${faq.question} ${faq.answer}`).join(" ");
					if (
						!faqText.includes(`How should I choose a featured service for my vehicle in ${expectedAreaName}?`) ||
						!faqText.includes("safe parking area with enough room around the vehicle")
					) {
						fail(file, "FAQs must include configured service-selection and mobile-access preparation guidance");
					}
				}
			}
		}
	}
}

if (process.env.SEO_VERIFIER_TEST_TOKEN_SWAPPED === "1" && normalizedCityGuides.size > 0) {
	const [firstRoute, firstGuide] = normalizedCityGuides.entries().next().value;
	normalizedCityGuides.set(`${firstRoute}token-swapped`, firstGuide);
}

if (
	normalizedCityGuides.size !== expectedRelatedCityRoutes.size ||
	new Set(normalizedCityGuides.values()).size !== expectedRelatedCityRoutes.size
) {
	fail(distDir, "all city service guides must remain meaningfully distinct after city and region tokens are removed");
}

if (failures.length > 0) {
	console.error("SEO output verification failed:");
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(
	`SEO output verification passed for ${htmlFiles.length} generated HTML routes.`,
);
