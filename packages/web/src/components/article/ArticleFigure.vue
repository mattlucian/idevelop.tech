<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  caption?: string;
  /** Show the "AI step" legend for diagrams that highlight AI steps */
  aiLegend?: boolean;
}

withDefaults(defineProps<Props>(), {
  subtitle: undefined,
  caption: undefined,
  aiLegend: false,
});
</script>

<template>
  <figure
    class="not-prose my-10 rounded-xl border border-slate-800 bg-[#0f0f0f] p-4 md:p-6"
  >
    <div class="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-white md:text-base">
          {{ title }}
        </p>
        <p v-if="subtitle" class="mt-1 text-xs text-slate-400">
          {{ subtitle }}
        </p>
      </div>
      <span
        v-if="aiLegend"
        class="flex shrink-0 items-center gap-2 text-xs text-slate-400"
      >
        <span
          class="h-3 w-3 rounded-sm border border-purple-500/60 bg-purple-500/20"
        />
        AI step
      </span>
    </div>
    <slot />
    <figcaption v-if="caption" class="mt-5 text-xs text-slate-500">
      {{ caption }}
    </figcaption>
  </figure>
</template>
