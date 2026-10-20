<script setup lang="ts">
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
  TagIcon,
  TruckIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleAiChecks from "../../article/ArticleAiChecks.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const checks = [
  {
    source: "Order system",
    icon: ShoppingBagIcon,
    finding: "Ship-by dates for every open order",
  },
  {
    source: "Carrier tracking",
    icon: TruckIcon,
    finding: "Order 5121 hasn't been picked up",
  },
  {
    source: "Product listings",
    icon: TagIcon,
    finding: "New listings and their descriptions",
  },
];

const items = [
  { item: "Order 5120", finding: "On track", toStaff: false },
  { item: "Order 5121", finding: "Will ship 3 days late", toStaff: true },
  { item: "Order 5122", finding: "On track", toStaff: false },
  {
    item: "Listing: ceramic vase",
    finding: "Description just says “TBD”",
    toStaff: true,
  },
];
</script>

<template>
  <ArticleFigure
    title="Routine orders run on their own; exceptions go to a person"
    subtitle="Example: one morning's scheduled check"
    ai-legend
  >
    <div class="space-y-2">
      <ArticleScenarioBox label="Every morning" :icon="CalendarDaysIcon">
        <span class="text-xs"
          >The agent runs its check using the team's written rules</span
        >
      </ArticleScenarioBox>
      <FlowArrow size="sm" vertical />
      <ArticleAiChecks label="Agent checks" :checks="checks" />
      <FlowArrow size="sm" vertical />
      <ul class="grid gap-1.5 sm:grid-cols-2">
        <li
          v-for="row in items"
          :key="row.item"
          :class="[
            'flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-xs',
            row.toStaff
              ? 'border-amber-500/40 bg-amber-500/5'
              : 'border-slate-700 bg-slate-800/40',
          ]"
        >
          <span>
            <span class="block text-slate-200">{{ row.item }}</span>
            <span class="text-slate-500">{{ row.finding }}</span>
          </span>
          <span
            :class="[
              'shrink-0',
              row.toStaff ? 'text-amber-300' : 'text-emerald-300',
            ]"
          >
            {{ row.toStaff ? "Sent to staff" : "Continues" }}
          </span>
        </li>
      </ul>
    </div>
    <p
      class="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      The team updates the rules from what it sees
    </p>
  </ArticleFigure>
</template>
