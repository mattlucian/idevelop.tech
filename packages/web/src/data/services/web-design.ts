import type { WebDesignServiceData } from "@/types/service";

export const webDesignServiceData: WebDesignServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Web Design & Development" },
  ],

  // Hero Section
  hero: {
    title: "Professional Web Design & Development",
    subtitle:
      "Mobile-responsive design on Shopify, WordPress, or custom platforms—with SEO preservation, user-focused optimization, and fixed-fee pricing.",
    colorScheme: "cyan",
  },

  // Tab Configuration
  tabs: [
    { id: "design", label: "Design Process" },
    { id: "platforms", label: "Platforms" },
    { id: "migration", label: "Migration" },
  ],

  // Benefits Section
  benefits: [
    {
      title: "User-Focused Design",
      description:
        "Every design decision is driven by your business goals and user needs. User journey mapping, analytics setup, and thoughtful optimization help create effective experiences.",
    },
    {
      title: "Zero-Downtime Migration",
      description:
        "Move to better platforms without losing search rankings. SEO preservation with 301 redirects, content optimization, and performance improvements.",
    },
    {
      title: "Mobile-First Approach",
      description:
        "Responsive designs optimized for multiple devices. Mobile-first layouts ensure your site works across screen sizes from 320px to 4K displays.",
    },
  ],

  expertiseBadge: {
    title: "Full-Stack Web Development",
    description:
      "Professional design and development on Shopify, WordPress, and custom platforms with ongoing support.",
  },

  // What I Offer / How It Works
  whatIOffer: [
    "Professional design on Shopify, WordPress, and custom platforms",
    "Mobile-responsive, brand-aligned designs with user experience focus",
    "Website migration with SEO preservation and performance optimization",
    "Analytics setup and user experience optimization",
    "Ongoing design support for continuous improvement",
  ],

  howItWorks: [
    "Free consultation to understand your brand and business goals",
    "Fixed-fee proposal based on estimated hours with transparent pricing",
    "Regular progress updates with design mockups and staging site access",
    "Training and documentation included for projects over 10 hours",
    "Launch support and post-launch optimization",
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Safari SA",
        url: "https://safarisa.net",
        logo: "/images/partners/safarisa_net.avif",
        description:
          "Website built on Shopify for Optics & Safari Products provider",
      },
      {
        name: "Masdun",
        url: "https://masdun.co.za",
        logo: "/images/partners/masdun_co_za.avif",
        description: "Frame and picture album eCommerce business",
      },
      {
        name: "Mr. Mochas Pet Supplies",
        url: "https://mrmochaspet.com",
        logo: "/images/partners/mrmochas-dark-logo.png",
        description:
          "Custom Shopify website design for healthy pet supplies retailer",
      },
    ],
    testimonial: {
      quote:
        "[Matt's] expertise, knowledge, and experience in systems, software, and all technical aspects are exceptional",
      author: "Neil",
      role: "CEO at SafariSA",
    },
  },

  // CTA Section
  cta: {
    title: "Ready to Build Your Website?",
    subtitle:
      "Let's discuss your design needs and create a website that reflects your brand and supports your business goals.",
    buttonText: "Schedule a Free Consultation",
  },

  // Design Process Visualization
  designProcess: {
    steps: [
      {
        icon: "MagnifyingGlassIcon",
        title: "Discover",
        description: "Brand audit, goal setting, and competitive analysis",
      },
      {
        icon: "DocumentTextIcon",
        title: "Content",
        description: "Gather copy, images, and assets for your site",
      },
      {
        icon: "PaintBrushIcon",
        title: "Design",
        description: "Create mockups that reflect your brand identity",
      },
      {
        icon: "CodeBracketIcon",
        title: "Develop",
        description: "Build on staging with regular progress updates",
      },
      {
        icon: "BeakerIcon",
        title: "Test",
        description: "Cross-browser and device testing for quality",
      },
      {
        icon: "RocketLaunchIcon",
        title: "Launch",
        description: "Go live and optimize for user experience",
      },
    ],
  },

  // Platform Expertise
  platforms: [
    {
      name: "Shopify",
      description:
        "Custom theme development and app integration for eCommerce success",
      features: [
        "Custom themes",
        "App integration",
        "Checkout optimization",
        "Store migration",
      ],
    },
    {
      name: "WordPress",
      description:
        "WooCommerce and custom WordPress solutions with focus on performance",
      features: [
        "Custom themes",
        "WooCommerce setup",
        "Plugin development",
        "Performance tuning",
      ],
    },
    {
      name: "Custom Solutions",
      description:
        "Vue, React, and modern frameworks for complex web applications",
      features: [
        "Vue.js/React",
        "API integration",
        "Custom functionality",
        "Scalable architecture",
      ],
    },
  ],

  // Migration Checklist
  migrationSteps: [
    {
      phase: "Pre-Migration",
      items: ["Content audit", "SEO baseline", "URL mapping", "Backup"],
    },
    {
      phase: "Migration",
      items: [
        "Content transfer",
        "Design implementation",
        "301 redirects",
        "Staging testing",
      ],
    },
    {
      phase: "Post-Migration",
      items: [
        "SEO monitoring",
        "Performance check",
        "Analytics setup",
        "User testing",
      ],
    },
  ],
};
