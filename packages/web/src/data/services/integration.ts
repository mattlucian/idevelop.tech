import { partnerLogo } from "@/utils/imageAssets";
import type { IntegrationServiceData } from "@/types/service";

export const integrationServiceData: IntegrationServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Integration Services" },
  ],

  // Hero Section
  hero: {
    title: "Connect Your Systems With Documented, Fixed-Fee Integrations",
    subtitle:
      "Orders, inventory, and customer data moving between your platforms on a schedule, with a written field mapping your team can read and adjust.",
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

  stats: [
    { value: "100+", label: "Integrations built" },
    { value: "REST · SOAP · GraphQL", label: "APIs" },
    { value: "CSV · SFTP", label: "File-based" },
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Sage Intacct",
        url: "https://www.sage.com/en-us/sage-business-cloud/intacct/",
        ...partnerLogo("sageintacct.png"),
        description:
          "Integration target: eCommerce orders and accounting data synced into Sage Intacct",
      },
      {
        name: "Gordon Truck Centers",
        url: "https://gordontruckcenters.com",
        ...partnerLogo("gordontruckcenters_dark.png"),
        description:
          "Enterprise system integration for truck dealership operations",
      },
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        ...partnerLogo("flxpoint-logo-dark.png"),
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
    title: "Ready to Connect Your Systems?",
    subtitle:
      "Let's talk about which systems you use and what needs to move between them.",
    buttonText: "Schedule a Free Consultation",
  },
};
