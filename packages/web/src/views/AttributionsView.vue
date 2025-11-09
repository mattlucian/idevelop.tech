<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white pt-16">
    <div class="w-full max-w-[1200px] mx-auto px-6 py-12">
      <!-- Header -->
      <div class="mb-12">
        <h1
          class="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Image Attributions
        </h1>
        <p class="text-lg text-gray-400 max-w-3xl">
          We use beautiful images from talented photographers on Unsplash. All
          images are used under the
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            class="text-teal-400 hover:text-teal-300 underline"
          >
            Unsplash License </a>.
        </p>
      </div>

      <!-- Services Section -->
      <section class="mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">
          Service Images
        </h2>
        <div class="grid gap-6 sm:grid-cols-2">
          <AttributionCard
            v-for="(attribution, index) in attributions"
            :key="index"
            :title="attribution.title"
            :image-url="attribution.imageUrl"
            :image-alt="attribution.imageAlt"
            :description="attribution.description"
            :photographer="attribution.photographer"
            :photographer-url="attribution.photographerUrl"
            :photo-url="attribution.photoUrl"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMeta } from "../composables/useMeta";
import AttributionCard from "../components/cards/AttributionCard.vue";
import type { Attribution } from "../types/attribution";
import { SITE } from "@/constants";

// Set meta tags for Attributions page
useMeta({
  title: "Image Attributions - I Develop Tech",
  description:
    "Image credits and attributions for beautiful photography from talented Unsplash photographers used throughout the I Develop Tech website.",
  ogTitle: "Image Attributions - I Develop Tech",
  ogDescription:
    "Photography credits and attributions for images used on idevelop.tech",
  ogUrl: `${SITE.url}/attributions`,
  ogImage: SITE.ogImage,
});

// Attribution data
const attributions: Attribution[] = [
  {
    title: "Web Design",
    imageUrl: "https://images.unsplash.com/photo-1542744173-b3cd6377db95",
    imageAlt: "Silver iMac displaying design work",
    description: "Silver iMac displaying design work on screen",
    photographer: "Tran Mau Tri Tam ✪",
    photographerUrl:
      "https://unsplash.com/@tranmautritam?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    photoUrl:
      "https://unsplash.com/photos/a-desk-with-two-computer-monitors-and-a-keyboard-pd-Hekt6naQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    title: "Tech Admin",
    imageUrl: "https://images.unsplash.com/photo-1581089781785-603411fa81e5",
    imageAlt: "Woman working at computer monitor",
    description:
      "Woman working at computer monitor - technical administration workspace",
    photographer: "ThisisEngineering",
    photographerUrl:
      "https://unsplash.com/@thisisengineering?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    photoUrl:
      "https://unsplash.com/photos/woman-sitting-on-black-office-rolling-chair-in-front-of-computer-monitor-yhCHx8Mc-Kc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    title: "Integration Services",
    imageUrl: "https://images.unsplash.com/photo-1707733260992-73ff6dbed163",
    imageAlt: "Phone connected to devices",
    description:
      "Phone connected to devices - representing seamless system integration",
    photographer: "Jakub Żerdzicki",
    photographerUrl:
      "https://unsplash.com/@jakubzerdzicki?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    photoUrl:
      "https://unsplash.com/photos/a-cell-phone-is-connected-to-a-light-switch-We56jns_zLE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    title: "Cloud Computing Consultations",
    imageUrl: "https://images.unsplash.com/photo-1619410283995-43d9134e7656",
    imageAlt: "Code displayed on computer monitor",
    description:
      "Code displayed on computer monitor - cloud infrastructure workspace",
    photographer: "Juanjo Jaramillo",
    photographerUrl:
      "https://unsplash.com/@juanjodev02?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    photoUrl:
      "https://unsplash.com/photos/black-flat-screen-computer-monitor-mZnx9429i94?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    title: "AI Enablement",
    imageUrl: "https://images.unsplash.com/photo-1718241905559-f76f2718ddc1",
    imageAlt: "AI/technology visualization",
    description:
      "AI/technology visualization representing artificial intelligence integration",
    photographer: "BoliviaInteligente",
    photographerUrl:
      "https://unsplash.com/@boliviainteligente?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    photoUrl:
      "https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-aGZSbHGz6F0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    title: "eCommerce Operations",
    imageUrl: "https://images.unsplash.com/photo-1664455340023-214c33a9d0bd",
    imageAlt: "Shopping cart",
    description:
      "Shopping cart representing eCommerce operations and online store management",
    photographer: "Shutter Speed",
    photographerUrl:
      "https://unsplash.com/@shutter_speed_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    photoUrl:
      "https://unsplash.com/photos/a-toy-shopping-cart-BQ9usyzHx_w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
];
</script>
