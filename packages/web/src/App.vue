<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import Navigation from "./components/layout/Navigation.vue";
import Footer from "./components/layout/Footer.vue";
import CookieNotice from "./components/ui/CookieNotice.vue";

const route = useRoute();

// Hide footer on hire-me and tech pages
const showFooter = computed(
  () => route.name !== "hire-me" && route.name !== "tech",
);
</script>

<template>
  <div
    id="app"
    class="min-h-screen w-full flex flex-col bg-[#0a0a0a] text-gray-100 overflow-x-hidden"
  >
    <!-- Skip Navigation Link for Accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>

    <Navigation />
    <RouterView />
    <Footer v-if="showFooter" />
    <CookieNotice />
  </div>
</template>
