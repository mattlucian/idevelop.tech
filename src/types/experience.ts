// Type definitions for experience/expertise content structure

export interface Badge {
  label: string
  value: string
  icon: string
}

export interface Section {
  heading: string
  content: string
}

export interface Topic {
  title: string
  subtitle: string
  skillTags: string[]
  intro: string
  sections: Section[]
}

export interface Category {
  name: string
  subtitle: string
  topics: Topic[]
}

export interface ExperienceContent {
  title: string
  overview: string
  badges: Badge[]
  categories: Category[]
}
