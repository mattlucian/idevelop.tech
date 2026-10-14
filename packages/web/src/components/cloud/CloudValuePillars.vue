<script setup lang="ts">
import {
  BanknotesIcon,
  ChartBarIcon,
  BoltIcon,
  ArrowRightIcon,
  ArrowDownIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import VisualFeatureCard from "../cards/VisualFeatureCard.vue";

const savings = [
  { from: "Dev database on 24/7", to: "Scheduled" },
  { from: "Servers sized for peak", to: "Right-sized" },
  { from: "Unattached volumes", to: "Removed" },
];

const months = [42, 44, 43, 71, 45, 46];
const maxMonth = Math.max(...months);

const performance = [
  { from: "Slow product pages", to: "Cached" },
  { from: "Timeouts at peak", to: "Autoscaling" },
  { from: "Long nightly import", to: "Parallel jobs" },
];
</script>

<template>
  <ContentSection
    banded
    title="What an AWS Review Focuses On"
    subtitle="A review of your AWS account focused on the three things that show up on your invoice and in your users' experience."
  >
    <div class="grid gap-6 md:grid-cols-3">
      <VisualFeatureCard
        :icon="BanknotesIcon"
        title="Lower costs"
        description="Find what you're paying for but don't need, and what costs more than it should."
        color="cyan"
      >
        <ul class="space-y-2">
          <li
            v-for="item in savings"
            :key="item.from"
            class="flex items-center justify-between gap-2"
          >
            <span class="text-slate-400">{{ item.from }}</span>
            <span class="flex items-center gap-1 text-cyan-300">
              <ArrowRightIcon class="h-3 w-3" />{{ item.to }}
            </span>
          </li>
        </ul>
        <template #footer>
          <a
            href="#costs"
            class="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
          >
            See an example <ArrowDownIcon class="h-3 w-3" />
          </a>
        </template>
      </VisualFeatureCard>

      <VisualFeatureCard
        :icon="ChartBarIcon"
        title="Predictable costs"
        description="Explain the spikes, then put controls in place so the bill stays close to plan."
        color="purple"
      >
        <div class="flex h-14 items-end gap-1.5" aria-hidden="true">
          <div
            v-for="(value, index) in months"
            :key="index"
            :class="[
              'flex-1 rounded-t',
              value > 60 ? 'bg-amber-400' : 'bg-purple-400',
            ]"
            :style="{ height: `${(value / maxMonth) * 100}%` }"
          />
        </div>
        <p class="mt-2 text-slate-500">One unexplained spike in six months</p>
        <template #footer>
          <a
            href="#predictable"
            class="inline-flex items-center gap-1 text-purple-300 hover:text-purple-200"
          >
            See an example <ArrowDownIcon class="h-3 w-3" />
          </a>
        </template>
      </VisualFeatureCard>

      <VisualFeatureCard
        :icon="BoltIcon"
        title="Better performance"
        description="Find where requests slow down or fail under load, and fix the cause."
        color="emerald"
      >
        <ul class="space-y-2">
          <li
            v-for="item in performance"
            :key="item.from"
            class="flex items-center justify-between gap-2"
          >
            <span class="text-slate-400">{{ item.from }}</span>
            <span class="flex items-center gap-1 text-emerald-300">
              <ArrowRightIcon class="h-3 w-3" />{{ item.to }}
            </span>
          </li>
        </ul>
        <template #footer>
          <a
            href="#performance"
            class="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
          >
            See an example <ArrowDownIcon class="h-3 w-3" />
          </a>
        </template>
      </VisualFeatureCard>
    </div>
  </ContentSection>
</template>
