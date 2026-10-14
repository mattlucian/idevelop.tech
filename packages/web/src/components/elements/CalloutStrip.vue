<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  icon: Component;
  iconClass?: string;
}

withDefaults(defineProps<Props>(), {
  iconClass: "text-emerald-400",
});
</script>

<template>
  <div
    class="mt-8 flex items-center justify-center gap-3 rounded-lg border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-300"
  >
    <component :is="icon" :class="['h-5 w-5 shrink-0', iconClass]" />
    <span><slot /></span>
  </div>
</template>
