<script setup lang="ts">
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/vue/24/outline";

interface Props {
  size?: "sm" | "md" | "lg";
}

withDefaults(defineProps<Props>(), {
  size: "lg",
});

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};
</script>

<template>
  <!-- Points right on desktop and down when the flow stacks on mobile -->
  <span class="flex justify-center text-slate-600" aria-hidden="true">
    <ArrowRightIcon :class="['hidden md:block', sizeClasses[size]]" />
    <ArrowDownIcon :class="['md:hidden', sizeClasses[size]]" />
  </span>
</template>
