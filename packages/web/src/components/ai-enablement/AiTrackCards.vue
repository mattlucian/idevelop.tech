<script setup lang="ts">
import {
  UserGroupIcon,
  CodeBracketIcon,
  ClockIcon,
  ArrowDownIcon,
  FlagIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import VisualFeatureCard from "../cards/VisualFeatureCard.vue";

const fitLabels = {
  draft: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  assist: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  manual: "border-slate-600 bg-slate-800/60 text-slate-400",
};

const workflowReview: {
  task: string;
  fit: keyof typeof fitLabels;
  label: string;
}[] = [
  { task: "Weekly sales report", fit: "draft", label: "AI drafts" },
  { task: "Support ticket triage", fit: "assist", label: "AI assists" },
  { task: "Vendor payments", fit: "manual", label: "Keep manual" },
];

const agentInputs = ["API docs", "Requirements", "Your patterns"];

const schedule = [
  { time: "06:00", task: "Inventory sync", ai: false },
  { time: "07:00", task: "Late shipment review", ai: true },
  { time: "08:00", task: "Missing product data", ai: true },
];
</script>

<template>
  <ContentSection
    title="Ways I Can Help"
    subtitle="Many organizations combine these."
  >
    <div class="grid gap-6 md:grid-cols-3">
      <!-- Team adoption -->
      <VisualFeatureCard
        :icon="UserGroupIcon"
        title="Team Training"
        description="Hands-on workshops built around your team's real tasks, using tools like Claude and ChatGPT."
        color="cyan"
        tag="Any team"
      >
        <div class="mb-3 uppercase tracking-wider text-slate-500">
          Workflow review
        </div>
        <div class="space-y-2">
          <div
            v-for="row in workflowReview"
            :key="row.task"
            class="flex items-center justify-between gap-2"
          >
            <span class="text-slate-300">{{ row.task }}</span>
            <span
              :class="[
                'shrink-0 rounded-full border px-2 py-0.5',
                fitLabels[row.fit],
              ]"
            >
              {{ row.label }}
            </span>
          </div>
        </div>
      </VisualFeatureCard>

      <!-- AI operations -->
      <VisualFeatureCard
        :icon="ClockIcon"
        title="Operational Workflows"
        description="Scheduled AI checks that flag items for your team to review."
        color="emerald"
        tag="Operations"
      >
        <div class="space-y-2">
          <div
            v-for="job in schedule"
            :key="job.time"
            class="flex items-center gap-3"
          >
            <span class="font-mono text-slate-500">{{ job.time }}</span>
            <span class="flex-1 text-slate-300">{{ job.task }}</span>
            <span
              :class="[
                'shrink-0 rounded-full border px-2 py-0.5',
                job.ai
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-600 text-slate-400',
              ]"
            >
              {{ job.ai ? "AI" : "Job" }}
            </span>
          </div>
        </div>
        <div
          class="mt-3 flex items-center gap-2 border-t border-slate-800 pt-3 text-slate-300"
        >
          <FlagIcon class="h-4 w-4 text-orange-400" />
          3 items flagged for review
        </div>
      </VisualFeatureCard>
      <!-- Agent-assisted development -->
      <VisualFeatureCard
        :icon="CodeBracketIcon"
        title="AI-Assisted Development"
        description="Instructions and reference patterns that help your engineers build integrations with AI."
        color="purple"
        tag="Engineering"
      >
        <div class="flex flex-col items-center gap-2 text-center">
          <div class="flex flex-wrap justify-center gap-1.5">
            <span
              v-for="input in agentInputs"
              :key="input"
              class="rounded border border-slate-700 px-2 py-0.5 text-slate-300"
            >
              {{ input }}
            </span>
          </div>
          <ArrowDownIcon class="h-3 w-3 text-slate-600" />
          <span
            class="rounded border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-300"
          >
            Agent builds a working prototype
          </span>
          <ArrowDownIcon class="h-3 w-3 text-slate-600" />
          <span class="rounded border border-slate-700 px-3 py-1 text-white">
            Engineer reviews and finishes
          </span>
        </div>
      </VisualFeatureCard>
    </div>
  </ContentSection>
</template>
