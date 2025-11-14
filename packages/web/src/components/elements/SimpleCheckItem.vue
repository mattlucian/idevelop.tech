<script setup lang="ts">
import { computed } from "vue";
import { useColorScheme, type ColorScheme } from "@/composables/useColorScheme";

interface Props {
  color?: ColorScheme;
  variant?: "simple" | "circle";
}

const props = withDefaults(defineProps<Props>(), {
  color: "cyan",
  variant: "simple",
});

const colors = useColorScheme(props.color);

const iconSize = computed(() =>
  props.variant === "circle" ? "w-4 h-4" : "w-5 h-5",
);

const gap = computed(() => (props.variant === "circle" ? "gap-2" : "gap-3"));

const textSize = computed(() => (props.variant === "circle" ? "text-xs" : ""));

const iconPath = computed(() =>
  props.variant === "circle"
    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    : "M5 13l4 4L19 7",
);
</script>

<template>
  <li :class="['flex items-start', gap]">
    <svg
      :class="[iconSize, 'mt-0.5 shrink-0', colors.text]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        :d="iconPath"
      />
    </svg>
    <span :class="['text-slate-300', textSize]"><slot /></span>
  </li>
</template>
