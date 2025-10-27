<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface SubSection {
  title: string
  description: string
  slotName: string
}

interface ComponentShowcaseSectionProps {
  title?: string
  description?: string
  subsections?: SubSection[]
}

defineProps<ComponentShowcaseSectionProps>()
</script>

<template>
  <div :class="title || description ? 'space-y-8' : 'space-y-6'">
    <!-- Main Section Header (only shown if title/description provided) -->
    <div v-if="title || description">
      <h1
        v-if="title"
        class="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
      >
        {{ title }}
      </h1>
      <p v-if="description" class="text-gray-400">{{ description }}</p>
    </div>

    <!-- Subsections -->
    <div v-if="subsections && subsections.length > 0" class="space-y-6">
      <div v-for="subsection in subsections" :key="subsection.slotName">
        <h3 class="text-xl font-bold mb-2 text-cyan-400">
          {{ subsection.title }}
        </h3>
        <p class="text-sm text-gray-500 mb-4">
          {{ subsection.description }}
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <slot :name="subsection.slotName" />
        </div>
      </div>
    </div>

    <!-- Default slot for content without subsections -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>
