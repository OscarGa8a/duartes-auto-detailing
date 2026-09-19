import { services } from "../data/services";
import type { LocalizedServiceCardPresentation, ServicesContent, ServicesPromotionPolicy } from "./content-types";
import type { Locale } from "./locales";

/** Promotion visibility is composition-owned rather than localized source content. */
export const servicesSectionPolicies = {
  "en-US": { areaTeaser: "include", englishDetailDisclosure: "not-required", discountBanner: "include" },
  "es-US": { areaTeaser: "omit", englishDetailDisclosure: "required", discountBanner: "omit" },
} as const satisfies Record<Locale, ServicesPromotionPolicy>;

const englishServiceCards = Object.fromEntries(
  services.map(({ id, name, description }) => [id, { displayName: name, summary: description }]),
) as Record<(typeof services)[number]["id"], LocalizedServiceCardPresentation>;

export const englishServicesContent = {
  policy: servicesSectionPolicies["en-US"],
  metadata: {
    title: "Mobile Auto Detailing Services",
    description: "Explore Bay Area mobile detailing services including interior detail, exterior detail, full detail, ceramic coating, and paint correction.",
    socialImageAlt: "Duartes Auto Detailing service result",
    schemaName: "Mobile auto detailing services",
    schemaDescription: "",
  },
  hero: {
    title: "Tailored Care For Every Finish",
    eyebrow: "Services catalog",
    description: "Explore premium mobile detailing packages designed around your vehicle, your finish goals, and the level of protection you want to maintain.",
  },
  intro: {
    eyebrow: "Curated lineup",
    title: "Services designed around gloss, protection, and long-term care.",
    description: "Every package is built to match a different level of maintenance, correction, or protection. Browse the catalog below to compare services, understand the process, and choose the finish standard that fits your vehicle best.",
    benefits: [
      { title: "Mobile", description: "At-home convenience" },
      { title: "Premium", description: "Top-tier products" },
      { title: "Results", description: "Visible after every visit" },
    ],
    imageAlt: "Professional wheel cleaning with spray",
    processEyebrow: "Premium process",
    processDescription: "From maintenance washes to high-touch correction and protection, every service is executed with the same discipline and attention to finish quality.",
  },
  grid: {
    eyebrow: "Service lineup",
    title: "Choose the package that matches the way you want your vehicle to look and last.",
    description: "Every option below is designed to be easy to compare, easy to book, and clear about the level of finish you can expect.",
  },
  cards: {
    detailAction: "See more details",
    byServiceId: englishServiceCards,
  },
  areaTeaser: {
    eyebrow: "Mobile service area",
    title: "Bay Area detailing brought to your location.",
    description: "Duartes Auto Detailing is a mobile service for Bay Area drivers. Visit the service-area hub to see priority city pages and learn how appointments work for homes, offices, and private garages.",
    action: "View Bay Area Service Area",
  },
} as const satisfies ServicesContent;
