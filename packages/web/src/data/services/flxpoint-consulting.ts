import type { ServicePageData } from "@/types/service";

interface FlxpointServiceArea {
  id: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

export interface FlxpointConsultingData extends ServicePageData {
  tabs: Array<{ id: string; label: string }>;
  serviceAreas: Record<string, FlxpointServiceArea>;
}

export const flxpointConsultingData: FlxpointConsultingData = {
  // Navigation
  breadcrumbs: [{ label: "Home", path: "/" }, { label: "Flxpoint Consulting" }],

  // Hero Section
  hero: {
    title: "Flxpoint Expert Consulting & Technical Support",
    subtitle:
      "Technical assistance and consulting for Flxpoint onboarding, configuration, and integrations from their former CTO.",
    colorScheme: "cyan",
  },

  // Tab Configuration
  tabs: [
    { id: "catalog", label: "Catalog Management" },
    { id: "orders", label: "Order Automation" },
    { id: "technical", label: "Technical Integration" },
  ],

  // Service Areas with detailed breakdowns
  serviceAreas: {
    catalog: {
      id: "catalog",
      label: "Catalog Management",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      title: "Inventory & Catalog Management",
      description:
        "Define and implement inventory and catalog management strategies that align with your business needs.",
      items: [
        {
          title: "Inventory Strategy",
          description:
            "Configure Vendor integrations to run inventory operations smoothly, including rules to compensate for data structures and protection against inconsistencies.",
        },
        {
          title: "Product Management",
          description:
            "Organize catalog management processes that align with your business needs, whether managing from Sales Channels or Vendors.",
        },
      ],
    },
    orders: {
      id: "orders",
      label: "Order Automation",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      title: "Order Routing & Automation",
      description:
        "Handle complex Order Routing scenarios and increase automation capabilities for your fulfillment operations.",
      items: [
        {
          title: "Routing Configuration",
          description:
            "Assess business rules and configure routing rules for complex scenarios that require specific results.",
        },
        {
          title: "Order Flows",
          description:
            "Ensure Flxpoint Order flows work as intended with automated data ingestion from Sales Channels and appropriate data passing to downstream Sources.",
        },
      ],
    },
    technical: {
      id: "technical",
      label: "Technical Integration",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      title: "API & Integration Support",
      description:
        "Technical guidance and implementation support for Flxpoint's API, webhooks, and custom integrations.",
      items: [
        {
          title: "API Implementation",
          description:
            "Guidance and implementation support for Flxpoint API & webhooks, including operations, listeners, and strategic recommendations.",
        },
        {
          title: "Integration Development",
          description:
            "Support for troubleshooting existing integrations, implementing connectors, or building custom integrations to meet specific requirements.",
        },
      ],
    },
  },

  // Benefits Section (reduced to 3 for better layout)
  benefits: [
    {
      title: "Platform Expertise",
      description:
        "Former CTO at Flxpoint with extensive knowledge of platform architecture, capabilities, and implementation strategies.",
    },
    {
      title: "Advanced Use Cases",
      description:
        "Evaluate limitations and develop strategies for advanced use-cases, from problematic Vendor files to increased automation capabilities.",
    },
    {
      title: "Strategic Implementation",
      description:
        "Serve as a dedicated technical resource for issues, strategic improvements, and navigating modern eCommerce complexity.",
    },
  ],

  expertiseBadge: {
    title: "Former Flxpoint CTO",
    description:
      "5+ years of Flxpoint platform experience, including platform architecture and enterprise implementations.",
  },

  // What I Offer
  whatIOffer: [
    "Technical assistance for Flxpoint onboarding, configuration, and daily operations",
    "Custom integration development for suppliers, marketplaces, and internal systems",
    "Complex routing scenarios and workflow automation optimization",
    "API and webhook implementation guidance and support",
    "Strategic consulting on implementation strategy and platform configuration",
  ],

  // How It Works
  howItWorks: [
    "Free consultation to assess your Flxpoint needs and current setup",
    "Detailed proposal with scope and fixed-fee pricing",
    "Regular progress updates and collaborative implementation",
    "Documentation and training for team handoff",
  ],

  // Portfolio Section
  portfolio: {
    title: "Flxpoint Experience",
    items: [
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        logo: "/images/partners/flxpoint-logo-dark.png",
        description:
          "Former CTO: Led platform architecture, enterprise implementations, and integration development",
      },
      {
        name: "Inventory Source",
        url: "https://inventorysource.com",
        logo: "/images/partners/inventorysource-logo-dark.png",
        description:
          "Built supplier network integrations for dropshipping and inventory management",
      },
    ],
    testimonial: {
      quote:
        "Matt's deep understanding of Flxpoint and integration architecture helped us scale our operations significantly.",
      author: "Enterprise Client",
      role: "Operations Director",
    },
  },

  // CTA Section
  cta: {
    title: "Ready to Improve Your Flxpoint Operations?",
    subtitle:
      "Whether you're getting started with Flxpoint, facing technical challenges, or looking to optimize your current setup — let's discuss how I can help.",
    buttonText: "Schedule a Free Consultation",
  },
};
