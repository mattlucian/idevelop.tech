<script setup lang="ts">
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleAiChecks from "../../article/ArticleAiChecks.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const checks = [
  {
    source: "Study protocol",
    icon: DocumentTextIcon,
    finding: "Eligibility rules spread across pages 12, 31, and 47",
  },
  {
    source: "Team instructions",
    icon: ClipboardDocumentCheckIcon,
    finding: "Every summary uses the same three sections",
  },
];

const sections = [
  { label: "Who qualifies", value: "Ages 18–55, type 2 diabetes" },
  { label: "Who doesn't", value: "Kidney disease, pregnancy" },
  { label: "Medications", value: "No insulin in the past year" },
];
</script>

<template>
  <ArticleFigure
    title="Instructions give every study summary the same sections"
    subtitle="Example: an 80-page protocol becomes a short summary"
    ai-legend
  >
    <div class="space-y-2">
      <ArticleScenarioBox
        label="Coordinator shares a new protocol"
        :icon="UserIcon"
      >
        <span class="text-xs">
          Describes the study, not any participant, so no candidate information
          is shared
        </span>
      </ArticleScenarioBox>
      <FlowArrow size="sm" vertical />
      <ArticleAiChecks label="AI reads" :checks="checks" />
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox
        tone="ai"
        label="AI's eligibility summary"
        :fields="sections"
      />
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox tone="person" label="Study lead" :icon="UserIcon">
        <span class="text-xs">
          Checks the summary against the protocol before the team uses it
        </span>
      </ArticleScenarioBox>
    </div>
  </ArticleFigure>
</template>
