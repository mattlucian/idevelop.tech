<script setup lang="ts">
interface Props {
  number: number;
  color?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  color: "purple",
});

const colorClasses = {
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
  purple: "text-purple-400",
};
</script>

<template>
  <li class="flex items-start gap-3">
    <span :class="['font-bold flex-shrink-0 w-5 mt-0.5', colorClasses[color]]"
      >{{ number }}.</span
    >
    <span class="text-slate-300"><slot></slot></span>
  </li>
</template>
