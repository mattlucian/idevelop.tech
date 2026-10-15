<script setup lang="ts">
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  CalculatorIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

const results = [
  "A sale at the register lowers the stock shown online",
  "Products and prices are managed in one place",
  "Daily sales post to the books without re-typing receipts",
];
import FlowArrow from "../elements/FlowArrow.vue";
</script>

<template>
  <ContentSection
    id="pos"
    eyebrow="Example: In-store and accounting"
    title="In-Store POS Connected to Your Online Store and Accounting"
    subtitle="For businesses selling online and in person, the POS, online store, and accounting system can share the same products, stock, and sales."
  >
    <div
      class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-4"
    >
      <!-- POS -->
      <div class="rounded-xl border border-emerald-500/30 bg-[#0f0f0f] p-4">
        <BuildingStorefrontIcon class="h-5 w-5 text-emerald-400" />
        <div class="mt-2 font-semibold text-white">In-store POS</div>
        <div class="text-xs text-slate-500">Register sales and returns</div>
      </div>

      <!-- POS <-> store -->
      <div
        class="flex flex-col items-center gap-1 text-center text-xs text-slate-400"
      >
        <ArrowsRightLeftIcon
          class="h-5 w-5 text-slate-500 md:rotate-0 rotate-90"
          aria-hidden="true"
        />
        <span>Stock, products, prices</span>
      </div>

      <!-- Online store -->
      <div class="rounded-xl border border-cyan-500/30 bg-[#0f0f0f] p-4">
        <ShoppingBagIcon class="h-5 w-5 text-cyan-400" />
        <div class="mt-2 font-semibold text-white">Online store</div>
        <div class="text-xs text-slate-500">Web orders and listings</div>
      </div>

      <!-- Both -> accounting -->
      <div
        class="flex flex-col items-center gap-1 text-center text-xs text-slate-400"
      >
        <FlowArrow size="md" />
        <span>Daily sales, taxes, fees</span>
      </div>

      <!-- Accounting -->
      <div class="rounded-xl border border-purple-500/30 bg-[#0f0f0f] p-4">
        <CalculatorIcon class="h-5 w-5 text-purple-400" />
        <div class="mt-2 font-semibold text-white">Accounting</div>
        <div class="text-xs text-slate-500">QuickBooks, Xero</div>
      </div>
    </div>

    <ul class="mt-8 grid gap-3 md:grid-cols-3">
      <li
        v-for="result in results"
        :key="result"
        class="flex items-start gap-2 rounded-lg border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-300"
      >
        <CheckCircleIcon class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        {{ result }}
      </li>
    </ul>
  </ContentSection>
</template>
