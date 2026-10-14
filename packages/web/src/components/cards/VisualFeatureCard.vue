<script setup lang="ts">
import type { Component } from "vue";
import OutlineIcon from "../elements/OutlineIcon.vue";

interface Props {
  icon: Component;
  title: string;
  description: string;
  color?: "cyan" | "purple" | "emerald";
  tag?: string;
  /** Describes the mini mockup; when set, it is announced as one image */
  visualLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "cyan",
  tag: "",
  visualLabel: "",
});

const borders = {
  cyan: "border-cyan-500/30",
  purple: "border-purple-500/30",
  emerald: "border-emerald-500/30",
};

const tags = {
  cyan: "border-cyan-500/30 text-cyan-300",
  purple: "border-purple-500/30 text-purple-300",
  emerald: "border-emerald-500/30 text-emerald-300",
};
</script>

<template>
  <div
    :class="[
      'flex flex-col rounded-xl border bg-linear-to-br from-slate-900/40 to-slate-800/40 p-6',
      borders[props.color],
    ]"
  >
    <div class="flex items-start justify-between gap-3">
      <OutlineIcon :icon="icon" size="lg" :color="color" />
      <span
        v-if="tag"
        :class="[
          'rounded-full border px-2.5 py-0.5 text-xs',
          tags[props.color],
        ]"
      >
        {{ tag }}
      </span>
    </div>
    <h3 class="mt-4 text-xl font-semibold text-white">{{ title }}</h3>
    <p class="mt-2 mb-5 text-sm text-slate-400">{{ description }}</p>

    <!-- Mini visual -->
    <div
      class="mt-auto rounded-lg border border-slate-800 bg-[#0a0a0a] p-4 text-xs"
      :role="visualLabel ? 'img' : undefined"
      :aria-label="visualLabel || undefined"
    >
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-3 text-xs">
      <slot name="footer" />
    </div>
  </div>
</template>
