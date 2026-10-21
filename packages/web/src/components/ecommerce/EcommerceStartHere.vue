<script setup lang="ts">
import {
  ListBulletIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import VisualFeatureCard from "../cards/VisualFeatureCard.vue";

const priorities = [
  { text: "In-store sales re-typed into QuickBooks", picked: true },
  { text: "Overselling on Amazon", picked: true },
  { text: "Moving to a new store platform", picked: false },
];

const today = [
  { label: "POS", manual: false },
  { label: "Spreadsheet", manual: true },
  { label: "QuickBooks", manual: false },
];

const plan = [
  { text: "Sync in-store sales to QuickBooks", status: "In progress" },
  { text: "Stock buffers for Amazon", status: "Next" },
  { text: "Platform move", status: "Later" },
];
</script>

<template>
  <ContentSection
    banded
    eyebrow="Start here"
    title="Starting With Your Priorities"
    subtitle="Stores run in different ways, so work starts from your priorities."
  >
    <div class="grid gap-6 md:grid-cols-3">
      <VisualFeatureCard
        :icon="ListBulletIcon"
        title="Share your priorities"
        description="What's taking time, causing errors, or coming up next."
        color="cyan"
      >
        <ul class="space-y-2">
          <li
            v-for="item in priorities"
            :key="item.text"
            class="flex items-start gap-2"
          >
            <span
              :class="[
                'mt-0.5 h-3.5 w-3.5 shrink-0 rounded border',
                item.picked
                  ? 'border-cyan-400 bg-cyan-400/30'
                  : 'border-slate-600',
              ]"
              aria-hidden="true"
            />
            <span :class="item.picked ? 'text-slate-200' : 'text-slate-500'">
              {{ item.text }}
              <span v-if="item.picked" class="sr-only">(selected)</span>
            </span>
          </li>
        </ul>
      </VisualFeatureCard>

      <VisualFeatureCard
        :icon="MagnifyingGlassIcon"
        title="See how it works today"
        description="A walkthrough of the systems and steps involved."
        color="purple"
      >
        <div class="flex flex-wrap items-center justify-center gap-1.5">
          <template v-for="(step, index) in today" :key="step.label">
            <ArrowRightIcon
              v-if="index > 0"
              class="h-3 w-3 text-slate-600"
              aria-hidden="true"
            />
            <span
              :class="[
                'rounded border px-2 py-0.5',
                step.manual
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                  : 'border-slate-600 text-slate-300',
              ]"
            >
              {{ step.label }}
            </span>
          </template>
        </div>
        <p class="mt-3 text-center text-slate-500">
          The spreadsheet step is done by hand
        </p>
      </VisualFeatureCard>

      <VisualFeatureCard
        :icon="WrenchScrewdriverIcon"
        title="Fix the top one first"
        description="Then move to the next, as it makes sense for your business."
        color="emerald"
      >
        <ol class="space-y-2">
          <li
            v-for="(item, index) in plan"
            :key="item.text"
            class="flex items-center justify-between gap-2"
          >
            <span :class="index === 0 ? 'text-white' : 'text-slate-400'">
              {{ index + 1 }}. {{ item.text }}
            </span>
            <span
              :class="[
                'shrink-0 rounded-full border px-2 py-0.5',
                index === 0
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-700 text-slate-500',
              ]"
            >
              {{ item.status }}
            </span>
          </li>
        </ol>
      </VisualFeatureCard>
    </div>
  </ContentSection>
</template>
