import { fileURLToPath, URL } from "node:url";

import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Shown in the footer so a deploy can be confirmed by comparing it with the
// latest commit
function buildId(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return process.env.GITHUB_SHA?.slice(0, 7) ?? "local";
  }
}

const BUILD_ID = buildId();

export default defineConfig({
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
    {
      // /version.json lets open tabs detect a newer deploy (utils/deployCheck.ts)
      name: "build-version",
      apply: "build",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "version.json",
          source: JSON.stringify({ build: BUILD_ID }),
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-vendor": ["vue", "vue-router"],
        },
      },
    },
  },
});
