<script setup lang="ts">
import type { PanelColorScheme } from "../../types/shared/ui";

interface Props {
  colorScheme?: PanelColorScheme;
  hideOnMobile?: boolean;
}

withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
  hideOnMobile: false,
});

defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    class="sidebar-panel fixed top-16 inset-x-0 z-60 bg-[#0a0a0a] px-6 pb-3 pointer-events-auto block lg:block"
    :class="[hideOnMobile ? 'max-lg:hidden' : '']"
    style="height: calc(100vh - 4rem)"
    @click.stop
  >
    <!-- Header with slot -->
    <div class="mb-6 pt-4">
      <slot name="header" />
    </div>

    <!-- Main content with scrolling -->
    <div
      class="space-y-6 overflow-y-auto lg:pr-8 scrollbar-visible"
      style="height: calc(100% - 6.5rem)"
    >
      <slot />
    </div>

    <!-- Gradient overlay at bottom -->
    <div
      class="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none z-10"
    />
  </div>
</template>

<style scoped>
/* Visible scrollbar styling */
.scrollbar-visible::-webkit-scrollbar {
  width: 12px;
}

.scrollbar-visible::-webkit-scrollbar-track {
  background: #0f0f0f;
  border-radius: 0 8px 8px 0;
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  background: #2d2d2d;
  border-radius: 6px;
  border: 2px solid #0f0f0f;
}

.scrollbar-visible::-webkit-scrollbar-thumb:hover {
  background: #3d3d3d;
}

/* Responsive positioning (shared by both Tech and Services) */
@media (min-width: 1024px) {
  .sidebar-panel {
    left: 1.5rem !important;
    right: auto !important;
    width: clamp(280px, 25vw, 300px);
    padding-left: 0;
    padding-right: 0;
  }
}

@media (min-width: 1280px) {
  .sidebar-panel {
    left: max(1.5rem, calc((100vw - 1200px) / 2)) !important;
    width: clamp(320px, 30vw, 420px);
  }
}

@media (min-width: 1440px) {
  .sidebar-panel {
    left: max(0px, calc((100vw - 1200px) / 2)) !important;
    width: 420px;
  }
}
</style>
