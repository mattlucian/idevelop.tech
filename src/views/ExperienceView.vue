<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopicContent from '../components/TopicContent.vue'
import type { ExperienceContent } from '../types/experience'

const route = useRoute()
const router = useRouter()

interface DomainCard {
  name: string
  path: string
  icon: string
  label: string
  title: string
  stats: { value: string; label: string }[]
  tags: string[]
  borderColor: string
  bgColor: string
}

// Domain cards configuration
const domainCards: DomainCard[] = [
  {
    name: 'software',
    path: 'software.json',
    icon: '💻',
    label: 'Software',
    title: 'Software Engineering',
    stats: [
      { value: '10+', label: 'Years' },
      { value: 'Full', label: 'Stack' },
      { value: 'AI', label: 'Enabled' }
    ],
    tags: ['Java', 'C#', 'Vue.js'],
    borderColor: 'border-l-teal-700 hover:border-l-teal-600',
    bgColor: 'bg-teal-700/10'
  },
  {
    name: 'cloud',
    path: 'cloud.json',
    icon: '☁️',
    label: 'Cloud',
    title: 'Cloud Engineering',
    stats: [
      { value: '7+', label: 'Years' },
      { value: '$50k', label: 'Spend' },
      { value: '50%', label: 'Savings' }
    ],
    tags: ['AWS', 'ECS', 'RDS'],
    borderColor: 'border-l-teal-600 hover:border-l-teal-500',
    bgColor: 'bg-teal-600/10'
  },
  {
    name: 'devops',
    path: 'devops.json',
    icon: '⚙️',
    label: 'DevOps',
    title: 'DevOps Engineering',
    stats: [
      { value: '6+', label: 'Years' },
      { value: 'CI/CD', label: 'Focus' },
      { value: 'Anomaly', label: 'Detection' }
    ],
    tags: ['DataDog', 'CodeBuild', 'GitHub'],
    borderColor: 'border-l-teal-500 hover:border-l-teal-400',
    bgColor: 'bg-teal-500/10'
  },
  {
    name: 'data',
    path: 'data.json',
    icon: '📊',
    label: 'Data',
    title: 'Data Engineering',
    stats: [
      { value: '6+', label: 'Years' },
      { value: '100+', label: 'Integrations' },
      { value: '200M+', label: 'Records' }
    ],
    tags: ['PostgreSQL', 'Redis', 'Kafka'],
    borderColor: 'border-l-teal-400 hover:border-l-teal-300',
    bgColor: 'bg-teal-400/10'
  },
  {
    name: 'leadership',
    path: 'leadership.json',
    icon: '👥',
    label: 'Leadership',
    title: 'Leadership & Strategy',
    stats: [
      { value: '5+', label: 'Years' },
      { value: '$1M', label: 'Budget' },
      { value: '20+', label: 'Staff' }
    ],
    tags: ['CTO', 'AI Strategy', 'Team Building'],
    borderColor: 'border-l-teal-400 hover:border-l-teal-300',
    bgColor: 'bg-teal-400/10'
  },
  {
    name: 'security',
    path: 'security.json',
    icon: '🛡️',
    label: 'Security',
    title: 'Security Engineering',
    stats: [
      { value: '4+', label: 'Years' },
      { value: 'SOC2', label: 'Experience' },
      { value: 'PII', label: 'Protection' }
    ],
    tags: ['Scanning', 'Remediation', 'Audits'],
    borderColor: 'border-l-teal-300 hover:border-l-teal-200',
    bgColor: 'bg-teal-300/10'
  }
]

const selectedDomainName = ref<string | null>(null)
const domainData = ref<ExperienceContent | null>(null)
const selectedCategoryIndex = ref(-1)
const selectedTopicIndex = ref(-1)
const contentPanelRef = ref<HTMLElement | null>(null)

const selectedDomain = computed(() =>
  domainCards.find(d => d.name === selectedDomainName.value)
)

