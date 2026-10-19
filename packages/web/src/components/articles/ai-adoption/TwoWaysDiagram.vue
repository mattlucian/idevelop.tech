<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="The two concerns come from AI running the process"
    ai-legend
  >
    <div class="space-y-8">
      <div>
        <ArticleFlow
          label="AI agent runs the process"
          :steps="[
            { text: 'New order comes in' },
            { text: 'AI agent decides what to do', ai: true },
            { text: 'Order is handled' },
          ]"
        />
        <ul class="mt-3 flex flex-wrap gap-2 text-xs">
          <li
            v-for="risk in ['Results can vary', 'Token cost on every run']"
            :key="risk"
            class="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-amber-200"
          >
            <ExclamationTriangleIcon class="h-3.5 w-3.5" />
            {{ risk }}
          </li>
        </ul>
      </div>

      <div class="space-y-4 border-t border-slate-800 pt-6">
        <ArticleFlow
          label="AI builds the process · once, before launch"
          :steps="[
            { text: 'AI helps build the automation', ai: true },
            { text: 'People test and deploy it' },
          ]"
        />
        <ArticleFlow
          label="Every order after that"
          :steps="[
            { text: 'New order comes in' },
            { text: 'Standard automation runs' },
            { text: 'Order is handled' },
          ]"
        />
        <ul class="flex flex-wrap gap-2 text-xs">
          <li
            v-for="benefit in [
              'Same steps every time',
              'No token cost per run',
            ]"
            :key="benefit"
            class="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-200"
          >
            <CheckCircleIcon class="h-3.5 w-3.5" />
            {{ benefit }}
          </li>
        </ul>
      </div>
    </div>
  </ArticleFigure>
</template>
