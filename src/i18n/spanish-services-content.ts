import type { ServicesContent } from "./content-types";

export const spanishServicesContent = {
  policy: { areaTeaser: "omit", englishDetailDisclosure: "required" },
  metadata: {
    title: "Servicios de detallado automotriz móvil",
    description: "Explora servicios de detallado automotriz móvil, incluidos el detallado interior, exterior y completo, el recubrimiento cerámico y la corrección de pintura.",
    socialImageAlt: "Resultado de un servicio de Duartes Auto Detailing",
    schemaName: "Servicios de detallado automotriz móvil",
    schemaDescription: "Servicios móviles de detallado automotriz de Duartes Auto Detailing para conductores del Área de la Bahía.",
  },
  hero: {
    eyebrow: "Catálogo de servicios",
    title: "Cuidado a medida para cada acabado",
    description: "Explora servicios de detallado móvil según tu vehículo, tus objetivos para el acabado y el nivel de protección que deseas mantener.",
  },
  intro: {
    eyebrow: "Selección de servicios",
    title: "Servicios diseñados para el brillo, la protección y el cuidado a largo plazo.",
    description: "Cada servicio responde a un nivel distinto de mantenimiento, corrección o protección. Revisa el catálogo para comparar opciones, conocer el proceso y elegir una alternativa para tu vehículo.",
    benefits: [
      { title: "Móvil", description: "Servicio en tu ubicación" },
      { title: "Atención", description: "Enfoque en los detalles" },
      { title: "Cuidado", description: "Atención al acabado" },
    ],
    imageAlt: "Limpieza profesional de una rueda con producto en aerosol",
    processEyebrow: "Proceso de detallado",
    processDescription: "Desde lavados de mantenimiento hasta procesos de corrección y protección, cada servicio se realiza con atención al acabado.",
  },
  grid: {
    eyebrow: "Servicios disponibles",
    title: "Elige el servicio que se ajuste a las necesidades de tu vehículo.",
    description: "Compara las opciones y conoce el enfoque de cada servicio.",
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
      "headlight-restoration": { displayName: "Restauración de faros", summary: "Servicio de restauración orientado a mejorar la claridad y la apariencia de los faros." },
      "clay-bar-decontamination": { displayName: "Descontaminación con barra de arcilla", summary: "Tratamiento de descontaminación de pintura para retirar contaminantes adheridos." },
    },
  },
} as const satisfies ServicesContent;

export const spanishServicesContentDigest = "8d2cd90a9f164f7a0c1f10b110ec32e1e925a63bf244d6de4fbbf52d1b5caadf";
