<script setup lang="ts">
import type { Step } from '../../types/shared/card'

interface Props {
  title?: string
  steps: Step[]
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Title -->
    <h4 v-if="title" class="text-sm text-gray-400 mb-6">{{ title }}</h4>

    <!-- Boxed Grid (2x2, centered icons) -->
    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="text-center bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/30 transition-all"
      >
        <div class="text-4xl mb-3">{{ step.icon }}</div>
        <h5 class="text-base font-bold text-white mb-2">{{ step.label }}</h5>
        <p class="text-sm text-gray-400">{{ step.desc }}</p>
      </div>
    </div>
  </div>
</template>
