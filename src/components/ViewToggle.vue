<template>
  <div class="fixed top-4 right-4 z-50">
    <div class="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
      <button
        @click="setView('business')"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          isBusinessView 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-300 hover:text-white'
        ]"
      >
        Business
      </button>
      <button
        @click="setView('technical')"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          isTechnicalView 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-300 hover:text-white'
        ]"
      >
        Technical
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useViewToggle } from '../composables/useViewToggle'

const { setView, isBusinessView, isTechnicalView } = useViewToggle()
</script>