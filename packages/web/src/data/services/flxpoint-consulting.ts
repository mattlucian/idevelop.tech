import { partnerLogo } from "@/utils/imageAssets";
import type { FlxpointConsultingData } from "@/types/service";

export const flxpointConsultingData: FlxpointConsultingData = {
  // Navigation
  breadcrumbs: [{ label: "Home", path: "/" }, { label: "Flxpoint Consulting" }],

  // Hero Section
  hero: {
    title: "Flxpoint Consulting From the Platform's Former CTO",
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

  // How data moves through the platform (ids double as URL hashes for sitelinks)
  stages: [
    {
      id: "sources",
      icon: "BuildingStorefrontIcon",
      label: "Sources",
      summary:
        "Suppliers and warehouses send products, stock, and costs by API, file, or EDI.",
      issue: "A feed that suddenly reports zero stock",
      help: "Rules that hold back bad or partial updates",
      projects: ["Adding a source", "Feed troubleshooting"],
    },
    {
      id: "catalog",
      icon: "CubeIcon",
      label: "Catalog & Inventory",
      summary:
        "Products from each source are linked into one catalog, with stock and cost combined.",
      issue: "The same product offered by more than one source",
      help: "Catalog and quantity rules that match how you manage products",
      projects: ["Catalog cleanup", "Variant setup"],
    },
    {
      id: "listings",
      icon: "ShoppingBagIcon",
      label: "Listings & Pricing",
      summary:
        "Products are listed to your channels with pricing and quantity rules for each.",
      issue: "Prices that slip below margin as costs change",
      help: "Pricing rules with margin protection for each channel",
      projects: ["Channel setup", "Listing troubleshooting"],
    },
    {
      id: "orders",
      icon: "ArrowsRightLeftIcon",
      label: "Orders & Routing",
      summary:
        "Orders are imported and routed to a source based on stock, cost, and location.",
      issue: "Orders that need to split or fall back to another source",
      help: "Routing rules that match your business rules",
      projects: ["Routing review", "Stuck order fixes"],
    },
    {
      id: "fulfillment",
      icon: "TruckIcon",
      label: "Fulfillment & Tracking",
      summary:
        "Sources receive orders, ship them, and send tracking back to your channels.",
      issue: "Sources that confirm orders by email",
      help: "Connecting sources that lack a standard integration",
      projects: ["Tracking automation", "Invoice reconciliation"],
    },
    {
      id: "integrations",
      icon: "CodeBracketIcon",
      label: "API & Webhooks",
      summary:
        "Flxpoint connects to systems without a built-in integration through its API and webhooks.",
      issue: "Flxpoint data needed in accounting or reporting",
      help: "Custom connectors and webhook listeners",
      projects: ["Custom connector", "Accounting and reporting"],
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
    title: "Ready to Improve Your Flxpoint Setup?",
    subtitle:
      "Whether you're getting started, working through a specific problem, or ready to automate more, let's talk through your setup.",
    buttonText: "Schedule a Free Consultation",
  },
};
