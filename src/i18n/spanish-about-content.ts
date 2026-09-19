import type { AboutContent } from "./content-types";

export const spanishAboutContent = {
  metadata: {
    title: "Acerca de Duartes Auto Detailing",
    description: {
      template: "Conoce Duartes Auto Detailing: más de {yearsOfExperience} años de experiencia y más de {vehiclesDetailed} vehículos detallados para conductores del Área de la Bahía, California.",
      metrics: ["yearsOfExperience", "vehiclesDetailed"],
    },
    socialImageAlt: "Servicio móvil de detallado de Duartes Auto Detailing",
    schemaName: "Acerca de Duartes Auto Detailing",
    schemaDescription: {
      template: "Conoce Duartes Auto Detailing: más de {yearsOfExperience} años de experiencia y más de {vehiclesDetailed} vehículos detallados para conductores del Área de la Bahía, California.",
      metrics: ["yearsOfExperience", "vehiclesDetailed"],
    },
  },
  hero: {
    eyebrow: "Acerca de Duartes",
    title: "Atención centrada en los detalles",
    description: {
      template: "Durante más de {yearsOfExperience} años, Duartes Auto Detailing ha ofrecido servicios móviles de detallado para propietarios de vehículos en el Área de la Bahía.",
      metrics: ["yearsOfExperience"],
    },
  },
  standard: {
    imageAlt: "Persona aplicando un producto de detallado a un vehículo",
    calloutEyebrow: "Detallado móvil",
    calloutDescription: "Cada cita se planifica para brindar una atención clara y cuidadosa.",
    eyebrow: "El estándar de Duartes",
    title: "Atención para quienes valoran el cuidado de su vehículo.",
    highlight: "Más que un servicio: cuidado atento para tu vehículo.",
    description: {
      template: "En Duartes Auto Detailing entendemos que tu vehículo es una inversión importante. Con más de {yearsOfExperience} años de experiencia, hemos detallado más de {vehiclesDetailed} vehículos en más de {bayAreaLocations} ubicaciones atendidas del Área de la Bahía.",
      metrics: ["yearsOfExperience", "vehiclesDetailed", "bayAreaLocations"],
    },
    counters: ["Vehículos detallados", "Años de experiencia", "Ubicaciones atendidas en el Área de la Bahía"],
  },
  pillars: {
    eyebrow: "Nuestros principios",
    title: "Principios que orientan cada cita de Duartes.",
    description: "Estos principios orientan nuestra forma de atender y cuidar cada vehículo.",
    items: [
      { title: "Nuestro propósito", description: "Cuidar la limpieza y apariencia de cada vehículo mediante un servicio de detallado móvil." },
      { title: "Nuestro enfoque", description: "Ofrecer una atención clara y cuidadosa para propietarios de vehículos que buscan detallado móvil." },
      { title: "Nuestros valores", description: "Profesionalismo, claridad y versatilidad. Buscamos brindar una experiencia cómoda y respetuosa durante el servicio." },
    ],
  },
  behindTheShine: {
    eyebrow: "Detrás del brillo",
    title: "El cuidado empieza con la forma de trabajar.",
    description: "Duartes Auto Detailing ofrece detallado móvil para propietarios de vehículos en el Área de la Bahía. El servicio puede realizarse en hogares, oficinas y garajes privados.",
    quote: "Buscamos ofrecer una atención clara y un acabado cuidado en cada cita.",
    imageAlt: "Persona junto a un vehículo de Duartes Auto Detailing",
    cardEyebrow: "Servicio móvil de detallado",
    cardDescription: "Atención de detallado para vehículos en hogares, oficinas y garajes privados.",
  },
  cta: {
    eyebrow: "¿Quieres conocer más?",
    title: "Solicita información sobre los servicios",
    description: "Comunícate con Duartes Auto Detailing para conocer los servicios de detallado disponibles.",
    buttonText: "Consultar servicios",
    smsMessage: "Hola, me gustaría recibir más información sobre sus servicios de detallado. Gracias.",
  },
} as const satisfies AboutContent;
