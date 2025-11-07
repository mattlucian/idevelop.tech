<script setup lang="ts">
interface Props {
  color?: "cyan" | "emerald";
}

withDefaults(defineProps<Props>(), {
  color: "cyan",
});
</script>

<template>
  <li class="flex items-start gap-2 text-xs text-gray-300">
    <svg
      class="w-4 h-4 flex-shrink-0 mt-0.5"
      :class="color === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span><slot></slot></span>
  </li>
</template>
