<script setup lang="ts">
import { useColorScheme } from "@/composables/useColorScheme";

interface Props {
  number: number;
  color?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  color: "purple",
});

const colors = useColorScheme(props.color);
</script>

<template>
  <li class="flex items-start gap-3">
    <span :class="['font-bold flex-shrink-0 w-5 mt-0.5', colors.text]"
      >{{ number }}.</span
    >
    <span class="text-slate-300"><slot /></span>
  </li>
</template>
