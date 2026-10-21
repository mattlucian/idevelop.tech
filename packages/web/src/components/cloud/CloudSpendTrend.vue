<script setup lang="ts">
import {
  BellAlertIcon,
  TagIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

const months: { label: string; value: number; spike?: string }[] = [
  { label: "Jan", value: 4.1 },
  { label: "Feb", value: 4.3 },
  { label: "Mar", value: 4.2 },
  { label: "Apr", value: 6.8, spike: "Export job left running" },
  { label: "May", value: 4.4 },
  { label: "Jun", value: 4.5 },
  { label: "Jul", value: 4.6 },
  { label: "Aug", value: 7.2, spike: "Load test never shut down" },
  { label: "Sep", value: 4.7 },
  { label: "Oct", value: 4.8 },
  { label: "Nov", value: 4.9 },
  { label: "Dec", value: 5.0 },
];
const maxValue = Math.max(...months.map((month) => month.value));
const spikes = months.filter((month) => month.spike);
const steadyValues = months
  .filter((month) => !month.spike)
  .map((month) => month.value);
const steadyRange = `$${Math.min(...steadyValues).toFixed(1)}k and $${Math.max(...steadyValues).toFixed(1)}k`;

const controls = [
  {
    icon: BellAlertIcon,
    title: "Budget and anomaly alerts",
    desc: "Spikes are flagged within days of starting",
  },
  {
    icon: TagIcon,
    title: "Cost tags",
    desc: "Spend broken out by product, team, or client",
  },
  {
    icon: CalendarDaysIcon,
    title: "Savings Plans for steady usage",
    desc: "A lower, fixed rate on your steady baseline usage",
  },
];
</script>

<template>
  <ContentSection
    id="predictable"
    banded
    eyebrow="Predictable costs"
    title="Spend Monitoring and Controls"
    subtitle="Spikes usually have a simple cause. Once it's found, a few controls help catch the next one early."
  >
    <div class="grid gap-6 md:grid-cols-5">
      <!-- Spend by month -->
      <div
        class="md:col-span-3 rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5"
        role="img"
        :aria-label="`Example monthly AWS spend over a year, mostly between ${steadyRange}, with spikes in ${spikes
          .map((month) => `${month.label} (${month.spike})`)
          .join(' and ')}.`"
      >
        <div class="mb-4 flex items-center justify-between text-xs">
          <span class="font-semibold text-white">Monthly spend ($k)</span>
          <span class="text-slate-500">Example</span>
        </div>
        <div class="flex h-40 items-end gap-1.5">
          <div
            v-for="month in months"
            :key="month.label"
            class="flex h-full flex-1 flex-col items-center justify-end gap-1"
          >
            <div
              :class="[
                'w-full rounded-t',
                month.spike ? 'bg-amber-400' : 'bg-cyan-400',
              ]"
              :style="{ height: `${(month.value / maxValue) * 100}%` }"
            />
            <span class="text-[10px] text-slate-500">{{ month.label }}</span>
          </div>
        </div>
        <ul class="mt-4 space-y-1.5 border-t border-slate-800 pt-3 text-xs">
          <li
            v-for="month in spikes"
            :key="month.label"
            class="flex items-start gap-2 text-slate-300"
          >
            <ExclamationTriangleIcon
              class="mt-px h-3.5 w-3.5 shrink-0 text-amber-400"
            />
            {{ month.label }}: {{ month.spike }}
          </li>
        </ul>
      </div>

      <!-- Controls -->
      <div class="md:col-span-2 space-y-3">
        <div
          v-for="control in controls"
          :key="control.title"
          class="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4"
        >
          <component
            :is="control.icon"
            class="mt-0.5 h-5 w-5 shrink-0 text-purple-400"
          />
          <div>
            <div class="text-sm font-semibold text-white">
              {{ control.title }}
            </div>
            <div class="text-sm text-slate-400">{{ control.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </ContentSection>
</template>
