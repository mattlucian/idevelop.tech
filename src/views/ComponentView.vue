<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Step } from '../types/shared/card'
import type { Testimonial } from '../types/service'

// Layout components
import PanelSidebar from '../components/ui/PanelSidebar.vue'
import PanelContent from '../components/ui/PanelContent.vue'

// Elements
import PrimaryButton from '../components/elements/buttons/PrimaryButton.vue'
import OutlineButton from '../components/elements/buttons/OutlineButton.vue'
import IconButton from '../components/elements/buttons/IconButton.vue'
import Badge from '../components/elements/badges/Badge.vue'
import IconBadge from '../components/elements/badges/IconBadge.vue'
import TypewriterText from '../components/elements/interactive/TypewriterText.vue'
import CheckItem from '../components/elements/CheckItem.vue'
import ContactInfoItem from '../components/elements/ContactInfoItem.vue'
import LoadingSpinner from '../components/elements/LoadingSpinner.vue'
import SocialIcon from '../components/elements/SocialIcon.vue'

// Cards
import ServiceCard from '../components/cards/ServiceCard.vue'
import IconCard from '../components/cards/IconCard.vue'
import ThinIconCard from '../components/cards/ThinIconCard.vue'
import TestimonialCard from '../components/cards/TestimonialCard.vue'
import InfoCard from '../components/cards/InfoCard.vue'
import AttributionCard from '../components/cards/AttributionCard.vue'
import PortfolioItem from '../components/cards/PortfolioItem.vue'

// Display
import Timeline from '../components/display/Timeline.vue'

// UI Components
import SectionHeader from '../components/ui/SectionHeader.vue'
import SelectableItem from '../components/ui/SelectableItem.vue'
import ComponentShowcaseSection from '../components/ui/ComponentShowcaseSection.vue'

interface SubSection {
  title: string
  description: string
  slotName: string
}

const router = useRouter()
const contentPanelRef = ref<InstanceType<typeof PanelContent> | null>(null)
const selectedComponentId = ref<string | null>(null)

// Computed property to get the currently selected component info
const selectedComponent = computed(() => {
  if (!selectedComponentId.value) return null
  for (const category of categories) {
    const component = category.components.find((c) => c.id === selectedComponentId.value)
    if (component) return component
  }
  return null
})

interface Component {
  id: string
  name: string
  description: string
}

interface ComponentCategory {
  name: string
  components: Component[]
}

const categories: ComponentCategory[] = [
  {
    name: 'Elements',
    components: [
      { id: 'buttons', name: 'Buttons', description: 'Primary, outline, and icon buttons' },
      { id: 'badges', name: 'Badges', description: 'Text badges and icon badges' },
      { id: 'typewriter', name: 'Typewriter Text', description: 'Animated typing effect' },
      { id: 'check-item', name: 'Check Item', description: 'List item with checkmark' },
      { id: 'contact-info', name: 'Contact Info Item', description: 'Contact information display' },
      { id: 'loading-spinner', name: 'Loading Spinner', description: 'Loading indicator' },
      { id: 'social-icon', name: 'Social Icon', description: 'Social media icons' },
    ],
  },
  {
    name: 'Cards',
    components: [
      { id: 'service-card', name: 'Service Card', description: 'Service offering card' },
      { id: 'icon-card', name: 'Icon Card', description: 'Boxed icon grid' },
      { id: 'thin-icon-card', name: 'Thin Icon Card', description: 'Inline icon cards' },
      { id: 'testimonial-card', name: 'Testimonial Card', description: 'Customer testimonials' },
      { id: 'info-card', name: 'Info Card', description: 'Information display card' },
      { id: 'attribution-card', name: 'Attribution Card', description: 'Image attribution card' },
      { id: 'portfolio-item', name: 'Portfolio Item', description: 'Portfolio project card' },
    ],
  },
  {
    name: 'Display',
    components: [{ id: 'timeline', name: 'Timeline', description: 'Vertical timeline component' }],
  },
  {
    name: 'UI Components',
    components: [
      { id: 'section-header', name: 'Section Header', description: 'Page section headers' },
      {
        id: 'panels',
        name: 'Panel Components',
        description: 'Layout panels for views',
      },
    ],
  },
]

