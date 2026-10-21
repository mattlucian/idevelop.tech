import type { ArticleMeta, ArticleType } from "@/types/article";

export const articles: ArticleMeta[] = [
  {
    slug: "ai-adoption-in-small-businesses",
    type: "article",
    status: "published",
    published: "2026-10-19",
    readMinutes: 18,
    title: "AI Adoption in Small Businesses",
    summary:
      "A practical way for small businesses to improve their operations by gradually incorporating AI.",
    ogImage: "/images/articles/ai-adoption-in-small-businesses.png",
    relatedService: {
      label: "AI Enablement",
      path: "/services/ai-enablement",
    },
    cta: {
      title: "Get Technical Help Incorporating AI Into Your Business",
      body: "I can help evaluate, plan, and implement practical ways to gradually incorporate AI into your business operations, whether you're just starting with AI or already use it regularly.",
      aside: {
        text: "Run a software platform? I also build MCP servers that let your customers connect Claude, ChatGPT, and other AI agents to their accounts on your platform.",
        label: "MCP server development",
        path: "/services/mcp-development",
      },
    },
  },
];

export const articleTypeLabels: Record<
  ArticleType,
  { eyebrow: string; action: string }
> = {
  article: { eyebrow: "Article", action: "Read the article" },
  "case-study": { eyebrow: "Case Study", action: "Read the case study" },
  "field-notes": { eyebrow: "Field Notes", action: "Read the field notes" },
  guide: { eyebrow: "Guide", action: "Read the guide" },
};

// ISO dates render as "October 2026"; UTC keeps the month from shifting by time zone
const monthYear = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

/** Byline date: "Updated <month year>" when updated, else the published month */
export function articleDateLabel(article: ArticleMeta): string {
  if (article.updated) return `Updated ${monthYear(article.updated)}`;
  return article.published ? monthYear(article.published) : "";
}

/** Site path for an article page */
export const articlePath = (slug: string) => `/articles/${slug}`;

const isVisible = (article: ArticleMeta) =>
  article.status !== "draft" || import.meta.env.DEV;

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug && isVisible(a));
}

/** Articles for the /articles index, newest first */
export function getVisibleArticles(): ArticleMeta[] {
  return articles
    .filter(isVisible)
    .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""));
}

export function getFeaturedArticle(
  servicePath: string,
): ArticleMeta | undefined {
  return articles.find(
    (a) => a.relatedService.path === servicePath && isVisible(a),
  );
}
