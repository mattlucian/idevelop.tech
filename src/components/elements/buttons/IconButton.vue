<script setup lang="ts">
type IconButtonSize = 'sm' | 'md' | 'lg'
type IconButtonType = 'back' | 'close'

interface IconButtonProps {
  /** Size variant */
  size?: IconButtonSize
  /** Button type (back arrow or close X) */
  type?: IconButtonType
  /** Position absolute with top-right positioning */
  absolutePosition?: boolean
}

withDefaults(defineProps<IconButtonProps>(), {
  size: 'md',
  type: 'close',
  absolutePosition: false,
})

const emit = defineEmits<{
  click: []
}>()

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
  lg: 'w-10 h-10',
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
}
</script>

<template>
  <button
    @click="emit('click')"
    :class="[
      'rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-cyan-500 flex items-center justify-center transition-all group',
      sizeClasses[size],
      absolutePosition ? 'absolute top-5 right-5 z-[60]' : '',
      !absolutePosition && size === 'sm' ? 'flex-shrink-0' : '',
    ]"
  >
    <!-- Back arrow -->
    <svg
      v-if="type === 'back'"
      :class="['text-gray-400 group-hover:text-cyan-400 transition-colors', iconSizes[size]]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>

    <!-- Close X -->
    <svg
      v-else
      :class="['text-gray-400 group-hover:text-cyan-400 transition-colors', iconSizes[size]]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
