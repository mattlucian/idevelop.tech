<script setup lang="ts">
interface Props {
  title: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  photographer: string;
  photographerUrl: string;
  photoUrl: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-[#1a1a1a] border border-[#333333] rounded-lg p-6">
    <h3 class="text-xl font-semibold mb-3 text-cyan-400">
      {{ title }}
    </h3>
    <img
      :src="imageUrl"
      :alt="imageAlt"
      width="768"
      height="432"
      loading="lazy"
      decoding="async"
      class="w-full h-48 object-cover rounded-lg mb-4"
    />
    <p class="text-sm text-gray-400 mb-2">
      {{ description }}
    </p>
    <p class="text-sm text-gray-300">
      Photo by
      <a
        :href="photographerUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-teal-400 hover:text-teal-300"
      >
        {{ photographer }}
      </a>
      on
      <a
        :href="photoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-teal-400 hover:text-teal-300"
      >
        Unsplash
      </a>
    </p>
  </div>
</template>
