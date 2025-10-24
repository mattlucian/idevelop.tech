<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '../elements/buttons/IconButton.vue'
import type { PanelColorScheme, PanelHeaderStyle } from '../../types/shared/ui'

interface Props {
  colorScheme?: PanelColorScheme
  headerStyle?: PanelHeaderStyle
}

withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
  headerStyle: 'simple',
})

const emit = defineEmits<{
  close: []
}>()

const contentPanelRef = ref<HTMLElement | null>(null)

const close = () => {
  emit('close')
}

// Expose scroll method for parent to control scrolling
defineExpose({
  scrollToTop: () => {
    if (contentPanelRef.value) {
      contentPanelRef.value.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  },
})
</script>

<template>
  <div
    class="content-panel hidden lg:block fixed top-16 z-50 bg-[#0a0a0a] pb-3 pointer-events-auto"
    style="height: calc(100vh - 4rem)"
    @click.stop
  >
    <!-- Close button (top right of content panel) -->
    <IconButton type="close" size="lg" absolute-position @click="close" />

    <div
      class="bg-[#1a1a1a] border border-[#333333] rounded-xl flex flex-col h-full relative overflow-hidden"
    >
      <!-- Fixed Header (Decorative style with blur orbs - Services) -->
      <div
        v-if="headerStyle === 'decorative'"
        class="relative bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-[#0f0f0f] pt-8 px-8 pb-6 rounded-t-xl overflow-hidden border-b border-cyan-500/20"
      >
        <!-- Decorative background elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div
          class="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
        ></div>

        <div class="relative">
          <!-- Small accent line -->
          <div
            class="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4"
          ></div>
          <slot name="header"></slot>
        </div>
      </div>

      <!-- Fixed Header (Simple style - Tech) -->
      <div v-else class="bg-[#1a1a1a] pt-8 px-8 pb-6 border-b border-[#333333] rounded-t-xl">
        <slot name="header"></slot>
      </div>

      <!-- Scrollable Content -->
      <div ref="contentPanelRef" class="p-8 flex-1 overflow-y-auto scrollbar-visible">
        <slot></slot>
      </div>

      <!-- Gradient overlay at bottom of right panel -->
      <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent pointer-events-none z-10 rounded-b-xl"
      ></div>
    </div>
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
  .content-panel {
    left: calc(1.5rem + clamp(280px, 25vw, 300px) + 1.5rem);
    right: 1.5rem;
    width: auto;
  }
}

@media (min-width: 1280px) {
  .content-panel {
    left: calc(max(1.5rem, calc((100vw - 1200px) / 2)) + clamp(320px, 30vw, 420px) + 2rem);
    right: max(1.5rem, calc((100vw - 1200px) / 2));
  }
}

@media (min-width: 1440px) {
  .content-panel {
    left: calc(max(0px, calc((100vw - 1200px) / 2)) + 420px + 2rem);
    width: calc(1200px - 420px - 2rem);
    right: auto;
  }
}
</style>
