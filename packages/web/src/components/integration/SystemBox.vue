<script setup lang="ts">
interface Props {
  name: string;
  label?: string;
  iconPath: string;
  colorScheme?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  label: "System",
  colorScheme: "cyan",
});

const colorClasses = {
  cyan: {
    border: "border-cyan-500/40",
    iconColor: "text-cyan-400",
  },
  emerald: {
    border: "border-emerald-500/40",
    iconColor: "text-emerald-400",
  },
  purple: {
    border: "border-purple-500/40",
    iconColor: "text-purple-400",
  },
};
</script>

<template>
  <div class="flex-shrink-0 text-center">
    <div
      :class="[
        'bg-slate-800/60 border-2 rounded-lg p-4 md:p-6 w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center',
        colorClasses[colorScheme].border,
      ]"
    >
      <svg
        :class="[
          'w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-3',
          colorClasses[colorScheme].iconColor,
        ]"
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
      <div class="text-sm md:text-lg font-bold text-white">
        {{ name }}
      </div>
      <div class="text-xs text-slate-400 mt-0.5 md:mt-1">
        {{ label }}
      </div>
    </div>
  </div>
</template>
