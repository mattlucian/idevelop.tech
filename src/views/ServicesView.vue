<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ServiceContent } from '../types/service'
import TypewriterText from '../components/TypewriterText.vue'

const route = useRoute()
const router = useRouter()

// Dynamic typewriter phrases for subheading (similar length to "Get expert help with")
const expertisePhrases = [
  'managing your tech stack',
  'integrating your systems',
  'AI training & adoption',
  'eCommerce automation',
  'building your website',
  'cloud infrastructure'
]

interface ServiceCard {
  name: string
  path: string
  icon: string
  label: string
  title: string
  tagline: string
  stats: { value: string; label: string }[]
  tags: string[]
  borderColor: string
  bgColor: string
  visualStyle: 'hero-pattern' | 'image-hero' | 'gradient-mesh' | 'minimalist-icon'
  heroImage?: string
}

// Service cards configuration
const serviceCards: ServiceCard[] = [
  {
    name: 'tech-admin',
    path: 'tech-admin.json',
    icon: '🔧',
    label: 'Tech Admin',
    title: 'Tech Admin',
    tagline: 'Expert tech guidance without the full-time cost',
    stats: [
      { value: 'Expert', label: 'On Retainer' },
      { value: 'Affordable', label: 'Access' },
      { value: 'Quick', label: 'Implementation' }
    ],
    tags: ['Tech Support', 'Documentation', 'Automation'],
    borderColor: 'border-l-cyan-600 hover:border-l-cyan-500',
    bgColor: 'bg-cyan-500/10',
    visualStyle: 'minimalist-icon',
    heroImage: 'https://images.unsplash.com/photo-1581089781785-603411fa81e5?w=800&auto=format&fit=crop&q=80' // Woman working at computer (ThisisEngineering)
  },
  {
    name: 'integration',
    path: 'integration.json',
    icon: '🔗',
    label: 'Integration',
    title: 'Integration Services',
    tagline: 'Connect your systems and eliminate manual data entry',
    stats: [
      { value: 'Seamless', label: 'Connectivity' },
      { value: 'Automated', label: 'Data Flow' },
      { value: 'Custom', label: 'Solutions' }
    ],
    tags: ['API', 'Data Sync', 'Data Mapping'],
    borderColor: 'border-l-cyan-500 hover:border-l-cyan-400',
    bgColor: 'bg-cyan-500/10',
    visualStyle: 'minimalist-icon',
    heroImage: 'https://images.unsplash.com/photo-1707733260992-73ff6dbed163?w=800&auto=format&fit=crop&q=80' // Phone connected to devices (Jakub Żerdzicki)
  },
  {
    name: 'ai-enablement',
    path: 'ai.json',
    icon: '🤖',
    label: 'AI Enablement',
    title: 'AI Enablement',
    tagline: 'Empower your team with practical AI training and implementation',
    stats: [
      { value: 'Hands-on', label: 'Workshops' },
      { value: 'Workflow', label: 'Analysis' },
      { value: 'Practical', label: 'Implementation' }
    ],
    tags: ['AI Training', 'Team Workshops', 'Process Improvement', 'AI Tools'],
    borderColor: 'border-l-purple-400 hover:border-l-purple-300',
    bgColor: 'bg-purple-400/10',
    visualStyle: 'minimalist-icon',
    heroImage: 'https://images.unsplash.com/photo-1718241905559-f76f2718ddc1?w=800&auto=format&fit=crop&q=80' // AI/Tech visualization (BoliviaInteligente)
  },
  {
    name: 'ecommerce-ops',
    path: 'ecommerce.json',
    icon: '🛒',
    label: 'eCommerce Ops',
    title: 'eCommerce Operations',
    tagline: 'Automate and optimize your online store systems',
    stats: [
      { value: 'Automated', label: 'Workflows' },
      { value: 'Distributed', label: 'Ordering' },
      { value: 'Synced', label: 'Inventory' }
    ],
    tags: ['Automation', 'Order Routing', 'Inventory Sync', 'App Integration'],
    borderColor: 'border-l-green-400 hover:border-l-green-300',
    bgColor: 'bg-green-400/10',
    visualStyle: 'minimalist-icon',
    heroImage: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?w=800&auto=format&fit=crop&q=80' // Shopping cart (Shutter Speed)
  },
  {
    name: 'web-design',
    path: 'web-design.json',
    icon: '🎨',
    label: 'Web Design',
    title: 'Web Design',
    tagline: 'Professional websites that drive real business results',
    stats: [
      { value: 'Custom', label: 'Design' },
      { value: 'Conversion', label: 'Focused' },
      { value: 'Mobile', label: 'Optimized' }
    ],
    tags: ['Shopify', 'WordPress', 'UX/UI'],
    borderColor: 'border-l-cyan-400 hover:border-l-cyan-300',
    bgColor: 'bg-cyan-400/10',
    visualStyle: 'minimalist-icon',
    heroImage: 'https://images.unsplash.com/photo-1542744173-b3cd6377db95?w=800&auto=format&fit=crop&q=80' // Silver iMac with design work (Tran Mau Tri Tam)
  },
  {
    name: 'cloud-consulting',
    path: 'cloud-consulting.json',
    icon: '☁️',
    label: 'Cloud Consulting',
    title: 'Cloud Computing Consultations',
    tagline: 'Expert cloud guidance for your business without enterprise costs',
    stats: [
      { value: 'AWS', label: 'Expert' },
      { value: 'Cost', label: 'Optimized' },
      { value: 'Scalable', label: 'Solutions' }
    ],
    tags: ['AWS', 'Migration', 'Cost Optimization'],
    borderColor: 'border-l-cyan-300 hover:border-l-cyan-200',
    bgColor: 'bg-cyan-300/10',
    visualStyle: 'minimalist-icon',
    heroImage: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&auto=format&fit=crop&q=80' // Code on monitor screen (Juanjo Jaramillo)
  }
]

