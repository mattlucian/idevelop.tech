<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import FlowArrow from "../elements/FlowArrow.vue";
import { flowStepClass, type FlowStep } from "./flowStep";

export interface FlowOutcome {
  when: string;
  then: string;
  /** "person" marks an outcome that goes to staff */
  tone?: "auto" | "person";
}

interface Props {
  steps: FlowStep[];
  outcomes: FlowOutcome[];
  /** Feedback loop described under the flow */
  loop?: string;
}

withDefaults(defineProps<Props>(), { loop: undefined });
</script>

<template>
  <div>
    <div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <template v-for="(step, i) in steps" :key="step.text">
        <FlowArrow v-if="i > 0" size="sm" />
        <div class="flex flex-1 flex-col md:basis-0">
          <div
            :class="[
              'flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 text-center text-sm',
              flowStepClass(step),
            ]"
          >
            {{ step.text }}
          </div>
          <span
            v-if="step.note"
            class="mt-1.5 text-center text-xs text-slate-500"
          >
            {{ step.note }}
          </span>
        </div>
      </template>
      <FlowArrow size="sm" />
      <div class="flex flex-1 flex-col gap-2 md:basis-0">
        <div
          v-for="outcome in outcomes"
          :key="outcome.when"
          :class="[
            'rounded-lg border px-3 py-2 text-center text-sm text-slate-200',
            outcome.tone === 'person'
              ? 'border-amber-500/40 bg-amber-500/5'
              : 'border-slate-700 bg-slate-800/40',
          ]"
        >
          <span class="block text-xs text-slate-500">{{ outcome.when }}</span>
          {{ outcome.then }}
        </div>
      </div>
    </div>
    <p
      v-if="loop"
      class="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      {{ loop }}
    </p>
  </div>
</template>
