<script setup lang="ts">
import { computed } from "vue";
import { BookOpenIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
import type { ArticleMeta } from "@/types/article";
import { articlePath, articleTypeLabels } from "@/data/articles";

interface Props {
  article: ArticleMeta;
}

const props = defineProps<Props>();

const label = computed(() => articleTypeLabels[props.article.type]);
</script>

<template>
  <router-link
    :to="articlePath(article.slug)"
    class="group block rounded-xl p-px bg-linear-to-r from-cyan-500/60 to-purple-500/60 hover:from-cyan-400 hover:to-purple-400 transition-colors"
  >
    <div class="rounded-xl bg-[#0f0f0f] p-6">
      <div class="flex items-center gap-2 mb-3">
        <BookOpenIcon class="w-5 h-5 text-cyan-400" />
        <span
          class="text-xs font-semibold uppercase tracking-wider text-cyan-400"
        >
          {{ label.eyebrow }}
        </span>
        <span
          v-if="article.status === 'draft'"
          class="ml-auto px-2 py-0.5 rounded-md text-[11px] font-semibold border border-orange-500/40 text-orange-400 bg-orange-500/10"
        >
          Draft
        </span>
        <span
          v-else-if="article.status === 'review'"
          class="ml-auto px-2 py-0.5 rounded-md text-[11px] font-semibold border border-purple-500/40 text-purple-300 bg-purple-500/10"
        >
          In review
        </span>
      </div>
      <p class="text-lg md:text-xl font-bold text-white mb-2">
        {{ article.title }}
      </p>
      <p class="text-sm text-slate-400 leading-relaxed mb-4">
        {{ article.summary }}
      </p>
      <span
        class="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300"
      >
        {{ label.action }}
        <ArrowRightIcon
          class="w-4 h-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </div>
  </router-link>
</template>
