<script setup lang="ts">
interface Props {
  quote: string;
  author: string;
  role: string;
  colorScheme?: "cyan" | "emerald" | "purple";
}

withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

const colorClasses = {
  cyan: {
    border: "border-cyan-500/50",
  },
  emerald: {
    border: "border-emerald-500/50",
  },
  purple: {
    border: "border-purple-500/50",
  },
};
</script>

<template>
  <div
    :class="[
      'border-l-4 bg-slate-800/40 rounded-r-lg p-8',
      colorClasses[colorScheme].border,
    ]"
  >
    <p class="text-slate-300 text-lg italic mb-4">"{{ quote }}"</p>
    <div class="text-sm">
      <span class="text-white font-semibold">{{ author }}</span>
      <span class="text-slate-500"> · {{ role }}</span>
    </div>
  </div>
</template>
