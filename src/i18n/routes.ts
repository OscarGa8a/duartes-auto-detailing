import type { Locale } from "./locales";

export const pageIds = ["home", "about", "contact", "services"] as const;
export type PageId = (typeof pageIds)[number];
export type ShellDestination = PageId | "service-area-bay-area-en";
export type RoutePath = "/" | "/about/" | "/contact/" | "/services/" | "/es/" | "/es/about/" | "/es/contact/" | "/es/services/";
export type ShellDestinationPath = RoutePath | "/service-area/bay-area/";

type Route = { locale: Locale; path: RoutePath; restParam?: string };
export type CandidateRoutePair = { pageId: PageId; en: Route; es: Route; requiredSpanishBlocks: readonly string[] };

export const candidateRoutePairs: readonly CandidateRoutePair[] = [
  { pageId: "home", en: { locale: "en-US", path: "/" }, es: { locale: "es-US", path: "/es/" }, requiredSpanishBlocks: [] },
  { pageId: "about", en: { locale: "en-US", path: "/about/" }, es: { locale: "es-US", path: "/es/about/", restParam: "about" }, requiredSpanishBlocks: [] },
  { pageId: "contact", en: { locale: "en-US", path: "/contact/" }, es: { locale: "es-US", path: "/es/contact/", restParam: "contact" }, requiredSpanishBlocks: [] },
  { pageId: "services", en: { locale: "en-US", path: "/services/" }, es: { locale: "es-US", path: "/es/services/", restParam: "services" }, requiredSpanishBlocks: [] },
];

export const getCandidateRoutePair = (pageId: PageId) => candidateRoutePairs.find((pair) => pair.pageId === pageId);
export const getCandidateRouteByPath = (path: RoutePath) => candidateRoutePairs.find((pair) => pair.en.path === path || pair.es.path === path);

export const getCanonicalPagePath = (pageId: PageId, locale: Locale): RoutePath => {
  const pair = getCandidateRoutePair(pageId);
  if (!pair) throw new Error(`Unknown page destination: ${pageId}`);
  return locale === "en-US" ? pair.en.path : pair.es.path;
};

export const getShellDestinationPath = (destination: ShellDestination, locale: Locale): ShellDestinationPath => {
  if (destination === "service-area-bay-area-en") return "/service-area/bay-area/";
  return getCanonicalPagePath(destination, locale);
};

export const publishedSpanishPageIds: readonly PageId[] = ["home", "about", "contact", "services"];

export const getPublishedCounterpart = (pageId: PageId | undefined, locale: Locale) => {
  if (!pageId || !publishedSpanishPageIds.includes(pageId)) return undefined;

  const pair = getCandidateRoutePair(pageId);
  return pair ? (locale === "en-US" ? pair.es : pair.en) : undefined;
};
