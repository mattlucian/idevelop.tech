<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navigation from './components/layout/Navigation.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()

// Hide footer on hire-me and tech pages
const showFooter = computed(() => route.name !== 'hire-me' && route.name !== 'tech')
</script>

<template>
  <div
    id="app"
    class="min-h-screen w-full flex flex-col bg-[#0a0a0a] text-gray-100 overflow-x-hidden"
  >
    <Navigation />
    <RouterView />
    <Footer v-if="showFooter" />
  </div>
</template>
