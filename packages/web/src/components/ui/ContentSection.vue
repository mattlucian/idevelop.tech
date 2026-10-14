<script setup lang="ts">
import SectionHeading from "../elements/SectionHeading.vue";

interface Props {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  banded?: boolean;
  id?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  eyebrow: "",
  banded: false,
  id: undefined,
});
</script>

<template>
  <section
    :id="id"
    :class="[
      'scroll-mt-20',
      banded ? 'bg-slate-900/30 border-y border-slate-800/30' : '',
    ]"
  >
    <div class="max-w-5xl mx-auto px-6 py-16">
      <SectionHeading
        v-if="title"
        :title="title"
        :subtitle="subtitle"
        :eyebrow="eyebrow"
      />
      <slot />
    </div>
  </section>
</template>
