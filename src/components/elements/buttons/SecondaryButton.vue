<script setup lang="ts">
interface SecondaryButtonProps {
  /** Show arrow icon (default: true) */
  showArrow?: boolean
  /** Full width button (default: false for inline CTAs) */
  fullWidth?: boolean
  /** Disabled state */
  disabled?: boolean
}

withDefaults(defineProps<SecondaryButtonProps>(), {
  showArrow: true,
  fullWidth: false,
  disabled: false,
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    @click="emit('click')"
    :disabled="disabled"
    :class="[
      'relative py-3 px-6 md:px-8 rounded-lg font-semibold text-sm md:text-base transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-2',
      fullWidth ? 'w-full' : 'w-auto',
    ]"
  >
    <!-- Gradient border effect using pseudo-element -->
    <span
      class="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-100 group-hover:opacity-100 transition-opacity"
    ></span>
    <span
      class="absolute inset-[2px] rounded-[6px] bg-[#0a0a0a] group-hover:bg-[#0f0f0f] transition-colors"
    ></span>

    <!-- Content -->
    <span
      class="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-300"
    >
      <slot />
    </span>
    <svg
      v-if="showArrow"
      class="relative w-4 h-4 md:w-5 md:h-5 text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </button>
</template>
