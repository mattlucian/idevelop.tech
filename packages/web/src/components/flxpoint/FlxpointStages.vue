<script setup lang="ts">
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";
import type { FlxpointStage } from "@/types/service";
import { getIconByName } from "@/utils/iconMapping";
import ContentSection from "../ui/ContentSection.vue";

interface Props {
  stages: FlxpointStage[];
}

const props = defineProps<Props>();

const stageCards = props.stages.map((stage, index) => ({
  ...stage,
  number: index + 1,
  iconComponent: getIconByName(stage.icon),
}));

// Example data for each stage's mini visual
const feeds = [
  { name: "Supplier A", via: "API", ok: true, note: "Updated 6:00" },
  { name: "Warehouse", via: "SFTP file", ok: true, note: "Updated 6:05" },
  {
    name: "Supplier B",
    via: "CSV email",
    ok: false,
    note: "0 stock on 2,140 items, update held",
  },
];

const productSources = [
  { name: "Supplier A", qty: 40, cost: "6.10" },
  { name: "Supplier B", qty: 120, cost: "5.80" },
];

const channelPrices = [
  { channel: "Shopify", price: "13.99" },
  { channel: "Amazon", price: "15.49" },
  { channel: "eBay", price: "14.49" },
];

const fulfillment = [
  { time: "9:02", text: "Sent to Supplier B" },
  { time: "9:40", text: "Acknowledged" },
  { time: "2:15", text: "Shipped, tracking added" },
  { time: "2:20", text: "Tracking sent to Shopify" },
];
</script>

