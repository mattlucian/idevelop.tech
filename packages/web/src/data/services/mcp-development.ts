import { partnerLogo } from "@/utils/imageAssets";
import type { McpDevelopmentServiceData } from "@/types/service";

export const mcpDevelopmentServiceData: McpDevelopmentServiceData = {
  // Navigation
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "MCP Server Development" },
  ],

  // Hero Section
  hero: {
    title: "Let Your Customers Use Your Platform Through AI Agents",
    subtitle:
      "An MCP (Model Context Protocol) server lets your customers connect Claude, ChatGPT, and other AI agents to their account on your platform, built on the API you already have.",
    colorScheme: "cyan",
  },

  // Example request patterns for optimizing agent access
  requestPatterns: [
    {
      name: "Filtered Searches",
      question: "Is anything stuck? What's been waiting the longest?",
      code: `search:
  domain:  orders
  columns: order_number, supplier, ordered_at, error
  filters: status = awaiting_shipment
           ordered_at before 5 days ago
  limit:   25`,
      insteadOf: "Pages of full order records",
      result: "25 rows, 4 fields",
      color: "cyan",
    },
    {
      name: "Summaries Calculated on the Server",
      question: "Which suppliers ship late most often?",
      code: `analyze:
  domain:     shipments
  metrics:    count(*), rate(is_late), avg(days_to_ship)
  dimensions: supplier
  filters:    status = shipped`,
      insteadOf: "Exporting shipments and running a script",
      result: "One summary row per supplier",
      color: "purple",
    },
    {
      name: "Bulk Actions",
      question:
        "Pause listings from that supplier while we sort out the problem.",
      code: `act:
  domain:         listings
  action:         pause
  filters:        supplier = "Acme Supply"
                  status = active
  expected_count: 42`,
      insteadOf: "42 separate API calls",
      result: "One request, checked against the expected count",
      color: "emerald",
    },
  ],

  // Portfolio Section
  portfolio: {
    title: "Recent Client Work",
    items: [
      {
        name: "Flxpoint",
        url: "https://flxpoint.com",
        ...partnerLogo("flxpoint-logo-dark.png"),
        description:
          "Planned and led development of the MCP server that lets Flxpoint customers connect AI agents to their operations data and actions",
      },
    ],
    testimonial: {
      quote:
        "What you've done here is well above and beyond what we were expecting. It's set us up for future growth.",
      author: "Brad",
      role: "Chief Architect at Flxpoint",
    },
  },

  // CTA Section
  cta: {
    title: "Get Help Building an MCP Server",
    subtitle:
      "Let's talk about your platform and what your customers want to do with AI agents.",
    buttonText: "Schedule a Free Consultation",
  },
};
