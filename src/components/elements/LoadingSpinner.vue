<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  color?: 'cyan' | 'emerald'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'cyan',
})

const sizeClasses = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-3',
  lg: 'w-16 h-16 border-4',
}

const colorClasses = {
  cyan: 'border-top-color: #00d3f2',
  emerald: 'border-top-color: #10b981',
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div
      class="loading-spinner rounded-full border-[#333333] animate-spin"
      :class="sizeClasses[size]"
      :style="colorClasses[color]"
    ></div>
    <p v-if="message" class="text-sm text-gray-400">{{ message }}</p>
  </div>
</template>

<style scoped>
.loading-spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
