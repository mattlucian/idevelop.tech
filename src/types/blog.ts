import type { PageSEO, PageTheme } from "./layout";

export interface BlogLayoutProps {
  seo?: Partial<PageSEO>;
  theme?: Partial<PageTheme>;
  blog?: Partial<BlogInfo>;
}

export interface BlogInfo {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime: string;
  expirationTime: string;
  authors: string[];
  section: string;
  tags: string[];
}
