<script setup lang="ts">
import { computed, type Component } from "vue";

interface ScenarioField {
  label: string;
  value: string;
}

interface Props {
  /** `ai` marks work AI does; `person` marks a person's decision */
  tone?: "neutral" | "ai" | "person";
  label?: string;
  /** Heroicon shown before the label, such as the person or system involved */
  icon?: Component;
  fields?: ScenarioField[];
}

const props = withDefaults(defineProps<Props>(), {
  tone: "neutral",
  label: undefined,
  icon: undefined,
  fields: undefined,
});

const tones = {
  neutral: {
    box: "border-slate-700 bg-slate-800/40 text-slate-200",
    label: "text-slate-500",
    key: "text-slate-500",
    value: "text-slate-200",
  },
  ai: {
    box: "border-purple-500/50 bg-purple-500/15 text-purple-100",
    label: "text-purple-300",
    key: "text-purple-300/70",
    value: "text-purple-100",
  },
  person: {
    box: "border-amber-500/40 bg-amber-500/5 text-slate-200",
    label: "text-amber-300",
    key: "text-slate-500",
    value: "text-slate-200",
  },
};

const tone = computed(() => tones[props.tone]);
</script>

<template>
  <div :class="['rounded-lg border px-3 py-2.5 text-sm', tone.box]">
    <p
      v-if="label"
      :class="[
        'mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider',
        tone.label,
      ]"
    >
      <component :is="icon" v-if="icon" class="h-3.5 w-3.5 shrink-0" />
      {{ label }}
    </p>
    <slot />
    <dl v-if="fields" class="space-y-1.5">
      <div
        v-for="field in fields"
        :key="field.label"
        class="flex justify-between gap-3"
      >
        <dt :class="['shrink-0 text-xs', tone.key]">{{ field.label }}</dt>
        <dd :class="['text-right text-xs', tone.value]">{{ field.value }}</dd>
      </div>
    </dl>
  </div>
</template>
