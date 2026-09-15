export const localeDefinitions = {
  "en-US": { htmlLang: "en-US", ogLocale: "en_US", numberLocale: "en-US", prefix: "" },
  "es-US": { htmlLang: "es-US", ogLocale: "es_US", numberLocale: "es-US", prefix: "/es" },
} as const;

export type Locale = keyof typeof localeDefinitions;
export type LocaleDefinition = (typeof localeDefinitions)[Locale];
