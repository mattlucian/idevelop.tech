import type { TechAdminServiceData } from "@/types/service";

export const techAdminServiceData: TechAdminServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Tech Admin & Fractional CTO" },
  ],

  // Hero Section
  hero: {
    title: "Expert Tech Guidance Without the Full-Time Cost",
    subtitle:
      "Strategic tech planning combined with hands-on execution. Document your stack, identify gaps, build automation, and handle technical initiatives - all on a flexible retainer.",
    colorScheme: "cyan",
  },

  // Tab Configuration
  tabs: [
    { id: "planning", label: "Strategic Planning" },
    { id: "execution", label: "Technical Execution" },
    { id: "support", label: "Ongoing Support" },
  ],

  // Timeline Steps
  timelineSteps: [
    {
      icon: "🔍",
      label: "Tech Stack Review",
      desc: "Assessment of your current tools, systems, and integrations",
    },
    {
      icon: "🎯",
      label: "Business Goals",
      desc: "Align technical planning with your business goals and growth plans",
    },
    {
      icon: "📋",
      label: "Documentation",
      desc: "Create clear reference materials for your team and future planning",
    },
    {
      icon: "📊",
      label: "Gap Analysis & Planning",
      desc: "Identify capability gaps and prioritize improvements for your roadmap",
    },
  ],

  // Benefits Section
  benefits: [
    {
      title: "Priority Support",
      description:
        "Direct access for technical decisions and guidance during business hours.",
    },
    {
      title: "Strategic + Hands-On",
      description:
        "Not just advice - I document your stack, build automation, handle migrations, and execute technical initiatives.",
    },
    {
      title: "Flexible Capacity",
      description:
        "Scale from steady maintenance (10 hrs/month) to burst initiatives (20-30 hrs/month) without hiring full-time.",
    },
  ],

  expertiseBadge: {
    title: "10+ Years Full-Stack Development",
    description:
      "Expertise across software, cloud, DevOps, data pipelines, security, and technical leadership.",
  },

  // What I Offer / How It Works
  whatIOffer: [
    "Retainer-based access to 10+ years full-stack expertise",
    "Direct access and priority support during business hours",
    "Flexible capacity: steady support or burst initiatives",
    "Document your tech stack and create actionable roadmaps",
    "Hands-on execution: automation, migrations, integrations",
    "Strategic planning & capability assessments",
  ],

  howItWorks: [
    "Free consultation to understand your technical needs and current stack",
    "Tech stack review and documentation",
    "Gap analysis to identify improvement opportunities",
    "Create phased roadmap with prioritized initiatives",
    "Ongoing retainer for implementation and support",
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
    title: "Ready to Get Started?",
    subtitle:
      "Discuss your technical needs and explore how strategic planning and hands-on execution can support your business goals.",
    buttonText: "Schedule a Free Consultation",
  },
};
