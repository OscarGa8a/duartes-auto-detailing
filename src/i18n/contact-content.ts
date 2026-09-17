import type { ContactContent, ContactSectionPolicy } from "./content-types";
import type { Locale } from "./locales";

export const contactSectionPolicies = {
  "en-US": { serviceMap: "include" },
  "es-US": { serviceMap: "omit" },
} as const satisfies Record<Locale, ContactSectionPolicy>;

export const englishContactContent = {
  policy: contactSectionPolicies["en-US"],
  metadata: {
    title: "Contact Duartes Auto Detailing",
    description: "Book Bay Area mobile auto detailing via WhatsApp, text message, Instagram, or email. Duartes Auto Detailing is a 100% mobile service.",
    socialImageAlt: "Duartes Auto Detailing mobile detailing service",
    schemaName: "Contact Duartes Auto Detailing",
    schemaDescription: "Book Bay Area mobile auto detailing via WhatsApp, text message, Instagram, or email. Duartes Auto Detailing is a 100% mobile service.",
  },
  hero: {
    eyebrow: "Contact Duartes",
    title: "Reach Out The Premium Way",
    description: "Choose the channel that feels easiest for you and we will help you schedule premium mobile detailing with the speed, clarity, and care you expect.",
  },
  section: {
    eyebrow: "Contact options",
    title: "Book fast, ask questions, or start the conversation your way.",
    description: "Whether you prefer WhatsApp, text, Instagram, or email, we keep the process direct and premium. Pick the channel that feels most natural and we will guide you to the right service.",
  },
  channels: [
    {
      title: "Book via WhatsApp",
      actionLabel: "Open WhatsApp",
      ariaLabel: "Open WhatsApp",
      prefilledMessage: "Hello, Duarte Detailing! I'm interested in booking a detailing service. Could you provide me with more information about your services, prices, and availability? Thank you!",
    },
    {
      title: "Send a Quick Text Message",
      actionLabel: "Send SMS",
      ariaLabel: "Send SMS",
      prefilledMessage: "Hello, Duarte Detailing! I'm interested in booking a detailing service. Could you provide me with more information about your services, prices, and availability? Thank you!",
    },
    {
      title: "Send a DM on Instagram",
      actionLabel: "Go to Instagram",
      ariaLabel: "Go to Instagram",
    },
  ],
  form: {
    eyebrow: "Email inquiry",
    title: "Send your details and we will follow up with the right next step.",
    description: "Tell us what you need, where you are located, and how to reach you. We will get back with availability and the most suitable service recommendation.",
    honeypotLabel: "Leave this blank",
    fields: {
      name: { label: "Name", placeholder: "Name*", error: "Your name is required." },
      email: { label: "Email", placeholder: "Email*", error: "Invalid email." },
      phone: { label: "Phone", placeholder: "Phone*", error: "A phone number is required." },
      message: { label: "Message", placeholder: "Message*", error: "A message is required." },
    },
    help: "Prefer a faster reply? Use WhatsApp or SMS and we will usually respond sooner.",
    submitLabel: "Send",
    preparedStatus: "Your message is prepared but not sent. Please use WhatsApp, SMS, or Instagram to contact us.",
  },
  map: {
    eyebrow: "Mobile coverage",
    title: "100% mobile service across the Bay Area.",
    description: "We bring professional detailing directly to your driveway, office, or private garage. The map is centered near our Bay Area base and travel radius can vary depending on the service requested.",
    help: "Coverage and scheduling can change by service type, distance, and appointment availability.",
    iframeTitle: "Service Area - Duarte's Auto Detailing — Bay Area, California",
    overlayLabel: "Bay Area Coverage",
    directionsLabel: "Get Directions",
    openMapLabel: "Open in Google Maps",
    noScriptPrefix: "JavaScript is disabled. Use this direct link:",
    noScriptLinkLabel: "View location in Google Maps.",
  },
} as const satisfies ContactContent;
