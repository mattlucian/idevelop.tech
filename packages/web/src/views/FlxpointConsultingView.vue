<script setup lang="ts">
import { ArrowRightIcon, CheckBadgeIcon } from "@heroicons/vue/24/outline";
import { usePageMeta } from "@/composables/usePageMeta";
import { withIcons } from "@/utils/iconMapping";
import ServicePageLayout from "../components/layout/ServicePageLayout.vue";
import ContentSection from "../components/ui/ContentSection.vue";
import OutlineIcon from "../components/elements/OutlineIcon.vue";
import Pill from "../components/elements/badges/Pill.vue";
import FlxpointValue from "../components/flxpoint/FlxpointValue.vue";
import FlxpointStages from "../components/flxpoint/FlxpointStages.vue";
import { flxpointConsultingData } from "@/data/services/flxpoint-consulting";
import { SITE } from "@/constants";

// SEO Meta Tags
usePageMeta({
  title: "Flxpoint Consulting: Help From Its Former CTO",
  slug: "flxpoint-consulting",
  description:
    "Flxpoint consulting from the platform's former CTO. Help with onboarding, sources and vendor files, catalog setup, listings and pricing, order routing, fulfillment, and custom integrations on the Flxpoint API.",
  ogDescription:
    "Flxpoint consulting from the platform's former CTO. Onboarding, configuration, order routing, and integrations.",
  ogImage: SITE.ogImage,
});

const { expertiseBadge, stages, experience } = flxpointConsultingData;
const startingCards = withIcons(flxpointConsultingData.startingPoints);
const serviceCards = withIcons(flxpointConsultingData.services);
</script>

<template>
  <ServicePageLayout
    :page="flxpointConsultingData"
    service-name="Flxpoint Consulting"
    form-title="Request Consultation"
  >
    <template #badge>
      <div
        class="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-4 py-3"
      >
        <CheckBadgeIcon class="w-5 h-5 text-cyan-400 shrink-0" />
        <div>
          <div class="text-sm font-semibold text-cyan-400">
            {{ expertiseBadge.title }}
          </div>
          <div class="text-xs text-slate-400">
            {{ expertiseBadge.description }}
          </div>
        </div>
      </div>
    </template>

    <!-- Starting points -->
    <ContentSection
      banded
      title="Where Clients Start"
      subtitle="Help is available whether you're new to Flxpoint, already live, or building on it."
    >
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="card in startingCards"
          :key="card.title"
          class="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0f0f0f] p-4"
        >
          <OutlineIcon
            v-if="card.iconComponent"
            :icon="card.iconComponent"
            size="md"
            color="cyan"
          />
          <div>
            <h3 class="font-semibold text-white">{{ card.title }}</h3>
            <p class="text-sm text-slate-400">{{ card.desc }}</p>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <Pill v-for="project in card.projects" :key="project">
                {{ project }}
              </Pill>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>

    <!-- Value -->
    <FlxpointValue />

    <!-- Platform stages -->
    <FlxpointStages :stages="stages" />

    <!-- Services for Flxpoint customers -->
    <ContentSection
      title="Services for Flxpoint Customers"
      subtitle="Other services, and how they apply to a business running on Flxpoint."
    >
      <div class="grid gap-4 md:grid-cols-2">
        <router-link
          v-for="service in serviceCards"
          :key="service.path"
          :to="service.path"
          class="group flex items-start gap-4 rounded-xl border border-slate-700/50 bg-[#0f0f0f] p-5 transition-colors hover:border-cyan-500/40"
        >
          <OutlineIcon
            v-if="service.iconComponent"
            :icon="service.iconComponent"
            size="lg"
            color="cyan"
          />
          <span class="flex-1">
            <span class="block font-semibold text-white">{{
              service.title
            }}</span>
            <span class="mt-1 block text-sm text-slate-400">{{
              service.desc
            }}</span>
          </span>
          <ArrowRightIcon
            class="mt-1 h-5 w-5 shrink-0 text-slate-600 transition-colors group-hover:text-cyan-400"
          />
        </router-link>
      </div>
    </ContentSection>

    <!-- Experience -->
    <ContentSection
      banded
      title="Platform Experience"
      subtitle="Background from building and running Flxpoint, not just using it."
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="item in experience"
          :key="item.value"
          class="rounded-xl border border-cyan-500/30 bg-linear-to-br from-slate-900/40 to-slate-800/40 p-5"
        >
          <div class="text-2xl font-bold text-white">{{ item.value }}</div>
          <div
            class="mt-1 text-xs font-semibold uppercase tracking-wider text-cyan-400"
          >
            {{ item.label }}
          </div>
          <p class="mt-3 text-sm text-slate-400">{{ item.desc }}</p>
        </div>
      </div>
    </ContentSection>
  </ServicePageLayout>
</template>
