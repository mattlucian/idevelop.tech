<script setup lang="ts">
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

const stages = [
  {
    title: "Cleanup",
    detail: "Unused volumes, old snapshots, idle resources",
    safeguard: "Snapshots taken before anything is deleted",
  },
  {
    title: "Scheduling and right-sizing",
    detail: "Dev environments off after hours, servers matched to real usage",
    safeguard: "The previous size can be restored in minutes",
  },
  {
    title: "Performance changes",
    detail: "Caching, autoscaling, read replicas",
    safeguard: "Rolled out behind a setting that can be turned off",
  },
  {
    title: "Commitments",
    detail: "Savings Plans or Reserved Instances",
    safeguard: "Bought only after usage has settled",
  },
];
</script>

<template>
  <ContentSection
    banded
    eyebrow="Implementation"
    title="Implementing the Changes"
    subtitle="Changes are prioritized by impact, effort, and your goals, then tested and rolled out with a way to reverse them. Commitments like Savings Plans wait until usage settles."
  >
    <ol class="grid gap-4 md:grid-cols-4">
      <li
        v-for="stage in stages"
        :key="stage.title"
        class="flex flex-col rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-4"
      >
        <div class="flex-1">
          <div class="font-semibold text-white">{{ stage.title }}</div>
          <div class="mt-1 text-sm text-slate-400">{{ stage.detail }}</div>
        </div>
        <div
          class="mt-4 flex items-start gap-1.5 border-t border-slate-800 pt-3 text-xs text-slate-300"
        >
          <ArrowUturnLeftIcon
            class="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-400"
          />
          {{ stage.safeguard }}
        </div>
      </li>
    </ol>
    <p class="mt-6 text-center text-sm text-slate-400">
      Larger moves, like a migration onto AWS or between services, follow the
      same staged approach.
    </p>
  </ContentSection>
</template>
