<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  icon: Component;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "cyan" | "purple" | "emerald" | "slate" | "white";
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "cyan",
  className: "",
});

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

const colorClasses = {
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  emerald: "text-emerald-400",
  slate: "text-slate-400",
  white: "text-white",
};
</script>

<template>
  <component
    :is="icon"
    :class="[sizeClasses[size], colorClasses[color], className]"
  />
</template>
