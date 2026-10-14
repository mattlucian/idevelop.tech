import type { TechAdminServiceData } from "@/types/service";

export const techAdminServiceData: TechAdminServiceData = {
  // Navigation
  breadcrumbs: [{ label: "Home", path: "/" }, { label: "Tech Admin" }],

  // Hero Section
  hero: {
    title: "Make Tech Decisions With Confidence",
    subtitle:
      "A clear picture of your tools, a roadmap built around your priorities, and hands-on help to follow through, on a monthly retainer sized to your needs.",
    colorScheme: "cyan",
  },

  // Decisions clients commonly bring
  signals: [
    "Should we switch apps, or fix the one we have?",
    "Two vendors gave us different advice. Who's right?",
    "Are we paying for tools we don't need?",
    "Can this be automated, and is it worth it?",
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Volition America",
        url: "https://volitionamerica.com",
        logo: "/images/partners/volition-america-dark.png",
        description:
          "Patriotic eCommerce brand leveraging multiple backend tech systems",
      },
      {
        name: "Mr. Mochas Pet Supplies",
        url: "https://mrmochaspet.com",
        logo: "/images/partners/mrmochas-dark-logo.png",
        description:
          "Healthy Pet Supplies eCommerce brand with physical storefront",
      },
      {
        name: "Safari SA",
        url: "https://safarisa.net",
        logo: "/images/partners/safarisa_net.avif",
        description:
          "Technical administration for Optics & Safari Products provider",
      },
      {
        name: "Lifestyle Laundry Club",
        url: "https://lifestylelaundryclub.com",
        logo: "/images/partners/llc-logo.png",
        description:
          "Technical administration and a custom pickup and delivery app for a local laundry service",
      },
      {
        name: "American Products 32",
        url: "https://americanproducts32.com",
        logo: "/images/partners/ap32-logo-dark.png",
        description:
          "Technical administration and reporting for a product distributor",
      },
    ],
    testimonial: {
      quote:
        "I can't believe how great the site looks now and the additional functionalities we have! I'm very happy with the way things turned out!",
      author: "Pam",
      role: "Owner at Mr Mochas Pet",
    },
  },

  // CTA Section
  cta: {
    title: "Have a Tech Decision Coming Up?",
    subtitle:
      "Let's talk it through, along with the tools you run on and where a retainer would help.",
    buttonText: "Schedule a Free Consultation",
  },
};
