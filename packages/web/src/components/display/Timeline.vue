<script setup lang="ts">
import type { Step } from "../../types/shared/card";
import IconFlowStep from "./IconFlowStep.vue";

interface Props {
  title?: string;
  steps: Step[];
}

defineProps<Props>();
</script>

<template>
  <div class="max-w-3xl">
    <!-- Title -->
    <h4 v-if="title" class="text-sm text-gray-400 mb-6">
      {{ title }}
    </h4>

    <!-- Timeline with connecting line -->
    <div class="relative">
      <!-- Connecting line -->
      <div
        class="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/10"
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
  </div>
</template>
