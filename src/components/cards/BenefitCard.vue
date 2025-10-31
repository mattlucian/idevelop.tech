<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-white mb-3">{{ title }}</h3>
    <p class="text-slate-400 leading-relaxed">{{ description }}</p>
  </div>
</template>
