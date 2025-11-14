<script setup lang="ts">
import { useColorScheme, type ColorScheme } from "@/composables/useColorScheme";

interface Props {
  quote: string;
  author: string;
  role: string;
  colorScheme?: ColorScheme;
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

const colors = useColorScheme(props.colorScheme);
</script>

<template>
  <div :class="['border-l-4 bg-slate-800/40 rounded-r-lg p-8', colors.border]">
    <p class="text-slate-300 text-lg italic mb-4">"{{ quote }}"</p>
    <div class="text-sm">
      <span class="text-white font-semibold">{{ author }}</span>
      <span class="text-slate-500"> · {{ role }}</span>
    </div>
  </div>
</template>
