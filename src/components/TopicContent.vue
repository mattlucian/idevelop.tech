<script setup lang="ts">
interface Section {
  heading: string
  content: string
}

interface Props {
  skillTags?: string[]
  intro?: string
  sections?: Section[]
}

defineProps<Props>()
</script>

<template>
  <div>
    <!-- Skill Tags -->
    <div v-if="skillTags && skillTags.length > 0" class="mb-6 flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in skillTags"
        :key="index"
        class="inline-flex items-center px-3 py-1.5 rounded-md bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/30"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Intro Box -->
    <div v-if="intro" class="mb-6 p-4 bg-gray-800/50 border-l-4 border-teal-500 rounded-r-lg">
      <p class="text-gray-300 italic">{{ intro }}</p>
    </div>

    <!-- Sections -->
    <div v-if="sections && sections.length > 0" class="space-y-6">
      <div v-for="(section, index) in sections" :key="index">
        <h4 class="font-semibold text-lg mb-3 text-teal-300 border-b border-gray-700 pb-2">
          {{ section.heading }}
        </h4>
        <p class="mb-4 text-gray-300">{{ section.content }}</p>
      </div>
    </div>
  </div>
</template>
