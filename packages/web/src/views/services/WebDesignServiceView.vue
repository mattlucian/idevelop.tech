<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMeta } from "@/composables/useMeta";
import BreadcrumbNav from "../../components/ui/BreadcrumbNav.vue";
import ServiceSection from "../../components/ui/ServiceSection.vue";
import TabButton from "../../components/ui/TabButton.vue";
import TwoColumnListSection from "../../components/ui/TwoColumnListSection.vue";
import CTASection from "../../components/ui/CTASection.vue";
import CTAForm from "../../components/ui/CTAForm.vue";
import { webDesignServiceData } from "@/data/services/web-design";
import { SITE } from "@/constants";

// SEO Meta Tags
useMeta({
  title: "Web Design & Development Services | I Develop Tech",
  description:
    "Custom web design and development for Shopify, WordPress, and custom platforms. Conversion-focused design, SEO-preserving migrations, and mobile-responsive sites that represent your brand.",
  ogTitle: "Web Design & Development Services | I Develop Tech",
  ogDescription:
    "Professional web design and development. Custom Shopify stores, WordPress sites, and web applications. Migration services with zero SEO loss.",
  ogUrl: `${SITE.url}/services/web-design`,
  ogImage: `${SITE.url}/og-image-web-design.jpg`,
});

const router = useRouter();
const activeTab = ref("design");

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
  designProcess,
  platforms,
  migrationSteps,
} = webDesignServiceData;

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
      <CTAForm
        service-name="Web Design"
        form-title="Request Information"
        variant="dark"
      />
    </ServiceSection>

    <!-- Interactive Design Showcase with Tabs -->
    <div class="max-w-5xl mx-auto px-6 py-6">
      <!-- Tab Navigation -->
      <div
        class="flex flex-col md:flex-row gap-2 mb-6 md:border-b md:border-slate-700/30"
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
      <div
        class="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <!-- Design Process Tab -->
        <div v-if="activeTab === 'design'">
          <h3
            class="text-xl md:text-2xl font-semibold text-white mb-6 text-center"
          >
            From Discovery to Launch
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(step, index) in designProcess.steps"
              :key="index"
              class="bg-slate-800/50 rounded-lg p-6 border border-slate-700/30"
            >
              <div class="text-4xl mb-3">
                {{ step.icon }}
              </div>
              <h4 class="text-lg font-semibold text-cyan-400 mb-2">
                {{ step.title }}
              </h4>
              <p class="text-sm text-gray-400">
                {{ step.description }}
              </p>
            </div>
          </div>
          <p class="text-center text-gray-400 mt-8 text-sm">
            Transparent, structured process with regular updates and staging
            site access
          </p>
        </div>

        <!-- Platforms Tab -->
        <div v-if="activeTab === 'platforms'">
          <h3
            class="text-xl md:text-2xl font-semibold text-white mb-6 text-center"
          >
            Platform Expertise
          </h3>
          <div class="space-y-6">
            <div
              v-for="platform in platforms"
              :key="platform.name"
              class="bg-slate-800/50 rounded-lg p-6 border border-slate-700/30"
            >
              <h4 class="text-lg font-semibold text-cyan-400 mb-2">
                {{ platform.name }}
              </h4>
              <p class="text-sm text-gray-400 mb-4">
                {{ platform.description }}
              </p>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="feature in platform.features"
                  :key="feature"
                  class="flex items-center text-sm text-gray-300"
                >
                  <span class="text-emerald-400 mr-2">✓</span>
                  {{ feature }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Migration Tab -->
        <div v-if="activeTab === 'migration'">
          <h3
            class="text-xl md:text-2xl font-semibold text-white mb-6 text-center"
          >
            SEO-Preserving Migration Process
          </h3>
          <div class="space-y-6">
            <div
              v-for="phase in migrationSteps"
              :key="phase.phase"
              class="bg-slate-800/50 rounded-lg p-6 border border-slate-700/30"
            >
              <h4 class="text-lg font-semibold text-purple-400 mb-3">
                {{ phase.phase }}
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div
                  v-for="item in phase.items"
                  :key="item"
                  class="flex items-center text-sm text-gray-300"
                >
                  <span class="text-cyan-400 mr-2">☐</span>
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <p class="text-center text-gray-400 mt-6 text-sm">
            Complete migration checklist ensures zero downtime and preserved
            search rankings
          </p>
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

    <!-- Before/After Comparison Section -->
    <div class="max-w-5xl mx-auto px-6 py-12">
      <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        Stand Out From Competitors
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Before: Generic Template -->
        <div
          class="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-700/30 rounded-xl p-8"
        >
          <h3 class="text-xl font-semibold text-red-400 mb-4">
            ❌ Generic Template
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-red-400 mr-2 mt-1">•</span>
              <span>Off-the-shelf design that looks like competitors</span>
            </li>
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-red-400 mr-2 mt-1">•</span>
              <span>Poor user experience and navigation</span>
            </li>
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-red-400 mr-2 mt-1">•</span>
              <span>Low conversion rates</span>
            </li>
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-red-400 mr-2 mt-1">•</span>
              <span>Brand message gets lost</span>
            </li>
          </ul>
        </div>

        <!-- After: Custom Brand Experience -->
        <div
          class="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-700/30 rounded-xl p-8"
        >
          <h3 class="text-xl font-semibold text-emerald-400 mb-4">
            ✓ Custom Brand Experience
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-emerald-400 mr-2 mt-1">✓</span>
              <span>Unique design aligned with your brand</span>
            </li>
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-emerald-400 mr-2 mt-1">✓</span>
              <span>Intuitive navigation and user flows</span>
            </li>
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-emerald-400 mr-2 mt-1">✓</span>
              <span>Optimized for conversions</span>
            </li>
            <li class="flex items-start text-gray-300 text-sm">
              <span class="text-emerald-400 mr-2 mt-1">✓</span>
              <span>Clear brand differentiation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

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
