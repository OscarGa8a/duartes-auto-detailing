import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const siteBase = process.env.SITE_URL ?? "https://duartesautodetailing.com";

const serviceAreaRoutes = new Map([
	["/service-area/bay-area/", "Bay Area"],
	["/service-area/walnut/", "Walnut"],
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

function getRouteLinks(html) {
	const hrefs = [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi)].map(
		([, , href]) => decodeHtml(href),
	);

	return new Set(
		hrefs.flatMap((href) => {
			if (
				!href ||
				href.startsWith("#") ||
				href.startsWith("mailto:") ||
				href.startsWith("tel:")
			)
				return [];

			try {
				const url = new URL(href, siteBase);
				if (url.origin !== new URL(siteBase).origin) return [];
				return [url.pathname];
			} catch {
				return [];
			}
		}),
	);
}

function getSitemapLocations(files) {
	return new Set(
		files.flatMap((file) => {
			const xml = readFileSync(file, "utf8");
			return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map(([, loc]) =>
				decodeHtml(loc.trim()),
			);
		}),
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

function expectedJsonLdTypes(route) {
	if (route === "/") return ["AutoWash", "WebSite"];
	if (route === "/services/") return ["AutoWash", "ItemList"];
	if (route.startsWith("/services/")) return ["AutoWash", "Service"];
	if (serviceAreaRoutes.has(route))
		return ["AutoWash", "Service", "BreadcrumbList"];
	return [];
}

if (!existsSync(distDir)) {
	console.error(
		"dist/ was not found. Run `pnpm build` before `pnpm run test:seo`.",
	);
	process.exit(1);
}

const htmlFiles = getHtmlFiles(distDir);
const sitemapFiles = getSitemapFiles(distDir);

if (htmlFiles.length === 0) {
	console.error(
		"No generated HTML files found in dist/. Run `pnpm build` first.",
	);
	process.exit(1);
}

const generatedRoutes = new Set(htmlFiles.map(getRoute));
const routeFiles = new Map(htmlFiles.map((file) => [getRoute(file), file]));
const sitemapLocations = getSitemapLocations(sitemapFiles);

if (sitemapFiles.length === 0) {
	fail(distDir, "missing generated sitemap XML files");
}

for (const route of serviceAreaRoutes.keys()) {
	if (!generatedRoutes.has(route))
		fail(distDir, `missing generated service-area route ${route}`);

	const expectedSitemapUrl = new URL(route, siteBase).href;
	if (!sitemapLocations.has(expectedSitemapUrl)) {
		fail(
			distDir,
			`sitemap must include service-area route ${expectedSitemapUrl}`,
		);
	}
}

for (const file of routeFiles.values()) {
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
	const expectedCanonical = new URL(route, siteBase);
	const title = getTitle(html);
	const description = getMeta(html, "name", "description");
	const robots = getMeta(html, "name", "robots");
	const canonical = getLink(html, "canonical");
	const ogUrl = getMeta(html, "property", "og:url");
	const ogTitle = getMeta(html, "property", "og:title");
	const ogDescription = getMeta(html, "property", "og:description");
	const ogLocale = getMeta(html, "property", "og:locale");
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
	}

	if (ogUrl !== canonical) fail(file, "og:url must match canonical");
	if (ogTitle !== title) fail(file, "og:title must match <title>");
	if (ogDescription !== description)
		fail(file, "og:description must match meta description");
	if (ogLocale !== "en_US") fail(file, "og:locale must be en_US");
	if (!twitterCard) fail(file, "missing twitter:card");
	if (!["summary", "summary_large_image"].includes(twitterCard ?? "")) {
		fail(file, `unexpected twitter:card value ${twitterCard}`);
	}
	if (twitterTitle !== title) fail(file, "twitter:title must match <title>");
	if (twitterDescription !== description)
		fail(file, "twitter:description must match meta description");
	if (
		twitterCard === "summary_large_image" &&
		(!twitterImage || !twitterImageAlt)
	) {
		fail(
			file,
			"summary_large_image requires twitter:image and twitter:image:alt",
		);
	}
	if (twitterCard === "summary" && twitterImage) {
		fail(
			file,
			"summary cards should not emit twitter:image without a page image",
		);
	}

	const requiredJsonLdTypes = expectedJsonLdTypes(route);
	if (requiredJsonLdTypes.length > 0) {
		const jsonLd = parseJsonLd(file, getJsonLdBlocks(html));
		for (const type of requiredJsonLdTypes) {
			if (!hasJsonLdType(jsonLd, type)) fail(file, `missing ${type} JSON-LD`);
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
		}
	}
}

if (failures.length > 0) {
	console.error("SEO output verification failed:");
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log(
	`SEO output verification passed for ${htmlFiles.length} generated HTML routes.`,
);
