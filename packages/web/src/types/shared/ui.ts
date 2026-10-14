// Types for /components/ui/ components

export interface Topic {
  heading: string;
  content: string;
}

/**
 * Breadcrumb navigation item
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
}

/**
 * Tab navigation configuration
 */
export interface TabConfig {
  id: string;
  label: string;
}

/**
 * Portfolio section data
 */
export interface PortfolioSection {
  title: string;
  items: import("./card").PortfolioItem[];
  testimonial?: import("./card").Testimonial;
}

export type PanelHeaderStyle = "decorative" | "simple";

// General color scheme type used across the application
// Matches the color schemes supported by most components
export type ColorScheme = "cyan" | "emerald" | "purple";
