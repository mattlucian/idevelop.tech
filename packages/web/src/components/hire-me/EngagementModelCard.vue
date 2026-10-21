<script setup lang="ts">
import type { Component } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import OutlineIcon from "../elements/OutlineIcon.vue";

interface EngagementStep {
  text: string;
  optional?: boolean;
}

interface Props {
  icon: Component;
  title: string;
  description: string;
  facts: string[];
  steps: EngagementStep[];
  /** Note under the steps when they repeat, such as each month */
  repeat?: string;
}

withDefaults(defineProps<Props>(), { repeat: undefined });
</script>

<template>
  <div
    class="flex flex-col rounded-xl border border-cyan-500/30 bg-[#0f0f0f] p-6"
  >
    <div class="flex items-center gap-3">
      <OutlineIcon :icon="icon" size="lg" />
      <h3 class="text-xl font-semibold text-white">{{ title }}</h3>
    </div>
    <p class="mt-2 text-sm text-slate-400">{{ description }}</p>

    <ul class="mt-4 flex flex-wrap gap-2">
      <li
        v-for="fact in facts"
        :key="fact"
        class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
      >
        {{ fact }}
      </li>
    </ul>

    <div
      class="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500"
    >
      How it typically works
    </div>
    <ol class="mt-3 space-y-2">
      <li
        v-for="(step, index) in steps"
        :key="step.text"
        class="flex items-center gap-3 text-sm"
      >
        <span
          :class="[
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
            step.optional
              ? 'border-dashed border-slate-600 text-slate-500'
              : 'border-cyan-500/40 text-cyan-300',
          ]"
        >
          {{ index + 1 }}
        </span>
        <span :class="step.optional ? 'text-slate-500' : 'text-slate-200'">
          {{ step.text }}
        </span>
      </li>
    </ol>
    <p
      v-if="repeat"
      class="mt-3 flex items-center gap-2 text-xs text-emerald-300"
    >
      <ArrowPathIcon class="h-4 w-4" />
      {{ repeat }}
    </p>
  </div>
</template>
