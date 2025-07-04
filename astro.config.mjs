// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://idevelop.tech/",
  output: "static",
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    icon(),
    vue(),
    sitemap(),
  ],

  build: {
    inlineStylesheets: "auto",
  },

  vite: {
    optimizeDeps: {
      include: [],
      exclude: [],
    },
    ssr: {
      noExternal: ["@astrojs/*"],
    },
  },
});