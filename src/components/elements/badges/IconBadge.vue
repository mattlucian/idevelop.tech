<script setup lang="ts">
type IconBadgeSize = 'sm' | 'md' | 'lg' | 'xl'
type IconBadgeColor = 'cyan' | 'teal' | 'purple' | 'green' | 'emerald' | 'neutral'

interface IconBadgeProps {
  /** Size variant */
  size?: IconBadgeSize
  /** Color variant */
  color?: IconBadgeColor
  /** Icon/emoji to display */
  icon?: string
  /** Show border */
  bordered?: boolean
}

withDefaults(defineProps<IconBadgeProps>(), {
  size: 'md',
  color: 'cyan',
  bordered: false,
})

const sizeClasses = {
  sm: 'w-8 h-8 text-lg',
  md: 'w-10 h-10 text-xl',
  lg: 'w-12 h-12 text-2xl',
  xl: 'w-16 h-16 text-3xl',
}

const colorClasses = {
  cyan: 'bg-cyan-500/10',
  teal: 'bg-teal-700/10',
  purple: 'bg-purple-500/10',
  green: 'bg-green-500/10',
  emerald: 'bg-emerald-700/10',
  neutral: 'bg-[#1a1a1a]',
}

const borderClasses = {
  cyan: 'border-2 border-cyan-500/30',
  teal: 'border-2 border-teal-500/30',
  purple: 'border-2 border-purple-500/30',
  green: 'border-2 border-green-500/30',
  emerald: 'border-2 border-emerald-500/30',
  neutral: 'border-2 border-[#333333]',
}
</script>

<template>
  <div
    :class="[
      'rounded-full flex items-center justify-center',
      sizeClasses[size],
      colorClasses[color],
      bordered ? borderClasses[color] : '',
    ]"
  >
    <span v-if="icon">{{ icon }}</span>
    <slot v-else />
  </div>
</template>
