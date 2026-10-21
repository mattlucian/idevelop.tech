<script setup lang="ts">
import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  CheckIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

const orderItems = ["Travel mug (2)", "Mug lid", "Gift box"];

const rules = [
  "In stock at a warehouse near the customer?",
  "Lowest shipping cost?",
  "Can a supplier ship it directly?",
];

const destinations = [
  {
    icon: BuildingStorefrontIcon,
    name: "Dallas warehouse",
    items: "Travel mug (2), Mug lid",
    border: "border-cyan-500/40",
    tone: "text-cyan-400",
  },
  {
    icon: TruckIcon,
    name: "Supplier dropship",
    items: "Gift box",
    border: "border-purple-500/40",
    tone: "text-purple-400",
  },
];
import FlowArrow from "../elements/FlowArrow.vue";
import CalloutStrip from "../elements/CalloutStrip.vue";
</script>

<template>
  <ContentSection
    id="orders"
    banded
    eyebrow="Example: Orders and fulfillment"
    title="Order Routing Configurations"
    subtitle="Routing rules decide where each item ships from, and orders can split across warehouses and suppliers."
  >
    <div
      class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-4"
    >
      <!-- Incoming order -->
      <div class="rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-4">
        <div class="flex items-center gap-2">
          <ShoppingBagIcon class="h-5 w-5 text-slate-300" />
          <span class="font-semibold text-white">Order #1042</span>
        </div>
        <div class="mt-1 text-xs text-slate-500">Online store · Austin, TX</div>
        <ul class="mt-3 space-y-1 text-sm text-slate-300">
          <li v-for="item in orderItems" :key="item">{{ item }}</li>
        </ul>
      </div>

      <FlowArrow size="lg" />

      <!-- Routing rules -->
      <div
        class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4"
      >
        <div
          class="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-300"
        >
          Your routing rules
        </div>
        <ul class="space-y-2 text-sm text-slate-200">
          <li v-for="rule in rules" :key="rule" class="flex items-start gap-2">
            <CheckIcon class="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {{ rule }}
          </li>
        </ul>
      </div>

      <FlowArrow size="lg" />

      <!-- Split result -->
      <div class="space-y-3">
        <div
          v-for="dest in destinations"
          :key="dest.name"
          :class="['rounded-xl border bg-[#0f0f0f] p-4', dest.border]"
        >
          <div class="flex items-center gap-2">
            <component :is="dest.icon" :class="['h-5 w-5', dest.tone]" />
            <span class="font-semibold text-white">{{ dest.name }}</span>
          </div>
          <div class="mt-1 text-sm text-slate-400">{{ dest.items }}</div>
        </div>
      </div>
    </div>

    <CalloutStrip :icon="EnvelopeIcon" icon-class="text-cyan-400">
      Tracking from each shipment flows back to the store and the customer.
    </CalloutStrip>
  </ContentSection>
</template>
