import type { ServiceId } from "../data/services";

export interface LocalizedServiceDetail {
  name: string;
  tagline: string;
  description: string;
  includes: readonly string[];
  ctaLine: string;
  pageTitle: string;
  pageDescription: string;
  imageAlt: string;
}

export interface ServiceDetailUiContent {
  eyebrow: string;
  includesHeading: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescriptionPrefix: string;
  ctaDescriptionSuffix: string;
  ctaButtonText: string;
  smsMessagePrefix: string;
  relatedEyebrow: string;
  relatedTitle: string;
  relatedButtonText: string;
}

export const spanishServiceDetailUiContent: ServiceDetailUiContent = {
  eyebrow: "Detalle del servicio",
  includesHeading: "Qué incluye este servicio",
  ctaEyebrow: "¿Listo para reservar este servicio?",
  ctaTitle: "Agenda tu cita hoy",
  ctaDescriptionPrefix: "Reserva",
  ctaDescriptionSuffix: "y llevamos el detallado móvil premium directamente a la entrada de tu casa, oficina o estacionamiento privado.",
  ctaButtonText: "Reservar servicio",
  smsMessagePrefix: "Hola, me gustaría reservar el servicio:",
  relatedEyebrow: "Servicios relacionados",
  relatedTitle: "Explora más opciones para tu vehículo",
  relatedButtonText: "Ver detalles",
};

