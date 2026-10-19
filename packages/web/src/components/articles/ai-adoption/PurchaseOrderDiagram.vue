<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="AI helps build and improve the automation, and stays out of the daily run"
    caption="No AI runs in the daily lane. It does the same steps every time."
    ai-legend
  >
    <div class="space-y-6">
      <ArticleFlow
        label="Building it"
        :steps="[
          { text: 'Person describes the job' },
          { text: 'AI helps write the automation', ai: true },
          { text: 'Person tests it with real orders' },
        ]"
      />
      <ArticleFlow
        label="Each time it runs"
        :steps="[
          { text: 'Sales, stock, and supplier data' },
          { text: 'Automation builds the order' },
          { text: 'Staff adjust when needed', optional: true },
          { text: 'Order sent to supplier' },
        ]"
      />
      <ArticleFlow
        label="Improving it"
        :steps="[
          { text: 'Staff corrections and new sales data' },
          { text: 'AI helps update the rules', ai: true },
          { text: 'Person tests the change' },
          { text: 'Updated version goes live' },
        ]"
      />
    </div>
  </ArticleFigure>
</template>
