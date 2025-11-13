<script setup lang="ts">
import { useRouter } from "vue-router";
import { useServiceConfig } from "../composables/useServiceConfig";
import { useMeta } from "../composables/useMeta";
import TypewriterText from "../components/elements/interactive/TypewriterText.vue";
import GradientText from "../components/elements/GradientText.vue";
import ServiceCard from "../components/cards/ServiceCard.vue";
import PrimaryRouterLink from "../components/elements/buttons/PrimaryRouterLink.vue";
import { SITE } from "@/constants";

// Platform data
const platforms = [
  {
    name: "AWS",
    logo: "/images/platforms/aws-logo.png",
    description: "Cloud infrastructure and serverless architecture",
  },
  {
    name: "DataDog",
    logo: "/images/platforms/datadog-logo.png",
    description: "Application monitoring and observability",
  },
  {
    name: "Jira",
    logo: "/images/platforms/atlassian-logo.png",
    description: "Project management and agile workflows",
  },
  {
    name: "Flxpoint",
    logo: "/images/platforms/flxpoint-logo.webp",
    description: "Order and inventory management integrations",
    link: "/flxpoint-consulting",
  },
  {
    name: "Shopify",
    logo: "/images/platforms/shopify-logo.png",
    description: "Ecommerce platform development and customization",
  },
  {
    name: "GitHub",
    logo: "/images/platforms/github-logo.png",
    description: "Version control and collaborative development",
  },
];

const router = useRouter();

// Get service configuration from composable
const { serviceCards, expertisePhrases } = useServiceConfig();

const selectService = (serviceName: string) => {
  // Services with dedicated views
  if (serviceName === "integration") {
    router.push({ name: "integration-service" });
  } else if (serviceName === "tech-admin") {
    router.push({ name: "tech-admin-service" });
  } else if (serviceName === "ai-enablement") {
    router.push({ name: "ai-enablement-service" });
  } else if (serviceName === "ecommerce-ops") {
    router.push({ name: "ecommerce-ops-service" });
  } else if (serviceName === "web-design") {
    router.push({ name: "web-design-service" });
  } else if (serviceName === "cloud-consulting") {
    router.push({ name: "cloud-consulting-service" });
  } else {
    // Other services use the dynamic service detail page
    router.push({ name: "service-detail", params: { serviceId: serviceName } });
  }
};

// Set home page meta tags
useMeta({
  title: "I Develop Tech - Technical Consulting Services",
  description:
    "Expert technical consulting for cloud infrastructure, AI enablement, systems integration, eCommerce operations, and web design. Affordable, on-demand tech expertise without full-time costs.",
  ogTitle: "I Develop Tech - Technical Consulting Services",
  ogDescription:
    "Expert technical consulting for cloud infrastructure, AI enablement, systems integration, and more. Affordable, on-demand tech expertise.",
  ogUrl: `${SITE.url}/`,
  ogImage: SITE.ogImage,
});
</script>

<template>
  <main
    id="main-content"
    class="min-h-screen pt-20 bg-[#0a0a0a] text-white overflow-auto"
  >
    <div class="w-full">
      <div class="max-w-[1200px] mx-auto pt-6 pb-4">
        <div class="px-6">
          <!-- Services Header -->
          <div class="mb-12 text-center relative">
            <!-- Decorative background blur -->
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-cyan-500/5 blur-3xl rounded-full"
            />

            <div class="relative">
              <h1
                class="text-3xl md:text-4xl font-bold mb-5 leading-tight tracking-tight"
              >
                <span class="text-white">Complex Problems.</span
                ><br class="sm:hidden" />
                <GradientText tag="span"> Simple Solutions. </GradientText>
              </h1>

              <div
                class="text-sm sm:text-base md:text-lg text-gray-400 max-w-[95%] sm:max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1.5 mt-6 px-2 sm:px-0"
              >
                <span class="text-center sm:text-right sm:whitespace-nowrap"
                  >Get expert help with</span
                >
                <TypewriterText
                  :phrases="expertisePhrases"
                  :typing-speed="80"
                  :deleting-speed="40"
                  :pause-duration="2000"
                  class="text-cyan-400 font-semibold text-center sm:text-left"
                />
              </div>
            </div>
          </div>

          <!-- Service Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ServiceCard
              v-for="(service, index) in serviceCards"
              :key="service.name"
              :icon="service.icon"
              :label="service.label"
              :title="service.title"
              :tagline="service.tagline"
              :stats="service.stats"
              :tags="service.tags"
              :hero-image="service.heroImage"
              :loading="index === 0 ? 'eager' : 'lazy'"
              @click="selectService(service.name)"
            />
          </div>

          <!-- Platforms Section -->
          <div class="mt-16 mb-8">
            <div class="text-center mb-8">
              <h2
                class="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight tracking-tight"
              >
                Platforms & Tools
              </h2>
              <p class="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
                Experience across industry-leading platforms
              </p>
            </div>

            <!-- Platform Cards with Logos -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              <component
                :is="platform.link ? 'RouterLink' : 'div'"
                v-for="platform in platforms"
                :key="platform.name"
                :to="platform.link"
                class="bg-[#0f0f0f] border border-slate-700/30 rounded-lg p-6 hover:border-cyan-500/30 transition-colors group"
                :class="{ 'cursor-pointer': platform.link }"
              >
                <div class="flex flex-col gap-3">
                  <!-- Logo -->
                  <div class="h-10 flex items-center justify-center">
                    <picture>
                      <source
                        :srcset="platform.logo.replace(/\.(png|jpg)$/, '.webp')"
                        type="image/webp"
                      />
                      <img
                        :src="platform.logo"
                        :alt="platform.name"
                        width="140"
                        height="40"
                        class="max-h-full max-w-[140px] w-auto object-contain"
                      />
                    </picture>
                  </div>
                  <!-- Description -->
                  <p class="text-xs text-gray-400 text-center">
                    {{ platform.description }}
                  </p>
                </div>
              </component>
            </div>
          </div>

          <!-- Call to Action Section -->
          <div class="mt-16 mb-8">
            <div
              class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <!-- CTA Text -->
              <div class="text-center">
                <h2
                  class="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight"
                >
                  Start Here.
                </h2>
              </div>

              <!-- CTA Button -->
              <div class="flex-shrink-0">
                <PrimaryRouterLink to="/hire-me">
                  Get in touch
                </PrimaryRouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
