import { SITE } from "@/constants";

export interface MetaOptions {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  /** Page-specific schema.org data, added beside index.html's Organization block */
  jsonLd?: Record<string, unknown>;
  /** Open Graph article tags, used with `ogType: "article"` */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
}

const PAGE_JSON_LD_ATTR = "data-page-json-ld";

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

  setMetaTag("og:type", options.ogType ?? "website", true);

  // Article tags only belong on article pages, so clear the previous page's
  document.head
    .querySelectorAll('meta[property^="article:"]')
    .forEach((tag) => tag.remove());
  if (options.article?.publishedTime) {
    setMetaTag("article:published_time", options.article.publishedTime, true);
  }
  if (options.article?.modifiedTime) {
    setMetaTag("article:modified_time", options.article.modifiedTime, true);
  }
  if (options.article?.author) {
    setMetaTag("article:author", options.article.author, true);
  }

  // Replace the previous page's structured data so it doesn't carry over
  document.head
    .querySelectorAll(`script[${PAGE_JSON_LD_ATTR}]`)
    .forEach((script) => script.remove());
  if (options.jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(PAGE_JSON_LD_ATTR, "");
    script.textContent = JSON.stringify(options.jsonLd);
    document.head.appendChild(script);
  }

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

  // index.html's twitter:url points at the homepage
  setMetaTag(
    "twitter:url",
    options.ogUrl ?? `${SITE.url}${window.location.pathname}`,
  );
}
