import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { logger } from "./utils/logger";

// Prevent aggressive PWA install prompt (industry best practice)
// Service worker still provides offline caching and performance benefits
// Users can install via browser menu (Chrome: address bar, Safari: Share menu)
let _deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

window.addEventListener("beforeinstallprompt", (e: Event) => {
  // Prevent browser's default install prompt
  e.preventDefault();

  // Store event for potential future use (e.g., contextual prompt after engagement)
  _deferredPrompt = e as BeforeInstallPromptEvent;

  // For now, we suppress the prompt entirely for better UX
  // Users can still install via browser's native UI
});

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

app.mount("#app");
