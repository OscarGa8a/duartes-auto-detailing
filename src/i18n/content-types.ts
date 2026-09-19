import type { Locale } from "./locales";
import type { PageId, ShellDestination } from "./routes";

export type ApprovalBlockId = string;

export interface ShellContent {
  navigation: readonly { pageId: PageId; label: string }[];
  languageControl: { label: string; destinationLabel: string };
  brandLogoAlt: string;
  menu: {
    openLabel: string;
    closeLabel: string;
    heading: string;
    subtitle: string;
    currentPageLabel: string;
    openSectionLabel: string;
  };
  footer: {
    navigationLabel: string;
    socialLabel: string;
    links: readonly { destination: ShellDestination; label: string }[];
    copyrightSuffix: string;
    socialLinks: readonly { platform: "TikTok" | "Facebook" | "Instagram" | "WhatsApp"; accessibleLabel: string }[];
  };
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
  discountBanner: "include" | "omit";
}

export type AboutMetric = "yearsOfExperience" | "vehiclesDetailed" | "bayAreaLocations";

export interface AboutTemplate {
  template: string;
  metrics: readonly AboutMetric[];
}

export interface AboutContent {
  metadata: Omit<PageMetadataContent, "description" | "schemaDescription"> & { description: AboutTemplate; schemaDescription: AboutTemplate };
  hero: { eyebrow: string; title: string; description: AboutTemplate };
  standard: {
    imageAlt: string;
    calloutEyebrow: string;
    calloutDescription: string;
    eyebrow: string;
    title: string;
    highlight: string;
    description: AboutTemplate;
    counters: readonly [string, string, string];
  };
  pillars: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly [
      { title: string; description: string },
      { title: string; description: string },
      { title: string; description: string },
    ];
  };
  behindTheShine: { eyebrow: string; title: string; description: string; quote: string; imageAlt: string; cardEyebrow: string; cardDescription: string };
  cta: { eyebrow: string; title: string; description: string; buttonText: string; smsMessage: string };
}

export type ContactSectionPolicy =
  | { serviceMap: "include" }
  | { serviceMap: "omit" };

export interface ContactMapContent {
  eyebrow: string;
  title: string;
  description: string;
  help: string;
  iframeTitle: string;
  overlayLabel: string;
  directionsLabel: string;
  openMapLabel: string;
  noScriptPrefix: string;
  noScriptLinkLabel: string;
}

export interface ContactContentBase {
  metadata: PageMetadataContent;
  hero: { eyebrow: string; title: string; description: string };
  section: { eyebrow: string; title: string; description: string };
  channels: readonly [
    ContactMessageChannelContent,
    ContactMessageChannelContent,
    ContactChannelContent,
  ];
  form: {
    eyebrow: string;
    title: string;
    description: string;
    honeypotLabel: string;
    fields: {
      name: FormFieldContent;
      email: FormFieldContent;
      phone: FormFieldContent;
      message: FormFieldContent;
    };
    help: string;
    submitLabel: string;
    preparedStatus: string;
  };
}

export type ContactContentWithServiceMap = ContactContentBase & {
  policy: { serviceMap: "include" };
  map: ContactMapContent;
};

export type ContactContentWithoutServiceMap = ContactContentBase & {
  policy: { serviceMap: "omit" };
  map?: never;
};

export type ContactContent = ContactContentWithServiceMap | ContactContentWithoutServiceMap;

export interface ContactChannelContent {
  title: string;
  actionLabel: string;
  ariaLabel: string;
}

export interface ContactMessageChannelContent extends ContactChannelContent {
  prefilledMessage: string;
}

export interface FormFieldContent {
  label: string;
  placeholder: string;
  error: string;
}

export interface ServicesSectionPolicy {
  areaTeaser: "include" | "omit";
  englishDetailDisclosure: "required" | "not-required";
}

export interface ServicesCardPresentation {
  detailAction: string;
  /** Required before a future locale may link to English-only service details. */
  englishDetailDisclosure?: string;
  /** Reserved for approved localized card copy; canonical names and summaries remain in services data. */
  byServiceId: Record<import("../data/services").ServiceId, Record<string, never>>;
}

export interface ServicesContent {
  policy: ServicesSectionPolicy;
  metadata: PageMetadataContent;
  hero: { eyebrow: string; title: string; description: string };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    benefits: readonly [
      { title: string; description: string },
      { title: string; description: string },
      { title: string; description: string },
    ];
    imageAlt: string;
    processEyebrow: string;
    processDescription: string;
  };
  grid: { eyebrow: string; title: string; description: string };
  cards: ServicesCardPresentation;
  areaTeaser: { eyebrow: string; title: string; description: string; action: string };
}

export interface HomeDiscountBanner {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
}

interface HomeContentBase {
  metadata: PageMetadataContent;
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
}

export type HomeContentWithDiscountBanner = HomeContentBase & {
  policy: HomeSectionPolicy & { discountBanner: "include" };
  discountBanner: HomeDiscountBanner;
};

export type HomeContentWithoutDiscountBanner = HomeContentBase & {
  policy: HomeSectionPolicy & { discountBanner: "omit" };
  discountBanner?: never;
};

export type HomeContent = HomeContentWithDiscountBanner | HomeContentWithoutDiscountBanner;
