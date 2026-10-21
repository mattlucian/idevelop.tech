<script setup lang="ts">
import { useServiceMeta } from "@/composables/useServiceMeta";
import { withIcons } from "@/utils/iconMapping";
import ServicePageLayout from "../../components/layout/ServicePageLayout.vue";
import ContentSection from "../../components/ui/ContentSection.vue";
import OutlineIcon from "../../components/elements/OutlineIcon.vue";
import CloudValuePillars from "../../components/cloud/CloudValuePillars.vue";
import CloudBillBreakdown from "../../components/cloud/CloudBillBreakdown.vue";
import CloudSpendTrend from "../../components/cloud/CloudSpendTrend.vue";
import PerformanceFindings from "../../components/cloud/PerformanceFindings.vue";
import ChangeRollout from "../../components/cloud/ChangeRollout.vue";
import { cloudConsultingServiceData } from "@/data/services/cloud-consulting";

// SEO Meta Tags
useServiceMeta({
  serviceName: "Cloud Consulting: Get More From Your AWS Spend",
  slug: "cloud-consulting",
  description:
    "AWS cost optimization and performance consulting. Lower costs, predictable bills, and better performance, with ranked findings, estimated impact, staged rollouts, and a before-and-after summary.",
  ogDescription:
    "Get more from your AWS spend. Lower costs, steadier bills, and better performance, with each recommendation ranked by impact.",
});

const { awsServices } = cloudConsultingServiceData;
const deliverableCards = withIcons(cloudConsultingServiceData.deliverables);
</script>

<template>
  <ServicePageLayout
    :page="cloudConsultingServiceData"
    service-name="Cloud Consulting"
  >
    <!-- Overview -->
    <CloudValuePillars />

    <!-- Lower costs -->
    <CloudBillBreakdown />

    <!-- Predictable costs -->
    <CloudSpendTrend />

    <!-- Better performance -->
    <PerformanceFindings />

    <!-- Rollout -->
    <ChangeRollout />

    <!-- Deliverables and services -->
    <ContentSection
      title="Deliverables"
      subtitle="Engagements are fixed-fee and scoped up front."
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="item in deliverableCards"
          :key="item.title"
          class="rounded-xl border border-slate-800 bg-[#0f0f0f] p-4"
        >
          <OutlineIcon
            v-if="item.iconComponent"
            :icon="item.iconComponent"
            size="md"
            color="cyan"
          />
          <div class="mt-2 font-semibold text-white">{{ item.title }}</div>
          <div class="mt-1 text-sm text-slate-400">{{ item.desc }}</div>
        </div>
      </div>

      <h3 class="mt-14 mb-6 text-center text-xl font-semibold text-white">
        AWS Services I Work With
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          v-for="group in awsServices"
          :key="group.area"
          class="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center"
        >
          <div
            class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            {{ group.area }}
          </div>
          <div class="flex flex-wrap justify-center gap-1.5">
            <span
              v-for="service in group.services"
              :key="service"
              class="rounded border border-slate-700 bg-[#0a0a0a] px-2 py-0.5 text-xs text-slate-300"
            >
              {{ service }}
            </span>
          </div>
        </div>
      </div>
    </ContentSection>
  </ServicePageLayout>
</template>
