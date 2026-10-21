import { partnerLogo } from "@/utils/imageAssets";
import type { AIEnablementServiceData } from "@/types/service";

export const aiEnablementServiceData: AIEnablementServiceData = {
  // Navigation
  breadcrumbs: [{ label: "Home", path: "/" }, { label: "AI Enablement" }],

  // Hero Section
  hero: {
    title: "Improve Your Operations With AI",
    subtitle:
      "I help evaluate, plan, and implement practical ways to incorporate AI into your business operations, with your team involved at each step.",
    colorScheme: "cyan",
  },

  // Everyday use cases
  useCases: [
    {
      title: "Customer Support",
      icon: "UserGroupIcon",
      color: "cyan",
      items: ["Drafting replies", "Ticket triage", "Order status lookups"],
    },
    {
      title: "Operations",
      icon: "BoltIcon",
      color: "orange",
      items: ["Purchase orders", "Data analysis", "Exception reports"],
    },
    {
      title: "Documentation",
      icon: "BookOpenIcon",
      color: "purple",
      items: ["Process guides", "Onboarding materials", "Knowledge bases"],
    },
    {
      title: "Development",
      icon: "CommandLineIcon",
      color: "emerald",
      items: ["Code review", "Test cases", "Refactoring"],
    },
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        ...partnerLogo("flxpoint-logo-dark.png"),
        description:
          "Instruction sets and reference patterns for building and refactoring integrations with AI agents",
      },
      {
        name: "American Products 32",
        url: "https://americanproducts32.com",
        ...partnerLogo("ap32-logo-dark.png"),
        description:
          "AI skills and operational workflows for a product distributor",
      },
      {
        name: "Mr. Mochas Pet Supplies",
        url: "https://mrmochaspet.com",
        ...partnerLogo("mrmochas-dark-logo.png"),
        description:
          "Automated processes built with AI, including integrations and purchase order generation",
      },
    ],
    testimonial: {
      quote:
        "This report is amazing. I love how you always think outside of the box.",
      author: "Dave",
      role: "American Products 32",
    },
  },

  // CTA Section
  cta: {
    title: "Get Technical Help With AI",
    subtitle:
      "Let's talk about how your team works today and where AI could help your operations.",
    buttonText: "Schedule a Free Consultation",
  },
};
