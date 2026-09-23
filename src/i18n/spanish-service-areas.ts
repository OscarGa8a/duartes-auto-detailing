import { priorityServiceAreaCities, type ServiceAreaFaq } from "../data/service-areas";

export interface LocalizedCityContent {
  name: string;
  slug: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  intro: string;
  customerAngle: string;
  serviceGuidance: string;
  faqs: ServiceAreaFaq[];
}

const localizedRegions: Record<string, string> = {
  "Bay Area": "Área de la Bahía",
  "East Bay": "Bahía Este",
  "Tri-Valley": "Tri-Valley",
  "Peninsula": "Península",
  "South Bay": "Bahía Sur",
  "San Francisco": "San Francisco",
};

const localizedServiceNames: Record<string, string> = {
  "interior-detailing": "detallado interior",
  "exterior-detailing": "detallado exterior",
  "full-detailing": "detallado integral",
  "ceramic-coating": "recubrimiento cerámico",
  "paint-correction": "corrección de pintura",
  "seat-upholstery-deep-cleaning": "limpieza profunda de tapicería",
  "headlight-restoration": "restauración de faros",
  "clay-bar-decontamination": "descontaminación con barra de arcilla",
};

export const spanishCityServiceGuidance: Record<string, string> = {
  "walnut-creek":
    "Elegí un detallado interior cuando el habitáculo necesite limpieza profunda, acondicionamiento y una presentación renovada, o un detallado exterior si el objetivo es limpiar y dar brillo a la pintura, llantas, cristales y molduras. El detallado integral combina ambos servicios para una renovación completa por dentro y por fuera. El recubrimiento cerámico es una opción enfocada en protección duradera de la pintura luego de evaluar su estado y el acabado que deseás mantener.",
  alameda:
    "Comenzá con un detallado interior para revitalizar el habitáculo o un detallado exterior para el cuidado de pintura, llantas, cristales y molduras. Elegí un detallado integral cuando ambas áreas requieran atención en una misma cita. Si la pintura se siente áspera al tacto luego del lavado, la descontaminación con barra de arcilla elimina impurezas incrustadas y prepara la superficie para un posterior pulido o sellado protector.",
  fremont:
    "Optá por un detallado exterior para una apariencia más limpia y brillante en pintura, llantas, neumáticos y cristales; elegí un detallado integral cuando el interior también requiera un acondicionamiento profundo. La descontaminación con barra de arcilla es ideal si la superficie acumula impurezas rugosas. Para marcas circulares (swirls), rayones leves, manchas de agua u oxidación, consultá por corrección de pintura tras una evaluación.",
  hayward:
    "Para asientos de tela, alfombras o tapicería con manchas, derrames, olores o suciedad incrustada, la limpieza profunda de tapicería es la opción indicada. El detallado interior abarca la limpieza general y acondicionamiento del habitáculo. Seleccioná un detallado integral para atender el interior y exterior conjuntamente, o un detallado exterior cuando la prioridad esté en la carrocería, llantas y cristales.",
  oakland:
    "El detallado integral es el punto de partida más claro para renovar el interior y el exterior en un solo servicio. Elegí un detallado interior para aspirado profundo, champú y acondicionamiento de molduras y cristales, o un detallado exterior para una limpieza refinada de la carrocería y llantas. Para tapizados de tela o alfombras que necesiten más que una limpieza superficial, consultá por nuestro servicio dedicado de limpieza profunda.",
  berkeley:
    "Elegí un detallado interior cuando la limpieza, comodidad y presentación del habitáculo sean la prioridad, y un detallado exterior si buscás realzar el acabado exterior. El detallado integral une ambas opciones para una renovación total. Si tu principal preocupación son remolinos, rayones leves, marcas de agua u oxidación en la pintura, la corrección de pintura es la alternativa indicada tras evaluar el estado de la superficie.",
  richmond:
    "Elegí un detallado integral para una transformación completa por dentro y por fuera, o acotá el alcance con un detallado interior o exterior según tus prioridades. La restauración de faros es un servicio especializado para ópticas opacas, amarillentas u oxidadas, enfocado en recuperar la claridad y mejorar la iluminación nocturna. Se puede coordinar junto a un detallado general sin reemplazar el cuidado de pintura o cabina.",
  livermore:
    "Un detallado exterior es perfecto cuando el objetivo es lograr una carrocería limpia y reluciente, mientras que el detallado integral suma un cuidado interior exhaustivo. La corrección de pintura trata remolinos visibles, rayones superficiales, manchas de agua y falta de brillo mediante pulido a máquina tras evaluar la laca. El recubrimiento cerámico brinda protección de larga duración y facilita el mantenimiento regular de tu vehículo.",
  "palo-alto":
    "Considerá el recubrimiento cerámico si buscás máxima protección para la pintura con mayor profundidad de brillo y un mantenimiento mucho más sencillo. Si la pintura presenta remolinos, micro rayones u oxidación, evaluamos si conviene aplicar corrección de pintura antes del sellado cerámico. Elegí un detallado interior para el cuidado del habitáculo, o un detallado integral cuando ambos sectores necesiten atención en la misma cita.",
  "san-jose":
    "Seleccioná un detallado interior para un aspirado exhaustivo, champú, limpieza de superficies y acondicionamiento, o un detallado exterior para una presentación limpia y protegida por fuera. El detallado integral es la alternativa combinada cuando ambas áreas requieren trabajo. El recubrimiento cerámico es ideal para una protección prolongada que resalta el brillo y facilita los lavados, adaptándose a las condiciones de tu vehículo.",
  "san-mateo":
    "Elegí un detallado interior para renovar la cabina o un detallado exterior para el tratamiento de pintura, llantas, neumáticos y molduras; el detallado integral combina ambos servicios. Cuando los faros delanteros lucen opacos, amarillentos o desgastados por el sol, la restauración de faros es el trabajo específico para recuperar la transparencia y potencia lumínica, complementando de forma ideal el cuidado general del vehículo.",
  pleasanton:
    "El detallado integral es la opción indicada cuando el vehículo necesita atención completa por dentro y por fuera, mientras que el detallado interior se enfoca exclusivamente en superficies, alfombras y cristales. Para un plan centrado en la pintura, la corrección suaviza marcas circulares, rayones leves y manchas tras una inspección. El recubrimiento cerámico ofrece protección duradera una vez logrado el acabado deseado.",
  "union-city":
    "Elegí un detallado integral para el cuidado simultáneo del interior y exterior, o seleccioná un detallado interior o exterior si tu objetivo se concentra en una sola parte del vehículo. Si al lavar el auto la pintura se siente áspera, la descontaminación con barra de arcilla remueve impurezas adheridas que el lavado común no saca, dejando la superficie suave y lista para pulido, selladores o recubrimiento cerámico.",
  "san-leandro":
    "El detallado interior es la alternativa ideal para limpieza de cabina, champú en tapicerías, molduras y cristales; el detallado integral suma el cuidado exterior de pintura, llantas y neumáticos. La restauración de faros está recomendada para ópticas nubladas u oxidadas que necesitan recuperar claridad lumínica. Si el habitáculo ya está en óptimas condiciones, elegí un detallado exterior para realzar la estética de la carrocería.",
  dublin:
    "Optá por un detallado integral para una renovación completa de cabina y exterior, o por un detallado interior para limpiar y acondicionar el habitáculo sin intervenir la pintura. La corrección de pintura es el camino técnico para atenuar marcas circulares, rayones superficiales, oxidación y manchas de agua según la condición de la laca. El recubrimiento cerámico sella el trabajo con protección prolongada y brillo superior.",
  "castro-valley":
    "Elegí la limpieza profunda de tapicería para asientos de tela, alfombras o tapetes con suciedad acumulada, manchas, derrames u olores persistentes. El detallado interior es la alternativa más amplia para el acondicionamiento de toda la cabina, mientras que el detallado integral cubre tanto el interior como el exterior. Si el habitáculo está en buen estado, un detallado exterior devolverá el brillo a pintura, llantas y cristales.",
  "san-francisco":
    "Comenzá con un detallado interior para disfrutar de un habitáculo limpio y acondicionado, o elegí un detallado integral cuando la carrocería también necesite una renovación total. La corrección de pintura permite atenuar marcas de remolinos, rayones leves, manchas de agua y falta de brillo mediante pulido profesional tras evaluar la superficie. El recubrimiento cerámico protege la pintura a largo plazo y simplifica su mantenimiento.",
};

