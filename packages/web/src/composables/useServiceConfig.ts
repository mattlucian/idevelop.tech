import { servicesConfig } from "../data/services";
import type { ServiceCard } from "../types/tech";

// Service cards configuration
export const serviceCards: ServiceCard[] = servicesConfig.serviceCards;

// Dynamic typewriter phrases for subheading
export const expertisePhrases: string[] = servicesConfig.expertisePhrases;

// Find a service by name
export function useServiceConfig() {
  const getServiceByName = (name: string) => {
    return serviceCards.find((s) => s.name === name);
  };

  return {
    serviceCards,
    expertisePhrases,
    getServiceByName,
  };
}