const selectedCategory = computed(() =>
  domainData.value?.categories[selectedCategoryIndex.value]
)

const selectedTopic = computed(() =>
  selectedCategory.value?.topics[selectedTopicIndex.value]
)

// Load domain data
const loadDomainData = async (domainName: string) => {
  try {
    let module
    const domain = domainCards.find(d => d.name === domainName)
    if (!domain) return

    switch (domain.path) {
      case 'software.json':
        module = await import('../data/experience/software.json?raw')
        break
      case 'cloud.json':
        module = await import('../data/experience/cloud.json?raw')
        break
      case 'devops.json':
        module = await import('../data/experience/devops.json?raw')
        break
      case 'leadership.json':
        module = await import('../data/experience/leadership.json?raw')
        break
      case 'data.json':
        module = await import('../data/experience/data.json?raw')
        break
      case 'security.json':
        module = await import('../data/experience/security.json?raw')
        break
      default:
        console.error(`Unknown data file: ${domain.path}`)
        return
    }

    domainData.value = JSON.parse(module.default)

    // Auto-select first topic on desktop/tablet (1024px+)
    if (window.innerWidth >= 1024) {
      selectedCategoryIndex.value = 0
      selectedTopicIndex.value = 0
    } else {
      selectedCategoryIndex.value = -1
      selectedTopicIndex.value = -1
    }
  } catch (error) {
    console.error(`Error loading domain data:`, error)
  }
}

const selectDomain = async (domainName: string) => {
  // Update URL when selecting a domain
  router.push({ name: 'experience', query: { domain: domainName } })
}

const selectTopic = async (categoryIndex: number, topicIndex: number) => {
  selectedCategoryIndex.value = categoryIndex
  selectedTopicIndex.value = topicIndex

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
  // Navigate back to experience page without query params
  router.push({ name: 'experience' })
}

const goBackToTopics = () => {
  // Clear topic selection to return to topics list (used on mobile)
  selectedCategoryIndex.value = -1
  selectedTopicIndex.value = -1
}

// Watch for URL changes and load appropriate domain
watch(() => route.query.domain, async (domainName) => {
  if (domainName && typeof domainName === 'string') {
    selectedDomainName.value = domainName
    await loadDomainData(domainName)
  } else {
    selectedDomainName.value = null
    domainData.value = null
  }
}, { immediate: true })
</script>

