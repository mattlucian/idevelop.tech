import { partnerLogo } from "@/utils/imageAssets";
import type { CloudConsultingServiceData } from "@/types/service";

export const cloudConsultingServiceData: CloudConsultingServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Cloud & Infrastructure Consulting" },
  ],

  // Hero Section
  hero: {
    title: "Get More From Your AWS Spend",
    subtitle:
      "AWS reviews focused on lowering your bill, keeping it predictable, and improving performance, with each recommendation ranked by impact.",
    colorScheme: "cyan",
  },

  // What each engagement delivers
  deliverables: [
    {
      icon: "DocumentTextIcon",
      title: "Ranked findings",
      desc: "Each with the change and its estimated impact",
    },
    {
      icon: "ChartBarIcon",
      title: "Cost and performance baseline",
      desc: "Today's numbers, so results can be measured",
    },
    {
      icon: "WrenchScrewdriverIcon",
      title: "Implementation (optional)",
      desc: "Implemented and tested, or handed to your team",
    },
    {
      icon: "CheckCircleIcon",
      title: "Before-and-after summary",
      desc: "What changed, and its effect on cost and performance",
    },
  ],

  // AWS services grouped by area
  awsServices: [
    { area: "Compute", services: ["EC2", "ECS", "Fargate", "Lambda"] },
    { area: "Data", services: ["RDS", "Aurora", "DynamoDB", "S3"] },
    { area: "Network", services: ["VPC", "Route 53", "CloudFront", "IAM"] },
    {
      area: "Operations",
      services: [
        "CloudWatch",
        "Cost Explorer",
        "CloudFormation",
        "CodePipeline",
      ],
    },
    {
      area: "Messaging",
      services: ["SNS", "SQS", "ElastiCache", "Secrets Manager"],
    },
  ],

  // Portfolio Section
  portfolio: {
    title: "Cloud Infrastructure Experience",
    items: [
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        ...partnerLogo("flxpoint-logo-dark.png"),
        description:
          "AWS infrastructure supporting millions of daily eCommerce operations",
      },
      {
        name: "Inventory Source",
        url: "https://inventorysource.com",
        ...partnerLogo("inventorysource.gif"),
        description: "Cloud-based eCommerce automation platform on AWS",
      },
      {
        name: "Lifestyle Laundry Club",
        url: "https://lifestylelaundryclub.com",
        ...partnerLogo("llc-logo.png"),
        description:
          "Built and deployed a pickup and delivery app for local laundry customers on AWS",
      },
      {
        name: "Mr. Mochas Pet Supplies",
        url: "https://mrmochaspet.com",
        ...partnerLogo("mrmochas-dark-logo.png"),
        description: "AWS hosting and infrastructure for a pet supply retailer",
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
    title: "Want a Second Look at Your AWS Account?",
    subtitle:
      "Let's talk about what you're running, what it costs, and where performance falls short.",
    buttonText: "Schedule a Free Consultation",
  },
};
