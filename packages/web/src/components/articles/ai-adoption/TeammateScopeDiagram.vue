<script setup lang="ts">
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";

const columns = [
  {
    heading: "AI teammates can",
    icon: CheckIcon,
    box: "border-emerald-500/30 bg-emerald-500/5",
    mark: "text-emerald-400",
    items: [
      "Interpret a customer's message",
      "Match a ticket to earlier reports",
      "Add notes to a ticket",
      "Draft a reply for review",
    ],
  },
  {
    heading: "AI teammates can't",
    icon: XMarkIcon,
    box: "border-rose-500/30 bg-rose-500/5",
    mark: "text-rose-400",
    items: [
      "Send replies to customers",
      "Close or reassign tickets",
      "Change orders or accounts",
      "Issue refunds or credits",
    ],
  },
];
</script>

<template>
  <ArticleFigure title="Keep the AI step narrow">
    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="col in columns"
        :key="col.heading"
        :class="['rounded-lg border p-4', col.box]"
      >
        <p class="mb-3 text-sm font-semibold text-white">{{ col.heading }}</p>
        <ul class="space-y-2 text-sm text-slate-300">
          <li v-for="item in col.items" :key="item" class="flex gap-2">
            <component
              :is="col.icon"
              :class="['mt-0.5 h-4 w-4 shrink-0', col.mark]"
            />
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </ArticleFigure>
</template>
