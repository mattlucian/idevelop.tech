/// <reference types="vite/client" />

// Injected by vite.config.ts `define`
declare const __BUILD_ID__: string;
declare const __BUILD_DATE__: string;

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_SHARE_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
