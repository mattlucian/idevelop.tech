<script setup lang="ts">
import { WrenchScrewdriverIcon } from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

interface ChatMessage {
  kind: "customer" | "agent" | "tool";
  text: string;
  detail?: string;
}

const messages: ChatMessage[] = [
  { kind: "customer", text: "Which orders are running late this week?" },
  {
    kind: "tool",
    text: "search_orders",
    detail: "status: late · last 7 days",
  },
  {
    kind: "agent",
    text: "14 orders are late. 9 are from Acme Supply, averaging 6 days behind.",
  },
  {
    kind: "customer",
    text: "Pause Acme's listings until we sort it out.",
  },
  {
    kind: "tool",
    text: "pause_listings",
    detail: "supplier: Acme Supply · 42 listings",
  },
  { kind: "agent", text: "Done. 42 Acme Supply listings are paused." },
];
</script>

<template>
  <ContentSection
    banded
    title="Example Conversation"
    subtitle="A customer asks a question, and their agent uses your platform to answer it or take action."
  >
    <div
      class="mx-auto max-w-2xl overflow-hidden rounded-xl border border-slate-700/40 bg-[#0f0f0f]"
    >
      <!-- Window bar -->
      <div
        class="flex items-center gap-2 border-b border-slate-800 bg-slate-900/60 px-4 py-3"
      >
        <span class="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span class="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span class="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span class="ml-3 text-xs text-slate-500">AI Agent</span>
      </div>

      <div class="space-y-3 p-4 md:p-6">
        <template v-for="(message, index) in messages" :key="index">
          <div v-if="message.kind === 'customer'" class="flex justify-end">
            <div
              class="max-w-[85%] rounded-2xl rounded-br-sm bg-cyan-500/15 border border-cyan-500/30 px-4 py-2 text-sm md:text-base text-white"
            >
              {{ message.text }}
            </div>
          </div>

          <div
            v-else-if="message.kind === 'tool'"
            class="flex flex-wrap items-center gap-2 pl-1 text-xs"
          >
            <WrenchScrewdriverIcon class="h-4 w-4 text-purple-400" />
            <span class="text-slate-500">Used</span>
            <code
              class="rounded border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono text-purple-300"
            >
              {{ message.text }}
            </code>
            <span class="font-mono text-slate-500">{{ message.detail }}</span>
          </div>

          <div v-else class="flex justify-start">
            <div
              class="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-800/60 border border-slate-700/40 px-4 py-2 text-sm md:text-base text-slate-200"
            >
              {{ message.text }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </ContentSection>
</template>
