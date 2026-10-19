import { markRaw } from "vue";
import type { ArticleExampleItem } from "@/types/article";
// Vue SFCs synthesize the default export at compile time; DeepSource's JS analyzer can't see it
// skipcq: JS-W1028
import PurchaseOrderDiagram from "@/components/articles/ai-adoption/PurchaseOrderDiagram.vue";
// skipcq: JS-W1028
import TicketIntakeDiagram from "@/components/articles/ai-adoption/TicketIntakeDiagram.vue";
// skipcq: JS-W1028
import ScheduledChecksDiagram from "@/components/articles/ai-adoption/ScheduledChecksDiagram.vue";
// skipcq: JS-W1028
import PaybackChart from "@/components/articles/ai-adoption/PaybackChart.vue";
// skipcq: JS-W1028
import DraftingDiagram from "@/components/articles/ai-adoption/DraftingDiagram.vue";
// skipcq: JS-W1028
import SharedDocsDiagram from "@/components/articles/ai-adoption/SharedDocsDiagram.vue";
// skipcq: JS-W1028
import ProtocolSummaryDiagram from "@/components/articles/ai-adoption/ProtocolSummaryDiagram.vue";
// skipcq: JS-W1028
import InHouseScreeningDiagram from "@/components/articles/ai-adoption/InHouseScreeningDiagram.vue";
// skipcq: JS-W1028
import InventorySyncDiagram from "@/components/articles/ai-adoption/InventorySyncDiagram.vue";
// skipcq: JS-W1028
import MaintenanceTriageDiagram from "@/components/articles/ai-adoption/MaintenanceTriageDiagram.vue";
// skipcq: JS-W1028
import SupportChatbotDiagram from "@/components/articles/ai-adoption/SupportChatbotDiagram.vue";
// skipcq: JS-W1028
import StudyIntakeDiagram from "@/components/articles/ai-adoption/StudyIntakeDiagram.vue";
// skipcq: JS-W1028
import DeidentifiedScreeningDiagram from "@/components/articles/ai-adoption/DeidentifiedScreeningDiagram.vue";

export const assistantExamples: ArticleExampleItem[] = [
  {
    business: "Local Store",
    title: "Writing jobs that tend to get postponed",
    body: [
      {
        text: "Good first tasks for a local store are the writing jobs that tend to get postponed:",
      },
    ],
    list: [
      "Onboarding and training guides",
      "Store policies and procedures",
      "Descriptions for new products",
      "Replies to difficult supplier or customer emails",
    ],
    figures: [markRaw(DraftingDiagram)],
  },
  {
    business: "Tech Company",
    title: "One documentation fix reaches the support team",
    body: [
      {
        text: "At a tech company, a developer might find and fix an error in the documentation for an automated process. If the support team's AI assistant draws on the same documentation, the next answer it drafts about that process should reflect the fix.",
      },
    ],
    figures: [markRaw(SharedDocsDiagram)],
  },
  {
    business: "Research Lab",
    title: "Turning study protocols into eligibility summaries",
    body: [
      {
        text: "A research lab that runs clinical studies might receive a long protocol document for each new study, with the eligibility requirements spread across dozens of pages. Study coordinators could use an AI assistant to turn each protocol into a short summary of who qualifies, such as the age range, the required diagnoses, and the medications that rule a candidate out.",
      },
      {
        text: "A protocol describes the study rather than any participant, so coordinators can share these documents with an AI model without exposing candidate information. Shared instructions that set the summary's format give every coordinator summaries with the same sections, and the person who knows each study best checks its summary against the protocol before the team relies on it.",
      },
    ],
    figures: [markRaw(ProtocolSummaryDiagram)],
  },
];

export const builderExamples: ArticleExampleItem[] = [
  {
    business: "Local Store",
    title: "Reordering inventory",
    body: [
      {
        text: "A local store needs to reorder inventory regularly. In my experience, the forecasting and purchasing features in retail systems often miss the more nuanced situations like special orders, backordered items, and differences in supplier cost and timing. This generally leads to staff spending a large amount of time either assembling or correcting these orders by hand. By using AI in a builder capacity where it writes most of the code, the store's technical employee or contractor can build a reordering automation that accounts for these factors.",
      },
      {
        text: "After launch, staff can still override an order when a supplier is late or a seasonal item sells faster than expected, and those cases get added to the rules over time.",
      },
      {
        text: "Suppose staff spend about four hours every week building purchase orders. With the ordering rules written down, the store's technical employee or contractor might spend around ten hours working with AI to build the automation. If a person still spends about 30 minutes a week reviewing the orders, the store recovers those ten hours in about three weeks and saves roughly three and a half hours every week after that.",
      },
    ],
    figures: [markRaw(PurchaseOrderDiagram), markRaw(PaybackChart)],
  },
  {
    business: "Research Lab",
    title: "Screening applicants without sharing their records",
    body: [
      {
        text: "When candidates apply to a research lab, staff compare each applicant's medical history with the eligibility criteria of the open studies. Applicant records are sensitive, so the lab might not want them sent to an AI model at all.",
      },
      {
        text: "Instead, the lab's technical employee or contractor could use AI as a builder to write a screening script, using made-up applicant records to develop and test it. The script reads the relevant fields from each application, compares those fields with each study's written criteria, and lists the studies the applicant might qualify for along with the criteria that ruled out the rest. The script runs on the lab's own systems, so applicant information never reaches an AI model.",
      },
      {
        text: "Coordinators review the script's results before contacting candidates. When a protocol includes a requirement the script can't check, the team either writes that requirement into the criteria or keeps that check manual.",
      },
    ],
    figures: [markRaw(InHouseScreeningDiagram)],
  },
  {
    business: "Online Retailer",
    title: "Keeping inventory in sync between sales channels",
    body: [
      {
        text: "An online retailer that sells through its own store and a marketplace might update stock counts in both places by hand, which can lead to selling items that are already out of stock. With AI writing most of the code, a technical employee or contractor could build an integration that reads stock levels from the retailer's inventory system on a schedule and updates both channels.",
      },
      {
        text: "AI can also help work through details that each platform's documentation leaves to the reader, such as how bundles and product variants map between the two systems. Once built, the integration runs without calling an AI model, so a larger catalog doesn't add token costs.",
      },
    ],
    figures: [markRaw(InventorySyncDiagram)],
  },
];