const typewriterPhrases = ['component library', 'design system', 'reusable patterns']

// Subsection configurations for each component
const buttonSubsections: SubSection[] = [
  {
    title: 'Primary Button',
    description: 'Our main button component with gradient border styling',
    slotName: 'primary-button',
  },
  {
    title: 'Outline Button',
    description: 'Outline button with cyan and emerald color variants',
    slotName: 'outline-button',
  },
  {
    title: 'Icon Button',
    description: 'Compact icon-only buttons with hover effects',
    slotName: 'icon-button',
  },
]

const badgeSubsections: SubSection[] = [
  {
    title: 'Badge Variants',
    description: 'Text badges with different color schemes',
    slotName: 'badge-variants',
  },
  {
    title: 'Icon Badges',
    description: 'Badges with icon and text combinations',
    slotName: 'icon-badges',
  },
]

// Example data
const serviceCardExample = {
  icon: '🎨',
  label: 'Design',
  title: 'Web Design',
  tagline: 'Professional websites that drive real business results',
  stats: [
    { value: '10+', label: 'Projects' },
    { value: '50+', label: 'Components' },
    { value: '100%', label: 'Satisfaction' },
  ],
  tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
  heroImage: 'https://images.unsplash.com/photo-1542744173-b3cd6377db95',
}

const iconCardSteps: Step[] = [
  {
    icon: '⚡',
    label: 'Fast Performance',
    desc: 'Lightning-fast load times and smooth interactions',
  },
  {
    icon: '🎯',
    label: 'Precise Solutions',
    desc: 'Targeted approaches for your specific needs',
  },
]

const thinIconCardSteps: Step[] = [
  {
    icon: '📈',
    label: 'Growth',
    desc: 'Scale your business',
  },
  {
    icon: '🔒',
    label: 'Security',
    desc: 'Protected systems',
  },
  {
    icon: '⚙️',
    label: 'Automation',
    desc: 'Streamlined workflows',
  },
]

const testimonialExample: Testimonial = {
  quote: 'This is an example testimonial showcasing the component in action.',
  author: 'John Doe',
  role: 'CEO',
  company: 'Example Corp',
}

const timelineSteps: Step[] = [
  {
    icon: '1️⃣',
    label: 'Discovery',
    desc: 'Understand your needs and requirements',
  },
  {
    icon: '2️⃣',
    label: 'Planning',
    desc: 'Design the solution architecture',
  },
  {
    icon: '3️⃣',
    label: 'Implementation',
    desc: 'Build and deploy the solution',
  },
  {
    icon: '✅',
    label: 'Launch',
    desc: 'Go live and provide ongoing support',
  },
]

const selectComponent = async (componentId: string) => {
  selectedComponentId.value = componentId

  // Scroll the content panel to top
  await nextTick()
  if (contentPanelRef.value) {
    contentPanelRef.value.scrollToTop()
  }
}

const goBack = () => {
  router.push({ name: 'home' })
}

const goBackToComponents = () => {
  selectedComponentId.value = null
}

const handlePanelClose = () => {
  // On desktop (1024px+), go back to home
  // On mobile, return to components list
  if (window.innerWidth >= 1024) {
    goBack()
  } else {
    goBackToComponents()
  }
}

