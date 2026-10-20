<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import type { ArticleTradeoffs } from "@/types/article";
import ArticleCite from "./ArticleCite.vue";

defineProps<ArticleTradeoffs>();

const panels = [
  {
    key: "benefits" as const,
    heading: "Benefits",
    icon: CheckCircleIcon,
    box: "border-emerald-500/25 from-emerald-500/10",
    accent: "text-emerald-400",
  },
  {
    key: "challenges" as const,
    heading: "Challenges",
    icon: ExclamationTriangleIcon,
    box: "border-amber-500/25 from-amber-500/10",
    accent: "text-amber-400",
  },
];
</script>

<template>
  <figure
    class="not-prose my-10 rounded-xl border border-slate-800 bg-[#0f0f0f] p-4 md:p-6"
  >
    <figcaption class="mb-5 text-sm font-semibold text-white md:text-base">
      {{ title }}
    </figcaption>
    <div class="grid gap-3 md:grid-cols-2">
      <div
        v-for="panel in panels"
        :key="panel.key"
        :class="[
          'rounded-lg border bg-linear-to-b to-transparent p-4',
          panel.box,
        ]"
      >
        <p
          :class="[
            'mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider',
            panel.accent,
          ]"
        >
          <component :is="panel.icon" class="h-4 w-4" />
          {{ panel.heading }}
        </p>
        <ul class="space-y-3">
          <li v-for="item in $props[panel.key]" :key="item.label">
            <p class="text-sm font-semibold text-white">{{ item.label }}</p>
            <p class="mt-0.5 text-sm text-slate-400">
              {{ item.detail }}<ArticleCite v-if="item.cite" :n="item.cite" />
            </p>
          </li>
        </ul>
      </div>
    </div>
  </figure>
</template>
