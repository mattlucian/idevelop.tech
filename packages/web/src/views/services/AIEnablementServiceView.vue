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
  serviceName: "AI Enablement: Improve Your Operations With AI",
  slug: "ai-enablement",
  description:
    "Improve your business operations with AI. Hands-on AI training workshops, automations built with AI, and AI workflows that flag items for your team to review, using tools like Claude and ChatGPT.",
  ogDescription:
    "Practical ways to improve your operations with AI: team workshops, automations built with AI, and AI workflows your team reviews.",
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
