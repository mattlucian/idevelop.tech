<script setup lang="ts">
import { useServiceMeta } from "@/composables/useServiceMeta";
import { getFeaturedArticle } from "@/data/articles";
import ServicePageLayout from "../../components/layout/ServicePageLayout.vue";
import AiUseCases from "../../components/ai-enablement/AiUseCases.vue";
import AiTrackCards from "../../components/ai-enablement/AiTrackCards.vue";
import AutomationPathDiagram from "../../components/ai-enablement/AutomationPathDiagram.vue";
import KnowledgeToWorkDiagram from "../../components/ai-enablement/KnowledgeToWorkDiagram.vue";
import DashboardAggregationDiagram from "../../components/ai-enablement/DashboardAggregationDiagram.vue";
import { aiEnablementServiceData } from "@/data/services/ai-enablement";

// SEO Meta Tags
useServiceMeta({
  serviceName: "AI Enablement: Adopt AI Across Your Organization",
  slug: "ai-enablement",
  description:
    "Adopt AI across your organization. Hands-on AI training workshops for support and operations teams, AI workflows that run on a schedule, and agent instructions for engineering teams using tools like Claude and ChatGPT.",
  ogDescription:
    "Adopt AI across your organization. AI training workshops, scheduled AI workflows, and agent instructions your team owns.",
});

const featuredArticle = getFeaturedArticle("/services/ai-enablement");
</script>

<template>
  <ServicePageLayout
    :page="aiEnablementServiceData"
    service-name="AI Enablement"
    :featured-article="featuredArticle"
  >
    <AiUseCases :use-cases="aiEnablementServiceData.useCases" />
    <AiTrackCards />
    <AutomationPathDiagram />
    <KnowledgeToWorkDiagram />
    <DashboardAggregationDiagram />
  </ServicePageLayout>
</template>
