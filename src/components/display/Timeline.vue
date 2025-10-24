<script setup lang="ts">
import type { Step } from '../../types/shared/card'

interface Props {
  title?: string
  steps: Step[]
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <!-- Title -->
    <h4 v-if="title" class="text-sm text-gray-400 mb-6">{{ title }}</h4>

    <!-- Timeline with connecting line -->
    <div class="relative">
      <!-- Connecting line -->
      <div
        class="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-cyan-500/10"
      ></div>

      <div class="space-y-8">
        <div v-for="(step, index) in steps" :key="index" class="relative flex items-start gap-4">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/40 flex items-center justify-center z-10 bg-[#0a0a0a]"
          >
            <span class="text-xl">{{ step.icon }}</span>
          </div>
          <div class="flex-1 pt-2">
            <h5 class="text-base font-bold text-white mb-1">{{ step.label }}</h5>
            <p class="text-sm text-gray-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
