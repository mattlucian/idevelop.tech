<script setup lang="ts">
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/vue/24/outline";
import type { FlxpointStage } from "@/types/service";
import { getIconByName } from "@/utils/iconMapping";
import ContentSection from "../ui/ContentSection.vue";

interface Props {
  stages: FlxpointStage[];
}

const props = defineProps<Props>();

const stageCards = props.stages.map((stage, index) => ({
  ...stage,
  number: index + 1,
  iconComponent: getIconByName(stage.icon),
}));

// The API stage sits beside the main flow rather than after fulfillment
const flow = stageCards.filter((stage) => stage.id !== "integrations");
const api = stageCards.find((stage) => stage.id === "integrations");
</script>

<template>
  <ContentSection
    title="How I Help at Each Stage"
    subtitle="Common help across a Flxpoint setup, from supplier feeds to tracking."
  >
    <ol class="flex flex-col gap-2 lg:flex-row lg:items-stretch">
      <template v-for="(stage, index) in flow" :key="stage.id">
        <li v-if="index > 0" class="flex justify-center" aria-hidden="true">
          <ArrowDownIcon class="h-4 w-4 text-slate-600 lg:hidden" />
          <ArrowRightIcon
            class="hidden h-4 w-4 self-center text-slate-600 lg:block"
          />
        </li>
        <li
          :id="stage.id"
          class="flex scroll-mt-24 flex-col rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-4 lg:flex-1"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-cyan-400">
              {{ stage.number }}
            </span>
            <component
              :is="stage.iconComponent"
              v-if="stage.iconComponent"
              class="h-5 w-5 text-slate-400"
            />
          </div>
          <h3 class="mt-2 font-semibold text-white">{{ stage.label }}</h3>
          <p class="text-xs text-slate-500">{{ stage.summary }}</p>
          <ul
            class="mt-3 space-y-1.5 border-t border-slate-800 pt-3 text-sm text-slate-300"
          >
            <li v-for="item in stage.help" :key="item">{{ item }}</li>
          </ul>
        </li>
      </template>
    </ol>

    <div
      v-if="api"
      :id="api.id"
      class="mt-4 flex scroll-mt-24 flex-col gap-3 rounded-xl border border-dashed border-purple-500/40 bg-[#0f0f0f] p-4 md:flex-row md:items-center"
    >
      <div class="flex items-center gap-2 md:w-64 md:shrink-0">
        <component
          :is="api.iconComponent"
          v-if="api.iconComponent"
          class="h-5 w-5 text-purple-300"
        />
        <div>
          <h3 class="font-semibold text-white">{{ api.label }}</h3>
          <p class="text-xs text-slate-500">{{ api.summary }}</p>
        </div>
      </div>
      <ul class="flex flex-wrap gap-2 text-sm text-slate-300">
        <li
          v-for="item in api.help"
          :key="item"
          class="rounded-full border border-slate-700 px-3 py-1"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </ContentSection>
</template>
