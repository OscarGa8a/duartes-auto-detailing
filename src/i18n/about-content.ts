import { config, formattedNumber } from "../data/config";
import type { AboutContent, AboutMetric, AboutTemplate } from "./content-types";

export { spanishAboutContent } from "./spanish-about-content";

const metricValues: Record<AboutMetric, string> = {
  yearsOfExperience: String(config.yearsOfExperience),
  vehiclesDetailed: formattedNumber(config.vehiclesDetailed),
  bayAreaLocations: formattedNumber(config.bayAreaLocations),
};

export const resolveAboutTemplate = ({ template, metrics }: AboutTemplate) =>
  template.replace(/\{([a-zA-Z]+)\}/g, (placeholder, metric: string) => {
    if (!(metric in metricValues) || !metrics.includes(metric as AboutMetric)) {
      throw new Error(`Unknown About metric placeholder: ${placeholder}`);
    }
    return metricValues[metric as AboutMetric];
  });

export const aboutMetricValues = {
  yearsOfExperience: config.yearsOfExperience,
  vehiclesDetailed: config.vehiclesDetailed,
  bayAreaLocations: config.bayAreaLocations,
} as const satisfies Record<AboutMetric, number>;

export const englishAboutContent = {
  metadata: {
    title: "About Duartes Auto Detailing",
    description: {
      template: "Meet Duartes Auto Detailing — {yearsOfExperience}+ years of experience, with over {vehiclesDetailed} vehicles detailed throughout the Bay Area, California.",
      metrics: ["yearsOfExperience", "vehiclesDetailed"],
    },
    socialImageAlt: "Duartes Auto Detailing mobile detailing service",
    schemaName: "About Duartes Auto Detailing",
    schemaDescription: {
      template: "Meet Duartes Auto Detailing — {yearsOfExperience}+ years of experience, with over {vehiclesDetailed} vehicles detailed throughout the Bay Area, California.",
      metrics: ["yearsOfExperience", "vehiclesDetailed"],
    },
  },
  hero: {
    eyebrow: "About Duartes",
    title: "Built Around Precision",
    description: {
      template: "For more than {yearsOfExperience} years, Duartes Auto Detailing has delivered mobile detailing with the discipline, polish, and premium care Bay Area owners expect from a true luxury service experience.",
      metrics: ["yearsOfExperience"],
    },
  },
  standard: {
    imageAlt: "Technician applying detailing product",
    calloutEyebrow: "Mobile detailing, elevated",
    calloutDescription: "Every appointment is designed to feel effortless, polished, and worthy of the vehicle you trust us with.",
    eyebrow: "The Duartes standard",
    title: "Built for owners who expect more than a quick wash.",
    highlight: "More than a service - it's a disciplined restoration experience.",
    description: {
      template: "At Duartes Auto Detailing, we understand that your vehicle is a meaningful investment. With {yearsOfExperience}+ years of experience, we have detailed more than {vehiclesDetailed} vehicles across over {bayAreaLocations} Bay Area locations, combining convenience, premium products, and a level of care designed to leave every finish richer, cleaner, and better protected.",
      metrics: ["yearsOfExperience", "vehiclesDetailed", "bayAreaLocations"],
    },
    counters: ["Vehicles Detailed", "Years of Experience", "Bay Area Locations"],
  },
  pillars: {
    eyebrow: "Our pillars",
    title: "The principles behind every Duartes appointment.",
    description: "Mission, vision, and values are not filler here. They shape how we show up, how we work, and how every finish leaves your driveway.",
    items: [
      { title: "Our Mission", description: "We clean, restore, and protect every vehicle with excellence. We add real value to the maintenance and appearance of your car by using top-quality products." },
      { title: "Our Vision", description: "To be the leading brand and trusted leader in mobile automotive detailing in the Bay Area and California." },
      { title: "Our Values", description: "Professionalism, trust, and versatility. We guarantee a comfortable, safe experience and consistent results right at your doorstep." },
    ],
  },
  behindTheShine: {
    eyebrow: "Behind the shine",
    title: "Premium results start with how we work when nobody is watching.",
    description: "We founded Duartes Auto Detailing to give busy Bay Area owners a premium answer to car care without sacrificing time, trust, or finish quality. That means operational discipline, respectful service at your location, and a standard that feels just as strong in the process as it does in the result.",
    quote: "When you book with us, you are booking consistency, trust, and a finish that looks intentional from every angle.",
    imageAlt: "Technician at Duartes Auto Detailing",
    cardEyebrow: "Bay Area mobile specialists",
    cardDescription: "Professional-grade service, brought directly to your home, office, or private garage.",
  },
  cta: {
    eyebrow: "Ready to experience the difference?",
    title: "Schedule Your Appointment Today",
    description: "Reserve your appointment and let us bring the Duartes standard directly to your driveway, office, or private garage.",
    buttonText: "Book Your Service",
    smsMessage: "Hello, I'd like to learn more about your services. Could you provide me with more information?",
  },
} as const satisfies AboutContent;
