<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import FlowArrow from "../elements/FlowArrow.vue";
import { flowStepClass as stepClass, type FlowStep } from "./flowStep";

interface Props {
  steps: FlowStep[];
  label?: string;
  /** Feedback loop described under the flow */
  loop?: string;
}

withDefaults(defineProps<Props>(), {
  label: undefined,
  loop: undefined,
});
</script>

<template>
  <div>
    <p
      v-if="label"
      class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
    >
      {{ label }}
    </p>
    <div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <template v-for="(step, i) in steps" :key="step.text">
        <FlowArrow v-if="i > 0" size="sm" />
        <div class="flex flex-1 flex-col md:basis-0">
          <div
            :class="[
              'flex min-h-14 flex-col items-center justify-center rounded-lg border px-3 py-2 text-center text-sm',
              stepClass(step),
            ]"
          >
            <span v-if="step.eyebrow" class="text-xs text-slate-500">
              {{ step.eyebrow }}
            </span>
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
