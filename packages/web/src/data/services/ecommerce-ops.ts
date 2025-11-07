import type { EcommerceOpsServiceData } from "@/types/service";

export const ecommerceOpsServiceData: EcommerceOpsServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "eCommerce Operations" },
  ],

  // Hero Section
  hero: {
    title: "Scale Your eCommerce Operations",
    subtitle:
      "Automate your order fulfillment, inventory management, and product catalog across Shopify, Amazon, eBay, and more.",
    colorScheme: "cyan",
  },

  // Tab Configuration
  tabs: [
    { id: "order-routing", label: "Order Routing" },
    { id: "inventory-sync", label: "Inventory Sync" },
    { id: "product-data", label: "Product Data" },
  ],

  // Benefits Section
  benefits: [
    {
      title: "Multi-Channel Automation",
      description:
        "Integrations across Shopify, WooCommerce, Amazon, eBay, and other marketplaces with automated data flows.",
    },
    {
      title: "Eliminate Manual Work",
      description:
        "Automate order routing, inventory sync, and product updates to save hours daily.",
    },
    {
      title: "Scale Operations",
      description:
        "Solutions that grow with your business, handling high volumes across multiple warehouses and sales channels.",
    },
  ],

  expertiseBadge: {
    title: "eCommerce Automation Expertise",
    description:
      "Solutions that scale operations with product data management, shipping carrier integrations, and marketing tool connections.",
  },

  // What I Offer / How It Works
  whatIOffer: [
    "Technical automation solutions for distributed ordering, inventory sync, and product data management",
    "Platform integrations for Shopify, WooCommerce, Amazon, eBay, and other marketplaces",
    "Multi-warehouse and shipping carrier integrations (FedEx, UPS, USPS)",
    "Fixed-fee project pricing with documentation and ongoing support options",
  ],

  howItWorks: [
    "Free consultation to understand your eCommerce challenges and automation needs",
    "Fixed-fee proposal based on estimated hours",
    "Regular progress updates throughout development",
    "Documentation and training included for projects over 10 hours",
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Fire Ballz",
        url: "https://fire-ballz.com/",
        logo: "/images/partners/fire-ballz-logo.avif",
        description:
          "Built ecommerce automation processes to streamline operations",
      },
      {
        name: "Mr. Mochas Pet Supplies",
        url: "https://mrmochaspet.com",
        logo: "/images/partners/mrmochas-dark-logo.png",
        description: "Automated order processing and inventory management",
      },
      {
        name: "Volition America",
        url: "https://volitionamerica.com",
        logo: "/images/partners/volition-america-dark.png",
        description: "Multi-channel eCommerce operations automation",
      },
      {
        name: "Safari SA",
        url: "https://safarisa.net",
        logo: "/images/partners/safarisa_net.avif",
        description: "Streamlined eCommerce operations for optics retailer",
      },
      {
        name: "Masdun",
        url: "https://masdun.co.za",
        logo: "/images/partners/masdun_co_za.avif",
        description:
          "eCommerce automation for frame and picture album business",
      },
    ],
    testimonial: {
      quote:
        "Matt's expertise, knowledge, and experience in systems, software, and all technical aspects are exceptional",
      author: "Neil",
      role: "CEO at SafariSA",
    },
  },

  // CTA Section
  cta: {
    title: "Ready to Automate Your eCommerce Operations?",
    subtitle:
      "Discuss how to streamline your order routing, inventory sync, and product data management.",
    buttonText: "Schedule a Free Consultation",
  },

  // Tab Content Configurations
  tabContent: {
    "order-routing": {
      title: "Distributed Order Routing",
      description:
        "Route orders intelligently across multiple warehouses, dropshipping partners, and fulfillment locations based on inventory availability and proximity.",
      benefits: [
        "Multi-warehouse order allocation based on stock levels and location",
        "Dropshipping automation with automated supplier integration",
        "Split-order fulfillment for complex logistics scenarios",
        "Automated order status tracking and customer notifications",
      ],
      visual: {
        title: "Order Flow Automation",
        steps: [
          {
            emoji: "🛍️",
            label: "Customer Orders",
            desc: "Order placed on your store",
          },
          {
            emoji: "🎯",
            label: "Smart Routing",
            desc: "Allocate to best location",
          },
          {
            emoji: "📦",
            label: "Auto-Fulfillment",
            desc: "Sent to optimal warehouse",
          },
          {
            emoji: "🚚",
            label: "Fast Shipping",
            desc: "Optimized delivery time",
          },
        ],
      },
    },
    "inventory-sync": {
      title: "Automated Inventory Synchronization",
      description:
        "Keep inventory accurate across sales channels with automated stock level updates from multiple sources, preventing overselling and lost sales.",
      benefits: [
        "Automated sync across Shopify, Amazon, eBay, and other marketplaces",
        "Automatic stock updates from warehouses and suppliers",
        "Low-stock alerts and reorder point automation",
        "Single source of truth for inventory data",
      ],
      beforeAfter: {
        before: {
          title: "Manual Inventory Management",
          items: [
            "Overselling due to outdated stock levels",
            "Hours spent manually updating quantities",
            "Stock discrepancies across channels",
            "Lost sales from inaccurate availability",
          ],
        },
        after: {
          title: "Automated Inventory System",
          items: [
            "Automated sync prevents overselling",
            "Automatic updates across platforms",
            "Single source of truth for inventory",
            "Improved sales with accurate stock data",
          ],
        },
      },
    },
    "product-data": {
      title: "Product Data Management",
      description:
        "Organize, enrich, and distribute product information across your eCommerce platforms with bulk import, normalization, and automated categorization.",
      benefits: [
        "Bulk product data import from supplier feeds (CSV, API)",
        "Automated categorization, tagging, and variant creation",
        "SKU mapping and product attribute enrichment",
        "Multi-channel distribution to stores and marketplaces",
      ],
      workflow: {
        title: "Product Data Workflow",
        stages: [
          {
            stage: "Import",
            items: [
              "CSV/API feeds from multiple sources",
              "Normalize data formats",
              "Validate product information",
            ],
          },
          {
            stage: "Enrich",
            items: [
              "Auto-assign to correct categories",
              "Generate SEO-friendly titles",
              "Add missing attributes",
              "Create product variants",
            ],
          },
          {
            stage: "Distribute",
            items: [
              "Push to Shopify/WooCommerce",
              "Sync to marketplaces (Amazon, eBay)",
              "Update inventory systems",
            ],
          },
          {
            stage: "Maintain",
            items: [
              "Price updates from suppliers",
              "Discontinued product removal",
              "New product additions",
            ],
          },
        ],
      },
    },
  },
};
