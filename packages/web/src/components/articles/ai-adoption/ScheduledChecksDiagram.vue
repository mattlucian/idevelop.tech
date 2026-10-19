<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleBranchFlow from "../../article/ArticleBranchFlow.vue";
</script>

<template>
  <ArticleFigure
    title="Routine orders run on their own; exceptions go to a person"
    ai-legend
  >
    <ArticleBranchFlow
      :steps="[
        { text: 'Scheduled check runs' },
        {
          text: 'AI applies team rules',
          ai: true,
          note: 'Such as late shipments',
        },
      ]"
      :outcomes="[
        { when: 'On track', then: 'Continue automatically' },
        { when: 'Exception', then: 'Team reviews and acts', tone: 'person' },
      ]"
      loop="Team updates the rules from what it sees"
    />
  </ArticleFigure>
</template>
