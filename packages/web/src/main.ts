import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Prevent aggressive PWA install prompt (industry best practice)
// Service worker still provides offline caching and performance benefits
// Users can install via browser menu (Chrome: address bar, Safari: Share menu)
let deferredPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

window.addEventListener("beforeinstallprompt", (e: Event) => {
  // Prevent browser's default install prompt
  e.preventDefault();

  // Store event for potential future use (e.g., contextual prompt after engagement)
  deferredPrompt = e as BeforeInstallPromptEvent;

  // For now, we suppress the prompt entirely for better UX
  // Users can still install via browser's native UI
});

const app = createApp(App);

// Global error handler for uncaught component errors
app.config.errorHandler = (err, instance, info) => {
  if (import.meta.env.DEV) {
    console.error("Vue error:", err);
    console.error("Component:", instance);
    console.error("Error info:", info);
  }
  // TODO: Log to monitoring service in production when implemented
};

// Global warning handler (dev only)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn("Vue warning:", msg);
    console.warn("Trace:", trace);
  };
}

app.use(router);

app.mount("#app");
