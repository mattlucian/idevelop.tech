<script setup lang="ts">
import {
  ArrowPathIcon,
  BookOpenIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleAiChecks from "../../article/ArticleAiChecks.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const changes = [
  "Fix CSV export in Safari",
  "Sync interval set to 15 minutes",
  "Refactor job queue",
];

const checks = [
  {
    source: "Product documentation",
    icon: BookOpenIcon,
    finding: "Customers know the sync feature as “Data sync”",
  },
  {
    source: "Writing instructions",
    icon: DocumentTextIcon,
    finding: "Plain language, leave out internal changes",
  },
];
</script>

<template>
  <ArticleFigure
    title="AI drafts release notes from the team's centralized knowledge"
    subtitle="Example: one release's code changes"
    ai-legend
  >
    <div class="space-y-2">
      <ArticleScenarioBox
        label="Developer asks for release notes"
        :icon="CodeBracketIcon"
      >
        <ul class="list-inside list-disc space-y-0.5 text-xs text-slate-300">
          <li v-for="change in changes" :key="change">{{ change }}</li>
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
            "Data sync now runs every 15 minutes. Exporting to CSV works again
            in Safari."
          </span>
          <span class="mt-2 block text-xs text-purple-300">
            Asks: "The documentation still says data syncs every hour. Should it
            be updated?"
          </span>
        </ArticleScenarioBox>
        <ArticleScenarioBox
          tone="person"
          label="Developer"
          :icon="CodeBracketIcon"
        >
          <span class="text-xs">
            Checks each item, corrects the documentation, and publishes the
            notes
          </span>
        </ArticleScenarioBox>
      </div>
    </div>
    <p
      class="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      Edits to the format go into the writing instructions
    </p>
  </ArticleFigure>
</template>
