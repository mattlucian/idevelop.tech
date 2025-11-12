<script setup lang="ts">
interface ServiceAreaItem {
  title: string;
  description: string;
}

interface Props {
  icon: string;
  title: string;
  description: string;
  items: ServiceAreaItem[];
  colorScheme?: "cyan" | "emerald";
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

const iconColorClass =
  props.colorScheme === "emerald" ? "text-emerald-400" : "text-cyan-400";
</script>

<template>
  <div
    class="bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-700/30 rounded-xl p-6 md:p-8 h-full"
  >
    <!-- Icon and Title -->
    <div class="flex items-start gap-4 mb-4">
      <div
        :class="[
          'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
          colorScheme === 'emerald' ? 'bg-emerald-500/10' : 'bg-cyan-500/10',
        ]"
      >
        <svg
          :class="iconColorClass"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="icon"
          />
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="text-lg md:text-xl font-semibold text-white mb-2">
          {{ title }}
        </h3>
        <p class="text-xs md:text-sm text-slate-300">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Service Items -->
    <div class="space-y-4 mt-6">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="border-l-2 pl-4"
        :class="[
          colorScheme === 'emerald'
            ? 'border-emerald-500/30'
            : 'border-cyan-500/30',
        ]"
      >
        <h4 class="text-sm md:text-base font-medium text-white mb-1">
          {{ item.title }}
        </h4>
        <p class="text-xs md:text-sm text-slate-400">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
