<script setup lang="ts">
import {
  ArrowPathIcon,
  BeakerIcon,
  DocumentTextIcon,
  LockClosedIcon,
  NoSymbolIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleAiChecks from "../../article/ArticleAiChecks.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const removed = ["Name", "Phone", "Address"];

const kept = [
  { label: "Age", value: "47" },
  { label: "History", value: "Asthma, stable on one inhaler for 3 years" },
];

const checks = [
  {
    source: "Open studies",
    icon: BeakerIcon,
    finding: "Study C needs asthma that is well controlled",
  },
  {
    source: "History notes",
    icon: DocumentTextIcon,
    finding: "Stable for 3 years with no emergency visits",
  },
  {
    source: "Exclusions",
    icon: NoSymbolIcon,
    finding: "No medications that rule out Study C",
  },
];

const recommendation = [
  { label: "Study C", value: "May fit" },
  { label: "Reason", value: "Condition described as well controlled" },
];
</script>

<template>
  <ArticleFigure
    title="AI reads the medical facts without the applicant's identity"
    subtitle="Example: one new application"
    ai-legend
  >
    <div class="space-y-2">
      <ArticleScenarioBox
        label="In-house script removes identifying details"
        :icon="LockClosedIcon"
      >
        <dl class="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          <div
            v-for="field in removed"
            :key="field"
            class="flex items-center justify-between gap-3"
          >
            <dt class="text-xs text-slate-500">{{ field }}</dt>
            <dd
              class="h-2.5 w-20 rounded-sm bg-slate-600"
              aria-label="Removed"
            />
          </div>
          <div
            v-for="field in kept"
            :key="field.label"
            class="flex justify-between gap-3"
          >
            <dt class="shrink-0 text-xs text-slate-500">{{ field.label }}</dt>
            <dd class="text-right text-xs text-slate-200">{{ field.value }}</dd>
          </div>
        </dl>
      </ArticleScenarioBox>
      <FlowArrow size="sm" vertical />
      <ArticleAiChecks
        label="AI compares the record with each study"
        :checks="checks"
      />
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox
        tone="ai"
        label="AI recommends"
        :fields="recommendation"
      />
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox tone="person" label="Coordinator" :icon="UserIcon">
        <span class="text-xs">Decides whether to contact the candidate</span>
      </ArticleScenarioBox>
    </div>
    <p
      class="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      Coordinator corrections refine AI's instructions
    </p>
  </ArticleFigure>
</template>
