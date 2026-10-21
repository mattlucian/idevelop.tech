import { partnerLogo } from "@/utils/imageAssets";
import type { FlxpointConsultingData } from "@/types/service";

export const flxpointConsultingData: FlxpointConsultingData = {
  // Navigation
  breadcrumbs: [{ label: "Home", path: "/" }, { label: "Flxpoint Consulting" }],

  // Hero Section
  hero: {
    title: "Get More From Your Flxpoint Setup",
    subtitle:
      "Onboarding, configuration, order routing, and integrations for Flxpoint customers, from someone who led the platform's architecture.",
    colorScheme: "cyan",
  },

  expertiseBadge: {
    title: "Former Flxpoint CTO",
    description:
      "7+ years of Flxpoint platform experience, including platform architecture and enterprise implementations.",
  },

  // Where clients usually are when they reach out
  startingPoints: [
    {
      icon: "RocketLaunchIcon",
      title: "Getting started",
      desc: "New to Flxpoint or moving onto it",
      projects: ["Onboarding plan", "Moving from another platform"],
    },
    {
      icon: "WrenchScrewdriverIcon",
      title: "Already running",
      desc: "Live, with issues to sort out or more to automate",
      projects: ["Troubleshooting", "More automation"],
    },
    {
      icon: "CodeBracketIcon",
      title: "Building on Flxpoint",
      desc: "Suppliers, platforms, and developers using the API",
      projects: ["Custom connectors", "Webhooks"],
    },
  ],

  // Help at each stage of a Flxpoint setup (ids double as URL hashes for sitelinks)
  stages: [
    {
      id: "sources",
      icon: "BuildingStorefrontIcon",
      label: "Sources",
      summary: "Supplier and warehouse feeds",
      help: ["Adding sources", "Feed troubleshooting", "Rules for bad updates"],
    },
    {
      id: "catalog",
      icon: "CubeIcon",
      label: "Catalog & Inventory",
      summary: "Products combined into one catalog",
      help: ["Catalog cleanup", "Variant setup", "Quantity rules"],
    },
    {
      id: "listings",
      icon: "ShoppingBagIcon",
      label: "Listings & Pricing",
      summary: "Products listed to each channel",
      help: ["Channel setup", "Pricing rules", "Margin protection"],
    },
    {
      id: "orders",
      icon: "ArrowsRightLeftIcon",
      label: "Orders & Routing",
      summary: "Orders sent to a source",
      help: ["Routing review", "Split and backup rules", "Stuck order fixes"],
    },
    {
      id: "fulfillment",
      icon: "TruckIcon",
      label: "Fulfillment & Tracking",
      summary: "Shipping and tracking updates",
      help: [
        "Tracking automation",
        "Email-only sources",
        "Invoice reconciliation",
      ],
    },
    {
      id: "integrations",
      icon: "CodeBracketIcon",
      label: "API & Webhooks",
      summary: "Systems without a built-in integration",
      help: [
        "Custom connectors",
        "Webhook listeners",
        "Accounting and reporting",
      ],
    },
  ],

  // Other services, framed for Flxpoint customers
  services: [
    {
      icon: "WrenchScrewdriverIcon",
      title: "Tech Admin",
      path: "/services/tech-admin",
      desc: "A monthly retainer for your Flxpoint setup and the tools around it, with a roadmap built on your priorities.",
    },
    {
      icon: "ShoppingCartIcon",
      title: "eCommerce Operations",
      path: "/services/ecommerce-ops",
      desc: "POS, accounting, platform migrations, and the other systems that work alongside Flxpoint.",
    },
    {
      icon: "LinkIcon",
      title: "Integration Services",
      path: "/services/integration",
      desc: "Fixed-fee connectors for sources, channels, and internal systems without a built-in Flxpoint integration.",
    },
    {
      icon: "SparklesIcon",
      title: "AI Enablement",
      path: "/services/ai-enablement",
      desc: "Coaching your team to use the Flxpoint MCP server with AI agents to look into orders, inventory, and shipping questions.",
    },
  ],

  // Background on the platform
  experience: [
    {
      value: "Former CTO",
      label: "Flxpoint",
      desc: "Led the architecture behind the platform's core features, including how settings interact underneath.",
    },
    {
      value: "7+ years",
      label: "On the platform",
      desc: "Enterprise implementations for suppliers, distributors, and retailers.",
    },
    {
      value: "Integrations",
      label: "Flxpoint and Inventory Source",
      desc: "Built supplier and channel integrations at both companies.",
    },
    {
      value: "MCP server",
      label: "For Flxpoint customers",
      desc: "Planned and led development of the MCP server that connects Flxpoint accounts to AI agents.",
    },
  ],

  // Portfolio Section
  portfolio: {
    title: "Flxpoint Experience",
    items: [
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        ...partnerLogo("flxpoint-logo-dark.png"),
        description:
          "Former CTO: Led platform architecture, enterprise implementations, and integration development",
      },
      {
        name: "Inventory Source",
        url: "https://inventorysource.com",
        ...partnerLogo("inventorysource.gif"),
        description:
          "Built supplier network integrations for dropshipping and inventory management",
      },
      {
        name: "American Products 32",
        url: "https://americanproducts32.com",
        ...partnerLogo("ap32-logo-dark.png"),
        description:
          "Flxpoint operations, reporting, and AI workflows for a product distributor",
      },
      {
        name: "Volition America",
        url: "https://volitionamerica.com",
        ...partnerLogo("volition-america-dark.png"),
        description:
          "Flxpoint setup and operations for a multi-channel eCommerce brand",
      },
    ],
  },

  // CTA Section
  cta: {
    title: "Get Help With Your Flxpoint Setup",
    subtitle:
      "Whether you're getting started, working through a specific problem, or ready to automate more, let's talk through your setup.",
    buttonText: "Schedule a Free Consultation",
  },
};
