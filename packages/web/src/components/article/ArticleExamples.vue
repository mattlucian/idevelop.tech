<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import type { ArticleExampleItem } from "@/types/article";
import { slugify } from "@/utils/slugify";
import ArticleCite from "./ArticleCite.vue";

interface Props {
  title: string;
  examples: ArticleExampleItem[];
}

const props = defineProps<Props>();

const index = ref(0);
const current = computed(() => props.examples[index.value]);
const count = computed(() => props.examples.length);
const slug = computed(() => slugify(props.title));

const go = (step: number) => {
  index.value = (index.value + step + count.value) % count.value;
};
</script>

<template>
  <section
    :id="`${slug}-examples`"
    class="not-prose my-12 rounded-xl border border-cyan-900/50 bg-linear-to-br from-cyan-950/20 to-purple-950/10 p-4 md:p-6"
    :aria-label="title"
  >
    <div class="mb-4 flex items-center justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Examples
        </p>
        <p class="mt-1 text-base font-semibold text-white md:text-lg">
          {{ title }}
        </p>
      </div>
      <div v-if="count > 1" class="flex shrink-0 items-center gap-2">
        <span class="text-xs text-slate-500"
          >{{ index + 1 }} / {{ count }}</span
        >
        <button
          type="button"
          class="rounded-md border border-slate-700 p-1.5 text-slate-300 hover:border-cyan-500/50 hover:text-white"
          aria-label="Previous example"
          @click="go(-1)"
        >
          <ChevronLeftIcon class="h-4 w-4" />
        </button>
        <button
          type="button"
          class="rounded-md border border-slate-700 p-1.5 text-slate-300 hover:border-cyan-500/50 hover:text-white"
          aria-label="Next example"
          @click="go(1)"
        >
          <ChevronRightIcon class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div
      v-if="count > 1"
      class="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1"
      role="tablist"
    >
      <button
        v-for="(example, i) in examples"
        :key="example.title"
        type="button"
        role="tab"
        :aria-selected="i === index"
        :class="[
          'shrink-0 rounded-full border px-3 py-1 text-xs transition-colors',
          i === index
            ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-200'
            : 'border-slate-700 text-slate-400 hover:text-slate-200',
        ]"
        @click="index = i"
      >
        {{ example.business }}
      </button>
    </div>

    <div
      v-if="current"
      role="tabpanel"
      class="text-sm leading-relaxed text-slate-300 md:text-base"
    >
      <p v-if="count === 1" class="text-xs text-slate-500">
        {{ current.business }}
      </p>
      <p class="mb-3 font-semibold text-white">{{ current.title }}</p>
      <p
        v-for="paragraph in current.body"
        :key="paragraph.text"
        class="mt-3 first-of-type:mt-0"
      >
        {{ paragraph.text
        }}<ArticleCite v-if="paragraph.cite" :n="paragraph.cite" />
      </p>
      <ul v-if="current.list" class="mt-3 list-disc space-y-1 pl-5">
        <li v-for="item in current.list" :key="item">{{ item }}</li>
      </ul>
      <component :is="figure" v-for="(figure, i) in current.figures" :key="i" />
    </div>
  </section>
</template>
