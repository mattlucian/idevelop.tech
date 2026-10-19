<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleBranchFlow from "../../article/ArticleBranchFlow.vue";
</script>

<template>
  <ArticleFigure
    title="The chatbot answers from approved content and hands off the rest"
    ai-legend
  >
    <ArticleBranchFlow
      :steps="[
        { text: 'Customer asks a question' },
        {
          text: 'Agent looks for the answer in help content',
          ai: true,
          note: 'Approved content only',
        },
      ]"
      :outcomes="[
        { when: 'Answer found', then: 'Agent replies' },
        {
          when: 'Unsure, or customer asks for a person',
          then: 'Hands off to the support team',
          tone: 'person',
        },
      ]"
      loop="Handed-off questions show where the help content needs work"
    />
  </ArticleFigure>
</template>
