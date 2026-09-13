// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

const site = process.env.SITE_URL ?? "https://duartesautodetailing.com";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site,
  redirects: {
    "/service-area/walnut": "/service-area/walnut-creek/",
  },

  env: {
    schema: {
      PUBLIC_CLOUDINARY_CLOUD_NAME: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), sitemap()],
});