<template>
  <ContentSection
    banded
    title="How Data Moves Through Flxpoint"
    subtitle="The main stages of a Flxpoint setup, the issues that come up at each, and the help I provide."
  >
    <!-- Overview strip -->
    <nav
      aria-label="Flxpoint stages"
      class="mb-10 flex flex-wrap items-center justify-center gap-1.5 text-xs"
    >
      <template v-for="stage in stageCards" :key="stage.id">
        <ArrowRightIcon
          v-if="stage.number > 1 && stage.id !== 'integrations'"
          class="h-3 w-3 text-slate-600"
          aria-hidden="true"
        />
        <a
          :href="`#${stage.id}`"
          :class="[
            'flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors',
            stage.id === 'integrations'
              ? 'ml-2 border-dashed border-purple-500/40 text-purple-200 hover:border-purple-400'
              : 'border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white',
          ]"
        >
          <span class="font-semibold text-cyan-400">{{ stage.number }}</span>
          {{ stage.label }}
        </a>
      </template>
    </nav>

    <!-- Stage cards -->
    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="stage in stageCards"
        :id="stage.id"
        :key="stage.id"
        class="flex scroll-mt-24 flex-col rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5"
      >
        <!-- Header -->
        <div class="flex items-center gap-3">
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 text-sm font-semibold text-cyan-300"
          >
            {{ stage.number }}
          </span>
          <component
            :is="stage.iconComponent"
            v-if="stage.iconComponent"
            class="h-5 w-5 text-slate-400"
          />
          <h3 class="text-lg font-semibold text-white">{{ stage.label }}</h3>
        </div>
        <p class="mt-2 text-sm text-slate-400">{{ stage.summary }}</p>

        <!-- Mini visual -->
        <div
          class="mt-4 rounded-lg border border-slate-800 bg-[#0a0a0a] p-3 text-xs"
          aria-hidden="true"
        >
          <!-- Sources -->
          <ul v-if="stage.id === 'sources'" class="space-y-1.5">
            <li
              v-for="feed in feeds"
              :key="feed.name"
              class="flex items-start gap-2"
            >
              <CheckCircleIcon
                v-if="feed.ok"
                class="h-4 w-4 shrink-0 text-emerald-400"
              />
              <ExclamationTriangleIcon
                v-else
                class="h-4 w-4 shrink-0 text-amber-400"
              />
              <span class="w-20 shrink-0 text-white">{{ feed.name }}</span>
              <span class="w-16 shrink-0 text-slate-500">{{ feed.via }}</span>
              <span :class="feed.ok ? 'text-slate-400' : 'text-amber-200'">{{
                feed.note
              }}</span>
            </li>
          </ul>

          <!-- Catalog -->
          <div v-else-if="stage.id === 'catalog'">
            <div class="mb-2 text-white">Travel Mug, 20 oz</div>
            <div
              v-for="source in productSources"
              :key="source.name"
              class="flex justify-between font-mono text-slate-400"
            >
              <span>{{ source.name }}</span>
              <span>{{ source.qty }} @ ${{ source.cost }}</span>
            </div>
            <div
              class="mt-2 flex justify-between border-t border-slate-800 pt-2 font-mono text-cyan-300"
            >
              <span>Available · cost</span>
              <span>160 @ $5.80</span>
            </div>
          </div>

          <!-- Listings -->
          <div v-else-if="stage.id === 'listings'">
            <div class="mb-2 font-mono text-purple-300">
              price = cost × 2.4, min margin 25%
            </div>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div
                v-for="row in channelPrices"
                :key="row.channel"
                class="rounded border border-slate-800 py-1.5"
              >
                <div class="text-slate-500">{{ row.channel }}</div>
                <div class="font-mono text-white">${{ row.price }}</div>
              </div>
            </div>
          </div>

          <!-- Orders -->
          <div
            v-else-if="stage.id === 'orders'"
            class="flex flex-wrap items-center gap-1.5"
          >
            <span class="rounded border border-slate-700 px-2 py-0.5 text-white"
              >Order #1042</span
            >
            <ArrowRightIcon class="h-3 w-3 text-slate-600" />
            <span
              class="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-emerald-200"
              >Supplier B: in stock, lowest cost</span
            >
            <span class="w-full text-slate-500"
              >Backup if out of stock: Supplier A</span
            >
          </div>

          <!-- Fulfillment -->
          <ol v-else-if="stage.id === 'fulfillment'" class="space-y-1">
            <li v-for="step in fulfillment" :key="step.time" class="flex gap-3">
              <span class="w-10 shrink-0 font-mono text-slate-500">{{
                step.time
              }}</span>
              <span class="text-slate-300">{{ step.text }}</span>
            </li>
          </ol>

          <!-- API -->
          <div
            v-else-if="stage.id === 'integrations'"
            class="flex flex-wrap items-center gap-1.5 font-mono"
          >
            <span
              class="rounded border border-purple-500/40 bg-purple-500/10 px-2 py-0.5 text-purple-200"
              >webhook: order shipped</span
            >
            <ArrowRightIcon class="h-3 w-3 text-slate-600" />
            <span class="rounded border border-slate-700 px-2 py-0.5 text-white"
              >your connector</span
            >
            <ArrowRightIcon class="h-3 w-3 text-slate-600" />
            <span class="rounded border border-slate-700 px-2 py-0.5 text-white"
              >accounting updated</span
            >
          </div>
        </div>

        <!-- Issue and help -->
        <div class="mt-4 space-y-2 text-sm">
          <div class="flex items-start gap-2 text-slate-300">
            <ExclamationTriangleIcon
              class="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
            />
            {{ stage.issue }}
          </div>
          <div class="flex items-start gap-2 text-slate-200">
            <WrenchScrewdriverIcon
              class="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
            />
            {{ stage.help }}
          </div>
        </div>

        <!-- Projects -->
        <div class="mt-auto flex flex-wrap gap-1.5 pt-4">
          <span
            v-for="project in stage.projects"
            :key="project"
            class="rounded-full border border-slate-700 bg-slate-900/60 px-2.5 py-0.5 text-xs text-slate-400"
          >
            {{ project }}
          </span>
        </div>
      </article>
    </div>
  </ContentSection>
</template>
