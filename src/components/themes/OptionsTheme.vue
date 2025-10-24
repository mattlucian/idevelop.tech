<script setup lang="ts">
import type { ServiceContent, ServiceSection } from '../../types/service'

interface Props {
  section: ServiceSection
  serviceData: ServiceContent | null
}

defineProps<Props>()

interface ColorScheme {
  border: string
  borderHover: string
  bg: string
  iconBg: string
  iconBorder: string
  iconColor: string
  titleColor: string
}

// Color schemes for different options (rotate through them)
const colorSchemes: ColorScheme[] = [
  {
    border: 'border-cyan-500/30',
    borderHover: 'hover:border-cyan-400/40',
    bg: 'bg-cyan-500/5',
    iconBg: 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20',
    iconBorder: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    titleColor: 'text-cyan-400',
  },
  {
    border: 'border-purple-500/30',
    borderHover: 'hover:border-purple-400/40',
    bg: 'bg-purple-500/5',
    iconBg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    iconBorder: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    titleColor: 'text-purple-400',
  },
  {
    border: 'border-emerald-500/30',
    borderHover: 'hover:border-emerald-400/40',
    bg: 'bg-emerald-500/5',
    iconBg: 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20',
    iconBorder: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-400',
  },
]

const getColorScheme = (index: number): ColorScheme => {
  return colorSchemes[index % colorSchemes.length]!
}
</script>

<template>
  <div>
    <!-- Tagline -->
    <div v-if="section.tagline" class="mb-8">
      <p class="text-sm md:text-base text-gray-400 leading-relaxed">{{ section.tagline }}</p>
    </div>

    <!-- Options Cards -->
    <div v-if="section.visual && section.visual.type === 'options'">
      <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div
          v-for="(option, index) in section.visual.data.options"
          :key="index"
          class="relative group"
        >
          <!-- Decorative background blur -->
          <div
            :class="[
              getColorScheme(index).bg,
              'absolute inset-0 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity',
            ]"
          ></div>

          <div
            :class="[
              'relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-6 min-h-[280px]',
              getColorScheme(index).border,
              getColorScheme(index).borderHover,
              'transition-all',
            ]"
          >
            <!-- Header -->
            <div class="flex items-center gap-3 mb-5">
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  getColorScheme(index).iconBg,
                  getColorScheme(index).iconBorder,
                  'border',
                ]"
              >
                <span class="text-xl">{{ option.icon || '📋' }}</span>
              </div>
              <h5 :class="['text-base font-bold', getColorScheme(index).titleColor]">
                {{ option.title }}
              </h5>
            </div>

            <!-- Description (optional) -->
            <p v-if="option.description" class="text-sm text-gray-400 mb-4 leading-relaxed">
              {{ option.description }}
            </p>

            <!-- Items -->
            <ul class="space-y-3">
              <li
                v-for="(item, itemIndex) in option.items"
                :key="itemIndex"
                class="flex items-start gap-3 text-sm text-gray-200 leading-relaxed"
              >
                <span :class="[getColorScheme(index).iconColor, 'text-base mt-0.5 flex-shrink-0']"
                  >✓</span
                >
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
