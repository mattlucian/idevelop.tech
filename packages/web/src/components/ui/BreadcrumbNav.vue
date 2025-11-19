<script setup lang="ts">
import { useColorScheme, type ColorScheme } from "@/composables/useColorScheme";
import type { BreadcrumbItem } from "@/types/shared/ui";

interface Props {
  items: BreadcrumbItem[];
  colorScheme?: ColorScheme;
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

const colors = useColorScheme(props.colorScheme);

const emit = defineEmits<{
  navigate: [path: string];
}>();

const handleClick = (path?: string) => {
  if (path) {
    emit("navigate", path);
  }
};
</script>

<template>
  <div class="border-b border-slate-800/20">
    <div class="max-w-5xl mx-auto px-6 py-3">
      <nav class="flex items-center gap-2 text-sm">
        <template v-for="(item, index) in items" :key="index">
          <button
            v-if="item.path"
            :class="['text-slate-500 transition-colors', colors.textHover]"
            @click="handleClick(item.path)"
          >
            {{ item.label }}
          </button>
          <span v-else class="text-slate-400">{{ item.label }}</span>

          <span v-if="index < items.length - 1" class="text-slate-700">/</span>
        </template>
      </nav>
    </div>
  </div>
</template>
