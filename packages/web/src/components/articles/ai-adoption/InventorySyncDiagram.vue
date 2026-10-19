<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const channels = ["Online store", "Marketplace"];
</script>

<template>
  <ArticleFigure
    title="One integration keeps both sales channels in step with inventory"
    caption="Built with AI's help. Each scheduled sync runs without calling an AI model."
  >
    <div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <div
        class="flex min-h-14 flex-1 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-center text-sm text-slate-200 md:basis-0"
      >
        Inventory system
      </div>
      <FlowArrow size="sm" />
      <div
        class="flex min-h-14 flex-1 flex-col items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-center text-sm text-cyan-100 md:basis-0"
      >
        Integration
        <span class="text-xs text-cyan-300/70">Runs on a schedule</span>
      </div>
      <FlowArrow size="sm" />
      <div class="flex flex-1 flex-col gap-2 md:basis-0">
        <div
          v-for="channel in channels"
          :key="channel"
          class="rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-center text-sm text-slate-200"
        >
          <span class="block text-xs text-slate-500">Stock updated</span>
          {{ channel }}
        </div>
      </div>
    </div>
  </ArticleFigure>
</template>
