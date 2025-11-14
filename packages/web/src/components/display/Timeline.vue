<script setup lang="ts">
import type { Step } from "../../types/shared/card";
import IconFlowStep from "./IconFlowStep.vue";

interface Props {
  title?: string;
  steps: Step[];
  variant?: "default" | "centered";
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  variant: "default",
});
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <!-- Title -->
    <h4 v-if="title" class="text-sm text-gray-400 mb-6">
      {{ title }}
    </h4>

    <!-- Default Timeline (left-aligned with side line) -->
    <div v-if="variant === 'default'" class="relative">
      <!-- Connecting line -->
      <div
        class="absolute left-6 top-12 bottom-12 w-0.5 bg-linear-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/10"
      />

      <div class="space-y-8">
        <IconFlowStep
          v-for="(step, index) in steps"
          :key="index"
          :emoji="step.icon"
          :label="step.label"
          :desc="step.desc"
          variant="timeline"
          filter-style="grayscale"
          class="relative"
        />
      </div>
    </div>

    <!-- Centered Timeline (icon on top, text below, downward arrows) -->
    <div
      v-else-if="variant === 'centered'"
      class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full"
    >
      <template v-for="(step, index) in steps" :key="index">
        <!-- Step Item -->
        <div
          class="flex flex-col items-center text-center w-full md:w-auto md:flex-1 max-w-[250px]"
        >
          <!-- Icon/Year -->
          <div
            class="w-16 h-16 rounded-full bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-3"
            :class="
              step.icon && !isNaN(Number(step.icon))
                ? 'text-base font-bold text-cyan-400'
                : 'text-3xl'
            "
          >
            {{ step.icon }}
          </div>

          <!-- Label -->
          <div class="text-sm font-semibold text-white mb-1">
            {{ step.label }}
          </div>

          <!-- Description -->
          <div class="text-xs text-gray-400">
            {{ step.desc }}
          </div>
        </div>

        <!-- Arrow (except for last item) -->
        <div
          v-if="index < steps.length - 1"
          class="flex items-center justify-center shrink-0"
        >
          <!-- Mobile: Down arrow -->
          <svg
            class="w-6 h-6 text-cyan-500/30 md:hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <!-- Desktop: Right arrow -->
          <svg
            class="hidden md:block w-8 h-8 text-cyan-500/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </template>
    </div>
  </div>
</template>
