export interface ServiceAreaFaq {
	question: string;
	answer: string;
}

export interface ServiceAreaCity {
	name: string;
	slug: string;
	region: string;
	metaTitle: string;
	metaDescription: string;
	heroDescription: string;
	intro: string;
	customerAngle: string;
	serviceGuidance: string;
	serviceHighlights: ServiceHighlightSlug[];
	relatedCitySlugs: string[];
	faqs: ServiceAreaFaq[];
}

const serviceSlugs = {
	interior: "interior-detailing",
	exterior: "exterior-detailing",
	full: "full-detailing",
	ceramic: "ceramic-coating",
	paintCorrection: "paint-correction",
	seatCleaning: "seat-upholstery-deep-cleaning",
	headlightRestoration: "headlight-restoration",
	clayBar: "clay-bar-decontamination",
} as const;

type ServiceHighlightSlug =
	(typeof serviceSlugs)[keyof typeof serviceSlugs];

const serviceNames: Record<ServiceHighlightSlug, string> = {
	"interior-detailing": "interior detailing",
	"exterior-detailing": "exterior detailing",
	"full-detailing": "full detailing",
	"ceramic-coating": "ceramic coating",
	"paint-correction": "paint correction",
	"seat-upholstery-deep-cleaning": "seat and upholstery deep cleaning",
	"headlight-restoration": "headlight restoration",
	"clay-bar-decontamination": "clay bar decontamination",
};

type CityDefinition = Pick<
	ServiceAreaCity,
	"name" | "slug" | "region" | "serviceGuidance" | "serviceHighlights" | "relatedCitySlugs"
>;

const createCityFaqs = (cityName: string, serviceGuidance: string): ServiceAreaFaq[] => [
	{
		question: `Does Duartes Auto Detailing offer mobile appointments in ${cityName}?`,
		answer: `Duartes Auto Detailing offers mobile appointments in ${cityName}. A home, office, or private garage appointment can be considered when there is safe access to the vehicle and enough room to work around it.`,
	},
	{
		question: `How should I choose a featured service for my vehicle in ${cityName}?`,
		answer: serviceGuidance,
	},
	{
		question: `How should I prepare for a mobile detailing appointment in ${cityName}?`,
		answer:
			"Choose a safe parking area with enough room around the vehicle, remove personal belongings when possible, and share parking or access details before the appointment.",
	},
];

