import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

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
