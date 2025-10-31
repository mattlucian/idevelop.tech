<script setup lang="ts">
interface Props {
  from: string
  to: string
  colorScheme?: 'cyan' | 'emerald' | 'purple'
  direction?: 'forward' | 'backward'
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
  direction: 'forward',
})

const colorClasses = {
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
  purple: 'text-purple-400',
}

const arrowPath = {
  forward: 'M13 7l5 5m0 0l-5 5m5-5H6',
  backward: 'M11 17l-5-5m0 0l5-5m-5 5h12',
}
</script>

<template>
  <div class="flex items-center gap-3">
    <div
      class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 md:px-4 py-2 md:py-2.5 text-xs md:text-sm text-slate-200 text-center"
    >
      {{ from }}
    </div>
    <svg
      :class="['w-4 h-4 md:w-6 md:h-6 flex-shrink-0', colorClasses[colorScheme]]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        :d="arrowPath[direction]"
      />
    </svg>
    <div
      class="flex-1 bg-slate-800/40 border border-slate-600/30 rounded px-2 md:px-4 py-2 md:py-2.5 text-xs md:text-sm text-slate-200 text-center"
    >
      {{ to }}
    </div>
  </div>
</template>
