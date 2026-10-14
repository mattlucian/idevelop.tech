<script setup lang="ts">
import type { Component } from "vue";
import {
  LightBulbIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";
import OutlineIcon from "../elements/OutlineIcon.vue";
import ContentSection from "../ui/ContentSection.vue";

interface PathStep {
  icon: Component;
  title: string;
  desc: string;
}

interface FlowChip {
  label: string;
  style: "ai" | "plain" | "person" | "faded";
}

interface WorkflowType {
  icon: Component;
  title: string;
  color: "cyan" | "purple";
  border: string;
  flow: FlowChip[];
  flowCaption: string;
  details: { label: string; text: string }[];
}

const steps: PathStep[] = [
  {
    icon: LightBulbIcon,
    title: "Pick One Problem",
    desc: "Chosen together in a free consultation",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Work It by Hand",
    desc: "Map the steps and agree on expected results",
  },
  {
    icon: BeakerIcon,
    title: "Prototype",
    desc: "AI builds a first version your team reviews",
  },
];

const chipStyles = {
  ai: "border-purple-500/40 bg-purple-500/15 text-purple-200",
  plain: "border-slate-600 bg-slate-800/60 text-slate-200",
  person: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
  faded: "border-dashed border-slate-700 text-slate-500",
};

const workflowTypes: WorkflowType[] = [
  {
    icon: Cog6ToothIcon,
    title: "AI Builds the Automation",
    color: "cyan",
    border: "border-cyan-500/40",
    flow: [
      { label: "AI", style: "faded" },
      { label: "Automation", style: "plain" },
      { label: "Results", style: "plain" },
    ],
    flowCaption: "AI is only used while building",
    details: [
      { label: "Best for", text: "Work with clear, consistent rules" },
      {
        label: "Once it's live",
        text: "Runs like any other automated process, with no AI usage costs",
      },
      {
        label: "Example",
        text: "Syncing orders into your accounting system",
      },
    ],
  },
  {
    icon: UserGroupIcon,
    title: "AI Works Alongside Your Team",
    color: "purple",
    border: "border-purple-500/40",
    flow: [
      { label: "New case", style: "plain" },
      { label: "AI", style: "ai" },
      { label: "Review", style: "person" },
      { label: "Done", style: "plain" },
    ],
    flowCaption: "AI handles each case, a person approves",
    details: [
      {
        label: "Best for",
        text: "Work that needs reading or judgment, like emails, product data, or exceptions",
      },
      {
        label: "Once it's live",
        text: "AI handles each case as it comes in, and a person approves the results",
      },
      {
        label: "Example",
        text: "Reviewing late shipments each morning and drafting supplier follow-ups",
      },
    ],
  },
];
import FlowArrow from "../elements/FlowArrow.vue";
import CalloutStrip from "../elements/CalloutStrip.vue";
</script>

<template>
  <ContentSection
    banded
    title="From Manual to Automated"
    subtitle="One problem at a time, with your team reviewing each step."
  >
    <!-- Steps -->
    <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
      <template v-for="(step, index) in steps" :key="step.title">
        <FlowArrow v-if="index > 0" class="shrink-0" />
        <div
          class="flex md:flex-col items-center gap-4 md:gap-2 rounded-xl border border-slate-700/40 bg-slate-800/40 p-4 md:p-5 md:flex-1 md:text-center"
        >
          <OutlineIcon :icon="step.icon" size="lg" color="white" />
          <div>
            <div class="font-semibold text-white">{{ step.title }}</div>
            <div class="text-xs md:text-sm text-slate-400">
              {{ step.desc }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Fork -->
    <div class="my-6 flex flex-col items-center text-slate-500">
      <ArrowDownIcon class="w-6 h-6" aria-hidden="true" />
      <span class="mt-2 text-xs uppercase tracking-wider">
        The prototype becomes one of two kinds of workflow
      </span>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="type in workflowTypes"
        :key="type.title"
        :class="[
          'flex flex-col rounded-xl border bg-[#0f0f0f] p-6',
          type.border,
        ]"
      >
        <div class="flex items-center gap-3">
          <OutlineIcon :icon="type.icon" size="lg" :color="type.color" />
          <h3 class="text-xl font-semibold text-white">{{ type.title }}</h3>
        </div>

        <!-- Mini flow -->
        <div class="mt-5 rounded-lg border border-slate-800 bg-[#0a0a0a] p-4">
          <div class="flex flex-wrap items-center justify-center gap-1.5">
            <template v-for="(chip, index) in type.flow" :key="chip.label">
              <ArrowRightIcon
                v-if="index > 0"
                class="h-3 w-3 shrink-0 text-slate-600"
                aria-hidden="true"
              />
              <span
                :class="[
                  'rounded border px-2 py-0.5 text-xs',
                  chipStyles[chip.style],
                ]"
              >
                {{ chip.label }}
              </span>
            </template>
          </div>
          <p class="mt-3 text-center text-xs text-slate-500">
            {{ type.flowCaption }}
          </p>
        </div>

        <dl class="mt-5 space-y-3 text-sm">
          <div v-for="detail in type.details" :key="detail.label">
            <dt
              class="text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              {{ detail.label }}
            </dt>
            <dd class="mt-0.5 text-slate-300">{{ detail.text }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Feedback loop -->
    <CalloutStrip :icon="ArrowPathIcon" icon-class="text-emerald-400">
      Cases it can't handle yet are logged and used to improve it. Then on to
      the next problem.
    </CalloutStrip>
  </ContentSection>
</template>
