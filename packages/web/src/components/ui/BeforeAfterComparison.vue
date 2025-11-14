<script setup lang="ts">
import OutlineIcon from "../elements/OutlineIcon.vue";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";

interface Props {
  title: string;
  description: string;
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
}

defineProps<Props>();
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-white mb-3">
      {{ title }}
    </h3>
    <p class="text-slate-300 mb-8">
      {{ description }}
    </p>
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Before column -->
      <div>
        <div
          class="flex items-center gap-2 mb-4 pb-2 border-b border-red-500/30"
        >
          <OutlineIcon :icon="XCircleIcon" size="md" color="slate" />
          <h4 class="text-lg font-semibold text-red-400">
            {{ beforeTitle }}
          </h4>
        </div>
        <div class="space-y-3">
          <div
            v-for="(item, index) in beforeItems"
            :key="`before-${index}`"
            class="flex items-start gap-3 text-slate-400"
          >
            <span class="text-red-400 mt-0.5">•</span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- After column -->
      <div>
        <div
          class="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-500/30"
        >
          <OutlineIcon :icon="CheckCircleIcon" size="md" color="emerald" />
          <h4 class="text-lg font-semibold text-emerald-400">
            {{ afterTitle }}
          </h4>
        </div>
        <div class="space-y-3">
          <div
            v-for="(item, index) in afterItems"
            :key="`after-${index}`"
            class="flex items-start gap-3 text-slate-300"
          >
            <span class="text-emerald-400 mt-0.5">✓</span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
