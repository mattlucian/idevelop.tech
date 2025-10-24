<script setup lang="ts">
interface PrimaryButtonProps {
  /** Show arrow icon on desktop (default: true) */
  showArrow?: boolean
  /** Full width on mobile, auto on desktop (default: true) */
  responsive?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Button variant: solid (default) or outline */
  variant?: 'solid' | 'outline'
}

withDefaults(defineProps<PrimaryButtonProps>(), {
  showArrow: true,
  responsive: true,
  disabled: false,
  variant: 'solid',
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div :class="responsive ? 'inline-block w-full md:w-auto' : 'inline-block'">
    <!-- Solid variant -->
    <button
      v-if="variant === 'solid'"
      @click="emit('click')"
      :disabled="disabled"
      class="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
    >
      <slot />
      <svg
        v-if="showArrow"
        class="hidden md:inline w-5 h-5 group-hover:translate-x-1 transition-transform"
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

    <!-- Outline variant with gradient border -->
    <button
      v-else-if="variant === 'outline'"
      @click="emit('click')"
      :disabled="disabled"
      class="relative flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-3.5 lg:py-4 bg-[#0a0a0a] rounded-lg font-semibold text-sm md:text-base transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
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
        class="relative hidden md:inline w-5 h-5 text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all"
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
  </div>
</template>
