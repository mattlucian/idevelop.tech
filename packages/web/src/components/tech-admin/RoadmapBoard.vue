<script setup lang="ts">
import ContentSection from "../ui/ContentSection.vue";

type ItemKind = "fix" | "automate" | "plan";

const kindStyles: Record<ItemKind, { label: string; tone: PillTone }> = {
  fix: {
    label: "Fix",
    tone: "red",
  },
  automate: {
    label: "Automate",
    tone: "cyan",
  },
  plan: {
    label: "Plan",
    tone: "purple",
  },
};

const columns: {
  title: string;
  hint: string;
  border: string;
  items: { text: string; why: string; kind: ItemKind }[];
}[] = [
  {
    title: "Now",
    hint: "This month",
    border: "border-cyan-500/40",
    items: [
      {
        text: "Move the domain login to a shared vault",
        why: "One departure could lock you out of your site",
        kind: "fix",
      },
      {
        text: "Bring vendor confirmations and tracking in automatically",
        why: "Re-typed by hand today, and tracking reaches customers late",
        kind: "automate",
      },
    ],
  },
  {
    title: "Next",
    hint: "This quarter",
    border: "border-purple-500/40",
    items: [
      {
        text: "Replace the inventory spreadsheet with synced stock",
        why: "Stock counts drift between channels",
        kind: "automate",
      },
      {
        text: "Consolidate to one email tool",
        why: "Two subscriptions doing the same job",
        kind: "fix",
      },
    ],
  },
  {
    title: "Later",
    hint: "As you grow",
    border: "border-slate-700",
    items: [
      {
        text: "Revisit shipping apps if you add a warehouse",
        why: "The current plan works for one location",
        kind: "plan",
      },
      {
        text: "Track vendor contracts and renewal dates",
        why: "Renewals are easier to negotiate ahead of time",
        kind: "plan",
      },
    ],
  },
];
import Pill from "../elements/badges/Pill.vue";
import type { PillTone } from "../elements/badges/Pill.vue";
</script>

<template>
  <ContentSection
    banded
    eyebrow="Step 3"
    title="A Roadmap Built Around Your Priorities"
    subtitle="Findings become a short list of fixes and projects, each with the reason it's on the list, ordered by what matters most to you."
  >
    <div class="grid gap-4 md:grid-cols-3">
      <div
        v-for="column in columns"
        :key="column.title"
        :class="['rounded-xl border bg-[#0f0f0f] p-4', column.border]"
      >
        <div class="mb-3 flex items-baseline justify-between">
          <h3 class="text-lg font-semibold text-white">{{ column.title }}</h3>
          <span class="text-xs text-slate-500">{{ column.hint }}</span>
        </div>
        <div class="space-y-2">
          <div
            v-for="item in column.items"
            :key="item.text"
            class="rounded-lg border border-slate-800 bg-[#0a0a0a] p-3"
          >
            <Pill :tone="kindStyles[item.kind].tone">
              {{ kindStyles[item.kind].label }}
            </Pill>
            <p class="mt-2 text-sm text-slate-300">{{ item.text }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ item.why }}</p>
          </div>
        </div>
      </div>
    </div>
  </ContentSection>
</template>
