<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="AI interprets each new ticket, and people make the decisions"
    ai-legend
  >
    <ArticleFlow
      :steps="[
        { text: 'New ticket is created' },
        {
          text: 'AI compares it with earlier reports',
          ai: true,
          note: 'Inbox, past issues, backlog',
        },
        { text: 'AI adds likely matches and a summary', ai: true },
        { text: 'Person reviews and decides' },
      ]"
      loop="Notes on what was missing or noisy"
    />
  </ArticleFigure>
</template>
