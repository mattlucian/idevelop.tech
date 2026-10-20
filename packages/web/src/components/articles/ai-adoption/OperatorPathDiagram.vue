<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";

// Illustrative shares, labelled as an example in the figure
const stages = [
  {
    text: "AI recommends, and people make every decision",
    aiShare: 0,
    note: "People correct about 1 in 4 recommendations",
    role: "teammate",
  },
  {
    text: "People refine AI's instructions from their corrections",
    aiShare: 0,
    note: "Corrections drop to about 1 in 25",
    role: "teammate",
  },
  {
    text: "AI handles cases people define as low-risk",
    aiShare: 40,
    note: "Everything else goes to a person; staff review a sample",
    role: "operator",
  },
  {
    text: "People add more cases to AI's defined scope",
    aiShare: 85,
    note: "Unknowns and listed exceptions go to a person",
    role: "operator",
  },
].map((stage, i) => ({ ...stage, number: i + 1 }));

// On wide screens the banners share one row and all four stages share the
// next, so the cards stay the same height and their bars line up
const columnStart = [
  "md:col-start-1",
  "md:col-start-2",
  "md:col-start-3",
  "md:col-start-4",
];

const groups = [
  {
    name: "AI as a teammate",
    banner: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 md:col-start-1",
    stages: stages.filter((stage) => stage.role === "teammate"),
  },
  {
    name: "AI as an operator",
    banner:
      "border-purple-500/40 bg-purple-500/10 text-purple-300 md:col-start-3",
    stages: stages.filter((stage) => stage.role === "operator"),
  },
];
</script>

<template>
  <ArticleFigure
    title="Gradually increasing AI's responsibility"
    subtitle="Example: share of cases AI handles without approval at each stage"
  >
    <ol class="grid gap-3 md:grid-cols-4">
      <template v-for="group in groups" :key="group.name">
        <li
          :class="[
            'rounded-md border px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-wider md:col-span-2 md:row-start-1',
            group.banner,
          ]"
          aria-hidden="true"
        >
          {{ group.name }}
        </li>
        <li
          v-for="stage in group.stages"
          :key="stage.text"
          :class="[
            'flex flex-col rounded-lg border border-slate-700 bg-slate-800/40 p-3 md:row-start-2',
            columnStart[stage.number - 1],
          ]"
        >
          <p class="text-xs text-slate-500">
            Stage {{ stage.number }}
            <span class="sr-only">, {{ group.name }}</span>
          </p>
          <p class="mt-0.5 text-sm text-slate-200 md:min-h-15">
            {{ stage.text }}
          </p>
          <div
            class="mt-3 flex h-2.5 overflow-hidden rounded-full bg-amber-500/40"
            role="img"
            :aria-label="`AI handles ${stage.aiShare}% of cases without approval`"
          >
            <div
              class="bg-purple-400"
              :style="{ width: `${stage.aiShare}%` }"
            />
          </div>
          <p class="mt-1.5 text-xs text-purple-300">
            Without approval: {{ stage.aiShare }}%
          </p>
          <p class="mt-2 text-xs text-slate-400">{{ stage.note }}</p>
        </li>
      </template>
    </ol>
    <div
      class="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400"
    >
      <span class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full bg-purple-400" />
        AI handles within its defined scope
      </span>
      <span class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full bg-amber-500/40" />
        People decide
      </span>
      <span class="flex items-center gap-2">
        <ArrowPathIcon class="h-4 w-4 text-slate-500" />
        Return to an earlier stage if problems appear
      </span>
    </div>
  </ArticleFigure>
</template>
