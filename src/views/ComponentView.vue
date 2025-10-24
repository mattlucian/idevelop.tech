<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcaseContent from '../components/ui/ShowcaseContent.vue'

const expertisePhrases: string[] = [
  'managing your tech stack',
  'integrating your systems',
  'AI training & adoption',
]

interface ComponentItem {
  id: string
  name: string
  description: string
  category: string
}

const components: ComponentItem[] = [
  // Design Foundation
  {
    id: 'colors',
    name: 'Color Palette',
    description: 'Core colors and gradients',
    category: 'Design Foundation',
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Font sizes and responsive scaling',
    category: 'Design Foundation',
  },
  {
    id: 'spacing',
    name: 'Spacing System',
    description: 'Padding, margins, and gaps',
    category: 'Design Foundation',
  },

  // Interactive Components
  {
    id: 'typewriter',
    name: 'TypewriterText',
    description: 'Animated typing effect component',
    category: 'Interactive Components',
  },
  {
    id: 'gradient-text',
    name: 'Gradient Text',
    description: 'Text with gradient fill effects',
    category: 'Interactive Components',
  },
  {
    id: 'cta-button',
    name: 'CTA Buttons',
    description: 'Call-to-action button patterns',
    category: 'Interactive Components',
  },
  {
    id: 'button-variants',
    name: 'Button Variants',
    description: 'CTA, Service, and Dark button styles',
    category: 'Interactive Components',
  },
  {
    id: 'button-groups',
    name: 'Button Groups',
    description: 'Multiple buttons in a row',
    category: 'Interactive Components',
  },

  // Data Display
  {
    id: 'stat-boxes',
    name: 'Stat Boxes',
    description: '3-column value/label grid',
    category: 'Data Display',
  },
  {
    id: 'tag-pills',
    name: 'Tag Pills',
    description: 'Skill and technology tags',
    category: 'Data Display',
  },
  {
    id: 'badge-grid',
    name: 'Badge Grid',
    description: 'Metric and statistic display',
    category: 'Data Display',
  },
  {
    id: 'icon-badges',
    name: 'Icon Badges',
    description: 'Circular icon containers',
    category: 'Data Display',
  },
  {
    id: 'icon-list',
    name: 'Icon Lists',
    description: 'Lists with checkmarks or icons',
    category: 'Data Display',
  },

  // Layout Patterns
  {
    id: 'cards',
    name: 'Card Variants',
    description: 'Service cards and experience cards',
    category: 'Layout Patterns',
  },
  {
    id: 'side-panel',
    name: 'Side Panel Page Layout',
    description: 'Complete implementation with mobile modal',
    category: 'Layout Patterns',
  },

  // Content Elements
  {
    id: 'section-heading',
    name: 'Section Headings',
    description: 'Headers with underlines',
    category: 'Content Elements',
  },
  {
    id: 'intro-box',
    name: 'Intro Box',
    description: 'Highlighted overview text',
    category: 'Content Elements',
  },
  {
    id: 'border-accent',
    name: 'Border Accent Boxes',
    description: 'Left/top border highlights',
    category: 'Content Elements',
  },
  {
    id: 'blur-decoration',
    name: 'Decorative Blurs',
    description: 'Background blur orbs',
    category: 'Content Elements',
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Header with mobile menu',
    category: 'Content Elements',
  },
  {
    id: 'scrollbar',
    name: 'Custom Scrollbar',
    description: 'Styled scrollbar pattern',
    category: 'Content Elements',
  },

  // Workflow Components
  {
    id: 'workflow-boxed',
    name: 'WorkflowBoxed',
    description: 'Centered icon cards in 2-column grid',
    category: 'Workflow Components',
  },
  {
    id: 'workflow-boxed-inline',
    name: 'WorkflowBoxedInline',
    description: 'Icon left, content right cards',
    category: 'Workflow Components',
  },
  {
    id: 'workflow-timeline',
    name: 'Timeline',
    description: 'Vertical timeline with connecting line',
    category: 'Display Components',
  },
]

