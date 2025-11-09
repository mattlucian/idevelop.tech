<script setup lang="ts">
interface Props {
  emoji: string;
  label: string;
  desc: string;
  colorScheme?: "cyan" | "emerald" | "purple" | "custom";
  customGradient?: string;
  customBorder?: string;
  filterStyle?:
    | "grayscale"
    | "grayscale-emoji"
    | "sepia"
    | "cyan-tone"
    | "none";
  variant?: "default" | "timeline";
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
  filterStyle: "none",
  variant: "default",
});

// Get color classes based on color scheme
const getColorClasses = () => {
  if (
    props.colorScheme === "custom" &&
    props.customGradient &&
    props.customBorder
  ) {
    return {
      gradient: props.customGradient,
      border: props.customBorder,
    };
  }

  const schemes: Record<
    "cyan" | "emerald" | "purple",
    { gradient: string; border: string }
  > = {
    emerald: {
      gradient: "from-emerald-500/20 to-emerald-600/10",
      border: "border-emerald-500/30",
    },
    purple: {
      gradient: "from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30",
    },
    cyan: {
      gradient: "from-cyan-500/20 to-cyan-600/10",
      border: "border-cyan-500/30",
    },
  };

  return props.colorScheme === "custom"
    ? schemes.cyan
    : schemes[props.colorScheme];
};

const colors = getColorClasses();

// Get size classes based on variant
const getSizeClasses = () => {
  return props.variant === "timeline"
    ? {
        box: "w-12 h-12 rounded-lg border-2",
        emoji: "text-xl",
        label: "text-base",
        desc: "text-sm",
      }
    : {
        box: "text-4xl md:text-5xl rounded-xl p-4 md:p-6 border",
        emoji: "",
        label: "text-sm md:text-base",
        desc: "text-xs md:text-sm",
      };
};

const sizes = getSizeClasses();

// Apply filter styles to emoji icons
const getEmojiFilterStyle = () => {
  const styles = {
    grayscale: "filter: saturate(0.3) brightness(1.05);",
    "grayscale-emoji": "filter: saturate(0.3) brightness(1.05);",
    sepia: "filter: sepia(100%) brightness(0.8) contrast(1.2);",
    "cyan-tone":
      "filter: saturate(0%) brightness(1.1) sepia(100%) hue-rotate(160deg) saturate(0.8);",
    none: "",
  };
  return styles[props.filterStyle];
};

const applyToBox =
  props.filterStyle === "grayscale" ||
  props.filterStyle === "sepia" ||
  props.filterStyle === "cyan-tone";
const applyToEmoji = props.filterStyle === "grayscale-emoji";
</script>

<template>
  <!-- Timeline variant: Horizontal layout with icon on left -->
  <div
    v-if="variant === 'timeline'"
    class="flex items-start gap-4 flex-1"
  >
    <div
      class="flex-shrink-0 bg-gradient-to-br flex items-center justify-center z-10 bg-[#0a0a0a]"
      :class="[
        `bg-gradient-to-br ${colors.gradient}`,
        colors.border,
        sizes.box,
      ]"
      :style="applyToBox ? getEmojiFilterStyle() : ''"
    >
      <span
        :class="sizes.emoji"
        :style="applyToEmoji ? getEmojiFilterStyle() : ''"
      >
        {{ emoji }}
      </span>
    </div>
    <div class="flex-1 pt-2">
      <h5
        class="font-bold text-white mb-1"
        :class="sizes.label"
      >
        {{ label }}
      </h5>
      <p
        class="text-gray-400"
        :class="sizes.desc"
      >
        {{ desc }}
      </p>
    </div>
  </div>

  <!-- Default variant: Vertical centered layout -->
  <div
    v-else
    class="flex flex-col items-center text-center flex-1"
  >
    <div
      class="mb-3 bg-gradient-to-br flex items-center justify-center"
      :class="[
        `bg-gradient-to-br ${colors.gradient}`,
        colors.border,
        sizes.box,
      ]"
      :style="applyToBox ? getEmojiFilterStyle() : ''"
    >
      <span
        :class="sizes.emoji"
        :style="applyToEmoji ? getEmojiFilterStyle() : ''"
      >
        {{ emoji }}
      </span>
    </div>
    <div
      class="font-semibold text-white mb-1"
      :class="sizes.label"
    >
      {{ label }}
    </div>
    <div
      class="text-gray-400"
      :class="sizes.desc"
    >
      {{ desc }}
    </div>
  </div>
</template>
