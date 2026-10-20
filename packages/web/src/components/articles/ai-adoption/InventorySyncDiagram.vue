<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleCycle from "../../article/ArticleCycle.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const build = [
  {
    actor: "person" as const,
    who: "Technical employee",
    text: "Describes the goal and the three systems involved",
  },
  {
    actor: "ai" as const,
    text: "Reads each platform's documentation and drafts the integration",
  },
  {
    actor: "ai" as const,
    text: "Flags details the documentation leaves open",
    quote:
      "The marketplace lists each mug color separately. Map them to one item?",
  },
  {
    actor: "person" as const,
    who: "Owner",
    text: "Decides how products should match",
    quote: "Each color is its own item",
  },
  {
    actor: "ai" as const,
    text: "Updates the integration and writes tests for bundles and variants",
  },
  {
    actor: "person" as const,
    who: "Technical employee",
    text: "Runs a test sync and schedules it",
  },
];

const channels = ["Online store", "Marketplace"];
</script>

<template>
  <ArticleFigure
    title="AI helps build one integration that keeps both sales channels in step"
    subtitle="Example: the last blue mug sells"
    ai-legend
  >
    <div class="space-y-6">
      <ArticleCycle label="Building it · once" :steps="build" />
      <div class="border-t border-slate-800 pt-5">
        <p
          class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Every scheduled sync · no AI model involved
        </p>
        <div
          class="flex flex-col items-stretch gap-2 md:flex-row md:items-center"
        >
          <ArticleScenarioBox
            label="Inventory system"
            class="flex-1 md:basis-0"
          >
            <span class="text-xs">
              Last blue mug sold:
              <span class="text-slate-500 line-through">1</span>
              <span class="mx-1 text-slate-500">→</span>
              <span class="text-emerald-300">0</span>
            </span>
          </ArticleScenarioBox>
          <FlowArrow size="sm" />
          <ArticleScenarioBox label="Integration" class="flex-1 md:basis-0">
            <span class="text-xs">Reads the new count</span>
          </ArticleScenarioBox>
          <FlowArrow size="sm" />
          <div class="flex flex-1 flex-col gap-2 md:basis-0">
            <ArticleScenarioBox
              v-for="channel in channels"
              :key="channel"
              :label="channel"
            >
              <span class="text-xs">Blue mug shows as sold out</span>
            </ArticleScenarioBox>
          </div>
        </div>
      </div>
    </div>
  </ArticleFigure>
</template>
