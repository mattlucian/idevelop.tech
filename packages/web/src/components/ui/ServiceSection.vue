<script setup lang="ts">
import { computed } from "vue";
import PortfolioItem from "../cards/PortfolioItem.vue";
import SimpleTestimonial from "../cards/SimpleTestimonial.vue";
import { useColorScheme } from "@/composables/useColorScheme";
import type {
  PortfolioItem as PortfolioItemType,
  Testimonial,
} from "@/types/shared/card";

interface Props {
  variant: "hero" | "portfolio";
  title: string;
  subtitle?: string;
  items?: PortfolioItemType[];
  testimonial?: Testimonial;
  colorScheme?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
  items: undefined,
  testimonial: undefined,
  colorScheme: "cyan",
});

const colors = computed(() => useColorScheme(props.colorScheme));
</script>

<template>
  <!-- Hero Variant -->
  <div v-if="variant === 'hero'" class="max-w-5xl mx-auto px-6 py-8">
    <div
      :class="$slots.default ? 'flex flex-col md:flex-row gap-8 md:gap-12' : ''"
    >
      <div class="max-w-3xl" :class="$slots.default ? 'flex-1' : ''">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {{ title }}
        </h1>
        <p class="text-lg md:text-xl text-slate-400 leading-relaxed mb-6">
          {{ subtitle }}
        </p>
        <div v-if="$slots.badge" class="mb-6">
          <slot name="badge" />
        </div>
        <div v-if="$slots['rate-card']" class="mb-6">
          <slot name="rate-card" />
        </div>
        <div v-if="$slots.action">
          <slot name="action" />
        </div>
      </div>
      <div
        v-if="$slots.default"
        class="w-full md:w-[340px] lg:w-[400px] shrink-0"
      >
        <div class="md:sticky md:top-24">
          <slot />
        </div>
      </div>
    </div>
  </div>

  <!-- Portfolio Variant -->
  <div
    v-else-if="variant === 'portfolio'"
    class="bg-slate-900/30 border-y border-slate-800/30"
  >
    <div class="max-w-5xl mx-auto px-6 py-16">
      <h2
        :class="[
          'text-sm font-semibold uppercase tracking-wider mb-8',
          colors.text,
        ]"
      >
        {{ title }}
      </h2>

      <div class="space-y-4">
        <PortfolioItem
          v-for="(item, index) in items"
          :key="index"
          :item="item"
          :color-scheme="colorScheme"
        />
      </div>

      <SimpleTestimonial
        v-if="testimonial"
        :quote="testimonial.quote"
        :author="testimonial.author"
        :role="testimonial.role"
        :color-scheme="colorScheme"
        class="mt-12"
      />
    </div>
  </div>
</template>