// Auto-select first component on desktop
onMounted(() => {
  if (window.innerWidth >= 1024) {
    selectedComponentId.value = 'buttons'
  }
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen pt-20 bg-[#0a0a0a] text-white">
    <div class="w-full">
      <!-- Background overlay -->
      <div class="fixed inset-0 top-16 bg-[#0a0a0a]/95 z-50 cursor-pointer" @click="goBack"></div>

      <!-- Component List Sidebar -->
      <Transition name="slide-left">
        <PanelSidebar
          color-scheme="cyan"
          :hide-on-mobile="!!selectedComponentId"
          @click="$event.stopPropagation()"
        >
          <div class="px-6 py-8">
            <h2
              class="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Component Library
            </h2>
            <p class="text-gray-400 text-sm mb-8">Organized by directory structure</p>

            <!-- Categories and Components -->
            <div class="space-y-8">
              <div v-for="category in categories" :key="category.name">
                <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  {{ category.name }}
                </h3>
                <div class="space-y-1">
                  <SelectableItem
                    v-for="component in category.components"
                    :key="component.id"
                    :title="component.name"
                    :subtitle="component.description"
                    :is-selected="selectedComponentId === component.id"
                    color-scheme="cyan"
                    @click="selectComponent(component.id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </PanelSidebar>
      </Transition>

      <!-- Content Panel -->
      <Transition name="slide-right">
        <PanelContent
          v-if="selectedComponentId"
          ref="contentPanelRef"
          @close="handlePanelClose"
          @click="$event.stopPropagation()"
        >
          <template #header>
            <h1
              class="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              {{ selectedComponent?.name }}
            </h1>
            <p class="text-gray-400">{{ selectedComponent?.description }}</p>
          </template>

          <!-- Buttons -->
          <ComponentShowcaseSection
            v-if="selectedComponentId === 'buttons'"
            :subsections="buttonSubsections"
          >
            <template #primary-button>
              <PrimaryButton>Default</PrimaryButton>
              <PrimaryButton color-scheme="emerald">Emerald</PrimaryButton>
              <PrimaryButton color-scheme="purple">Purple</PrimaryButton>
            </template>
            <template #outline-button>
              <OutlineButton color-scheme="cyan">Hire Me</OutlineButton>
              <OutlineButton color-scheme="emerald">&lt;/&gt;</OutlineButton>
              <OutlineButton color-scheme="cyan">Keep browsing</OutlineButton>
              <OutlineButton color-scheme="cyan">Back to business</OutlineButton>
            </template>
            <template #icon-button>
              <IconButton icon="←" />
              <IconButton icon="→" />
              <IconButton icon="✕" />
              <IconButton icon="⚙️" />
            </template>
          </ComponentShowcaseSection>

          <!-- Badges -->
          <ComponentShowcaseSection
            v-if="selectedComponentId === 'badges'"
            :subsections="badgeSubsections"
          >
            <template #badge-variants>
              <Badge variant="default">Default (Cyan/Purple)</Badge>
              <Badge variant="teal">Teal</Badge>
              <Badge variant="cyan">Cyan</Badge>
              <Badge variant="purple">Purple</Badge>
              <Badge variant="emerald">Emerald</Badge>
              <Badge variant="muted">Muted</Badge>
            </template>
            <template #icon-badges>
              <IconBadge icon="⚡" />
              <IconBadge icon="🚀" color-scheme="emerald" />
              <IconBadge icon="🎨" color-scheme="purple" />
              <IconBadge icon="📊" size="lg" />
            </template>
          </ComponentShowcaseSection>

          <!-- Typewriter -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'typewriter'">
            <div class="text-2xl">
              I develop
              <TypewriterText :phrases="typewriterPhrases" class="text-cyan-400" />
            </div>
          </ComponentShowcaseSection>

          <!-- Check Item -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'check-item'">
            <ul class="space-y-2">
              <CheckItem>Systems handling billions of transactions</CheckItem>
              <CheckItem>50% infrastructure cost reduction</CheckItem>
              <CheckItem color="emerald">Cloud-native architecture design</CheckItem>
              <CheckItem color="emerald">Full-stack development</CheckItem>
            </ul>
          </ComponentShowcaseSection>

          <!-- Contact Info Item -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'contact-info'">
            <div class="space-y-3">
              <ContactInfoItem icon="📧" label="Email">
                <a href="mailto:matt@idevelop.tech" class="text-cyan-400 hover:text-cyan-300">
                  matt@idevelop.tech
                </a>
              </ContactInfoItem>
              <ContactInfoItem icon="📍" label="Location">
                Florida, USA
              </ContactInfoItem>
              <ContactInfoItem icon="💼" label="Status" color="emerald">
                Available for consulting
              </ContactInfoItem>
            </div>
          </ComponentShowcaseSection>

          <!-- Loading Spinner -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'loading-spinner'">
            <div class="space-y-8">
              <div class="flex gap-6 items-center">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </div>
              <div class="flex gap-6">
                <LoadingSpinner message="Loading calendar..." />
                <LoadingSpinner color="emerald" message="Processing..." />
              </div>
            </div>
          </ComponentShowcaseSection>

          <!-- Social Icon -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'social-icon'">
            <div class="flex gap-4">
              <SocialIcon platform="linkedin" url="https://www.linkedin.com/in/matt-lucian/" />
              <SocialIcon platform="github" url="https://github.com/mattlucian" />
            </div>
          </ComponentShowcaseSection>

          <!-- Service Card -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'service-card'">
            <ServiceCard v-bind="serviceCardExample" />
          </ComponentShowcaseSection>

          <!-- Icon Card -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'icon-card'">
            <IconCard :steps="iconCardSteps" />
          </ComponentShowcaseSection>

          <!-- Thin Icon Card -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'thin-icon-card'">
            <ThinIconCard :steps="thinIconCardSteps" />
          </ComponentShowcaseSection>

          <!-- Testimonial Card -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'testimonial-card'">
            <TestimonialCard :testimonial="testimonialExample" />
          </ComponentShowcaseSection>

          <!-- Info Card -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'info-card'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard title="Information Card" icon="ℹ️">
                <p class="text-gray-400">
                  This card displays important information with a clean layout.
                </p>
              </InfoCard>
              <InfoCard title="Key Feature" icon="🔑">
                <p class="text-gray-400">Important information displayed clearly</p>
              </InfoCard>
            </div>
          </ComponentShowcaseSection>

          <!-- Attribution Card -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'attribution-card'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AttributionCard
                title="Cloud Consulting"
                imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
                imageAlt="Global network visualization"
                description="A stunning view of Earth from space with network connections"
                photographer="NASA"
                photographerUrl="https://unsplash.com/@nasa"
                photoUrl="https://unsplash.com/photos/Q1p7bh3SHj8"
              />
              <AttributionCard
                title="eCommerce Operations"
                imageUrl="https://images.unsplash.com/photo-1472851294608-062f824d29cc"
                imageAlt="Shopping cart"
                description="Modern eCommerce shopping experience"
                photographer="Justus Menke"
                photographerUrl="https://unsplash.com/@justusmenke"
                photoUrl="https://unsplash.com/photos/Bk6BkiSDHkc"
              />
            </div>
          </ComponentShowcaseSection>

          <!-- Portfolio Item -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'portfolio-item'">
            <div class="space-y-4">
              <PortfolioItem
                :item="{
                  name: 'Shopify',
                  description: 'Complete commerce platform',
                  logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
                  url: 'https://shopify.com',
                }"
                color-scheme="cyan"
              />
              <PortfolioItem
                :item="{
                  name: 'AWS',
                  description: 'Cloud infrastructure platform',
                  logo: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg',
                  url: 'https://aws.amazon.com',
                }"
                color-scheme="emerald"
              />
            </div>
          </ComponentShowcaseSection>

          <!-- Timeline -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'timeline'">
            <Timeline :steps="timelineSteps" />
          </ComponentShowcaseSection>

          <!-- Section Header -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'section-header'">
            <SectionHeader
              title="Example Section"
              icon="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <p class="text-sm text-gray-400 mt-2">This is how the section header looks</p>
          </ComponentShowcaseSection>

          <!-- Panels -->
          <ComponentShowcaseSection v-if="selectedComponentId === 'panels'">
            <div class="space-y-4">
              <p class="text-gray-400">
                Panel components (PanelContent, PanelSidebar) are used in views for layout and are
                not showcased individually.
              </p>
              <p class="text-gray-400">
                <strong class="text-white">This page uses them!</strong> The left sidebar is
                PanelSidebar and this content area is PanelContent (which works on both mobile and
                desktop).
              </p>
            </div>
          </ComponentShowcaseSection>
        </PanelContent>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
