<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMeta } from '../composables/useMeta'
import SecondaryButton from '../components/elements/buttons/SecondaryButton.vue'
import InfoCard from '../components/cards/InfoCard.vue'
import ContactInfoItem from '../components/elements/ContactInfoItem.vue'
import SocialIcon from '../components/elements/SocialIcon.vue'
import CheckItem from '../components/elements/CheckItem.vue'
import LoadingSpinner from '../components/elements/LoadingSpinner.vue'

// Set meta tags for Hire Me page
useMeta({
  title: 'Hire Me - Matt Myers | Technical Consulting',
  description:
    'CTO, full-stack engineer, and technology leader available for technical consulting. 10+ years experience in cloud architecture, software engineering, and team leadership.',
  ogTitle: 'Hire Me - Matt Myers | Technical Consulting',
  ogDescription:
    'Schedule a consultation with an experienced CTO and full-stack engineer. Expert in cloud infrastructure, DevOps, and technical leadership.',
  ogUrl: 'https://idevelop.tech/hire-me',
  ogImage: 'https://idevelop.tech/images/brand/og-image.png',
})

const isCalendlyLoading = ref(true)

onMounted(() => {
  // Load Calendly widget script
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.head.appendChild(script)

  // Hide loading indicator after Calendly loads (using a timeout as fallback)
  // Calendly typically loads within 2-3 seconds
  setTimeout(() => {
    isCalendlyLoading.value = false
  }, 2500)

  // Lock body scroll
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  // Restore body scroll when leaving the page
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white">
    <div class="w-full">
      <div class="pt-20 lg:pt-0">
        <div class="lg:flex lg:gap-8">
          <!-- Left Content Column -->
          <div
            class="sidebar-panel lg:fixed lg:top-16 lg:z-30 lg:bg-[#0a0a0a] px-6 pt-6 pb-3 lg:pointer-events-auto"
            style="height: calc(100vh - 4rem)"
          >
            <!-- Header -->
            <div class="mb-6 lg:mt-0">
              <h1 class="text-xl lg:text-3xl font-bold text-white mb-2">Let's Work Together</h1>
              <p class="text-sm text-gray-400">CTO, full-stack engineer, and technology leader</p>
            </div>

            <!-- Sticky Schedule Call Button -->
            <div class="sticky top-0 z-10 pb-4">
              <a
                href="https://calendly.com/matt-idevelop/30min"
                target="_blank"
                rel="noopener noreferrer"
                class="block"
              >
                <SecondaryButton :show-arrow="false" :full-width="true">
                  Schedule a Call
                </SecondaryButton>
              </a>
            </div>

            <!-- Scrollable Content Sections -->
            <div
              class="space-y-4 overflow-y-auto scrollbar-visible"
              style="max-height: calc(100vh - 16rem)"
            >
              <!-- Contact Info -->
              <InfoCard title="Contact Info" variant="tight">
                <div class="space-y-3">
                  <ContactInfoItem icon="📧" label="Email">
                    <a
                      href="mailto:matt@idevelop.tech"
                      class="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      matt@idevelop.tech
                    </a>
                  </ContactInfoItem>

                  <ContactInfoItem icon="📍" label="Location"> Florida, USA </ContactInfoItem>

                  <ContactInfoItem icon="🔗" label="Social">
                    <div class="flex items-center gap-4">
                      <SocialIcon
                        platform="linkedin"
                        url="https://www.linkedin.com/in/matt-lucian/"
                      />
                      <SocialIcon platform="github" url="https://github.com/mattlucian" />
                    </div>
                  </ContactInfoItem>
                </div>
              </InfoCard>

              <!-- About Me -->
              <InfoCard title="About Me">
                <div class="space-y-3 text-xs text-gray-300 leading-relaxed">
                  <p>
                    I'm a seasoned CTO and full-stack engineer with over 10 years of experience
                    building and scaling technology solutions. I've successfully grown an
                    engineering team from 5 to 20 people while managing $1M+ annual budgets and
                    infrastructure handling billions of monthly transactions.
                  </p>
                  <p>
                    My expertise spans software engineering, cloud architecture (AWS), DevOps
                    practices, platform engineering, and technical leadership. I specialize in
                    helping organizations modernize their technology stack, improve operational
                    efficiency, and scale their teams effectively.
                  </p>
                </div>
              </InfoCard>

              <!-- Technical Achievements -->
              <InfoCard title="Technical Achievements" icon="🚀">
                <ul class="space-y-2">
                  <CheckItem>Systems handling billions of transactions</CheckItem>
                  <CheckItem>50% infrastructure cost reduction</CheckItem>
                  <CheckItem>Cloud-native architecture design</CheckItem>
                  <CheckItem>Full-stack development across multiple languages</CheckItem>
                </ul>
              </InfoCard>

              <!-- Leadership Experience -->
              <InfoCard title="Leadership Experience" icon="👥">
                <ul class="space-y-2">
                  <CheckItem>Scaled engineering team 5→20 people</CheckItem>
                  <CheckItem>Managed $1M+ annual technology budgets</CheckItem>
                  <CheckItem>Led SOC2 compliance implementations</CheckItem>
                  <CheckItem>Established engineering processes and culture</CheckItem>
                </ul>
              </InfoCard>
            </div>
          </div>

          <!-- Right Calendar Panel -->
          <div
            class="content-panel hidden lg:block lg:fixed lg:top-16 lg:z-20 lg:bg-[#0a0a0a] lg:pb-3 lg:pointer-events-auto"
            style="height: calc(100vh - 4rem)"
          >
            <div
              class="bg-[#1a1a1a] border border-[#333333] rounded-xl h-full overflow-hidden flex flex-col"
            >
              <div class="px-6 pt-4 pb-3 border-b border-[#333333] flex-shrink-0">
                <h2 class="text-2xl font-bold text-white">Schedule a Meeting</h2>
              </div>
              <div class="flex-1 bg-[#1a1a1a] min-h-0 flex items-start justify-center relative">
                <!-- Loading overlay -->
                <div
                  v-if="isCalendlyLoading"
                  class="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10"
                >
                  <LoadingSpinner message="Loading calendar..." />
                </div>

                <!-- Calendly inline widget begin -->
                <div
                  class="calendly-inline-widget w-full h-full"
                  data-url="https://calendly.com/matt-idevelop/30min?hide_event_type_details=1&background_color=0f0f0f&text_color=d1d5dc&primary_color=00d3f2"
                  style="width: 640px; max-width: 100%"
                ></div>
                <!-- Calendly inline widget end -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* Override Calendly's default margin */
:deep(.calendly-inline-widget) {
  margin-top: 0 !important;
}

/* Panel positioning - matches ServicesView layout */
@media (min-width: 1024px) {
  .sidebar-panel {
    left: 1.5rem !important;
    right: auto !important;
    width: clamp(280px, 25vw, 300px);
    padding-left: 0;
    padding-right: 0;
  }

  .content-panel {
    left: calc(1.5rem + clamp(280px, 25vw, 300px) + 1.5rem);
    right: 1.5rem;
    width: auto;
  }
}

@media (min-width: 1280px) {
  .sidebar-panel {
    left: max(1.5rem, calc((100vw - 1200px) / 2)) !important;
    width: clamp(320px, 30vw, 420px);
  }

  .content-panel {
    left: calc(max(1.5rem, calc((100vw - 1200px) / 2)) + clamp(320px, 30vw, 420px) + 2rem);
    right: max(1.5rem, calc((100vw - 1200px) / 2));
  }
}

@media (min-width: 1440px) {
  .sidebar-panel {
    left: max(0px, calc((100vw - 1200px) / 2)) !important;
    width: 420px;
  }

  .content-panel {
    left: calc(max(0px, calc((100vw - 1200px) / 2)) + 420px + 2rem);
    width: calc(1200px - 420px - 2rem);
    right: auto;
  }
}
</style>
