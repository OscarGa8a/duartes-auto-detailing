import type { Locale } from "./locales";

export const pageIds = ["home", "about", "contact", "services"] as const;
export type PageId = (typeof pageIds)[number];
export type RoutePath = "/" | "/about/" | "/contact/" | "/services/" | "/es/" | "/es/about/" | "/es/contact/" | "/es/services/";

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
