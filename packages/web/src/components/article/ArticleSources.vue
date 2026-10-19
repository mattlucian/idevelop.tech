<script setup lang="ts">
import type { ArticleSource } from "@/types/article";

interface Props {
  sources: ArticleSource[];
  note?: string;
}

withDefaults(defineProps<Props>(), { note: "" });
</script>

<template>
  <section
    class="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-a:text-cyan-400 mt-16"
    aria-labelledby="article-sources"
    data-toc-root
  >
    <h2 id="article-sources">Sources</h2>
    <p v-if="note" class="text-sm">{{ note }}</p>
    <ol class="text-sm">
      <li
        v-for="(source, i) in sources"
        :id="`source-${i + 1}`"
        :key="source.text"
        class="scroll-mt-24"
      >
        {{ source.text }} (<template
          v-for="(link, j) in source.links"
          :key="link.href"
          ><template v-if="j > 0">, </template
          ><a :href="link.href" target="_blank" rel="noopener noreferrer">{{
            link.label
          }}</a></template
        >)
      </li>
    </ol>
  </section>
</template>
