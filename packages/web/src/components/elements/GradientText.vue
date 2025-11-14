<script setup lang="ts">
interface Props {
  /** Text content to display with gradient */
  text?: string;
  /** HTML tag to render (h1, h2, h3, span, etc.) */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  /** Additional CSS classes to apply */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: "span",
  class: "",
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      'text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-cyan-300 via-30% to-purple-400',
      props.class,
    ]"
  >
    <slot>{{ text }}</slot>
  </component>
</template>
