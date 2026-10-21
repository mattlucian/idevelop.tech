<script setup lang="ts">
import ContentSection from "../ui/ContentSection.vue";

interface ScopeStep {
  label: string;
  title: string;
  parts: string[];
  outcome: string;
  border: string;
  text: string;
  chip: string;
  height: string;
}

const steps: ScopeStep[] = [
  {
    label: "Start",
    title: "Connect",
    parts: ["Sign-in", "A few tools"],
    outcome: "Customers handle common tasks through their agent",
    border: "border-cyan-500/40",
    text: "text-cyan-400",
    chip: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    height: "md:min-h-56",
  },
  {
    label: "Add",
    title: "Context",
    parts: ["Documentation", "More tools"],
    outcome: "Agents answer detailed questions correctly",
    border: "border-purple-500/40",
    text: "text-purple-400",
    chip: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    height: "md:min-h-64",
  },
  {
    label: "Scale",
    title: "Optimize",
    parts: ["Aggregation", "Bulk actions"],
    outcome: "Analysis and changes across large data sets",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    chip: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    height: "md:min-h-72",
  },
];
</script>

<template>
  <ContentSection
    title="Typical Scope"
    subtitle="Scope depends on your data and what your customers need from it."
  >
    <div class="grid gap-4 md:grid-cols-3 md:items-end">
      <div
        v-for="step in steps"
        :key="step.label"
        :class="[
          'flex flex-col rounded-xl border-t-4 border bg-slate-800/30 p-6',
          step.border,
          step.height,
        ]"
      >
        <div
          :class="['text-xs font-semibold uppercase tracking-wider', step.text]"
        >
          {{ step.label }}
        </div>
        <div class="mt-1 text-2xl font-bold text-white">{{ step.title }}</div>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="part in step.parts"
            :key="part"
            :class="['rounded-full border px-2.5 py-0.5 text-xs', step.chip]"
          >
            {{ part }}
          </span>
        </div>
        <p class="mt-auto pt-6 text-sm text-slate-400">{{ step.outcome }}</p>
      </div>
    </div>
  </ContentSection>
</template>
