import type { ArticleMeta, ArticleType } from "@/types/article";

export const articles: ArticleMeta[] = [
  {
    slug: "ai-adoption-in-small-businesses",
    type: "article",
    status: "review",
    published: "2026-10-19",
    title: "AI Adoption in Small Businesses",
    summary:
      "Four practical ways a small business can use AI, from drafting with an assistant to letting an agent handle routine decisions, and the safeguards each one needs.",
    relatedService: {
      label: "AI Enablement",
      path: "/services/ai-enablement",
    },
    cta: {
      title: "Get Technical Help Incorporating AI Into Your Business",
      body: "Whether your business is starting with AI or already uses it in its operations, I can help you decide where it fits next, document the workflows involved, and build the automations and safeguards each step needs.",
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

/** Site path for an article page */
export const articlePath = (slug: string) => `/articles/${slug}`;

const isVisible = (article: ArticleMeta) =>
  article.status !== "draft" || import.meta.env.DEV;

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
