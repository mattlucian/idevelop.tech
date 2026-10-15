<script setup lang="ts">
import { CheckBadgeIcon, ScaleIcon } from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

type Level = "low" | "medium" | "high";

const levelTones: Record<Level, PillTone> = {
  low: "emerald",
  medium: "amber",
  high: "red",
};

const levelLabels: Record<Level, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const options: {
  name: string;
  cost: string;
  effort: Level;
  risk: Level;
  recommended: boolean;
}[] = [
  {
    name: "Upgrade current plan",
    cost: "+$40/mo",
    effort: "low",
    risk: "low",
    recommended: true,
  },
  {
    name: "Switch to App B",
    cost: "−$20/mo",
    effort: "high",
    risk: "medium",
    recommended: false,
  },
  {
    name: "Switch to App C",
    cost: "+$90/mo",
    effort: "medium",
    risk: "low",
    recommended: false,
  },
];
import Pill from "../elements/badges/Pill.vue";
import type { PillTone } from "../elements/badges/Pill.vue";
</script>

<template>
  <ContentSection
    title="Analysis and Recommendations"
    subtitle="Each recommendation lays out the options, their costs, and the tradeoffs, so you can make an informed decision."
  >
    <div
      class="mx-auto max-w-3xl rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5 md:p-6"
    >
      <!-- Question -->
      <div class="flex items-start gap-3">
        <ScaleIcon class="mt-0.5 h-6 w-6 shrink-0 text-cyan-400" />
        <div>
          <div class="text-xs uppercase tracking-wider text-slate-500">
            Decision brief
          </div>
          <div class="text-lg font-semibold text-white">
            Should we switch shipping apps?
          </div>
          <div class="mt-1 text-sm text-slate-400">
            Order volume has doubled, and the current plan tops out next
            quarter.
          </div>
        </div>
      </div>

      <!-- Options -->
      <div class="mt-5 overflow-x-auto">
        <table class="w-full min-w-[28rem] text-sm">
          <thead>
            <tr
              class="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500"
            >
              <th class="py-2 pr-3 font-medium">Option</th>
              <th class="py-2 pr-3 font-medium">Cost</th>
              <th class="py-2 pr-3 font-medium">Effort</th>
              <th class="py-2 font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="option in options"
              :key="option.name"
              :class="[
                'border-b border-slate-800 last:border-b-0',
                option.recommended ? 'bg-cyan-500/5' : '',
              ]"
            >
              <td class="py-3 pr-3 text-white">
                <span class="flex items-center gap-2">
                  {{ option.name }}
                  <template v-if="option.recommended">
                    <CheckBadgeIcon class="h-4 w-4 text-cyan-400" />
                    <span class="sr-only">(recommended)</span>
                  </template>
                </span>
              </td>
              <td class="py-3 pr-3 font-mono text-slate-300">
                {{ option.cost }}
              </td>
              <td class="py-3 pr-3">
                <Pill :tone="levelTones[option.effort]">
                  {{ levelLabels[option.effort] }}
                </Pill>
              </td>
              <td class="py-3">
                <Pill :tone="levelTones[option.risk]">
                  {{ levelLabels[option.risk] }}
                </Pill>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Recommendation -->
      <div
        class="mt-5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm"
      >
        <span class="font-semibold text-cyan-200">Recommendation:</span>
        <span class="text-slate-200">
          Upgrade the current plan now. Revisit App C if you add a second
          warehouse, since its multi-location support is the main advantage.
        </span>
      </div>

      <div class="mt-4 text-center text-xs text-slate-500">
        You make the call. I lay out the options and tradeoffs.
      </div>
    </div>
  </ContentSection>
</template>
