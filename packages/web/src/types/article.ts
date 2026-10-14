export type ArticleType = "case-study" | "field-notes" | "guide";

export type ArticleStatus = "draft" | "published";

/**
 * Long-form article metadata. Drafts render only in local development.
 */
export interface ArticleMeta {
  slug: string;
  type: ArticleType;
  status: ArticleStatus;
  title: string;
  summary: string;
  updated?: string;
  readMinutes?: number;
  relatedService: {
    label: string;
    path: string;
  };
}
