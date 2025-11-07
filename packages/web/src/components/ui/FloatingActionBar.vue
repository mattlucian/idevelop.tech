<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

interface Props {
  colorScheme?: "cyan" | "emerald" | "purple";
}

const props = withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});

defineEmits<{
  "schedule-call": [];
}>();

const isVisible = ref(false);

const handleScroll = () => {
  // Show after scrolling 200px down
  isVisible.value = window.scrollY > 200;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const colorClasses = computed(() => ({
  gradient: {
    cyan: "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
    emerald:
      "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
    purple:
      "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
  }[props.colorScheme],
  shadow: {
    cyan: "hover:shadow-cyan-500/50",
    emerald: "hover:shadow-emerald-500/50",
    purple: "hover:shadow-purple-500/50",
  }[props.colorScheme],
  border: {
    cyan: "border-cyan-500/30",
    emerald: "border-emerald-500/30",
    purple: "border-purple-500/30",
  }[props.colorScheme],
}));
</script>

<template>
  <!-- Desktop: Top-right floating button -->
  <div
    class="hidden lg:block fixed top-24 right-6 z-40 transition-all duration-300"
    :class="{ 'opacity-0 pointer-events-none': !isVisible }"
  >
    <button
      @click="$emit('schedule-call')"
      :class="[
        'group px-6 py-3 bg-gradient-to-r text-white font-semibold rounded-full shadow-lg transition-all duration-200 flex items-center gap-2',
        colorClasses.gradient,
        colorClasses.shadow,
      ]"
    >
      <span>Schedule a Call</span>
      <svg
        class="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </button>
  </div>

  <!-- Mobile: Sticky bottom bar -->
  <div
    class="lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-300"
    :class="{ 'translate-y-full': !isVisible }"
  >
    <div
      :class="[
        'bg-slate-900/95 backdrop-blur-lg border-t px-4 py-3 shadow-lg',
        colorClasses.border,
      ]"
    >
      <button
        @click="$emit('schedule-call')"
        :class="[
          'w-full px-6 py-3 bg-gradient-to-r text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2',
          colorClasses.gradient,
        ]"
      >
        <span>Schedule a Call</span>
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