export const teammateExamples: ArticleExampleItem[] = [
  {
    business: "Tech Company",
    title: "Matching new bug tickets to earlier reports",
    body: [
      {
        text: "At a tech company, a new bug ticket often starts with little more than a title and one line of description. Whoever picks it up may spend time working out whether the same problem has been reported before. An AI step could read the ticket as soon as it's created and look through the support inbox, past issues, and the backlog for earlier reports of the same problem, even when they use different words. It could then add the likely matches and a short summary to the ticket.",
      },
      {
        text: "Developers would still review the ticket and decide what to do, but the AI step could cut the time they spend searching. Half of developers surveyed said they lose 10 or more hours a week to non-coding tasks, and finding information was the top time-waster they named.",
        cite: 11,
      },
    ],
    figures: [markRaw(TicketIntakeDiagram)],
  },
  {
    business: "Research Lab",
    title: "Recommending studies for de-identified applicants",
    body: [
      {
        text: "A screening script works well for criteria with clear values, such as an age range. Other criteria are written in language a script can't apply reliably, such as a requirement that a condition be well controlled, or depend on notes in an applicant's history that need interpretation.",
      },
      {
        text: "A research lab could use AI as a builder again to create a step that removes names, contact details, and other identifying information from each new application, leaving the medical facts. The lab's privacy and compliance requirements set which details that step must remove. An AI step then reads the de-identified record alongside the open studies' criteria and recommends the studies the applicant may fit, with the reasons for each recommendation.",
      },
      {
        text: "Coordinators decide which candidates to contact. Because recommendations arrive as each application comes in, candidates are sorted into studies as they apply, instead of waiting for someone to work through the backlog on a set schedule.",
      },
    ],
    figures: [markRaw(DeidentifiedScreeningDiagram)],
  },
  {
    business: "Property Manager",
    title: "Sorting maintenance requests",
    body: [
      {
        text: "A property management company might receive maintenance requests by email, text message, and an online form, each written in the tenant's own words. One tenant reports water under the sink, and the tenant in the unit below writes that water is dripping from the kitchen ceiling. The two requests might describe the same leak.",
      },
      {
        text: "An AI step could read each new request, suggest the type of repair and how urgent the problem seems, and point out when a request might relate to another open request in the same building. The AI step could also draft a reply to the tenant. The maintenance coordinator reviews the suggestions, assigns the work, and approves the reply before it's sent.",
      },
    ],
    figures: [markRaw(MaintenanceTriageDiagram)],
  },
];

export const operatorExamples: ArticleExampleItem[] = [
  {
    business: "Online Retailer",
    title: "Scheduled checks on orders and listings",
    body: [
      {
        text: "An online retailer's technical employees can use AI to write down the rules the business uses to evaluate orders and listings, such as what counts as a late shipment, which order values need approval, and which problems need a person. An agent then reviews current orders and listings on a schedule. It applies the written rules and makes judgment calls that fixed rules handle poorly, such as whether a product description is incomplete or a customer's note signals a problem. Orders and listings that pass go through without individual review, and the agent sends the rest to staff.",
      },
      {
        text: "Ideally, most orders and listings pass, and staff focus on the few that don't.",
      },
    ],
    figures: [markRaw(ScheduledChecksDiagram)],
  },
  {
    business: "Tech Company",
    title: "A support chatbot",
    body: [
      {
        text: "A tech company's support chatbot might answer questions from the company's help content and let customers ask for a person at any time.",
      },
    ],
    figures: [markRaw(SupportChatbotDiagram)],
  },
  {
    business: "Research Lab",
    title: "Checking new study requests for missing information",
    body: [
      {
        text: "Organizations that want a research lab to recruit candidates for a study submit the study's details, and those submissions vary widely. Some arrive with clear eligibility criteria, while others leave out details the lab needs before it can screen anyone, such as age limits or the medications that rule a candidate out.",
      },
      {
        text: "An agent could review each new submission against a written checklist of the information the lab needs. Complete submissions move into the lab's intake queue. Incomplete submissions go back to the submitter with a list of the missing or unclear items and a request to provide them in a structured format. Study submissions don't include candidate records, so the agent never handles applicant information.",
      },
      {
        text: "The agent's decisions are small and easy to reverse, because a submission either moves forward or goes back with questions. Staff review a sample of accepted submissions and every case the agent can't decide, and those cases show where the checklist needs refinement.",
      },
    ],
    figures: [markRaw(StudyIntakeDiagram)],
  },
];
