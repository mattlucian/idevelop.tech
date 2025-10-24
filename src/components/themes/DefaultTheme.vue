<script setup lang="ts">
import type { ServiceContent, ServiceSection } from '../../types/service'

interface Props {
  section: ServiceSection
  serviceData: ServiceContent | null
}

defineProps<Props>()

// Theme colors
const currentTheme = {
  primary: 'cyan-400',
  secondary: 'cyan-500',
  gradient: 'from-cyan-400 to-purple-400',
  border: 'border-cyan-500/20',
  borderHover: 'hover:border-cyan-400/40',
  bg: 'bg-cyan-500/5',
  text: 'text-cyan-400',
  accent: 'bg-cyan-500/10',
}
</script>

<template>
  <div>
    <!-- Tagline -->
    <div v-if="section.tagline" class="mb-8 relative">
      <div
        :class="[
          'absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b',
          `from-${currentTheme.primary}`,
          `via-${currentTheme.secondary}`,
          'to-transparent',
        ]"
      ></div>
      <p :class="['text-lg font-semibold leading-relaxed pl-4', currentTheme.text]">
        {{ section.tagline }}
      </p>
    </div>

    <!-- Stats Display (show service stats for visual impact) -->
    <div v-if="serviceData && serviceData.stats && serviceData.stats.length > 0" class="mb-8">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(stat, index) in serviceData.stats" :key="index" class="relative group">
          <!-- Decorative background blur -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <div
            class="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-400/50 transition-all"
          >
            <div
              class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-1"
            >
              {{ stat.value }}
            </div>
            <div class="text-xs text-gray-400 uppercase tracking-wide">{{ stat.label }}</div>
            <!-- Decorative corner accent -->
            <div class="absolute top-0 right-0 w-8 h-8 bg-cyan-500/10 rounded-bl-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content paragraph (if exists) -->
    <p v-if="section.content" class="text-sm leading-relaxed text-gray-300 mb-6">
      {{ section.content }}
    </p>

    <!-- Benefits -->
    <div v-if="section.benefits && section.benefits.length > 0" class="mb-8">
      <h3 class="text-base font-semibold text-white mb-5 flex items-center gap-2">
        <div
          :class="[
            'w-1 h-5 rounded-full bg-gradient-to-b',
            `from-${currentTheme.primary}`,
            `to-${currentTheme.secondary}`,
          ]"
        ></div>
        Key Benefits
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="(benefit, index) in section.benefits"
          :key="index"
          :class="[
            'group relative rounded-lg p-4 transition-all duration-300 border',
            currentTheme.border,
            currentTheme.borderHover,
            currentTheme.bg,
          ]"
        >
          <!-- Decorative corner accent -->
          <div
            :class="[
              'absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity',
              currentTheme.accent,
            ]"
          ></div>

          <div class="flex items-start gap-3 relative">
            <!-- Icon with gradient background -->
            <div
              :class="[
                'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border group-hover:scale-110 transition-transform',
                currentTheme.bg,
                currentTheme.border,
              ]"
            >
              <svg
                :class="['w-4 h-4', currentTheme.text]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span class="text-sm text-gray-200 leading-relaxed flex-1">{{ benefit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Elements -->
    <div v-if="section.visual" class="mb-8">
      <!-- Workflow Diagram -->
      <div
        v-if="section.visual.type === 'workflow'"
        class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-6"
      >
        <h4 class="text-sm font-semibold text-white mb-6 text-center">
          {{ section.visual.data.title }}
        </h4>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(step, index) in section.visual.data.steps" :key="index" class="text-center">
            <div
              class="w-16 h-16 mx-auto mb-3 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-2xl"
            >
              {{ step.icon }}
            </div>
            <div class="text-sm font-semibold text-white mb-1">{{ step.label }}</div>
            <div class="text-xs text-gray-400">{{ step.desc }}</div>
            <div
              v-if="index < section.visual.data.steps.length - 1"
              class="hidden md:block absolute top-8 left-full w-full"
            >
              <svg
                class="w-6 h-6 text-cyan-500/30 mx-auto"
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
          </div>
        </div>
      </div>

      <!-- Before/After Diagram -->
      <div
        v-if="section.visual.type === 'diagram' || section.visual.type === 'before-after'"
        class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-6"
      >
        <h4 class="text-sm font-semibold text-white mb-6 text-center">
          {{ section.visual.data.title }}
        </h4>
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Before -->
          <div
            v-if="section.visual.data.before"
            class="bg-[#1a1a1a] rounded-lg p-4 border border-red-500/20"
          >
            <h5 class="text-sm font-semibold text-red-400 mb-3">
              {{
                typeof section.visual.data.before === 'object' &&
                'title' in section.visual.data.before
                  ? section.visual.data.before.title
                  : 'Before'
              }}
            </h5>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in typeof section.visual.data.before === 'object' &&
                'items' in section.visual.data.before
                  ? section.visual.data.before.items
                  : section.visual.data.before"
                :key="index"
                class="text-xs text-gray-400"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <!-- After -->
          <div
            v-if="section.visual.data.after"
            class="bg-[#1a1a1a] rounded-lg p-4 border border-cyan-500/20"
          >
            <h5 class="text-sm font-semibold text-cyan-400 mb-3">
              {{
                typeof section.visual.data.after === 'object' &&
                'title' in section.visual.data.after
                  ? section.visual.data.after.title
                  : 'After'
              }}
            </h5>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in typeof section.visual.data.after === 'object' &&
                'items' in section.visual.data.after
                  ? section.visual.data.after.items
                  : section.visual.data.after"
                :key="index"
                class="text-xs text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Code Block -->
      <div
        v-if="section.visual.type === 'code'"
        class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-6"
      >
        <h4 class="text-sm font-semibold text-white mb-4">{{ section.visual.data.title }}</h4>
        <pre
          class="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-[#1a1a1a] p-4 rounded border border-[#333333] overflow-x-auto"
          >{{ section.visual.data.code }}</pre
        >
      </div>
    </div>

    <!-- CTA -->
    <div v-if="section.cta" class="mt-8 relative overflow-hidden rounded-xl">
      <!-- Animated background gradient -->
      <div
        :class="[
          'absolute inset-0 animate-pulse bg-gradient-to-r',
          `from-${currentTheme.secondary}/20`,
          `via-${currentTheme.primary}/20`,
          `to-${currentTheme.secondary}/20`,
        ]"
      ></div>
      <div
        :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl', currentTheme.accent]"
      ></div>
      <div
        :class="['absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl', currentTheme.bg]"
      ></div>

      <div
        :class="[
          'relative border-2 rounded-xl p-6 bg-gradient-to-br from-[#1a1a1a]/90 to-[#0f0f0f]/90 backdrop-blur-sm',
          currentTheme.border,
        ]"
      >
        <!-- Icon -->
        <div class="flex items-start gap-4">
          <div
            :class="[
              'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border',
              currentTheme.bg,
              currentTheme.border,
            ]"
          >
            <svg
              :class="['w-6 h-6', currentTheme.text]"
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
          <div class="flex-1">
            <div :class="['text-xs font-bold uppercase tracking-wider mb-2', currentTheme.text]">
              Ready to Start?
            </div>
            <p
              :class="[
                'text-lg font-bold text-transparent bg-clip-text leading-relaxed bg-gradient-to-r',
                currentTheme.gradient,
              ]"
            >
              {{ section.cta }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
