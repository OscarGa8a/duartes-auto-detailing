import type { HomeContent, HomeSectionPolicy } from "./content-types";
import type { Locale } from "./locales";

export const homeSectionPolicies = {
  "en-US": { testimonials: "include", discountBanner: "include" },
  "es-US": { testimonials: "include", discountBanner: "include" },
} as const satisfies Record<Locale, HomeSectionPolicy>;

export const englishHomeContent = {
  metadata: {
    title: "Bay Area Mobile Auto Detailing",
    description: "Premium mobile auto detailing in the Bay Area, delivered to your home, office, or private garage. Book Duartes Auto Detailing today.",
    socialImageAlt: "Freshly detailed vehicle by Duartes Auto Detailing",
    schemaName: "Bay Area Mobile Auto Detailing",
    schemaDescription: "Premium mobile auto detailing in the Bay Area, delivered to your home, office, or private garage. Book Duartes Auto Detailing today.",
  },
  policy: homeSectionPolicies["en-US"],
  hero: {
    eyebrow: "Concierge Mobile Detailing · Bay Area",
    serviceLine: "Premium mobile detailing at your home or office",
    heading: ["Diamond-Level Mobile Detailing", "Across the Bay Area"],
    description: "Professional interior detailing, paint correction, and ceramic coating brought directly to your doorstep in the Bay Area.",
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

export const spanishHomeContent = {
  metadata: {
    title: "Detallado automotriz móvil en el Área de la Bahía",
    description: "Detallado automotriz móvil en el Área de la Bahía, en tu hogar, oficina o garaje privado. Conoce Duartes Auto Detailing.",
    socialImageAlt: "Vehículo detallado por Duartes Auto Detailing",
    schemaName: "Detallado automotriz móvil en el Área de la Bahía",
    schemaDescription: "Servicio móvil de detallado automotriz de Duartes Auto Detailing para conductores del Área de la Bahía, en hogares, oficinas y garajes privados.",
  },
  policy: homeSectionPolicies["es-US"],
  hero: {
    eyebrow: "Detallado móvil · Área de la Bahía",
    serviceLine: "Detallado automotriz móvil en tu hogar u oficina",
    heading: ["Detallado móvil de nivel diamante", "en todo el Área de la Bahía"],
    description: "Detallado interior profesional, corrección de pintura y recubrimiento cerámico directamente en tu puerta en el Área de la Bahía.",
    vehiclesDetailed: "vehículos detallados",
    mobileService: "Servicio móvil",
    desktopService: "servicio móvil",
    primaryAction: "Solicita tu servicio",
    secondaryAction: "Ver servicios",
    location: "En tu hogar u oficina",
    carousel: { mobileSlide: "Ir a la diapositiva", desktopSlide: "Ir a la diapositiva de escritorio" },
    imageAlts: [
      "Auto deportivo azul recién detallado con acabado exterior brillante",
      "Exterior de un vehículo detallado con brillo y reflejos",
      "Detalle exterior con pintura limpia y reflejos brillantes",
      "Acabado exterior detallado preparado para protección",
    ],
  },
  whyDuartes: {
    eyebrow: "Por qué elegir Duartes",
    title: "Cuidado detallado en la ubicación de tu vehículo.",
    description: "Llevamos el detallado automotriz móvil a tu hogar u oficina para atender tu vehículo donde te resulte conveniente.",
    callout: "Más que limpieza: cuidado detallado para tu vehículo.",
    calloutDescription: "Nos enfocamos en limpiar, restaurar y proteger tu vehículo con atención a cada detalle.",
    statistics: ["Vehículos detallados", "Años de experiencia", "Ubicaciones atendidas"],
  },
  featuredPackages: {
    eyebrow: "Paquetes seleccionados",
    title: "Paquetes destacados",
    description: "Conoce opciones de detallado interior, exterior y de protección para tu vehículo.",
    action: "Ver todos los servicios",
  },
  gallery: {
    eyebrow: "Galería",
    title: "Trabajos de detallado",
    description: "Explora imágenes de nuestros procesos y servicios de detallado.",
    itemLabels: [
      "Aplicación de recubrimiento cerámico",
      "Detallado interior con limpieza a vapor",
      "Aplicación de recubrimiento cerámico",
      "Descontaminación con barra de arcilla",
      "Antes y después del detallado completo de un Ford Mustang GT",
      "Limpieza profunda de tapicería de asientos",
      "Proceso de descontaminación profunda con barra de arcilla",
    ],
  },
  discountBanner: {
    eyebrow: "Oferta especial",
    title: "20% de descuento en tu primer servicio",
    description: "Agenda hoy y disfruta un 20% de descuento en tu primera sesión de detallado premium en cualquier zona del Área de la Bahía.",
    action: "Solicita tu servicio",
  },
} as const satisfies HomeContent;
