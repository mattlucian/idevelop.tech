<script setup lang="ts">
import { ArrowDownIcon } from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";

interface ScenarioLine {
  text: string;
  ai?: boolean;
}

const roles: {
  name: string;
  does: string;
  scenario: ScenarioLine[];
  checks: string;
  improves: string;
}[] = [
  {
    name: "Assistant",
    does: "Drafts work for a person to finish",
    scenario: [
      { text: "Person asks a question or requests a draft" },
      { text: "AI drafts or answers", ai: true },
      { text: "Person reviews and uses the result" },
    ],
    checks: "A person reads every result",
    improves: "Refinements update centralized knowledge",
  },
  {
    name: "Builder",
    does: "Helps build tools that run without AI",
    scenario: [
      { text: "Person defines a process's rules" },
      { text: "AI helps build the automation", ai: true },
      { text: "Automation runs without AI" },
    ],
    checks: "A person tests the build once",
    improves: "Manual edits adjust the codified rules",
  },
  {
    name: "Teammate",
    does: "Interprets and recommends",
    scenario: [
      { text: "New item arrives in a process" },
      { text: "AI interprets and recommends", ai: true },
      { text: "Person decides and acts" },
    ],
    checks: "People use, adjust, or set it aside",
    improves: "Feedback refines what AI looks for",
  },
  {
    name: "Operator",
    does: "Interprets and acts on its own",
    scenario: [
      { text: "New item arrives in a process" },
      { text: "AI decides and acts within limits", ai: true },
      { text: "Exceptions go to a person" },
    ],
    checks: "People check exceptions and samples",
    improves: "Exceptions shape the next rules",
  },
];
</script>

<template>
  <ArticleFigure
    title="Each role trusts AI with more, and changes how people check and improve it"
    ai-legend
  >
    <ol class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(role, i) in roles"
        :key="role.name"
        class="flex flex-col rounded-lg border border-slate-700 bg-slate-800/30 p-4"
      >
        <span class="text-xs text-slate-500">Role {{ i + 1 }}</span>
        <span class="mt-1 font-semibold text-white">{{ role.name }}</span>
        <span class="mt-1 text-sm text-slate-300">{{ role.does }}</span>
        <div class="mt-3 flex flex-1 flex-col gap-1">
          <template v-for="(line, j) in role.scenario" :key="line.text">
            <ArrowDownIcon
              v-if="j > 0"
              class="mx-auto h-3 w-3 text-slate-600"
              aria-hidden="true"
            />
            <span
              :class="[
                'rounded-md border px-2 py-1.5 text-center text-xs',
                line.ai
                  ? 'border-purple-500/50 bg-purple-500/15 text-purple-100'
                  : 'border-slate-700 bg-slate-800/40 text-slate-300',
              ]"
            >
              {{ line.text }}
            </span>
          </template>
        </div>
        <dl class="mt-4 space-y-3 border-t border-slate-800 pt-3 text-xs">
          <div>
            <dt class="uppercase tracking-wider text-slate-500">Checked by</dt>
            <dd class="mt-0.5 text-slate-300">{{ role.checks }}</dd>
          </div>
          <div>
            <dt class="uppercase tracking-wider text-slate-500">
              Improves through
            </dt>
            <dd class="mt-0.5 text-slate-300">{{ role.improves }}</dd>
          </div>
        </dl>
      </li>
    </ol>
  </ArticleFigure>
</template>
