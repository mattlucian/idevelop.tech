<script setup lang="ts">
import {
  ArrowPathIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleAiChecks from "../../article/ArticleAiChecks.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const notes = ["Returns within 30 days", "Receipt needed", "Sale items final"];

const checks = [
  {
    source: "Writing instructions",
    icon: DocumentTextIcon,
    finding: "Friendly tone, short sentences",
  },
  {
    source: "Store policies",
    icon: BookOpenIcon,
    finding: "Gift receipts already get store credit",
  },
];
</script>

<template>
  <ArticleFigure
    title="AI turns rough notes into a first draft"
    subtitle="Example: a store's return policy"
    ai-legend
  >
    <div class="space-y-2">
      <ArticleScenarioBox label="Owner's rough notes" :icon="UserIcon">
        <ul class="list-inside list-disc space-y-0.5 text-xs text-slate-300">
          <li v-for="note in notes" :key="note">{{ note }}</li>
        </ul>
      </ArticleScenarioBox>
      <FlowArrow size="sm" vertical />
      <ArticleAiChecks
        label="AI draws on centralized knowledge"
        :checks="checks"
      />
      <FlowArrow size="sm" vertical />
      <div class="grid gap-2 sm:grid-cols-2">
        <ArticleScenarioBox tone="ai" label="AI draft">
          <span class="block text-xs">
            "Items can be returned within 30 days with a receipt. Gift receipts
            get store credit. Sale items are final."
          </span>
          <span class="mt-2 block text-xs text-purple-300">
            Asks: "Do online orders follow the same 30 days?"
          </span>
        </ArticleScenarioBox>
        <ArticleScenarioBox tone="person" label="Owner" :icon="UserIcon">
          <span class="text-xs">
            Answers the question, adds a line about online orders, and posts the
            policy
          </span>
        </ArticleScenarioBox>
      </div>
    </div>
    <p
      class="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      An edit that applies every time goes into the instructions
    </p>
  </ArticleFigure>
</template>
