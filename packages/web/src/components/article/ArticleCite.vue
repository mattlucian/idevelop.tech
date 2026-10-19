<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, ref, useId } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
import { articleSourcesKey } from "./articleSources";

interface Props {
  n: number;
}

const props = defineProps<Props>();

const sources = inject(articleSourcesKey, ref([]));
const source = computed(() => sources.value[props.n - 1]);

const popoverId = useId();
const open = ref(false);
const trigger = ref<HTMLButtonElement | null>(null);
const popover = ref<HTMLElement | null>(null);
const position = ref({ top: 0, left: 0 });

const GUTTER = 16;
const WIDTH = 320;

// Fixed positioning keeps the popover inside the viewport on narrow screens
const place = () => {
  const rect = trigger.value?.getBoundingClientRect();
  if (!rect) return;
  const width = Math.min(WIDTH, window.innerWidth - GUTTER * 2);
  const left = Math.min(
    Math.max(rect.left + rect.width / 2 - width / 2, GUTTER),
    window.innerWidth - width - GUTTER,
  );
  const height = popover.value?.offsetHeight ?? 0;
  const below = rect.bottom + 8;
  const fitsBelow = below + height <= window.innerHeight - GUTTER;
  const top = fitsBelow ? below : Math.max(rect.top - 8 - height, GUTTER);
  position.value = { top, left };
};

const onPointerDown = (event: PointerEvent) => {
  const target = event.target as Node;
  if (trigger.value?.contains(target) || popover.value?.contains(target)) {
    return;
  }
  close();
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    close();
    trigger.value?.focus();
  }
};

const listen = (on: boolean) => {
  if (on) {
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeydown);
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
  } else {
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKeydown);
    window.removeEventListener("scroll", place);
    window.removeEventListener("resize", place);
  }
};

const close = () => {
  if (!open.value) return;
  open.value = false;
  listen(false);
};

const toggle = async () => {
  if (open.value) {
    close();
    return;
  }
  place();
  open.value = true;
  listen(true);
  await nextTick();
  place();
};

onBeforeUnmount(() => listen(false));
</script>

<template>
  <sup class="ml-0.5">
    <router-link
      v-if="!source"
      :to="{ hash: `#source-${n}` }"
      class="text-cyan-400 no-underline hover:text-cyan-300"
      :aria-label="`Source ${n}`"
      >[{{ n }}]</router-link
    >
    <button
      v-else
      ref="trigger"
      type="button"
      class="cursor-pointer leading-none text-cyan-400 hover:text-cyan-300"
      :aria-label="`Source ${n}`"
      :aria-expanded="open"
      :aria-controls="popoverId"
      @click="toggle"
    >
      [{{ n }}]
    </button>
  </sup>
  <Teleport v-if="source" to="body">
    <div
      v-if="open"
      :id="popoverId"
      ref="popover"
      role="dialog"
      :aria-label="`Source ${n}`"
      class="fixed z-50 rounded-lg border border-slate-700 bg-[#1a1a1a] p-4 text-sm leading-relaxed shadow-xl shadow-black/50"
      :style="{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `min(${WIDTH}px, calc(100vw - ${GUTTER * 2}px))`,
      }"
    >
      <p class="text-xs font-semibold uppercase tracking-wider text-cyan-400">
        Source {{ n }}
      </p>
      <p class="mt-1.5 text-slate-200">{{ source.text }}</p>
      <ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        <li v-for="link in source.links" :key="link.href">
          <a
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
          >
            {{ link.label }}
            <ArrowTopRightOnSquareIcon class="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </Teleport>
</template>
