<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMeta } from "@/composables/useMeta";
import BreadcrumbNav from "../../components/ui/BreadcrumbNav.vue";
import ServiceSection from "../../components/ui/ServiceSection.vue";
import TabButton from "../../components/ui/TabButton.vue";
import TwoColumnListSection from "../../components/ui/TwoColumnListSection.vue";
import CTASection from "../../components/ui/CTASection.vue";
import SimpleCheckItem from "../../components/elements/SimpleCheckItem.vue";
import CTAForm from "../../components/ui/CTAForm.vue";
import { aiEnablementServiceData } from "@/data/services/ai-enablement";
import { SITE } from "@/constants";

// SEO Meta Tags
useMeta({
  title: "AI Enablement & Team Training Services | I Develop Tech",
  description:
    "Practical AI adoption for your team. Hands-on training workshops, workflow analysis, and tool implementation. Move beyond ChatGPT to AI-powered documentation, testing, and code generation.",
  ogTitle: "AI Enablement & Team Training Services | I Develop Tech",
  ogDescription:
    "Help your team adopt AI effectively. Custom workshops, workflow optimization, and practical implementation. Focus on real productivity gains, not hype.",
  ogUrl: `${SITE.url}/services/ai-enablement`,
  ogImage: `${SITE.url}/og-image-ai-enablement.jpg`,
});

