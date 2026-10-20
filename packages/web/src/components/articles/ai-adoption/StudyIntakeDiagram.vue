<script setup lang="ts">
import {
  ArrowPathIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

type Result = "ok" | "missing" | "unclear";

const resultIcon = {
  ok: { icon: CheckIcon, class: "text-emerald-300" },
  missing: { icon: XMarkIcon, class: "text-rose-300" },
  unclear: { icon: QuestionMarkCircleIcon, class: "text-amber-300" },
};

const checklist = ["Age range", "Required diagnoses", "Excluded medications"];

const withChecklist = (results: Result[]) =>
  checklist.map((item, i) => ({ item, result: results[i] ?? "unclear" }));

const submissions: {
  study: string;
  checks: { item: string; result: Result }[];
  outcome: string;
  tone: "neutral" | "person";
}[] = [
  {
    study: "Study A",
    checks: withChecklist(["ok", "ok", "ok"]),
    outcome: "Moves to the intake queue",
    tone: "neutral",
  },
  {
    study: "Study B",
    checks: withChecklist(["missing", "ok", "ok"]),
    outcome: "Agent returns it: “Please add the eligible age range”",
    tone: "neutral",
  },
  {
    study: "Study C",
    checks: withChecklist(["ok", "unclear", "ok"]),
    outcome: "Two criteria conflict, so it goes to staff",
    tone: "person",
  },
];
</script>

<template>
  <ArticleFigure
    title="Complete study requests move forward; incomplete ones go back with questions"
    subtitle="Example: three new study requests"
    ai-legend
  >
    <div class="space-y-3 md:space-y-2">
      <div
        v-for="submission in submissions"
        :key="submission.study"
        class="flex flex-col items-stretch gap-2 rounded-lg border border-slate-800 p-2 md:flex-row md:items-center md:border-0 md:p-0"
      >
        <ArticleScenarioBox class="flex-[0.6] md:basis-0">
          <span class="block text-center">{{ submission.study }}</span>
        </ArticleScenarioBox>
        <FlowArrow size="sm" />
        <ArticleScenarioBox
          tone="ai"
          label="Agent checks"
          class="flex-1 md:basis-0"
        >
          <ul class="space-y-0.5">
            <li
              v-for="check in submission.checks"
              :key="check.item"
              class="flex items-center gap-1.5 text-xs"
            >
              <component
                :is="resultIcon[check.result].icon"
                :class="[
                  'h-3.5 w-3.5 shrink-0',
                  resultIcon[check.result].class,
                ]"
              />
              {{ check.item }}
            </li>
          </ul>
        </ArticleScenarioBox>
        <FlowArrow size="sm" />
        <ArticleScenarioBox :tone="submission.tone" class="flex-1 md:basis-0">
          <span class="text-xs">{{ submission.outcome }}</span>
        </ArticleScenarioBox>
      </div>
    </div>
    <p
      class="mt-3 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      Staff review a sample of decisions and refine the checklist
    </p>
  </ArticleFigure>
</template>
