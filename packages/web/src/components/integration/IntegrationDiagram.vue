<script setup lang="ts">
import SystemBox from "./SystemBox.vue";
import EntityMappingFlow from "./EntityMappingFlow.vue";
import type {
  IntegrationSystem,
  IntegrationMapping,
} from "@/types/shared/integration";

interface Props {
  leftSystem: IntegrationSystem;
  rightSystem: IntegrationSystem;
  mappings: IntegrationMapping[];
  caption?: string;
  mappingColorScheme?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  caption: "",
  mappingColorScheme: "cyan",
});
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row items-center justify-between gap-8">
      <!-- Left System -->
      <SystemBox
        :name="leftSystem.name"
        :label="leftSystem.label"
        :icon-path="leftSystem.iconPath"
        :color-scheme="leftSystem.colorScheme || 'cyan'"
      />

      <!-- Mapping Flows -->
      <div class="flex-1 space-y-3">
        <EntityMappingFlow
          v-for="(mapping, index) in mappings"
          :key="index"
          :from="mapping.from"
          :to="mapping.to"
          :direction="mapping.direction || 'forward'"
          :color-scheme="mappingColorScheme"
        />
      </div>

      <!-- Right System -->
      <SystemBox
        :name="rightSystem.name"
        :label="rightSystem.label"
        :icon-path="rightSystem.iconPath"
        :color-scheme="rightSystem.colorScheme || 'emerald'"
      />
    </div>

    <!-- Caption -->
    <div
      v-if="caption"
      class="text-center mt-8"
    >
      <p class="text-sm text-slate-400">
        {{ caption }}
      </p>
    </div>
  </div>
</template>
