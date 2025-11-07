import type { AIEnablementServiceData } from "@/types/service";

export const aiEnablementServiceData: AIEnablementServiceData = {
  // Navigation
  breadcrumbs: [{ label: "Home", path: "/" }, { label: "AI Enablement" }],

  // Hero Section
  hero: {
    title: "Empower Your Team with Practical AI Training",
    subtitle:
      "Hands-on training workshops with workflow analysis to identify high-impact AI opportunities. Focus on proven applications: documentation, testing, and code assistance.",
    colorScheme: "cyan",
  },

  // Tab Configuration
  tabs: [
    { id: "workflow", label: "Workflow Analysis" },
    { id: "training", label: "Hands-On Training" },
    { id: "implementation", label: "Tool Implementation" },
  ],

  // Tab Content (Before/After comparisons)
  tabContent: {
    workflow: {
      title: "Optimize Your Team's Workflows with AI",
      description:
        "I'll analyze your current processes to identify where AI can make the biggest impact on productivity and quality.",
      beforeTitle: "Before AI Consultation",
      beforeItems: [
        "Unclear where to start with AI tools",
        "Team overwhelmed by too many options",
        "Wasting time on ineffective AI use",
        "Missing opportunities for automation",
      ],
      afterTitle: "After Workflow Analysis",
      afterItems: [
        "Documented AI adoption strategy and roadmap",
        "Team knows exactly which tools to use",
        "Focused on high-impact applications",
        "AI integrated into daily workflows",
      ],
    },
    training: {
      title: "Hands-On AI Training Workshops",
      description:
        "Interactive workshops using your actual work scenarios—not generic theory or examples.",
      beforeTitle: "Traditional AI Training",
      beforeItems: [
        "Generic examples that don't apply",
        "Theory-heavy with little practice",
        "No follow-up support after training",
        "Team struggles to apply learnings",
      ],
      afterTitle: "Practical Workshop Approach",
      afterItems: [
        "Training with real work scenarios",
        "Hands-on practice during session",
        "Follow-up materials and support",
        "Team confident applying AI daily",
      ],
    },
    implementation: {
      title: "AI Tool Implementation & Setup",
      description:
        "Get the right AI tools configured and integrated into your existing workflows and systems.",
      beforeTitle: "Without Expert Guidance",
      beforeItems: [
        "Choosing wrong tools for needs",
        "Complex setup and configuration",
        "Poor integration with workflows",
        "Low adoption due to friction",
      ],
      afterTitle: "With Expert Implementation",
      afterItems: [
        "Right tools for your specific use cases",
        "Properly configured and optimized",
        "Integrated into existing workflows",
        "Team actively using AI daily",
      ],
    },
  },

  // Benefits Section
  benefits: [
    {
      title: "Hands-On, Real Scenarios",
      description:
        "Interactive training using actual work from your business—not generic examples or theoretical concepts.",
    },
    {
      title: "High-Impact Focus",
      description:
        "Target areas where AI excels: documentation generation, test case creation, code assistance, and knowledge base development.",
    },
    {
      title: "Workflow Analysis Included",
      description:
        "I'll analyze your team's workflows to identify where AI adoption will deliver the biggest productivity improvements.",
    },
  ],

  expertiseBadge: {
    title: "Practical AI Implementation",
    description:
      "Focus on proven AI applications with training materials and follow-up support for sustainable adoption.",
  },

  // What I Offer / How It Works
  whatIOffer: [
    "Hands-on training workshops using real work scenarios from your business",
    "Workflow analysis to identify high-impact AI opportunities",
    "Practical focus on areas where AI excels: documentation, testing, code assistance",
    "Tool selection, setup, and integration with existing workflows",
    "Follow-up support materials and documentation for ongoing adoption",
  ],

  howItWorks: [
    "Free consultation to understand your team's needs and pain points",
    "Fixed-fee proposal based on workshop scope and estimated hours",
    "Interactive workshops with hands-on training using actual work scenarios",
    "Tool implementation and configuration guidance for your team",
    "Follow-up support materials and documentation for sustainable AI adoption",
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "idevelop.tech",
        url: "https://idevelop.tech",
        logo: "/images/brand/logo-black.png",
        description:
          "Leveraged AI tools to assist with the creation of idevelop.tech website",
      },
    ],
    testimonial: {
      quote:
        "Matt showed us practical tactics we can use to leverage AI and improve our developer operations.",
      author: "Developer",
      role: "Engineer at Private Company",
    },
  },

  // CTA Section
  cta: {
    title: "Ready to Empower Your Team with AI?",
    subtitle:
      "Let's discuss how hands-on AI training can improve your team's workflows and productivity.",
    buttonText: "Schedule a Free Consultation",
  },
};
