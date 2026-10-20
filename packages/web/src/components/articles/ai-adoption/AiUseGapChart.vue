<script setup lang="ts">
import ArticleFigure from "../../article/ArticleFigure.vue";

// US Chamber of Commerce, Empowering Small Business 2026: 66% use AI
const sayTheyUse = 66;
// Census BTOS, used AI in a business function in the last two weeks, period
// ending Oct 4, 2026: lowest and highest size class under 250 employees
// (5 to 9 employees 21.5%, 100 to 249 employees 36.4%)
const usedLow = 22;
const usedHigh = 36;
</script>

<template>
  <ArticleFigure
    title="Far more small businesses say they use AI than use it in their operations"
    subtitle="Share of US small businesses"
    caption="US Chamber of Commerce, Empowering Small Business 2026 · US Census Bureau, Business Trends and Outlook Survey, two weeks ending Oct 4, 2026, businesses with fewer than 250 employees · separate surveys"
  >
    <div
      class="space-y-6"
      role="img"
      :aria-label="`${sayTheyUse}% say they use AI; ${usedLow}% to ${usedHigh}% used AI in a business function in the last two weeks, depending on size`"
    >
      <div>
        <div class="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
          <span class="text-slate-300">Say they use AI</span>
          <span class="font-semibold text-slate-200">{{ sayTheyUse }}%</span>
        </div>
        <div class="h-4 rounded-r-md bg-slate-800/40">
          <div
            class="h-full rounded-r-md bg-slate-500"
            :style="{ width: `${sayTheyUse}%` }"
          />
        </div>
      </div>
      <div>
        <div class="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
          <span class="text-slate-300">
            Used AI in a business function in the last two weeks
          </span>
          <span class="shrink-0 font-semibold text-slate-200">
            {{ usedLow }}–{{ usedHigh }}%
          </span>
        </div>
        <div class="relative h-4 bg-slate-800/40">
          <div
            class="absolute inset-y-0 left-0 bg-cyan-400/80"
            :style="{ width: `${usedLow}%` }"
          />
          <div
            class="absolute inset-y-0 bg-cyan-400/35"
            :style="{
              left: `${usedLow}%`,
              width: `${usedHigh - usedLow}%`,
            }"
          />
          <div
            class="absolute inset-y-0 rounded-r-md border border-dashed border-amber-400/60"
            :style="{
              left: `${usedHigh}%`,
              width: `${sayTheyUse - usedHigh}%`,
            }"
          />
        </div>
        <div
          class="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400"
        >
          <span class="flex items-center gap-2">
            <span class="h-2.5 w-4 bg-cyan-400/35" />
            Range by business size
          </span>
          <span class="flex items-center gap-2">
            <span class="h-2.5 w-4 border border-dashed border-amber-400/60" />
            Gap between saying and using
          </span>
        </div>
      </div>
    </div>
  </ArticleFigure>
</template>
