<script setup lang="ts">
interface Props {
  sectionNumber: number
  heading: string
  isSelected: boolean
  colorScheme?: 'cyan' | 'emerald'
}

withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
})

defineEmits<{
  click: []
}>()

const colorClasses = {
  cyan: {
    selected:
      'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500 shadow-lg shadow-cyan-500/20',
    unselected: 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-cyan-500/50 hover:bg-[#1f1f1f]',
    accentBg: 'bg-cyan-500/10',
    badgeSelected: 'bg-cyan-500/20 border-cyan-500 text-cyan-300',
    badgeUnselected:
      'bg-[#0f0f0f] border-[#333333] text-gray-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400',
    textSelected: 'text-cyan-300',
    textUnselected: 'text-white group-hover:text-cyan-400',
    arrowSelected: 'text-cyan-400 translate-x-0',
    arrowUnselected:
      'text-gray-600 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
  },
  emerald: {
    selected:
      'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500 shadow-lg shadow-emerald-500/20',
    unselected: 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-emerald-500/50 hover:bg-[#1f1f1f]',
    accentBg: 'bg-emerald-500/10',
    badgeSelected: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',
    badgeUnselected:
      'bg-[#0f0f0f] border-[#333333] text-gray-500 group-hover:border-emerald-500/50 group-hover:text-emerald-400',
    textSelected: 'text-emerald-300',
    textUnselected: 'text-white group-hover:text-emerald-400',
    arrowSelected: 'text-emerald-400 translate-x-0',
    arrowUnselected:
      'text-gray-600 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
  },
}
</script>

<template>
  <button
    @click="$emit('click')"
    :class="[
      'w-full text-left p-4 rounded-lg border-2 transition-all group relative overflow-hidden',
      isSelected ? colorClasses[colorScheme].selected : colorClasses[colorScheme].unselected,
    ]"
  >
    <!-- Decorative corner accent for selected item -->
    <div
      v-if="isSelected"
      :class="[
        'absolute top-0 right-0 w-16 h-16 rounded-bl-full',
        colorClasses[colorScheme].accentBg,
      ]"
    ></div>

    <div class="flex items-center gap-3 relative">
      <!-- Number badge -->
      <div
        :class="[
          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors',
          isSelected
            ? colorClasses[colorScheme].badgeSelected
            : colorClasses[colorScheme].badgeUnselected,
        ]"
      >
        {{ sectionNumber }}
      </div>

      <!-- Section heading -->
      <h4
        :class="[
          'text-sm font-semibold flex-1',
          isSelected
            ? colorClasses[colorScheme].textSelected
            : colorClasses[colorScheme].textUnselected,
        ]"
      >
        {{ heading }}
      </h4>

      <!-- Arrow indicator -->
      <svg
        :class="[
          'w-4 h-4 transition-all',
          isSelected
            ? colorClasses[colorScheme].arrowSelected
            : colorClasses[colorScheme].arrowUnselected,
        ]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </button>
</template>
