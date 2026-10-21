<script setup lang="ts">
import { usePageMeta } from "@/composables/usePageMeta";
import FeaturedArticleCard from "../components/cards/FeaturedArticleCard.vue";
import { getVisibleArticles } from "@/data/articles";

usePageMeta({
  title: "Articles",
  slug: "articles",
  description:
    "Articles on technology in small businesses, drawn from work with owners and operators.",
  ogDescription:
    "Articles on technology in small businesses, drawn from work with owners and operators.",
});

const articles = getVisibleArticles();
</script>

<template>
  <main id="main-content" class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">Articles</h1>
        <p class="text-lg text-gray-400">
          Articles on technology in small businesses, drawn from work with
          owners and operators.
        </p>
      </div>

      <div class="space-y-6">
        <FeaturedArticleCard
          v-for="article in articles"
          :key="article.slug"
          byline
          :article="article"
        />
      </div>
    </div>
  </main>
</template>
