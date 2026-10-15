<script setup lang="ts">
import {
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
import OutlineIcon from "../elements/OutlineIcon.vue";
import ContentSection from "../ui/ContentSection.vue";

const rows = [
  {
    knowledge: "Orders without tracking after 3 days are running late",
    skill: "Late shipment review",
    result: "12 late orders flagged, supplier emails drafted",
  },
  {
    knowledge: "Listings need a brand, UPC, and at least two images",
    skill: "Product data check",
    result: "38 listings missing UPCs, sent to the catalog team",
  },
  {
    knowledge: "New integrations follow our reference build",
    skill: "Integration build",
    result: "Working prototype ready for an engineer to review",
  },
];

const columns = [
  {
    icon: UserGroupIcon,
    title: "What your team knows",
    color: "emerald" as const,
  },
  {
    icon: DocumentTextIcon,
    title: "Written down as an AI skill",
    color: "purple" as const,
  },
  {
    icon: CheckCircleIcon,
    title: "Work that gets done",
    color: "cyan" as const,
  },
];
import FlowArrow from "../elements/FlowArrow.vue";
</script>

<template>
  <ContentSection
    title="From What Your Team Knows to Work That Gets Done"
    subtitle="AI works from what your people already know. Your team keeps the skills and updates them as things change."
  >
    <!-- Column headers (desktop) -->
    <div
      class="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 mb-4"
    >
      <template v-for="(column, index) in columns" :key="column.title">
        <div v-if="index > 0" class="w-5" />
        <div class="flex items-center justify-center gap-2">
          <OutlineIcon :icon="column.icon" size="md" :color="column.color" />
          <span
            class="text-xs font-semibold uppercase tracking-wider text-slate-300"
          >
            {{ column.title }}
          </span>
        </div>
      </template>
    </div>

    <div class="space-y-4">
      <div
        v-for="row in rows"
        :key="row.skill"
        class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch md:items-center gap-2 md:gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4 md:border-0 md:bg-transparent md:p-0"
      >
        <!-- Knowledge -->
        <div
          class="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm italic text-emerald-100"
        >
          <span class="md:hidden not-italic text-xs text-emerald-400 block mb-1"
            >Your team knows</span
          >
          "{{ row.knowledge }}"
        </div>

        <FlowArrow size="md" />

        <!-- Skill -->
        <div
          class="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-[#0f0f0f] px-4 py-3"
        >
          <DocumentTextIcon class="h-5 w-5 shrink-0 text-purple-400" />
          <span class="text-sm font-semibold text-white">{{ row.skill }}</span>
        </div>

        <FlowArrow size="md" />

        <!-- Result -->
        <div
          class="flex items-start gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100"
        >
          <CheckCircleIcon class="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
          {{ row.result }}
        </div>
      </div>
    </div>
  </ContentSection>
</template>
