<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import OutlineButton from "../elements/buttons/OutlineButton.vue";
import OutlineRouterLink from "../elements/buttons/OutlineRouterLink.vue";

const route = useRoute();
const router = useRouter();
const isMobileMenuOpen = ref(false);

const isTechPage = computed(
  () =>
    route.name === "tech" ||
    route.path.startsWith("/tech") ||
    route.name === "components" ||
    route.name === "attributions",
);
const isHireMePage = computed(() => route.name === "hire-me");

const handleBackNavigation = () => {
  if (isHireMePage.value) {
    router.push("/");
  } else if (isTechPage.value) {
    router.push("/hire-me");
  } else {
    router.back();
  }
  isMobileMenuOpen.value = false;
};

const handleKeepBrowsing = () => {
  router.go(-2); // Go back twice to make /tech feel like a modal
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]">
    <div class="w-full px-6 h-16 flex items-center justify-center relative">
      <div
        class="w-full max-w-[1200px] flex items-center justify-between relative"
      >
        <!-- Logo (always visible) -->
        <router-link
          to="/"
          class="flex items-center hover:opacity-80 transition-opacity -ml-1"
        >
          <img
            src="/images/brand/logo-black.png"
            alt="idevelop.tech"
            class="h-8 transition-all duration-300"
            :style="
              isTechPage
                ? 'filter: brightness(0) saturate(100%) invert(68%) sepia(55%) saturate(450%) hue-rotate(95deg) brightness(95%) contrast(90%);'
                : 'filter: brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(500%) hue-rotate(130deg) brightness(100%) contrast(90%);'
            "
          />
        </router-link>

        <!-- Spacer -->
        <div class="flex-1" />

        <!-- Hamburger Menu Button (Mobile) -->
        <button
          class="sm:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-400 hover:text-teal-400 transition-colors"
          aria-label="Menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Page-specific navigation (Desktop) -->
        <div
          class="hidden sm:flex items-center gap-3"
          :class="{ 'mr-4': !isHireMePage && !isTechPage }"
        >
          <!-- Tech page: Keep Browsing only (emerald) -->
          <OutlineButton
            v-if="isTechPage"
            color-scheme="emerald"
            @click="handleKeepBrowsing"
          >
            Keep browsing
          </OutlineButton>

          <!-- Hire Me page: Keep browsing button -->
          <OutlineButton
            v-else-if="isHireMePage"
            color-scheme="cyan"
            @click="router.push('/')"
          >
            Keep browsing
          </OutlineButton>
        </div>

        <!-- Hire Me Button (Desktop) - hidden on hire-me and tech pages -->
        <OutlineRouterLink
          v-if="!isHireMePage && !isTechPage"
          to="/hire-me"
          color-scheme="cyan"
          class="hidden sm:block"
        >
          Hire Me
        </OutlineRouterLink>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="sm:hidden absolute top-16 left-0 right-0 bg-[#0a0a0a] border-b border-[#333333] shadow-lg"
      >
        <div class="px-6 py-4 space-y-3">
          <!-- Tech page: Keep Browsing only -->
          <OutlineButton
            v-if="isTechPage"
            color-scheme="emerald"
            :full-width="true"
            @click="handleKeepBrowsing"
          >
            Keep Browsing
          </OutlineButton>

          <!-- Hire Me page: Keep browsing -->
          <OutlineButton
            v-else-if="isHireMePage"
            color-scheme="cyan"
            :full-width="true"
            @click="
              router.push('/');
              isMobileMenuOpen = false;
            "
          >
            Keep browsing
          </OutlineButton>

          <!-- Hire Me Button - hidden on hire-me and tech pages -->
          <OutlineRouterLink
            v-if="!isHireMePage && !isTechPage"
            to="/hire-me"
            color-scheme="cyan"
            :full-width="true"
            @click="isMobileMenuOpen = false"
          >
            Hire Me
          </OutlineRouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
