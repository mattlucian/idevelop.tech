<script setup lang="ts">
import { DocumentTextIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const sections = [
  { heading: "Who qualifies", line: "Age range and required diagnoses" },
  { heading: "Who doesn't", line: "Conditions that rule a candidate out" },
  { heading: "Medications", line: "Medications that rule a candidate out" },
];
</script>

<template>
  <ArticleFigure
    title="Shared instructions give every study summary the same sections"
    ai-legend
  >
    <div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <div
        class="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-4 text-center text-sm text-slate-200 md:basis-0"
      >
        <DocumentTextIcon class="h-8 w-8 text-slate-500" />
        Long study protocol
        <span class="text-xs text-slate-500">No candidate information</span>
      </div>
      <FlowArrow size="sm" />
      <div
        class="flex flex-1 items-center justify-center rounded-lg border border-purple-500/50 bg-purple-500/15 px-3 py-4 text-center text-sm text-purple-100 md:basis-0"
      >
        AI summarizes using the shared format
      </div>
      <FlowArrow size="sm" />
      <div
        class="flex-[1.4] rounded-lg border border-slate-700 bg-slate-800/40 p-3 text-sm md:basis-0"
      >
        <p
          class="text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Eligibility summary
        </p>
        <dl class="mt-2 space-y-2">
          <div v-for="section in sections" :key="section.heading">
            <dt class="text-slate-200">{{ section.heading }}</dt>
            <dd class="text-xs text-slate-400">{{ section.line }}</dd>
          </div>
        </dl>
        <p class="mt-3 border-t border-slate-700 pt-2 text-xs text-slate-500">
          Checked against the protocol by the study lead
        </p>
      </div>
    </div>
  </ArticleFigure>
</template>
