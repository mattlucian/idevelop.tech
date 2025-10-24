<script setup lang="ts">
import Badge from '../elements/badges/Badge.vue'
import type { Expertise } from '../../types/tech'

interface Props {
  section: Expertise
}

defineProps<Props>()
</script>

<template>
  <div>
    <!-- Skill Tags -->
    <div v-if="section.skillTags && section.skillTags.length > 0" class="mb-6 flex flex-wrap gap-2">
      <Badge v-for="(tag, index) in section.skillTags" :key="index" variant="emerald">
        {{ tag }}
      </Badge>
    </div>

    <!-- Intro Box -->
    <div
      v-if="section.intro"
      class="mb-6 p-4 bg-gray-800/50 border-l-4 border-emerald-500 rounded-r-lg"
    >
      <p class="text-gray-300 italic">{{ section.intro }}</p>
    </div>

    <!-- Sections -->
    <div v-if="section.sections && section.sections.length > 0" class="space-y-6">
      <div v-for="(sectionItem, index) in section.sections" :key="index">
        <h4 class="font-semibold text-lg mb-3 text-emerald-300 border-b border-gray-700 pb-2">
          {{ sectionItem.heading }}
        </h4>
        <p class="mb-4 text-gray-300">{{ sectionItem.content }}</p>
      </div>
    </div>
  </div>
</template>
