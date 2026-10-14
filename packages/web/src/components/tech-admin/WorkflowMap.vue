<script setup lang="ts">
import type { Component } from "vue";
import {
  ShoppingBagIcon,
  ArrowsRightLeftIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MapIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

interface WorkflowStep {
  icon: Component;
  action: string;
  system: string;
  notes: string[];
  gaps: string[];
}

const steps: WorkflowStep[] = [
  {
    icon: ShoppingBagIcon,
    action: "Order placed",
    system: "Online store",
    notes: ["Gift orders marked with a tag"],
    gaps: [],
  },
  {
    icon: ArrowsRightLeftIcon,
    action: "Imported",
    system: "Order system",
    notes: ["Syncs every 30 minutes"],
    gaps: ["Rush orders wait for the next sync"],
  },
  {
    icon: BuildingStorefrontIcon,
    action: "Fulfilled",
    system: "Warehouse or vendor",
    notes: ["Oversize items go to the vendor"],
    gaps: ["Vendor confirms by email, and someone re-types it"],
  },
  {
    icon: TruckIcon,
    action: "Tracking sent back",
    system: "Store and customer",
    notes: ["Warehouse tracking syncs on its own"],
    gaps: ["Vendor tracking is added by hand"],
  },
];

const outcomes = [
  {
    icon: DocumentTextIcon,
    tone: "text-cyan-400",
    title: "Documented",
    text: "How work moves through your systems, including the exceptions",
  },
  {
    icon: ExclamationTriangleIcon,
    tone: "text-amber-400",
    title: "Gaps found",
    text: "Manual steps, delays, and places data gets re-typed",
  },
  {
    icon: MapIcon,
    tone: "text-purple-400",
    title: "Into the roadmap",
    text: "Each gap weighed against your priorities",
  },
];
import FlowArrow from "../elements/FlowArrow.vue";
</script>

<template>
  <ContentSection
    eyebrow="Step 2"
    title="Understand Your Workflows"
    subtitle="Following real work from start to finish, like an order, shows the details that never make it into a diagram."
  >
    <div
      class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-3"
    >
      <template v-for="(step, index) in steps" :key="step.action">
        <FlowArrow v-if="index > 0" size="md" class="items-center" />

        <div class="flex flex-col gap-2">
          <!-- Step -->
          <div class="rounded-xl border border-cyan-500/30 bg-[#0f0f0f] p-4">
            <component :is="step.icon" class="h-5 w-5 text-cyan-400" />
            <div class="mt-2 font-semibold text-white">{{ step.action }}</div>
            <div class="text-xs text-slate-500">{{ step.system }}</div>
          </div>

          <!-- Annotations -->
          <div
            v-for="note in step.notes"
            :key="note"
            class="flex items-start gap-1.5 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs text-slate-300"
          >
            <DocumentTextIcon
              class="mt-px h-3.5 w-3.5 shrink-0 text-slate-400"
            />
            {{ note }}
          </div>
          <div
            v-for="gap in step.gaps"
            :key="gap"
            class="flex items-start gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100"
          >
            <ExclamationTriangleIcon
              class="mt-px h-3.5 w-3.5 shrink-0 text-amber-400"
            />
            {{ gap }}
          </div>
        </div>
      </template>
    </div>

    <!-- Legend -->
    <div
      class="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-500"
    >
      <span class="flex items-center gap-1.5">
        <DocumentTextIcon class="h-3.5 w-3.5 text-slate-400" />
        How it works today
      </span>
      <span class="flex items-center gap-1.5">
        <ExclamationTriangleIcon class="h-3.5 w-3.5 text-amber-400" />
        Gap
      </span>
    </div>

    <!-- What comes out of it -->
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div
        v-for="outcome in outcomes"
        :key="outcome.title"
        class="flex items-start gap-3 rounded-lg border border-dashed border-slate-700 px-4 py-3"
      >
        <component
          :is="outcome.icon"
          :class="['mt-0.5 h-5 w-5 shrink-0', outcome.tone]"
        />
        <div>
          <div class="text-sm font-semibold text-white">
            {{ outcome.title }}
          </div>
          <div class="text-sm text-slate-400">{{ outcome.text }}</div>
        </div>
      </div>
    </div>
  </ContentSection>
</template>
