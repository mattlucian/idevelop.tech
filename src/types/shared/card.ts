// Types for /components/cards/ components

/**
 * Generic step with icon, label, and description
 */
export interface Step {
  icon: string
  label: string
  desc: string
}

/**
 * Timeline step for process visualization
 */
export interface TimelineStep {
  icon: string
  label: string
  desc: string
}

/**
 * Visual step for ecommerce order flow
 */
export interface VisualStep {
  emoji: string
  label: string
  desc: string
}

/**
 * Journey step for cloud consulting processes
 */
export interface JourneyStep {
  icon: string
  label: string
  description: string
}

/**
 * Design process step
 */
export interface DesignProcessStep {
  icon: string
  title: string
  description: string
}

/**
 * Benefit item displayed in benefits section
 */
export interface BenefitItem {
  title: string
  description: string
}

/**
 * Portfolio item with client work
 */
export interface PortfolioItem {
  name: string
  url: string
  logo: string
  description: string
}

/**
 * Client testimonial
 */
export interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
}

/**
 * Expertise badge content
 */
export interface ExpertiseBadge {
  title: string
  description: string
}
