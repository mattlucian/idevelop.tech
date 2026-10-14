<script setup lang="ts">
export type PillTone =
  | "cyan"
  | "purple"
  | "emerald"
  | "amber"
  | "red"
  | "orange"
  | "slate";

interface Props {
  tone?: PillTone;
}

withDefaults(defineProps<Props>(), {
  tone: "slate",
});

const toneClasses: Record<PillTone, string> = {
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  red: "border-red-500/30 bg-red-500/10 text-red-300",
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  slate: "border-slate-700 bg-slate-900/60 text-slate-400",
};
</script>

<template>
  <span
    :class="[
      'inline-flex w-fit shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs',
      toneClasses[tone],
    ]"
  >
    <slot />
  </span>
</template>
