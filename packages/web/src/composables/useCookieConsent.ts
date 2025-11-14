import { ref, computed, type Ref } from "vue";
import { STORAGE_KEYS, type CookieConsent } from "@/constants/storage";

// Declare Google Analytics types on window
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Composable for managing cookie consent preferences
 *
 * Handles:
 * - Cookie consent state (localStorage persistence)
 * - Loading external scripts (reCAPTCHA, Google Analytics)
 * - Cookie deletion for analytics opt-out
 * - Consent acceptance, decline, revoke, and enable operations
 */
export function useCookieConsent() {
  const consent = ref<CookieConsent | null>(null);

  /**
   * Load consent from localStorage
   */
  const loadConsent = (): void => {
    const stored = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    if (stored) {
      try {
        consent.value = JSON.parse(stored);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to parse cookie consent:", error);
        }
        consent.value = null;
      }
    }
  };

  /**
   * Save consent to localStorage
   */
  const saveConsent = (newConsent: CookieConsent): void => {
    localStorage.setItem(
      STORAGE_KEYS.COOKIE_CONSENT,
      JSON.stringify(newConsent),
    );
    consent.value = newConsent;
  };

  /**
   * Check if Google Analytics is loaded
   */
  const isGoogleAnalyticsLoaded = (): boolean => {
    return (
      typeof window.gtag !== "undefined" &&
      typeof window.dataLayer !== "undefined"
    );
  };

  /**
   * Load Google reCAPTCHA script
   * Required for contact form spam protection
   */
  const loadRecaptchaScript = (): void => {
    // Check if reCAPTCHA script already exists
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  /**
   * Load Google Analytics script
   * Only loads if user has consented to analytics cookies
   */
  const loadGoogleAnalytics = (): void => {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    // Check if GA script already exists
    const existingScript = document.querySelector(
      'script[src*="googletagmanager"]',
    );
    if (existingScript || !GA_MEASUREMENT_ID) {
      return;
    }

    // Create GA script tag
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true, // Anonymize IP addresses for privacy
      cookie_flags: "SameSite=None;Secure", // Secure cookie settings
    });
  };

  /**
   * Delete Google Analytics cookies
   *
   * Note: This only deletes cookies on our domain (localhost/idevelop.tech).
   * Third-party cookies on Google's domains (.google.com) cannot be deleted
   * from our code due to browser security restrictions.
   */
  const deleteAnalyticsCookies = (): void => {
    const hostname = window.location.hostname;
    const cookiesToDelete = ["_ga", "_gid", "_gat"];

    // Helper function to delete a single cookie with all domain variations
    const deleteCookie = (name: string) => {
      // Delete without domain (works for localhost)
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      // Delete with dot-prefixed domain (e.g., .idevelop.tech)
      // Skip for localhost as it doesn't support dot-prefix
      if (hostname !== "localhost" && hostname !== "127.0.0.1") {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;

        // Also try parent domain if applicable (e.g., .tech from idevelop.tech)
        const parts = hostname.split(".");
        if (parts.length > 2) {
          const parentDomain = parts.slice(1).join(".");
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${parentDomain};`;
        }
      }
    };

    // Delete standard GA cookies
    cookiesToDelete.forEach(deleteCookie);

    // Delete property-specific GA cookies (pattern: _ga_*)
    const allCookies = document.cookie.split(";");
    allCookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0]?.trim();
      if (cookieName?.startsWith("_ga_")) {
        deleteCookie(cookieName);
      }
    });
  };

  /**
   * Accept all cookies (essential + analytics)
   * Loads both reCAPTCHA and Google Analytics scripts
   */
  const acceptConsent = (): void => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(newConsent);

    // Load scripts
    loadRecaptchaScript();
    loadGoogleAnalytics();
  };

  /**
   * Decline analytics cookies (only essential cookies)
   * Only loads reCAPTCHA script
   */
  const declineConsent = (): void => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(newConsent);

    // Only load essential (reCAPTCHA)
    loadRecaptchaScript();
  };

  /**
   * Revoke analytics consent
   * Deletes GA cookies, updates consent, and reloads page
   *
   * @returns Success message for display
   */
  const revokeConsent = (): string => {
    deleteAnalyticsCookies();

    const newConsent: CookieConsent = {
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(newConsent);

    // Reload page to stop any running GA scripts
    setTimeout(() => {
      window.location.reload();
    }, 1500);

    return "Analytics consent revoked successfully. Google Analytics will not load on future visits. Reloading page...";
  };

  /**
   * Enable analytics consent
   * Updates consent and reloads page to load GA scripts
   *
   * @returns Success message for display
   */
  const enableConsent = (): string => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(newConsent);

    // Reload page to load GA scripts
    setTimeout(() => {
      window.location.reload();
    }, 1500);

    return "Analytics consent enabled successfully. Google Analytics will start tracking on reload. Reloading page...";
  };

  // Computed properties for reactive state
  const hasConsent = computed(() => consent.value !== null);
  const hasAnalyticsConsent = computed(() => consent.value?.analytics ?? false);
  const consentTimestamp = computed(() => consent.value?.timestamp ?? null);

  return {
    // State
    consent: consent as Readonly<Ref<CookieConsent | null>>,
    hasConsent,
    hasAnalyticsConsent,
    consentTimestamp,

    // Actions
    loadConsent,
    acceptConsent,
    declineConsent,
    revokeConsent,
    enableConsent,

    // Utilities
    isGoogleAnalyticsLoaded,
    loadRecaptchaScript,
    loadGoogleAnalytics,
    deleteAnalyticsCookies,
  };
}
