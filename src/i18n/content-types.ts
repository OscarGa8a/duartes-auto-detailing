import type { Locale } from "./locales";
import type { PageId, RoutePath } from "./routes";

export type ApprovalBlockId = string;

export interface ShellContent {
  navigation: readonly { label: string; href: RoutePath }[];
  languageControl: { label: string; destinationLabel: string };
  footer: { navigationLabel: string; socialLabel: string };
  menu: { openLabel: string; closeLabel: string; heading: string };
}

export interface PageMetadataContent {
  title: string;
  description: string;
  socialImageAlt: string;
  schemaName: string;
  schemaDescription: string;
}

export interface PageContent {
  locale: Locale;
  pageId: PageId;
  metadata: PageMetadataContent;
  blockIds: readonly ApprovalBlockId[];
}

export interface LocalizedPageBundle extends PageContent {
  shell: ShellContent;
}

export interface HomeSectionPolicy {
  testimonials: "include" | "omit";
}

export interface HomeContent {
  policy: HomeSectionPolicy;
  hero: {
    eyebrow: string;
    serviceLine: string;
    heading: readonly [string, string];
    description: string;
    vehiclesDetailed: string;
    mobileService: string;
    desktopService: string;
    primaryAction: string;
    secondaryAction: string;
    location: string;
    carousel: { mobileSlide: string; desktopSlide: string };
    imageAlts: readonly [string, string, string, string];
  };
  whyDuartes: {
    eyebrow: string;
    title: string;
    description: string;
    callout: string;
    calloutDescription: string;
    statistics: readonly [string, string, string];
  };
  featuredPackages: { eyebrow: string; title: string; description: string; action: string };
  gallery: { eyebrow: string; title: string; description: string; itemLabels: readonly string[] };
  discountBanner: { eyebrow: string; title: string; description: string; action: string };
}
