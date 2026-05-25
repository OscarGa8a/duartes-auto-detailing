export type ServiceVideoSourceType = "hls" | "dash" | "mp4";

export interface ServiceCloudinaryVideo {
  provider: "cloudinary";
  publicId: string;
  poster?: string;
  sourceTypes?: ServiceVideoSourceType[];
  streamingProfile?: string;
}

export interface ServiceExternalVideo {
  provider: "youtube" | "vimeo";
  embedUrl: string;
}

export type ServiceVideo = ServiceCloudinaryVideo | ServiceExternalVideo;

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  ctaLine?: string;
  images: string[];
  video?: ServiceVideo;
  relatedSlugs: string[];
  ogImage?: string;
}

export const services: Service[] = [
  {
    slug: "interior-detailing",
    name: " Deep Interior Cleaning & Protection",
    tagline:
      "Detailed interior care focused on cleanliness, comfort, and presentation.",
    description:
      "This service is crafted to elevate your vehicle’s interior to a refined, like-new condition. At Duartes Auto Detailing, we deliver a meticulous and detail-driven experience, carefully enhancing every surface to achieve a clean, refreshed, and sophisticated finish that you can see and feel.",
    includes: [
      "Complete interior vacuuming",
      "Interior shampooing",
      "Cleaning of dashboard, console, cup holders, plastic, vinyl, and trim",
      "Carpet and floor mat deep cleaning",
      "Regular seat cleaning and conditioning",
      "Interior window cleaning",
      "Door panel cleaning",
      "Trunk cleaning",
      "UV protection for leather, plastic, and vinyl surfaces",
    ],
    ctaLine: "A fresh, clean, and protected interior.",
    images: [
      "IMG_0196_f8byb2",
      "IMG_0194_stxrfj",
      "IMG_2258_nxstpg",
      "IMG_0199_xqyyag",
      "IMG_0200_i0rldc",
      "IMG_2411_wyxi4f",
      "IMG_5293_imiqql",
      "IMG_5357_ly6k2l",
      "IMG_7624_rmbqgc",
      "IMG_7975_lgdo9c",
    ],
    relatedSlugs: [
      "seat-upholstery-deep-cleaning",
      "full-detailing",
      "exterior-detailing",
    ],
  },
  {
    slug: "exterior-detailing",
    name: "Exterior Wash, Shine & Protection",
    tagline:
      "A refined exterior cleaning process that enhances gloss and presentation.",
    description:
      "Our exterior detailing service goes beyond a standard wash. We carefully clean the paint, wheels, tires, glass, trims, and exterior surfaces to remove road grime, dust, residue, and surface contamination. The goal is to restore a cleaner, glossier, and more refined finish while improving the overall presentation of the vehicle.",
    includes: [
      "Complete exterior wash",
      "Wheel cleaning and detailing",
      "Tire cleaning and dressing",
      "Window cleaning",
      "Door frame cleaning",
      "Tar and tree sap removal",
      "Bug and insect removal",
      "Black trim restoration and maintenance",
      "Liquid wax application",
      "Hand polishing",
    ],
    ctaLine: "A clean, glossy, and protected exterior.",
    images: [
      "IMG_9272_wu3eq7",
      "IMG_9299_rghmqg",
      "IMG_9192_t0xuly",
      "IMG_9133_gr5ub4",
      "IMG_9140_bwwvp5",
      "IMG_7610_jplpkh",
      "IMG_7598_x2scgn",
      "IMG_1084_l1uaqv",
      "IMG_1121_ed3apg",
      "IMG_5748_gbvxin",
    ],
    relatedSlugs: [
      "full-detailing",
      "clay-bar-decontamination",
      "paint-correction-machine-polishing",
    ],
  },
  {
    slug: "paint-correction-machine-polishing",
    name: "Paint Correction & Machine Polishing",
    tagline:
      "Professional polishing designed to improve gloss, depth, and clarity.",
    description:
      "Paint correction is a specialized service focused on reducing swirl marks, light scratches, oxidation, water spots, and dullness in the paint. Through a careful machine polishing process, we improve the overall finish and restore a deeper, glossier, more refined appearance. Each vehicle is evaluated individually, since paint condition and expected results vary depending on the age and condition of the surface.",
    includes: [
      "Wash and decontamination",
      "Clay bar treatment (if needed)",
      "Paint inspection",
      "Machine polishing",
      "Gloss refinement",
      "Paint protection",
    ],
    ctaLine: "A glossier, clearer, and more refined finish.",
    images: [
      "IMG_0210_ggwamm",
      "IMG_0289_krxzdf",
      "IMG_0291_yvzjby",
      "IMG_0209_hycnyn",
      "IMG_1599_wamkc8",
      "IMG_0191_efrwqx",
      "IMG_0211_g1gqh4",
      "IMG_0207_tscbht",
    ],
    relatedSlugs: [
      "ceramic-coating",
      "clay-bar-decontamination",
      "full-detailing",
    ],
  },
  {
    slug: "ceramic-coating",
    name: "Ceramic Coating",
    tagline:
      "Long-term paint protection with enhanced gloss and easier maintenance.",
    description:
      "Our ceramic coating service is designed for clients who want a higher level of protection and a more premium finish for their vehicle. This advanced coating helps protect the paint against UV exposure, water, dirt, contamination, and everyday wear while enhancing gloss and making regular maintenance easier. It is an excellent option for preserving the appearance and value of your vehicle over time.",
    includes: [
      "Thorough wash and decontamination",
      "Clay bar treatment (if needed)",
      "Paint correction or polishing (optional)",
      "Surface prep and alcohol wipe",
      "Ceramic coating application",
      "Curing process and aftercare instructions",
    ],
    ctaLine:
      "Long-lasting gloss, easier maintenance, and durable paint protection.",
    images: [
      "img1_siyt5x",
      "img2_svymdx",
      "img3_dmp4b4",
      "img4_lrr5x5",
      "img5_i0j1fd",
      "img6_aseept",
      "img7_liqxjl",
      "img8_luchis",
      "img9_gjggsb",
      "img10_q33caw",
      "img11_x2yhwx",
    ],
    relatedSlugs: [
      "paint-correction-machine-polishing",
      "clay-bar-decontamination",
      "full-detailing",
    ],
  },
  {
    slug: "full-detailing",
    name: "Complete Interior & Exterior Detailing",
    tagline:
      "Comprehensive interior and exterior detailing in one complete service.",
    description:
      "Our Full Detail service combines both interior and exterior detailing for clients who want a more complete transformation of their vehicle. This is one of the best options for vehicles that need a full refresh in appearance, cleanliness, and presentation. It is ideal for regular maintenance, vehicle recovery, or preparing a car to look its absolute best.",
    includes: [
      "Complete interior vacuuming",
      "Interior shampooing",
      "Cleaning of plastic, vinyl, and trim",
      "Console, dashboard & cup holder cleaning",
      "Rubber or carpet floor mat cleaning",
      "Carpet deep cleaning",
      "Regular seat cleaning and conditioning",
      "Interior and exterior window cleaning",
      "Door panel and door frame cleaning",
      "Trunk cleaning",
      "UV protection for leather, plastic, and vinyl surfaces",
      "Complete exterior wash",
      "Wheel cleaning and detailing",
      "Tire cleaning and dressing",
      "Tar and tree sap removal",
      "Bug and insect removal",
      "Black trim restoration and maintenance",
      "Liquid wax application",
      "Hand polishing",
    ],
    ctaLine:
      "A fully refreshed, clean, glossy, and protected vehicle inside and out.",
    images: [
      "IMG_0194_stxrfj",
      "IMG_0199_xqyyag",
      "IMG_0200_i0rldc",
      "IMG_2411_wyxi4f",
      "IMG_5293_imiqql",
      "IMG_5357_ly6k2l",
      "IMG_9272_wu3eq7",
      "IMG_9299_rghmqg",
      "IMG_9133_gr5ub4",
      "IMG_9140_bwwvp5",
      "IMG_7610_jplpkh",
      "IMG_7598_x2scgn",
    ],
    relatedSlugs: [
      "ceramic-coating",
      "paint-correction-machine-polishing",
      "interior-detailing",
    ],
  },
  {
    slug: "seat-upholstery-deep-cleaning",
    name: "Seat & Upholstery Deep Cleaning",
    tagline: "Deep interior fabric restoration for a cleaner, fresher cabin.",
    description:
      "Our deep cleaning service is designed for cloth seats, carpets, mats, and fabric upholstery that require more than a regular surface cleaning. We use specialized products, controlled agitation, stain treatment, and extraction methods to remove embedded dirt, spills, odors, and heavy buildup. This service is ideal for vehicles with visible staining, daily-use buildup, or interiors that need a more complete reset.",
    includes: [
      "Steam treatment",
      "Special 3-step fabric treatment",
      "Deep shampoo cleaning",
      "Injection / extraction cleaning process",
      "Deep cleaning of cloth seats and upholstery",
      "Stain treatment",
      "Odor reduction treatment",
      "Spot cleaning of surrounding fabric areas",
    ],
    ctaLine:
      "Deep-cleaned seats and upholstery with a fresher, restored appearance.",
    images: [
      "IMG_0301_fkzxyp",
      "8FF6D4A3-867D-4031-8508-77B3CD499512_b6lmca",
      "IMG_0308_evlthj",
      "IMG_0307_wqp0hg",
      "IMG_0305_lfofvc",
      "IMG_0304_tw76dq",
      "IMG_0303_dqezvd",
      "IMG_0302_dytoyh",
      "IMG_0300_sjhemq",
      "IMG_2411_kbwu2a",
    ],
    relatedSlugs: [
      "interior-detailing",
      "full-detailing",
      "exterior-detailing",
    ],
  },
  {
    slug: "headlight-restoration",
    name: "Headlight Restoration",
    tagline:
      "Restore clarity, improve appearance, and enhance nighttime visibility.",
    description:
      "Oxidized, yellowed, or cloudy headlights can make a vehicle look aged and reduce light output at night. Our headlight restoration service is designed to recover clarity and improve the overall appearance of the lenses through a specialized restoration process. This service helps the vehicle look cleaner and more maintained while also improving visibility and safety.",
    includes: [
      "Headlight wash and cleaning",
      "Sanding process",
      "Machine polishing",
      "3-year ceramic coating application",
    ],
    ctaLine: "Clearer, shinier, and longer-lasting protected headlights.",
    images: [
      "IMG_0754_nnktvz",
      "IMG_0416_mjiqby",
      "IMG_0397_vet8ae",
      "IMG_0400_n3ebop",
      "IMG_0420_fr9w2n",
      "IMG_1331_o8xqvz",
      "IMG_1189_anqkyc",
      "IMG_5517_gafvm5",
      "IMG_5940_sieiyo",
      "IMG_5516_h8nmyg",
    ],
    relatedSlugs: [
      "exterior-detailing",
      "paint-correction-machine-polishing",
      "full-detailing",
    ],
  },
  {
    slug: "clay-bar-decontamination",
    name: "Clay Bar Decontamination",
    tagline: "Paint decontamination that removes what a regular wash cannot.",
    description:
      "Over time, your vehicle’s paint collects embedded contamination that cannot be removed through normal washing alone. Our clay bar treatment safely removes bonded contaminants such as industrial fallout, overspray, tree sap residue, environmental buildup, and rough surface particles. This process leaves the paint noticeably smoother and properly prepared for polishing, sealants, or ceramic coating.",
    includes: [
      "Exterior wash",
      "Chemical decontamination",
      "Clay bar decontamination",
      "Excess residue removal and final wipe-down",
    ],
    ctaLine: "A smoother, cleaner, and better-prepared paint surface.",
    images: [
      "IMG_0248_uvmyw9",
      "IMG_0292_uwh5kh",
      "IMG_0249_qdufhl",
      "IMG_0247_py8wf5",
      "IMG_02452_ilqwnb",
      "IMG_02450_tbeqhv",
      "IMG_0251_bnyi71",
    ],
    relatedSlugs: [
      "paint-correction-machine-polishing",
      "ceramic-coating",
      "exterior-detailing",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug)!)
    .filter(Boolean);
}
