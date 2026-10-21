<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleCycle from "../../article/ArticleCycle.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const build = [
  {
    actor: "person" as const,
    who: "Store owner",
    text: "Describes how orders are built today",
    quote: "Order enough for six weeks, more before holidays",
  },
  {
    actor: "ai" as const,
    text: "Drafts the automation from those rules",
  },
  {
    actor: "ai" as const,
    text: "Asks about cases the rules don't cover",
    quote: "What should happen when an item is backordered?",
  },
  {
    actor: "person" as const,
    who: "Store owner",
    text: "Defines the missing rules",
    quote: "Skip it and reorder when the supplier restocks",
  },
  {
    actor: "ai" as const,
    text: "Updates the automation and runs it on past weeks",
  },
  {
    actor: "person" as const,
    who: "Store owner",
    text: "Compares its orders with what staff actually ordered",
  },
];

const inputs = [
  { label: "Sold, last 4 weeks", value: "48" },
  { label: "On hand", value: "6" },
  { label: "Supplier lead time", value: "10 days" },
];

const order = [
  { label: "Candles", value: "40" },
  { label: "Special order", value: "1 blue vase" },
  { label: "Mugs", value: "Skipped, backordered" },
];
</script>

<template>
  <ArticleFigure
    title="AI builds a weekly purchase order automation"
    subtitle="Example: a store's weekly purchase order"
    ai-legend
  >
    <div class="space-y-6">
      <ArticleCycle
        label="Building it · person and AI together"
        :steps="build"
        loop="Repeat steps 3 to 6 until the orders match how staff would order"
      />
      <div class="border-t border-slate-800 pt-5">
        <p
          class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Every week · no AI model involved
        </p>
        <div
          class="flex flex-col items-stretch gap-2 md:flex-row md:items-center"
        >
          <ArticleScenarioBox
            label="Sales and stock data"
            :fields="inputs"
            class="flex-1 md:basis-0"
          />
          <FlowArrow size="sm" />
          <ArticleScenarioBox
            label="Automation's draft order"
            :fields="order"
            class="flex-1 md:basis-0"
          />
          <FlowArrow size="sm" />
          <ArticleScenarioBox
            tone="person"
            label="Staff adjust"
            class="flex-1 md:basis-0"
          >
            <span class="text-xs">
              Raise candles to 60 for a holiday weekend, then send. Overrides
              like this go back into the rules.
            </span>
          </ArticleScenarioBox>
        </div>
      </div>
    </div>
  </ArticleFigure>
</template>
