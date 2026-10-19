<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";

const weeks = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const byHand = weeks.map((w) => w * 4);
const automated = weeks.map((w) => 10 + w * 0.5);
const breakEven =
  weeks.find((w) => (automated[w] ?? 0) < (byHand[w] ?? 0)) ?? 0;

const left = 24;
const right = 300;
const top = 24;
const base = 216;
const max = 32;
const x = (w: number) => left + (w / 8) * (right - left);
const y = (h: number) => base - (h / max) * (base - top);
const path = (values: number[]) =>
  values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(v)}`).join("");

const handLast = byHand[byHand.length - 1] ?? 0;
const autoLast = automated[automated.length - 1] ?? 0;
</script>

<template>
  <ArticleFigure
    title="Example: the automation pays back its build time in about three weeks"
    subtitle="Total hours spent on purchase orders, assuming 4 hours a week by hand, a 10-hour build, and 30 minutes of review a week"
    caption="Illustrative example · not client data"
  >
    <svg
      viewBox="0 0 440 244"
      role="img"
      :aria-label="`Line chart: by hand reaches ${handLast} hours by week 8; with the automation reaches ${autoLast} hours, passing even at week ${breakEven}`"
      class="mx-auto w-full max-w-lg text-[12px]"
    >
      <line
        :x1="left"
        :x2="right"
        :y1="base"
        :y2="base"
        class="stroke-slate-700"
      />
      <text
        v-for="w in weeks"
        :key="w"
        :x="x(w)"
        :y="base + 18"
        text-anchor="middle"
        class="fill-slate-500"
      >
        {{ w === 0 ? "Week 0" : w }}
      </text>

      <line
        :x1="x(breakEven)"
        :x2="x(breakEven)"
        :y1="top - 8"
        :y2="base"
        class="stroke-slate-500"
        stroke-dasharray="4 4"
      />
      <text :x="x(breakEven) + 6" :y="top - 2" class="fill-slate-400">
        Build time recovered
      </text>

      <path
        :d="path(byHand)"
        fill="none"
        class="stroke-slate-500"
        stroke-width="2"
      />
      <path
        :d="path(automated)"
        fill="none"
        class="stroke-cyan-400"
        stroke-width="2.5"
      />

      <text :x="x(8) + 10" :y="y(handLast) + 4" class="fill-slate-400">
        <tspan>By hand</tspan>
        <tspan :x="x(8) + 10" dy="14" font-weight="600">
          {{ handLast }} hours
        </tspan>
      </text>
      <text :x="x(8) + 10" :y="y(autoLast) + 4" class="fill-cyan-300">
        <tspan>With the automation</tspan>
        <tspan :x="x(8) + 10" dy="14" font-weight="600">
          {{ autoLast }} hours
        </tspan>
        <tspan :x="x(8) + 10" dy="14">
          {{ handLast - autoLast }} hours saved
        </tspan>
      </text>
    </svg>
  </ArticleFigure>
</template>
