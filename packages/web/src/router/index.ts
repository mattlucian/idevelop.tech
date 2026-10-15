import { nextTick } from "vue";
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import { fetchDeployedBuild, loadPageFresh } from "@/utils/deployCheck";
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
    // Smooth-scroll to hash target (e.g. /hire-me#about); gracefully no-ops
    // if the element doesn't exist. 80px top offset clears the sticky nav.
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 80 };
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
      path: "/services/mcp-development",
      name: "mcp-development-service",
      component: () =>
        import("../views/services/McpDevelopmentServiceView.vue"),
    },
    {
      path: "/services/web-design",
      redirect: "/",
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
      path: "/notes/:slug",
      name: "article",
      component: () => import("../views/ArticleView.vue"),
    },
    {
      path: "/hire-me",
      name: "hire-me",
      component: () => import("../views/HireMeView.vue"),
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

// Before an in-app navigation, load the destination as a full page if a newer
// deploy is live (see utils/deployCheck.ts). Skipped for the first page load,
// same-page hash changes, and the local dev server.
router.beforeEach(async (to, from) => {
  if (import.meta.env.DEV || from === START_LOCATION || to.path === from.path) {
    return true;
  }
  const deployedBuild = await fetchDeployedBuild();
  if (deployedBuild && deployedBuild !== __BUILD_ID__) {
    return !loadPageFresh(to.fullPath);
  }
  return true;
});

// Handle router errors (e.g., chunk loading failures)
router.onError((error, to) => {
  logger.error("Router error", error, { module: "router" });

  // A page file failed to download, e.g. a deploy removed it between the
  // version check and the download. Load the destination as a full page.
  if (
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.message.includes("Importing a module script failed")
  ) {
    logger.warn("Page file failed to load; loading the page fresh", {
      module: "router",
      errorType: "chunk-loading",
    });
    loadPageFresh(to.fullPath);
  }
});

// Track pageviews in Google Analytics for SPA navigation
// Only sends pageviews if GA is loaded (user accepted analytics cookies)
router.afterEach((to) => {
  // Check if Google Analytics is loaded
  if (typeof window.gtag === "undefined") return;
  // Wait for the new view to render so its useMeta has set document.title
  nextTick(() => {
    window.gtag?.("config", import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: to.fullPath,
      page_title: document.title,
    });
  });
});

export default router;
