<script setup lang="ts">
import PrimaryButton from "../elements/buttons/PrimaryButton.vue";
import { SCHEDULING_LINK } from "@/constants";

interface Props {
  title: string;
  subtitle: string;
  buttonText: string;
  colorScheme?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

const handleClick = () => {
  window.open(SCHEDULING_LINK, "_blank", "noopener,noreferrer");
};

const colorClasses = {
  cyan: {
    gradient: "from-cyan-950/30 to-purple-950/20",
    border: "border-cyan-900/30",
  },
  emerald: {
    gradient: "from-emerald-950/30 to-cyan-950/20",
    border: "border-emerald-900/30",
  },
  purple: {
    gradient: "from-purple-950/30 to-pink-950/20",
    border: "border-purple-900/30",
  },
};
</script>

<template>
  <div
    :class="[
      'bg-gradient-to-br border-y',
      colorClasses[colorScheme].gradient,
      colorClasses[colorScheme].border,
    ]"
  >
    <div class="max-w-5xl mx-auto px-6 py-20">
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
        <div class="flex justify-center">
          <PrimaryButton size="lg" :color="colorScheme" @click="handleClick">
            <span class="text-lg">📅 {{ buttonText }}</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>
