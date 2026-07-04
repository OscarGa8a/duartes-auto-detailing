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
	serviceHighlights: string[];
	faqs: ServiceAreaFaq[];
}

const coreServicesDescription =
	"Core services include interior detailing, exterior detailing, full detailing, paint correction, ceramic coating, seat and upholstery deep cleaning, headlight restoration, and clay bar decontamination.";

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

const createCityFaqs = (cityName: string): ServiceAreaFaq[] => [
	{
		question: `Does Duartes Auto Detailing come to me in ${cityName}?`,
		answer: `Yes. Duartes Auto Detailing is a mobile service for Bay Area drivers, so appointments in ${cityName} can be handled at a home, office, or private garage when there is safe access to the vehicle.`,
	},
	{
		question: `Which detailing services are available in ${cityName}?`,
		answer: coreServicesDescription,
	},
	{
		question: `How should I prepare for a mobile detailing appointment in ${cityName}?`,
		answer:
			"Please choose a safe parking area with enough room around the vehicle, remove personal belongings when possible, and share any parking or access details before the appointment.",
	},
];

export const priorityServiceAreaCities: ServiceAreaCity[] = [
	{
		name: "Walnut",
		slug: "walnut",
		region: "Bay Area",
		metaTitle: "Mobile Auto Detailing in Walnut",
		metaDescription:
			"Mobile auto detailing in Walnut with Duartes Auto Detailing. Book interior, exterior, full detail, paint correction, and ceramic coating options.",
		heroDescription:
			"Mobile auto detailing for Walnut drivers who want professional vehicle care brought to a suitable home, office, or private garage location.",
		intro:
			"Walnut customers may need flexible vehicle care that works around commuting, family schedules, and limited time for a shop visit. Duartes Auto Detailing helps make interior cleaning, exterior maintenance, and protection-focused detailing easier to schedule on-site.",
		customerAngle:
			"This page is intentionally written for the current service-city name. If the client later confirms Walnut Creek instead, the city label, slug, and route can be updated without changing the overall service-area structure.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.exterior,
			serviceSlugs.full,
			serviceSlugs.ceramic,
		],
		faqs: createCityFaqs("Walnut"),
	},
	{
		name: "Alameda",
		slug: "alameda",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Alameda",
		metaDescription:
			"Book mobile auto detailing in Alameda with Duartes Auto Detailing for interior cleaning, exterior detailing, full details, paint correction, and ceramic coating.",
		heroDescription:
			"Convenient mobile detailing for Alameda drivers who want professional care without leaving their home, office, or private garage setup.",
		intro:
			"Alameda vehicles often balance daily commuting, shoreline exposure, family use, and weekend driving across the East Bay. Duartes Auto Detailing brings mobile service to suitable locations so the vehicle can be cleaned and protected without adding another stop to the day.",
		customerAngle:
			"The service is a strong fit for maintenance details, interior refreshes, and exterior work that helps remove regular road film while improving gloss and presentation.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.exterior,
			serviceSlugs.full,
			serviceSlugs.clayBar,
		],
		faqs: createCityFaqs("Alameda"),
	},
	{
		name: "Fremont",
		slug: "fremont",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Fremont",
		metaDescription:
			"Duartes Auto Detailing serves Fremont with mobile auto detailing, exterior detailing, full details, paint correction, and ceramic coating services.",
		heroDescription:
			"Mobile auto detailing in Fremont for drivers who want professional vehicle care at home, work, or a private garage.",
		intro:
			"Fremont drivers often rely on their vehicles for commuting, school schedules, errands, and weekend travel. Mobile detailing helps keep the vehicle clean and protected without adding another stop to the calendar.",
		customerAngle:
			"Duartes Auto Detailing can help with maintenance details for regular-use vehicles, deeper interior refreshes, and exterior services that improve gloss and presentation.",
		serviceHighlights: [
			serviceSlugs.exterior,
			serviceSlugs.full,
			serviceSlugs.clayBar,
			serviceSlugs.paintCorrection,
		],
		faqs: createCityFaqs("Fremont"),
	},
	{
		name: "Hayward",
		slug: "hayward",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Hayward",
		metaDescription:
			"Schedule mobile auto detailing in Hayward for interior detailing, exterior detailing, full details, seat cleaning, paint correction, and ceramic coating.",
		heroDescription:
			"Professional mobile auto detailing for Hayward drivers who need reliable interior cleanup, exterior refreshes, and on-site convenience.",
		intro:
			"Hayward drivers move between East Bay commutes, family routines, work vehicles, and weekend travel. Duartes Auto Detailing helps keep vehicles presentable and comfortable with mobile detailing at a suitable service location.",
		customerAngle:
			"This city page is useful for daily drivers, family SUVs, and vehicles that need practical interior recovery or a clean exterior finish without arranging a shop drop-off.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.full,
			serviceSlugs.seatCleaning,
			serviceSlugs.exterior,
		],
		faqs: createCityFaqs("Hayward"),
	},
	{
		name: "Oakland",
		slug: "oakland",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Oakland",
		metaDescription:
			"Schedule mobile auto detailing in Oakland with Duartes Auto Detailing. Interior, exterior, full detail, paint correction, and ceramic coating options available.",
		heroDescription:
			"Professional mobile auto detailing for Oakland drivers who want cleaner interiors, glossier exteriors, and convenient on-site service.",
		intro:
			"Oakland drivers use their vehicles for work, family routines, commuting, and weekend plans. Duartes Auto Detailing brings a detail-focused mobile service to homes, offices, and private garages when the setup is safe for the vehicle and crew.",
		customerAngle:
			"The service is useful for restoring daily-use interiors, refreshing exterior presentation, or preparing a vehicle for a cleaner, more protected finish.",
		serviceHighlights: [
			serviceSlugs.full,
			serviceSlugs.interior,
			serviceSlugs.exterior,
			serviceSlugs.seatCleaning,
		],
		faqs: createCityFaqs("Oakland"),
	},
	{
		name: "Berkeley",
		slug: "berkeley",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Berkeley",
		metaDescription:
			"Mobile auto detailing in Berkeley for interior cleaning, exterior details, full details, paint correction, and ceramic coating by Duartes Auto Detailing.",
		heroDescription:
			"Mobile detailing for Berkeley drivers who want a cleaner vehicle while avoiding the logistics of a traditional shop visit.",
		intro:
			"Berkeley vehicles can see a mix of city parking, campus-area driving, errands, and regular East Bay commuting. Duartes Auto Detailing offers mobile service for customers who have safe access and enough room for professional vehicle care on-site.",
		customerAngle:
			"Appointments are especially practical for interior cleanup, exterior maintenance, and vehicles that need a better finish before a busy week of local driving.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.exterior,
			serviceSlugs.full,
			serviceSlugs.paintCorrection,
		],
		faqs: createCityFaqs("Berkeley"),
	},
	{
		name: "Richmond",
		slug: "richmond",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Richmond",
		metaDescription:
			"Book mobile auto detailing in Richmond with Duartes Auto Detailing for interior, exterior, full detail, headlight restoration, and paint correction services.",
		heroDescription:
			"On-site mobile auto detailing for Richmond drivers who need dependable cleaning, restoration, and protection options.",
		intro:
			"Richmond drivers often deal with daily-use interiors, road grime, and vehicles that need both comfort and exterior presentation. Duartes Auto Detailing brings mobile care to suitable homes, offices, and private garages when access is safe.",
		customerAngle:
			"The service can help with practical cleanup, improved visibility through headlight restoration, and exterior detailing that supports a cleaner, more polished vehicle.",
		serviceHighlights: [
			serviceSlugs.full,
			serviceSlugs.interior,
			serviceSlugs.headlightRestoration,
			serviceSlugs.exterior,
		],
		faqs: createCityFaqs("Richmond"),
	},
	{
		name: "Livermore",
		slug: "livermore",
		region: "Tri-Valley",
		metaTitle: "Mobile Auto Detailing in Livermore",
		metaDescription:
			"Duartes Auto Detailing offers mobile auto detailing in Livermore, including exterior detailing, full details, paint correction, ceramic coating, and interior care.",
		heroDescription:
			"Mobile detailing for Livermore drivers who want professional care at a convenient home, office, or private garage location.",
		intro:
			"Livermore vehicles often cover longer commutes, family routes, and weekend drives through the Tri-Valley. Mobile detailing helps customers maintain a cleaner cabin and better exterior finish without setting aside time for a shop appointment.",
		customerAngle:
			"This page focuses on drivers who want exterior gloss, interior comfort, and protection-oriented services such as paint correction planning or ceramic coating.",
		serviceHighlights: [
			serviceSlugs.exterior,
			serviceSlugs.full,
			serviceSlugs.paintCorrection,
			serviceSlugs.ceramic,
		],
		faqs: createCityFaqs("Livermore"),
	},
	{
		name: "Palo Alto",
		slug: "palo-alto",
		region: "Peninsula",
		metaTitle: "Mobile Auto Detailing in Palo Alto",
		metaDescription:
			"Book mobile auto detailing in Palo Alto with Duartes Auto Detailing for interior, exterior, full detail, paint correction, and ceramic coating services.",
		heroDescription:
			"Premium mobile detailing for Palo Alto drivers who want a cleaner, better-maintained vehicle without a shop visit.",
		intro:
			"Palo Alto customers often need vehicle care that works around a packed day. Duartes Auto Detailing provides mobile service for drivers who want professional interior and exterior care at a suitable home, office, or private garage location.",
		customerAngle:
			"This is especially helpful for workday appointments, household vehicles, and drivers who want higher-finish services such as paint correction or ceramic coating planning.",
		serviceHighlights: [
			serviceSlugs.ceramic,
			serviceSlugs.paintCorrection,
			serviceSlugs.interior,
			serviceSlugs.full,
		],
		faqs: createCityFaqs("Palo Alto"),
	},
	{
		name: "San Jose",
		slug: "san-jose",
		region: "South Bay",
		metaTitle: "Mobile Auto Detailing in San Jose",
		metaDescription:
			"Book mobile auto detailing in San Jose with Duartes Auto Detailing. Interior, exterior, full detail, paint correction, and ceramic coating service options.",
		heroDescription:
			"Premium mobile auto detailing for San Jose drivers who want professional care brought to their driveway, office parking, or private garage.",
		intro:
			"San Jose drivers deal with daily commuting, busy schedules, and vehicles that often need both comfort and presentation. Duartes Auto Detailing brings mobile detailing directly to you so you can care for your vehicle without rearranging the whole day.",
		customerAngle:
			"This is a practical fit for commuters, family vehicles, and multi-car households that need dependable interior cleanup, exterior maintenance, or deeper paint-focused services without a shop drop-off.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.exterior,
			serviceSlugs.full,
			serviceSlugs.ceramic,
		],
		faqs: createCityFaqs("San Jose"),
	},
	{
		name: "San Mateo",
		slug: "san-mateo",
		region: "Peninsula",
		metaTitle: "Mobile Auto Detailing in San Mateo",
		metaDescription:
			"Mobile auto detailing in San Mateo by Duartes Auto Detailing. Choose interior detailing, exterior detailing, full details, paint correction, and ceramic coating.",
		heroDescription:
			"Convenient mobile detailing for San Mateo drivers who want clean interiors, polished exteriors, and professional care brought to them.",
		intro:
			"San Mateo drivers balance commuting, family schedules, and regular vehicle use across the Peninsula and Bay Area. Duartes Auto Detailing makes it easier to keep a vehicle clean and protected with mobile service at a suitable location.",
		customerAngle:
			"The service is a practical choice for maintenance details, deeper interior cleaning, exterior refreshes, and protection-focused appointments.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.exterior,
			serviceSlugs.full,
			serviceSlugs.headlightRestoration,
		],
		faqs: createCityFaqs("San Mateo"),
	},
	{
		name: "Pleasanton",
		slug: "pleasanton",
		region: "Tri-Valley",
		metaTitle: "Mobile Auto Detailing in Pleasanton",
		metaDescription:
			"Schedule mobile auto detailing in Pleasanton for interior detailing, exterior detailing, full details, ceramic coating, and paint correction services.",
		heroDescription:
			"Mobile detailing for Pleasanton drivers who want polished, comfortable vehicles cared for at a suitable on-site location.",
		intro:
			"Pleasanton drivers often want vehicle care that fits around work, school, commuting, and weekend plans. Duartes Auto Detailing brings mobile service to suitable locations so customers can maintain a clean, protected vehicle without a shop visit.",
		customerAngle:
			"This is a helpful fit for family vehicles, commuter cars, and owners who want a premium exterior finish or interior reset before a busy week.",
		serviceHighlights: [
			serviceSlugs.full,
			serviceSlugs.interior,
			serviceSlugs.ceramic,
			serviceSlugs.paintCorrection,
		],
		faqs: createCityFaqs("Pleasanton"),
	},
	{
		name: "Union City",
		slug: "union-city",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Union City",
		metaDescription:
			"Book mobile auto detailing in Union City with Duartes Auto Detailing for full details, interior cleaning, exterior detailing, and paint protection options.",
		heroDescription:
			"On-site auto detailing for Union City drivers who want cleaner interiors, refreshed exteriors, and service that fits their schedule.",
		intro:
			"Union City vehicles often serve commuting, school routes, shopping trips, and weekend travel across the East Bay. Duartes Auto Detailing provides mobile care for customers with safe parking access and room to work around the vehicle.",
		customerAngle:
			"The service is designed for drivers who need practical cleanup, better exterior presentation, or a more complete detail before upcoming travel or daily use.",
		serviceHighlights: [
			serviceSlugs.full,
			serviceSlugs.interior,
			serviceSlugs.exterior,
			serviceSlugs.clayBar,
		],
		faqs: createCityFaqs("Union City"),
	},
	{
		name: "San Leandro",
		slug: "san-leandro",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in San Leandro",
		metaDescription:
			"Mobile auto detailing in San Leandro for interior detailing, exterior detailing, full details, seat cleaning, headlight restoration, and paint correction.",
		heroDescription:
			"Professional mobile detailing for San Leandro drivers who want convenient on-site vehicle care and a cleaner finish.",
		intro:
			"San Leandro drivers use their vehicles for East Bay commutes, family errands, work needs, and weekend plans. Mobile detailing helps restore comfort and presentation without requiring a separate trip to a detailing shop.",
		customerAngle:
			"This location page is especially relevant for interior resets, full details, headlight restoration, and exterior services that make a daily driver feel easier to maintain.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.full,
			serviceSlugs.headlightRestoration,
			serviceSlugs.exterior,
		],
		faqs: createCityFaqs("San Leandro"),
	},
	{
		name: "Dublin",
		slug: "dublin",
		region: "Tri-Valley",
		metaTitle: "Mobile Auto Detailing in Dublin",
		metaDescription:
			"Duartes Auto Detailing serves Dublin with mobile auto detailing, full details, interior cleaning, exterior detailing, paint correction, and ceramic coating.",
		heroDescription:
			"Mobile detailing in Dublin for drivers who want professional vehicle care at home, work, or another suitable private location.",
		intro:
			"Dublin customers often need clean, comfortable vehicles for commuting, family schedules, and regular travel around the Tri-Valley. Duartes Auto Detailing brings mobile service to suitable locations so professional care is easier to plan.",
		customerAngle:
			"The service can support maintenance details, deeper interior cleaning, and finish-focused work for owners who want a cleaner look and longer-lasting protection.",
		serviceHighlights: [
			serviceSlugs.full,
			serviceSlugs.interior,
			serviceSlugs.paintCorrection,
			serviceSlugs.ceramic,
		],
		faqs: createCityFaqs("Dublin"),
	},
	{
		name: "Castro Valley",
		slug: "castro-valley",
		region: "East Bay",
		metaTitle: "Mobile Auto Detailing in Castro Valley",
		metaDescription:
			"Book mobile auto detailing in Castro Valley for interior detailing, exterior detailing, full details, seat cleaning, ceramic coating, and paint correction.",
		heroDescription:
			"Convenient mobile detailing for Castro Valley drivers who want professional vehicle care brought to a suitable appointment location.",
		intro:
			"Castro Valley vehicles often handle family driving, East Bay commutes, outdoor plans, and regular errands. Duartes Auto Detailing helps customers keep cabins cleaner and exterior finishes better maintained through mobile service.",
		customerAngle:
			"This page is a practical match for family SUVs, commuter cars, and vehicles that need deeper interior cleaning or a more polished exterior appearance.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.seatCleaning,
			serviceSlugs.full,
			serviceSlugs.exterior,
		],
		faqs: createCityFaqs("Castro Valley"),
	},
	{
		name: "San Francisco",
		slug: "san-francisco",
		region: "San Francisco",
		metaTitle: "Mobile Auto Detailing in San Francisco",
		metaDescription:
			"Mobile auto detailing in San Francisco for interior cleaning, exterior detailing, full details, paint correction, and ceramic coating by Duartes Auto Detailing.",
		heroDescription:
			"Mobile detailing for San Francisco drivers who want a cleaner vehicle without giving up time to drive across the city for service.",
		intro:
			"San Francisco vehicles can pick up city dust, interior wear, and exterior grime quickly. Duartes Auto Detailing helps drivers schedule mobile service where safe vehicle access is available, making professional detailing easier to fit into the week.",
		customerAngle:
			"Appointments work best when there is suitable parking and room to work around the vehicle, such as a driveway, private garage, or approved office parking area.",
		serviceHighlights: [
			serviceSlugs.interior,
			serviceSlugs.full,
			serviceSlugs.paintCorrection,
			serviceSlugs.ceramic,
		],
		faqs: createCityFaqs("San Francisco"),
	},
];

export const additionalServiceAreaCityNames = [] as const;

export const serviceAreaHub = {
	name: "Bay Area",
	slug: "bay-area",
	metaTitle: "Bay Area Mobile Auto Detailing Service Area",
	metaDescription:
		"Explore Bay Area mobile auto detailing service pages for San Jose, San Francisco, Oakland, Fremont, Alameda, Hayward, Berkeley, Walnut, and more.",
	heroDescription:
		"Mobile auto detailing across the Bay Area, with city guides for drivers looking for professional interior, exterior, protection, and correction services.",
};

export const getServiceAreaCityBySlug = (slug: string) =>
	priorityServiceAreaCities.find((city) => city.slug === slug);
