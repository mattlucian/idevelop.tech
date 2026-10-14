<script setup lang="ts">
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/outline";
import type { McpRequestPattern } from "@/types/service";
import ContentSection from "../ui/ContentSection.vue";

interface Props {
  patterns: McpRequestPattern[];
}

defineProps<Props>();

const patternColors = {
  cyan: { text: "text-cyan-400", border: "border-cyan-500/30" },
  purple: { text: "text-purple-400", border: "border-purple-500/30" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/30" },
};
</script>

<template>
  <ContentSection
    banded
    title="Optimized for AI"
    subtitle="For large data sets, the heavy work runs on your server, so agents get small, useful answers. Examples:"
  >
    <div class="space-y-6">
      <div
        v-for="pattern in patterns"
        :key="pattern.name"
        :class="[
          'grid md:grid-cols-5 gap-6 rounded-lg border bg-[#0f0f0f] p-6',
          patternColors[pattern.color].border,
        ]"
      >
        <div class="md:col-span-2">
          <h3
            :class="[
              'text-xl font-semibold mb-3',
              patternColors[pattern.color].text,
            ]"
          >
            {{ pattern.name }}
          </h3>
          <p class="text-white italic mb-4">"{{ pattern.question }}"</p>
          <div class="space-y-2 text-sm">
            <div class="flex items-start gap-2 text-slate-500">
              <XMarkIcon class="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <span
                ><span class="sr-only">Instead of: </span
                >{{ pattern.insteadOf }}</span
              >
            </div>
            <div class="flex items-start gap-2 text-slate-200">
              <CheckIcon
                :class="[
                  'mt-0.5 h-4 w-4 shrink-0',
                  patternColors[pattern.color].text,
                ]"
              />
              <span
                ><span class="sr-only">Result: </span>{{ pattern.result }}</span
              >
            </div>
          </div>
        </div>
        <pre
          class="md:col-span-3 overflow-x-auto rounded-md bg-[#0a0a0a] border border-slate-800 p-4 text-xs md:text-sm text-slate-300 font-mono"
        ><code>{{ pattern.code }}</code></pre>
      </div>
    </div>
  </ContentSection>
</template>
