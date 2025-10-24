<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useServiceConfig } from '../composables/useServiceConfig'
import { useMeta } from '../composables/useMeta'
import TypewriterText from '../components/elements/interactive/TypewriterText.vue'
import ServiceCard from '../components/cards/ServiceCard.vue'
import SecondaryButton from '../components/elements/buttons/SecondaryButton.vue'

const router = useRouter()

// Get service configuration from composable
const { serviceCards, expertisePhrases } = useServiceConfig()

const selectService = (serviceName: string) => {
  // Navigate to service detail page
  router.push({ name: 'service-detail', params: { serviceId: serviceName } })
}

// Set home page meta tags
useMeta({
  title: 'I Develop Tech - Technical Consulting Services',
  description:
    'Expert technical consulting for cloud infrastructure, AI enablement, systems integration, eCommerce operations, and web design. Affordable, on-demand tech expertise without full-time costs.',
  ogTitle: 'I Develop Tech - Technical Consulting Services',
  ogDescription:
    'Expert technical consulting for cloud infrastructure, AI enablement, systems integration, and more. Affordable, on-demand tech expertise.',
  ogUrl: 'https://idevelop.tech/',
  ogImage: 'https://idevelop.tech/images/brand/og-image.png',
})
</script>

<template>
  <div class="min-h-screen pt-20 bg-[#0a0a0a] text-white overflow-auto">
    <div class="w-full">
      <div class="max-w-[1200px] mx-auto pt-6 pb-4">
        <div class="px-6">
          <!-- Services Header -->
          <div class="mb-12 text-center relative">
            <!-- Decorative background blur -->
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-cyan-500/5 blur-3xl rounded-full"
            ></div>

            <div class="relative">
              <h1 class="text-3xl md:text-4xl font-bold mb-5 leading-tight tracking-tight">
                <span class="text-white">Complex Problems.</span><br class="sm:hidden" />
                <span
                  class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400"
                >
                  Simple Solutions.
                </span>
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
              v-for="service in serviceCards"
              :key="service.name"
              :icon="service.icon"
              :label="service.label"
              :title="service.title"
              :tagline="service.tagline"
              :stats="service.stats"
              :tags="service.tags"
              :hero-image="service.heroImage"
              @click="selectService(service.name)"
            />
          </div>

          <!-- Call to Action Section -->
          <div class="mt-16 mb-8">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <!-- CTA Text -->
              <div class="text-center">
                <h2 class="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
                  No obligations.
                </h2>
              </div>

              <!-- CTA Button -->
              <div class="flex-shrink-0">
                <router-link to="/hire-me">
                  <SecondaryButton> Get in touch → </SecondaryButton>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
