import type { ShellContent } from "./content-types";

export const englishShellContent = {
  navigation: [
    { pageId: "home", label: "Home" },
    { pageId: "about", label: "About Us" },
    { pageId: "services", label: "Services" },
    { pageId: "contact", label: "Contact" },
  ],
  languageControl: { label: "Language", destinationLabel: "Español" },
  brandLogoAlt: "Duartes Auto Detailing",
  menu: {
    openLabel: "Open menu",
    closeLabel: "Close menu",
    heading: "Duartes menu",
    subtitle: "Premium mobile detailing, one tap away.",
    currentPageLabel: "Current page",
    openSectionLabel: "Open section",
  },
  footer: {
    navigationLabel: "Footer navigation",
    socialLabel: "Social media",
    links: [
      { destination: "about", label: "About Us" },
      { destination: "services", label: "Services" },
      { destination: "service-area-bay-area-en", label: "Bay Area Service Area" },
      { destination: "contact", label: "Contact" },
    ],
    copyrightSuffix: "All rights reserved.",
    socialLinks: [
      { platform: "TikTok", accessibleLabel: "Visit Duartes Auto Detailing on TikTok (opens in a new tab)" },
      { platform: "Facebook", accessibleLabel: "Visit Duartes Auto Detailing on Facebook (opens in a new tab)" },
      { platform: "Instagram", accessibleLabel: "Visit Duartes Auto Detailing on Instagram (opens in a new tab)" },
      { platform: "WhatsApp", accessibleLabel: "Contact Duartes Auto Detailing on WhatsApp (opens in a new tab)" },
    ],
  },
} as const satisfies ShellContent;

export const spanishShellContent = {
  navigation: [
    { pageId: "home", label: "Inicio" },
    { pageId: "about", label: "Nosotros" },
    { pageId: "services", label: "Servicios" },
    { pageId: "contact", label: "Contacto" },
  ],
  languageControl: { label: "Idioma", destinationLabel: "English" },
  brandLogoAlt: "Duartes Auto Detailing",
  menu: {
    openLabel: "Abrir menú",
    closeLabel: "Cerrar menú",
    heading: "Menú de Duartes",
    subtitle: "Detallado automotriz móvil.",
    currentPageLabel: "Página actual",
    openSectionLabel: "Abrir sección",
  },
  footer: {
    navigationLabel: "Navegación del pie de página",
    socialLabel: "Redes sociales",
    links: [
      { destination: "about", label: "Nosotros" },
      { destination: "services", label: "Servicios" },
      { destination: "service-area-bay-area-en", label: "Área de servicio" },
      { destination: "contact", label: "Contacto" },
    ],
    copyrightSuffix: "Todos los derechos reservados.",
    socialLinks: [
      { platform: "TikTok", accessibleLabel: "Visita Duartes Auto Detailing en TikTok (se abre en una pestaña nueva)" },
      { platform: "Facebook", accessibleLabel: "Visita Duartes Auto Detailing en Facebook (se abre en una pestaña nueva)" },
      { platform: "Instagram", accessibleLabel: "Visita Duartes Auto Detailing en Instagram (se abre en una pestaña nueva)" },
      { platform: "WhatsApp", accessibleLabel: "Contacta a Duartes Auto Detailing por WhatsApp (se abre en una pestaña nueva)" },
    ],
  },
} as const satisfies ShellContent;
