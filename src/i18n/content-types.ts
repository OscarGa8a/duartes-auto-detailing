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

export interface ContactSectionPolicy {
  serviceMap: "include" | "omit";
}

export interface ContactContent {
  policy: ContactSectionPolicy;
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
  map: {
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
  };
}

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
