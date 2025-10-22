<script setup lang="ts">
interface ServiceCardProps {
  icon: string
  label: string
  title: string
  tagline: string
  stats: { value: string; label: string }[]
  tags: string[]
  heroImage?: string
}

defineProps<ServiceCardProps>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    @click="emit('click')"
    class="relative block rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-cyan-500/50"
  >
    <!-- Hero Section -->
    <div v-if="heroImage" class="relative h-48 overflow-hidden">
      <!-- Unsplash Image Background -->
      <img
        :src="heroImage"
        :alt="title"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Sharp bottom gradient - only blends the bottom edge -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>

      <!-- Label badge -->
      <div class="absolute bottom-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold bg-black/80 text-cyan-300 border-2 border-cyan-500/50 backdrop-blur-md uppercase tracking-wider">
        {{ label }}
      </div>
    </div>

    <!-- Fallback: Minimalist Icon Style -->
    <div v-else class="relative h-48 overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
      <!-- Subtle geometric background -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div class="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        <div class="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
      </div>

      <!-- Large centered icon with glow -->
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div class="relative">
          <div class="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl group-hover:blur-3xl group-hover:bg-cyan-400/40 transition-all"></div>
          <div class="relative text-8xl">{{ icon }}</div>
        </div>
        <div class="px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border-2 border-cyan-500/30 uppercase tracking-wider">
          {{ label }}
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6">
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
            {{ title }}
          </h3>
          <p class="text-sm text-gray-400 mt-1">{{ tagline }}</p>
        </div>
      </div>

      <!-- Tags as badges with gradient -->
      <div class="flex gap-1.5 flex-wrap mb-4">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/30"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Stats in boxes -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div v-for="(stat, index) in stats" :key="index" class="bg-[#0f0f0f] rounded-lg p-3 text-center border border-[#2a2a2a]">
          <div class="text-xl font-bold text-cyan-400 mb-0.5">{{ stat.value }}</div>
          <div class="text-[9px] text-gray-500 uppercase tracking-wide">{{ stat.label }}</div>
        </div>
      </div>

      <!-- CTA Button -->
      <button class="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2">
        <span>Explore Service</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
