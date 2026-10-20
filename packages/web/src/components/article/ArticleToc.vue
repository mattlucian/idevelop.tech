<script setup lang="ts">
import type { ArticleOutlineItem } from "@/composables/useArticleOutline";

interface Props {
  items: ArticleOutlineItem[];
  activeId: string;
}

defineProps<Props>();
</script>

<template>
  <nav v-if="items.length" aria-label="On this page" class="text-sm">
    <p
      class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
    >
      On this page
    </p>
    <ul class="space-y-1 border-l border-slate-800">
      <li v-for="item in items" :key="item.id">
        <router-link
          :to="{ hash: `#${item.id}` }"
          :aria-current="item.id === activeId ? 'location' : undefined"
          :class="[
            '-ml-px block border-l py-1 leading-snug transition-colors',
            item.nested ? 'pl-7' : 'pl-4',
            item.id === activeId
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200',
          ]"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
