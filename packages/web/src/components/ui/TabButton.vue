<script setup lang="ts">
interface Props {
  label: string;
  active: boolean;
  colorScheme?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

const emit = defineEmits<{
  click: [];
}>();

const colorClasses = {
  cyan: {
    active:
      "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 md:border-cyan-400 md:bg-transparent",
    inactive:
      "bg-slate-800/30 text-slate-400 border-slate-700/30 md:border-transparent md:bg-transparent hover:text-slate-300 hover:bg-slate-800/50 md:hover:bg-transparent",
  },
  emerald: {
    active:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 md:border-emerald-400 md:bg-transparent",
    inactive:
      "bg-slate-800/30 text-slate-400 border-slate-700/30 md:border-transparent md:bg-transparent hover:text-slate-300 hover:bg-slate-800/50 md:hover:bg-transparent",
  },
  purple: {
    active:
      "bg-purple-500/10 text-purple-400 border-purple-500/30 md:border-purple-400 md:bg-transparent",
    inactive:
      "bg-slate-800/30 text-slate-400 border-slate-700/30 md:border-transparent md:bg-transparent hover:text-slate-300 hover:bg-slate-800/50 md:hover:bg-transparent",
  },
};
</script>

<template>
  <button
    @click="emit('click')"
    :class="[
      'px-4 py-2.5 md:py-2 text-sm font-medium transition-colors rounded-lg md:rounded-none md:border-b-2 text-left md:text-center',
      active
        ? colorClasses[colorScheme].active
        : colorClasses[colorScheme].inactive,
    ]"
  >
    {{ label }}
  </button>
</template>
