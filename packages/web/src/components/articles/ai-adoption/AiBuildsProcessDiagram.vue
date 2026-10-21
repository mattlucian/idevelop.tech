<script setup lang="ts">
import { LockClosedIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
</script>

<template>
  <ArticleFigure
    title="Using AI to build a standard automation"
    subtitle="Example: the same online order"
    ai-legend
  >
    <div class="space-y-4">
      <ArticleFlow
        label="Once, before launch · built with test orders"
        :steps="[
          { text: 'AI helps build the automation', ai: true },
          { text: 'People test it and deploy it' },
        ]"
      />
      <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
        <p
          class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400"
        >
          <LockClosedIcon class="h-3.5 w-3.5" />
          Every order after that, on the business's own systems
        </p>
        <ArticleFlow
          :steps="[
            { text: 'Order: 2 candles, gift wrap, rush shipping' },
            {
              text: 'Automation applies the fulfillment rules',
              note: 'Same steps every time · no AI model involved',
            },
            { text: 'Order is handled' },
          ]"
        />
        <p class="mt-3 text-center text-xs text-slate-400">
          Orders that fall outside the rules are flagged for staff
        </p>
      </div>
    </div>
  </ArticleFigure>
</template>
