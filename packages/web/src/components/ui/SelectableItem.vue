<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from "vue";

type ColorScheme = "cyan" | "emerald" | "purple";

interface SelectableItemProps {
  title: string;
  subtitle?: string;
  number?: number;
  colorScheme?: ColorScheme;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<SelectableItemProps>(), {
  colorScheme: "cyan",
  isSelected: false,
});

// Color theme mappings
const colorClasses = computed(() => {
  const schemes = {
    cyan: {
      selectedBg: "bg-gradient-to-r from-cyan-500/20 to-purple-500/20",
      selectedBorder: "border-cyan-500/50",
      selectedText: "text-cyan-400",
      selectedSubtext: "text-cyan-300",
      selectedNumber: "text-cyan-400 border-cyan-500",
      hoverBorder: "hover:border-gray-600",
      defaultText: "text-white",
      defaultSubtext: "text-gray-400",
      defaultNumber: "text-gray-400 border-gray-600",
    },
    emerald: {
      selectedBg: "bg-[#1a1a1a]",
      selectedBorder: "border-emerald-700",
      selectedText: "text-emerald-400",
      selectedSubtext: "text-emerald-300",
      selectedNumber: "text-emerald-400 border-emerald-500",
      hoverBorder: "hover:border-gray-600",
      defaultText: "text-white",
      defaultSubtext: "text-gray-400",
      defaultNumber: "text-gray-400 border-gray-600",
    },
    purple: {
      selectedBg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
      selectedBorder: "border-purple-500/50",
      selectedText: "text-purple-400",
      selectedSubtext: "text-purple-300",
      selectedNumber: "text-purple-400 border-purple-500",
      hoverBorder: "hover:border-gray-600",
      defaultText: "text-white",
      defaultSubtext: "text-gray-400",
      defaultNumber: "text-gray-400 border-gray-600",
    },
  };

  return schemes[props.colorScheme];
});

const containerClasses = computed(() => {
  const base = "w-full text-left rounded-lg border-2 transition-all";
  const padding = props.number !== undefined ? "p-4" : "px-4 py-3";

  if (props.isSelected) {
    return `${base} ${padding} ${colorClasses.value.selectedBg} ${colorClasses.value.selectedBorder} shadow-sm`;
  }

  return `${base} ${padding} bg-[#0f0f0f] border-[#333333] ${colorClasses.value.hoverBorder}`;
});

const titleClasses = computed(() => {
  const base = "font-semibold";
  const size = props.number !== undefined ? "text-base" : "text-sm";

  if (props.isSelected) {
    return `${base} ${size} ${colorClasses.value.selectedText}`;
  }

  return `${base} ${size} ${colorClasses.value.defaultText}`;
});

const subtitleClasses = computed(() => {
  const base = props.number !== undefined ? "text-sm mt-1" : "text-xs mt-0.5";

  if (props.isSelected) {
    return `${base} ${colorClasses.value.selectedSubtext}`;
  }

  return `${base} ${colorClasses.value.defaultSubtext}`;
});

const numberClasses = computed(() => {
  const base =
    "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold flex-shrink-0 transition-all";

  if (props.isSelected) {
    return `${base} ${colorClasses.value.selectedNumber}`;
  }

  return `${base} ${colorClasses.value.defaultNumber}`;
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
        <div :class="titleClasses">{{ title }}</div>
        <div v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</div>
      </div>
    </div>

    <!-- Without number (title + subtitle only) -->
    <div v-else>
      <div :class="titleClasses">{{ title }}</div>
      <div v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</div>
    </div>
  </button>
</template>