const selectedServiceName = ref<string | null>(null)
const serviceData = ref<ServiceContent | null>(null)
const selectedSectionIndex = ref(-1)
const contentPanelRef = ref<HTMLElement | null>(null)

const selectedSection = computed(() => {
  if (!serviceData.value || selectedSectionIndex.value === -1) return null
  return serviceData.value.sections[selectedSectionIndex.value]
})

// Load service data
const loadServiceData = async (serviceName: string) => {
  try {
    let module
    const service = serviceCards.find(s => s.name === serviceName)
    if (!service) return

    switch (service.path) {
      case 'tech-admin.json':
        module = await import('../data/services/tech-admin.json?raw')
        break
      case 'integration.json':
        module = await import('../data/services/integration.json?raw')
        break
      case 'ai.json':
        module = await import('../data/services/ai.json?raw')
        break
      case 'ecommerce.json':
        module = await import('../data/services/ecommerce.json?raw')
        break
      case 'web-design.json':
        module = await import('../data/services/web-design.json?raw')
        break
      case 'cloud-consulting.json':
        module = await import('../data/services/cloud-consulting.json?raw')
        break
      default:
        console.error(`Unknown data file: ${service.path}`)
        return
    }

    serviceData.value = JSON.parse(module.default)

    // Auto-select first section on desktop/tablet (1024px+)
    if (window.innerWidth >= 1024) {
      selectedSectionIndex.value = 0
    } else {
      selectedSectionIndex.value = -1
    }
  } catch (error) {
    console.error(`Error loading service data:`, error)
  }
}

const selectService = async (serviceName: string) => {
  // Update URL when selecting a service
  router.push({ name: 'home', query: { service: serviceName } })
}

