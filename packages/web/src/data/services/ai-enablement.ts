import type { AIEnablementServiceData } from "@/types/service";

export const aiEnablementServiceData: AIEnablementServiceData = {
  // Navigation
  breadcrumbs: [{ label: "Home", path: "/" }, { label: "AI Enablement" }],

  // Hero Section
  hero: {
    title: "Adopt AI Across Your Organization",
    subtitle:
      "From automating routine work to taking on projects that weren't practical before. Workshops and AI workflows for support, operations, and engineering teams, with your people reviewing the output.",
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
      items: ["Repetitive tasks", "Data analysis", "Exception reports"],
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
        logo: "/images/partners/flxpoint-logo-dark.png",
        description:
          "Instruction sets and reference patterns for building and refactoring integrations with AI agents",
      },
      {
        name: "American Products 32",
        url: "https://americanproducts32.com",
        logo: "/images/partners/ap32-logo-dark.png",
        description:
          "AI skills and operational workflows for a product distributor",
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
    title: "Ready to Plan Your AI Adoption?",
    subtitle:
      "Let's talk about where your organization is with AI today and where it makes sense to start.",
    buttonText: "Schedule a Free Consultation",
  },
};
