<script setup lang="ts">
interface Props {
  title: string;
  icon?: string;
  variant?: "default" | "tight";
}

withDefaults(defineProps<Props>(), {
  variant: "default",
});
</script>

<template>
  <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl p-4">
    <h2
      v-if="icon"
      class="text-base font-bold text-white flex items-center gap-2"
      :class="variant === 'tight' ? 'mb-2' : 'mb-3'"
    >
      <span class="text-lg">{{ icon }}</span>
      {{ title }}
    </h2>
    <h2
      v-else
      class="text-base font-bold text-white"
      :class="variant === 'tight' ? 'mb-2' : 'mb-3'"
    >
      {{ title }}
    </h2>
    <slot />
  </div>
</template>
