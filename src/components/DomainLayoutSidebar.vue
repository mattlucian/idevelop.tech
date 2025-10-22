<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import TopicContent from './TopicContent.vue'

interface Section {
  heading: string
  content: string
}

interface Topic {
  title: string
  subtitle: string
  skillTags?: string[]
  intro?: string
  sections?: Section[]
  details?: string[] // Legacy support
  content?: string // Legacy support for HTML string
}

interface Category {
  name: string
  subtitle: string
  topics: Topic[]
}

interface Badge {
  label: string
  value: string
  icon?: string
}

interface Props {
  title: string
  overview: string
  categories: Category[]
  badges?: Badge[]
}

const props = defineProps<Props>()

// Find first topic across all categories
const firstCategoryIndex = 0
const firstTopicIndex = 0

const selectedCategoryIndex = ref(firstCategoryIndex)
const selectedTopicIndex = ref(firstTopicIndex)
const showMobileModal = ref(false)
const contentPanelRef = ref<HTMLElement | null>(null)

const selectedCategory = computed(() => props.categories[selectedCategoryIndex.value])
const selectedTopic = computed(() => selectedCategory.value?.topics[selectedTopicIndex.value])

const selectTopic = async (categoryIndex: number, topicIndex: number) => {
  selectedCategoryIndex.value = categoryIndex
  selectedTopicIndex.value = topicIndex
  showMobileModal.value = true

  // Scroll the content panel to top (not the whole page)
  await nextTick()
  if (contentPanelRef.value) {
    contentPanelRef.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const closeMobileModal = () => {
  showMobileModal.value = false
}
</script>

<template>
  <div class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <div class="w-full">
      <div class="max-w-[1100px] mx-auto py-8 px-6">
        <!-- Compact Header -->
        <nav class="flex items-center gap-4 mb-6">
          <router-link
            to="/"
            class="w-10 h-10 rounded-full bg-[#333333] hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </router-link>
          <div class="flex items-center gap-2 text-sm">
            <router-link to="/" class="text-gray-500 hover:text-gray-300 transition-colors">
              Home
            </router-link>
            <span class="text-gray-500">/</span>
            <span class="text-white">{{ title }}</span>
          </div>
        </nav>

        <div class="mb-6">
          <h1 class="text-3xl font-bold text-white">{{ title }}</h1>
        </div>

        <!-- Two Column Layout -->
        <div class="content-layout relative">
          <!-- Left Sidebar: Topic Navigation with Category Groups -->
          <div class="space-y-6 lg:pr-8">
            <div v-for="(category, categoryIndex) in categories" :key="categoryIndex">
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
                  <div class="lg:hidden flex items-center justify-between">
                    <div class="flex-1">
                      <h4 class="text-sm font-semibold text-white mb-0.5">{{ topic.title }}</h4>
                      <p class="text-xs text-gray-400">{{ topic.subtitle }}</p>
                    </div>
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>

                  <div class="hidden lg:block">
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
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Content Panel (Desktop Only) - Fixed to viewport -->
          <div class="hidden lg:block">
            <div
              ref="contentPanelRef"
              class="fixed top-24 right-6 bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-y-auto scrollbar-visible"
              style="width: calc((100vw - 1100px) / 2 + 1100px - 320px - 2rem - 3rem); max-height: calc(100vh - 7rem);"
            >
              <!-- Sticky Header -->
              <div v-if="selectedCategory && selectedTopic" class="sticky top-0 bg-[#1a1a1a] pt-8 px-8 pb-6 border-b border-[#333333] z-10 shadow-lg">
                <div class="mb-2">
                  <span class="text-xs font-bold text-teal-400 uppercase tracking-wider">{{ selectedCategory.name }}</span>
                </div>
                <h2 class="text-3xl font-bold text-white">{{ selectedTopic.title }}</h2>
              </div>

              <!-- Scrollable Content -->
              <div v-if="selectedTopic" class="p-8">
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
                <!-- Legacy HTML content support -->
                <div v-else-if="selectedTopic.content" class="prose prose-sm max-w-none">
                  <div class="text-sm leading-relaxed text-gray-300" v-html="selectedTopic.content"></div>
                </div>
                <div v-else>
                  <p class="text-sm italic text-gray-500">Detailed content coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Modal -->
        <Teleport to="body">
          <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="showMobileModal"
              class="fixed inset-0 bg-black/50 z-50 lg:hidden"
              @click="closeMobileModal"
            >
              <Transition
                enter-active-class="transition-transform duration-300"
                enter-from-class="translate-y-full"
                enter-to-class="translate-y-0"
                leave-active-class="transition-transform duration-300"
                leave-from-class="translate-y-0"
                leave-to-class="translate-y-full"
              >
                <div
                  v-if="showMobileModal"
                  @click.stop
                  class="fixed inset-0 bg-[#0a0a0a] overflow-y-auto"
                >
                  <!-- Modal Header -->
                  <div v-if="selectedCategory && selectedTopic" class="sticky top-0 px-8 py-6 bg-[#1a1a1a] border-b border-[#333333] z-10">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <div class="text-xs text-gray-500 mb-1">{{ title }}</div>
                        <div class="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">{{ selectedCategory.name }}</div>
                        <h2 class="text-2xl font-bold text-white">{{ selectedTopic.title }}</h2>
                      </div>
                      <button @click="closeMobileModal" class="p-2 text-gray-400 flex-shrink-0">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Modal Content -->
                  <div v-if="selectedTopic" class="p-8">
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
                    <!-- Legacy HTML content support -->
                    <div v-else-if="selectedTopic.content" class="prose prose-sm max-w-none">
                      <div class="text-sm leading-relaxed text-gray-300" v-html="selectedTopic.content"></div>
                    </div>
                    <div v-else>
                      <p class="text-sm italic text-gray-500">Detailed content coming soon...</p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </Teleport>
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
</style>
