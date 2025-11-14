<script setup lang="ts">
import { computed } from "vue";
import BenefitCard from "../cards/BenefitCard.vue";
import PortfolioItem from "../cards/PortfolioItem.vue";
import SimpleTestimonial from "../cards/SimpleTestimonial.vue";
import { useColorScheme } from "@/composables/useColorScheme";
import type {
  BenefitItem,
  PortfolioItem as PortfolioItemType,
  Testimonial,
  ExpertiseBadge,
} from "@/types/shared/card";

interface Props {
  variant: "hero" | "benefits" | "portfolio";
  title: string;
  subtitle?: string;
  benefits?: BenefitItem[];
  items?: PortfolioItemType[];
  testimonial?: Testimonial;
  expertiseBadge?: ExpertiseBadge;
  colorScheme?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
  benefits: undefined,
  items: undefined,
  testimonial: undefined,
  expertiseBadge: undefined,
  colorScheme: "cyan",
});

const colors = computed(() => useColorScheme(props.colorScheme));
const badgeClasses = computed(
  () => `${colors.value.bg} ${colors.value.border} ${colors.value.text}`,
);
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

  <!-- Benefits Variant -->
  <div v-else-if="variant === 'benefits'" class="max-w-5xl mx-auto px-6 py-16">
    <!-- Section Title -->
    <h2
      v-if="title"
      class="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
    >
      {{ title }}
    </h2>

    <!-- Benefits Grid -->
    <div class="grid md:grid-cols-3 gap-8 mb-12">
      <BenefitCard
        v-for="(benefit, index) in benefits"
        :key="index"
        :title="benefit.title"
        :description="benefit.description"
      />
    </div>

    <!-- Expertise Badge (Optional) -->
    <div
      v-if="expertiseBadge"
      class="bg-linear-to-br from-slate-800/40 to-slate-900/40 rounded-lg p-6 border border-slate-700/30 text-center"
    >
      <div
        :class="[
          'inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-3',
          badgeClasses,
        ]"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
        <span class="text-sm font-semibold">{{ expertiseBadge.title }}</span>
      </div>
      <p class="text-slate-400 max-w-2xl mx-auto">
        {{ expertiseBadge.description }}
      </p>
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
