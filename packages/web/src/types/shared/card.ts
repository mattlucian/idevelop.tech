// Types for /components/cards/ components

/**
 * Generic step with icon, label, and description
 */
export interface Step {
  icon: string;
  label: string;
  desc: string;
}

/**
 * Timeline step for process visualization
 */
export interface TimelineStep {
  icon: string;
  label: string;
  desc: string;
}

/**
 * Portfolio item with client work
 */
export interface PortfolioItem {
  name: string;
  url: string;
  logo: string;
  description: string;
}

/**
 * Client testimonial
 */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

/**
 * Expertise badge content
 */
export interface ExpertiseBadge {
  title: string;
  description: string;
}
