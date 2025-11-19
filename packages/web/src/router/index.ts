import { createRouter, createWebHistory } from "vue-router";
import { logger } from "@/utils/logger";

// Declare Google Analytics types for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Only restore scroll position when using browser back/forward buttons
    // and when navigating FROM another page (not initial load)
    if (savedPosition && from.name) {
      return savedPosition;
    }
    // Always scroll to top for direct navigation or initial page load
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/services/integration",
      name: "integration-service",
      component: () => import("../views/services/IntegrationServiceView.vue"),
    },
    {
      path: "/services/tech-admin",
      name: "tech-admin-service",
      component: () => import("../views/services/TechAdminServiceView.vue"),
    },
    {
      path: "/services/ai-enablement",
      name: "ai-enablement-service",
      component: () => import("../views/services/AIEnablementServiceView.vue"),
    },
    {
      path: "/services/ecommerce-ops",
      name: "ecommerce-ops-service",
      component: () => import("../views/services/EcommerceOpsServiceView.vue"),
    },
    {
      path: "/services/web-design",
      name: "web-design-service",
      component: () => import("../views/services/WebDesignServiceView.vue"),
    },
    {
      path: "/services/cloud-consulting",
      name: "cloud-consulting-service",
      component: () =>
        import("../views/services/CloudConsultingServiceView.vue"),
    },
    {
      path: "/flxpoint-consulting",
      name: "flxpoint-consulting",
      component: () => import("../views/FlxpointConsultingView.vue"),
    },
    {
      path: "/hire-me",
      name: "hire-me",
      component: () => import("../views/HireMeView.vue"),
    },
    {
      path: "/components",
      name: "components",
      component: () => import("../views/ComponentView.vue"),
    },
    {
      path: "/tech",
      name: "tech",
      component: () => import("../views/TechView.vue"),
    },
    {
      path: "/attributions",
      name: "attributions",
      component: () => import("../views/AttributionsView.vue"),
    },
    {
      path: "/accessibility",
      name: "accessibility",
      component: () => import("../views/AccessibilityView.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("../views/PrivacyView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

// Handle router errors (e.g., chunk loading failures)
router.onError((error) => {
  logger.error("Router error", error, { module: "router" });

  // Handle chunk loading errors (network failures during lazy loading)
  if (
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.message.includes("Importing a module script failed")
  ) {
    // Suggest page refresh or navigate to error page
    logger.warn(
      "Chunk loading failed - suggest user refresh or check network connection",
      { module: "router", errorType: "chunk-loading" },
    );
    // In production, could show a toast/modal suggesting page refresh
  }
});

// Track pageviews in Google Analytics for SPA navigation
// Only sends pageviews if GA is loaded (user accepted analytics cookies)
router.afterEach((to) => {
  // Check if Google Analytics is loaded
  if (typeof window.gtag !== "undefined") {
    // Send pageview event for the new route
    window.gtag("config", import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: to.fullPath,
      page_title: document.title,
    });
  }
});

export default router;
