<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";

const rawFeed = `SKU,DESC,CLR,WT,IMG
AB-220,"TRAVEL MUG 20OZ BLK",BLK,2.5LB,
AB-221,"TRAVEL MUG 20OZ WHT",WHT,2.5LB,ab221.jpg`;

const fields = [
  { label: "Title", value: "Travel Mug, 20 oz" },
  { label: "Variants", value: "Black, White" },
  { label: "Weight", value: "2.5 lb" },
  { label: "Category", value: "Kitchen › Drinkware" },
];

const checks = [
  { ok: true, text: "Title cleaned up" },
  { ok: true, text: "Colors grouped as variants" },
  { ok: false, text: "Black is missing an image: held from marketplaces" },
];
import FlowArrow from "../elements/FlowArrow.vue";
</script>

<template>
  <ContentSection
    id="product-data"
    banded
    eyebrow="Example: Product data"
    title="Enriching Product Data"
    subtitle="Product data from suppliers, warehouse systems, and spreadsheets arrives in different formats. It's cleaned, enriched, and checked before it reaches your store."
  >
    <div
      class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-6"
    >
      <!-- Raw feed -->
      <div>
        <div
          class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Source file
        </div>
        <pre
          class="overflow-x-auto rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-4 text-xs text-slate-400 font-mono"
        ><code>{{ rawFeed }}</code></pre>
      </div>

      <FlowArrow size="lg" />

      <!-- Clean listing -->
      <div>
        <div
          class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Your listing
        </div>
        <div class="rounded-xl border border-cyan-500/30 bg-[#0f0f0f] p-4">
          <dl class="space-y-1.5 text-sm">
            <div
              v-for="field in fields"
              :key="field.label"
              class="flex justify-between gap-4"
            >
              <dt class="text-slate-500">{{ field.label }}</dt>
              <dd class="text-right text-white">{{ field.value }}</dd>
            </div>
          </dl>
          <ul class="mt-4 space-y-1.5 border-t border-slate-800 pt-3 text-xs">
            <li
              v-for="check in checks"
              :key="check.text"
              class="flex items-start gap-2 text-slate-300"
            >
              <CheckCircleIcon
                v-if="check.ok"
                class="h-4 w-4 shrink-0 text-emerald-400"
              />
              <ExclamationTriangleIcon
                v-else
                class="h-4 w-4 shrink-0 text-amber-400"
              />
              {{ check.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ContentSection>
</template>
