<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMeta } from "../composables/useMeta";
import PrimaryButton from "../components/elements/buttons/PrimaryButton.vue";
import GradientText from "../components/elements/GradientText.vue";
import { SITE } from "@/constants";

const router = useRouter();

// Set 404 page meta tags
useMeta({
  title: "404 - Page Not Found | I Develop Tech",
  description: "The page you are looking for does not exist.",
  ogTitle: "404 - Page Not Found | I Develop Tech",
  ogDescription: "The page you are looking for does not exist.",
  ogUrl: `${SITE.url}/404`,
  ogImage: SITE.ogImage,
});

const goHome = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <div
    class="min-h-screen pt-20 bg-[#0a0a0a] text-white flex items-center justify-center"
  >
    <div class="max-w-2xl mx-auto px-6 text-center">
      <!-- 404 Number -->
      <div class="mb-8">
        <h1 class="text-8xl md:text-9xl font-bold mb-4">
          <GradientText
            text="404"
            from="from-cyan-400"
            via="via-cyan-300"
            to="to-purple-400"
          />
        </h1>
      </div>

      <!-- Error Message -->
      <div class="mb-12">
        <h2 class="text-2xl md:text-3xl font-bold mb-4 text-white">
          Page Not Found
        </h2>
        <p class="text-base md:text-lg text-gray-400 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <!-- CTA Button -->
      <div class="flex justify-center">
        <PrimaryButton
          color-scheme="cyan"
          @click="goHome"
        >
          Go to Home
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>
