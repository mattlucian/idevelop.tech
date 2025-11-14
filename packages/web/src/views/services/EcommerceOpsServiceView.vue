<script setup lang="ts">
import { ref } from "vue";
import { useBreadcrumbNavigation } from "@/composables/useBreadcrumbNavigation";
import { useServiceMeta } from "@/composables/useServiceMeta";
import BreadcrumbNav from "../../components/ui/BreadcrumbNav.vue";
import ServiceSection from "../../components/ui/ServiceSection.vue";
import TabNavigation from "../../components/ui/TabNavigation.vue";
import TwoColumnListSection from "../../components/ui/TwoColumnListSection.vue";
import CTASection from "../../components/ui/CTASection.vue";
import CTAForm from "../../components/ui/CTAForm.vue";
import IconFlowStep from "../../components/display/IconFlowStep.vue";
import { ecommerceOpsServiceData } from "@/data/services/ecommerce-ops";

// SEO Meta Tags
useServiceMeta({
  serviceName: "eCommerce Operations & Automation Services",
  slug: "ecommerce-ops",
  description:
    "Automate your eCommerce operations with expert order routing, inventory sync, and product data management. Connect Shopify, 3PLs, and marketplaces for multi-channel selling.",
  ogDescription:
    "Automated order routing, inventory sync, and product data management across your sales channels.",
});

const { handleBreadcrumbNavigate } = useBreadcrumbNavigation();
const activeTab = ref("order-routing");

// Destructure typed data
const {
  breadcrumbs,
  hero,
  tabs,
  benefits,
  expertiseBadge,
  whatIOffer,
  howItWorks,
  portfolio: portfolioData,
  cta,
  tabContent,
} = ecommerceOpsServiceData;
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
        service-name="eCommerce Operations"
        form-title="Request Information"
        variant="dark"
      />
    </ServiceSection>

    <!-- Visual/Interactive Section with Tabs -->
    <div class="max-w-5xl mx-auto px-6 py-6">
      <!-- Tab Navigation -->
      <TabNavigation v-model="activeTab" :tabs="tabs" />

      <!-- Tab Content -->
      <div
        class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <!-- Order Routing Tab -->
        <div v-if="activeTab === 'order-routing'">
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
            {{ tabContent["order-routing"].title }}
          </h3>
          <p class="text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
            {{ tabContent["order-routing"].description }}
          </p>

          <!-- Order Flow Visualization -->
          <div class="mb-8">
            <div
              class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6"
            >
              <template
                v-for="(step, index) in tabContent['order-routing'].visual
                  .steps"
                :key="index"
              >
                <IconFlowStep
                  :emoji="step.emoji"
                  :label="step.label"
                  :desc="step.desc"
                  color-scheme="cyan"
                  filter-style="grayscale"
                />
                <div
                  v-if="
                    index < tabContent['order-routing'].visual.steps.length - 1
                  "
                  class="hidden md:block text-cyan-400 text-2xl -mx-2"
                >
                  →
                </div>
              </template>
            </div>
          </div>

          <!-- Benefits List -->
          <div class="space-y-3">
            <div
              v-for="(benefit, index) in tabContent['order-routing'].benefits"
              :key="index"
              class="flex items-start gap-3"
            >
              <div class="text-cyan-400 mt-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p class="text-gray-300 text-sm md:text-base">
                {{ benefit }}
              </p>
            </div>
          </div>
        </div>

        <!-- Inventory Sync Tab -->
        <div v-if="activeTab === 'inventory-sync'">
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
            {{ tabContent["inventory-sync"].title }}
          </h3>
          <p class="text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
            {{ tabContent["inventory-sync"].description }}
          </p>

          <!-- Before/After Comparison -->
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h4 class="font-semibold text-red-400 mb-4 text-base md:text-lg">
                {{ tabContent["inventory-sync"].beforeAfter.before.title }}
              </h4>
              <ul class="space-y-2">
                <li
                  v-for="(item, index) in tabContent['inventory-sync']
                    .beforeAfter.before.items"
                  :key="index"
                  class="flex items-start gap-2 text-gray-300 text-sm md:text-base"
                >
                  <span class="text-red-400">✗</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div
              class="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6"
            >
              <h4
                class="font-semibold text-emerald-400 mb-4 text-base md:text-lg"
              >
                {{ tabContent["inventory-sync"].beforeAfter.after.title }}
              </h4>
              <ul class="space-y-2">
                <li
                  v-for="(item, index) in tabContent['inventory-sync']
                    .beforeAfter.after.items"
                  :key="index"
                  class="flex items-start gap-2 text-gray-300 text-sm md:text-base"
                >
                  <span class="text-emerald-400">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Benefits List -->
          <div class="space-y-3">
            <div
              v-for="(benefit, index) in tabContent['inventory-sync'].benefits"
              :key="index"
              class="flex items-start gap-3"
            >
              <div class="text-cyan-400 mt-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p class="text-gray-300 text-sm md:text-base">
                {{ benefit }}
              </p>
            </div>
          </div>
        </div>

        <!-- Product Data Tab -->
        <div v-if="activeTab === 'product-data'">
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
            {{ tabContent["product-data"].title }}
          </h3>
          <p class="text-gray-300 mb-8 text-base md:text-lg leading-relaxed">
            {{ tabContent["product-data"].description }}
          </p>

          <!-- Workflow Stages -->
          <div class="grid md:grid-cols-2 gap-4 mb-8">
            <div
              v-for="(stage, index) in tabContent['product-data'].workflow
                .stages"
              :key="index"
              class="bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-5"
            >
              <div class="flex items-center gap-2 mb-3">
                <div
                  class="bg-cyan-500/20 text-cyan-400 font-bold text-sm rounded-full w-7 h-7 flex items-center justify-center"
                >
                  {{ index + 1 }}
                </div>
                <h4 class="font-semibold text-white text-base md:text-lg">
                  {{ stage.stage }}
                </h4>
              </div>
              <ul class="space-y-1.5">
                <li
                  v-for="(item, itemIndex) in stage.items"
                  :key="itemIndex"
                  class="text-gray-300 text-xs md:text-sm flex items-start gap-2"
                >
                  <span class="text-cyan-400 mt-0.5">→</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Benefits List -->
          <div class="space-y-3">
            <div
              v-for="(benefit, index) in tabContent['product-data'].benefits"
              :key="index"
              class="flex items-start gap-3"
            >
              <div class="text-cyan-400 mt-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p class="text-gray-300 text-sm md:text-base">
                {{ benefit }}
              </p>
            </div>
          </div>
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