const router = useRouter();
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
        service-name="AI Enablement"
        form-title="Request Information"
        variant="dark"
      />
    </ServiceSection>

    <!-- AI Approach Examples with Tabs -->
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
        <!-- Workflow Analysis Tab -->
        <div v-if="activeTab === 'workflow'">
          <h3 class="text-2xl font-bold text-white mb-3">
            {{ tabContent.workflow.title }}
          </h3>
          <p class="text-slate-300 mb-8">
            {{ tabContent.workflow.description }}
          </p>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Before Column -->
            <div>
              <div
                class="flex items-center gap-2 mb-4 pb-2 border-b border-red-500/30"
              >
                <span class="text-2xl">❌</span>
                <h4 class="text-lg font-semibold text-red-400">
                  {{ tabContent.workflow.beforeTitle }}
                </h4>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in tabContent.workflow.beforeItems"
                  :key="`before-${index}`"
                  class="flex items-start gap-3 text-slate-400"
                >
                  <span class="text-red-400 mt-0.5">•</span>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- After Column -->
            <div>
              <div
                class="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-500/30"
              >
                <span class="text-2xl">✅</span>
                <h4 class="text-lg font-semibold text-emerald-400">
                  {{ tabContent.workflow.afterTitle }}
                </h4>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in tabContent.workflow.afterItems"
                  :key="`after-${index}`"
                  class="flex items-start gap-3 text-slate-300"
                >
                  <span class="text-emerald-400 mt-0.5">✓</span>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Training Tab -->
        <div v-if="activeTab === 'training'">
          <h3 class="text-2xl font-bold text-white mb-3">
            {{ tabContent.training.title }}
          </h3>
          <p class="text-slate-300 mb-8">
            {{ tabContent.training.description }}
          </p>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Before Column -->
            <div>
              <div
                class="flex items-center gap-2 mb-4 pb-2 border-b border-red-500/30"
              >
                <span class="text-2xl">❌</span>
                <h4 class="text-lg font-semibold text-red-400">
                  {{ tabContent.training.beforeTitle }}
                </h4>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in tabContent.training.beforeItems"
                  :key="`before-${index}`"
                  class="flex items-start gap-3 text-slate-400"
                >
                  <span class="text-red-400 mt-0.5">•</span>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- After Column -->
            <div>
              <div
                class="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-500/30"
              >
                <span class="text-2xl">✅</span>
                <h4 class="text-lg font-semibold text-emerald-400">
                  {{ tabContent.training.afterTitle }}
                </h4>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in tabContent.training.afterItems"
                  :key="`after-${index}`"
                  class="flex items-start gap-3 text-slate-300"
                >
                  <span class="text-emerald-400 mt-0.5">✓</span>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Implementation Tab -->
        <div v-if="activeTab === 'implementation'">
          <h3 class="text-2xl font-bold text-white mb-3">
            {{ tabContent.implementation.title }}
          </h3>
          <p class="text-slate-300 mb-8">
            {{ tabContent.implementation.description }}
          </p>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Before Column -->
            <div>
              <div
                class="flex items-center gap-2 mb-4 pb-2 border-b border-red-500/30"
              >
                <span class="text-2xl">❌</span>
                <h4 class="text-lg font-semibold text-red-400">
                  {{ tabContent.implementation.beforeTitle }}
                </h4>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in tabContent.implementation.beforeItems"
                  :key="`before-${index}`"
                  class="flex items-start gap-3 text-slate-400"
                >
                  <span class="text-red-400 mt-0.5">•</span>
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- After Column -->
            <div>
              <div
                class="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-500/30"
              >
                <span class="text-2xl">✅</span>
                <h4 class="text-lg font-semibold text-emerald-400">
                  {{ tabContent.implementation.afterTitle }}
                </h4>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in tabContent.implementation.afterItems"
                  :key="`after-${index}`"
                  class="flex items-start gap-3 text-slate-300"
                >
                  <span class="text-emerald-400 mt-0.5">✓</span>
                  <span>{{ item }}</span>
                </div>
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

    <!-- Secondary Detail: AI Use Cases Section -->
    <div class="max-w-5xl mx-auto px-6 py-12">
      <div
        class="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
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
              <span class="text-2xl">📚</span>
              Documentation & Knowledge
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="cyan"
                >Generate draft documentation from code</SimpleCheckItem
              >
              <SimpleCheckItem color="cyan"
                >Maintain knowledge bases and wikis</SimpleCheckItem
              >
              <SimpleCheckItem color="cyan"
                >Create onboarding materials</SimpleCheckItem
              >
              <SimpleCheckItem color="cyan"
                >Improve technical writing clarity</SimpleCheckItem
              >
            </ul>
          </div>

          <!-- Right Column: Testing & Quality -->
          <div>
            <h3
              class="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">🧪</span>
              Testing & Quality
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="purple"
                >Generate test cases and scenarios</SimpleCheckItem
              >
              <SimpleCheckItem color="purple"
                >Identify edge cases and bugs</SimpleCheckItem
              >
              <SimpleCheckItem color="purple"
                >Create test scaffolding code</SimpleCheckItem
              >
              <SimpleCheckItem color="purple"
                >Improve code coverage quickly</SimpleCheckItem
              >
            </ul>
          </div>

          <!-- Left Column: Code Assistance -->
          <div>
            <h3
              class="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">💻</span>
              Code Assistance
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="emerald"
                >Review code for common issues</SimpleCheckItem
              >
              <SimpleCheckItem color="emerald"
                >Suggest refactoring improvements</SimpleCheckItem
              >
              <SimpleCheckItem color="emerald"
                >Generate boilerplate code</SimpleCheckItem
              >
              <SimpleCheckItem color="emerald"
                >Explain complex codebases</SimpleCheckItem
              >
            </ul>
          </div>

          <!-- Right Column: Process Improvement -->
          <div>
            <h3
              class="text-xl font-semibold text-orange-400 mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">⚡</span>
              Process Improvement
            </h3>
            <ul class="space-y-3">
              <SimpleCheckItem color="orange"
                >Automate repetitive tasks</SimpleCheckItem
              >
              <SimpleCheckItem color="orange"
                >Analyze data and generate insights</SimpleCheckItem
              >
              <SimpleCheckItem color="orange"
                >Draft emails and communications</SimpleCheckItem
              >
              <SimpleCheckItem color="orange"
                >Research and summarize information</SimpleCheckItem
              >
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
