<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="A correction made once reaches the next AI-drafted answer"
    ai-legend
  >
    <ArticleFlow
      :steps="[
        { eyebrow: 'Developer', text: 'Corrects the documentation' },
        { text: 'Shared documentation is updated' },
        {
          eyebrow: 'Support team',
          text: 'AI drafts an answer from the updated docs',
          ai: true,
        },
        { text: 'Support reviews and sends the answer' },
      ]"
    />
  </ArticleFigure>
</template>
