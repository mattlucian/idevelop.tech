<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const requests = [
  { channel: "Text message", text: "Water under my sink again" },
  { channel: "Online form", text: "Water dripping from the kitchen ceiling" },
];

const suggestions = [
  { label: "Repair type", value: "Plumbing" },
  { label: "Urgency", value: "High" },
  { label: "Possibly related", value: "Request from the unit above" },
  { label: "Draft reply", value: "Ready for review" },
];
</script>

<template>
  <ArticleFigure
    title="The AI step suggests, and the coordinator decides"
    ai-legend
  >
    <div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      <div class="flex flex-1 flex-col gap-2 md:basis-0">
        <div
          v-for="request in requests"
          :key="request.channel"
          class="rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-sm text-slate-200"
        >
          <span class="block text-xs text-slate-500">{{
            request.channel
          }}</span>
          "{{ request.text }}"
        </div>
      </div>
      <FlowArrow size="sm" />
      <div
        class="flex-1 rounded-lg border border-purple-500/50 bg-purple-500/15 p-3 text-sm md:basis-0"
      >
        <p
          class="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-300"
        >
          AI step suggests
        </p>
        <dl class="space-y-1.5">
          <div
            v-for="item in suggestions"
            :key="item.label"
            class="flex justify-between gap-3"
          >
            <dt class="text-xs text-purple-300/70">{{ item.label }}</dt>
            <dd class="text-right text-xs text-purple-100">{{ item.value }}</dd>
          </div>
        </dl>
      </div>
      <FlowArrow size="sm" />
      <div
        class="flex min-h-14 flex-1 flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2 text-center text-sm text-slate-200 md:basis-0"
      >
        Coordinator assigns the work
        <span class="text-xs text-slate-500">and approves the reply</span>
      </div>
    </div>
  </ArticleFigure>
</template>
