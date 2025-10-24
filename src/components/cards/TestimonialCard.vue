<script setup lang="ts">
import type { Testimonial } from '../../types/service'
import IconBadge from '../elements/badges/IconBadge.vue'

interface Props {
  testimonial: Testimonial
  colorScheme?: 'cyan' | 'emerald'
}

withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
})

const colorClasses = {
  cyan: {
    border: 'border-cyan-500/30',
    gradient: 'from-cyan-900/20 to-purple-900/20',
    quote: 'text-cyan-500/20',
    heading: 'text-cyan-400',
    role: 'text-cyan-400',
  },
  emerald: {
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-900/20 to-teal-900/20',
    quote: 'text-emerald-500/20',
    heading: 'text-emerald-400',
    role: 'text-emerald-400',
  },
}
</script>

<template>
  <div
    :class="[
      'relative bg-gradient-to-br border rounded-lg p-6 overflow-hidden',
      colorClasses[colorScheme].border,
      colorClasses[colorScheme].gradient,
    ]"
  >
    <!-- Decorative quote marks -->
    <div :class="['absolute top-4 left-4 text-6xl font-serif', colorClasses[colorScheme].quote]">
      "
    </div>

    <div class="relative">
      <h3
        :class="[
          'text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2',
          colorClasses[colorScheme].heading,
        ]"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          />
        </svg>
        Client Success Story
      </h3>
      <p class="text-base italic text-gray-200 mb-4 leading-relaxed">"{{ testimonial.quote }}"</p>
      <div class="flex items-center gap-3">
        <IconBadge size="lg" :color="colorScheme">
          {{ testimonial.author.charAt(0) }}
        </IconBadge>
        <div>
          <p class="text-sm font-semibold text-white">{{ testimonial.author }}</p>
          <p :class="['text-xs', colorClasses[colorScheme].role]">
            {{ testimonial.role }} @ {{ testimonial.company }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
