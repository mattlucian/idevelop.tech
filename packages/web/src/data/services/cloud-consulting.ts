import type { CloudConsultingServiceData } from "@/types/service";

export const cloudConsultingServiceData: CloudConsultingServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Cloud & Infrastructure Consulting" },
  ],

  // Hero Section
  hero: {
    title: "Navigate the Cloud with Expert AWS Guidance",
    subtitle:
      "Practical AWS consulting for cost optimization, migration planning, and architecture reviews without hiring a full-time cloud team.",
    colorScheme: "cyan",
  },

  // Tab Configuration
  tabs: [
    { id: "strategy", label: "Cloud Strategy" },
    { id: "migration", label: "Migration Path" },
    { id: "optimization", label: "Cost Optimization" },
  ],

  // Benefits Section
  benefits: [
    {
      title: "7+ Years AWS Expertise",
      description:
        "Deep experience with EC2, ECS, Lambda, RDS, S3, VPC security, IAM policies, and CloudWatch monitoring.",
    },
    {
      title: "Cost Optimization Expertise",
      description:
        "Identify waste, implement Reserved Instances and Savings Plans, configure auto-scaling without sacrificing performance.",
    },
    {
      title: "Low-Risk Migration Planning",
      description:
        "Cloud migration planning with clear rollback strategies, thorough testing, and monitoring setup.",
    },
  ],

  expertiseBadge: {
    title: "Supporting Millions of Daily Operations",
    description:
      "7+ years architecting and optimizing AWS infrastructure for high-traffic eCommerce platforms.",
  },

  // What I Offer / How It Works
  whatIOffer: [
    "7+ years AWS expertise across compute, storage, networking, and security services",
    "Cloud migration support with minimal downtime and clear rollback strategies",
    "Architecture reviews covering security, performance, disaster recovery, and compliance",
    "Cost optimization through resource audits, Reserved Instances, and auto-scaling configuration",
  ],

  howItWorks: [
    "Free consultation to assess your current infrastructure and cloud goals",
    "Fixed-fee proposal based on scope (architecture review, migration, or optimization)",
    "Regular updates with architecture diagrams, recommendations, and progress reports",
    "Documentation and knowledge transfer for projects over 10 hours",
  ],

  // Portfolio Section
  portfolio: {
    title: "Cloud Infrastructure Experience",
    items: [
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        logo: "/images/partners/flxpoint-logo-dark.png",
        description:
          "AWS infrastructure supporting millions of daily eCommerce operations",
      },
      {
        name: "Inventory Source",
        url: "https://inventorysource.com",
        logo: "/images/partners/inventorysource.gif",
        description: "Cloud-based eCommerce automation platform on AWS",
      },
    ],
    testimonial: {
      quote:
        "Matt was able to help us accelerate our roadmap by efficiently executing on multiple supplier integrations!",
      author: "Travis",
      role: "CEO at Flxpoint",
    },
  },

  // CTA Section
  cta: {
    title: "Ready to Optimize Your Cloud Infrastructure?",
    subtitle:
      "Let's discuss your AWS needs and how I can help reduce costs, improve performance, and support your cloud goals.",
    buttonText: "Schedule a Free Consultation",
  },

  // Cloud Journey Visualizations
  cloudJourneys: {
    strategy: {
      title: "Cloud Adoption Journey",
      steps: [
        {
          icon: "🔍",
          label: "Assess",
          description:
            "Review current infrastructure, workload requirements, and cloud readiness",
        },
        {
          icon: "📋",
          label: "Plan",
          description:
            "Design cloud architecture, select services, and create migration roadmap",
        },
        {
          icon: "🚀",
          label: "Deploy",
          description:
            "Execute migration with minimal downtime and thorough testing",
        },
        {
          icon: "📈",
          label: "Optimize",
          description:
            "Monitor costs, right-size resources, and implement ongoing improvements",
        },
      ],
    },
    migration: {
      title: "Low-Risk Migration Process",
      steps: [
        {
          icon: "📊",
          label: "Inventory",
          description: "Map dependencies, data flows, and integration points",
        },
        {
          icon: "🧪",
          label: "Test Environment",
          description:
            "Set up AWS infrastructure and validate application compatibility",
        },
        {
          icon: "🔄",
          label: "Phased Migration",
          description: "Move workloads in waves with clear rollback strategies",
        },
        {
          icon: "✅",
          label: "Validation",
          description:
            "Performance testing, monitoring setup, and team training",
        },
      ],
    },
    optimization: {
      title: "Cost Optimization Framework",
      steps: [
        {
          icon: "🔎",
          label: "Audit",
          description:
            "Identify unused resources, oversized instances, and inefficient patterns",
        },
        {
          icon: "💡",
          label: "Recommendations",
          description:
            "Reserved Instances, Savings Plans, auto-scaling, and service alternatives",
        },
        {
          icon: "⚙️",
          label: "Implementation",
          description:
            "Apply optimizations with validation testing to ensure performance",
        },
        {
          icon: "📉",
          label: "Monitor",
          description:
            "Continuous cost tracking, alerts, and monthly optimization reviews",
        },
      ],
    },
  },
};
