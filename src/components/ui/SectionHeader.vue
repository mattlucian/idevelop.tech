<script setup lang="ts">
interface Props {
  title: string
  icon: string
  colorScheme?: 'cyan' | 'emerald'
}

withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
})

const colorClasses = {
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
}
</script>

<template>
  <div class="flex items-center gap-2 mb-3">
    <svg
      :class="['w-5 h-5', colorClasses[colorScheme]]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
    </svg>
    <h3 :class="['text-base font-bold uppercase tracking-wider', colorClasses[colorScheme]]">
      {{ title }}
    </h3>
  </div>
</template>
