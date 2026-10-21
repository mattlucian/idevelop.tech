<script setup lang="ts">
import FeaturedArticleCard from "../cards/FeaturedArticleCard.vue";
import { getVisibleArticles } from "@/data/articles";

interface Props {
  limit?: number;
  /** Heading level, so the block fits the page's outline */
  headingTag?: "h2" | "h3";
}

const props = withDefaults(defineProps<Props>(), {
  limit: 2,
  headingTag: "h3",
});

const articles = getVisibleArticles().slice(0, props.limit);
</script>

<template>
  <div v-if="articles.length">
    <div class="mb-4 flex items-baseline justify-between gap-4">
      <component :is="headingTag" class="text-xl font-semibold text-white">
        Recent Articles
      </component>
      <router-link
        to="/articles"
        class="text-sm text-cyan-400 hover:text-cyan-300"
      >
        All articles
      </router-link>
    </div>
    <div class="space-y-4">
      <FeaturedArticleCard
        v-for="article in articles"
        :key="article.slug"
        byline
        :article="article"
      />
    </div>
  </div>
</template>
