<script setup lang="ts">
import { computed } from "vue";
import { useColorScheme, type ColorScheme } from "@/composables/useColorScheme";
import OutlineIcon from "../elements/OutlineIcon.vue";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";

interface Props {
  title: string;
  description: string;
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
  colorScheme?: ColorScheme;
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "emerald",
});

const colors = useColorScheme(props.colorScheme);

// Compute after column classes based on color scheme
const afterBorderClass = computed(() => `border-${props.colorScheme}-500/30`);
const afterIconColor = computed(
  () => props.colorScheme as "cyan" | "emerald" | "purple",
);
const afterTitleClass = computed(() => colors.text);
const afterBulletClass = computed(() => colors.text);
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
          :class="[
            'flex items-center gap-2 mb-4 pb-2 border-b',
            afterBorderClass,
          ]"
        >
          <OutlineIcon
            :icon="CheckCircleIcon"
            size="md"
            :color="afterIconColor"
          />
          <h4 :class="['text-lg font-semibold', afterTitleClass]">
            {{ afterTitle }}
          </h4>
        </div>
        <div class="space-y-3">
          <div
            v-for="(item, index) in afterItems"
            :key="`after-${index}`"
            class="flex items-start gap-3 text-slate-300"
          >
            <span :class="['mt-0.5', afterBulletClass]">✓</span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
