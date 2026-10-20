<script setup lang="ts">
import {
  ArrowPathIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

interface CycleStep {
  actor: "person" | "ai";
  text: string;
  /** Who the person is, such as "Store owner"; AI steps read "AI" */
  who?: string;
  /** Example of what is said or produced in this step */
  quote?: string;
}

interface Props {
  steps: CycleStep[];
  label?: string;
  /** What repeats, shown under the steps */
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
    <ol class="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      <li
        v-for="(step, i) in steps"
        :key="step.text"
        :class="[
          'rounded-lg border px-3 py-2.5 text-sm',
          step.actor === 'ai'
            ? 'border-purple-500/50 bg-purple-500/15 text-purple-100'
            : 'border-slate-700 bg-slate-800/40 text-slate-200',
        ]"
      >
        <span
          :class="[
            'mb-1 flex items-center gap-1.5 text-xs',
            step.actor === 'ai' ? 'text-purple-300' : 'text-slate-500',
          ]"
        >
          <span class="tabular-nums">{{ i + 1 }}</span>
          <component
            :is="step.actor === 'ai' ? SparklesIcon : UserIcon"
            class="h-3.5 w-3.5"
          />
          {{ step.actor === "ai" ? "AI" : (step.who ?? "Person") }}
        </span>
        {{ step.text }}
        <span
          v-if="step.quote"
          :class="[
            'mt-1 block text-xs italic',
            step.actor === 'ai' ? 'text-purple-200/80' : 'text-slate-400',
          ]"
        >
          "{{ step.quote }}"
        </span>
      </li>
    </ol>
    <p
      v-if="loop"
      class="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      {{ loop }}
    </p>
  </div>
</template>
