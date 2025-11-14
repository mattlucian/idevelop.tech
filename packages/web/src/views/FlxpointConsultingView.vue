<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMeta } from "@/composables/useMeta";
import BreadcrumbNav from "../components/ui/BreadcrumbNav.vue";
import ServiceSection from "../components/ui/ServiceSection.vue";
import TabButton from "../components/ui/TabButton.vue";
import ServiceAreaCard from "../components/cards/ServiceAreaCard.vue";
import TwoColumnListSection from "../components/ui/TwoColumnListSection.vue";
import CTASection from "../components/ui/CTASection.vue";
import CTAForm from "../components/ui/CTAForm.vue";
import { flxpointConsultingData } from "@/data/services/flxpoint-consulting";
import { SITE } from "@/constants";

// SEO Meta Tags
useMeta({
  title: "Flxpoint Consulting - Former CTO | I Develop Tech",
  description:
    "Expert Flxpoint consulting from their former CTO. Technical assistance for onboarding, configuration, order routing, catalog management, and custom integrations.",
  ogTitle: "Flxpoint Consulting - Former CTO | I Develop Tech",
  ogDescription:
    "Technical assistance and consulting for Flxpoint from their former CTO. Catalog management, order routing, integrations, and strategic guidance.",
  ogUrl: `${SITE.url}/flxpoint-consulting`,
  ogImage: SITE.ogImage,
});

const router = useRouter();
const activeTab = ref("catalog");

// Destructure typed data
const {
  breadcrumbs,
  hero,
  tabs,
  serviceAreas,
  benefits,
  expertiseBadge,
  whatIOffer,
  howItWorks,
  cta,
} = flxpointConsultingData;

const goToHireMe = () => {
  router.push("/hire-me");
};

const handleBreadcrumbNavigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] pt-16">
    <!-- Breadcrumb -->
    <BreadcrumbNav :items="breadcrumbs" @navigate="handleBreadcrumbNavigate" />

    <!-- Hero Section -->
    <ServiceSection
      variant="hero"
      :title="hero.title"
      :subtitle="hero.subtitle"
      :color-scheme="hero.colorScheme"
    >
      <template #badge>
        <div
          class="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-4 py-3"
        >
          <svg
            class="w-5 h-5 text-cyan-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
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

      <CTAForm
        service-name="Flxpoint Consulting"
        form-title="Request Consultation"
        variant="dark"
      />
    </ServiceSection>

    <!-- Service Areas with Tabs -->
    <div class="max-w-5xl mx-auto px-6 py-12">
      <!-- Section Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
          How I Help
        </h2>
        <p class="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
          Technical assistance and consulting across key Flxpoint operational
          areas
        </p>
      </div>

      <!-- Tab Navigation -->
      <div
        class="flex flex-col md:flex-row gap-2 mb-6 md:border-b md:border-slate-700/30 md:justify-center"
      >
        <TabButton
          v-for="tab in tabs"
          :key="tab.id"
          :label="tab.label"
          :active="activeTab === tab.id"
          @click="activeTab = tab.id"
        />
      </div>

      <!-- Tab Content -->
      <div>
        <ServiceAreaCard
          v-for="area in serviceAreas"
          v-show="activeTab === area.id"
          :key="area.id"
          :icon="area.icon"
          :title="area.title"
          :description="area.description"
          :items="area.items"
          color-scheme="cyan"
        />
      </div>
    </div>

    <!-- Key Benefits Section -->
    <ServiceSection
      variant="benefits"
      title=""
      :benefits="benefits"
      color-scheme="cyan"
    />

    <!-- What I Offer / How It Works -->
    <TwoColumnListSection
      :left-column="{
        title: 'What I Offer',
        items: whatIOffer,
        color: 'cyan',
        type: 'check',
      }"
      :right-column="{
        title: 'How It Works',
        items: howItWorks,
        color: 'cyan',
        type: 'number',
      }"
      color-scheme="cyan"
    />

    <!-- Call to Action -->
    <CTASection
      :title="cta.title"
      :subtitle="cta.subtitle"
      :button-text="cta.buttonText"
      color-scheme="cyan"
      @click="goToHireMe"
    />
  </div>
</template>
