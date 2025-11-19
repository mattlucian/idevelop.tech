<script setup lang="ts">
import TabButton from "./TabButton.vue";
import type { ColorScheme } from "@/composables/useColorScheme";
import type { TabConfig } from "@/types/shared/ui";

interface Props {
  tabs?: TabConfig[];
  modelValue: string;
  colorScheme?: ColorScheme;
}

withDefaults(defineProps<Props>(), {
  tabs: () => [],
  colorScheme: "cyan",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleTabClick = (tabId: string) => {
  emit("update:modelValue", tabId);
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-2 mb-6 md:border-b md:border-slate-700/30"
  >
    <TabButton
      v-for="tab in tabs"
      :key="tab.id"
      :label="tab.label"
      :color-scheme="colorScheme"
      :active="modelValue === tab.id"
      @click="handleTabClick(tab.id)"
    />
  </div>
</template>
