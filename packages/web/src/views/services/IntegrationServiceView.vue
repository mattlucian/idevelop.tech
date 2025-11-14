<script setup lang="ts">
import { ref } from "vue";
import { useBreadcrumbNavigation } from "@/composables/useBreadcrumbNavigation";
import { useServiceMeta } from "@/composables/useServiceMeta";
import BreadcrumbNav from "../../components/ui/BreadcrumbNav.vue";
import ServiceSection from "../../components/ui/ServiceSection.vue";
import TabNavigation from "../../components/ui/TabNavigation.vue";
import IntegrationDiagram from "../../components/integration/IntegrationDiagram.vue";
import DetailedEntityMapping from "../../components/integration/DetailedEntityMapping.vue";
import TwoColumnListSection from "../../components/ui/TwoColumnListSection.vue";
import CTASection from "../../components/ui/CTASection.vue";
import CTAForm from "../../components/ui/CTAForm.vue";
import { integrationServiceData } from "@/data/services/integration";

// SEO Meta Tags
useServiceMeta({
  serviceName: "System Integration Services",
  slug: "integration",
  description:
    "Expert system integration services connecting Shopify, NetSuite, 3PLs, and more. Custom API integrations, data mapping, and automation for seamless business operations. 100+ integrations delivered.",
  ogDescription:
    "Connect your business systems seamlessly. Expert integration services for Shopify, NetSuite, 3PLs, and custom APIs. Field-level data mapping and real-time synchronization.",
});

const { handleBreadcrumbNavigate } = useBreadcrumbNavigation();
const activeTab = ref("accounting");

// Destructure typed data
const {
  breadcrumbs,
  hero,
  tabs,
  integrationDiagrams,
  benefits,
  expertiseBadge,
  whatIOffer,
  howItWorks,
  portfolio: portfolioData,
  cta,
} = integrationServiceData;
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
      <CTAForm
        service-name="Integration"
        form-title="Request Information"
        variant="dark"
      />
    </ServiceSection>

    <!-- Integration Examples with Tabs -->
    <div class="max-w-5xl mx-auto px-6 py-6">
      <!-- Tab Navigation -->
      <TabNavigation v-model="activeTab" :tabs="tabs" />

      <!-- Tab Content -->
      <div
        class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <!-- Accounting Integration Tab -->
        <div v-if="activeTab === 'accounting'">
          <IntegrationDiagram
            :left-system="integrationDiagrams.accounting.leftSystem"
            :right-system="integrationDiagrams.accounting.rightSystem"
            :mappings="integrationDiagrams.accounting.mappings"
            :caption="integrationDiagrams.accounting.caption"
            :mapping-color-scheme="
              integrationDiagrams.accounting.mappingColorScheme
            "
          />
        </div>

        <!-- Fulfillment Integration Tab -->
        <div v-if="activeTab === 'fulfillment'">
          <IntegrationDiagram
            :left-system="integrationDiagrams.fulfillment.leftSystem"
            :right-system="integrationDiagrams.fulfillment.rightSystem"
            :mappings="integrationDiagrams.fulfillment.mappings"
            :caption="integrationDiagrams.fulfillment.caption"
            :mapping-color-scheme="
              integrationDiagrams.fulfillment.mappingColorScheme
            "
          />
        </div>

        <!-- Marketplace Integration Tab -->
        <div v-if="activeTab === 'marketplace'">
          <IntegrationDiagram
            :left-system="integrationDiagrams.marketplace.leftSystem"
            :right-system="integrationDiagrams.marketplace.rightSystem"
            :mappings="integrationDiagrams.marketplace.mappings"
            :caption="integrationDiagrams.marketplace.caption"
            :mapping-color-scheme="
              integrationDiagrams.marketplace.mappingColorScheme
            "
          />
        </div>
      </div>
    </div>

    <!-- Key Benefits Section -->
    <ServiceSection
      variant="benefits"
      title=""
      :benefits="benefits"
      :expertise-badge="expertiseBadge"
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
        color: 'purple',
        type: 'number',
      }"
    />

    <!-- Detailed Entity Mapping Example -->
    <DetailedEntityMapping />

    <!-- Portfolio Section -->
    <ServiceSection
      variant="portfolio"
      :title="portfolioData.title"
      :items="portfolioData.items"
      :testimonial="portfolioData.testimonial"
      color-scheme="cyan"
    />

    <!-- CTA Section -->
    <CTASection
      :title="cta.title"
      :subtitle="cta.subtitle"
      :button-text="cta.buttonText"
    />
  </div>
</template>
