<script setup lang="ts">
import {
  CheckCircleIcon,
  ArrowPathIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
  BellAlertIcon,
  FingerPrintIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import OutlineIcon from "../elements/OutlineIcon.vue";

const logLines = [
  {
    icon: CheckCircleIcon,
    tone: "text-emerald-400",
    text: "248 orders synced",
  },
  {
    icon: ArrowPathIcon,
    tone: "text-cyan-400",
    text: "3 retried after a timeout, then synced",
  },
  {
    icon: NoSymbolIcon,
    tone: "text-slate-400",
    text: "2 duplicates skipped",
  },
  {
    icon: ExclamationTriangleIcon,
    tone: "text-amber-400",
    text: '1 needs attention: SKU "BLK-22" not found in accounting',
  },
];

const safeguards = [
  {
    icon: ClockIcon,
    title: "Retries",
    desc: "Timeouts and rate limits are retried automatically",
  },
  {
    icon: FingerPrintIcon,
    title: "Duplicate protection",
    desc: "Records are tracked, so a re-run doesn't create copies",
  },
  {
    icon: BellAlertIcon,
    title: "Alerts with a reason",
    desc: "Records that can't sync are flagged with what went wrong",
  },
  {
    icon: DocumentMagnifyingGlassIcon,
    title: "Searchable history",
    desc: "See what moved, when, and what changed",
  },
];
</script>

<template>
  <ContentSection
    title="Error Handling and Recovery"
    subtitle="Temporary problems like timeouts and rate limits are retried automatically. Alerts are reserved for errors that need a person, like a SKU that doesn't exist."
  >
    <div class="grid gap-6 md:grid-cols-2 items-center">
      <!-- Run log mockup -->
      <div
        class="rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5 font-mono text-xs md:text-sm"
      >
        <div
          class="mb-4 flex items-center justify-between border-b border-slate-800 pb-3"
        >
          <span class="font-semibold text-white">Order sync</span>
          <span class="text-slate-500">Today 2:00 PM</span>
        </div>
        <ul class="space-y-3">
          <li
            v-for="line in logLines"
            :key="line.text"
            class="flex items-start gap-2 text-slate-300"
          >
            <component
              :is="line.icon"
              :class="['mt-0.5 h-4 w-4 shrink-0', line.tone]"
            />
            {{ line.text }}
          </li>
        </ul>
        <div
          class="mt-4 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-200"
        >
          Email sent to ops: 1 order waiting on a SKU fix
        </div>
      </div>

      <!-- Safeguards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="item in safeguards"
          :key="item.title"
          class="rounded-lg border border-slate-800 bg-slate-900/40 p-4"
        >
          <OutlineIcon :icon="item.icon" size="md" color="cyan" />
          <div class="mt-2 font-semibold text-white">{{ item.title }}</div>
          <div class="mt-1 text-sm text-slate-400">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </ContentSection>
</template>
