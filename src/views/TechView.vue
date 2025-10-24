<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMeta } from '../composables/useMeta'
import PanelSidebar from '../components/ui/PanelSidebar.vue'
import PanelContent from '../components/ui/PanelContent.vue'
import PanelMobile from '../components/ui/PanelMobile.vue'
import TechTheme from '../components/themes/TechTheme.vue'
import type { TechContent, Expertise } from '../types/tech'

// Set meta tags for Tech Experience page
useMeta({
  title: 'Technical Experience - Matt Myers | I Develop Tech',
  description:
    'Comprehensive technical expertise across software engineering, cloud architecture, DevOps, data engineering, security, and technical leadership. 10+ years building scalable systems.',
  ogTitle: 'Technical Experience - Matt Myers | I Develop Tech',
  ogDescription:
    'Explore my technical experience in software development, cloud infrastructure, DevOps practices, and engineering leadership.',
  ogUrl: 'https://idevelop.tech/tech',
  ogImage: 'https://idevelop.tech/images/brand/og-image.png',
})

const router = useRouter()

const domainData = ref<TechContent | null>(null)
const selectedCategoryIndex = ref(-1)
const selectedTopicIndex = ref(-1)
const contentPanelRef = ref<InstanceType<typeof PanelContent> | null>(null)

const selectedCategory = computed(() => domainData.value?.categories[selectedCategoryIndex.value])

const selectedTopic = computed<Expertise | undefined>(
  () => selectedCategory.value?.topics[selectedTopicIndex.value],
)

// Load tech experience data
const loadTechData = async () => {
  try {
    const module = await import('../data/tech.json?raw')
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
    console.error('Error loading tech data:', error)
  }
}

const selectTopic = async (categoryIndex: number, topicIndex: number) => {
  selectedCategoryIndex.value = categoryIndex
  selectedTopicIndex.value = topicIndex

  // Scroll the content panel to top
  await nextTick()
  if (contentPanelRef.value) {
    contentPanelRef.value.scrollToTop()
  }
}

const goBack = () => {
  // Navigate to home page
  router.push({ name: 'home' })
}

const goBackToTopics = () => {
  selectedCategoryIndex.value = -1
  selectedTopicIndex.value = -1
}

// Load data when component mounts
onMounted(() => {
  loadTechData()
  // Lock body scroll
  document.body.style.overflow = 'hidden'
})

// Re-enable body scroll when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <div v-if="domainData" class="w-full">
      <!-- Background overlay - clickable to close -->
      <div class="fixed inset-0 top-16 bg-[#0a0a0a]/95 z-50 cursor-pointer" @click="goBack"></div>

      <!-- Topic List Sidebar (slides from left) -->
      <Transition name="slide-left">
        <PanelSidebar
          v-if="domainData"
          color-scheme="emerald"
          :hide-on-mobile="!!selectedTopic"
          @close="goBack"
        >
          <template #header>
            <h1 class="text-xl lg:text-3xl font-bold text-white leading-none">Tech Experience</h1>
          </template>

          <!-- Categories and Topics -->
          <div v-for="(category, categoryIndex) in domainData.categories" :key="categoryIndex">
            <!-- Category Header -->
            <div class="mb-3">
              <h3 class="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">
                {{ category.name }}
              </h3>
              <p class="text-xs text-gray-500">{{ category.subtitle }}</p>
            </div>

            <!-- Topics in this category -->
            <div class="space-y-2 mb-6">
              <button
                v-for="(topic, topicIndex) in category.topics"
                :key="topicIndex"
                @click="selectTopic(categoryIndex, topicIndex)"
                :class="[
                  'w-full text-left p-3 rounded-lg border transition-all',
                  selectedCategoryIndex === categoryIndex && selectedTopicIndex === topicIndex
                    ? 'bg-[#1a1a1a] border-emerald-700 shadow-sm'
                    : 'bg-[#0f0f0f] border-[#333333] hover:border-gray-600',
                ]"
              >
                <h4
                  :class="[
                    'text-sm font-semibold mb-0.5',
                    selectedCategoryIndex === categoryIndex && selectedTopicIndex === topicIndex
                      ? 'text-emerald-400'
                      : 'text-white',
                  ]"
                >
                  {{ topic.title }}
                </h4>
                <p
                  :class="[
                    'text-xs',
                    selectedCategoryIndex === categoryIndex && selectedTopicIndex === topicIndex
                      ? 'text-emerald-300'
                      : 'text-gray-400',
                  ]"
                >
                  {{ topic.subtitle }}
                </p>
              </button>
            </div>
          </div>
        </PanelSidebar>
      </Transition>

      <!-- Content Panel (slides from right, desktop only) -->
      <Transition name="slide-right">
        <PanelContent
          v-if="domainData && selectedTopic"
          ref="contentPanelRef"
          color-scheme="emerald"
          header-style="simple"
          @close="goBack"
        >
          <template #header>
            <div class="mb-2">
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">{{
                selectedCategory?.name
              }}</span>
            </div>
            <h2 class="text-3xl font-bold text-white">{{ selectedTopic?.title }}</h2>
          </template>

          <!-- Topic Content -->
          <div v-if="selectedTopic && selectedCategory">
            <div
              v-if="selectedTopic.skillTags || selectedTopic.intro || selectedTopic.sections"
              class="prose prose-sm max-w-none"
            >
              <div class="text-sm leading-relaxed text-gray-300">
                <TechTheme :section="selectedTopic" />
              </div>
            </div>
            <div v-else>
              <p class="text-sm italic text-gray-500">Detailed content coming soon...</p>
            </div>
          </div>
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
          v-if="domainData && selectedTopic"
          color-scheme="emerald"
          @close="goBackToTopics"
        >
          <template #header>
            <div class="mb-1">
              <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{{
                selectedCategory?.name
              }}</span>
            </div>
            <h2 class="text-lg font-bold text-white">{{ selectedTopic?.title }}</h2>
          </template>

          <!-- Topic Content -->
          <div v-if="selectedTopic && selectedCategory">
            <div
              v-if="selectedTopic.skillTags || selectedTopic.intro || selectedTopic.sections"
              class="prose prose-sm max-w-none"
            >
              <div class="text-sm leading-relaxed text-gray-300">
                <TechTheme :section="selectedTopic" />
              </div>
            </div>
            <div v-else>
              <p class="text-sm italic text-gray-500">Detailed content coming soon...</p>
            </div>
          </div>
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
