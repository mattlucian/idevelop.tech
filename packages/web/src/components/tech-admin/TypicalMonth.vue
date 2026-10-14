<script setup lang="ts">
import { computed, ref } from "vue";
import ContentSection from "../ui/ContentSection.vue";

type WorkKind = "plan" | "build" | "support" | "vendor";
type MonthMode = "steady" | "initiative";

const kindStyles: Record<WorkKind, { label: string; tone: PillTone }> = {
  plan: {
    label: "Planning",
    tone: "purple",
  },
  build: {
    label: "Build",
    tone: "cyan",
  },
  support: {
    label: "Support",
    tone: "emerald",
  },
  vendor: {
    label: "Vendors",
    tone: "orange",
  },
};

const months: Record<
  MonthMode,
  {
    label: string;
    hours: string;
    fill: string;
    note: string;
    log: { day: string; text: string; kind: WorkKind }[];
  }
> = {
  steady: {
    label: "Steady month",
    hours: "About 10 hours",
    fill: "w-1/2",
    note: "Regular upkeep, questions, and small improvements.",
    log: [
      {
        day: "Mar 3",
        text: "Fixed a tax setting at checkout",
        kind: "support",
      },
      {
        day: "Mar 10",
        text: "Compared the shipping app renewal with two alternatives",
        kind: "vendor",
      },
      {
        day: "Mar 18",
        text: "Automated the daily order export to accounting",
        kind: "build",
      },
      { day: "Mar 27", text: "Monthly roadmap check-in", kind: "plan" },
    ],
  },
  initiative: {
    label: "Initiative month",
    hours: "More hours, as the work needs",
    fill: "w-full",
    note: "When a larger project is underway, like a platform move or a new integration. Hours depend on the work and availability.",
    log: [
      {
        day: "Apr 2",
        text: "Scoped the inventory sync with the warehouse team",
        kind: "plan",
      },
      {
        day: "Apr 9",
        text: "Joined the agency call to review the site redesign",
        kind: "vendor",
      },
      {
        day: "Apr 15",
        text: "Built and tested the inventory sync",
        kind: "build",
      },
      {
        day: "Apr 22",
        text: "Retired the inventory spreadsheet and trained staff",
        kind: "support",
      },
      { day: "Apr 29", text: "Monthly roadmap check-in", kind: "plan" },
    ],
  },
};

const mode = ref<MonthMode>("steady");
const month = computed(() => months[mode.value]);
const modeOptions = (Object.keys(months) as MonthMode[]).map((key) => ({
  value: key,
  label: months[key].label,
}));
import Pill from "../elements/badges/Pill.vue";
import type { PillTone } from "../elements/badges/Pill.vue";
import SegmentedToggle from "../elements/SegmentedToggle.vue";
</script>

<template>
  <ContentSection
    eyebrow="Ongoing"
    title="Ongoing Hands-On Work"
    subtitle="Monthly hours to work through the roadmap and the questions that come up along the way. Hours flex with the work."
  >
    <div class="mx-auto max-w-3xl">
      <!-- Mode toggle -->
      <SegmentedToggle
        v-model="mode"
        :options="modeOptions"
        label="Example month"
        class="mx-auto mb-6 text-sm"
      />

      <div
        class="rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5 md:p-6"
      >
        <!-- Hours bar -->
        <div class="flex items-baseline justify-between text-sm">
          <span class="font-semibold text-white">{{ month.hours }}</span>
          <span class="text-slate-500">{{ month.note }}</span>
        </div>
        <div class="mt-2 h-2 rounded-full bg-slate-800">
          <div
            :class="[
              'h-2 rounded-full bg-cyan-400 transition-all duration-300',
              month.fill,
            ]"
          />
        </div>

        <!-- Work log -->
        <ul class="mt-6 divide-y divide-slate-800">
          <li
            v-for="entry in month.log"
            :key="entry.day"
            class="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <span class="w-14 shrink-0 font-mono text-xs text-slate-500">
              {{ entry.day }}
            </span>
            <span class="flex-1 text-sm text-slate-300">{{ entry.text }}</span>
            <Pill :tone="kindStyles[entry.kind].tone">
              {{ kindStyles[entry.kind].label }}
            </Pill>
          </li>
        </ul>
      </div>
    </div>
  </ContentSection>
</template>
