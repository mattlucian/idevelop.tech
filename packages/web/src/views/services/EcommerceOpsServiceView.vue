<script setup lang="ts">
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/vue/24/outline";
import { useServiceMeta } from "@/composables/useServiceMeta";
import { withIcons } from "@/utils/iconMapping";
import ServicePageLayout from "../../components/layout/ServicePageLayout.vue";
import ContentSection from "../../components/ui/ContentSection.vue";
import OutlineIcon from "../../components/elements/OutlineIcon.vue";
import Pill from "../../components/elements/badges/Pill.vue";
import EcommerceStartHere from "../../components/ecommerce/EcommerceStartHere.vue";
import OrderRoutingDemo from "../../components/ecommerce/OrderRoutingDemo.vue";
import InventoryMath from "../../components/ecommerce/InventoryMath.vue";
import FeedCleanup from "../../components/ecommerce/FeedCleanup.vue";
import PosAccountingSync from "../../components/ecommerce/PosAccountingSync.vue";
import { ecommerceOpsServiceData } from "@/data/services/ecommerce-ops";

// SEO Meta Tags
useServiceMeta({
  serviceName: "eCommerce Operations: Streamline Through Technology",
  slug: "ecommerce-ops",
  description:
    "Streamline eCommerce operations through technology on Shopify, BigCommerce, QuickBooks, Flxpoint, and more. Order routing, inventory sync, product data, POS and accounting sync with QuickBooks or Xero, platform migrations, app setup, and planning, starting from your priorities.",
  ogDescription:
    "Streamline eCommerce operations through technology, online and in store, starting from your priorities.",
});

const { platforms } = ecommerceOpsServiceData;
const challengeCards = withIcons(ecommerceOpsServiceData.challenges);
</script>

<template>
  <ServicePageLayout
    :page="ecommerceOpsServiceData"
    service-name="eCommerce Operations"
  >
    <!-- Start from priorities -->
    <EcommerceStartHere />

    <!-- Common challenges -->
    <ContentSection
      title="Common eCommerce Challenges"
      subtitle="Most clients come in with one or two of these. Some have examples further down."
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="challenge in challengeCards"
          :key="challenge.title"
          class="flex flex-col rounded-xl border border-slate-800 bg-[#0f0f0f] p-5"
        >
          <OutlineIcon
            v-if="challenge.iconComponent"
            :icon="challenge.iconComponent"
            size="md"
            color="cyan"
          />
          <h3 class="mt-3 font-semibold text-white">{{ challenge.title }}</h3>
          <p class="mt-1 flex-1 text-sm text-slate-400">{{ challenge.desc }}</p>
          <a
            v-if="challenge.example"
            :href="`#${challenge.example}`"
            class="mt-3 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
          >
            See an example
            <ArrowDownIcon class="h-3 w-3" />
          </a>
        </div>
      </div>
    </ContentSection>

    <!-- Examples -->
    <OrderRoutingDemo />
    <InventoryMath />
    <FeedCleanup />
    <PosAccountingSync />

    <!-- Platforms -->
    <ContentSection
      banded
      title="Platforms I Work With"
      subtitle="The systems I work in most, along with others that come up in client setups."
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <component
          :is="platform.path ? 'router-link' : 'div'"
          v-for="platform in platforms.featured"
          :key="platform.name"
          :to="platform.path"
          :class="[
            'flex flex-col rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5',
            platform.path ? 'transition-colors hover:border-cyan-500/40' : '',
          ]"
        >
          <span class="text-xl font-bold text-white">{{ platform.name }}</span>
          <span class="mt-1 text-sm text-slate-400">{{ platform.desc }}</span>
          <span
            v-if="platform.path"
            class="mt-3 inline-flex items-center gap-1 text-xs text-cyan-400"
          >
            Flxpoint consulting <ArrowRightIcon class="h-3 w-3" />
          </span>
        </component>
      </div>

      <dl class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="group in platforms.groups" :key="group.label">
          <dt
            class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            {{ group.label }}
          </dt>
          <dd class="flex flex-wrap gap-1.5">
            <Pill v-for="name in group.names" :key="name">{{ name }}</Pill>
          </dd>
        </div>
      </dl>
    </ContentSection>
  </ServicePageLayout>
</template>
