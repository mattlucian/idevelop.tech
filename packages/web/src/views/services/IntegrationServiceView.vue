<script setup lang="ts">
import { ref } from "vue";
import { useServiceMeta } from "@/composables/useServiceMeta";
import ServicePageLayout from "../../components/layout/ServicePageLayout.vue";
import ContentSection from "../../components/ui/ContentSection.vue";
import TabNavigation from "../../components/ui/TabNavigation.vue";
import IntegrationDiagram from "../../components/integration/IntegrationDiagram.vue";
import DetailedEntityMapping from "../../components/integration/DetailedEntityMapping.vue";
import IntegrationRunLog from "../../components/integration/IntegrationRunLog.vue";
import IntegrationScopeSheet from "../../components/integration/IntegrationScopeSheet.vue";
import { integrationServiceData } from "@/data/services/integration";

// SEO Meta Tags
useServiceMeta({
  serviceName: "System Integrations: Documented and Fixed-Fee",
  slug: "integration",
  description:
    "Fixed-fee integrations between Shopify, NetSuite, Sage Intacct, 3PLs, marketplaces, and custom APIs. Documented field mapping, automatic retries, and alerts for errors that need a person. 100+ integrations built.",
  ogDescription:
    "Connect your business systems with documented, fixed-fee integrations. Field-level mapping your team can read, plus alerts when a record can't sync.",
});

const { tabs, stats, integrationDiagrams } = integrationServiceData;
const activeTab = ref("accounting");
</script>

<template>
  <ServicePageLayout :page="integrationServiceData" service-name="Integration">
    <!-- Common connections -->
    <ContentSection
      title="Common Connections"
      subtitle="Data flows I build often, between platforms like Shopify, NetSuite, Sage Intacct, 3PLs, and marketplaces."
    >
      <TabNavigation v-model="activeTab" :tabs="tabs" />

      <div
        class="bg-linear-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-8 md:p-12"
      >
        <!-- v-show keeps each diagram's text in the page for search engines -->
        <div v-for="tab in tabs" v-show="activeTab === tab.id" :key="tab.id">
          <IntegrationDiagram
            :left-system="integrationDiagrams[tab.id].leftSystem"
            :right-system="integrationDiagrams[tab.id].rightSystem"
            :mappings="integrationDiagrams[tab.id].mappings"
            :caption="integrationDiagrams[tab.id].caption"
            :mapping-color-scheme="
              integrationDiagrams[tab.id].mappingColorScheme
            "
          />
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3"
        >
          <div class="font-semibold text-white">{{ stat.value }}</div>
          <div class="text-xs text-slate-400">{{ stat.label }}</div>
        </div>
      </div>
    </ContentSection>

    <DetailedEntityMapping />
    <IntegrationRunLog />
    <IntegrationScopeSheet />
  </ServicePageLayout>
</template>
