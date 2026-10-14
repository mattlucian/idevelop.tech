<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  KeyIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

type ToolStatus = "connected" | "manual" | "overlap" | "risk";

const statusStyles: Record<ToolStatus, { label: string; tone: PillTone }> = {
  connected: {
    label: "Connected",
    tone: "emerald",
  },
  manual: {
    label: "Manual export",
    tone: "amber",
  },
  overlap: {
    label: "Overlaps",
    tone: "amber",
  },
  risk: {
    label: "Shared login",
    tone: "red",
  },
};

const groups: {
  area: string;
  tools: { name: string; status: ToolStatus }[];
}[] = [
  {
    area: "Sales",
    tools: [
      { name: "Online store", status: "connected" },
      { name: "Marketplace", status: "manual" },
    ],
  },
  {
    area: "Operations",
    tools: [
      { name: "Shipping app", status: "connected" },
      { name: "Inventory spreadsheet", status: "manual" },
    ],
  },
  {
    area: "Finance",
    tools: [
      { name: "Accounting", status: "manual" },
      { name: "Payment processor", status: "connected" },
    ],
  },
  {
    area: "Marketing",
    tools: [
      { name: "Email tool A", status: "overlap" },
      { name: "Email tool B", status: "overlap" },
    ],
  },
  {
    area: "Admin",
    tools: [
      { name: "Domain & DNS", status: "risk" },
      { name: "Team email & docs", status: "connected" },
    ],
  },
];

const findings = [
  { icon: ArrowDownTrayIcon, text: "3 manual exports someone runs each week" },
  { icon: DocumentDuplicateIcon, text: "2 email tools doing the same job" },
  { icon: KeyIcon, text: "1 critical login shared by the whole team" },
];
import Pill from "../elements/badges/Pill.vue";
import type { PillTone } from "../elements/badges/Pill.vue";
</script>

<template>
  <ContentSection
    banded
    eyebrow="Step 1"
    title="Start With a Clear Picture"
    subtitle="A tech stack review shows the tools you run on, how they connect, and where the gaps are, which makes decisions easier."
  >
    <div
      class="rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5 md:p-6"
      role="img"
      aria-label="Example stack map of business tools grouped by area, each marked as connected, manual export, overlapping, or a shared login, with a summary of findings."
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div v-for="group in groups" :key="group.area">
          <div
            class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            {{ group.area }}
          </div>
          <div class="space-y-2">
            <div
              v-for="tool in group.tools"
              :key="tool.name"
              class="rounded-lg border border-slate-800 bg-[#0a0a0a] p-3"
            >
              <div class="text-sm text-white">{{ tool.name }}</div>
              <Pill :tone="statusStyles[tool.status].tone" class="mt-2">
                <CheckCircleIcon
                  v-if="tool.status === 'connected'"
                  class="h-3 w-3"
                />
                <ExclamationTriangleIcon v-else class="h-3 w-3" />
                {{ statusStyles[tool.status].label }}
              </Pill>
            </div>
          </div>
        </div>
      </div>

      <!-- Findings -->
      <div class="mt-6 border-t border-slate-800 pt-4">
        <div
          class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Findings
        </div>
        <ul class="grid gap-2 md:grid-cols-3 text-sm text-slate-300">
          <li
            v-for="finding in findings"
            :key="finding.text"
            class="flex items-start gap-2"
          >
            <component
              :is="finding.icon"
              class="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
            />
            {{ finding.text }}
          </li>
        </ul>
      </div>
    </div>
  </ContentSection>
</template>
