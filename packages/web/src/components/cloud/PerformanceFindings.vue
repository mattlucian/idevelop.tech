<script setup lang="ts">
import ContentSection from "../ui/ContentSection.vue";

const findings = [
  {
    area: "Product pages",
    symptom: "Slow during traffic spikes",
    cause: "Each request goes to the database",
    change: "Cache pages at the edge with CloudFront",
  },
  {
    area: "Checkout",
    symptom: "Timeouts at peak hours",
    cause: "A fixed number of servers",
    change: "Autoscaling based on load",
  },
  {
    area: "Nightly import",
    symptom: "Runs into business hours",
    cause: "One large job processing items in sequence",
    change: "Split into parallel jobs with SQS",
  },
  {
    area: "Reports",
    symptom: "Slow queries slow down the whole app",
    cause: "Reports run on the main database",
    change: "Move reporting to a read replica",
  },
];
</script>

<template>
  <ContentSection
    id="performance"
    eyebrow="Better performance"
    title="Find Where Performance Is Lost"
    subtitle="Slow pages and timeouts usually trace back to a few causes. Each one gets a specific change, often with a cost impact noted alongside."
  >
    <!-- Desktop table -->
    <div
      class="hidden md:block overflow-hidden rounded-xl border border-slate-700/50 bg-[#0f0f0f]"
    >
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500"
          >
            <th class="px-5 py-3 font-medium">Area</th>
            <th class="px-5 py-3 font-medium">What users see</th>
            <th class="px-5 py-3 font-medium">Cause</th>
            <th class="px-5 py-3 font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in findings"
            :key="row.area"
            class="border-b border-slate-800 last:border-b-0"
          >
            <td class="px-5 py-3 font-semibold text-white">{{ row.area }}</td>
            <td class="px-5 py-3 text-slate-400">{{ row.symptom }}</td>
            <td class="px-5 py-3 text-slate-400">{{ row.cause }}</td>
            <td class="px-5 py-3 text-emerald-300">{{ row.change }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile cards -->
    <div class="space-y-3 md:hidden">
      <div
        v-for="row in findings"
        :key="row.area"
        class="rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-4 text-sm"
      >
        <div class="font-semibold text-white">{{ row.area }}</div>
        <div class="mt-1 text-slate-400">{{ row.symptom }}</div>
        <div class="mt-1 text-xs text-slate-500">Cause: {{ row.cause }}</div>
        <div class="mt-2 text-emerald-300">{{ row.change }}</div>
      </div>
    </div>
  </ContentSection>
</template>
