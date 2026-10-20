import type { Component } from "vue";

export type ArticleType = "article" | "case-study" | "field-notes" | "guide";

/**
 * `draft` renders only in local development. `review` is live and shareable
 * but marked "In review" on its card. `published` is final.
 */
export type ArticleStatus = "draft" | "review" | "published";

/**
 * Long-form article metadata.
 */
export interface ArticleMeta {
  slug: string;
  type: ArticleType;
  status: ArticleStatus;
  title: string;
  summary: string;
  /** ISO date for structured data; the byline shows its month and year */
  published?: string;
  updated?: string;
  readMinutes?: number;
  /**
   * Site path of the link preview image, made with `npm run share-image`.
   * The site-wide share image is used when omitted.
   */
  ogImage?: string;
  relatedService: {
    label: string;
    path: string;
  };
  /** Closing call to action; a generic one is shown when omitted */
  cta?: {
    title: string;
    body: string;
    /** Short note under the buttons pointing to a related service */
    aside?: {
      text: string;
      label: string;
      path: string;
    };
  };
}

export interface ArticleSource {
  text: string;
  links: { label: string; href: string }[];
}

export interface ArticleExampleParagraph {
  text: string;
  /** Source number from the article's Sources list */
  cite?: number;
}

/**
 * One example in an article's example carousel. `figures` are components
 * rendered under the text, such as workflow diagrams or charts.
 */
export interface ArticleExampleItem {
  business: string;
  title: string;
  body: ArticleExampleParagraph[];
  list?: string[];
  figures?: Component[];
}

/** One benefit or challenge in an article's tradeoffs card */
export interface ArticleTradeoffItem {
  label: string;
  detail: string;
  /** Source number from the article's Sources list */
  cite?: number;
}

export interface ArticleTradeoffs {
  title: string;
  benefits: ArticleTradeoffItem[];
  challenges: ArticleTradeoffItem[];
}
