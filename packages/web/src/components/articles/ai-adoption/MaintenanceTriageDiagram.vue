<script setup lang="ts">
import {
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleAiChecks from "../../article/ArticleAiChecks.vue";
import ArticleScenarioBox from "../../article/ArticleScenarioBox.vue";
import FlowArrow from "../../elements/FlowArrow.vue";

const requests = [
  {
    channel: "Unit 3B · text message",
    icon: DevicePhoneMobileIcon,
    text: "Water under my sink again",
  },
  {
    channel: "Unit 2B · online form",
    icon: GlobeAltIcon,
    text: "Water dripping from the kitchen ceiling",
  },
];

const checks = [
  {
    source: "Open requests",
    icon: ClipboardDocumentListIcon,
    finding: "Both units reported water today",
  },
  {
    source: "Building records",
    icon: BuildingOffice2Icon,
    finding: "Unit 2B's kitchen is below 3B's",
  },
  {
    source: "Past requests",
    icon: WrenchScrewdriverIcon,
    finding: "3B's sink was repaired last month",
  },
];

const suggestions = [
  { label: "Repair type", value: "Plumbing" },
  { label: "Urgency", value: "High" },
  { label: "Possibly related", value: "2B's ceiling leak may come from 3B" },
  { label: "Draft replies", value: "Ready for review" },
];
</script>

<template>
  <ArticleFigure
    title="AI connects the requests, and the coordinator decides"
    subtitle="Example: two tenants describe one leak"
    ai-legend
  >
    <div class="space-y-2">
      <div class="grid gap-2 sm:grid-cols-2">
        <ArticleScenarioBox
          v-for="request in requests"
          :key="request.channel"
          :label="request.channel"
          :icon="request.icon"
        >
          "{{ request.text }}"
        </ArticleScenarioBox>
      </div>
      <FlowArrow size="sm" vertical />
      <ArticleAiChecks
        label="AI looks for related information"
        :checks="checks"
      />
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox tone="ai" label="AI suggests" :fields="suggestions" />
      <FlowArrow size="sm" vertical />
      <ArticleScenarioBox
        tone="person"
        label="Maintenance coordinator"
        :icon="UserIcon"
      >
        <span class="text-xs">
          Sends one plumber to both units and approves the replies to both
          tenants
        </span>
      </ArticleScenarioBox>
    </div>
  </ArticleFigure>
</template>
