<script setup lang="ts">
import {
  LockClosedIcon,
  WrenchScrewdriverIcon,
  BookOpenIcon,
  SparklesIcon,
  ArrowDownIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import VisualFeatureCard from "../cards/VisualFeatureCard.vue";

const connectedAgents = ["Claude", "ChatGPT"];

const toolMappings = [
  { endpoint: "GET /orders", tool: "search_orders" },
  { endpoint: "POST /listings/pause", tool: "pause_listings" },
];

const fieldNotes = [
  { field: "margin", note: "Sale price minus supplier cost and fees" },
  { field: "ship_by", note: "Set from the supplier's handling time" },
];
</script>

<template>
  <ContentSection
    title="What an MCP Server Includes"
    subtitle="Three parts, sized to your platform."
  >
    <div class="grid gap-6 md:grid-cols-3">
      <VisualFeatureCard
        :icon="LockClosedIcon"
        title="Secure Sign-In"
        description="Customers connect agents with the account they already have."
        color="cyan"
      >
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-slate-300">
            <SparklesIcon class="h-4 w-4 shrink-0 text-purple-400" />
            Claude wants to access your account
          </div>
          <div class="flex gap-2">
            <span
              class="flex-1 rounded border border-slate-700 py-1 text-center text-slate-400"
              >Deny</span
            >
            <span
              class="flex-1 rounded bg-cyan-500/80 py-1 text-center font-semibold text-white"
              >Allow</span
            >
          </div>
          <div class="border-t border-slate-800 pt-3">
            <div class="mb-2 uppercase tracking-wider text-slate-500">
              Connected agents
            </div>
            <div
              v-for="agent in connectedAgents"
              :key="agent"
              class="flex justify-between py-0.5 text-slate-300"
            >
              <span>{{ agent }}</span>
              <span class="text-red-400">Revoke</span>
            </div>
          </div>
        </div>
      </VisualFeatureCard>

      <VisualFeatureCard
        :icon="WrenchScrewdriverIcon"
        title="Tools"
        description="The actions an agent can take, built on your existing API."
        color="purple"
      >
        <div class="space-y-3 font-mono">
          <div
            v-for="mapping in toolMappings"
            :key="mapping.tool"
            class="flex flex-col items-start gap-1"
          >
            <span class="text-slate-500">{{ mapping.endpoint }}</span>
            <ArrowDownIcon class="ml-2 h-3 w-3 text-slate-600" />
            <span
              class="rounded border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-purple-300"
              >{{ mapping.tool }}</span
            >
          </div>
        </div>
      </VisualFeatureCard>

      <VisualFeatureCard
        :icon="BookOpenIcon"
        title="Documentation"
        description="The context agents need to answer correctly about your platform."
        color="emerald"
      >
        <div class="space-y-3">
          <div v-for="entry in fieldNotes" :key="entry.field">
            <code class="font-mono text-emerald-300">{{ entry.field }}</code>
            <p class="mt-1 text-slate-400">{{ entry.note }}</p>
          </div>
        </div>
      </VisualFeatureCard>
    </div>
  </ContentSection>
</template>
