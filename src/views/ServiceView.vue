<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useServiceData } from '../composables/useServiceData'
import { useServiceConfig } from '../composables/useServiceConfig'
import { useMeta } from '../composables/useMeta'
import PanelSidebar from '../components/ui/PanelSidebar.vue'
import PanelContent from '../components/ui/PanelContent.vue'
import PanelMobile from '../components/ui/PanelMobile.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import SectionClickable from '../components/ui/SectionClickable.vue'
import TestimonialCard from '../components/cards/TestimonialCard.vue'
import PortfolioItem from '../components/cards/PortfolioItem.vue'
import DefaultTheme from '../components/themes/DefaultTheme.vue'
import ProcessTheme from '../components/themes/ProcessTheme.vue'
import OverviewTheme from '../components/themes/OverviewTheme.vue'
import OptionsTheme from '../components/themes/OptionsTheme.vue'

const route = useRoute()
const router = useRouter()

// Get service ID from route params
const serviceId = computed(() => route.params.serviceId as string)

// Load service data using composable
const { serviceData, loadServiceData } = useServiceData()
const { serviceCards } = useServiceConfig()

// Section selection
const selectedSectionIndex = ref(-1)
const contentPanelRef = ref<InstanceType<typeof PanelContent> | null>(null)

const selectedSection = computed(() => {
  if (!serviceData.value || selectedSectionIndex.value === -1) return null
  return serviceData.value.sections[selectedSectionIndex.value]
})

// Dynamic theme component mapping
const themeComponents: Record<string, Component> = {
  default: DefaultTheme,
  process: ProcessTheme,
  overview: OverviewTheme,
  options: OptionsTheme,
}

const currentThemeComponent = computed(() => {
  if (!selectedSection.value) return DefaultTheme
  const theme = selectedSection.value.theme || 'default'
  return themeComponents[theme] || DefaultTheme
})

const selectSection = async (sectionIndex: number) => {
  selectedSectionIndex.value = sectionIndex

  // Scroll the content panel to top
  await nextTick()
  if (contentPanelRef.value) {
    contentPanelRef.value.scrollToTop()
  }
}

const goBack = () => {
  router.push({ name: 'home' })
}

const goBackToSections = () => {
  // Clear section selection to return to sections list (used on mobile)
  selectedSectionIndex.value = -1
}

// Load service data on mount and when serviceId changes
watch(
  serviceId,
  async (newServiceId) => {
    if (newServiceId) {
      await loadServiceData(newServiceId)

      // Auto-select first section on desktop/tablet (1024px+)
      if (window.innerWidth >= 1024) {
        selectedSectionIndex.value = 0
      } else {
        selectedSectionIndex.value = -1
      }
    }
  },
  { immediate: true },
)

// Update meta tags based on service data
watch(serviceData, (data) => {
  if (data && serviceId.value) {
    const serviceCard = serviceCards.find((s) => s.name === serviceId.value)
    const title = `${data.title} - I Develop Tech`
    const description = data.tagline || data.overview || 'Expert technical consulting services'

    useMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogUrl: `https://idevelop.tech/services/${serviceId.value}`,
      ogImage: serviceCard?.heroImage || 'https://idevelop.tech/images/brand/og-image.png',
    })
  }
})

// Lock body scroll when component is mounted
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

// Re-enable body scroll when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <div v-if="serviceData" class="w-full">
      <!-- Background overlay - clickable to close -->
      <div class="fixed inset-0 top-16 bg-[#0a0a0a] z-10 cursor-pointer" @click="goBack"></div>

      <!-- Section List Sidebar (slides from left) -->
      <Transition name="slide-left">
        <PanelSidebar
          v-if="serviceData"
          color-scheme="cyan"
          :hide-on-mobile="selectedSectionIndex !== -1"
          @close="goBack"
        >
          <template #header>
            <h1 class="text-lg sm:text-xl lg:text-3xl font-bold text-white leading-none">
              {{ serviceData.title }}
            </h1>
            <p class="text-sm text-gray-400 mt-2">{{ serviceData.tagline }}</p>
          </template>

          <!-- Overview Section - Clickable -->
          <button
            @click="selectSection(0)"
            :class="[
              'w-full text-left relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-xl p-5 overflow-hidden transition-all border-2',
              selectedSectionIndex === 0
                ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
                : 'border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-md hover:shadow-cyan-500/10',
            ]"
          >
            <!-- Decorative corner accent -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full"></div>

            <div class="relative">
              <div class="flex items-center gap-2 mb-3">
                <svg
                  class="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 class="text-base font-bold text-cyan-400 uppercase tracking-wider">Overview</h3>
              </div>
              <p class="text-base text-gray-200 leading-relaxed">{{ serviceData.overview }}</p>
            </div>
          </button>

          <!-- Service Sections -->
          <div>
            <SectionHeader
              class="mt-6"
              title="Details"
              icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              color-scheme="cyan"
            />
            <div class="space-y-2">
              <SectionClickable
                v-for="(section, sectionIndex) in serviceData.sections.slice(1)"
                :key="sectionIndex"
                :section-number="sectionIndex + 1"
                :heading="section.heading"
                :is-selected="selectedSectionIndex === sectionIndex + 1"
                color-scheme="cyan"
                @click="selectSection(sectionIndex + 1)"
              />
            </div>
          </div>

          <!-- Testimonial -->
          <TestimonialCard
            v-if="serviceData.testimonial"
            :testimonial="serviceData.testimonial"
            color-scheme="cyan"
            class="mt-6"
          />

          <!-- Portfolio Items -->
          <div
            v-if="serviceData.portfolioItems && serviceData.portfolioItems.length > 0"
            class="mt-6"
          >
            <SectionHeader
              title="Recent Work"
              icon="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              color-scheme="cyan"
            />
            <div class="space-y-3">
              <PortfolioItem
                v-for="(item, index) in serviceData.portfolioItems"
                :key="index"
                :item="item"
                color-scheme="cyan"
              />
            </div>
          </div>
        </PanelSidebar>
      </Transition>

      <!-- Content Panel (slides from right) -->
      <Transition name="slide-right">
        <PanelContent
          v-if="selectedSection"
          ref="contentPanelRef"
          color-scheme="cyan"
          header-style="decorative"
          @close="goBack"
        >
          <template #header>
            <h2
              class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyan-400"
            >
              {{ selectedSection.heading }}
            </h2>
          </template>

          <!-- Dynamic Theme Component -->
          <component
            :is="currentThemeComponent"
            :section="selectedSection"
            :service-data="serviceData"
          />
        </PanelContent>
      </Transition>

      <!-- Mobile/Tablet Content Modal (full-screen) -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <PanelMobile
          v-if="selectedSection && serviceData"
          color-scheme="cyan"
          @close="goBackToSections"
        >
          <template #header>
            <div class="mb-1">
              <span
                class="text-[10px] font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                >{{ serviceData.title }}</span
              >
            </div>
            <h2 class="text-lg font-bold text-white">{{ selectedSection.heading }}</h2>
          </template>

          <!-- Dynamic Theme Component (same as desktop) -->
          <component
            :is="currentThemeComponent"
            :section="selectedSection"
            :service-data="serviceData"
          />
        </PanelMobile>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Slide from left transition */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease-out;
}

.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide from right transition */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-out;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
