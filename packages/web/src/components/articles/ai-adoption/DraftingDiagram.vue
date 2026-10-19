<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="AI turns rough notes into a first draft that staff finish"
    ai-legend
  >
    <ArticleFlow
      :steps="[
        { text: 'Staff jot down the key points' },
        { text: 'AI drafts the document', ai: true },
        { text: 'Staff edit and finish it' },
      ]"
      loop="Edits that apply every time go into the shared instructions"
    />
  </ArticleFigure>
</template>
