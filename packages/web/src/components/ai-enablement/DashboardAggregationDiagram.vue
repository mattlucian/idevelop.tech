<script setup lang="ts">
import {
  TableCellsIcon,
  EnvelopeIcon,
  TruckIcon,
  CubeIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

const sources = [
  { icon: TableCellsIcon, label: "Order exports" },
  { icon: EnvelopeIcon, label: "Supplier emails" },
  { icon: CubeIcon, label: "Inventory sheets" },
  { icon: TruckIcon, label: "Shipping portals" },
  { icon: ChatBubbleLeftRightIcon, label: "Support tickets" },
];

const skillSteps = ["Gather", "Cross-check", "Summarize"];

const kpis = [
  { value: "12", label: "Late orders" },
  { value: "27", label: "Low-stock items" },
  { value: "5", label: "Supplier issues" },
];

const lateBySupplier = [
  { supplier: "Acme", count: 9 },
  { supplier: "Northline", count: 5 },
  { supplier: "Baywood", count: 3 },
  { supplier: "Other", count: 2 },
];
const maxLate = Math.max(...lateBySupplier.map((row) => row.count));

const attention = [
  "Acme Supply: 9 late orders this week",
  "Reorder 6 items before Friday",
  "3 listings missing images",
];
import FlowArrow from "../elements/FlowArrow.vue";
import CalloutStrip from "../elements/CalloutStrip.vue";
</script>

<template>
  <ContentSection
    banded
    title="Combine Scattered Data Into One Dashboard"
    subtitle="AI gathers data from several sources, checks them against each other, and summarizes the results in one place."
  >
    <div
      class="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,0.7fr)_auto_minmax(0,1.6fr)] items-center gap-3 md:gap-4"
    >
      <!-- Sources -->
      <div class="space-y-2">
        <div
          class="mb-1 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Sources
        </div>
        <div
          v-for="source in sources"
          :key="source.label"
          class="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/40 px-3 py-2 text-sm text-slate-300"
        >
          <component
            :is="source.icon"
            class="h-4 w-4 shrink-0 text-slate-400"
          />
          {{ source.label }}
        </div>
      </div>

      <FlowArrow size="lg" />

      <!-- AI skills -->
      <div
        class="rounded-xl border border-purple-500/40 bg-purple-500/10 p-4 text-center"
      >
        <div
          class="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300"
        >
          AI
        </div>
        <div class="flex md:flex-col justify-center gap-2">
          <span
            v-for="step in skillSteps"
            :key="step"
            class="rounded border border-purple-500/30 bg-[#0a0a0a] px-2 py-1 text-xs text-purple-200"
          >
            {{ step }}
          </span>
        </div>
      </div>

      <FlowArrow size="lg" />

      <!-- Dashboard mockup -->
      <div
        class="rounded-xl border border-cyan-500/30 bg-[#0f0f0f] p-4"
        role="img"
        aria-label="Example weekly operations dashboard: 12 late orders, 27 low-stock items, 5 supplier issues, late orders by supplier, and a list of items needing attention."
      >
        <div class="mb-3 flex items-center justify-between text-xs">
          <span class="font-semibold text-white">Weekly Operations</span>
          <span class="text-slate-500">Example · Updated Mon 7:00</span>
        </div>

        <!-- KPI tiles -->
        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="kpi in kpis"
            :key="kpi.label"
            class="rounded-lg border border-slate-800 bg-[#0a0a0a] p-2 text-center"
          >
            <div class="text-lg md:text-xl font-bold text-white">
              {{ kpi.value }}
            </div>
            <div class="text-[10px] md:text-xs text-slate-400">
              {{ kpi.label }}
            </div>
          </div>
        </div>

        <!-- Single-series bar chart -->
        <div class="mt-3 rounded-lg border border-slate-800 bg-[#0a0a0a] p-3">
          <div class="mb-2 text-xs text-slate-400">Late orders by supplier</div>
          <div class="space-y-1.5">
            <div
              v-for="row in lateBySupplier"
              :key="row.supplier"
              class="flex items-center gap-2 text-xs"
            >
              <span class="w-16 shrink-0 text-slate-400">{{
                row.supplier
              }}</span>
              <div class="h-2 flex-1">
                <div
                  class="h-2 rounded-r bg-cyan-400"
                  :style="{ width: `${(row.count / maxLate) * 100}%` }"
                />
              </div>
              <span class="w-4 text-right text-slate-300">{{ row.count }}</span>
            </div>
          </div>
        </div>

        <!-- Needs attention -->
        <div class="mt-3 rounded-lg border border-slate-800 bg-[#0a0a0a] p-3">
          <div class="mb-2 text-xs text-slate-400">Needs attention</div>
          <ul class="space-y-1.5 text-xs text-slate-300">
            <li
              v-for="item in attention"
              :key="item"
              class="flex items-start gap-2"
            >
              <ExclamationTriangleIcon
                class="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400"
              />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Refresh -->
    <CalloutStrip :icon="ArrowPathIcon" icon-class="text-emerald-400">
      It runs daily or weekly, so your team checks one page instead of five
      places.
    </CalloutStrip>
  </ContentSection>
</template>
