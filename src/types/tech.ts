// Tech/Experience domain types
import type { Badge } from './shared/element'
import type { Topic } from './shared/ui'

/**
 * Individual expertise area within a category
 */
export interface Expertise {
  title: string
  subtitle: string
  skillTags: string[]
  intro: string
  sections: Topic[]
}

/**
 * Technical category grouping related expertise areas
 */
export interface Category {
  name: string
  subtitle: string
  topics: Expertise[]
}

/**
 * Complete technical experience/expertise content
 */
export interface TechContent {
  title: string
  overview: string
  badges: Badge[]
  categories: Category[]
}

/**
 * Service card configuration for homepage
 */
export interface ServiceCard {
  name: string
  path: string
  icon: string
  label: string
  title: string
  tagline: string
  stats: { value: string; label: string }[]
  tags: string[]
  borderColor: string
  bgColor: string
  visualStyle: 'hero-pattern' | 'image-hero' | 'gradient-mesh' | 'minimalist-icon'
  heroImage?: string
}

/**
 * Services configuration with cards and expertise phrases
 */
export interface ServicesConfig {
  serviceCards: ServiceCard[]
  expertisePhrases: string[]
}
