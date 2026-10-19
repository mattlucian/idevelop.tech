<script setup lang="ts">
import { LockClosedIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="AI helps build the screening script, and applicant records stay in-house"
    ai-legend
  >
    <div class="space-y-6">
      <ArticleFlow
        label="Building it with made-up records"
        :steps="[
          { text: 'Team writes down the study criteria' },
          { text: 'AI helps write the screening script', ai: true },
          { text: 'Team tests it with made-up applicants' },
        ]"
      />
      <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
        <p
          class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400"
        >
          <LockClosedIcon class="h-3.5 w-3.5" />
          Each time it runs, on the lab's own systems
        </p>
        <ArticleFlow
          :steps="[
            { text: 'New application' },
            { text: 'Script compares fields with study criteria' },
            { text: 'Possible studies and reasons' },
            { text: 'Coordinator reviews' },
          ]"
        />
      </div>
    </div>
  </ArticleFigure>
</template>
