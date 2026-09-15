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
