<script setup lang="ts">
import { ref } from "vue";
import {
  ClipboardDocumentCheckIcon,
  AdjustmentsHorizontalIcon,
  ScaleIcon,
  BoltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import ContentSection from "../ui/ContentSection.vue";
import VisualFeatureCard from "../cards/VisualFeatureCard.vue";

const setupChecks = [
  { text: "Routing follows your fulfillment policy", ok: true },
  { text: "Backup source for out-of-stock items", ok: false },
  { text: "Quantity rules keep a safety buffer", ok: true },
  { text: "Tracking syncs back to each channel", ok: true },
];

type RoutingPriority = "cost" | "distance";

const routingOptions: Record<
  RoutingPriority,
  { label: string; cost: string; transit: string; sources: string }
> = {
  cost: {
    label: "Lowest cost",
    cost: "$5.80",
    transit: "4.2 days",
    sources: "Mostly Supplier B",
  },
  distance: {
    label: "Closest to customer",
    cost: "$6.10",
    transit: "2.1 days",
    sources: "Split across 3 sources",
  },
};
const routingOptionList = (
  Object.keys(routingOptions) as RoutingPriority[]
).map((key) => ({ value: key, label: routingOptions[key].label }));
const routing = ref<RoutingPriority>("cost");

const reconciliation = [
  { item: "Sales", flxpoint: "48,210", books: "48,210", ok: true },
  { item: "Supplier costs", flxpoint: "29,540", books: "28,910", ok: false },
  { item: "Shipping", flxpoint: "3,120", books: "3,120", ok: true },
];

const automations = [
  "Prices update when vendor costs change",
  "Stock rules set per source",
  "Invoices created from supplier costs",
  "Alerts for orders missing tracking",
];
import SegmentedToggle from "../elements/SegmentedToggle.vue";
</script>

<template>
  <ContentSection
    title="How I Help Flxpoint Customers"
    subtitle="The most common reasons customers reach out, and what they get from it."
  >
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Setup confidence -->
      <VisualFeatureCard
        :icon="ClipboardDocumentCheckIcon"
        title="A Setup That Matches How You Operate"
        description="Your workflows are written down, then checked against how Flxpoint and your connected systems are configured. You get a recommended setup and confirmation it's in place."
        color="cyan"
      >
        <div class="mb-2 uppercase tracking-wider text-slate-500">
          Configuration review
        </div>
        <ul class="space-y-1.5">
          <li
            v-for="check in setupChecks"
            :key="check.text"
            class="flex items-start gap-2"
          >
            <CheckCircleIcon
              v-if="check.ok"
              class="h-4 w-4 shrink-0 text-emerald-400"
            />
            <ExclamationTriangleIcon
              v-else
              class="h-4 w-4 shrink-0 text-amber-400"
            />
            <span :class="check.ok ? 'text-slate-300' : 'text-amber-200'">
              {{ check.text }}
              <span v-if="!check.ok" class="text-slate-500">· missing</span>
            </span>
          </li>
        </ul>
      </VisualFeatureCard>

      <!-- Understand the options -->
      <VisualFeatureCard
        :icon="AdjustmentsHorizontalIcon"
        title="Know What Each Setting Changes"
        description="The options available to you, explained in terms of how each one affects cost, delivery speed, and your team's workload."
        color="purple"
      >
        <div class="mb-2 uppercase tracking-wider text-slate-500">
          Routing priority
        </div>
        <SegmentedToggle
          v-model="routing"
          :options="routingOptionList"
          label="Routing priority example"
          color="purple"
          class="mb-3"
        />
        <dl class="grid grid-cols-3 gap-2 text-center">
          <div class="rounded border border-slate-800 py-1.5">
            <dt class="text-slate-500">Avg. cost</dt>
            <dd class="font-mono text-white">
              {{ routingOptions[routing].cost }}
            </dd>
          </div>
          <div class="rounded border border-slate-800 py-1.5">
            <dt class="text-slate-500">Avg. transit</dt>
            <dd class="font-mono text-white">
              {{ routingOptions[routing].transit }}
            </dd>
          </div>
          <div class="rounded border border-slate-800 px-1 py-1.5">
            <dt class="text-slate-500">Ships from</dt>
            <dd class="text-white">{{ routingOptions[routing].sources }}</dd>
          </div>
        </dl>
      </VisualFeatureCard>

      <!-- Systems that agree -->
      <VisualFeatureCard
        :icon="ScaleIcon"
        title="Systems That Reconcile"
        description="When accounting or another connected system doesn't match Flxpoint, find where the numbers diverge, such as costs or GL accounts, and align the integration."
        color="emerald"
      >
        <table class="w-full">
          <thead>
            <tr class="text-left text-slate-500">
              <th class="pb-1.5 font-normal">Month to date</th>
              <th class="pb-1.5 text-right font-normal">Flxpoint</th>
              <th class="pb-1.5 text-right font-normal">Accounting</th>
            </tr>
          </thead>
          <tbody class="font-mono">
            <tr v-for="row in reconciliation" :key="row.item">
              <td class="py-0.5 font-sans text-slate-300">{{ row.item }}</td>
              <td class="py-0.5 text-right text-slate-300">
                {{ row.flxpoint }}
              </td>
              <td
                :class="[
                  'py-0.5 text-right',
                  row.ok ? 'text-slate-300' : 'text-amber-300',
                ]"
              >
                {{ row.books }}
                <span v-if="!row.ok" class="sr-only">(does not match)</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="mt-2 flex items-start gap-2 border-t border-slate-800 pt-2 text-amber-200"
        >
          <ExclamationTriangleIcon class="h-4 w-4 shrink-0 text-amber-400" />
          $630 gap: invoices from 2 suppliers never posted
        </div>
      </VisualFeatureCard>

      <!-- Automation -->
      <VisualFeatureCard
        :icon="BoltIcon"
        title="Automations You Haven't Set Up Yet"
        description="Flxpoint has many features that setups often leave unused. The right ones can remove manual steps from pricing, stocking, and invoicing."
        color="cyan"
      >
        <div class="mb-2 uppercase tracking-wider text-slate-500">Examples</div>
        <ul class="space-y-1.5">
          <li
            v-for="automation in automations"
            :key="automation"
            class="flex items-start gap-2 text-slate-300"
          >
            <BoltIcon class="h-4 w-4 shrink-0 text-cyan-400" />
            {{ automation }}
          </li>
        </ul>
      </VisualFeatureCard>
    </div>
  </ContentSection>
</template>
