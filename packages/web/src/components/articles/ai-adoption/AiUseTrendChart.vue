<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";

// Census BTOS, share of businesses using AI in a business function in the
// last two weeks. Each value is a two-week period ending on the paired date.
const dates = [
  "2025-11-30",
  "2025-12-14",
  "2025-12-28",
  "2026-01-11",
  "2026-01-25",
  "2026-02-08",
  "2026-02-22",
  "2026-03-08",
  "2026-03-22",
  "2026-04-05",
  "2026-04-19",
  "2026-05-03",
  "2026-05-17",
  "2026-05-31",
  "2026-06-14",
  "2026-06-28",
  "2026-07-12",
  "2026-07-26",
  "2026-08-09",
  "2026-08-23",
  "2026-09-06",
  "2026-09-20",
  "2026-10-04",
];
const small = [
  17.0, 16.9, 17.7, 17.6, 18.2, 18.5, 17.5, 18.2, 18.5, 19.0, 19.2, 19.0, 19.1,
  20.0, 20.1, 20.0, 20.8, 20.8, 21.9, 22.5, 23.6, 23.8, 23.9,
];
const large = [
  30.5, 25.6, 32.7, 32.5, 27.1, 34.8, 31.9, 33.5, 35.3, 37.0, 31.2, 37.3, 36.1,
  36.8, 40.7, 40.3, 38.8, 36.8, 41.5, 39.9, 38.4, 44.0, 36.5,
];

const left = 36;
const right = 330;
const top = 16;
const base = 216;
const max = 45;
const day = (d: string) => Date.parse(d) / 864e5;
const first = day(dates[0] ?? "");
const last = day(dates[dates.length - 1] ?? "");
const x = (d: string) =>
  left + ((day(d) - first) / (last - first)) * (right - left);
const y = (v: number) => base - (v / max) * (base - top);
const path = (values: number[]) =>
  values
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(dates[i] ?? "")} ${y(v)}`)
    .join("");

const ticks = [
  { date: "2025-12-01", label: "Dec 2025" },
  { date: "2026-03-01", label: "Mar" },
  { date: "2026-06-01", label: "Jun" },
  { date: "2026-09-01", label: "Sep" },
];
const gridValues = [0, 15, 30, 45];
const lastDate = dates[dates.length - 1] ?? "";
const smallLast = small[small.length - 1] ?? 0;
const largeLast = large[large.length - 1] ?? 0;
</script>

<template>
  <ArticleFigure
    title="Fewer than one in four of the smallest businesses use AI in their operations"
    subtitle="Share of US businesses that used AI in a business function in the last two weeks, by number of employees"
    caption="US Census Bureau, Business Trends and Outlook Survey · two-week periods ending Nov 30, 2025 to Oct 4, 2026"
  >
    <svg
      viewBox="0 0 440 244"
      role="img"
      aria-label="Line chart: businesses with 1 to 4 employees rose from 17% to 24%, while businesses with 250 or more employees ranged from about 26% to 44%"
      class="mx-auto w-full max-w-lg text-[12px]"
    >
      <g v-for="v in gridValues" :key="v">
        <line
          :x1="left"
          :x2="right"
          :y1="y(v)"
          :y2="y(v)"
          class="stroke-slate-800"
        />
        <text
          :x="left - 8"
          :y="y(v) + 4"
          text-anchor="end"
          class="fill-slate-500"
        >
          {{ v }}%
        </text>
      </g>
      <text
        v-for="t in ticks"
        :key="t.date"
        :x="x(t.date)"
        :y="base + 20"
        text-anchor="middle"
        class="fill-slate-500"
      >
        {{ t.label }}
      </text>

      <path
        :d="path(large)"
        fill="none"
        class="stroke-slate-500"
        stroke-width="1.5"
      />
      <path
        :d="path(small)"
        fill="none"
        class="stroke-cyan-400"
        stroke-width="2.5"
      />

      <text :x="x(lastDate) + 8" :y="y(largeLast) + 4" class="fill-slate-400">
        <tspan font-weight="600">{{ largeLast.toFixed(1) }}%</tspan>
        <tspan :x="x(lastDate) + 8" dy="14">250+ employees</tspan>
      </text>
      <text :x="x(lastDate) + 8" :y="y(smallLast) + 4" class="fill-cyan-300">
        <tspan font-weight="600">{{ smallLast.toFixed(1) }}%</tspan>
        <tspan :x="x(lastDate) + 8" dy="14">1 to 4 employees</tspan>
      </text>
    </svg>
  </ArticleFigure>
</template>
