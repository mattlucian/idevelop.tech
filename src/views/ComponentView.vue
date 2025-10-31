<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMeta } from '../composables/useMeta'
import type { Step } from '../types/shared/card'
import { CONTACT, SITE } from '@/constants'

// SEO Meta Tags
useMeta({
  title: 'Component Showcase - Design System | I Develop Tech',
  description:
    'Interactive design system showcase featuring 42 reusable Vue components. Explore buttons, cards, UI components, and layouts used across the I Develop Tech platform.',
  ogTitle: 'Component Showcase - Design System | I Develop Tech',
  ogDescription:
    'Browse our component library: 42 reusable Vue components including buttons, badges, cards, and complex UI elements.',
  ogUrl: `${SITE.url}/components`,
  ogImage: `${SITE.url}/og-image-components.jpg`,
})

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
import GradientText from '../components/elements/GradientText.vue'
import CheckItem from '../components/elements/CheckItem.vue'
import ContactInfoItem from '../components/elements/ContactInfoItem.vue'
import LoadingSpinner from '../components/elements/LoadingSpinner.vue'
import SocialIcon from '../components/elements/SocialIcon.vue'
import NumberedStep from '../components/elements/NumberedStep.vue'
import SimpleCheckItem from '../components/elements/SimpleCheckItem.vue'

// Cards
import ServiceCard from '../components/cards/ServiceCard.vue'
import InfoCard from '../components/cards/InfoCard.vue'
import AttributionCard from '../components/cards/AttributionCard.vue'
import PortfolioItem from '../components/cards/PortfolioItem.vue'
import BenefitCard from '../components/cards/BenefitCard.vue'
import SimpleTestimonial from '../components/cards/SimpleTestimonial.vue'

// Display
import Timeline from '../components/display/Timeline.vue'
import IconFlowStep from '../components/display/IconFlowStep.vue'

// UI Components
import SelectableItem from '../components/ui/SelectableItem.vue'
import BreadcrumbNav from '../components/ui/BreadcrumbNav.vue'
import ServiceSection from '../components/ui/ServiceSection.vue'
import TabButton from '../components/ui/TabButton.vue'
import TwoColumnListSection from '../components/ui/TwoColumnListSection.vue'
import CTASection from '../components/ui/CTASection.vue'
import CTAForm from '../components/ui/CTAForm.vue'
import FloatingActionBar from '../components/ui/FloatingActionBar.vue'

// Integration Components
import SystemBox from '../components/integration/SystemBox.vue'
import EntityMappingFlow from '../components/integration/EntityMappingFlow.vue'
import IntegrationDiagram from '../components/integration/IntegrationDiagram.vue'
import DetailedEntityMapping from '../components/integration/DetailedEntityMapping.vue'

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
      { id: 'gradient-text', name: 'Gradient Text', description: 'Text with gradient styling' },
      { id: 'typewriter', name: 'Typewriter Text', description: 'Animated typing effect' },
      { id: 'check-item', name: 'Check Item', description: 'List item with checkmark' },
      {
        id: 'simple-check-item',
        name: 'Simple Check Item',
        description: 'Compact list item with checkmark',
      },
      { id: 'numbered-step', name: 'Numbered Step', description: 'Numbered process step item' },
      { id: 'contact-info', name: 'Contact Info Item', description: 'Contact information display' },
      { id: 'loading-spinner', name: 'Loading Spinner', description: 'Loading indicator' },
      { id: 'social-icon', name: 'Social Icon', description: 'Social media icons' },
    ],
  },
  {
    name: 'Cards',
    components: [
      { id: 'service-card', name: 'Service Card', description: 'Service offering card' },
      { id: 'benefit-card', name: 'Benefit Card', description: 'Feature benefit display' },
      { id: 'info-card', name: 'Info Card', description: 'Information display card' },
      {
        id: 'simple-testimonial',
        name: 'Simple Testimonial',
        description: 'Compact testimonial card',
      },
      { id: 'attribution-card', name: 'Attribution Card', description: 'Image attribution card' },
      { id: 'portfolio-item', name: 'Portfolio Item', description: 'Portfolio project card' },
    ],
  },
  {
    name: 'Display',
    components: [
      { id: 'timeline', name: 'Timeline', description: 'Vertical timeline component' },
      { id: 'icon-flow-step', name: 'IconFlowStep', description: 'Icon box for process flows' },
    ],
  },
  {
    name: 'UI Components',
    components: [
      {
        id: 'panels',
        name: 'Panel Components',
        description: 'Layout panels for views',
      },
      { id: 'breadcrumb-nav', name: 'Breadcrumb Nav', description: 'Navigation breadcrumb' },
      {
        id: 'service-section',
        name: 'Service Section',
        description: 'Unified section component (hero, benefits, portfolio)',
      },
      { id: 'tab-button', name: 'Tab Button', description: 'Tab navigation button' },
      {
        id: 'two-column-list',
        name: 'Two Column List Section',
        description: 'List content in two columns',
      },
      { id: 'cta-section', name: 'CTA Section', description: 'Call-to-action section' },
      { id: 'cta-form', name: 'CTA Form', description: 'Contact form with service selector' },
      {
        id: 'floating-action-bar',
        name: 'Floating Action Bar',
        description: 'Sticky call-to-action button',
      },
    ],
  },
  {
    name: 'Integration',
    components: [
      { id: 'system-box', name: 'System Box', description: 'System representation box' },
      {
        id: 'entity-mapping',
        name: 'Entity Mapping Flow',
        description: 'Entity mapping visualization',
      },
      {
        id: 'integration-diagram',
        name: 'Integration Diagram',
        description: 'Complete integration flow',
      },
      {
        id: 'detailed-entity-mapping',
        name: 'Detailed Entity Mapping',
        description: 'Detailed mapping view',
      },
    ],
  },
]

