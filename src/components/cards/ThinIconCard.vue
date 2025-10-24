<script setup lang="ts">
import type { Step } from '../../types/shared/card'

interface Props {
  title?: string
  steps: Step[]
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <!-- Title -->
    <h4 v-if="title" class="text-sm text-gray-400 mb-6">{{ title }}</h4>

    <!-- Boxed Inline Grid (2x2, icon left) -->
    <div class="grid md:grid-cols-2 gap-4">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/30 transition-all"
      >
        <div class="flex items-start gap-3">
          <div class="text-2xl flex-shrink-0">{{ step.icon }}</div>
          <div>
            <h5 class="text-base font-bold text-white mb-2">{{ step.label }}</h5>
            <p class="text-sm text-gray-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
