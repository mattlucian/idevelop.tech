<script setup lang="ts">
import {
  ArrowPathIcon,
  BriefcaseIcon,
  BugAntIcon,
  CodeBracketIcon,
  InboxIcon,
  UserIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleAiChecks from "../../article/ArticleAiChecks.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const checks = [
  {
    source: "Support inbox",
    icon: InboxIcon,
    finding: "3 similar emails this week, all from Safari users",
  },
  {
    source: "Issue tracker",
    icon: BugAntIcon,
    finding: "A bug from March: export fails in Safari, marked fixed",
  },
  {
    source: "CRM",
    icon: BriefcaseIcon,
    finding: "One affected customer renews next month",
  },
];

const ticketNotes = [
  { label: "Likely cause", value: "The March Safari bug is back" },
  { label: "Affected", value: "3 customers, 1 renewing soon" },
  { label: "Summary", value: "Export fails in Safari" },
];
</script>

<template>
  <ArticleFigure
    title="AI gathers context for each new ticket"
    subtitle="Example: a one-line bug report"
    ai-legend
  >
    <div class="space-y-2">
      <ArticleScenarioBox label="Support rep logs a ticket" :icon="UserIcon">
        "Export button does nothing"
      </ArticleScenarioBox>
      <FlowArrow size="sm" vertical />
      <ArticleAiChecks
        label="AI looks for related information"
        :checks="checks"
      />
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox
        tone="ai"
        label="AI adds its findings to the ticket"
        :fields="ticketNotes"
      />
      <FlowArrow size="sm" vertical />
      <div class="grid gap-2 sm:grid-cols-2">
        <ArticleScenarioBox
          tone="person"
          label="Product owner"
          :icon="ClipboardDocumentListIcon"
        >
          <span class="text-xs">
            Moves the fix into this sprint because of the renewal
          </span>
        </ArticleScenarioBox>
        <ArticleScenarioBox
          tone="person"
          label="Developer"
          :icon="CodeBracketIcon"
        >
          <span class="text-xs">
            Starts from the March fix instead of from scratch
          </span>
        </ArticleScenarioBox>
      </div>
    </div>
    <p
      class="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      Notes on what was missing or unhelpful refine AI's instructions
    </p>
  </ArticleFigure>
</template>
