<script setup lang="ts">
import { computed } from "vue";
import { useColorScheme, type ColorScheme } from "@/composables/useColorScheme";

interface Props {
  label: string;
  active: boolean;
  colorScheme?: ColorScheme;
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

const emit = defineEmits<{
  click: [];
}>();

const colors = useColorScheme(props.colorScheme);

const activeClasses = computed(
  () =>
    `${colors.bg} ${colors.text} ${colors.border} md:border-${props.colorScheme}-400 md:bg-transparent`,
);

const inactiveClasses =
  "bg-slate-800/30 text-slate-400 border-slate-700/30 md:border-transparent md:bg-transparent hover:text-slate-300 hover:bg-slate-800/50 md:hover:bg-transparent";
</script>

<template>
  <button
    :class="[
      'px-4 py-2.5 md:py-2 text-sm font-medium transition-colors rounded-lg md:rounded-none md:border-b-2 text-left md:text-center',
      active ? activeClasses : inactiveClasses,
    ]"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>
