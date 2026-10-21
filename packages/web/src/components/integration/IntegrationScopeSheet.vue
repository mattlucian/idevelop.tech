<script setup lang="ts">
import {
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  BeakerIcon,
  RocketLaunchIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import OutlineIcon from "../elements/OutlineIcon.vue";

const scopeRows = [
  { label: "Data", value: "Orders, refunds, customers" },
  { label: "Direction", value: "Store → Accounting" },
  { label: "Schedule", value: "Every 15 minutes" },
  { label: "Errors", value: "Email alert to the ops team" },
  { label: "Handoff", value: "Field mapping + runbook" },
];

const steps = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Talk through the project",
    desc: "The systems involved, what needs to move, and how often",
  },
  {
    icon: DocumentTextIcon,
    title: "Fixed-fee proposal",
    desc: "Scope, schedule, and price in writing before work starts",
  },
  {
    icon: BeakerIcon,
    title: "Map, build, and test",
    desc: "Detailed field mapping, then testing against sample data, with progress updates",
  },
  {
    icon: RocketLaunchIcon,
    title: "Go live and hand off",
    desc: "Documentation and training included on projects over 10 hours",
  },
];
</script>

<template>
  <ContentSection
    banded
    title="Fixed-Fee Projects"
    subtitle="You see the scope and the price in writing first."
  >
    <div class="grid gap-8 md:grid-cols-2 items-start">
      <!-- Proposal mockup -->
      <div
        class="rounded-xl border border-cyan-500/30 bg-[#0f0f0f] p-5 md:p-6"
        role="img"
        aria-label="Example integration proposal listing data, direction, schedule, error handling, handoff, and a fixed fee."
      >
        <div class="text-xs uppercase tracking-wider text-slate-500">
          Integration proposal
        </div>
        <div class="mt-1 text-lg font-semibold text-white">
          Online Store → Accounting
        </div>
        <dl class="mt-4 divide-y divide-slate-800 text-sm">
          <div
            v-for="row in scopeRows"
            :key="row.label"
            class="flex justify-between gap-4 py-2"
          >
            <dt class="text-slate-500">{{ row.label }}</dt>
            <dd class="text-right text-slate-200">{{ row.value }}</dd>
          </div>
        </dl>
        <div
          class="mt-4 flex items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3"
        >
          <span class="text-sm text-cyan-200">Price</span>
          <span class="font-semibold text-white">Fixed fee</span>
        </div>
      </div>

      <!-- Steps -->
      <div>
        <ol class="space-y-5">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="flex gap-4"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/60"
            >
              <OutlineIcon :icon="step.icon" size="sm" color="cyan" />
            </div>
            <div>
              <div class="font-semibold text-white">
                <span class="text-slate-500 mr-1">{{ index + 1 }}.</span>
                {{ step.title }}
              </div>
              <div class="text-sm text-slate-400">{{ step.desc }}</div>
            </div>
          </li>
        </ol>
        <p
          class="mt-5 rounded-lg border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-400"
        >
          Optional: hosting and ongoing support after launch.
        </p>
      </div>
    </div>
  </ContentSection>
</template>
