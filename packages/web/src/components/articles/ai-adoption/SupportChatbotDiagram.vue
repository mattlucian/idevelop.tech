<script setup lang="ts">
import {
  ArrowPathIcon,
  BookOpenIcon,
  CodeBracketIcon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const messages = [
  { from: "customer", text: "How often does my data sync?" },
  {
    from: "agent",
    text: "Your data syncs every 15 minutes.",
    note: "From the documentation the developer just corrected",
    icon: BookOpenIcon,
  },
  { from: "customer", text: "I was charged twice this month." },
  {
    from: "agent",
    text: "I'll connect you with our support team.",
    note: "Billing isn't in the approved help content, so it hands off",
    icon: UserGroupIcon,
    handoff: true,
  },
];
</script>

<template>
  <ArticleFigure
    title="A chatbot that answers from approved content"
    subtitle="Example: a documentation fix, then two questions in one chat"
    ai-legend
  >
    <div class="mx-auto max-w-xl space-y-2">
      <ArticleScenarioBox
        label="Developer corrects the documentation"
        :icon="CodeBracketIcon"
      >
        <span class="block text-xs">
          Data syncs every
          <span class="text-slate-500 line-through">hour</span>
          <span class="ml-1 text-emerald-300">15 minutes</span>
        </span>
      </ArticleScenarioBox>
      <FlowArrow size="sm" vertical />
      <div
        v-for="message in messages"
        :key="message.text"
        :class="[
          'flex flex-col',
          message.from === 'customer' ? 'items-end' : 'items-start',
        ]"
      >
        <span
          :class="[
            'max-w-[85%] rounded-2xl border px-3 py-2 text-sm',
            message.from === 'customer'
              ? 'rounded-br-sm border-slate-700 bg-slate-800/60 text-slate-200'
              : 'rounded-bl-sm border-purple-500/50 bg-purple-500/15 text-purple-100',
          ]"
        >
          {{ message.text }}
        </span>
        <span
          v-if="message.note"
          :class="[
            'mt-1 flex items-center gap-1.5 text-xs',
            message.handoff ? 'text-amber-300' : 'text-slate-500',
          ]"
        >
          <component :is="message.icon" class="h-3.5 w-3.5 shrink-0" />
          {{ message.note }}
        </span>
      </div>
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox tone="person" label="Support agent" :icon="UserIcon">
        <span class="text-xs">
          Picks up with the chatbot's summary, so the customer doesn't repeat
          the problem
        </span>
      </ArticleScenarioBox>
    </div>
    <p
      class="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400"
    >
      <ArrowPathIcon class="h-4 w-4 shrink-0 text-slate-500" />
      Handed-off questions show where the help content needs work
    </p>
  </ArticleFigure>
</template>
