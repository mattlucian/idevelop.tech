<script setup lang="ts">
import type { Component } from "vue";
import {
  UserIcon,
  SparklesIcon,
  ServerStackIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
} from "@heroicons/vue/24/outline";
import OutlineIcon from "../elements/OutlineIcon.vue";
import ContentSection from "../ui/ContentSection.vue";

interface FlowNode {
  icon: Component;
  title: string;
  label: string;
  color: "cyan" | "purple" | "emerald" | "white";
  highlight?: boolean;
}

const nodes: FlowNode[] = [
  {
    icon: UserIcon,
    title: "Your Customer",
    label: "Asks in plain language",
    color: "white",
  },
  {
    icon: SparklesIcon,
    title: "Their AI Agent",
    label: "Claude, ChatGPT, and more",
    color: "purple",
  },
  {
    icon: ServerStackIcon,
    title: "MCP Server",
    label: "",
    color: "cyan",
    highlight: true,
  },
  {
    icon: CubeIcon,
    title: "Your Platform",
    label: "Existing API and business logic",
    color: "emerald",
  },
];

const parts = ["Sign-in", "Tools", "Docs"];
</script>

<template>
  <ContentSection
    title="How It Fits"
    subtitle="A layer between your customers' AI agents and the platform you already run."
  >
    <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      <template v-for="(node, index) in nodes" :key="node.title">
        <div
          v-if="index > 0"
          class="flex justify-center shrink-0 text-slate-500"
          aria-hidden="true"
        >
          <ArrowsRightLeftIcon class="hidden md:block w-6 h-6" />
          <ArrowsUpDownIcon class="md:hidden w-6 h-6" />
        </div>

        <!-- Highlighted node: what gets built -->
        <div
          v-if="node.highlight"
          class="relative md:flex-[1.3] rounded-xl p-px bg-linear-to-br from-cyan-400 to-purple-500 mt-3 md:mt-0"
        >
          <span
            class="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-linear-to-r from-cyan-500 to-purple-500 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white"
          >
            What I Build
          </span>
          <div
            class="flex flex-col items-center gap-3 rounded-xl bg-[#0f0f0f] p-5 pt-6 text-center"
          >
            <div
              class="rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-3"
            >
              <OutlineIcon :icon="node.icon" size="lg" :color="node.color" />
            </div>
            <div class="font-semibold text-white">{{ node.title }}</div>
            <div class="flex flex-wrap justify-center gap-2">
              <span
                v-for="part in parts"
                :key="part"
                class="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs text-cyan-300"
              >
                {{ part }}
              </span>
            </div>
          </div>
        </div>

        <!-- Standard node -->
        <div
          v-else
          class="flex md:flex-col items-center gap-4 md:gap-3 rounded-xl border border-slate-700/40 bg-slate-800/40 p-4 md:p-5 md:flex-1 md:text-center"
        >
          <div
            class="shrink-0 rounded-lg border border-slate-700/50 bg-slate-900/60 p-3"
          >
            <OutlineIcon :icon="node.icon" size="lg" :color="node.color" />
          </div>
          <div>
            <div class="font-semibold text-white">{{ node.title }}</div>
            <div class="text-xs md:text-sm text-slate-400">
              {{ node.label }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <p class="mt-8 text-center text-sm text-slate-400">
      Built in your stack, on the API you already have.
    </p>
  </ContentSection>
</template>
