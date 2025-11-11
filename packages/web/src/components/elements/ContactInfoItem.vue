<script setup lang="ts">
import IconBadge from "./badges/IconBadge.vue";

interface Props {
  icon: string;
  label: string;
  color?: "cyan" | "emerald";
}

withDefaults(defineProps<Props>(), {
  color: "cyan",
});
</script>

<template>
  <div class="flex items-center gap-3">
    <IconBadge size="sm" :color="color" :icon="icon" />
    <div class="flex-1">
      <div class="text-xs text-gray-500 mb-0.5">
        {{ label }}
      </div>
      <div class="text-xs text-gray-300">
        <slot />
      </div>
    </div>
  </div>
</template>
