export interface LayoutProps {
  seo?: Partial<PageSEO>;
  theme?: Partial<PageTheme>;
}

export interface PageTheme {
  bgColor: string;
  primaryBallColor: string;
  secondaryBallColor: string;
  gridColor: string;
  diagonalColor: string;
  vignetteColor: string;
}

export interface PageSEO {
  title: string;
  tagline: string;
  description: string;
  url: string;
  keywords: string;
  socialTagline: string;
  socialDescription: string;
  image: string;
  altImageText: string;
}
