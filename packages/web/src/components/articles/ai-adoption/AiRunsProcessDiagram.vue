<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="How many people picture automating with AI"
    subtitle="Example: one online order"
    ai-legend
  >
    <ArticleFlow
      :steps="[
        { text: 'Order: 2 candles, gift wrap, rush shipping' },
        { text: 'AI decides how to fulfill it', ai: true },
        { text: 'Order is handled' },
      ]"
    />
  </ArticleFigure>
</template>
