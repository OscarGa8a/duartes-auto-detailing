import type { ContactContent, ContactSectionPolicy } from "./content-types";
import type { Locale } from "./locales";

export const contactSectionPolicies = {
  "en-US": { serviceMap: "include" },
  "es-US": { serviceMap: "include" },
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

export const spanishContactContent = {
  policy: contactSectionPolicies["es-US"],
  metadata: {
    title: "Contacto | Duartes Auto Detailing",
    description: "Comunícate con Duartes Auto Detailing por WhatsApp, mensaje de texto o Instagram para consultar sobre servicios de detallado móvil.",
    socialImageAlt: "Servicio móvil de detallado de Duartes Auto Detailing",
    schemaName: "Contacto | Duartes Auto Detailing",
    schemaDescription: "Comunícate con Duartes Auto Detailing por WhatsApp, mensaje de texto o Instagram para consultar sobre servicios de detallado móvil.",
  },
  hero: {
    eyebrow: "Contacto",
    title: "Comunícate con Duartes Auto Detailing",
    description: "Elige el canal que prefieras para hacer una consulta sobre servicios de detallado móvil.",
  },
  section: {
    eyebrow: "Opciones de contacto",
    title: "Haz tu consulta por el canal que prefieras.",
    description: "Puedes comunicarte por WhatsApp, mensaje de texto o Instagram para solicitar información sobre los servicios.",
  },
  channels: [
    {
      title: "Escríbenos por WhatsApp",
      actionLabel: "Abrir WhatsApp",
      ariaLabel: "Abrir WhatsApp",
      prefilledMessage: "Hola, me interesa conocer sus servicios de detallado. ¿Podrían brindarme más información? Gracias.",
    },
    {
      title: "Envíanos un mensaje de texto",
      actionLabel: "Enviar SMS",
      ariaLabel: "Enviar SMS",
      prefilledMessage: "Hola, me interesa conocer sus servicios de detallado. ¿Podrían brindarme más información? Gracias.",
    },
    {
      title: "Envíanos un mensaje directo por Instagram",
      actionLabel: "Abrir Instagram",
      ariaLabel: "Abrir Instagram",
    },
  ],
  form: {
    eyebrow: "Prepara tu consulta",
    title: "Comparte los detalles de tu consulta",
    description: "Cuéntanos qué servicio buscas y cómo podemos comunicarnos contigo.",
    honeypotLabel: "Deja este campo en blanco",
    fields: {
      name: { label: "Nombre", placeholder: "Nombre*", error: "Ingresa tu nombre." },
      email: { label: "Correo electrónico", placeholder: "Correo electrónico*", error: "Ingresa un correo electrónico válido." },
      phone: { label: "Teléfono", placeholder: "Teléfono*", error: "Ingresa un número de teléfono." },
      message: { label: "Mensaje", placeholder: "Mensaje*", error: "Ingresa un mensaje." },
    },
    help: "Para comunicarte directamente, usa WhatsApp, SMS o Instagram.",
    submitLabel: "Preparar mensaje",
    preparedStatus: "Tu mensaje está preparado, pero no se envió. Para comunicarte con Duartes Auto Detailing, usa WhatsApp, SMS o Instagram.",
  },
  map: {
    eyebrow: "Cobertura móvil",
    title: "Servicio 100% móvil en toda el Área de la Bahía.",
    description: "Llevamos el detallado profesional directamente a la entrada de tu casa, oficina o estacionamiento privado. El mapa está centrado cerca de nuestra base en el Área de la Bahía y el radio de traslado puede variar según el servicio solicitado.",
    help: "La cobertura y la disponibilidad de horarios pueden variar según el tipo de servicio, la distancia y la agenda de citas.",
    iframeTitle: "Área de servicio - Duarte's Auto Detailing — Área de la Bahía, California",
    overlayLabel: "Cobertura en el Área de la Bahía",
    directionsLabel: "Cómo llegar",
    openMapLabel: "Abrir en Google Maps",
    noScriptPrefix: "JavaScript está deshabilitado. Usa este enlace directo:",
    noScriptLinkLabel: "Ver ubicación en Google Maps.",
  },
} as const satisfies ContactContent;
