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
      name: "Return Only What's Needed",
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
      name: "Aggregate on the Server",
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
      name: "Act in Bulk",
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
        logo: "/images/partners/flxpoint-logo-dark.png",
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
    title: "Ready to Open Your Platform to AI Agents?",
    subtitle:
      "Let's talk about what your customers want agents to do and what an MCP server for your platform would need.",
    buttonText: "Schedule a Free Consultation",
  },
};
