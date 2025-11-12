<script setup lang="ts">
interface Props {
  emoji: string;
  size?: "sm" | "md" | "lg" | "xl";
  grayscale?: number; // 0-100, default 70
  opacity?: number; // 0-1, default 0.5
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  grayscale: 70,
  opacity: 0.5,
});

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};
</script>

<template>
  <span
    class="inline-block transition-all"
    :class="[sizeClasses[size]]"
    :style="{
      filter: `grayscale(${grayscale}%)`,
      opacity: opacity,
    }"
  >
    {{ emoji }}
  </span>
</template>