const selectSection = async (sectionIndex: number) => {
  selectedSectionIndex.value = sectionIndex

  // Scroll the content panel to top
  await nextTick()
  if (contentPanelRef.value) {
    contentPanelRef.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const goBack = () => {
  // Navigate back to home page without query params
  router.push({ name: 'home' })
}

const goBackToSections = () => {
  // Clear section selection to return to sections list (used on mobile)
  selectedSectionIndex.value = -1
}

// Watch for URL changes and load appropriate service
watch(() => route.query.service, async (serviceName) => {
  if (serviceName && typeof serviceName === 'string') {
    selectedServiceName.value = serviceName
    await loadServiceData(serviceName)
  } else {
    selectedServiceName.value = null
    serviceData.value = null
  }
}, { immediate: true })
</script>

<template>
  <div
    class="min-h-screen pt-20 bg-[#0a0a0a] text-white overflow-auto"
  >
    <div class="w-full">
      <div class="max-w-[1200px] mx-auto pt-6 pb-4">
        <!-- Main Content Area -->
        <div class="relative">
          <!-- Service Cards Grid (always visible) -->
          <div :class="selectedServiceName ? 'pointer-events-none' : ''" class="px-6">
            <!-- Services Header (always visible) -->
            <div class="mb-12 text-center relative">
              <!-- Decorative background blur -->
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>

              <div class="relative">
                <h1 class="text-3xl md:text-4xl font-bold mb-5 leading-tight tracking-tight">
                  <span class="text-white">Complex Problems.</span><br class="sm:hidden" />
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400">
                    Simple Solutions.
                  </span>
                </h1>

                <div class="text-sm sm:text-base md:text-lg text-gray-400 max-w-[95%] sm:max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1.5 mt-6 px-2 sm:px-0">
                  <span class="text-center sm:text-right sm:whitespace-nowrap">Get expert help with</span>
                  <TypewriterText :phrases="expertisePhrases" :typing-speed="80" :deleting-speed="40" :pause-duration="2000" class="text-cyan-400 font-semibold text-center sm:text-left" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- STYLE 1: Hero Pattern (Tech Admin) -->
              <div
                v-for="service in serviceCards"
                :key="service.name"
                @click="selectService(service.name)"
                class="relative block rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-cyan-500/50"
              >
                <!-- Hero Section - Image Background with Overlay -->
                <div v-if="service.heroImage" class="relative h-48 overflow-hidden">
                  <!-- Unsplash Image Background -->
                  <img
                    :src="service.heroImage"
                    :alt="service.title"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <!-- Sharp bottom gradient - only blends the bottom edge -->
                  <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>

                  <!-- Label badge -->
                  <div class="absolute bottom-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold bg-black/80 text-cyan-300 border-2 border-cyan-500/50 backdrop-blur-md uppercase tracking-wider">
                    {{ service.label }}
                  </div>
                </div>

                <!-- Fallback: Minimalist Icon Style -->
                <div v-else class="relative h-48 overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
                  <!-- Subtle geometric background -->
                  <div class="absolute inset-0 opacity-5">
                    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                    <div class="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
                    <div class="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
                  </div>

                  <!-- Large centered icon with glow -->
                  <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div class="relative">
                      <div class="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl group-hover:blur-3xl group-hover:bg-cyan-400/40 transition-all"></div>
                      <div class="relative text-8xl">{{ service.icon }}</div>
                    </div>
                    <div class="px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border-2 border-cyan-500/30 uppercase tracking-wider">
                      {{ service.label }}
                    </div>
                  </div>
                </div>

                <!-- Content Section - Card-Style Layout for All -->
                <div class="p-4 md:p-6">
                  <div class="flex items-start justify-between mb-2 md:mb-3">
                    <div class="flex-1">
                      <h3 class="text-lg md:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                        {{ service.title }}
                      </h3>
                      <p class="text-xs md:text-sm text-gray-400 mt-1">{{ service.tagline }}</p>
                    </div>
                  </div>

                  <!-- Tags as badges with gradient -->
                  <div class="flex gap-1 md:gap-1.5 flex-wrap mb-3 md:mb-4">
                    <span
                      v-for="(tag, index) in service.tags"
                      :key="index"
                      class="px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[11px] font-semibold rounded-md bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/30"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Stats in boxes -->
                  <div class="grid grid-cols-3 gap-1 md:gap-2 mb-3 md:mb-4">
                    <div v-for="(stat, index) in service.stats" :key="index" class="bg-[#0f0f0f] rounded-lg p-1 md:p-2 lg:p-3 text-center border border-[#2a2a2a]">
                      <div class="text-[13px] md:text-[15px] lg:text-[19px] font-bold text-cyan-400 mb-0.5">{{ stat.value }}</div>
                      <div class="text-[6px] sm:text-[8px] md:text-[7px] lg:text-[9px] text-gray-500 md:uppercase tracking-tighter md:tracking-wide leading-[0.65rem] md:leading-tight break-words">{{ stat.label }}</div>
                    </div>
                  </div>

                  <button class="w-full py-2 md:py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-300 text-xs md:text-sm font-semibold hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2">
                    <span>Explore Service</span>
                    <svg class="w-3 md:w-4 h-3 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Call to Action Section -->
            <div class="mt-12 mb-8">
              <router-link
                to="/hire-me"
                class="block relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-2 border-cyan-500/30 hover:border-cyan-400/50 p-6 md:p-8 lg:p-12 transition-all duration-300 group"
              >
                <!-- Decorative background elements -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500"></div>

                <div class="relative text-center">
                  <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3 lg:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                    Ready to Get Started?
                  </h2>
                  <p class="text-xs md:text-sm lg:text-base text-gray-300 mb-4 md:mb-5 lg:mb-6 max-w-2xl mx-auto leading-relaxed">
                    Let's discuss how I can help transform your business with the right technical solutions
                  </p>
                  <div class="inline-block w-full md:w-auto">
                    <div class="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-sm md:text-base group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                      <span>Let's Work Together</span>
                      <svg class="hidden md:inline w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>


          <!-- Background overlay when service selected -->
          <Transition
            enter-active-class="transition-opacity duration-500"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-500"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="selectedServiceName && serviceData" class="fixed inset-0 top-16 bg-[#0a0a0a] z-10"></div>
          </Transition>

          <!-- Section List (slides from left, positioned absolutely) -->
          <Transition
            name="slide-left"
          >
            <div
              v-if="selectedServiceName && serviceData"
              :key="selectedServiceName"
              class="sections-panel fixed top-16 inset-x-0 z-30 bg-[#0a0a0a] px-6"
              :class="[
                selectedSection ? 'hidden lg:block' : 'block'
              ]"
              style="height: calc(100vh - 4rem);"
            >
              <!-- Header with title and back button -->
              <div class="mb-6 pt-4">
                <div class="flex items-center gap-3">
                  <!-- Back button (visible on all screens) -->
                  <button
                    @click="goBack"
                    class="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-cyan-500 flex items-center justify-center transition-all group"
                  >
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>

                  <h1 class="text-xl lg:text-3xl font-bold text-white flex-1 leading-none">{{ serviceData.title }}</h1>
                </div>
                <p class="text-sm text-gray-400 mt-2">{{ serviceData.tagline }}</p>
              </div>

              <div class="space-y-6 overflow-y-auto lg:pr-8 scrollbar-visible" style="height: calc(100vh - 4rem - 10rem);">
                <!-- Overview Section -->
                <div class="relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] border-2 border-cyan-500/30 rounded-xl p-5 overflow-hidden">
                  <!-- Decorative corner accent -->
                  <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full"></div>

                  <div class="relative">
                    <div class="flex items-center gap-2 mb-3">
                      <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <h3 class="text-base font-bold text-cyan-400 uppercase tracking-wider">Overview</h3>
                    </div>
                    <p class="text-base text-gray-200 mb-4 leading-relaxed">{{ serviceData.overview }}</p>

                    <!-- Visual stats if available -->
                    <div v-if="serviceData.stats" class="grid grid-cols-3 gap-3 mb-4 p-3 bg-[#0f0f0f] rounded-lg">
                      <div v-for="(stat, index) in serviceData.stats" :key="index" class="text-center">
                        <div class="text-xl font-bold text-cyan-400">{{ stat.value }}</div>
                        <div class="text-xs text-gray-500">{{ stat.label }}</div>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="(tag, index) in serviceData.tags"
                        :key="index"
                        class="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium rounded-full"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Service Sections -->
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                    <h3 class="text-base font-bold text-cyan-400 uppercase tracking-wider">What's Included</h3>
                  </div>
                  <div class="space-y-2">
                    <button
                      v-for="(section, sectionIndex) in serviceData.sections"
                      :key="sectionIndex"
                      @click="selectSection(sectionIndex)"
                      :class="[
                        'w-full text-left p-4 rounded-lg border-2 transition-all group relative overflow-hidden',
                        selectedSectionIndex === sectionIndex
                          ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                          : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-cyan-500/50 hover:bg-[#1f1f1f]'
                      ]"
                    >
                      <!-- Decorative corner accent for selected item -->
                      <div v-if="selectedSectionIndex === sectionIndex" class="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-bl-full"></div>

                      <div class="flex items-center gap-3 relative">
                        <!-- Number badge -->
                        <div :class="[
                          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors',
                          selectedSectionIndex === sectionIndex
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                            : 'bg-[#0f0f0f] border-[#333333] text-gray-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400'
                        ]">
                          {{ sectionIndex + 1 }}
                        </div>

                        <!-- Section heading -->
                        <h4
                          :class="[
                            'text-sm font-semibold flex-1',
                            selectedSectionIndex === sectionIndex
                              ? 'text-cyan-300'
                              : 'text-white group-hover:text-cyan-400'
                          ]"
                        >
                          {{ section.heading }}
                        </h4>

                        <!-- Arrow indicator -->
                        <svg
                          :class="[
                            'w-4 h-4 transition-all',
                            selectedSectionIndex === sectionIndex
                              ? 'text-cyan-400 translate-x-0'
                              : 'text-gray-600 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          ]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Testimonial (moved before portfolio) -->
                <div v-if="serviceData.testimonial" class="relative bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-lg p-6 overflow-hidden">
                  <!-- Decorative quote marks -->
                  <div class="absolute top-4 left-4 text-6xl text-cyan-500/20 font-serif">"</div>

                  <div class="relative">
                    <h3 class="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      Client Success Story
                    </h3>
                    <p class="text-base italic text-gray-200 mb-4 leading-relaxed">"{{ serviceData.testimonial.quote }}"</p>
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                        {{ serviceData.testimonial.author.charAt(0) }}
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-white">{{ serviceData.testimonial.author }}</p>
                        <p class="text-xs text-cyan-400">{{ serviceData.testimonial.role }} @ {{ serviceData.testimonial.company }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Portfolio Items -->
                <div v-if="serviceData.portfolioItems && serviceData.portfolioItems.length > 0">
                  <h3 class="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Recent Work
                  </h3>
                  <div class="space-y-3">
                    <a
                      v-for="(item, index) in serviceData.portfolioItems"
                      :key="index"
                      :href="item.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="block bg-[#1a1a1a] rounded-lg border-2 border-[#2a2a2a] overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
                    >
                      <div class="flex items-center gap-4 p-4">
                        <div class="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-cyan-500/20 transition-shadow">
                          <img :src="item.logo" :alt="item.name" class="max-w-full max-h-full object-contain p-2" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <h4 class="font-bold text-white text-base truncate group-hover:text-cyan-400 transition-colors">{{ item.name }}</h4>
                            <svg class="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                          </div>
                          <p class="text-sm text-gray-400 line-clamp-2">{{ item.description }}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Content Panel (slides from right, positioned absolutely) -->
          <Transition
            name="slide-right"
          >
            <div
              v-if="selectedServiceName && serviceData && selectedSection"
              :key="selectedServiceName"
              class="content-panel hidden lg:block fixed top-16 z-20 bg-[#0a0a0a] pb-3"
              style="height: calc(100vh - 4rem);"
            >
              <!-- Close button (top right of content panel) -->
              <button
                @click="goBack"
                class="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-cyan-500 flex items-center justify-center transition-all group z-50"
              >
                <svg class="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div
                ref="contentPanelRef"
                class="bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-y-auto scrollbar-visible"
                style="height: calc(100% - 0.75rem);"
              >
                <!-- Sticky Header -->
                <div class="sticky top-0 bg-[#1a1a1a] pt-8 px-8 pb-6 border-b border-[#333333] z-10 shadow-lg">
                  <h2 class="text-3xl font-bold text-white">{{ selectedSection.heading }}</h2>
                </div>

                <!-- Scrollable Content -->
                <div class="p-8">
                  <div v-if="selectedSection">

                    <!-- Tagline -->
                    <p v-if="selectedSection.tagline" class="text-lg font-semibold text-cyan-400 mb-6">{{ selectedSection.tagline }}</p>

                    <!-- Content paragraph (if exists) -->
                    <p v-if="selectedSection.content" class="text-sm leading-relaxed text-gray-300 mb-6">{{ selectedSection.content }}</p>

                    <!-- Benefits -->
                    <div v-if="selectedSection.benefits && selectedSection.benefits.length > 0" class="mb-8">
                      <h3 class="text-base font-semibold text-white mb-4">Benefits:</h3>
                      <ul class="space-y-3">
                        <li
                          v-for="(benefit, index) in selectedSection.benefits"
                          :key="index"
                          class="flex items-start gap-3 text-sm text-gray-300"
                        >
                          <svg class="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span>{{ benefit }}</span>
                        </li>
                      </ul>
                    </div>

                    <!-- Visual Elements -->
                    <div v-if="selectedSection.visual" class="mb-8">

                      <!-- Workflow Diagram -->
                      <div v-if="selectedSection.visual.type === 'workflow'" class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-6">
                        <h4 class="text-sm font-semibold text-white mb-6 text-center">{{ selectedSection.visual.data.title }}</h4>
                        <div class="grid grid-cols-4 gap-4">
                          <div v-for="(step, index) in selectedSection.visual.data.steps" :key="index" class="text-center">
                            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-2xl">
                              {{ step.icon }}
                            </div>
                            <div class="text-sm font-semibold text-white mb-1">{{ step.label }}</div>
                            <div class="text-xs text-gray-400">{{ step.desc }}</div>
                            <div v-if="index < selectedSection.visual.data.steps.length - 1" class="hidden md:block absolute top-8 left-full w-full">
                              <svg class="w-6 h-6 text-cyan-500/30 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Before/After Diagram -->
                      <div v-if="selectedSection.visual.type === 'diagram' || selectedSection.visual.type === 'before-after'" class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-6">
                        <h4 class="text-sm font-semibold text-white mb-6 text-center">{{ selectedSection.visual.data.title }}</h4>
                        <div class="grid md:grid-cols-2 gap-6">
                          <!-- Before -->
                          <div v-if="selectedSection.visual.data.before" class="bg-[#1a1a1a] rounded-lg p-4 border border-red-500/20">
                            <h5 class="text-sm font-semibold text-red-400 mb-3">{{ (typeof selectedSection.visual.data.before === 'object' && 'title' in selectedSection.visual.data.before) ? selectedSection.visual.data.before.title : 'Before' }}</h5>
                            <ul class="space-y-2">
                              <li v-for="(item, index) in ((typeof selectedSection.visual.data.before === 'object' && 'items' in selectedSection.visual.data.before) ? selectedSection.visual.data.before.items : selectedSection.visual.data.before)" :key="index" class="text-xs text-gray-400">
                                {{ item }}
                              </li>
                            </ul>
                          </div>
                          <!-- After -->
                          <div v-if="selectedSection.visual.data.after" class="bg-[#1a1a1a] rounded-lg p-4 border border-cyan-500/20">
                            <h5 class="text-sm font-semibold text-cyan-400 mb-3">{{ (typeof selectedSection.visual.data.after === 'object' && 'title' in selectedSection.visual.data.after) ? selectedSection.visual.data.after.title : 'After' }}</h5>
                            <ul class="space-y-2">
                              <li v-for="(item, index) in ((typeof selectedSection.visual.data.after === 'object' && 'items' in selectedSection.visual.data.after) ? selectedSection.visual.data.after.items : selectedSection.visual.data.after)" :key="index" class="text-xs text-gray-300">
                                {{ item }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <!-- Code Block -->
                      <div v-if="selectedSection.visual.type === 'code'" class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-6">
                        <h4 class="text-sm font-semibold text-white mb-4">{{ selectedSection.visual.data.title }}</h4>
                        <pre class="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-[#1a1a1a] p-4 rounded border border-[#333333] overflow-x-auto">{{ selectedSection.visual.data.code }}</pre>
                      </div>

                    </div>

                    <!-- CTA -->
                    <div v-if="selectedSection.cta" class="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 rounded">
                      <p class="text-base font-semibold text-cyan-400">{{ selectedSection.cta }}</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
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
            <div
              v-if="selectedServiceName && serviceData && selectedSection"
              class="lg:hidden fixed inset-0 top-16 z-40 bg-[#0a0a0a] px-2 pt-1 pb-4"
            >
              <!-- Content -->
              <div class="h-full overflow-y-auto scrollbar-visible">
                <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl">
                  <!-- Sticky Header with Close Button -->
                  <div class="sticky top-0 pt-3 px-4 pb-3 border-b border-[#333333] pr-14 bg-[#1a1a1a] z-50 rounded-t-xl shadow-lg">
                    <!-- Close button (top right, inside sticky header) - Goes back to sections list -->
                    <button
                      @click="goBackToSections"
                      class="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-cyan-500 flex items-center justify-center transition-all group"
                    >
                      <svg class="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>

                    <h2 class="text-lg font-bold text-white">{{ selectedSection.heading }}</h2>
                  </div>

                  <!-- Content -->
                  <div class="p-4 pt-5">
                    <div v-if="selectedSection">

                      <!-- Tagline -->
                      <p v-if="selectedSection.tagline" class="text-base font-semibold text-cyan-400 mb-4">{{ selectedSection.tagline }}</p>

                      <!-- Content paragraph (if exists) -->
                      <p v-if="selectedSection.content" class="text-sm leading-relaxed text-gray-300 mb-4">{{ selectedSection.content }}</p>

                      <!-- Benefits -->
                      <div v-if="selectedSection.benefits && selectedSection.benefits.length > 0" class="mb-6">
                        <h3 class="text-sm font-semibold text-white mb-3">Benefits:</h3>
                        <ul class="space-y-2">
                          <li
                            v-for="(benefit, index) in selectedSection.benefits"
                            :key="index"
                            class="flex items-start gap-2 text-xs text-gray-300"
                          >
                            <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>{{ benefit }}</span>
                          </li>
                        </ul>
                      </div>

                      <!-- Visual Elements -->
                      <div v-if="selectedSection.visual" class="mb-6">

                        <!-- Workflow Diagram -->
                        <div v-if="selectedSection.visual.type === 'workflow'" class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-4">
                          <h4 class="text-xs font-semibold text-white mb-4 text-center">{{ selectedSection.visual.data.title }}</h4>
                          <div class="grid grid-cols-2 gap-3">
                            <div v-for="(step, index) in selectedSection.visual.data.steps" :key="index" class="text-center">
                              <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-lg">
                                {{ step.icon }}
                              </div>
                              <div class="text-xs font-semibold text-white mb-1">{{ step.label }}</div>
                              <div class="text-[10px] text-gray-400">{{ step.desc }}</div>
                            </div>
                          </div>
                        </div>

                        <!-- Before/After Diagram -->
                        <div v-if="selectedSection.visual.type === 'diagram' || selectedSection.visual.type === 'before-after'" class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-4">
                          <h4 class="text-xs font-semibold text-white mb-4 text-center">{{ selectedSection.visual.data.title }}</h4>
                          <div class="space-y-3">
                            <!-- Before -->
                            <div v-if="selectedSection.visual.data.before" class="bg-[#1a1a1a] rounded-lg p-3 border border-red-500/20">
                              <h5 class="text-xs font-semibold text-red-400 mb-2">{{ (typeof selectedSection.visual.data.before === 'object' && 'title' in selectedSection.visual.data.before) ? selectedSection.visual.data.before.title : 'Before' }}</h5>
                              <ul class="space-y-1">
                                <li v-for="(item, index) in ((typeof selectedSection.visual.data.before === 'object' && 'items' in selectedSection.visual.data.before) ? selectedSection.visual.data.before.items : selectedSection.visual.data.before)" :key="index" class="text-[10px] text-gray-400">
                                  {{ item }}
                                </li>
                              </ul>
                            </div>
                            <!-- After -->
                            <div v-if="selectedSection.visual.data.after" class="bg-[#1a1a1a] rounded-lg p-3 border border-cyan-500/20">
                              <h5 class="text-xs font-semibold text-cyan-400 mb-2">{{ (typeof selectedSection.visual.data.after === 'object' && 'title' in selectedSection.visual.data.after) ? selectedSection.visual.data.after.title : 'After' }}</h5>
                              <ul class="space-y-1">
                                <li v-for="(item, index) in ((typeof selectedSection.visual.data.after === 'object' && 'items' in selectedSection.visual.data.after) ? selectedSection.visual.data.after.items : selectedSection.visual.data.after)" :key="index" class="text-[10px] text-gray-300">
                                  {{ item }}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <!-- Code Block -->
                        <div v-if="selectedSection.visual.type === 'code'" class="bg-[#0f0f0f] border border-[#333333] rounded-lg p-4">
                          <h4 class="text-xs font-semibold text-white mb-3">{{ selectedSection.visual.data.title }}</h4>
                          <pre class="text-[10px] text-gray-300 whitespace-pre-wrap font-mono bg-[#1a1a1a] p-3 rounded border border-[#333333] overflow-x-auto">{{ selectedSection.visual.data.code }}</pre>
                        </div>

                      </div>

                      <!-- CTA -->
                      <div v-if="selectedSection.cta" class="mt-6 p-3 bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 rounded">
                        <p class="text-sm font-semibold text-cyan-400">{{ selectedSection.cta }}</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 1024px) {
  .content-layout {
    grid-template-columns: 320px 1fr;
    gap: 2rem;
  }

  .sections-panel {
    left: max(0px, calc((100vw - 1200px) / 2)) !important;
    right: auto !important;
    width: 300px;
    padding-left: 0;
    padding-right: 0;
  }

  .content-panel {
    left: calc(max(0px, calc((100vw - 1200px) / 2)) + 300px + 2rem);
    width: calc(1200px - 300px - 2rem);
  }
}

@media (min-width: 1280px) {
  .sections-panel {
    width: 420px;
    padding-right: 0;
  }

  .content-panel {
    left: calc(max(0px, calc((100vw - 1200px) / 2)) + 420px + 2rem);
    width: calc(1200px - 420px - 2rem);
  }
}

/* Visible scrollbar styling */
.scrollbar-visible::-webkit-scrollbar {
  width: 12px;
}

.scrollbar-visible::-webkit-scrollbar-track {
  background: #0f0f0f;
  border-radius: 0 8px 8px 0;
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  background: #2d2d2d;
  border-radius: 6px;
  border: 2px solid #0f0f0f;
}

.scrollbar-visible::-webkit-scrollbar-thumb:hover {
  background: #3d3d3d;
}

/* Gradient fade at bottom to indicate more content */
.scrollbar-visible::after {
  content: '';
  position: sticky;
  display: block;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: -60px;
  height: 60px;
  background: linear-gradient(to top, rgba(26, 26, 26, 0.95), transparent);
  pointer-events: none;
  z-index: 5;
}

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
