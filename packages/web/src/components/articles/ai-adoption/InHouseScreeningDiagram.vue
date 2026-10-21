<script setup lang="ts">
import { LockClosedIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleCycle from "../../article/ArticleCycle.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const build = [
  {
    actor: "person" as const,
    who: "Coordinator",
    text: "Writes down each study's criteria",
  },
  {
    actor: "ai" as const,
    text: "Drafts the screening script",
  },
  {
    actor: "ai" as const,
    text: "Creates made-up applicants, including edge cases",
    quote: "Test applicant aged exactly 55",
  },
  {
    actor: "ai" as const,
    text: "Points out where the criteria are unclear",
    quote: "Is the age limit 18 to 55 inclusive?",
  },
  {
    actor: "person" as const,
    who: "Coordinator",
    text: "Clarifies the criteria",
    quote: "Inclusive: 55 qualifies",
  },
  {
    actor: "person" as const,
    who: "Technical employee",
    text: "Tests the script and installs it on the lab's systems",
  },
];

const application = [
  { label: "Age", value: "61" },
  { label: "Diagnosis", value: "Asthma" },
  { label: "Medications", value: "Daily inhaler" },
];

const results = [
  { label: "Study A", value: "May qualify" },
  { label: "Study B", value: "Ruled out by age" },
];
</script>

<template>
  <ArticleFigure
    title="AI builds an in-house screening script"
    subtitle="Example: built with made-up applicants, run on real ones"
    ai-legend
  >
    <div class="space-y-6">
      <ArticleCycle
        label="Building it with made-up records"
        :steps="build"
        loop="New edge cases found in testing go back to step 3"
      />
      <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
        <p
          class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400"
        >
          <LockClosedIcon class="h-3.5 w-3.5" />
          Each time it runs, on the lab's own systems · no AI model involved
        </p>
        <div
          class="flex flex-col items-stretch gap-2 md:flex-row md:items-center"
        >
          <ArticleScenarioBox
            label="New application"
            :fields="application"
            class="flex-1 md:basis-0"
          />
          <FlowArrow size="sm" />
          <ArticleScenarioBox
            label="Script results"
            :fields="results"
            class="flex-1 md:basis-0"
          />
          <FlowArrow size="sm" />
          <ArticleScenarioBox tone="person" class="flex-1 md:basis-0">
            <span class="block text-center">
              Coordinator reviews before contacting the candidate
            </span>
          </ArticleScenarioBox>
        </div>
      </div>
    </div>
  </ArticleFigure>
</template>
