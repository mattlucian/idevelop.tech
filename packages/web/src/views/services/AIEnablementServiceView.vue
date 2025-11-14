<script setup lang="ts">
import { ref } from "vue";
import { useBreadcrumbNavigation } from "@/composables/useBreadcrumbNavigation";
import { useServiceMeta } from "@/composables/useServiceMeta";
import BreadcrumbNav from "../../components/ui/BreadcrumbNav.vue";
import ServiceSection from "../../components/ui/ServiceSection.vue";
import TabNavigation from "../../components/ui/TabNavigation.vue";
import TwoColumnListSection from "../../components/ui/TwoColumnListSection.vue";
import CTASection from "../../components/ui/CTASection.vue";
import SimpleCheckItem from "../../components/elements/SimpleCheckItem.vue";
import CTAForm from "../../components/ui/CTAForm.vue";
import BeforeAfterComparison from "../../components/ui/BeforeAfterComparison.vue";
import OutlineIcon from "../../components/elements/OutlineIcon.vue";
import { aiEnablementServiceData } from "@/data/services/ai-enablement";
import {
  CommandLineIcon,
  BoltIcon,
  BeakerIcon,
  BookOpenIcon,
} from "@heroicons/vue/24/outline";

// SEO Meta Tags
useServiceMeta({
  serviceName: "AI Enablement & Team Training Services",
  slug: "ai-enablement",
  description:
    "Practical AI adoption for your team. Hands-on training workshops, workflow analysis, and tool implementation. Move beyond ChatGPT to AI-powered documentation, testing, and code generation.",
  ogDescription:
    "Help your team adopt AI effectively. Custom workshops, workflow optimization, and practical implementation. Focus on real productivity gains, not hype.",
});

const { handleBreadcrumbNavigate } = useBreadcrumbNavigation();
const activeTab = ref("workflow");

// Destructure typed data
const {
  breadcrumbs,
  hero,
  tabs,
  tabContent,
  benefits,
  expertiseBadge,
  whatIOffer,
  howItWorks,
  portfolio: portfolioData,
  cta,
} = aiEnablementServiceData;
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
        service-name="AI Enablement"
        form-title="Request Information"
        variant="dark"
      />
    </ServiceSection>

    <!-- AI Approach Examples with Tabs -->
    <div class="max-w-5xl mx-auto px-6 py-6">
      <!-- Tab Navigation -->
      <TabNavigation v-model="activeTab" :tabs="tabs" />

      <!-- Tab Content -->
      <div
        class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <!-- Workflow Analysis Tab -->
        <BeforeAfterComparison
          v-if="activeTab === 'workflow'"
          v-bind="tabContent.workflow"
        />

        <!-- Training Tab -->
        <BeforeAfterComparison
          v-if="activeTab === 'training'"
          v-bind="tabContent.training"
        />

        <!-- Implementation Tab -->
        <BeforeAfterComparison
          v-if="activeTab === 'implementation'"
          v-bind="tabContent.implementation"
        />
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

    <!-- Secondary Detail: AI Use Cases Section -->
    <div class="max-w-5xl mx-auto px-6 py-12">
      <div
        class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <h2 class="text-3xl font-bold text-white mb-4">
          Where AI Excels: High-Impact Applications
        </h2>
        <p class="text-slate-300 mb-8">
          Focus on proven AI use cases that deliver real productivity gains
          today—not theoretical future possibilities.
        </p>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Left Column: Documentation & Knowledge -->
          <div>
            <h3
              class="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2"
            >
              <OutlineIcon :icon="BookOpenIcon" size="md" color="cyan" />
              Documentation & Knowledge
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="cyan">
                Generate draft documentation from code
              </SimpleCheckItem>
              <SimpleCheckItem color="cyan">
                Maintain knowledge bases and wikis
              </SimpleCheckItem>
              <SimpleCheckItem color="cyan">
                Create onboarding materials
              </SimpleCheckItem>
              <SimpleCheckItem color="cyan">
                Improve technical writing clarity
              </SimpleCheckItem>
            </ul>
          </div>

          <!-- Right Column: Testing & Quality -->
          <div>
            <h3
              class="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2"
            >
              <OutlineIcon :icon="BeakerIcon" size="md" color="purple" />
              Testing & Quality
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="purple">
                Generate test cases and scenarios
              </SimpleCheckItem>
              <SimpleCheckItem color="purple">
                Identify edge cases and bugs
              </SimpleCheckItem>
              <SimpleCheckItem color="purple">
                Create test scaffolding code
              </SimpleCheckItem>
              <SimpleCheckItem color="purple">
                Improve code coverage quickly
              </SimpleCheckItem>
            </ul>
          </div>

          <!-- Left Column: Code Assistance -->
          <div>
            <h3
              class="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2"
            >
              <OutlineIcon :icon="CommandLineIcon" size="md" color="emerald" />
              Code Assistance
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="emerald">
                Review code for common issues
              </SimpleCheckItem>
              <SimpleCheckItem color="emerald">
                Suggest refactoring improvements
              </SimpleCheckItem>
              <SimpleCheckItem color="emerald">
                Generate boilerplate code
              </SimpleCheckItem>
              <SimpleCheckItem color="emerald">
                Explain complex codebases
              </SimpleCheckItem>
            </ul>
          </div>

          <!-- Right Column: Process Improvement -->
          <div>
            <h3
              class="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2"
            >
              <OutlineIcon :icon="BoltIcon" size="md" color="slate" />
              Process Improvement
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="orange">
                Automate repetitive tasks
              </SimpleCheckItem>
              <SimpleCheckItem color="orange">
                Analyze data and generate insights
              </SimpleCheckItem>
              <SimpleCheckItem color="orange">
                Draft emails and communications
              </SimpleCheckItem>
              <SimpleCheckItem color="orange">
                Research and summarize information
              </SimpleCheckItem>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-slate-700/30">
          <p class="text-slate-400 text-sm">
            <span class="font-semibold text-slate-300">Result:</span> Your team
            focuses on what AI does best, maximizing productivity while
            maintaining quality and control.
          </p>
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
