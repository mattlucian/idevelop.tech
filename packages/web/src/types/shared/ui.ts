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
  testimonial: import("./card").Testimonial;
}

/**
 * Two-column list section configuration
 */
export interface TwoColumnListConfig {
  leftColumn: {
    title: string;
    items: string[];
    color: ColorScheme;
    type: "check" | "number";
  };
  rightColumn: {
    title: string;
    items: string[];
    color: ColorScheme;
    type: "check" | "number";
  };
}

/**
 * Tab content for comparison layouts (before/after)
 */
export interface ComparisonTabContent {
  title: string;
  description: string;
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
}

/**
 * Journey configuration for cloud consulting
 */
export interface JourneyConfig {
  title: string;
  steps: import("./card").JourneyStep[];
}

/**
 * Before/after comparison items
 */
export interface BeforeAfterComparison {
  before: {
    title: string;
    items: string[];
  };
  after: {
    title: string;
    items: string[];
  };
}

/**
 * Workflow stage for product data processing
 */
export interface WorkflowStage {
  stage: string;
  items: string[];
}

/**
 * Platform feature set
 */
export interface PlatformConfig {
  name: string;
  description: string;
  features: string[];
}

/**
 * Migration phase checklist
 */
export interface MigrationPhase {
  phase: string;
  items: string[];
}

export type PanelColorScheme = "cyan" | "emerald";
export type PanelHeaderStyle = "decorative" | "simple";

// General color scheme type used across the application
// Matches the color schemes supported by most components
export type ColorScheme = "cyan" | "emerald" | "purple";
