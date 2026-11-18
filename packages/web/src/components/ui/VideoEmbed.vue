<script setup lang="ts">
import { computed, ref } from "vue";
import { PlayIcon } from "@heroicons/vue/24/solid";

interface Props {
  videoId: string;
  title: string;
  thumbnail: string;
  thumbnailWebp?: string;
}

const props = withDefaults(defineProps<Props>(), {
  thumbnailWebp: undefined,
});

// The YouTube player loads only after a click, so nothing is requested from
// YouTube on page load (privacy policy and CSP frame-src rely on this).
const startAt = ref<number | null>(null);

const src = computed(() =>
  startAt.value === null
    ? ""
    : `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&rel=0&start=${startAt.value}`,
);

const play = (seconds = 0): void => {
  startAt.value = Math.max(0, Math.floor(seconds));
};

defineExpose({ play });
</script>

<template>
  <div>
    <div
      class="relative aspect-video overflow-hidden rounded-xl border border-slate-700/50 bg-[#0a0a0a]"
    >
      <iframe
        v-if="src"
        :key="src"
        :src="src"
        :title="title"
        class="absolute inset-0 h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      />
      <button
        v-else
        type="button"
        class="group absolute inset-0 h-full w-full cursor-pointer"
        :aria-label="`Play video: ${title}`"
        @click="play()"
      >
        <picture>
          <source
            v-if="thumbnailWebp"
            :srcset="thumbnailWebp"
            type="image/webp"
          />
          <img
            :src="thumbnail"
            alt=""
            width="1280"
            height="720"
            loading="lazy"
            class="h-full w-full object-cover transition-opacity group-hover:opacity-90"
          />
        </picture>
        <span
          class="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-purple-500 shadow-lg transition-transform group-hover:scale-110"
        >
          <PlayIcon class="ml-1 h-7 w-7 text-white" />
        </span>
      </button>
    </div>
  </div>
</template>
