<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMeta } from '@/composables/useMeta'
import BreadcrumbNav from '../../components/ui/BreadcrumbNav.vue'
import ServiceSection from '../../components/ui/ServiceSection.vue'
import TabButton from '../../components/ui/TabButton.vue'
import TwoColumnListSection from '../../components/ui/TwoColumnListSection.vue'
import CTASection from '../../components/ui/CTASection.vue'
import CTAForm from '../../components/ui/CTAForm.vue'
import IconFlowStep from '../../components/display/IconFlowStep.vue'
import { cloudConsultingServiceData } from '@/data/services/cloud-consulting'
import { SITE } from '@/constants'

// SEO Meta Tags
useMeta({
  title: 'Cloud & AWS Infrastructure Consulting | I Develop Tech',
  description:
    'AWS cloud infrastructure consulting and migration services. Expert guidance on cloud strategy, cost optimization, and infrastructure architecture. Reduce cloud costs by 30-50% with proper architecture.',
  ogTitle: 'Cloud & AWS Infrastructure Consulting | I Develop Tech',
  ogDescription:
    'Optimize your AWS infrastructure. Cloud strategy, low-risk migrations, and cost optimization consulting. Get control of your cloud spending with expert guidance.',
  ogUrl: `${SITE.url}/services/cloud-consulting`,
  ogImage: `${SITE.url}/og-image-cloud-consulting.jpg`,
})

const router = useRouter()
const activeTab = ref('strategy')

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
  cloudJourneys,
} = cloudConsultingServiceData

const goToHireMe = () => {
  router.push('/hire-me')
}

const handleBreadcrumbNavigate = (path: string) => {
  router.push(path)
}
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
      <CTAForm service-name="Cloud Consulting" form-title="Request Information" variant="dark" />
    </ServiceSection>

    <!-- Cloud Journey Visualization with Tabs -->
    <div class="max-w-5xl mx-auto px-6 py-6">
      <!-- Tab Navigation -->
      <div class="flex flex-col md:flex-row gap-2 mb-6 md:border-b md:border-slate-700/30">
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
        <!-- Strategy Tab -->
        <div v-if="activeTab === 'strategy'">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-8 text-center">
            {{ cloudJourneys.strategy.title }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <IconFlowStep
              v-for="(step, index) in cloudJourneys.strategy.steps"
              :key="index"
              :emoji="step.icon"
              :label="step.label"
              :desc="step.description"
              color-scheme="cyan"
              filter-style="grayscale"
            />
          </div>
        </div>

        <!-- Migration Tab -->
        <div v-if="activeTab === 'migration'">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-8 text-center">
            {{ cloudJourneys.migration.title }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <IconFlowStep
              v-for="(step, index) in cloudJourneys.migration.steps"
              :key="index"
              :emoji="step.icon"
              :label="step.label"
              :desc="step.description"
              color-scheme="emerald"
              filter-style="grayscale"
            />
          </div>
        </div>

        <!-- Optimization Tab -->
        <div v-if="activeTab === 'optimization'">
          <h3 class="text-xl md:text-2xl font-bold text-white mb-8 text-center">
            {{ cloudJourneys.optimization.title }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <IconFlowStep
              v-for="(step, index) in cloudJourneys.optimization.steps"
              :key="index"
              :emoji="step.icon"
              :label="step.label"
              :desc="step.description"
              color-scheme="purple"
              filter-style="grayscale"
            />
          </div>
        </div>
      </div>

      <!-- Caption below diagram -->
      <p class="text-center text-sm text-gray-400 mt-4">
        <span v-if="activeTab === 'strategy'"
          >From initial assessment to ongoing optimization, get expert guidance at every stage</span
        >
        <span v-else-if="activeTab === 'migration'"
          >Minimize risk with phased migration approach and comprehensive testing</span
        >
        <span v-else>Reduce cloud costs by 20-40% without sacrificing performance</span>
      </p>
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

    <!-- Secondary Visual: AWS Services Expertise -->
    <div class="max-w-5xl mx-auto px-6 py-12">
      <div
        class="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <h3 class="text-2xl font-bold text-white mb-6 text-center">AWS Services Expertise</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Compute -->
          <div>
            <h4 class="text-lg font-semibold text-cyan-400 mb-3">Compute</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>• EC2 (Elastic Compute Cloud)</li>
              <li>• ECS (Elastic Container Service)</li>
              <li>• Fargate (Serverless Containers)</li>
              <li>• Lambda (Serverless Functions)</li>
            </ul>
          </div>

          <!-- Storage & Database -->
          <div>
            <h4 class="text-lg font-semibold text-cyan-400 mb-3">Storage & Database</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>• RDS (Relational Database)</li>
              <li>• Aurora (High-Performance DB)</li>
              <li>• DynamoDB (NoSQL Database)</li>
              <li>• S3 (Object Storage)</li>
            </ul>
          </div>

          <!-- Networking & Security -->
          <div>
            <h4 class="text-lg font-semibold text-cyan-400 mb-3">Networking & Security</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>• VPC (Virtual Private Cloud)</li>
              <li>• Route53 (DNS Management)</li>
              <li>• CloudFront (CDN)</li>
              <li>• IAM (Access Management)</li>
            </ul>
          </div>

          <!-- Monitoring & Optimization -->
          <div>
            <h4 class="text-lg font-semibold text-cyan-400 mb-3">Monitoring & Optimization</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>• CloudWatch (Monitoring)</li>
              <li>• Cost Explorer (Cost Analysis)</li>
              <li>• Auto Scaling (Dynamic Scaling)</li>
              <li>• CloudFormation (IaC)</li>
            </ul>
          </div>

          <!-- DevOps & CI/CD -->
          <div>
            <h4 class="text-lg font-semibold text-cyan-400 mb-3">DevOps & CI/CD</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>• CodePipeline (CI/CD)</li>
              <li>• CodeBuild (Build Service)</li>
              <li>• ECR (Container Registry)</li>
              <li>• Systems Manager (Operations)</li>
            </ul>
          </div>

          <!-- Additional Services -->
          <div>
            <h4 class="text-lg font-semibold text-cyan-400 mb-3">Additional Services</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>• SNS (Notifications)</li>
              <li>• SQS (Message Queuing)</li>
              <li>• ElastiCache (Caching)</li>
              <li>• Secrets Manager (Credentials)</li>
            </ul>
          </div>
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
    <CTASection :title="cta.title" :subtitle="cta.subtitle" :button-text="cta.buttonText" />
  </div>
</template>
