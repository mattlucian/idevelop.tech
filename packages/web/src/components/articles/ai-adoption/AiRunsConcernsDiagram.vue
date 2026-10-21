<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";

const concerns = [
  {
    label: "Results can vary",
    detail: "Similar orders may be handled differently",
  },
  {
    label: "Token cost on every order",
    detail: "Costs rise with order volume",
  },
  {
    label: "Order data sent to the AI model",
    detail: "Customer details leave the business's systems",
  },
];
</script>

<template>
  <ArticleFigure
    title="Concerns with AI handling every order"
    subtitle="Example: the same online order"
  >
    <ul class="grid gap-2 sm:grid-cols-3">
      <li
        v-for="concern in concerns"
        :key="concern.label"
        class="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2"
      >
        <span
          class="flex items-center gap-1.5 text-xs font-semibold text-amber-200"
        >
          <ExclamationTriangleIcon class="h-3.5 w-3.5 shrink-0" />
          {{ concern.label }}
        </span>
        <span class="mt-0.5 block text-xs text-amber-100/70">
          {{ concern.detail }}
        </span>
      </li>
    </ul>
  </ArticleFigure>
</template>
