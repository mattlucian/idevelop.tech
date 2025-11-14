import { useMeta } from "@/composables/useMeta";
import { SITE } from "@/constants";

/**
 * Options for page SEO meta tags
 */
export interface PageMetaOptions {
  /** Page title (will be appended with "| I Develop Tech") */
  title: string;
  /** URL slug (e.g., "flxpoint-consulting") */
  slug: string;
  /** Meta description for search engines */
  description: string;
  /** Open Graph description for social media */
  ogDescription: string;
  /** Base path (default: '/') */
  basePath?: string;
  /** Custom OG image filename (default: 'og-image-{slug}.jpg') */
  ogImage?: string;
  /** Twitter card type (default: 'summary_large_image') */
  twitterCard?: "summary" | "summary_large_image";
}

/**
 * Composable for standardized page SEO meta tags
 *
 * Provides consistent SEO meta tag structure across all pages.
 * Automatically constructs title, OG title, URL, and OG image based on
 * the page title and slug.
 *
 * @param options - Page meta tag options
 *
 * @example
 * ```ts
 * usePageMeta({
 *   title: "Flxpoint Consulting Services",
 *   slug: "flxpoint-consulting",
 *   description: "Expert Flxpoint consulting...",
 *   ogDescription: "Professional Flxpoint consulting services...",
 * });
 * ```
 */
export function usePageMeta(options: PageMetaOptions): void {
  const {
    title,
    slug,
    description,
    ogDescription,
    basePath = "",
    ogImage,
    twitterCard,
  } = options;

  const fullTitle = `${title} | I Develop Tech`;
  const url = basePath
    ? `${SITE.url}${basePath}/${slug}`
    : `${SITE.url}/${slug}`;
  const image = ogImage || `${SITE.url}/og-image-${slug}.jpg`;

  useMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription,
    ogUrl: url,
    ogImage: image,
    twitterCard,
  });
}
