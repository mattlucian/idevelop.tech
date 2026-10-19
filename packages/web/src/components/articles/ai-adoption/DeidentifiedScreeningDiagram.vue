<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="The AI step reads medical facts without the applicant's identity"
    ai-legend
  >
    <ArticleFlow
      :steps="[
        { text: 'New application arrives' },
        {
          text: 'In-house script removes identifying details',
          note: 'Built with AI, runs without it',
        },
        {
          text: 'AI step compares medical facts with study criteria',
          ai: true,
        },
        { text: 'Coordinator reviews the recommendations' },
      ]"
      loop="Coordinator corrections refine the AI step's instructions"
    />
  </ArticleFigure>
</template>