const cityDefinitions: CityDefinition[] = [
	{ name: "Walnut Creek", slug: "walnut-creek", region: "Bay Area", serviceGuidance: "Choose an Interior Detail when the cabin needs cleaning, conditioning, and a refreshed presentation, or an Exterior Detail when the goal is cleaner paint, wheels, glass, and trim. A Full Detail combines both directions for a complete interior and exterior reset. Ceramic coating is a protection-focused option for paint after discussing surface condition and the finish you want to maintain.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.exterior, serviceSlugs.full, serviceSlugs.ceramic], relatedCitySlugs: ["pleasanton", "dublin", "livermore"] },
	{ name: "Alameda", slug: "alameda", region: "East Bay", serviceGuidance: "Start with an Interior Detail for a cabin-focused refresh or an Exterior Detail for paint, wheel, glass, and trim cleaning. Select a Full Detail when both areas need attention in one appointment. If the paint feels rough after washing, clay bar decontamination addresses bonded surface contamination and can prepare the paint for later polishing or protection.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.exterior, serviceSlugs.full, serviceSlugs.clayBar], relatedCitySlugs: ["oakland", "berkeley", "san-leandro"] },
	{ name: "Fremont", slug: "fremont", region: "East Bay", serviceGuidance: "Choose an Exterior Detail for a cleaner, glossier presentation across paint, wheels, tires, glass, and trim; choose a Full Detail when the interior also needs a complete refresh. Clay bar decontamination is useful when bonded contamination leaves paint rough. For swirl marks, light scratches, oxidation, water spots, or dullness, discuss paint correction, which is evaluated against the surface condition.", serviceHighlights: [serviceSlugs.exterior, serviceSlugs.full, serviceSlugs.clayBar, serviceSlugs.paintCorrection], relatedCitySlugs: ["union-city", "hayward", "castro-valley"] },
	{ name: "Hayward", slug: "hayward", region: "East Bay", serviceGuidance: "For cloth seats, carpets, mats, or fabric upholstery with stains, spills, odors, or embedded buildup, seat and upholstery deep cleaning is the focused choice. An Interior Detail covers broader cabin cleaning and conditioning. Select a Full Detail for both interior and exterior work, or an Exterior Detail when paint, wheels, tires, glass, and trim are the priority.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.full, serviceSlugs.seatCleaning, serviceSlugs.exterior], relatedCitySlugs: ["castro-valley", "union-city", "fremont"] },
	{ name: "Oakland", slug: "oakland", region: "East Bay", serviceGuidance: "A Full Detail is the clearest starting point when you want the interior and exterior addressed together. Choose an Interior Detail for vacuuming, shampooing, trim, glass, and cabin surfaces, or an Exterior Detail for a refined clean across paint, wheels, tires, glass, and trim. For fabric seats, carpets, or upholstery needing more than regular surface cleaning, ask about the dedicated deep-cleaning service.", serviceHighlights: [serviceSlugs.full, serviceSlugs.interior, serviceSlugs.exterior, serviceSlugs.seatCleaning], relatedCitySlugs: ["alameda", "berkeley", "san-leandro"] },
	{ name: "Berkeley", slug: "berkeley", region: "East Bay", serviceGuidance: "Use an Interior Detail when cleanliness, comfort, and cabin presentation are the goal, and an Exterior Detail when you want a cleaner exterior finish. A Full Detail combines those services for a broader refresh. If the main concern is swirl marks, light scratches, oxidation, water spots, or dull paint, paint correction is the more specific option; expected results depend on an individual surface evaluation.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.exterior, serviceSlugs.full, serviceSlugs.paintCorrection], relatedCitySlugs: ["oakland", "alameda", "richmond"] },
	{ name: "Richmond", slug: "richmond", region: "East Bay", serviceGuidance: "Choose a Full Detail for a complete interior and exterior transformation, or narrow the scope with an Interior Detail or Exterior Detail when one area is the priority. Headlight restoration is a separate choice for cloudy, yellowed, or oxidized lenses when restoring clarity and improving light output are the goal. It can be discussed alongside a broader detail without treating it as a substitute for interior or paint care.", serviceHighlights: [serviceSlugs.full, serviceSlugs.interior, serviceSlugs.headlightRestoration, serviceSlugs.exterior], relatedCitySlugs: ["berkeley", "oakland", "alameda"] },
	{ name: "Livermore", slug: "livermore", region: "Tri-Valley", serviceGuidance: "An Exterior Detail is appropriate when the goal is a cleaner, glossier exterior, while a Full Detail adds complete interior care. Paint correction addresses visible swirl marks, light scratches, oxidation, water spots, and dullness through machine polishing after the surface is evaluated. Ceramic coating is for longer-term paint protection and easier maintenance; discuss it after deciding whether the paint needs correction first.", serviceHighlights: [serviceSlugs.exterior, serviceSlugs.full, serviceSlugs.paintCorrection, serviceSlugs.ceramic], relatedCitySlugs: ["pleasanton", "dublin", "walnut-creek"] },
	{ name: "Palo Alto", slug: "palo-alto", region: "Peninsula", serviceGuidance: "Consider ceramic coating when you want a protection-focused paint finish with enhanced gloss and easier maintenance. If paint has swirl marks, light scratches, oxidation, water spots, or dullness, ask whether paint correction should be evaluated before coating. Choose an Interior Detail for cabin care, or a Full Detail when both the interior and exterior need attention in the same service.", serviceHighlights: [serviceSlugs.ceramic, serviceSlugs.paintCorrection, serviceSlugs.interior, serviceSlugs.full], relatedCitySlugs: ["san-mateo", "san-jose", "san-francisco"] },
	{ name: "San Jose", slug: "san-jose", region: "South Bay", serviceGuidance: "Select an Interior Detail for complete vacuuming, shampooing, surface cleaning, and conditioning, or an Exterior Detail for a clean and polished presentation outside. A Full Detail is the combined option when both areas need work. Ceramic coating is suited to a protection-focused paint plan that emphasizes gloss and easier regular maintenance, following a discussion of the paint’s condition and desired result.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.exterior, serviceSlugs.full, serviceSlugs.ceramic], relatedCitySlugs: ["fremont", "palo-alto", "san-mateo"] },
	{ name: "San Mateo", slug: "san-mateo", region: "Peninsula", serviceGuidance: "Choose an Interior Detail for a refreshed cabin or an Exterior Detail for paint, wheel, tire, glass, and trim care; a Full Detail addresses both sides together. When headlights are cloudy, yellowed, or oxidized, headlight restoration is the focused service for recovering lens clarity and improving light output. That lens work answers a different condition than a general interior or exterior detail.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.exterior, serviceSlugs.full, serviceSlugs.headlightRestoration], relatedCitySlugs: ["palo-alto", "san-francisco", "san-jose"] },
	{ name: "Pleasanton", slug: "pleasanton", region: "Tri-Valley", serviceGuidance: "A Full Detail is useful when the vehicle needs comprehensive interior and exterior care, while an Interior Detail focuses on cabin surfaces, carpets, mats, and glass. For a paint-focused plan, correction can reduce swirl marks, light scratches, oxidation, water spots, and dullness after an evaluation. Ceramic coating is the longer-term protection option to consider once the desired paint condition and finish are clear.", serviceHighlights: [serviceSlugs.full, serviceSlugs.interior, serviceSlugs.ceramic, serviceSlugs.paintCorrection], relatedCitySlugs: ["dublin", "livermore", "walnut-creek"] },
	{ name: "Union City", slug: "union-city", region: "East Bay", serviceGuidance: "Choose a Full Detail for combined interior and exterior care, or select an Interior Detail or Exterior Detail when the goal is limited to one part of the vehicle. If normal washing leaves the paint feeling rough, clay bar decontamination removes bonded contaminants that a standard wash cannot. It is a preparation step for a smoother surface before considering polishing, sealants, or ceramic coating.", serviceHighlights: [serviceSlugs.full, serviceSlugs.interior, serviceSlugs.exterior, serviceSlugs.clayBar], relatedCitySlugs: ["fremont", "hayward", "castro-valley"] },
	{ name: "San Leandro", slug: "san-leandro", region: "East Bay", serviceGuidance: "An Interior Detail is the focused option for cabin cleaning, shampooing, trim, windows, and conditioning; a Full Detail adds exterior paint, wheel, tire, glass, and trim care. Headlight restoration is appropriate for cloudy or oxidized lenses when clarity and light output need attention. Choose an Exterior Detail instead when the vehicle’s interior is already in good shape and the desired outcome is a cleaner exterior presentation.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.full, serviceSlugs.headlightRestoration, serviceSlugs.exterior], relatedCitySlugs: ["hayward", "oakland", "alameda"] },
	{ name: "Dublin", slug: "dublin", region: "Tri-Valley", serviceGuidance: "Use a Full Detail for a complete interior-and-exterior refresh, or an Interior Detail for cabin cleaning and conditioning without exterior work. Paint correction is the specialized route for reducing swirl marks, light scratches, oxidation, water spots, and dullness, with results based on the surface evaluation. Ceramic coating can follow a paint-focused plan when longer-term protection, gloss, and easier maintenance are the priorities.", serviceHighlights: [serviceSlugs.full, serviceSlugs.interior, serviceSlugs.paintCorrection, serviceSlugs.ceramic], relatedCitySlugs: ["pleasanton", "livermore", "walnut-creek"] },
	{ name: "Castro Valley", slug: "castro-valley", region: "East Bay", serviceGuidance: "Choose seat and upholstery deep cleaning for cloth seats, carpets, mats, or fabric upholstery with embedded dirt, spills, odors, heavy buildup, or visible staining. An Interior Detail is the broader cabin-care option, while a Full Detail includes both interior and exterior work. Select an Exterior Detail when the desired improvement is limited to the vehicle’s paint, wheels, tires, glass, and trim.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.seatCleaning, serviceSlugs.full, serviceSlugs.exterior], relatedCitySlugs: ["hayward", "san-leandro", "union-city"] },
	{ name: "San Francisco", slug: "san-francisco", region: "San Francisco", serviceGuidance: "Start with an Interior Detail for a cleaner, conditioned cabin, or choose a Full Detail when the exterior also needs a complete refresh. Paint correction is for improving the appearance of swirl marks, light scratches, oxidation, water spots, and dullness through polishing after the paint is evaluated. Ceramic coating is a separate protection option for maintaining gloss and simplifying regular paint care after the desired finish is discussed.", serviceHighlights: [serviceSlugs.interior, serviceSlugs.full, serviceSlugs.paintCorrection, serviceSlugs.ceramic], relatedCitySlugs: ["san-mateo", "palo-alto", "oakland"] },
];

export const priorityServiceAreaCities: ServiceAreaCity[] = cityDefinitions.map((city) => ({
	...city,
	metaTitle: `Mobile Auto Detailing in ${city.name}`,
	metaDescription: `Mobile auto detailing in ${city.name} from Duartes Auto Detailing. Explore interior, exterior, full detailing, correction, and coating service options.`,
	heroDescription: `Mobile auto detailing service available in ${city.name} for appointments at a home, office, or private garage with safe vehicle access.`,
	intro: `Duartes Auto Detailing offers mobile auto detailing appointments in ${city.name} as part of its ${city.region} service area. Service is available when the vehicle can be accessed safely at a suitable appointment location.`,
	customerAngle: `This page features ${city.serviceHighlights.map((slug) => serviceNames[slug]).join(", ")}. Share your vehicle condition, service goals, and appointment access details so availability and a suitable service option can be confirmed.`,
	faqs: createCityFaqs(city.name, city.serviceGuidance),
}));

export const additionalServiceAreaCityNames = [] as const;

export const serviceAreaHub = {
	name: "Bay Area",
	slug: "bay-area",
	metaTitle: "Bay Area Mobile Auto Detailing Service Area",
	metaDescription:
		"Explore Bay Area mobile auto detailing service pages for San Jose, San Francisco, Oakland, Fremont, Alameda, Hayward, Berkeley, Walnut Creek, and more.",
	heroDescription:
		"Mobile auto detailing across the Bay Area, with city guides for drivers looking for professional interior, exterior, protection, and correction services.",
};

export const getServiceAreaCityBySlug = (slug: string) =>
	priorityServiceAreaCities.find((city) => city.slug === slug);
