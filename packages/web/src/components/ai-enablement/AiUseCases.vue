<script setup lang="ts">
import type { AIUseCase } from "@/types/service";
import { withIcons } from "@/utils/iconMapping";
import ContentSection from "../ui/ContentSection.vue";
import OutlineIcon from "../elements/OutlineIcon.vue";

interface Props {
  useCases: AIUseCase[];
}

const props = defineProps<Props>();

const useCaseCards = withIcons(props.useCases);

const borderColors = {
  cyan: "border-cyan-500/30",
  purple: "border-purple-500/30",
  emerald: "border-emerald-500/30",
  orange: "border-orange-500/30",
};
</script>

<template>
  <ContentSection
    banded
    title="Where Teams Use AI Today"
    subtitle="Common starting points across an organization."
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="useCase in useCaseCards"
        :key="useCase.title"
        :class="[
          'rounded-xl border bg-[#0f0f0f] p-5',
          borderColors[useCase.color],
        ]"
      >
        <div class="flex items-center gap-2">
          <OutlineIcon
            v-if="useCase.iconComponent"
            :icon="useCase.iconComponent"
            size="md"
            :color="useCase.color"
          />
          <h3 class="font-semibold text-white">{{ useCase.title }}</h3>
        </div>
        <ul class="mt-3 space-y-1.5 text-sm text-slate-400">
          <li v-for="item in useCase.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </ContentSection>
</template>
