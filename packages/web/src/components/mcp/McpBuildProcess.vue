<script setup lang="ts">
import {
  LightBulbIcon,
  MapIcon,
  CodeBracketIcon,
  BeakerIcon,
  FolderIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import OutlineIcon from "../elements/OutlineIcon.vue";
import Pill from "../elements/badges/Pill.vue";

const questions = [
  {
    text: "Which suppliers ship late most often?",
    kind: "Correlate data",
    tone: "purple" as const,
  },
  {
    text: "Pause listings from that supplier",
    kind: "Bulk action",
    tone: "emerald" as const,
  },
  {
    text: "Has order 1042 shipped?",
    kind: "Lookup",
    tone: "slate" as const,
  },
];

const capabilities = [
  { name: "Order lookup", path: "Existing endpoint", tone: "slate" as const },
  {
    name: "Late shipments by supplier",
    path: "New aggregation",
    tone: "purple" as const,
  },
  { name: "Pause listings", path: "New bulk action", tone: "emerald" as const },
];

const decisions = [
  { label: "Sign-in", value: "Your existing accounts" },
  { label: "Deploy", value: "Separate service" },
];

const files = [
  { name: "auth/", note: "sign-in and consent" },
  { name: "tools/", note: "lookup, analyze, act" },
  { name: "docs/", note: "field reference, tool guides" },
  { name: "instructions.md", note: "how agents should use it" },
];

const testRuns = [
  { question: "Which suppliers ship late most often?", ok: true, note: "" },
  {
    question: "What's my margin on Amazon this month?",
    ok: false,
    note: "Picked the wrong cost field. Field reference updated.",
  },
  { question: "Pause listings from Acme Supply", ok: true, note: "" },
];

const considerations = [
  { icon: ShieldCheckIcon, text: "Permissions per user" },
  { icon: ClockIcon, text: "Rate limits" },
  { icon: ClipboardDocumentListIcon, text: "Audit logging" },
  { icon: ChatBubbleBottomCenterTextIcon, text: "Errors written for agents" },
  { icon: ArrowPathIcon, text: "Versioning as your API changes" },
];

const phases = [
  {
    icon: LightBulbIcon,
    title: "Find the Value",
    desc: "Start with what your customers would ask an agent. The most valuable questions often mean analyzing and correlating data across your platform.",
  },
  {
    icon: MapIcon,
    title: "Plan the Approach",
    desc: "For each capability: does it map to an existing endpoint, or need new functionality? Decide how sign-in works and where the server runs.",
  },
  {
    icon: CodeBracketIcon,
    title: "Build It",
    desc: "Built with patterns your developers already know. Scope decides whether it's a separate package or part of an existing API. Documentation and agent instructions are part of the build.",
  },
  {
    icon: BeakerIcon,
    title: "Test With Real Agents",
    desc: "Real customer questions run in Claude and ChatGPT. When an agent gets something wrong, the tools or documentation are adjusted until it gets it right.",
  },
];
</script>

<template>
  <ContentSection
    banded
    title="How an MCP Server Gets Built"
    subtitle="Scope varies from platform to platform. The work moves through these phases."
  >
    <ol class="space-y-6">
      <li
        v-for="(phase, index) in phases"
        :key="phase.title"
        class="grid gap-5 rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5 md:grid-cols-5 md:p-6"
      >
        <!-- Text -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3">
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 text-sm font-semibold text-cyan-300"
            >
              {{ index + 1 }}
            </span>
            <OutlineIcon :icon="phase.icon" size="md" color="cyan" />
            <h3 class="text-lg font-semibold text-white">{{ phase.title }}</h3>
          </div>
          <p class="mt-3 text-sm text-slate-400">{{ phase.desc }}</p>
        </div>

        <!-- Example -->
        <div
          class="rounded-lg border border-slate-800 bg-[#0a0a0a] p-4 text-xs md:col-span-3"
          aria-hidden="true"
        >
          <!-- 1. Questions ranked -->
          <ul v-if="index === 0" class="space-y-2">
            <li
              v-for="question in questions"
              :key="question.text"
              class="flex items-center justify-between gap-3"
            >
              <span class="italic text-slate-300">"{{ question.text }}"</span>
              <Pill :tone="question.tone">{{ question.kind }}</Pill>
            </li>
          </ul>

          <!-- 2. Capability plan -->
          <div v-else-if="index === 1">
            <div
              v-for="capability in capabilities"
              :key="capability.name"
              class="flex items-center justify-between gap-3 border-b border-slate-800 py-1.5 last:border-b-0"
            >
              <span class="text-slate-300">{{ capability.name }}</span>
              <Pill :tone="capability.tone">{{ capability.path }}</Pill>
            </div>
            <div class="mt-3 grid grid-cols-2 gap-2">
              <div
                v-for="decision in decisions"
                :key="decision.label"
                class="rounded border border-slate-800 px-2 py-1.5"
              >
                <div class="text-slate-500">{{ decision.label }}</div>
                <div class="text-white">{{ decision.value }}</div>
              </div>
            </div>
          </div>

          <!-- 3. Server structure -->
          <ul v-else-if="index === 2" class="space-y-1.5 font-mono">
            <li class="flex items-center gap-2 text-white">
              <FolderIcon class="h-4 w-4 text-cyan-400" />mcp-server/
            </li>
            <li
              v-for="file in files"
              :key="file.name"
              class="flex items-center gap-2 pl-6"
            >
              <component
                :is="file.name.endsWith('/') ? FolderIcon : DocumentTextIcon"
                class="h-4 w-4 shrink-0 text-slate-500"
              />
              <span class="text-slate-200">{{ file.name }}</span>
              <span class="font-sans text-slate-500">{{ file.note }}</span>
            </li>
          </ul>

          <!-- 4. Test runs -->
          <ul v-else class="space-y-2">
            <li v-for="run in testRuns" :key="run.question">
              <div class="flex items-start gap-2">
                <CheckCircleIcon
                  v-if="run.ok"
                  class="h-4 w-4 shrink-0 text-emerald-400"
                />
                <ExclamationTriangleIcon
                  v-else
                  class="h-4 w-4 shrink-0 text-amber-400"
                />
                <span class="text-slate-300">{{ run.question }}</span>
              </div>
              <div v-if="run.note" class="ml-6 text-amber-200">
                {{ run.note }}
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ol>

    <!-- Other parts of the build -->
    <div class="mt-8 rounded-xl border border-dashed border-slate-700 p-5">
      <div
        class="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        Also part of the build
      </div>
      <ul class="flex flex-wrap justify-center gap-2">
        <li
          v-for="item in considerations"
          :key="item.text"
          class="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-sm text-slate-300"
        >
          <component :is="item.icon" class="h-4 w-4 text-cyan-400" />
          {{ item.text }}
        </li>
      </ul>
    </div>
  </ContentSection>
</template>
