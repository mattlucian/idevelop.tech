// Tech/Experience domain types
import type { Badge } from './shared/element'
import type { Topic } from './shared/ui'

export interface Expertise {
  title: string
  subtitle: string
  skillTags: string[]
  intro: string
  sections: Topic[]
}

export interface Category {
  name: string
  subtitle: string
  topics: Expertise[]
}

export interface TechContent {
  title: string
  overview: string
  badges: Badge[]
  categories: Category[]
}
