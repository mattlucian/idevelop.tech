// Type definitions for service content structure

export interface WorkflowStep {
  icon: string
  label: string
  desc: string
}

export interface WorkflowVisual {
  type: 'workflow'
  data: {
    title: string
    steps: WorkflowStep[]
  }
}

export interface BeforeAfterSection {
  title?: string
  items?: string[]
}

export interface DiagramVisual {
  type: 'diagram' | 'before-after'
  data: {
    title: string
    before: BeforeAfterSection | string[]
    after: BeforeAfterSection | string[]
  }
}

export interface CodeVisual {
  type: 'code'
  data: {
    title: string
    code: string
  }
}

export type Visual = WorkflowVisual | DiagramVisual | CodeVisual

export interface ServiceStats {
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
  visual?: Visual
  cta?: string
}

export interface ServiceContent {
  title: string
  tagline: string
  overview: string
  stats: ServiceStats[]
  tags: string[]
  sections: ServiceSection[]
  portfolioItems: PortfolioItem[]
  testimonial: Testimonial
}
