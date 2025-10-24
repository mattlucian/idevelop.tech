// Type definitions for service content structure
import type { Display } from './shared/display'

export interface ServiceStat {
  value: string
  label: string
}

export interface PortfolioItem {
  name: string
  url: string
  logo: string
  description: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

export interface ServiceSection {
  heading: string
  tagline?: string
  content?: string
  benefits?: string[]
  visual?: Display
  cta?: string
  theme?: 'default' | 'process' | 'overview' | 'options'
}

export interface ServiceContent {
  title: string
  tagline: string
  overview: string
  stats: ServiceStat[]
  tags: string[]
  whatIOffer?: string[]
  howItWorks?: string[]
  sections: ServiceSection[]
  portfolioItems: PortfolioItem[]
  testimonial: Testimonial
}
