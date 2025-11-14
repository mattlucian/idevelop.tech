<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from "vue";
import { useColorScheme, type ColorScheme } from "@/composables/useColorScheme";

interface Props {
  title: string;
  subtitle?: string;
  number?: number;
  colorScheme?: ColorScheme;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
  isSelected: false,
});

const colors = useColorScheme(props.colorScheme);

// Extended color mappings for selected state
const selectedColors = computed(() => {
  const selectedMaps = {
    cyan: {
      bg: "bg-linear-to-r from-cyan-500/20 to-purple-500/20",
      border: "border-cyan-500/50",
      text: colors.text,
      subtext: "text-cyan-300",
      number: `${colors.text} border-cyan-500`,
    },
    emerald: {
      bg: "bg-[#1a1a1a]",
      border: "border-emerald-700",
      text: colors.text,
      subtext: "text-emerald-300",
      number: `${colors.text} border-emerald-500`,
    },
    purple: {
      bg: "bg-linear-to-r from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/50",
      text: colors.text,
      subtext: "text-purple-300",
      number: `${colors.text} border-purple-500`,
    },
    orange: {
      bg: "bg-linear-to-r from-orange-500/20 to-red-500/20",
      border: "border-orange-500/50",
      text: colors.text,
      subtext: "text-orange-300",
      number: `${colors.text} border-orange-500`,
    },
    teal: {
      bg: "bg-linear-to-r from-teal-500/20 to-cyan-500/20",
      border: "border-teal-500/50",
      text: colors.text,
      subtext: "text-teal-300",
      number: `${colors.text} border-teal-500`,
    },
  };

  return selectedMaps[props.colorScheme];
});

const containerClasses = computed(() => {
  const base = "w-full text-left rounded-lg border-2 transition-all";
  const padding = props.number !== undefined ? "p-4" : "px-4 py-3";

  if (props.isSelected) {
    return `${base} ${padding} ${selectedColors.value.bg} ${selectedColors.value.border} shadow-sm`;
  }

  return `${base} ${padding} bg-[#0f0f0f] border-[#333333] hover:border-gray-600`;
});

const titleClasses = computed(() => {
  const base = "font-semibold";
  const size = props.number !== undefined ? "text-base" : "text-sm";

  if (props.isSelected) {
    return `${base} ${size} ${selectedColors.value.text}`;
  }

  return `${base} ${size} text-white`;
});

const subtitleClasses = computed(() => {
  const base = props.number !== undefined ? "text-sm mt-1" : "text-xs mt-0.5";

  if (props.isSelected) {
    return `${base} ${selectedColors.value.subtext}`;
  }

  return `${base} text-gray-400`;
});

const numberClasses = computed(() => {
  const base =
    "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold shrink-0 transition-all";

  if (props.isSelected) {
    return `${base} ${selectedColors.value.number}`;
  }

  return `${base} text-gray-400 border-gray-600`;
});
</script>

<template>
  <button :class="containerClasses">
    <div v-if="number !== undefined" class="flex items-start gap-3">
      <!-- Number indicator -->
      <div :class="numberClasses">
        {{ number }}
      </div>

      <!-- Text content -->
      <div class="flex-1 min-w-0">
        <div :class="titleClasses">
          {{ title }}
        </div>
        <div v-if="subtitle" :class="subtitleClasses">
          {{ subtitle }}
        </div>
      </div>
    </div>

    <!-- Without number (title + subtitle only) -->
    <div v-else>
      <div :class="titleClasses">
        {{ title }}
      </div>
      <div v-if="subtitle" :class="subtitleClasses">
        {{ subtitle }}
      </div>
    </div>
  </button>
</template>