<template>
  <div
    class="min-h-screen pt-20 bg-[#0a0a0a] text-white overflow-auto"
    :class="selectedDomainName ? 'lg:overflow-hidden lg:h-screen' : ''"
  >
    <div class="w-full">
      <div class="max-w-[1200px] mx-auto pt-6 pb-4">
        <!-- Main Content Area -->
        <div class="relative">
          <!-- Domain Cards Grid (always visible) -->
          <div :class="selectedDomainName ? 'pointer-events-none' : ''" class="px-6">
            <!-- Experience Header (always visible) -->
            <div class="mb-6 text-center">
              <!-- Style Option 1: White title with gradient subtitle -->
              <!-- <h1 class="text-4xl font-bold text-white mb-3">My Experience</h1>
              <p class="text-base bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">From full-stack development to cloud architecture and leadership</p> -->

              <!-- Style Option 2: Gradient title -->
              <!-- <h1 class="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3">My Experience</h1>
              <p class="text-base text-gray-400">From full-stack development to cloud architecture and leadership</p> -->

              <!-- Style Option 3: White title, lighter subtitle (currently active) -->
              <h1 class="text-4xl font-bold text-white mb-3">My Experience</h1>
              <p class="text-base text-gray-400">From full-stack development to cloud architecture and leadership</p>

              <!-- Style Option 4: Subtle teal accent -->
              <!-- <h1 class="text-4xl font-bold text-white mb-3">My <span class="text-teal-500">Experience</span></h1>
              <p class="text-base text-gray-400">From full-stack development to cloud architecture and leadership</p> -->

              <!-- Style Option 5: Uppercase with letter spacing -->
              <!-- <h1 class="text-3xl font-bold text-white tracking-wider uppercase mb-3">My Experience</h1>
              <p class="text-base text-gray-400">From full-stack development to cloud architecture and leadership</p> -->
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="domain in domainCards"
                :key="domain.name"
                @click="selectDomain(domain.name)"
                :class="[
                  'relative block p-6 rounded-xl border-l-4 border-t border-r border-b border-[#2a2a2a] transition-all duration-300 cursor-pointer',
                  domain.borderColor,
                  'bg-[#1a1a1a] hover:bg-[#1f1f1f]'
                ]"
              >
                <div class="flex items-center gap-3 mb-4">
                  <div :class="['w-10 h-10 rounded-full flex items-center justify-center', domain.bgColor]">
                    <span class="text-xl">{{ domain.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="text-xs text-teal-400 font-semibold tracking-wider uppercase mb-1">
                      {{ domain.label }}
                    </div>
                  </div>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-white">
                  {{ domain.title }}
                </h3>
                <div class="flex gap-3 mb-3">
                  <div v-for="(stat, index) in domain.stats" :key="index">
                    <div class="text-base font-bold text-teal-400">{{ stat.value }}</div>
                    <div class="text-xs text-gray-500">{{ stat.label }}</div>
                  </div>
                </div>
                <div class="flex gap-1.5 flex-wrap">
                  <span
                    v-for="(tag, index) in domain.tags"
                    :key="index"
                    :class="['px-2 py-0.5 rounded-md text-xs border text-teal-400', domain.bgColor, `border-${domain.borderColor.split('-')[2]}-${domain.borderColor.split('-')[3]}/20`]"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>


          <!-- Background overlay when domain selected -->
          <Transition
            enter-active-class="transition-opacity duration-500"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-500"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="selectedDomainName && domainData" class="fixed inset-0 top-16 bg-[#0a0a0a] z-10"></div>
          </Transition>

          <!-- Topic List (slides from left, positioned absolutely) -->
          <Transition
            name="slide-left"
          >
            <div
              v-if="selectedDomainName && domainData"
              :key="selectedDomainName"
              class="topics-panel fixed top-16 inset-x-0 z-30 bg-[#0a0a0a] px-6"
              :class="[
                selectedTopic ? 'hidden lg:block' : 'block'
              ]"
              style="height: calc(100vh - 4rem);"
            >
              <!-- Header with title and back button -->
              <div class="mb-6 pt-4">
                <div class="flex items-center gap-3">
                  <!-- Back button (visible on all screens) -->
                  <button
                    @click="goBack"
                    class="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-teal-500 flex items-center justify-center transition-all group"
                  >
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>

                  <h1 class="text-xl lg:text-3xl font-bold text-white flex-1 leading-none">{{ selectedDomain?.title }}</h1>
                </div>
              </div>

              <div class="space-y-6 overflow-y-auto lg:pr-8 scrollbar-visible" style="height: calc(100vh - 4rem - 8rem);">
                    <div v-for="(category, categoryIndex) in domainData.categories" :key="categoryIndex">
                      <!-- Category Header -->
                      <div class="mb-3">
                        <h3 class="text-sm font-bold text-teal-400 uppercase tracking-wider mb-1">
                          {{ category.name }}
                        </h3>
                        <p class="text-xs text-gray-500">{{ category.subtitle }}</p>
                      </div>

                      <!-- Topics in this category -->
                      <div class="space-y-2">
                        <button
                          v-for="(topic, topicIndex) in category.topics"
                          :key="topicIndex"
                          @click="selectTopic(categoryIndex, topicIndex)"
                          :class="[
                            'w-full text-left p-3 rounded-lg border transition-all',
                            selectedCategoryIndex === categoryIndex && selectedTopicIndex === topicIndex
                              ? 'bg-[#1a1a1a] border-teal-700 shadow-sm'
                              : 'bg-[#0f0f0f] border-[#333333] hover:border-gray-600'
                          ]"
                        >
                          <h4
                            :class="[
                              'text-sm font-semibold mb-0.5',
                              selectedCategoryIndex === categoryIndex && selectedTopicIndex === topicIndex
                                ? 'text-teal-400'
                                : 'text-white'
                            ]"
                          >
                            {{ topic.title }}
                          </h4>
                          <p
                            :class="[
                              'text-xs',
                              selectedCategoryIndex === categoryIndex && selectedTopicIndex === topicIndex
                                ? 'text-teal-300'
                                : 'text-gray-400'
                            ]"
                          >
                            {{ topic.subtitle }}
                          </p>
                        </button>
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
              v-if="selectedDomainName && domainData && selectedTopic"
              :key="selectedDomainName"
              class="content-panel hidden lg:block fixed top-16 z-20 bg-[#0a0a0a] pb-3"
              style="height: calc(100vh - 4rem);"
            >
              <!-- Close button (top right of content panel) -->
              <button
                @click="goBack"
                class="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-teal-500 flex items-center justify-center transition-all group z-50"
              >
                <svg class="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <div class="mb-2">
                          <span class="text-xs font-bold text-teal-400 uppercase tracking-wider">{{ selectedCategory?.name }}</span>
                        </div>
                        <h2 class="text-3xl font-bold text-white">{{ selectedTopic?.title }}</h2>
                      </div>

                      <!-- Scrollable Content -->
                      <div class="p-8">
                        <div v-if="selectedTopic && selectedCategory">
                          <!-- Content Section -->
                          <div v-if="selectedTopic.skillTags || selectedTopic.intro || selectedTopic.sections" class="prose prose-sm max-w-none">
                            <div class="text-sm leading-relaxed text-gray-300">
                              <TopicContent
                                :skillTags="selectedTopic.skillTags"
                                :intro="selectedTopic.intro"
                                :sections="selectedTopic.sections"
                              />
                            </div>
                          </div>
                          <div v-else>
                            <p class="text-sm italic text-gray-500">Detailed content coming soon...</p>
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
              v-if="selectedDomainName && domainData && selectedTopic"
              class="lg:hidden fixed inset-0 top-16 z-40 bg-[#0a0a0a] px-2 pt-1 pb-4"
            >
              <!-- Content -->
              <div class="h-full overflow-y-auto scrollbar-visible">
                <div class="bg-[#1a1a1a] border border-[#333333] rounded-xl">
                  <!-- Sticky Header with Close Button -->
                  <div class="sticky top-0 pt-3 px-4 pb-3 border-b border-[#333333] pr-14 bg-[#1a1a1a] z-50 rounded-t-xl shadow-lg">
                    <!-- Close button (top right, inside sticky header) - Goes back to topics list -->
                    <button
                      @click="goBackToTopics"
                      class="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0a0a0a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-teal-500 flex items-center justify-center transition-all group"
                    >
                      <svg class="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>

                    <div class="mb-1">
                      <span class="text-[10px] font-bold text-teal-400 uppercase tracking-wider">{{ selectedCategory?.name }}</span>
                    </div>
                    <h2 class="text-lg font-bold text-white">{{ selectedTopic?.title }}</h2>
                  </div>

                  <!-- Content -->
                  <div class="p-4 pt-5">
                    <div v-if="selectedTopic && selectedCategory">
                      <div v-if="selectedTopic.skillTags || selectedTopic.intro || selectedTopic.sections" class="prose prose-sm max-w-none">
                        <div class="text-sm leading-relaxed text-gray-300">
                          <TopicContent
                            :skillTags="selectedTopic.skillTags"
                            :intro="selectedTopic.intro"
                            :sections="selectedTopic.sections"
                          />
                        </div>
                      </div>
                      <div v-else>
                        <p class="text-sm italic text-gray-500">Detailed content coming soon...</p>
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

  .topics-panel {
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
  .topics-panel {
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
