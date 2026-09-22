import type { ServicesContent } from "./content-types";

export const spanishServicesContent = {
  policy: { areaTeaser: "include", englishDetailDisclosure: "required" },
  metadata: {
    title: "Servicios de detallado automotriz móvil",
    description: "Explora servicios de detallado automotriz móvil en el Área de la Bahía, incluidos el detallado interior, exterior y completo, el recubrimiento cerámico y la corrección de pintura.",
    socialImageAlt: "Resultado de un servicio de Duartes Auto Detailing",
    schemaName: "Servicios de detallado automotriz móvil",
    schemaDescription: "Servicios móviles de detallado automotriz de Duartes Auto Detailing para conductores del Área de la Bahía.",
  },
  hero: {
    eyebrow: "Catálogo de servicios",
    title: "Servicios de detallado móvil a la medida de tu vehículo",
    description: "Explora servicios de detallado móvil según tu vehículo, tus objetivos para el acabado y el nivel de protección que deseas mantener.",
  },
  intro: {
    eyebrow: "Selección de servicios",
    title: "Servicios diseñados para el brillo, la protección y el cuidado a largo plazo.",
    description: "Cada servicio responde a un nivel distinto de mantenimiento, corrección o protección. Revisa el catálogo para comparar opciones, conocer el proceso y elegir una alternativa para tu vehículo.",
    benefits: [
      { title: "100% Móvil", description: "Agua y electricidad a bordo" },
      { title: "500+ Autos", description: "Detallados en el Área de la Bahía" },
      { title: "15+ Ciudades", description: "Atención directa en tu ubicación" },
    ],
    imageAlt: "Limpieza profesional de una rueda con producto en aerosol",
    processEyebrow: "Proceso de detallado",
    processDescription: "Desde lavados de mantenimiento hasta procesos de corrección y protección de alta exigencia, cada servicio se ejecuta con la misma disciplina y atención a la calidad del acabado.",
  },
  grid: {
    eyebrow: "Servicios disponibles",
    title: "Elige el paquete que se adapte al aspecto y la durabilidad que buscas para tu vehículo.",
    description: "Cada opción está diseñada para ser fácil de comparar, sencilla de reservar y clara sobre el nivel de acabado que puedes esperar.",
  },
  cards: {
    detailAction: "Ver detalles en inglés",
    englishDetailDisclosure: "Los detalles completos de cada servicio están disponibles en inglés.",
    byServiceId: {
      "interior-detail": { displayName: "Detallado interior", summary: "Cuidado detallado del interior centrado en la limpieza, la comodidad y la presentación." },
      "exterior-detail": { displayName: "Detallado exterior", summary: "Proceso de limpieza exterior orientado a realzar el brillo y la presentación." },
      "paint-correction": { displayName: "Corrección de pintura", summary: "Proceso de pulido orientado a mejorar el brillo, la profundidad y la claridad." },
      "ceramic-coating": { displayName: "Recubrimiento cerámico", summary: "Servicio de recubrimiento diseñado para ayudar a proteger la pintura y facilitar su mantenimiento." },
      "full-detail": { displayName: "Detallado completo (interior y exterior)", summary: "Detallado integral de interior y exterior en un solo servicio." },
      "seat-upholstery-deep-cleaning": { displayName: "Limpieza profunda de asientos y tapicería", summary: "Limpieza profunda para asientos, alfombras, tapetes y tapicería de tela." },
      "headlight-restoration": { displayName: "Restauración de faros", summary: "Servicio de restauración orientado a mejorar la claridad de los faros, su apariencia y la visibilidad nocturna." },
      "clay-bar-decontamination": { displayName: "Descontaminación con barra de arcilla", summary: "Tratamiento de descontaminación de pintura para retirar contaminantes adheridos." },
    },
  },
  areaTeaser: {
    eyebrow: "Área de servicio móvil",
    title: "Detallado profesional en tu ubicación en el Área de la Bahía.",
    description: "Duartes Auto Detailing es un servicio móvil para conductores del Área de la Bahía. Visita nuestro centro de áreas de servicio para conocer las ciudades prioritarias y cómo funcionan las citas a domicilio, oficinas y estacionamientos privados.",
    action: "Ver área de servicio de la Bahía",
  },
} as const satisfies ServicesContent;

export const spanishServicesContentDigest = "bc55a2b15231023ba174f9bf11f1189a3c62d6a114eb0bdda90b55b6ff4b97a5";
