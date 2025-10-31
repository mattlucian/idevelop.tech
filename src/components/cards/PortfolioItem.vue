<script setup lang="ts">
import type { PortfolioItem } from '@/types/shared/card'

interface Props {
  item: PortfolioItem
  colorScheme?: 'cyan' | 'emerald' | 'purple'
}

withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
})

const colorClasses = {
  cyan: {
    border: 'border-slate-700/30 hover:border-cyan-500/40',
    shadow: 'hover:shadow-cyan-500/10 group-hover:shadow-cyan-500/20',
    textHover: 'group-hover:text-cyan-300',
    iconHover: 'group-hover:text-cyan-400',
  },
  emerald: {
    border: 'border-slate-700/30 hover:border-emerald-500/40',
    shadow: 'hover:shadow-emerald-500/10 group-hover:shadow-emerald-500/20',
    textHover: 'group-hover:text-emerald-300',
    iconHover: 'group-hover:text-emerald-400',
  },
  purple: {
    border: 'border-slate-700/30 hover:border-purple-500/40',
    shadow: 'hover:shadow-purple-500/10 group-hover:shadow-purple-500/20',
    textHover: 'group-hover:text-purple-300',
    iconHover: 'group-hover:text-purple-400',
  },
}
</script>

<template>
  <a
    :href="item.url"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'block bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-lg border overflow-hidden hover:shadow-lg transition-all group',
      colorClasses[colorScheme].border,
      colorClasses[colorScheme].shadow,
    ]"
  >
    <div class="flex items-center gap-4 p-4">
      <div
        :class="[
          'w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-md transition-shadow',
          colorClasses[colorScheme].shadow,
        ]"
      >
        <img :src="item.logo" :alt="item.name" class="max-w-full max-h-full object-contain p-2" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <h4
            :class="[
              'font-bold text-white text-base truncate transition-colors',
              colorClasses[colorScheme].textHover,
            ]"
          >
            {{ item.name }}
          </h4>
          <svg
            :class="[
              'w-4 h-4 text-gray-500 transition-colors flex-shrink-0',
              colorClasses[colorScheme].iconHover,
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
        <p class="text-sm text-gray-400 line-clamp-2">{{ item.description }}</p>
      </div>
    </div>
  </a>
</template>