export const spanishServiceDetails: Record<ServiceId, LocalizedServiceDetail> = {
  "interior-detail": {
    name: "Detallado interior",
    tagline: "Cuidado detallado del interior centrado en la limpieza, la comodidad y la presentación.",
    description: "Este servicio está diseñado para elevar el interior de tu vehículo a una condición impecable y refinada. En Duartes Auto Detailing brindamos una experiencia meticulosa y orientada al detalle, acondicionando cuidadosamente cada superficie para lograr un acabado limpio, renovado y sofisticado que podés ver y sentir.",
    includes: [
      "Aspirado profundo y completo de todo el interior",
      "Champú y lavado especializado de interiores",
      "Limpieza detallada de tablero, consola, portavasos, plásticos y molduras",
      "Limpieza profunda de alfombras y tapetes",
      "Limpieza y acondicionamiento regular de asientos",
      "Limpieza de cristales y parabrisas por la cara interior",
      "Limpieza y detallado de paneles de puertas",
      "Limpieza y aspirado del maletero / baúl",
      "Protección contra rayos UV para superficies de cuero, plástico y vinilo",
    ],
    ctaLine: "Un interior fresco, limpio y protegido.",
    pageTitle: "Detallado interior en el Área de la Bahía",
    pageDescription: "Cuidado detallado del interior centrado en la limpieza, la comodidad y la presentación. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de detallado interior por Duartes Auto Detailing",
  },
  "exterior-detail": {
    name: "Detallado exterior",
    tagline: "Un proceso refinado de limpieza exterior que realza el brillo y la presentación.",
    description: "Nuestro servicio de detallado exterior va mucho más allá de un lavado convencional. Limpiamos cuidadosamente la pintura, rines, neumáticos, cristales, molduras y superficies exteriores para remover la suciedad del camino, polvo, residuos y contaminantes adheridos. El objetivo es restaurar un acabado más limpio, brillante y sofisticado, mejorando la presencia general de tu vehículo.",
    includes: [
      "Lavado exterior completo a mano",
      "Limpieza y detallado minucioso de rines",
      "Limpieza y acondicionamiento protector de neumáticos",
      "Limpieza profunda de cristales y espejos exteriores",
      "Limpieza detallada de marcos y bordes de puertas",
      "Eliminación de alquitrán, brea y savia de árboles",
      "Remoción de insectos y residuos de carretera",
      "Restauración y protección de molduras plásticas negras",
      "Aplicación de cera líquida protectora",
      "Pulido manual para realzar el brillo",
    ],
    ctaLine: "Un exterior limpio, reluciente y protegido.",
    pageTitle: "Detallado exterior en el Área de la Bahía",
    pageDescription: "Un proceso refinado de limpieza exterior que realza el brillo y la presentación. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de detallado exterior por Duartes Auto Detailing",
  },
  "paint-correction": {
    name: "Corrección de pintura",
    tagline: "Pulido profesional diseñado para mejorar el brillo, la profundidad y la claridad.",
    description: "La corrección de pintura es un tratamiento especializado enfocado en reducir marcas de remolino (swirl marks), micro-rayones, oxidación ligera, manchas de agua y la opacidad en la pintura. Mediante un proceso cuidadoso de pulido a máquina, perfeccionamos el acabado general y devolvemos un aspecto más profundo, reflectante y elegante. Cada vehículo se evalúa de manera individual, ya que el estado de la pintura y los resultados dependen de la antigüedad y condición de la superficie.",
    includes: [
      "Lavado exhaustivo y descontaminación de la carrocería",
      "Tratamiento con barra de arcilla (según sea necesario)",
      "Inspección detallada del estado y espesor de la pintura",
      "Pulido correctivo a máquina por etapas",
      "Refinamiento para máxima profundidad de brillo",
      "Aplicación de sellador protector para la pintura",
    ],
    ctaLine: "Un acabado con mayor brillo, claridad y refinamiento visual.",
    pageTitle: "Corrección de pintura en el Área de la Bahía",
    pageDescription: "Pulido profesional diseñado para mejorar el brillo, la profundidad y la claridad. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de corrección de pintura por Duartes Auto Detailing",
  },
  "ceramic-coating": {
    name: "Recubrimiento cerámico",
    tagline: "Protección de pintura a largo plazo con brillo intenso y mantenimiento simplificado.",
    description: "Nuestro servicio de recubrimiento cerámico está pensado para quienes exigen un nivel superior de protección y un acabado prémium para su vehículo. Este recubrimiento de nanotecnología avanzada ayuda a proteger la pintura contra los rayos UV, agua, polvo, contaminantes ambientales y el desgaste diario, al tiempo que potencia el brillo hidrofóbico y facilita enormemente los lavados regulares. Es la mejor inversión para preservar la estética y el valor de tu auto a través del tiempo.",
    includes: [
      "Lavado profundo y descontaminación completa de superficies",
      "Tratamiento con barra de arcilla (clay bar) si es requerido",
      "Corrección o pulido de pintura para preparar la superficie",
      "Preparación de la superficie con limpiador a base de alcohol isopropílico",
      "Aplicación minuciosa del recubrimiento cerámico por paneles",
      "Proceso de curado e instrucciones detalladas de cuidado posterior",
    ],
    ctaLine: "Brillo de larga duración, fácil mantenimiento y protección duradera para tu pintura.",
    pageTitle: "Recubrimiento cerámico en el Área de la Bahía",
    pageDescription: "Protección de pintura a largo plazo con brillo intenso y mantenimiento simplificado. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de recubrimiento cerámico por Duartes Auto Detailing",
  },
  "full-detail": {
    name: "Detallado completo (interior y exterior)",
    tagline: "Detallado integral de interior y exterior en un solo servicio exhaustivo.",
    description: "Nuestro servicio de Detallado Completo reúne lo mejor de nuestros procesos interiores y exteriores para clientes que buscan una renovación total de su vehículo. Es una de las alternativas más convenientes para autos que requieren restaurar por completo su aspecto, pulcritud y elegancia. Resulta ideal para el mantenimiento periódico de alto nivel, la recuperación estética de un vehículo o la preparación para lucir su versión impecable.",
    includes: [
      "Aspirado profundo y completo de todo el habitáculo",
      "Champú y lavado especializado de tapicerías interiores",
      "Limpieza y reacondicionamiento de plásticos, vinilo y molduras",
      "Limpieza detallada de consola, tablero y portavasos",
      "Lavado y desinfección de tapetes de hule o alfombra",
      "Limpieza profunda de alfombras",
      "Limpieza y acondicionamiento regular de asientos",
      "Limpieza de cristales por dentro y por fuera",
      "Limpieza de paneles de puertas y marcos interiores",
      "Limpieza y aspirado completo del maletero",
      "Protección UV para superficies de cuero, plástico y vinilo",
      "Lavado exterior completo a mano",
      "Limpieza y detallado minucioso de rines",
      "Limpieza y acondicionamiento protector de neumáticos",
      "Eliminación de alquitrán, savia de árboles e insectos adheridos",
      "Restauración y protección de molduras exteriores negras",
      "Aplicación de cera líquida de alta calidad",
      "Pulido manual para máximo resplandor exterior",
    ],
    ctaLine: "Un vehículo completamente renovado, limpio, brillante y protegido por dentro y por fuera.",
    pageTitle: "Detallado completo (interior y exterior) en el Área de la Bahía",
    pageDescription: "Detallado integral de interior y exterior en un solo servicio exhaustivo. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de detallado completo por Duartes Auto Detailing",
  },
  "seat-upholstery-deep-cleaning": {
    name: "Limpieza profunda de asientos y tapicería",
    tagline: "Restauración profunda de telas interiores para una cabina más limpia y fresca.",
    description: "Nuestro servicio de limpieza profunda está diseñado especialmente para asientos de tela, alfombras, tapetes y vestiduras que requieren una acción superior a la limpieza superficial ordinaria. Empleamos productos profesionales específicos, agitación controlada, tratamiento previo de manchas y máquinas de inyección-extracción para remover suciedad incrustada, derrames, olores y acumulación de uso continuo. Es la solución perfecta para autos con manchas visibles, desgaste diario o interiores que necesitan una desinfección y reinicio total.",
    includes: [
      "Tratamiento térmico con vapor para ablandar suciedad y desinfectar",
      "Tratamiento especializado en 3 etapas para tejidos y telas",
      "Lavado profundo con champú de alta espumación controlada",
      "Proceso de extracción profunda por inyección y succión",
      "Limpieza exhaustiva de asientos de tela y tapicería integral",
      "Tratamiento focalizado contra manchas difíciles",
      "Tratamiento neutralizador y reductor de malos olores",
      "Limpieza localizada en áreas de tela y paneles circundantes",
    ],
    ctaLine: "Asientos y tapicería profundamente limpios, con un aroma fresco y aspecto renovado.",
    pageTitle: "Limpieza profunda de asientos y tapicería en el Área de la Bahía",
    pageDescription: "Restauración profunda de telas interiores para una cabina más limpia y fresca. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de limpieza profunda de asientos y tapicería por Duartes Auto Detailing",
  },
  "headlight-restoration": {
    name: "Restauración de faros",
    tagline: "Recupera la claridad, mejora la estética del auto y aumenta la visibilidad nocturna.",
    description: "Los faros opacos, amarillentos o con capas de oxidación hacen que el auto luzca envejecido y restan potencia a la iluminación nocturna. Nuestro servicio de restauración de faros elimina esa película deteriorada mediante un proceso técnico de lijado fino y pulido escalonado. Devolvemos la transparencia cristalina al lente, mejorando drásticamente la imagen del vehículo, la seguridad en la ruta y la visibilidad nocturna.",
    includes: [
      "Lavado y descontaminación previa del lente de los faros",
      "Proceso de lijado al agua en varias gradaciones técnicas",
      "Pulido a máquina con compuestos especiales para policarbonato",
      "Aplicación de recubrimiento cerámico de protección por hasta 3 años",
    ],
    ctaLine: "Faros más nítidos, brillantes y protegidos contra el desgaste por mucho más tiempo.",
    pageTitle: "Restauración de faros en el Área de la Bahía",
    pageDescription: "Recupera la claridad, mejora la estética del auto y aumenta la visibilidad nocturna. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de restauración de faros por Duartes Auto Detailing",
  },
  "clay-bar-decontamination": {
    name: "Descontaminación con barra de arcilla",
    tagline: "Descontaminación de pintura para remover lo que un lavado tradicional no puede quitar.",
    description: "Con el paso de las semanas, la pintura del auto acumula partículas ferrosas, lluvia ácida, restos de pintura volatilizada y contaminantes industriales que se adhieren fuertemente y no salen con un simple lavado. Nuestro tratamiento con barra de arcilla (clay bar) remueve con total seguridad estos contaminantes adheridos, dejando la pintura perfectamente suave al tacto y lista para recibir pulido, selladores o recubrimientos cerámicos.",
    includes: [
      "Lavado exterior completo preparatorio",
      "Descontaminación química de residuos ferrosos y orgánicos",
      "Descontaminación mecánica con barra de arcilla y lubricante especial",
      "Eliminación de residuos y limpieza final con microfibra",
    ],
    ctaLine: "Una superficie de pintura notablemente más suave, limpia y preparada para brillar.",
    pageTitle: "Descontaminación con barra de arcilla en el Área de la Bahía",
    pageDescription: "Descontaminación de pintura para remover lo que un lavado tradicional no puede quitar. Servicio móvil en toda el Área de la Bahía.",
    imageAlt: "Resultado de descontaminación con barra de arcilla por Duartes Auto Detailing",
  },
};
