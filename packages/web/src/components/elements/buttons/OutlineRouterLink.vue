<script setup lang="ts">
interface Props {
  /** Target route path or external URL */
  to: string;
  /** Color scheme variant */
  colorScheme?: "cyan" | "emerald";
  /** Full width button (default: false) */
  fullWidth?: boolean;
  /** External link (uses <a> instead of <router-link>) */
  external?: boolean;
}

withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
  fullWidth: false,
  external: false,
});

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <router-link
    v-if="!external"
    :to="to"
    :class="[
      'px-4 py-1.5 border-2 rounded-md text-sm font-semibold transition-all antialiased',
      fullWidth ? 'block w-full text-center' : '',
      colorScheme === 'cyan'
        ? 'bg-cyan-500/10 hover:bg-cyan-500/15 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300'
        : 'bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300',
    ]"
    @click="emit('click')"
  >
    <slot />
  </router-link>
  <a
    v-else
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'px-4 py-1.5 border-2 rounded-md text-sm font-semibold transition-all antialiased',
      fullWidth ? 'block w-full text-center' : '',
      colorScheme === 'cyan'
        ? 'bg-cyan-500/10 hover:bg-cyan-500/15 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300'
        : 'bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300',
    ]"
    @click="emit('click')"
  >
    <slot />
  </a>
</template>
