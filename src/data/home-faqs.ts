export interface HomeFaqItem {
  question: string;
  answer: string;
}

export const englishHomeFaqs: readonly HomeFaqItem[] = [
  {
    question: "Do you bring your own water and power for mobile detailing?",
    answer:
      "Yes. Duartes Auto Detailing operates self-contained mobile detailing units equipped with onboard water and electricity. We service your vehicle at your home, office, or private garage without requiring access to external utilities.",
  },
  {
    question: "Do I have to be present during the entire mobile detailing appointment?",
    answer:
      "No. You only need to provide vehicle access at the start or coordinate key handoff. Many of our Bay Area clients have their vehicles detailed while working from home or at the office, and we notify you once the final inspection is ready.",
  },
  {
    question: "Can you detail my vehicle at an office lot or apartment garage?",
    answer:
      "Yes, as long as the location allows on-site vehicle care and provides safe working space around the vehicle. We regularly service vehicles in residential driveways, office parking facilities, and private garages across the Bay Area.",
  },
  {
    question: "What areas and cities across the Bay Area do you serve?",
    answer:
      "We provide mobile auto detailing throughout the greater San Francisco Bay Area, including San Jose, San Francisco, Oakland, Fremont, Berkeley, Walnut Creek, San Mateo, Palo Alto, Hayward, and Alameda. Appointments are scheduled wherever safe vehicle access exists.",
  },
  {
    question: "What is the difference between paint correction and ceramic coating?",
    answer:
      "Paint correction is a machine polishing process that levels clear coat imperfections to eliminate swirl marks, light scratches, and oxidation. Ceramic coating is a protective liquid polymer applied to sealed paint that provides hydrophobic water-beading, UV defense, and deep gloss.",
  },
  {
    question: "How long does a typical mobile detailing appointment take?",
    answer:
      "A standard interior or exterior mobile detail typically takes 2 to 3 hours, while full detailing, multi-stage paint correction, and ceramic coatings require 4 to 8 hours depending on vehicle size and initial paint condition.",
  },
] as const;

export const spanishHomeFaqs: readonly HomeFaqItem[] = [
  {
    question: "¿Traen su propia agua y electricidad para el detallado móvil?",
    answer:
      "Sí. Duartes Auto Detailing cuenta con unidades móviles totalmente equipadas con tanque de agua y generador propio. Brindamos el servicio en tu casa, oficina o garaje privado sin necesidad de utilizar tus tomas de agua o corriente.",
  },
  {
    question: "¿Tengo que estar presente durante toda la cita de detallado móvil?",
    answer:
      "No. Solo necesitas facilitarnos el acceso al vehículo al inicio o coordinar la entrega de llaves. Muchos de nuestros clientes en el Área de la Bahía atienden su auto mientras trabajan en el hogar o la oficina, y les avisamos al terminar para la inspección final.",
  },
  {
    question: "¿Pueden detallar mi vehículo en el estacionamiento de una oficina o apartamento?",
    answer:
      "Sí, siempre que la administración del lugar permita el cuidado vehicular en el sitio y haya espacio suficiente y seguro alrededor del auto. Atendemos habitualmente en estacionamientos de oficinas, garajes privados y entradas residenciales en todo el Área de la Bahía.",
  },
  {
    question: "¿Qué áreas y ciudades cubren en el Área de la Bahía?",
    answer:
      "Ofrecemos detallado automotriz móvil en todo el Área de la Bahía, incluyendo San José, San Francisco, Oakland, Fremont, Berkeley, Walnut Creek, San Mateo, Palo Alto, Hayward y Alameda. Agendamos citas donde exista un espacio seguro para trabajar en el vehículo.",
  },
  {
    question: "¿Cuál es la diferencia entre corrección de pintura y recubrimiento cerámico?",
    answer:
      "La corrección de pintura es un pulido a máquina que elimina marcas circulares (swirls), rayones ligeros y oxidación para restaurar la claridad del barniz. El recubrimiento cerámico es una protección líquida posterior que sella la pintura, brindando brillo profundo y propiedades hidrofóbicas duraderas.",
  },
  {
    question: "¿Cuánto tiempo dura una cita de detallado móvil?",
    answer:
      "Un servicio estándar de detallado interior o exterior suele demorar entre 2 y 3 horas, mientras que los tratamientos completos, correcciones de pintura y recubrimientos cerámicos requieren de 4 a 8 horas según el tamaño y estado del vehículo.",
  },
] as const;

export const homeFaqs = englishHomeFaqs;
