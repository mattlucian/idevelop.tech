<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const groups = [
  {
    heading: "Reference material",
    items: [
      { text: "Return policy", updated: true },
      { text: "Product care guide" },
      { text: "Supplier list" },
    ],
  },
  {
    heading: "Instructions",
    items: [
      { text: "Customer replies: friendly, short" },
      { text: "Answer only from store documents" },
    ],
  },
];

const drafts = [
  {
    asker: "AI reply for a sales associate",
    text: "…you can return it within 60 days with your receipt.",
  },
  {
    asker: "AI returns FAQ for a new hire",
    text: "How long do I have? 60 days from purchase.",
  },
];
</script>

<template>
  <ArticleFigure
    title="People and AI work from the same centralized knowledge"
    subtitle="Example: a store changes its return window"
    ai-legend
  >
    <div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <ArticleScenarioBox
        label="Owner corrects it once"
        class="flex-1 md:basis-0"
      >
        Store manager updates the return window
        <span class="mt-1 block text-xs">
          <span class="text-slate-500 line-through">30 days</span>
          <span class="ml-1.5 text-emerald-300">60 days</span>
        </span>
      </ArticleScenarioBox>
      <FlowArrow size="sm" />
      <div
        class="flex-[1.3] rounded-lg border border-cyan-500/40 bg-cyan-500/5 p-3 md:basis-0"
      >
        <p
          class="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-300"
        >
          Centralized knowledge
        </p>
        <div class="space-y-2.5">
          <div v-for="group in groups" :key="group.heading">
            <p class="text-xs text-slate-500">{{ group.heading }}</p>
            <ul class="mt-1 space-y-1">
              <li
                v-for="item in group.items"
                :key="item.text"
                :class="[
                  'flex items-center justify-between gap-2 rounded border px-2 py-1 text-xs',
                  item.updated
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                    : 'border-slate-700 bg-slate-800/40 text-slate-300',
                ]"
              >
                {{ item.text }}
                <span v-if="item.updated" class="text-emerald-300"
                  >Updated</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FlowArrow size="sm" />
      <div class="flex flex-1 flex-col gap-2 md:basis-0">
        <ArticleScenarioBox
          v-for="draft in drafts"
          :key="draft.asker"
          tone="ai"
          :label="draft.asker"
        >
          <span class="text-xs">"{{ draft.text }}"</span>
        </ArticleScenarioBox>
      </div>
    </div>
    <p class="mt-3 text-center text-xs text-slate-400">
      Every later draft uses the updated policy, and each person still checks
      their draft before using it
    </p>
  </ArticleFigure>
</template>
