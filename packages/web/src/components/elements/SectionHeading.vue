<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

withDefaults(defineProps<Props>(), {
  subtitle: "",
  eyebrow: "",
});
</script>

<template>
  <div class="text-center mb-10 md:mb-12">
    <div
      v-if="eyebrow"
      class="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400"
    >
      {{ eyebrow }}
    </div>
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-lg text-slate-400 max-w-2xl mx-auto">
      {{ subtitle }}
    </p>
  </div>
</template>
