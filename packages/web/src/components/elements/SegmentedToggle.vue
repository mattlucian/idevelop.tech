<script setup lang="ts" generic="T extends string">
interface Props {
  options: { value: T; label: string }[];
  label: string;
  color?: "cyan" | "purple";
}

withDefaults(defineProps<Props>(), {
  color: "cyan",
});

const model = defineModel<T>({ required: true });

const activeClasses = {
  cyan: "bg-cyan-500/20 text-cyan-200",
  purple: "bg-purple-500/20 text-purple-200",
};
</script>

<template>
  <div
    class="flex w-fit rounded-full border border-slate-700 bg-slate-900/60 p-0.5"
    role="group"
    :aria-label="label"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="model === option.value"
      :class="[
        'rounded-full px-3 py-1 transition-colors',
        model === option.value
          ? activeClasses[color]
          : 'text-slate-400 hover:text-white',
      ]"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>