export const createSpanishCityFaqs = (cityName: string, serviceGuidance: string): ServiceAreaFaq[] => [
  {
    question: `¿Duartes Auto Detailing realiza citas a domicilio en ${cityName}?`,
    answer: `Duartes Auto Detailing ofrece citas de auto detallado móvil en ${cityName}. Atendemos en tu domicilio particular, oficina o garaje privado siempre que se cuente con un acceso vehicular seguro y suficiente espacio para trabajar alrededor del auto.`,
  },
  {
    question: `¿Cómo elijo el servicio más adecuado para mi vehículo en ${cityName}?`,
    answer: serviceGuidance,
  },
  {
    question: `¿Cómo debo prepararme para una cita de detallado móvil en ${cityName}?`,
    answer:
      "Elegí un espacio de estacionamiento seguro con suficiente lugar alrededor del vehículo, retirá tus pertenencias personales antes de la cita y compartí con anticipación las indicaciones de acceso o estacionamiento.",
  },
];

export const spanishServiceAreaCities: Record<string, LocalizedCityContent> = Object.fromEntries(
  priorityServiceAreaCities.map((city) => {
    const region = localizedRegions[city.region] ?? city.region;
    const guidance = spanishCityServiceGuidance[city.slug] ?? city.serviceGuidance;
    const serviceList = city.serviceHighlights
      .map((slug) => localizedServiceNames[slug] ?? slug)
      .join(", ");

    return [
      city.slug,
      {
        name: city.name,
        slug: city.slug,
        region,
        metaTitle: `Auto Detallado Móvil en ${city.name} | Duartes Auto Detailing`,
        metaDescription: `Servicio profesional de detallado automotriz móvil en ${city.name} por Duartes Auto Detailing. Opciones de detallado interior, exterior, integral, corrección y cerámico.`,
        heroDescription: `Servicio profesional de detallado automotriz móvil disponible en ${city.name} para citas en tu domicilio, oficina o garaje privado con acceso vehicular seguro.`,
        intro: `Duartes Auto Detailing ofrece citas de auto detallado móvil en ${city.name} como parte de su cobertura en ${region}. Atendemos directamente en tu ubicación cuando el vehículo se encuentra en un lugar de estacionamiento seguro y accesible.`,
        customerAngle: `En esta página te presentamos los servicios destacados para ${city.name}: ${serviceList}. Compartinos el estado de tu vehículo, tus objetivos de detallado y los detalles de acceso para confirmar disponibilidad y coordinar tu cita.`,
        serviceGuidance: guidance,
        faqs: createSpanishCityFaqs(city.name, guidance),
      },
    ];
  })
);

export const getSpanishServiceAreaCityBySlug = (slug: string): LocalizedCityContent | undefined =>
  spanishServiceAreaCities[slug];
