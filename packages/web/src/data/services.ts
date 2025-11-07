import type { ServicesConfig } from "@/types/tech";

export const servicesConfig: ServicesConfig = {
  serviceCards: [
    {
      name: "tech-admin",
      path: "tech-admin.json",
      icon: "🔧",
      label: "Tech Admin",
      title: "Tech Admin",
      tagline: "Expert tech guidance without the full-time cost",
      stats: [
        { value: "Expert", label: "On Retainer" },
        { value: "Affordable", label: "Access" },
        { value: "Quick", label: "Implementation" },
      ],
      tags: ["Tech Support", "Documentation", "Automation"],
      borderColor: "border-l-cyan-600 hover:border-l-cyan-500",
      bgColor: "bg-cyan-500/10",
      visualStyle: "minimalist-icon",
      heroImage:
        "https://images.unsplash.com/photo-1581089781785-603411fa81e5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "integration",
      path: "integration.json",
      icon: "🔗",
      label: "Integration",
      title: "Integration Services",
      tagline: "Connect your systems and eliminate manual data entry",
      stats: [
        { value: "Seamless", label: "Connectivity" },
        { value: "Automated", label: "Data Flow" },
        { value: "Custom", label: "Solutions" },
      ],
      tags: ["API", "Data Sync", "Data Mapping"],
      borderColor: "border-l-cyan-500 hover:border-l-cyan-400",
      bgColor: "bg-cyan-500/10",
      visualStyle: "minimalist-icon",
      heroImage:
        "https://images.unsplash.com/photo-1707733260992-73ff6dbed163?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "ecommerce-ops",
      path: "ecommerce-ops.json",
      icon: "🛒",
      label: "eCommerce Ops",
      title: "eCommerce Operations",
      tagline: "Automate and optimize your online store systems",
      stats: [
        { value: "Automated", label: "Workflows" },
        { value: "Distributed", label: "Ordering" },
        { value: "Synced", label: "Inventory" },
      ],
      tags: ["App Integration", "Order Routing", "Inventory Sync"],
      borderColor: "border-l-green-400 hover:border-l-green-300",
      bgColor: "bg-green-400/10",
      visualStyle: "minimalist-icon",
      heroImage:
        "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "ai-enablement",
      path: "ai-enablement.json",
      icon: "🤖",
      label: "AI Enablement",
      title: "AI Enablement",
      tagline:
        "Empower your team with practical AI training and implementation",
      stats: [
        { value: "Hands-on", label: "Workshops" },
        { value: "Workflow", label: "Analysis" },
        { value: "Practical", label: "Implementation" },
      ],
      tags: ["AI Training & Tools", "Team Workshops", "Process Improvement"],
      borderColor: "border-l-purple-400 hover:border-l-purple-300",
      bgColor: "bg-purple-400/10",
      visualStyle: "minimalist-icon",
      heroImage:
        "https://images.unsplash.com/photo-1718241905559-f76f2718ddc1?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "web-design",
      path: "web-design.json",
      icon: "🎨",
      label: "Web Design",
      title: "Web Design",
      tagline: "Professional websites that drive real business results",
      stats: [
        { value: "Custom", label: "Design" },
        { value: "Conversion", label: "Focused" },
        { value: "Mobile", label: "Optimized" },
      ],
      tags: ["Shopify", "WordPress", "UX/UI"],
      borderColor: "border-l-cyan-400 hover:border-l-cyan-300",
      bgColor: "bg-cyan-400/10",
      visualStyle: "minimalist-icon",
      heroImage:
        "https://images.unsplash.com/photo-1542744173-b3cd6377db95?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "cloud-consulting",
      path: "cloud-consulting.json",
      icon: "☁️",
      label: "Cloud Consulting",
      title: "Cloud Computing Consultations",
      tagline:
        "Expert cloud guidance for your business without enterprise costs",
      stats: [
        { value: "AWS", label: "Expert" },
        { value: "Cost", label: "Optimized" },
        { value: "Scalable", label: "Solutions" },
      ],
      tags: ["AWS", "Migration", "Cost Optimization"],
      borderColor: "border-l-cyan-300 hover:border-l-cyan-200",
      bgColor: "bg-cyan-300/10",
      visualStyle: "minimalist-icon",
      heroImage:
        "https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&auto=format&fit=crop&q=80",
    },
  ],
  expertisePhrases: [
    "managing your tech stack",
    "integrating your systems",
    "AI training & adoption",
    "eCommerce automation",
    "building your website",
    "cloud infrastructure",
  ],
};
