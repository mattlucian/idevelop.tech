<script setup lang="ts">
interface PrimaryRouterLinkProps {
  /** Target route path or external URL */
  to: string;
  /** Show arrow icon (default: true) */
  showArrow?: boolean;
  /** External link (uses <a> instead of <router-link>) */
  external?: boolean;
}

withDefaults(defineProps<PrimaryRouterLinkProps>(), {
  showArrow: true,
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
    class="relative py-3 px-6 md:px-8 rounded-lg font-semibold text-sm md:text-base transition-all cursor-pointer group overflow-hidden flex items-center justify-center gap-2"
    @click="emit('click')"
  >
    <!-- Gradient border effect using pseudo-element -->
    <span
      class="absolute inset-0 rounded-lg bg-linear-to-r from-cyan-500 to-purple-500 opacity-100 group-hover:opacity-100 transition-opacity"
    />
    <span
      class="absolute inset-[2px] rounded-[6px] bg-[#0a0a0a] group-hover:bg-[#0f0f0f] transition-colors"
    />

    <!-- Content -->
    <span
      class="relative text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-300"
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
  </router-link>
  <a
    v-else
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
    class="relative py-3 px-6 md:px-8 rounded-lg font-semibold text-sm md:text-base transition-all cursor-pointer group overflow-hidden flex items-center justify-center gap-2"
    @click="emit('click')"
  >
    <!-- Gradient border effect using pseudo-element -->
    <span
      class="absolute inset-0 rounded-lg bg-linear-to-r from-cyan-500 to-purple-500 opacity-100 group-hover:opacity-100 transition-opacity"
    />
    <span
      class="absolute inset-[2px] rounded-[6px] bg-[#0a0a0a] group-hover:bg-[#0f0f0f] transition-colors"
    />

    <!-- Content -->
    <span
      class="relative text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-300"
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
  </a>
</template>
