import type { HomeContent, HomeSectionPolicy } from "./content-types";
import type { Locale } from "./locales";

export const homeSectionPolicies = {
  "en-US": { testimonials: "include" },
  "es-US": { testimonials: "omit" },
} as const satisfies Record<Locale, HomeSectionPolicy>;

export const englishHomeContent = {
  policy: homeSectionPolicies["en-US"],
  hero: {
    eyebrow: "Concierge Mobile Detailing · Bay Area",
    serviceLine: "Premium mobile detailing at your home or office",
    heading: ["Diamond-Level Finish", "At Your Doorstep"],
    description: "We clean, restore, and protect your vehicle with premium care — right at your home or office.",
    vehiclesDetailed: "vehicles detailed",
    mobileService: "Fully Mobile Service",
    desktopService: "fully mobile",
    primaryAction: "Book Your Service",
    secondaryAction: "View Services",
    location: "At your home or office",
    carousel: { mobileSlide: "Ir al slide", desktopSlide: "Go to desktop slide" },
    imageAlts: [
      "Freshly detailed blue sports car with glossy exterior finish",
      "Detailed vehicle exterior with deep gloss and reflection",
      "Exterior detail showing clean paint and bright reflections",
      "Detailed exterior finish prepared for premium protection",
    ],
  },
  whyDuartes: {
    eyebrow: "Why choose Duartes",
    title: "Premium care without the dealership wait.",
    description: "We bring professional detailing directly to your home or office — saving you time while delivering exceptional results.",
    callout: "It's not just a cleaning - it's a transformation.",
    calloutDescription: "We focus on restoring, protecting, and elevating your vehicle with precision, premium products, and attention to every detail.",
    statistics: ["Vehicles Detailed", "Years of Experience", "Locations Served"],
  },
  featuredPackages: {
    eyebrow: "curated packages",
    title: "Featured Packages",
    description: "Choose the level of care that matches your vehicle, from essential maintenance to high-touch correction and protection.",
    action: "See All Services",
  },
  gallery: {
    eyebrow: "Finished work",
    title: "Gallery",
    description: "Real results. Every detail speaks for itself.",
    itemLabels: [
      "Ceramic coating applied",
      "Interior detailing with steam cleaning",
      "Ceramic coating applied",
      "Clay bar decontamination",
      "Before and after full detailing of a Ford Mustang GT",
      "Seat upholstery deep cleaning",
      "View process of deep decontamination with clay bar",
    ],
  },
  discountBanner: {
    eyebrow: "Special offer",
    title: "20% off your first service",
    description: "Book today and enjoy 20% off your first premium detailing session anywhere in the Bay Area.",
    action: "Book Your Service",
  },
} as const satisfies HomeContent;
