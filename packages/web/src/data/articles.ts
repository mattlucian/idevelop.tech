import type { ArticleMeta, ArticleType } from "@/types/article";

export const articles: ArticleMeta[] = [
  {
    slug: "levels-of-ai-adoption",
    type: "guide",
    status: "draft",
    title: "Levels of AI Adoption: A Framework for Your Organization",
    summary:
      "The ways organizations use AI, from everyday questions to agents built into workflows and platforms, and a framework for deciding where your team goes next.",
    relatedService: {
      label: "AI Enablement",
      path: "/services/ai-enablement",
    },
  },
];

export const articleTypeLabels: Record<
  ArticleType,
  { eyebrow: string; action: string }
> = {
  "case-study": { eyebrow: "Case Study", action: "Read the case study" },
  "field-notes": { eyebrow: "Field Notes", action: "Read the field notes" },
  guide: { eyebrow: "Guide", action: "Read the guide" },
};

const isVisible = (article: ArticleMeta) =>
  article.status === "published" || import.meta.env.DEV;

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug && isVisible(a));
}

export function getFeaturedArticle(
  servicePath: string,
): ArticleMeta | undefined {
  return articles.find(
    (a) => a.relatedService.path === servicePath && isVisible(a),
  );
}
