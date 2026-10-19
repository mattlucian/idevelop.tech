<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";

const levels = [
  {
    label: "Experimenting",
    pct: 49,
    bar: "bg-slate-700",
    text: "text-slate-400",
  },
  {
    label: "Partially integrated",
    pct: 44,
    bar: "bg-slate-500",
    text: "text-slate-400",
  },
  {
    label: "Fully integrated",
    pct: 7,
    bar: "bg-cyan-400",
    text: "text-cyan-300",
  },
];
</script>

<template>
  <ArticleFigure
    title="Only 7% of small businesses using AI have fully integrated it"
    subtitle="Level of AI adoption among US small employer firms that use AI"
    caption="Federal Reserve, Small Business Credit Survey 2026 · employer firms with 1 to 499 employees that use AI, surveyed Sep to Nov 2025"
  >
    <div
      class="flex h-10 gap-0.5 overflow-hidden rounded-md"
      role="img"
      aria-label="49% experimenting, 44% partially integrated, 7% fully integrated"
    >
      <div
        v-for="level in levels"
        :key="level.label"
        :class="level.bar"
        :style="{ width: `${level.pct}%` }"
      />
    </div>
    <div class="mt-3 grid grid-cols-3 gap-3 text-xs md:text-sm">
      <div
        v-for="(level, i) in levels"
        :key="level.label"
        :class="[level.text, i === levels.length - 1 ? 'text-right' : '']"
      >
        <div class="font-semibold">{{ level.pct }}%</div>
        <div>{{ level.label }}</div>
      </div>
    </div>
  </ArticleFigure>
</template>
