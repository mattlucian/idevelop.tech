<script setup lang="ts">
import { computed, type Component } from "vue";
import { SparklesIcon } from "@heroicons/vue/24/outline";

interface AiCheck {
  /** The system or document AI looks at */
  source: string;
  icon: Component;
  finding: string;
}

interface Props {
  checks: AiCheck[];
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "AI checks",
});

const columns = computed(
  () =>
    ({ 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2" })[
      props.checks.length
    ] ?? "",
);
</script>

<template>
  <div class="rounded-lg border border-purple-500/50 bg-purple-500/10 p-3">
    <p
      class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-300"
    >
      <SparklesIcon class="h-3.5 w-3.5" />
      {{ label }}
    </p>
    <ul :class="['grid gap-2', columns]">
      <li
        v-for="check in checks"
        :key="check.source"
        class="rounded-md border border-purple-500/25 bg-black/20 px-2.5 py-2"
      >
        <span class="flex items-center gap-1.5 text-xs text-purple-300">
          <component :is="check.icon" class="h-3.5 w-3.5 shrink-0" />
          {{ check.source }}
        </span>
        <span class="mt-1 block text-xs text-purple-100">
          {{ check.finding }}
        </span>
      </li>
    </ul>
  </div>
</template>