const typewriterPhrases = ['component library', 'design system', 'reusable patterns']

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
  <div class="fixed inset-0 pt-16 bg-[#0a0a0a] text-white overflow-hidden">
    <div class="w-full h-full">
      <!-- Background overlay -->
      <div class="absolute inset-0 bg-[#0a0a0a]/95 z-40 cursor-pointer" @click="goBack"></div>

      <!-- Component List Sidebar -->
      <Transition name="slide-left">
        <PanelSidebar
          color-scheme="cyan"
          :hide-on-mobile="!!selectedComponentId"
          @click="$event.stopPropagation()"
        >
          <div class="px-6 py-8">
            <GradientText tag="h2" class="text-3xl sm:text-4xl font-bold mb-2">
              Component Library
            </GradientText>
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
            <GradientText tag="h1" class="text-3xl sm:text-4xl font-bold mb-2">
              {{ selectedComponent?.name }}
            </GradientText>
            <p class="text-gray-400">{{ selectedComponent?.description }}</p>
          </template>

          <!-- Buttons -->
          <div v-if="selectedComponentId === 'buttons'" class="space-y-8">
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Primary Button</h3>
              <p class="text-sm text-gray-400 mb-4">
                Our main button component with gradient border styling
              </p>
              <div class="flex flex-wrap gap-4">
                <PrimaryButton>Default</PrimaryButton>
                <PrimaryButton color-scheme="emerald">Emerald</PrimaryButton>
                <PrimaryButton color-scheme="purple">Purple</PrimaryButton>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Outline Button</h3>
              <p class="text-sm text-gray-400 mb-4">
                Outline button with cyan and emerald color variants
              </p>
              <div class="flex flex-wrap gap-4">
                <OutlineButton color-scheme="cyan">Hire Me</OutlineButton>
                <OutlineButton color-scheme="emerald">&lt;/&gt;</OutlineButton>
                <OutlineButton color-scheme="cyan">Keep browsing</OutlineButton>
                <OutlineButton color-scheme="cyan">Back to business</OutlineButton>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Icon Button</h3>
              <p class="text-sm text-gray-400 mb-4">Compact icon-only buttons with hover effects</p>
              <div class="flex flex-wrap gap-4">
                <IconButton icon="←" />
                <IconButton icon="→" />
                <IconButton icon="✕" />
                <IconButton icon="⚙️" />
              </div>
            </div>
          </div>

          <!-- Badges -->
          <div v-if="selectedComponentId === 'badges'" class="space-y-8">
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Badge Variants</h3>
              <p class="text-sm text-gray-400 mb-4">Text badges with different color schemes</p>
              <div class="flex flex-wrap gap-2">
                <Badge variant="default">Default (Cyan/Purple)</Badge>
                <Badge variant="teal">Teal</Badge>
                <Badge variant="cyan">Cyan</Badge>
                <Badge variant="purple">Purple</Badge>
                <Badge variant="emerald">Emerald</Badge>
                <Badge variant="muted">Muted</Badge>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Icon Badges</h3>
              <p class="text-sm text-gray-400 mb-4">Badges with icon and text combinations</p>
              <div class="flex flex-wrap gap-2">
                <IconBadge icon="⚡" />
                <IconBadge icon="🚀" color-scheme="emerald" />
                <IconBadge icon="🎨" color-scheme="purple" />
                <IconBadge icon="📊" size="lg" />
              </div>
            </div>
          </div>

          <!-- Gradient Text -->
          <div v-if="selectedComponentId === 'gradient-text'" class="space-y-6">
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Default Gradient</h3>
              <GradientText tag="h1" class="text-4xl font-bold"> Component Library </GradientText>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Different Tags</h3>
              <div class="space-y-2">
                <GradientText tag="h2" class="text-3xl font-bold">Heading 2</GradientText>
                <GradientText tag="p" class="text-lg">Paragraph text with gradient</GradientText>
                <GradientText tag="span" class="text-sm">Inline span element</GradientText>
              </div>
            </div>
          </div>

          <!-- Typewriter -->
          <div v-if="selectedComponentId === 'typewriter'">
            <div class="text-2xl">
              I develop
              <TypewriterText :phrases="typewriterPhrases" class="text-cyan-400" />
            </div>
          </div>

          <!-- Check Item -->
          <div v-if="selectedComponentId === 'check-item'">
            <ul class="space-y-2">
              <CheckItem>Systems handling billions of transactions</CheckItem>
              <CheckItem>50% infrastructure cost reduction</CheckItem>
              <CheckItem color="emerald">Cloud-native architecture design</CheckItem>
              <CheckItem color="emerald">Full-stack development</CheckItem>
            </ul>
          </div>

          <!-- Simple Check Item -->
          <div v-if="selectedComponentId === 'simple-check-item'">
            <ul class="space-y-2">
              <SimpleCheckItem>Compact checkmark design</SimpleCheckItem>
              <SimpleCheckItem>Used in service sections</SimpleCheckItem>
              <SimpleCheckItem>Clean and minimal styling</SimpleCheckItem>
            </ul>
          </div>

          <!-- Numbered Step -->
          <div v-if="selectedComponentId === 'numbered-step'">
            <ul class="space-y-3">
              <NumberedStep :number="1">First step in the process</NumberedStep>
              <NumberedStep :number="2">Second step in the process</NumberedStep>
              <NumberedStep :number="3">Third step in the process</NumberedStep>
            </ul>
          </div>

          <!-- Contact Info Item -->
          <div v-if="selectedComponentId === 'contact-info'">
            <div class="space-y-3">
              <ContactInfoItem icon="📧" label="Email">
                <a :href="`mailto:${CONTACT.email}`" class="text-cyan-400 hover:text-cyan-300">
                  {{ CONTACT.email }}
                </a>
              </ContactInfoItem>
              <ContactInfoItem icon="📍" label="Location"> {{ CONTACT.location }} </ContactInfoItem>
              <ContactInfoItem icon="💼" label="Status" color="emerald">
                Available for consulting
              </ContactInfoItem>
            </div>
          </div>

          <!-- Loading Spinner -->
          <div v-if="selectedComponentId === 'loading-spinner'">
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
          </div>

          <!-- Social Icon -->
          <div v-if="selectedComponentId === 'social-icon'">
            <div class="flex gap-4">
              <SocialIcon platform="linkedin" url="https://www.linkedin.com/in/matt-lucian/" />
              <SocialIcon platform="github" url="https://github.com/mattlucian" />
            </div>
          </div>

          <!-- Service Card -->
          <div v-if="selectedComponentId === 'service-card'">
            <ServiceCard v-bind="serviceCardExample" />
          </div>

          <!-- Benefit Card -->
          <div v-if="selectedComponentId === 'benefit-card'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitCard
                title="Fast Performance"
                description="Lightning-fast load times and smooth interactions for optimal user experience."
              />
              <BenefitCard
                title="Precise Solutions"
                description="Targeted approaches designed specifically for your unique business needs."
              />
            </div>
          </div>

          <!-- Info Card -->
          <div v-if="selectedComponentId === 'info-card'">
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
          </div>

          <!-- Simple Testimonial -->
          <div v-if="selectedComponentId === 'simple-testimonial'">
            <div class="space-y-4">
              <SimpleTestimonial
                quote="This is an example testimonial showcasing the compact design."
                author="John Doe"
                role="CEO, Example Corp"
                color-scheme="cyan"
              />
              <SimpleTestimonial
                quote="Another testimonial with emerald color scheme for tech pages."
                author="Jane Smith"
                role="CTO, Tech Startup"
                color-scheme="emerald"
              />
            </div>
          </div>

          <!-- Attribution Card -->
          <div v-if="selectedComponentId === 'attribution-card'">
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
          </div>

          <!-- Portfolio Item -->
          <div v-if="selectedComponentId === 'portfolio-item'">
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
          </div>

          <!-- Timeline -->
          <div v-if="selectedComponentId === 'timeline'">
            <Timeline :steps="timelineSteps" />
          </div>

          <!-- IconFlowStep -->
          <div v-if="selectedComponentId === 'icon-flow-step'">
            <div class="space-y-8">
              <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-4">Default (No Filter)</h4>
                <div class="flex gap-4 justify-center">
                  <IconFlowStep emoji="🛍️" label="Customer Orders" desc="Order placed" />
                  <div class="text-cyan-400 text-2xl flex items-center">→</div>
                  <IconFlowStep emoji="🎯" label="Smart Routing" desc="Allocate to location" />
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-4">Grayscale Filter</h4>
                <div class="flex gap-4 justify-center">
                  <IconFlowStep
                    emoji="📦"
                    label="Auto-Fulfillment"
                    desc="Sent to warehouse"
                    filter-style="grayscale"
                  />
                  <div class="text-cyan-400 text-2xl flex items-center">→</div>
                  <IconFlowStep
                    emoji="🚚"
                    label="Fast Shipping"
                    desc="Quick delivery"
                    filter-style="grayscale"
                  />
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-4">Grayscale Emoji Only</h4>
                <div class="flex gap-4 justify-center">
                  <IconFlowStep
                    emoji="🎯"
                    label="Smart Routing"
                    desc="Colorful box, gray emoji"
                    filter-style="grayscale-emoji"
                  />
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-4">Sepia Filter</h4>
                <div class="flex gap-4 justify-center">
                  <IconFlowStep
                    emoji="📦"
                    label="Sepia Style"
                    desc="Vintage brown tone"
                    filter-style="sepia"
                  />
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-4">Cyan Theme Tone</h4>
                <div class="flex gap-4 justify-center">
                  <IconFlowStep
                    emoji="🚚"
                    label="Cyan Tone"
                    desc="Matches site theme"
                    filter-style="cyan-tone"
                  />
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-4">Emerald Color Scheme</h4>
                <div class="flex gap-4 justify-center">
                  <IconFlowStep
                    emoji="⚙️"
                    label="Tech Config"
                    desc="Emerald theme"
                    color-scheme="emerald"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Panels -->
          <div v-if="selectedComponentId === 'panels'">
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
          </div>

          <!-- Breadcrumb Nav -->
          <div v-if="selectedComponentId === 'breadcrumb-nav'">
            <BreadcrumbNav
              :items="[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/services' },
                { label: 'Integration Services' },
              ]"
              color-scheme="cyan"
            />
          </div>

          <!-- Service Section (Unified Hero, Benefits, Portfolio) -->
          <div v-if="selectedComponentId === 'service-section'" class="space-y-8">
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Hero Variant</h3>
              <p class="text-sm text-gray-400 mb-4">Large title and subtitle for service pages</p>
              <ServiceSection
                variant="hero"
                title="Example Service"
                subtitle="This is how the hero section looks on service pages"
                color-scheme="cyan"
              />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Benefits Variant</h3>
              <p class="text-sm text-gray-400 mb-4">
                Grid layout for benefits with optional expertise badge
              </p>
              <ServiceSection
                variant="benefits"
                title="Key Benefits"
                :benefits="[
                  {
                    title: 'Fast Performance',
                    description: 'Lightning-fast load times and smooth interactions',
                  },
                  {
                    title: 'Precise Solutions',
                    description: 'Targeted approaches for your specific needs',
                  },
                  {
                    title: 'Scalable Architecture',
                    description: 'Built to grow with your business',
                  },
                ]"
                color-scheme="cyan"
              />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Portfolio Variant</h3>
              <p class="text-sm text-gray-400 mb-4">
                List layout for portfolio items with optional testimonial
              </p>
              <ServiceSection
                variant="portfolio"
                title="Selected Work"
                :items="[
                  {
                    name: 'Shopify',
                    description: 'Complete commerce platform',
                    logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
                    url: 'https://shopify.com',
                  },
                ]"
                :testimonial="{
                  quote: 'Excellent work on our integration!',
                  author: 'John Doe',
                  role: 'CEO, Example Corp',
                }"
                color-scheme="cyan"
              />
            </div>
          </div>

          <!-- Tab Button -->
          <div v-if="selectedComponentId === 'tab-button'">
            <div class="flex gap-2">
              <TabButton label="Overview" :active="true" color-scheme="cyan" />
              <TabButton label="Benefits" :active="false" color-scheme="cyan" />
              <TabButton label="Portfolio" :active="false" color-scheme="cyan" />
            </div>
          </div>

          <!-- Two Column List Section -->
          <div v-if="selectedComponentId === 'two-column-list'">
            <TwoColumnListSection
              :left-column="{
                title: 'Left Column',
                items: ['First item with checkmark', 'Second item with checkmark'],
                color: 'cyan',
                type: 'check',
              }"
              :right-column="{
                title: 'Right Column',
                items: ['Step one in the process', 'Step two in the process'],
                color: 'purple',
                type: 'number',
              }"
            />
          </div>

          <!-- CTA Section -->
          <div v-if="selectedComponentId === 'cta-section'">
            <CTASection
              title="Ready to Get Started?"
              subtitle="Let's discuss how I can help transform your business"
              button-text="Schedule a Call"
              color-scheme="cyan"
            />
          </div>

          <!-- CTA Form -->
          <div v-if="selectedComponentId === 'cta-form'" class="space-y-6">
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Default Variant</h3>
              <CTAForm service-name="Integration Services" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-white">Dark Variant with Service Selector</h3>
              <CTAForm variant="dark" :show-service-selector="true" form-title="Get in Touch" />
            </div>
          </div>

          <!-- Floating Action Bar -->
          <div v-if="selectedComponentId === 'floating-action-bar'">
            <div class="space-y-6">
              <p class="text-gray-400">
                The Floating Action Bar appears after scrolling 200px down the page. It shows as a
                top-right button on desktop and a sticky bottom bar on mobile.
              </p>
              <div class="bg-slate-900/60 border border-slate-700 rounded-lg p-6">
                <h3 class="text-xl font-bold mb-4 text-white">Color Schemes</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-400 w-24">Cyan:</span>
                    <FloatingActionBar color-scheme="cyan" />
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-400 w-24">Emerald:</span>
                    <FloatingActionBar color-scheme="emerald" />
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-400 w-24">Purple:</span>
                    <FloatingActionBar color-scheme="purple" />
                  </div>
                </div>
                <p class="text-sm text-gray-400 mt-4">
                  Note: In production, this component listens to scroll events and auto-shows/hides.
                </p>
              </div>
            </div>
          </div>

          <!-- System Box -->
          <div v-if="selectedComponentId === 'system-box'">
            <div class="flex gap-4">
              <SystemBox
                name="System A"
                icon-path="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                color-scheme="cyan"
              />
              <SystemBox
                name="System B"
                icon-path="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                color-scheme="emerald"
              />
            </div>
          </div>

          <!-- Entity Mapping Flow -->
          <div v-if="selectedComponentId === 'entity-mapping'">
            <div class="space-y-4">
              <EntityMappingFlow
                from="Customer"
                to="User"
                color-scheme="cyan"
                direction="forward"
              />
              <EntityMappingFlow
                from="Order"
                to="Transaction"
                color-scheme="emerald"
                direction="forward"
              />
            </div>
          </div>

          <!-- Integration Diagram -->
          <div v-if="selectedComponentId === 'integration-diagram'">
            <IntegrationDiagram
              :left-system="{
                name: 'E-commerce',
                label: 'Platform',
                iconPath:
                  'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
                colorScheme: 'cyan',
              }"
              :right-system="{
                name: 'Inventory',
                label: 'System',
                iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
                colorScheme: 'emerald',
              }"
              :mappings="[
                { from: 'Product', to: 'Item', direction: 'forward' },
                { from: 'Order', to: 'Transaction', direction: 'forward' },
              ]"
              mapping-color-scheme="cyan"
            />
          </div>

          <!-- Detailed Entity Mapping -->
          <div v-if="selectedComponentId === 'detailed-entity-mapping'">
            <DetailedEntityMapping />
          </div>
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
