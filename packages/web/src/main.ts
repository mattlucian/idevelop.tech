import "./assets/main.css";

import { createApp } from "vue";
// skipcq: JS-W1028 — Vue SFCs synthesize the default export at compile time; DeepSource's JS analyzer can't see it
import App from "./App.vue";
import router from "./router";
import { logger } from "./utils/logger";

/**
 * Validate required environment variables before app initialization
 * Prevents runtime failures from missing configuration
 */
function validateEnvironment(): void {
  const required = [
    { key: "VITE_RECAPTCHA_SITE_KEY", name: "reCAPTCHA Site Key" },
    { key: "VITE_API_URL", name: "API URL" },
  ];

  const missing = required.filter(
    ({ key }) => !import.meta.env[key as keyof ImportMetaEnv],
  );

  if (missing.length > 0) {
    const vars = missing.map(({ name }) => name).join(", ");
    const error = `Missing required environment variables: ${vars}`;

    // Always log in development
    if (import.meta.env.DEV) {
      logger.error("Environment validation failed", new Error(error), {
        module: "main",
        missingVars: missing.map(({ key }) => key),
      });
    }

    // Only throw in production to prevent startup with missing config
    if (import.meta.env.PROD) {
      throw new Error(error);
    }
  }
}

// Validate environment before creating app
validateEnvironment();

const app = createApp(App);

// Global error handler for uncaught component errors
app.config.errorHandler = (err, instance, info) => {
  logger.error("Vue error", err, {
    module: "main",
    component: instance?.$options?.name || "Unknown",
    errorInfo: info,
  });
  // TODO: Log to monitoring service in production when implemented
};

// Global warning handler (dev only)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    logger.warn(msg, {
      module: "main",
      component: instance?.$options?.name || "Unknown",
      trace,
    });
  };
}

app.use(router);

// Mount once the first route's page code has loaded, so the prerendered HTML
// is replaced by the same fully rendered page in one step instead of an empty
// layout (which shifted the footer: Cumulative Layout Shift in Lighthouse).
// Mounts even if the first navigation fails, so the page is never left blank.
router
  .isReady()
  .catch((error: unknown) => {
    logger.error("Initial navigation failed", error, { module: "main" });
  })
  .finally(() => app.mount("#app"));
