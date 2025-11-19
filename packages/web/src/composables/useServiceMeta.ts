import { usePageMeta } from "@/composables/usePageMeta";

/**
 * Options for service page SEO meta tags
 */
export interface ServiceMetaOptions {
  /** Full service name with suffix (e.g., "AI Enablement & Team Training Services") */
  serviceName: string;
  /** URL slug for the service (e.g., "ai-enablement") */
  slug: string;
  /** Meta description for search engines */
  description: string;
  /** Open Graph description for social media */
  ogDescription: string;
}

/**
 * Composable for standardized service page SEO meta tags
 *
 * Provides consistent SEO meta tag structure across all service pages.
 * Automatically constructs title, OG title, URL, and OG image based on
 * the service name and slug.
 *
 * @param options - Service meta tag options
 *
 * @example
 * ```ts
 * useServiceMeta({
 *   serviceName: "AI Enablement & Team Training Services",
 *   slug: "ai-enablement",
 *   description: "Practical AI adoption for your team...",
 *   ogDescription: "Help your team adopt AI effectively...",
 * });
 * ```
 */
export function useServiceMeta(options: ServiceMetaOptions): void {
  const { serviceName, slug, description, ogDescription } = options;

  usePageMeta({
    title: serviceName,
    slug,
    description,
    ogDescription,
    basePath: "/services",
  });
}
