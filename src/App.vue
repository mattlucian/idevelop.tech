<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useViewToggle } from './composables/useViewToggle'
import Navigation from './components/Navigation.vue'

const { themeClasses } = useViewToggle()
</script>

<template>
  <div id="app" :class="themeClasses" class="min-h-screen transition-colors duration-300">
    <Navigation />
    <RouterView />
  </div>
</template>
