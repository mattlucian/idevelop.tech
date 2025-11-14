<script setup lang="ts">
import { computed } from "vue";
import Badge from "../elements/badges/Badge.vue";
import { getIconByName } from "@/utils/iconMapping";

interface Props {
  icon: string;
  label: string;
  title: string;
  tagline: string;
  stats: { value: string; label: string }[];
  tags: string[];
  heroImage?: string;
  loading?: "lazy" | "eager";
}

const props = withDefaults(defineProps<Props>(), {
  heroImage: undefined,
  loading: "lazy",
});

const emit = defineEmits<{
  click: [];
}>();

// Check if icon is actually an icon name
const iconComponent = computed(() => getIconByName(props.icon));
const isIconName = computed(() => iconComponent.value !== undefined);
</script>

<template>
  <div
    role="button"
    tabindex="0"
    class="relative block rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
    :aria-label="`Learn more about ${title}`"
    @click="emit('click')"
    @keydown.enter="emit('click')"
    @keydown.space.prevent="emit('click')"
  >
    <!-- Hero Section -->
    <div v-if="heroImage" class="relative h-48 overflow-hidden">
      <!-- Unsplash Image Background -->
      <img
        :src="heroImage"
        :alt="title"
        width="768"
        height="432"
        :loading="loading"
        decoding="async"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Softer full-image gradient overlay - mutes image while keeping it visible -->
      <div
        class="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-[#1a1a1a]/40"
      />

      <!-- Label badge -->
      <div
        class="absolute bottom-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold bg-black/80 text-cyan-300 border-2 border-cyan-500/50 backdrop-blur-md uppercase tracking-wider"
      >
        {{ label }}
      </div>
    </div>

    <!-- Fallback: Minimalist Icon Style -->
    <div
      v-else
      class="relative h-48 overflow-hidden bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f]"
    >
      <!-- Subtle geometric background -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent"
        />
        <div
          class="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent"
        />
        <div
          class="absolute top-0 left-0 w-px h-full bg-linear-to-b from-transparent via-cyan-500 to-transparent"
        />
        <div
          class="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-cyan-500 to-transparent"
        />
      </div>

      <!-- Large centered icon with glow -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-3"
      >
        <div class="relative flex items-center justify-center w-32 h-32">
          <div
            class="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl group-hover:blur-3xl group-hover:bg-cyan-400/40 transition-all"
          />
          <div v-if="isIconName && iconComponent" class="relative">
            <component :is="iconComponent" class="w-24 h-24 text-cyan-400" />
          </div>
          <div v-else class="relative text-8xl">
            {{ icon }}
          </div>
        </div>
        <div
          class="px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border-2 border-cyan-500/30 uppercase tracking-wider"
        >
          {{ label }}
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6">
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <h2 class="relative text-2xl font-bold">
            <span
              class="text-white transition-opacity duration-300 group-hover:opacity-0"
              >{{ title }}</span
            >
            <span
              class="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >{{ title }}</span
            >
          </h2>
          <p class="text-sm text-gray-300 mt-1">
            {{ tagline }}
          </p>
        </div>
      </div>

      <!-- Tags as badges - toned down -->
      <div class="flex gap-1.5 flex-wrap mb-4 opacity-90">
        <Badge v-for="(tag, index) in tags" :key="index" variant="muted">
          {{ tag }}
        </Badge>
      </div>

      <!-- Stats in boxes - toned down - hidden on mobile -->
      <!-- <div class="hidden md:block mb-4 opacity-90">
        <StatBox :stats="stats" layout="grid" size="md" color="gray-400" />
      </div> -->

      <!-- Separator line -->
      <div class="border-t border-gray-800 mb-4" />

      <!-- Hover CTA text -->
      <div class="relative text-sm font-semibold overflow-hidden">
        <span
          class="text-gray-300 group-hover:text-cyan-400 transition-colors duration-300"
        >
          Learn More →
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