const selectedComponentId = ref<string>('colors')
const showMobileModal = ref<boolean>(false)

const selectedComponent = computed(() => components.find((c) => c.id === selectedComponentId.value))

const categories = computed(() => {
  const cats = new Map<string, ComponentItem[]>()
  components.forEach((comp) => {
    if (!cats.has(comp.category)) {
      cats.set(comp.category, [])
    }
    cats.get(comp.category)!.push(comp)
  })
  return cats
})

const selectComponent = (id: string) => {
  selectedComponentId.value = id
  showMobileModal.value = true
}

const closeMobileModal = () => {
  showMobileModal.value = false
}
</script>

<template>
  <div class="min-h-screen pt-16 bg-[#0a0a0a] text-white">
    <!-- Mobile Modal Overlay -->
    <Transition name="fade">
      <div
        v-if="showMobileModal"
        class="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-[#0a0a0a] z-40 flex flex-col"
      >
        <!-- Close Button Header (sticky at top) -->
        <div
          class="sticky top-0 bg-[#0a0a0a] border-b border-[#333333] p-3 flex items-center gap-3 z-10"
        >
          <button
            @click="closeMobileModal"
            class="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 class="text-xl font-bold text-white">{{ selectedComponent?.name }}</h2>
        </div>

        <!-- Mobile Modal Content (scrollable) -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="space-y-6">
            <ShowcaseContent
              :selected-component-id="selectedComponentId"
              :expertise-phrases="expertisePhrases"
            />
          </div>
        </div>
      </div>
    </Transition>

    <div class="fixed top-16 inset-0 flex">
      <!-- Left Panel - Component List -->
      <div
        class="w-full lg:w-96 border-r border-[#333333] overflow-y-auto scrollbar-visible bg-[#0a0a0a]"
      >
        <div class="p-6">
          <div class="mb-6">
            <h1 class="text-2xl lg:text-3xl font-bold mb-2">
              <span class="text-white">Design System </span>
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400"
                >Library</span
              >
            </h1>
            <p class="text-sm text-gray-400">Browse all components and patterns</p>
          </div>

          <!-- Component Categories -->
          <div class="space-y-6">
            <div v-for="[category, items] in categories" :key="category">
              <div class="mb-3">
                <div class="flex items-center gap-2 mb-2">
                  <svg
                    class="w-4 h-4 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  <h3 class="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    {{ category }}
                  </h3>
                </div>
              </div>

              <div class="space-y-2">
                <button
                  v-for="item in items"
                  :key="item.id"
                  @click="selectComponent(item.id)"
                  :class="[
                    'w-full text-left p-3 rounded-lg border-2 transition-all group',
                    selectedComponentId === item.id
                      ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500'
                      : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-cyan-500/50 hover:bg-[#1f1f1f]',
                  ]"
                >
                  <h4
                    :class="[
                      'text-sm font-semibold mb-1',
                      selectedComponentId === item.id
                        ? 'text-cyan-400'
                        : 'text-white group-hover:text-cyan-400',
                    ]"
                  >
                    {{ item.name }}
                  </h4>
                  <p
                    :class="[
                      'text-xs',
                      selectedComponentId === item.id ? 'text-cyan-300' : 'text-gray-400',
                    ]"
                  >
                    {{ item.description }}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Component Display -->
      <div class="hidden lg:block flex-1 overflow-y-auto scrollbar-visible">
        <div class="max-w-4xl mx-auto p-8">
          <!-- Component Header -->
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">{{ selectedComponent?.name }}</h2>
            <p class="text-gray-400">{{ selectedComponent?.description }}</p>
          </div>

          <!-- Component Content -->
          <div class="space-y-8">
            <ShowcaseContent
              :selected-component-id="selectedComponentId"
              :expertise-phrases="expertisePhrases"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Visible scrollbar styling */
.scrollbar-visible::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-visible::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}

.scrollbar-visible::-webkit-scrollbar-thumb:hover {
  background: #444444;
}
</style>
