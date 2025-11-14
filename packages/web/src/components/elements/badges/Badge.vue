<script setup lang="ts">
type BadgeVariant =
  | "default"
  | "teal"
  | "cyan"
  | "purple"
  | "emerald"
  | "muted";

interface BadgeProps {
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  /** Show icon before text */
  icon?: string;
}

withDefaults(defineProps<BadgeProps>(), {
  variant: "default",
  icon: undefined,
});

const variantClasses = {
  default:
    "px-2.5 py-1 text-[11px] font-semibold rounded-md bg-linear-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/30",
  teal: "px-2 py-0.5 rounded-md text-xs border text-teal-400 bg-teal-700/10 border-teal-700/20",
  cyan: "px-2 py-0.5 rounded-md text-xs border text-cyan-400 bg-cyan-700/10 border-cyan-700/20",
  purple:
    "px-2 py-0.5 rounded-md text-xs border text-purple-400 bg-purple-700/10 border-purple-700/20",
  emerald:
    "px-2 py-0.5 rounded-md text-xs border text-emerald-400 bg-emerald-700/10 border-emerald-700/20",
  muted:
    "px-2.5 py-1 text-[11px] font-medium rounded-md bg-[#151515] text-gray-500 border border-[#252525]",
};
</script>

<template>
  <span :class="variantClasses[variant]" class="inline-flex items-center gap-1">
    <span v-if="icon">{{ icon }}</span>
    <slot />
  </span>
</template>
