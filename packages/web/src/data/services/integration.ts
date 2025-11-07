import type { IntegrationServiceData } from "@/types/service";

export const integrationServiceData: IntegrationServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Integration Services" },
  ],

  // Hero Section
  hero: {
    title: "Connect Your Systems with Transparent, Fixed-Fee Integrations",
    subtitle:
      "Custom API and file integrations with clear documentation, fixed-fee pricing, and regular progress updates.",
    colorScheme: "cyan",
  },

  // Tab Configuration
  tabs: [
    { id: "accounting", label: "eCommerce → Accounting" },
    { id: "fulfillment", label: "Fulfillment → eCommerce" },
    { id: "marketplace", label: "eCommerce → Marketplace" },
  ],

  // Integration Diagrams
  integrationDiagrams: {
    accounting: {
      leftSystem: {
        name: "eCommerce",
        label: "System",
        iconPath:
          "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
        colorScheme: "cyan",
      },
      rightSystem: {
        name: "Accounting",
        label: "System",
        iconPath:
          "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        colorScheme: "emerald",
      },
      mappings: [
        { from: "Orders", to: "Invoices" },
        { from: "Products", to: "Inventory" },
        { from: "Customers", to: "Contacts" },
      ],
      caption:
        "Sync orders, products, and customers to your accounting platform",
      mappingColorScheme: "cyan",
    },
    fulfillment: {
      leftSystem: {
        name: "Fulfillment",
        label: "System",
        iconPath:
          "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
        colorScheme: "emerald",
      },
      rightSystem: {
        name: "eCommerce",
        label: "System",
        iconPath:
          "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
        colorScheme: "cyan",
      },
      mappings: [
        { from: "Inventory", to: "Stock Levels" },
        { from: "Fulfillments", to: "Orders", direction: "backward" },
        { from: "Shipments", to: "Tracking" },
      ],
      caption:
        "Keep inventory up-to-date and automate fulfillment & tracking flows",
      mappingColorScheme: "emerald",
    },
    marketplace: {
      leftSystem: {
        name: "eCommerce",
        label: "System",
        iconPath:
          "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
        colorScheme: "cyan",
      },
      rightSystem: {
        name: "Marketplace",
        label: "System",
        iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
        colorScheme: "purple",
      },
      mappings: [
        { from: "Orders", to: "Orders", direction: "backward" },
        { from: "Stock Levels", to: "Stock Levels" },
        { from: "Tracking", to: "Tracking" },
      ],
      caption:
        "Sync marketplace orders, update inventory levels, and provide tracking information",
      mappingColorScheme: "purple",
    },
  },

  // Benefits Section
  benefits: [
    {
      title: "No Black Box Integrations",
      description:
        "Detailed data mapping documentation that lets you adjust configurations independently.",
    },
    {
      title: "Fixed-Fee Pricing",
      description:
        "Fixed-fee project pricing with regular updates. You know the cost upfront.",
    },
    {
      title: "Tailored to Your Systems",
      description: "Built for your specific platforms and business workflows.",
    },
  ],

  expertiseBadge: {
    title: "100+ Integrations Built",
    description:
      "Handling 1M+ daily operations across REST, SOAP, GraphQL, and file-based integrations.",
  },

  // What I Offer / How It Works
  whatIOffer: [
    "Experienced integration professional with 100+ integrations handling 1M+ daily operations",
    "Support for REST, SOAP, GraphQL APIs and file-based integrations",
    "Transparent data mapping with configuration options for self-service",
    "Optional hosting and ongoing support for maintaining integrations",
  ],

  howItWorks: [
    "Free consultation to understand your integration needs",
    "Fixed-fee proposal with clear scope",
    "Regular progress updates during development",
    "Documentation and training included for 10+ hour projects",
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Sage Intacct",
        url: "https://www.sage.com/en-us/sage-business-cloud/intacct/",
        logo: "/images/partners/sageintacct.png",
        description:
          "Built an integration into Sage Intacct for eCommerce accounting purposes",
      },
      {
        name: "Gordon Truck Centers",
        url: "https://gordontruckcenters.com",
        logo: "/images/partners/gordontruckcenters_dark.png",
        description:
          "Enterprise system integration for truck dealership operations",
      },
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        logo: "/images/partners/flxpoint-logo-dark.png",
        description:
          "Built multiple supplier integrations and marketplace connections",
      },
    ],
    testimonial: {
      quote:
        "This has been a great experience and it's been a pleasure to work with you! We're impressed with the output.",
      author: "Brian",
      role: "VP at Gordon Truck Centers",
    },
  },

  // CTA Section
  cta: {
    title: "Ready to Get Started?",
    subtitle:
      "Discuss your integration needs and explore how we can connect your systems.",
    buttonText: "Schedule a Free Consultation",
  },
};
