import servicesDataRaw from '../data/services.json'

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

// Service cards configuration loaded from JSON
export const serviceCards: ServiceCard[] = servicesDataRaw.serviceCards as ServiceCard[]

// Dynamic typewriter phrases for subheading
export const expertisePhrases: string[] = servicesDataRaw.expertisePhrases

// Find a service by name
export function useServiceConfig() {
  const getServiceByName = (name: string) => {
    return serviceCards.find((s) => s.name === name)
  }

  return {
    serviceCards,
    expertisePhrases,
    getServiceByName,
  }
}
