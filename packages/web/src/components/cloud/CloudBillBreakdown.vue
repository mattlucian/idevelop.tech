<script setup lang="ts">
import ContentSection from "../ui/ContentSection.vue";

const spend = [
  { service: "Servers (EC2)", share: 38 },
  { service: "Databases (RDS)", share: 24 },
  { service: "Data transfer", share: 14 },
  { service: "Storage (S3, EBS)", share: 12 },
  { service: "Other", share: 12 },
];
const maxShare = Math.max(...spend.map((row) => row.share));

const findings = [
  { text: "Servers sized for peak traffic around the clock", savings: 540 },
  { text: "Dev database running nights and weekends", savings: 310 },
  { text: "6 storage volumes attached to nothing", savings: 90 },
  { text: "Snapshots kept long after they're needed", savings: 60 },
];
</script>

<template>
  <ContentSection
    id="costs"
    eyebrow="Lower costs"
    title="Cost Breakdown and Savings"
    subtitle="AWS cost optimization starts with a line-by-line review of your spend to find what can be turned off, resized, or committed to for a lower rate."
  >
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Spend by service -->
      <div
        class="rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5"
        role="img"
        aria-label="Example monthly AWS spend by service: servers 38%, databases 24%, data transfer 14%, storage 12%, other 12%."
      >
        <div class="mb-4 flex items-center justify-between text-xs">
          <span class="font-semibold text-white">Monthly spend by service</span>
          <span class="text-slate-500">Example</span>
        </div>
        <div class="space-y-3">
          <div
            v-for="row in spend"
            :key="row.service"
            class="flex items-center gap-3 text-sm"
          >
            <span class="w-32 shrink-0 text-slate-400">{{ row.service }}</span>
            <div class="h-2.5 flex-1">
              <div
                class="h-2.5 rounded-r bg-cyan-400"
                :style="{ width: `${(row.share / maxShare) * 100}%` }"
              />
            </div>
            <span class="w-10 text-right text-slate-300">{{ row.share }}%</span>
          </div>
        </div>
      </div>

      <!-- Findings -->
      <div class="rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5">
        <div class="mb-4 flex items-center justify-between text-xs">
          <span class="font-semibold text-white">Findings</span>
          <span class="text-slate-500">Est. monthly savings</span>
        </div>
        <ul class="divide-y divide-slate-800 text-sm">
          <li
            v-for="finding in findings"
            :key="finding.text"
            class="flex items-start justify-between gap-3 py-2.5"
          >
            <span class="text-slate-300">{{ finding.text }}</span>
            <span class="shrink-0 font-mono text-cyan-300"
              >${{ finding.savings }}</span
            >
          </li>
        </ul>
        <div class="mt-3 border-t border-slate-800 pt-3 text-xs text-slate-500">
          Each finding comes with the specific change, such as scheduling,
          right-sizing, cleanup, or Savings Plans.
        </div>
      </div>
    </div>
  </ContentSection>
</template>
