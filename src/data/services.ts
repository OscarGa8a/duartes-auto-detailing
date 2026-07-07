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
    name: "Interior Detail",
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
      "img14_yapstm",
      "img1_v0uity",
      "img2_tbgr2k",
      "img3_br8fyb",
      "img4_m28lp9",
      "img5_nzwru7",
      "img6_m3mhzp",
      "img7_joell2",
      "img8_k96ixi",
      "img9_su7y7q",
      "img10_zmesw9",
      "img11_w1mqb7",
      "img12_fg2gex",
      "img13_b1q4kp",
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
      "img10_ny7bbo",
      "img1_hadcgm",
      "img2_a8flus",
      "img3_ql6e3y",
      "img4_avn0rw",
      "img5_mf21k7",
      "img6_bgc7p1",
      "img7_nuvkck",
      "img8_dhzgxw",
      "img9_bz9scj",
      "img11_djasz8",
      "img12_ayuwfe",
      "img13_ptobt1",
      "img14_oywexs",
      "img15_n4rs66",
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
      "img1_pl62ks",
      "img2_pahdef",
      "img3_makqun",
      "img4_ub21qo",
      "img5_t3aza9",
      "img6_sb944p",
      "img7_ich3fc",
      "img8_rfnxk8",
      "img9_whvozj",
      "img10_krezlr",
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
      "img1_yqzcqr",
      "img6_fsi6rv",
      "img2_eahbl8",
      "img3_fsyavv",
      "img4_d857o5",
      "img5_brw7kv",
      "img7_rlx5ib",
      "img8_lo7a5v",
      "img9_adf3ou",
      "img10_tear6u",
      "img11_jyegao",
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
      "img5_tfs4mg",
      "img1_tmpx2c",
      "img2_hezc6k",
      "img3_qzyjjf",
      "img4_vz0dz4",
      "img6_pbb71l",
      "img7_ku0uf3",
      "img8_zu0yez",
      "img9_il97xr",
      "img10_yf3ll4",
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
      "img4_yy8jcu",
      "img1_qr10jv",
      "img2_zulywq",
      "img3_cluk0a",
      "img5_ejnim5",
      "img6_luk3wy",
      "img7_yattit",
      "img8_bzqo27",
      "img9_fpexcy",
      "img10_j23ucy",
      "img11_y8zkif",
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
      "img1_q5lnkj",
      "img2_aszfgq",
      "img3_kxovdq",
      "img4_pw5ucb",
      "img5_aduvnf",
      "img6_yimqlw",
      "img7_cr3zfw",
      "img8_zds3za",
      "img9_zbuzr7",
      "img10_tj41rl",
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
      "img1_ufdvdm",
      "img2_uoeryl",
      "img3_atmj5i",
      "img4_pt6i2k",
      "img5_aaslrw",
      "img6_r6udyr",
      "img7_wv1gkb",
      "img8_idaeby",
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
