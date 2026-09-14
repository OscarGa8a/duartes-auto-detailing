import { config } from "./config";

interface SocialNetwork {
  name: string;
  href: string;
  accessibleLabel: string;
}

export const socialNetworks: SocialNetwork[] = [
  {
    name: "tabler:brand-tiktok-filled",
    href: "https://www.tiktok.com/@duartesdetailing",
    accessibleLabel: "Visit Duartes Auto Detailing on TikTok (opens in a new tab)",
  },
  {
    name: "tabler:brand-facebook-filled",
    href: "https://www.facebook.com/profile.php?id=61577394432288",
    accessibleLabel: "Visit Duartes Auto Detailing on Facebook (opens in a new tab)",
  },
  {
    name: "tabler:brand-instagram-filled",
    href: "https://www.instagram.com/duartes_detailing/",
    accessibleLabel: "Visit Duartes Auto Detailing on Instagram (opens in a new tab)",
  },
  {
    name: "tabler:brand-whatsapp-filled",
    href: `https://wa.me/${config.phoneUSE164}`,
    accessibleLabel: "Contact Duartes Auto Detailing on WhatsApp (opens in a new tab)",
  },
] as const;
