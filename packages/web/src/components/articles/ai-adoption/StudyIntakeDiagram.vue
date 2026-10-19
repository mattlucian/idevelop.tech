<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleBranchFlow from "../../article/ArticleBranchFlow.vue";
</script>

<template>
  <ArticleFigure
    title="Complete study requests move forward; incomplete ones go back with questions"
    ai-legend
  >
    <ArticleBranchFlow
      :steps="[
        { text: 'Study request submitted' },
        {
          text: 'Agent checks it against the lab\'s checklist',
          ai: true,
          note: 'No candidate records involved',
        },
      ]"
      :outcomes="[
        { when: 'Complete', then: 'Moves to the intake queue' },
        {
          when: 'Missing details',
          then: 'Returned with a list of what\'s needed',
        },
        {
          when: 'Can\'t decide',
          then: 'Goes to staff',
          tone: 'person',
        },
      ]"
      loop="Staff review a sample of decisions and refine the checklist"
    />
  </ArticleFigure>
</template>
