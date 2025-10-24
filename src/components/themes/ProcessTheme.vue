<script setup lang="ts">
import type { ServiceContent, ServiceSection } from '../../types/service'
import IconCard from '../cards/IconCard.vue'
import ThinIconCard from '../cards/ThinIconCard.vue'
import Timeline from '../display/Timeline.vue'

interface Props {
  section: ServiceSection
  serviceData: ServiceContent | null
}

defineProps<Props>()
</script>

<template>
  <div>
    <!-- CTA in styled box at top -->
    <div v-if="section.cta" class="mb-8 relative overflow-hidden rounded-xl">
      <!-- Animated background -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10"
      ></div>
      <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>

      <div
        class="relative border border-cyan-500/30 rounded-xl p-4 bg-[#0a0a0a]/80 backdrop-blur-sm"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30"
          >
            <svg
              class="w-5 h-5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p
            class="text-sm md:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 leading-relaxed"
          >
            {{ section.cta }}
          </p>
        </div>
      </div>
    </div>

    <!-- Process Workflow with style selector -->
    <div v-if="section.visual && section.visual.type === 'workflow'">
      <!-- Style: boxed (default) - Large centered icon cards -->
      <IconCard
        v-if="!section.visual.data.style || section.visual.data.style === 'boxed'"
        :steps="section.visual.data.steps"
      />

      <!-- Style: boxed-inline - Icon left, content right -->
      <ThinIconCard
        v-else-if="section.visual.data.style === 'boxed-inline'"
        :steps="section.visual.data.steps"
      />

      <!-- Style: timeline - Connected steps with line -->
      <Timeline
        v-else-if="section.visual.data.style === 'timeline'"
        :steps="section.visual.data.steps"
      />
    </div>
  </div>
</template>
