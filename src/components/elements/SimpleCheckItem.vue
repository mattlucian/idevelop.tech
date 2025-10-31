<script setup lang="ts">
interface Props {
  color?: 'cyan' | 'emerald' | 'purple' | 'orange'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'cyan',
})

const colorClasses = {
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
}
</script>

<template>
  <li class="flex items-start gap-3">
    <svg
      :class="['w-5 h-5 mt-0.5 flex-shrink-0', colorClasses[color]]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span class="text-slate-300"><slot></slot></span>
  </li>
</template>
