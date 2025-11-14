<script setup lang="ts">
import { computed } from "vue";
import { useColorScheme, type ColorScheme } from "@/composables/useColorScheme";
import SimpleCheckItem from "../elements/SimpleCheckItem.vue";
import NumberedStep from "../elements/NumberedStep.vue";

interface Props {
  leftColumn: {
    title: string;
    items: string[];
    color?: ColorScheme;
    type: "check" | "number";
  };
  rightColumn: {
    title: string;
    items: string[];
    color?: ColorScheme;
    type: "check" | "number";
  };
}

const props = withDefaults(defineProps<Props>(), {
  leftColumn: () => ({
    title: "",
    items: [],
    color: "cyan" as ColorScheme,
    type: "check" as const,
  }),
  rightColumn: () => ({
    title: "",
    items: [],
    color: "purple" as ColorScheme,
    type: "number" as const,
  }),
});

const leftColors = useColorScheme(props.leftColumn.color || "cyan");
const rightColors = useColorScheme(props.rightColumn.color || "purple");

const leftTitleClass = computed(() => leftColors.text);
const rightTitleClass = computed(() => rightColors.text);

// Cast colors to NumberedStep-compatible type
const leftColor = computed(
  () => (props.leftColumn.color || "cyan") as "cyan" | "emerald" | "purple",
);
const rightColor = computed(
  () => (props.rightColumn.color || "purple") as "cyan" | "emerald" | "purple",
);
</script>

<template>
  <div class="bg-slate-900/30 border-y border-slate-800/30">
    <div class="max-w-5xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 gap-16">
        <!-- Left Column -->
        <div>
          <h2
            :class="[
              'text-sm font-semibold uppercase tracking-wider mb-4',
              leftTitleClass,
            ]"
          >
            {{ leftColumn.title }}
          </h2>
          <ul class="space-y-4">
            <template v-if="leftColumn.type === 'check'">
              <SimpleCheckItem
                v-for="(item, index) in leftColumn.items"
                :key="`check-${index}`"
                :color="leftColumn.color"
              >
                {{ item }}
              </SimpleCheckItem>
            </template>
            <template v-else>
              <NumberedStep
                v-for="(item, index) in leftColumn.items"
                :key="`number-${index}`"
                :number="index + 1"
                :color="leftColor"
              >
                {{ item }}
              </NumberedStep>
            </template>
          </ul>
        </div>

        <!-- Right Column -->
        <div>
          <h2
            :class="[
              'text-sm font-semibold uppercase tracking-wider mb-4',
              rightTitleClass,
            ]"
          >
            {{ rightColumn.title }}
          </h2>
          <ul class="space-y-4">
            <template v-if="rightColumn.type === 'check'">
              <SimpleCheckItem
                v-for="(item, index) in rightColumn.items"
                :key="`check-${index}`"
                :color="rightColumn.color"
              >
                {{ item }}
              </SimpleCheckItem>
            </template>
            <template v-else>
              <NumberedStep
                v-for="(item, index) in rightColumn.items"
                :key="`number-${index}`"
                :number="index + 1"
                :color="rightColor"
              >
                {{ item }}
              </NumberedStep>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
