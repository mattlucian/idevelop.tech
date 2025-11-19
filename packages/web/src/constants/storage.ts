/**
 * LocalStorage and SessionStorage key constants
 *
 * Centralizes all storage keys to prevent typos and
 * provide a single source of truth for storage usage.
 */
export const STORAGE_KEYS = {
  /** Cookie consent preferences (localStorage) */
  COOKIE_CONSENT: "cookie_consent",
} as const;

/** Type for cookie consent stored in localStorage */
export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
}
