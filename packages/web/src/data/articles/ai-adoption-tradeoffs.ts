import type { ArticleTradeoffs } from "@/types/article";

export const assistantTradeoffs: ArticleTradeoffs = {
  title: "Benefits and challenges of AI drafts",
  benefits: [
    {
      label: "Quick first drafts",
      detail:
        "AI can summarize information and turn rough notes into drafts or answers very quickly.",
    },
    {
      label: "Easy to start",
      detail:
        "A person can start with a ChatGPT or Claude account without changing any business process.",
    },
    {
      label: "Useful in any role",
      detail:
        "Staff can use it for writing, research, and summaries, whatever their job.",
    },
  ],
  challenges: [
    {
      label: "Inaccurate information",
      detail:
        "AI may be trained on outdated information, over-simplify a nuanced topic, or hallucinate.",
      cite: 6,
    },
    {
      label: "Every user becomes a reviewer",
      detail:
        'The person using AI must verify its claims, and may lack the expertise to do so or begin to experience "automation complacency" over time.',
      cite: 7,
    },
    {
      label: "Corrections stay with one person",
      detail:
        "Unless a correction is shared, other team members may get the same incorrect result in the future.",
    },
  ],
};

export const builderTradeoffs: ArticleTradeoffs = {
  title: "Benefits and challenges of AI-built automations",
  benefits: [
    {
      label: "Consistent results",
      detail:
        "The automation follows the same steps every time, so its results don't vary the way an AI model's answers can.",
    },
    {
      label: "Predictable cost",
      detail:
        "The automation runs without calling an AI model, so there's no token cost on each run. In my experience, unexpected usage costs are one of the most common surprises for businesses running AI in their processes.",
    },
    {
      label: "Data privacy",
      detail:
        "AI can help build the automation using test data, so sensitive data doesn't need to reach an AI model and the automation can run within your private network.",
    },
  ],
  challenges: [
    {
      label: "Rules have to be defined",
      detail:
        "Cases that staff handle from memory, or that go unhandled, have to be defined before the automation can follow them.",
    },
    {
      label: "Technical upkeep",
      detail:
        "Someone has to build, test, and update the automation, usually a technical employee or contractor.",
    },
    {
      label: "New scenarios",
      detail:
        "Situations the rules don't cover will come up after launch and need to be added.",
    },
  ],
};

export const teammateTradeoffs: ArticleTradeoffs = {
  title: "Benefits and challenges of AI interpretation",
  benefits: [
    {
      label: "Help where rules fall short",
      detail:
        "AI can interpret free-form requests, so processes that can't be fully automated still get help.",
    },
    {
      label: "Enriched context",
      detail:
        "AI can gather related information from other systems and add it to the work item, so people spend less time searching.",
    },
    {
      label: "Faster common cases",
      detail:
        "For routine items, AI's recommendation may already be right, so staff can confirm it and save their attention for unusual cases.",
    },
  ],
  challenges: [
    {
      label: "Results can vary",
      detail:
        "The same input can lead to a different interpretation each time the process runs.",
    },
    {
      label: "Costs grow with volume",
      detail:
        "AI runs on every item, so token use rises with the amount of work.",
    },
    {
      label: "Data reaches the AI model",
      detail:
        "Each item's content is sent to an AI model unless the sensitive parts are removed first.",
    },
  ],
};

export const operatorTradeoffs: ArticleTradeoffs = {
  title: "Benefits and challenges of AI decisions",
  benefits: [
    {
      label: "No waiting on approvals",
      detail:
        "Routine decisions are handled as work comes in, so high-volume tasks don't queue up for a person.",
    },
    {
      label: "Staff focus on exceptions",
      detail: "People spend their time on the cases the rules don't cover.",
    },
    {
      label: "Rules improve over time",
      detail: "Escalated cases show where the written rules need work.",
    },
  ],
  challenges: [
    {
      label: "Mistakes go unnoticed",
      detail:
        "With no one approving each decision, a mistake can reach a customer or another system before anyone notices.",
    },
    {
      label: "Results still can vary",
      detail:
        "Even stable rules can encounter unknowns and produce different outcomes than expected.",
    },
    {
      label: "Costs still can be hard to predict",
      detail: "Token use depends on how much work each decision takes.",
    },
  ],
};
