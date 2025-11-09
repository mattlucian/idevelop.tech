<script setup lang="ts">
import { ref } from "vue";
import IconButton from "../elements/buttons/IconButton.vue";
import type { PanelColorScheme, PanelHeaderStyle } from "../../types/shared/ui";

interface Props {
  colorScheme?: PanelColorScheme;
  headerStyle?: PanelHeaderStyle;
}

withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
  headerStyle: "simple",
});

const emit = defineEmits<{
  close: [];
}>();

const contentPanelRef = ref<HTMLElement | null>(null);

const close = () => {
  emit("close");
};

// Expose scroll method for parent to control scrolling
defineExpose({
  scrollToTop: () => {
    if (contentPanelRef.value) {
      contentPanelRef.value.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  },
});
</script>

<template>
  <div
    class="content-panel fixed top-16 z-50 bg-[#0a0a0a] pointer-events-auto inset-x-0 px-2 pt-1 pb-4 lg:pb-3 lg:px-0"
    style="height: calc(100vh - 4rem)"
    @click.stop
  >
    <!-- Mobile: full-screen scrollable container, Desktop: fixed panel with internal scroll -->
    <div
      class="h-full overflow-y-auto lg:overflow-hidden scrollbar-visible lg:scrollbar-hidden"
    >
      <div
        class="bg-[#1a1a1a] border border-[#333333] rounded-xl lg:flex lg:flex-col lg:h-full lg:relative lg:overflow-hidden"
      >
        <!-- Close button (top right of content panel) -->
        <IconButton
          type="close"
          :size="headerStyle === 'decorative' ? 'lg' : 'md'"
          absolute-position
          @click="close"
        />
        <!-- Header -->
        <div
          v-if="headerStyle === 'decorative'"
          class="sticky lg:relative top-0 z-50 bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-[#0f0f0f] pt-3 lg:pt-8 px-4 pr-14 lg:px-8 lg:pr-8 pb-3 lg:pb-6 rounded-t-xl overflow-hidden border-b border-cyan-500/20"
        >
          <!-- Decorative background elements (desktop only) -->
          <div
            class="hidden lg:block absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
          />
          <div
            class="hidden lg:block absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          />

          <div class="relative">
            <!-- Small accent line (desktop only) -->
            <div
              class="hidden lg:block w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4"
            />
            <slot name="header" />
          </div>
        </div>

        <!-- Simple Header -->
        <div
          v-else
          class="sticky lg:relative top-0 z-50 bg-[#1a1a1a] pt-3 lg:pt-8 px-4 pr-14 lg:px-8 lg:pr-8 pb-3 lg:pb-6 border-b border-[#333333] rounded-t-xl"
        >
          <slot name="header" />
        </div>

        <!-- Scrollable Content -->
        <div
          ref="contentPanelRef"
          class="p-4 pt-5 lg:p-8 lg:flex-1 lg:overflow-y-auto lg:scrollbar-visible"
        >
          <slot />
        </div>

        <!-- Gradient overlay at bottom (desktop only) -->
        <div
          class="hidden lg:block absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent pointer-events-none z-10 rounded-b-xl"
        />
      </div>
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

/* Hide scrollbar on mobile outer container (content scrolls inside card) */
@media (max-width: 1023px) {
  .scrollbar-visible::-webkit-scrollbar {
    width: 12px;
  }
}

/* Responsive positioning (desktop only) */
@media (min-width: 1024px) {
  .content-panel {
    left: calc(1.5rem + clamp(280px, 25vw, 300px) + 1.5rem);
    right: 1.5rem;
    width: auto;
    inset-x: auto;
    padding-left: 0;
    padding-right: 0;
  }
}

@media (min-width: 1280px) {
  .content-panel {
    left: calc(
      max(1.5rem, calc((100vw - 1200px) / 2)) + clamp(320px, 30vw, 420px) + 2rem
    );
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
