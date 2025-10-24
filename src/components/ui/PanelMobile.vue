<script setup lang="ts">
import IconButton from '../elements/buttons/IconButton.vue'
import type { PanelColorScheme } from '../../types/shared/ui'

interface Props {
  colorScheme?: PanelColorScheme
}

withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
})

const emit = defineEmits<{
  close: []
}>()

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="lg:hidden fixed inset-0 top-16 z-40 bg-[#0a0a0a] px-2 pt-1 pb-4">
    <!-- Content -->
    <div class="h-full overflow-y-auto scrollbar-visible">
      <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl">
        <!-- Sticky Header with Close Button -->
        <div
          class="sticky top-0 pt-3 px-4 pb-3 border-b border-[#333333] pr-14 bg-[#1a1a1a] z-50 rounded-t-xl shadow-lg"
        >
          <!-- Close button (top right, inside sticky header) - Goes back to sidebar list -->
          <IconButton type="close" size="md" absolute-position @click="close" />

          <!-- Header slot for category/service name + title -->
          <slot name="header"></slot>
        </div>

        <!-- Content -->
        <div class="p-4 pt-5">
          <slot></slot>
        </div>
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
</style>
