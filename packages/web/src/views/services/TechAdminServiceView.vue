<script setup lang="ts">
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import { useServiceMeta } from "@/composables/useServiceMeta";
import ServicePageLayout from "../../components/layout/ServicePageLayout.vue";
import ContentSection from "../../components/ui/ContentSection.vue";
import DecisionBrief from "../../components/tech-admin/DecisionBrief.vue";
import StackMapDiagram from "../../components/tech-admin/StackMapDiagram.vue";
import WorkflowMap from "../../components/tech-admin/WorkflowMap.vue";
import RoadmapBoard from "../../components/tech-admin/RoadmapBoard.vue";
import TypicalMonth from "../../components/tech-admin/TypicalMonth.vue";
import { techAdminServiceData } from "@/data/services/tech-admin";

// SEO Meta Tags
useServiceMeta({
  serviceName: "Tech Admin: Make Tech Decisions With Confidence",
  slug: "tech-admin",
  description:
    "Make tech decisions with confidence. Technology consulting on a monthly retainer: tech stack review, workflow documentation, recommendations with the tradeoffs laid out, a roadmap built around your priorities, and hands-on help with automation and migrations.",
  ogDescription:
    "Make tech decisions with confidence. A clear picture of your tools, recommendations with the reasoning shown, and hands-on help to follow through.",
});

const { signals } = techAdminServiceData;
</script>

<template>
  <ServicePageLayout :page="techAdminServiceData" service-name="Tech Admin">
    <!-- Questions clients bring -->
    <ContentSection
      banded
      title="Common Challenges"
      subtitle="Questions businesses often bring to me."
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="signal in signals"
          :key="signal"
          class="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0f0f0f] p-4"
        >
          <QuestionMarkCircleIcon
            class="mt-0.5 h-5 w-5 shrink-0 text-cyan-400"
          />
          <span class="text-sm italic text-slate-300">"{{ signal }}"</span>
        </div>
      </div>
    </ContentSection>

    <DecisionBrief />
    <StackMapDiagram />
    <WorkflowMap />
    <RoadmapBoard />
    <TypicalMonth />
  </ServicePageLayout>
</template>
