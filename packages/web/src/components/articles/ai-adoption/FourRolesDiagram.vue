<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";

const roles = [
  {
    name: "Assistant",
    does: "Drafts work for a person to finish",
    checks: "A person reads every result",
    improves: "Refinements update shared instructions",
  },
  {
    name: "Builder",
    does: "Helps build tools that run without AI",
    checks: "A person tests the build once",
    improves: "Manual edits adjust the codified rules",
  },
  {
    name: "Teammate",
    does: "Interprets and recommends",
    checks: "People use, adjust, or set it aside",
    improves: "Feedback refines what AI looks for",
  },
  {
    name: "Operator",
    does: "Interprets and acts on its own",
    checks: "People check exceptions and samples",
    improves: "Exceptions shape the next rules",
  },
];
</script>

<template>
  <ArticleFigure
    title="Each role trusts AI with more, and changes how people check and improve it"
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
