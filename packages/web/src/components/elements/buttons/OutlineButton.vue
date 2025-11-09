<script setup lang="ts">
interface OutlineButtonProps {
  /** Color scheme variant */
  colorScheme?: "cyan" | "emerald" | "gray";
  /** Full width button (default: false) */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

withDefaults(defineProps<OutlineButtonProps>(), {
  colorScheme: "cyan",
  fullWidth: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'px-4 py-1.5 border-2 rounded-md text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed antialiased',
      fullWidth ? 'w-full text-center' : '',
      colorScheme === 'cyan'
        ? 'bg-cyan-500/10 hover:bg-cyan-500/15 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300'
        : colorScheme === 'emerald'
          ? 'bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300'
          : 'bg-slate-500/10 hover:bg-slate-500/15 border-slate-600 hover:border-slate-500 text-slate-400 hover:text-slate-300',
    ]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
