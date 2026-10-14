<script setup lang="ts">
import {
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

const sources = [
  { icon: BuildingStorefrontIcon, name: "Warehouse", qty: 40 },
  { icon: DocumentTextIcon, name: "Supplier feed", qty: 120 },
];

const safetyBuffer = 5;
const total = sources.reduce((sum, source) => sum + source.qty, 0);
const available = total - safetyBuffer;

const channels = [
  { name: "Online store", qty: available, note: "" },
  { name: "Amazon", qty: available - 5, note: "Channel buffer −5" },
  { name: "eBay", qty: available, note: "" },
];
import FlowArrow from "../elements/FlowArrow.vue";
import CalloutStrip from "../elements/CalloutStrip.vue";
</script>

<template>
  <ContentSection
    id="inventory"
    eyebrow="Example: Inventory"
    title="Inventory Kept in Sync Across Your Channels"
    subtitle="Stock from warehouses and suppliers is combined and sent to each channel, with rules like safety buffers adjusting what each one shows."
  >
    <div
      class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-4"
      role="img"
      :aria-label="`Example: warehouse 40 plus supplier feed 120, minus a safety buffer of ${safetyBuffer}, gives ${available} available, pushed to the online store, Amazon with a channel buffer, and eBay.`"
    >
      <!-- Sources -->
      <div class="space-y-2">
        <div
          v-for="source in sources"
          :key="source.name"
          class="flex items-center justify-between rounded-lg border border-slate-700/50 bg-[#0f0f0f] px-4 py-3"
        >
          <span class="flex items-center gap-2 text-sm text-slate-300">
            <component :is="source.icon" class="h-4 w-4 text-slate-400" />
            {{ source.name }}
          </span>
          <span class="font-mono text-white">{{ source.qty }}</span>
        </div>
      </div>

      <FlowArrow size="lg" />

      <!-- Calculation -->
      <div
        class="rounded-xl border border-cyan-500/40 bg-cyan-500/10 p-4 font-mono text-sm"
      >
        <div class="flex justify-between text-slate-300">
          <span>On hand</span><span>{{ total }}</span>
        </div>
        <div class="flex justify-between text-slate-400">
          <span>Safety buffer</span><span>−{{ safetyBuffer }}</span>
        </div>
        <div
          class="mt-2 flex justify-between border-t border-cyan-500/30 pt-2 font-semibold text-white"
        >
          <span>Available</span><span>{{ available }}</span>
        </div>
      </div>

      <FlowArrow size="lg" />

      <!-- Channels -->
      <div class="space-y-2">
        <div
          v-for="channel in channels"
          :key="channel.name"
          class="rounded-lg border border-slate-700/50 bg-[#0f0f0f] px-4 py-2"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-300">{{ channel.name }}</span>
            <span class="font-mono text-white">{{ channel.qty }}</span>
          </div>
          <div v-if="channel.note" class="text-xs text-slate-500">
            {{ channel.note }}
          </div>
        </div>
      </div>
    </div>

    <CalloutStrip :icon="ArrowPathIcon" icon-class="text-emerald-400">
      Updated on a schedule, so a sale on one channel lowers the count on the
      others.
    </CalloutStrip>
  </ContentSection>
</template>
