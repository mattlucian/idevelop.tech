<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { usePageMeta } from "@/composables/usePageMeta";
import PanelSidebar from "../components/ui/PanelSidebar.vue";
import PanelContent from "../components/ui/PanelContent.vue";
import SelectableItem from "../components/ui/SelectableItem.vue";
import Badge from "../components/elements/badges/Badge.vue";
import type { TechContent, Expertise } from "../types/tech";
import { techContent } from "../data/tech";
import { SITE } from "@/constants";
import { logger } from "@/utils/logger";

// Set meta tags for Tech Experience page
usePageMeta({
  title:
    "Technical Expertise | I Develop Tech - Small Business Technology Solutions",
  slug: "tech",
  description:
    "Expert technical capabilities for small businesses: software development, cloud infrastructure, DevOps automation, system integrations, and technical leadership. 10+ years delivering scalable, cost-effective solutions.",
  ogDescription:
    "Comprehensive technical expertise helping small businesses build scalable systems, automate operations, and grow efficiently. Software engineering, cloud architecture, integrations, and more.",
  ogImage: SITE.ogImage,
});

const router = useRouter();

const domainData = ref<TechContent | null>(null);
const loadError = ref(false);
const selectedCategoryIndex = ref(-1);
const selectedTopicIndex = ref(-1);
const contentPanelRef = ref<InstanceType<typeof PanelContent> | null>(null);

const selectedCategory = computed(
  () => domainData.value?.categories[selectedCategoryIndex.value],
);

const selectedTopic = computed<Expertise | undefined>(
  () => selectedCategory.value?.topics[selectedTopicIndex.value],
);

// Load tech experience data
const loadTechData = () => {
  try {
    domainData.value = techContent;

    // Validate data structure
    if (!domainData.value || !domainData.value.categories?.length) {
      throw new Error("Tech content data is invalid or empty");
    }

    // Auto-select first topic on desktop/tablet (1024px+)
    if (window.innerWidth >= 1024) {
      selectedCategoryIndex.value = 0;
      selectedTopicIndex.value = 0;
    } else {
      selectedCategoryIndex.value = -1;
      selectedTopicIndex.value = -1;
    }
  } catch (error) {
    loadError.value = true;
    logger.error("Failed to load tech data", error, { component: "TechView" });
  }
};

const selectTopic = async (categoryIndex: number, topicIndex: number) => {
  selectedCategoryIndex.value = categoryIndex;
  selectedTopicIndex.value = topicIndex;

  // Scroll the content panel to top
  await nextTick();
  if (contentPanelRef.value) {
    contentPanelRef.value.scrollToTop();
  }
};

const goBack = () => {
  // Navigate to previous page
  router.back();
};

const goBackToTopics = () => {
  selectedCategoryIndex.value = -1;
  selectedTopicIndex.value = -1;
};

const handlePanelClose = () => {
  // On desktop (1024px+), go back to home
  // On mobile, return to topics list
  if (window.innerWidth >= 1024) {
    goBack();
  } else {
    goBackToTopics();
  }
};

const refreshPage = () => {
  window.location.reload();
};

// Load data when component mounts
onMounted(() => {
  loadTechData();
  // Lock body scroll
  document.body.style.overflow = "hidden";
});

// Re-enable body scroll when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="fixed inset-0 top-16 bg-[#0a0a0a] text-white overflow-hidden">
    <!-- Error State -->
    <div v-if="loadError" class="flex items-center justify-center h-full px-6">
      <div class="text-center max-w-md">
        <h2 class="text-2xl font-bold text-red-400 mb-4">
          Unable to Load Technical Expertise
        </h2>
        <p class="text-slate-400 mb-6">
          We encountered an error loading the technical expertise data. Please
          refresh the page to try again.
        </p>
        <button
          class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          @click="refreshPage"
        >
          Refresh Page
        </button>
      </div>
    </div>

    <div v-else-if="domainData" class="w-full h-full">
      <!-- Background overlay - clickable to close -->
      <div
        class="absolute inset-0 bg-[#0a0a0a]/95 z-50 cursor-pointer"
        @click="goBack"
      />

      <!-- Topic List Sidebar (slides from left) -->
      <Transition name="slide-left">
        <PanelSidebar
          v-if="domainData"
          color-scheme="emerald"
          :hide-on-mobile="!!selectedTopic"
          @close="goBack"
        >
          <template #header>
            <h1
              class="text-xl lg:text-3xl font-bold text-white leading-none mb-2"
            >
              Tech Experience
            </h1>
            <p class="text-xs md:text-sm text-gray-400 leading-relaxed">
              Browse my technical expertise
            </p>
          </template>

          <!-- Categories and Topics -->
          <div
            v-for="(category, categoryIndex) in domainData.categories"
            :key="categoryIndex"
          >
            <!-- Category Header -->
            <div class="mb-3">
              <h3
                class="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1"
              >
                {{ category.name }}
              </h3>
              <p class="text-xs text-gray-500">
                {{ category.subtitle }}
              </p>
            </div>

            <!-- Topics in this category -->
            <div class="space-y-2 mb-6">
              <SelectableItem
                v-for="(topic, topicIndex) in category.topics"
                :key="topicIndex"
                :title="topic.title"
                :subtitle="topic.subtitle"
                :is-selected="
                  selectedCategoryIndex === categoryIndex &&
                  selectedTopicIndex === topicIndex
                "
                color-scheme="emerald"
                @click="selectTopic(categoryIndex, topicIndex)"
              />
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
          @close="handlePanelClose"
        >
          <template #header>
            <div class="mb-2">
              <span
                class="text-xs font-bold text-emerald-400 uppercase tracking-wider"
                >{{ selectedCategory?.name }}</span
              >
            </div>
            <h2 class="text-3xl font-bold text-white">
              {{ selectedTopic?.title }}
            </h2>
          </template>

          <!-- Topic Content -->
          <div v-if="selectedTopic && selectedCategory">
            <div
              v-if="
                selectedTopic.skillTags ||
                selectedTopic.intro ||
                selectedTopic.sections
              "
              class="prose prose-sm max-w-none"
            >
              <div class="text-sm leading-relaxed text-gray-300">
                <!-- Skill Tags -->
                <div
                  v-if="
                    selectedTopic.skillTags &&
                    selectedTopic.skillTags.length > 0
                  "
                  class="mb-6 flex flex-wrap gap-2"
                >
                  <Badge
                    v-for="(tag, index) in selectedTopic.skillTags"
                    :key="index"
                    variant="emerald"
                  >
                    {{ tag }}
                  </Badge>
                </div>

                <!-- Intro Box -->
                <div
                  v-if="selectedTopic.intro"
                  class="mb-6 p-4 bg-gray-800/50 border-l-4 border-emerald-500 rounded-r-lg"
                >
                  <p class="text-gray-300 italic">
                    {{ selectedTopic.intro }}
                  </p>
                </div>

                <!-- Sections -->
                <div
                  v-if="
                    selectedTopic.sections && selectedTopic.sections.length > 0
                  "
                  class="space-y-6"
                >
                  <div
                    v-for="(sectionItem, index) in selectedTopic.sections"
                    :key="index"
                  >
                    <h4
                      class="font-semibold text-lg mb-3 text-emerald-300 border-b border-gray-700 pb-2"
                    >
                      {{ sectionItem.heading }}
                    </h4>
                    <p class="mb-4 text-gray-300">
                      {{ sectionItem.content }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-sm italic text-gray-500">
                Detailed content coming soon...
              </p>
            </div>
          </div>
        </PanelContent>
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
