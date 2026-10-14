import { SITE } from "@/constants";

export interface MetaOptions {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image";
}

/**
 * Composable for managing document meta tags
 * Updates title, description, Open Graph, and Twitter Card tags
 *
 * No unmount cleanup: on route change the next view's setup runs before the
 * previous view unmounts, so restoring here would overwrite the new page's
 * title and tags. Each routed view sets its own meta instead.
 */
export function useMeta(options: MetaOptions) {
  // Helper to set or update a meta tag
  const setMetaTag = (name: string, content: string, useProperty = false) => {
    const attribute = useProperty ? "property" : "name";
    // index.html declares twitter:* with `property`, so match either attribute
    let tag = document.querySelector<HTMLMetaElement>(
      `meta[name="${name}"], meta[property="${name}"]`,
    );

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  };

  // Update document title
  if (options.title) {
    document.title = options.title;
  }

  // Update description
  if (options.description) {
    setMetaTag("description", options.description);
  }

  // Update Open Graph tags
  if (options.ogTitle) {
    setMetaTag("og:title", options.ogTitle, true);
  }

  if (options.ogDescription) {
    setMetaTag("og:description", options.ogDescription, true);
  }

  if (options.ogImage) {
    setMetaTag("og:image", options.ogImage, true);
  }

  if (options.ogUrl) {
    setMetaTag("og:url", options.ogUrl, true);
  }

  // Canonical URL follows the page; index.html's default points at the homepage
  let canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute(
    "href",
    options.ogUrl ?? `${SITE.url}${window.location.pathname}`,
  );

  // Always set og:type for pages
  setMetaTag("og:type", "website", true);

  // Update Twitter Card tags
  const twitterCard = options.twitterCard || "summary_large_image";
  setMetaTag("twitter:card", twitterCard);

  if (options.ogTitle) {
    setMetaTag("twitter:title", options.ogTitle);
  }

  if (options.ogDescription) {
    setMetaTag("twitter:description", options.ogDescription);
  }

  if (options.ogImage) {
    setMetaTag("twitter:image", options.ogImage);
  }
}
