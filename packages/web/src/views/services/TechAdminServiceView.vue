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
import Timeline from "../../components/display/Timeline.vue";
import OutlineIcon from "../../components/elements/OutlineIcon.vue";
import { techAdminServiceData } from "@/data/services/tech-admin";
import {
  Cog6ToothIcon,
  LinkIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

// SEO Meta Tags
useServiceMeta({
  serviceName: "Tech Admin & Fractional CTO Services",
  slug: "tech-admin",
  description:
    "Strategic technical leadership without the full-time cost. Fractional CTO services including technical planning, team management, and ongoing support. Get expert guidance 10-30 hours per month.",
  ogDescription:
    "Affordable technical leadership for growing businesses. Strategic planning, technical execution, and ongoing support from an experienced fractional CTO. Flexible engagement from 10 hours/month.",
});

const { handleBreadcrumbNavigate } = useBreadcrumbNavigation();
const activeTab = ref("planning");

// Destructure typed data
const {
  breadcrumbs,
  hero,
  tabs,
  benefits,
  expertiseBadge,
  whatIOffer,
  howItWorks,
  timelineSteps,
  portfolio: portfolioData,
  cta,
} = techAdminServiceData;
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
        service-name="Tech Admin"
        form-title="Request Information"
        variant="dark"
      />
    </ServiceSection>

    <!-- Service Approach with Tabs -->
    <div class="max-w-5xl mx-auto px-6 py-6">
      <!-- Tab Navigation -->
      <TabNavigation v-model="activeTab" :tabs="tabs" />

      <!-- Tab Content -->
      <div
        class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <!-- Strategic Planning Tab -->
        <div v-if="activeTab === 'planning'" class="space-y-6">
          <div>
            <h3 class="text-2xl font-bold text-white mb-4">
              Strategic Planning
            </h3>
            <p class="text-gray-300 mb-6 leading-relaxed">
              Get clarity on your technology landscape with comprehensive stack
              documentation and actionable roadmaps.
            </p>
          </div>

          <Timeline :steps="timelineSteps" color="cyan" />

          <div
            class="mt-8 p-6 bg-slate-800/40 rounded-lg border border-slate-700/30"
          >
            <h4 class="text-lg font-semibold text-cyan-400 mb-3">
              Deliverables
            </h4>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-start">
                <span class="text-cyan-400 mr-2">→</span>
                <span>Complete tech stack documentation</span>
              </li>
              <li class="flex items-start">
                <span class="text-cyan-400 mr-2">→</span>
                <span
                  >Gap analysis with identified improvement opportunities</span
                >
              </li>
              <li class="flex items-start">
                <span class="text-cyan-400 mr-2">→</span>
                <span>Phased roadmap with ROI estimates</span>
              </li>
              <li class="flex items-start">
                <span class="text-cyan-400 mr-2">→</span>
                <span
                  >Technology recommendations aligned with business goals</span
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Technical Execution Tab -->
        <div v-if="activeTab === 'execution'" class="space-y-6">
          <div>
            <h3 class="text-2xl font-bold text-white mb-4">
              Technical Execution
            </h3>
            <p class="text-gray-300 mb-6 leading-relaxed">
              Hands-on technical work that moves your business forward.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="p-6 bg-slate-800/40 rounded-lg border border-slate-700/30"
            >
              <div class="mb-3">
                <OutlineIcon :icon="Cog6ToothIcon" size="lg" color="cyan" />
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">
                Automation Workflows
              </h4>
              <p class="text-gray-400 text-sm">
                Streamline operations by building custom automation that
                eliminates manual work and reduces errors.
              </p>
            </div>

            <div
              class="p-6 bg-slate-800/40 rounded-lg border border-slate-700/30"
            >
              <div class="mb-3">
                <OutlineIcon :icon="LinkIcon" size="lg" color="cyan" />
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">
                Integrations & Migrations
              </h4>
              <p class="text-gray-400 text-sm">
                Connect your systems and handle complex migrations with minimal
                downtime and clear documentation.
              </p>
            </div>

            <div
              class="p-6 bg-slate-800/40 rounded-lg border border-slate-700/30"
            >
              <div class="mb-3">
                <OutlineIcon :icon="RocketLaunchIcon" size="lg" color="cyan" />
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">
                Operational Support
              </h4>
              <p class="text-gray-400 text-sm">
                Sales prep, system configurations, troubleshooting - the
                hands-on work that keeps your business running.
              </p>
            </div>

            <div
              class="p-6 bg-slate-800/40 rounded-lg border border-slate-700/30"
            >
              <div class="mb-3">
                <OutlineIcon
                  :icon="WrenchScrewdriverIcon"
                  size="lg"
                  color="cyan"
                />
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">
                Maintain & Optimize
              </h4>
              <p class="text-gray-400 text-sm">
                Proactive system maintenance, performance optimization, and
                continuous improvements based on usage patterns.
              </p>
            </div>
          </div>

          <div
            class="mt-6 p-6 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
          >
            <p class="text-cyan-300 font-semibold mb-2">Real Expertise</p>
            <p class="text-gray-300 text-sm">
              10+ years full-stack development • 7+ years AWS cloud architecture
              • 6+ years CI/CD & DevOps automation • 100+ integrations & data
              pipelines
            </p>
          </div>
        </div>

        <!-- Ongoing Support Tab -->
        <div v-if="activeTab === 'support'" class="space-y-6">
          <div>
            <h3 class="text-2xl font-bold text-white mb-4">
              Ongoing Support & Optimization
            </h3>
            <p class="text-gray-300 mb-6 leading-relaxed">
              Proactive maintenance and continuous improvement with flexible
              hour allocation based on your needs.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-cyan-400 mb-4">
                Regular Activities
              </h4>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-start">
                  <span class="text-cyan-400 mr-2 mt-1">✓</span>
                  <span>Monitor system performance and identify issues</span>
                </li>
                <li class="flex items-start">
                  <span class="text-cyan-400 mr-2 mt-1">✓</span>
                  <span>Answer technical questions as they arise</span>
                </li>
                <li class="flex items-start">
                  <span class="text-cyan-400 mr-2 mt-1">✓</span>
                  <span>Implement small improvements and optimizations</span>
                </li>
                <li class="flex items-start">
                  <span class="text-cyan-400 mr-2 mt-1">✓</span>
                  <span>Troubleshoot issues quickly (&lt;1 hour response)</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-purple-400 mb-4">
                Optimization Focus
              </h4>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-start">
                  <span class="text-purple-400 mr-2 mt-1">→</span>
                  <span
                    >Identify cost savings opportunities (quarterly
                    review)</span
                  >
                </li>
                <li class="flex items-start">
                  <span class="text-purple-400 mr-2 mt-1">→</span>
                  <span>Recommend technology updates as relevant</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-400 mr-2 mt-1">→</span>
                  <span>Optimize workflows based on usage patterns</span>
                </li>
                <li class="flex items-start">
                  <span class="text-purple-400 mr-2 mt-1">→</span>
                  <span>Plan for scaling before you need it</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="mt-6 p-6 bg-slate-800/60 rounded-lg border border-slate-700/30"
          >
            <h4 class="text-base font-semibold text-white mb-3">
              Flexible Hour Allocation
            </h4>
            <div class="flex flex-col md:flex-row gap-4 text-sm">
              <div class="flex-1">
                <p class="text-cyan-400 font-semibold mb-1">10 hrs/month</p>
                <p class="text-gray-400">
                  Steady maintenance and regular support
                </p>
              </div>
              <div class="flex-1">
                <p class="text-purple-400 font-semibold mb-1">
                  20-30 hrs/month
                </p>
                <p class="text-gray-400">
                  When pushing initiatives or handling burst projects
                </p>
              </div>
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

    <!-- Common Challenges Section -->
    <div class="max-w-5xl mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">
        From Tech Pain Points to Clear Solutions
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Before -->
        <div
          class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8"
        >
          <h3 class="text-xl font-bold text-gray-300 mb-6 flex items-center">
            <span class="mr-3">
              <OutlineIcon :icon="XCircleIcon" size="lg" color="slate" />
            </span>
            Common Challenges
          </h3>
          <ul class="space-y-4 text-gray-400">
            <li class="flex items-start">
              <span class="mr-2 mt-1">•</span>
              <span>Manual data entry consuming hours each week</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 mt-1">•</span>
              <span>Disconnected systems causing data inconsistencies</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 mt-1">•</span>
              <span>Processes breaking as your business scales</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2 mt-1">•</span>
              <span>No roadmap for infrastructure growth</span>
            </li>
          </ul>
        </div>

        <!-- After -->
        <div
          class="bg-linear-to-br from-cyan-900/20 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-8"
        >
          <h3 class="text-xl font-bold text-cyan-400 mb-6 flex items-center">
            <span class="text-2xl mr-3">✓</span>
            With Tech Admin Services
          </h3>
          <ul class="space-y-4 text-gray-300">
            <li class="flex items-start">
              <span class="text-cyan-400 mr-2 mt-1">→</span>
              <span>Automation opportunities identified and prioritized</span>
            </li>
            <li class="flex items-start">
              <span class="text-cyan-400 mr-2 mt-1">→</span>
              <span>Integration roadmap with phased implementation</span>
            </li>
            <li class="flex items-start">
              <span class="text-cyan-400 mr-2 mt-1">→</span>
              <span>Critical fixes addressed before they escalate</span>
            </li>
            <li class="flex items-start">
              <span class="text-cyan-400 mr-2 mt-1">→</span>
              <span>Scalability plan aligned with business goals</span>
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
