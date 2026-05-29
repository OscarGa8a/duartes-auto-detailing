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
    name: " Interior Detail",
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
      "img1_ispma9",
      "img2_ookzsp",
      "img3_csigvj",
      "img4_xasf2c",
      "img5_tv3uzo",
      "img6_gvcdqc",
      "img7_s9neum",
      "img8_f7ox14",
      "img9_bpbekr",
      "img10_e48ekd",
      "img11_p75ld9",
      "img12_a2wseq",
      "img13_gmploj",
      "img14_sptysx",
    ],
    relatedSlugs: [
      "seat-upholstery-deep-cleaning",
      "full-detailing",
      "exterior-detailing",
    ],
  },
  {
    slug: "exterior-detailing",
    name: "Exterior Detail",
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
      "img1_wmvogj",
      "img2_eccp8b",
      "img3_oxjm4i",
      "img4_gjkdq1",
      "img5_dc35b7",
      "img6_zhmuto",
      "img7_wgph9a",
      "img8_szsrt0",
      "img9_lbzhzc",
      "img10_nbt3it",
      "img11_bwhpu3",
      "img12_pa3hjn",
      "img13_st6jh3",
      "img14_zkjwix",
      "img15_hj5efc",
    ],
    relatedSlugs: [
      "full-detailing",
      "clay-bar-decontamination",
      "paint-correction",
    ],
  },
  {
    slug: "paint-correction",
    name: "Paint Correction",
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
      "img1_f4fxuu",
      "img2_fhmtbk",
      "img3_p1krqu",
      "img4_guyhng",
      "img5_gkhifb",
      "img6_ecxbhf",
      "img7_hppq9v",
      "img8_klfemg",
      "img9_dl0tpo",
      "img10_o50etz",
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
      "img6_aseept",
      "img2_svymdx",
      "img3_dmp4b4",
      "img4_lrr5x5",
      "img5_i0j1fd",
      "img7_liqxjl",
      "img8_luchis",
      "img9_gjggsb",
      "img10_q33caw",
      "img11_x2yhwx",
    ],
    relatedSlugs: [
      "paint-correction",
      "clay-bar-decontamination",
      "full-detailing",
    ],
  },
  {
    slug: "full-detailing",
    name: "Full Detail (Interior - Exterior)",
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
      "img10_nbt3it",
      "img1_wmvogj",
      "img6_zhmuto",
      "img1_ispma9",
      "img3_csigvj",
      "img4_gjkdq1",
      "img6_zhmuto",
      "img8_szsrt0",
      "img5_tv3uzo",
      "img8_f7ox14",
      "img10_e48ekd",
    ],
    relatedSlugs: ["ceramic-coating", "paint-correction", "interior-detailing"],
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
      "img4_nbrdxd",
      "img1_lffv2e",
      "img2_nenoo1",
      "img3_tobdwu",
      "img5_qsr5uo",
      "img6_dkx8rz",
      "img7_gz3145",
      "img8_ni38jn",
      "img9_em7sdz",
      "img10_fkhjc0",
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
      "img1_dfofm5",
      "img2_p6yqgl",
      "img3_rotfc9",
      "img4_wkxwas",
      "img5_ncxgwi",
      "img6_jb3szp",
      "img7_xwd0ik",
      "img8_naicsa",
      "img9_mufy44",
      "img10_atolbo",
    ],
    relatedSlugs: ["exterior-detailing", "paint-correction", "full-detailing"],
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
      "img1_xzdfxw",
      "img2_degiow",
      "img3_qf5g1t",
      "img4_vjtsel",
      "img5_row9hv",
      "img6_x2jkli",
      "img7_no0i8a",
      "img8_inzq6m",
    ],
    relatedSlugs: ["paint-correction", "ceramic-coating", "exterior-detailing"],
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
