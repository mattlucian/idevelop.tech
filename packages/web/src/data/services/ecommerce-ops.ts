import { partnerLogo } from "@/utils/imageAssets";
import type { EcommerceOpsServiceData } from "@/types/service";

export const ecommerceOpsServiceData: EcommerceOpsServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "eCommerce Operations" },
  ],

  // Hero Section
  hero: {
    title: "Streamline eCommerce Operations Through Technology",
    subtitle:
      "Integrations, automation, app setup, migrations, and planning for your online store and the in-store, fulfillment, and accounting systems around it.",
    colorScheme: "cyan",
  },

  // Common challenges (example ids link to sections lower on the page)
  challenges: [
    {
      title: "Orders & Fulfillment",
      icon: "TruckIcon",
      desc: "Routing to warehouses and suppliers, split orders, and tracking updates",
      example: "orders",
    },
    {
      title: "Inventory",
      icon: "CubeIcon",
      desc: "Stock counts across channels, buffers, and low-stock alerts",
      example: "inventory",
    },
    {
      title: "Product Data",
      icon: "TagIcon",
      desc: "Supplier feeds, listings, variants, and categories",
      example: "product-data",
    },
    {
      title: "In-Store & POS",
      icon: "BuildingStorefrontIcon",
      desc: "Register sales, stock, and products shared with your online store",
      example: "pos",
    },
    {
      title: "Accounting",
      icon: "CalculatorIcon",
      desc: "Sales, taxes, and fees posted to QuickBooks or Xero",
      example: "pos",
    },
    {
      title: "Platform Migrations",
      icon: "ArrowsRightLeftIcon",
      desc: "Moving products, customers, orders, and URLs to a new platform",
    },
    {
      title: "Apps & Setup",
      icon: "Cog6ToothIcon",
      desc: "Choosing, configuring, and connecting the apps you run on",
    },
    {
      title: "Forecasting & Planning",
      icon: "ChartBarIcon",
      desc: "Reorder planning and demand trends from your sales history",
    },
  ],

  // Platforms
  platforms: {
    featured: [
      { name: "Shopify", desc: "Store setup, apps, and integrations" },
      { name: "BigCommerce", desc: "Store setup, apps, and integrations" },
      {
        name: "QuickBooks",
        desc: "Sales, fees, and costs synced to the books",
      },
      {
        name: "Flxpoint",
        desc: "Sources, routing, and fulfillment",
        path: "/flxpoint-consulting",
      },
    ],
    groups: [
      { label: "Stores", names: ["WooCommerce"] },
      { label: "Marketplaces", names: ["Amazon", "eBay", "Walmart"] },
      { label: "Accounting", names: ["Xero"] },
      { label: "In-store POS", names: ["Clover", "Pinogy"] },
    ],
  },

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Fire Ballz",
        url: "https://fire-ballz.com/",
        ...partnerLogo("fire-ballz-logo.avif"),
        description:
          "Built ecommerce automation processes to streamline operations",
      },
      {
        name: "Mr. Mochas Pet Supplies",
        url: "https://mrmochaspet.com",
        ...partnerLogo("mrmochas-dark-logo.png"),
        description: "Automated order processing and inventory management",
      },
      {
        name: "Volition America",
        url: "https://volitionamerica.com",
        ...partnerLogo("volition-america-dark.png"),
        description: "Multi-channel eCommerce operations automation",
      },
      {
        name: "Safari SA",
        url: "https://safarisa.net",
        ...partnerLogo("safarisa_net.avif"),
        description: "Streamlined eCommerce operations for optics retailer",
      },
      {
        name: "American Products 32",
        url: "https://americanproducts32.com",
        ...partnerLogo("ap32-logo-dark.png"),
        description:
          "Catalog and inventory sync from a product distributor to its retailers",
      },
      {
        name: "Masdun",
        url: "https://masdun.co.za",
        ...partnerLogo("masdun_co_za.avif"),
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
    title: "Get Help With Your eCommerce Operations",
    subtitle:
      "Let's talk about what takes the most time in your operations and where technology could help.",
    buttonText: "Schedule a Free Consultation",
  },
};
