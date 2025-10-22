# Component Library Documentation

This document catalogs all reusable components in the idevelop.tech application.

## Core Components

### TypewriterText.vue

**Location:** `/src/components/TypewriterText.vue`

**Purpose:** Creates an animated typewriter effect that cycles through multiple phrases with typing and deleting animations.

**Props:**
```typescript
interface Props {
  phrases: string[]        // Array of phrases to cycle through
  typingSpeed?: number     // Milliseconds per character when typing (default: 100)
  deletingSpeed?: number   // Milliseconds per character when deleting (default: 50)
  pauseDuration?: number   // Milliseconds to pause at end of phrase (default: 2000)
}
```

**Usage:**
```vue
<TypewriterText
  :phrases="['managing your tech stack', 'integrating your systems', 'AI training & adoption']"
  :typing-speed="80"
  :deleting-speed="40"
  :pause-duration="2000"
  class="text-cyan-400 font-semibold"
/>
```

**Styling Notes:**
- Responsive min-width: `min-w-0 sm:min-w-[240px]`
- Includes blinking cursor: `<span class="animate-pulse">|</span>`
- Text alignment controlled by parent

**Best Practices:**
- Keep phrases similar length for visual consistency
- Use in 2-column grid with static text for alignment
- Adjust speeds based on average phrase length

---

### Navigation.vue

**Location:** `/src/components/Navigation.vue`

**Purpose:** Global navigation bar with logo, links, and mobile menu.

**Features:**
- Sticky positioning at top of viewport
- Mobile hamburger menu
- Responsive hide/show of navigation items
- Active route highlighting

**Styling:**
- Dark background with blur effect
- Cyan accent colors
- Fixed height: varies by screen size

---

### ServiceCard.vue

**Location:** `/src/components/ServiceCard.vue`

**Purpose:** Reusable service card component with hero image and stats.

**Props:**
```typescript
interface Props {
  service: ServiceCard
  selected?: boolean
}
```

**Features:**
- Hero image with gradient overlay
- Stat boxes in 3-column grid
- Skill tags
- Hover effects and animations
- Click to select/expand

---

### DomainLayoutSidebar.vue

**Location:** `/src/components/DomainLayoutSidebar.vue`

**Purpose:** Layout component for domain detail pages with sidebar navigation.

**Features:**
- Category and topic sidebar navigation
- Mobile-responsive (drawer on mobile)
- Topic selection and display
- Content area for selected topic

---

### TopicContent.vue

**Location:** `/src/components/TopicContent.vue`

**Purpose:** Renders structured topic content with sections.

**Features:**
- Skill tags display
- Intro text with styled border
- Multiple content sections
- Responsive typography

---

### CategoryView.vue

**Location:** `/src/components/CategoryView.vue`

**Purpose:** Display component for experience domain categories.

**Features:**
- Category cards with topics
- Grid layout
- Responsive design

---

## View Components

### ServicesView.vue

**Location:** `/src/views/ServicesView.vue`

**Purpose:** Home page with service cards and drill-down detail panels.

**Key Features:**
- 6 service cards with hero images
- Responsive 1-2 column grid
- Slide-out detail panels on desktop
- Full-screen detail view on mobile
- URL-based service selection (query params)
- Preserved scroll position when opening services

**Service Card Structure:**
```typescript
interface ServiceCard {
  name: string           // URL-safe identifier
  path: string          // Data file path
  icon: string          // Emoji icon
  label: string         // Display label
  title: string         // Card title
  tagline: string       // Subtitle
  stats: { value: string; label: string }[]  // Stat boxes
  tags: string[]        // Skill tags
  borderColor: string   // Tailwind border class
  bgColor: string       // Tailwind bg class
  visualStyle: string   // Visual style identifier
  heroImage?: string    // Hero image URL
}
```

**Data Structure:**
```typescript
interface ServiceContent {
  title: string
  tagline: string
  overview: string
  stats: { value: string; label: string }[]
  tags: string[]
  sections: Section[]
  portfolioItems?: PortfolioItem[]
  testimonial?: Testimonial
}
```

**Responsive Behavior:**
- **Mobile**: Full-screen drill-down, vertical stacking
- **Tablet**: 2-column cards, optimized text sizing
- **Desktop**: Side panel with backdrop blur, preserved scroll

---

### HireMeView.vue

**Location:** `/src/views/HireMeView.vue`

**Purpose:** Contact/hire page with service details and contact form.

---

### ExperienceView.vue

**Location:** `/src/views/ExperienceView.vue`

**Purpose:** Experience overview page showing all technical expertise domains (Software, Cloud, DevOps, Data, Security, Leadership).

**Key Features:**
- 6 domain cards with stats and tags
- Card-based navigation to detailed domain pages
- Responsive grid layout

---

### ComponentShowcase.vue

**Location:** `/src/views/ComponentShowcase.vue`

**Purpose:** Visual catalog of all components for development reference.

**Should Include:**
- TypewriterText with various configurations
- Service card examples
- Stat box patterns
- CTA button variations
- Gradient text examples
- Hero image patterns

---

## Design Patterns

### Hero Image Cards

**Pattern:** Service card with background hero image and gradient overlay

**Implementation:**
```vue
<div class="relative h-48 md:h-56 overflow-hidden">
  <!-- Hero Image -->
  <img
    :src="service.heroImage"
    :alt="service.title"
    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />

  <!-- Gradient Overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]"></div>
</div>
```

**Notes:**
- Always use gradient overlay for text readability
- Scale on hover for interactivity
- Use `object-cover` to maintain aspect ratio

---

### Stat Boxes

**Pattern:** 3-column grid of value/label pairs

**Implementation:**
```vue
<div class="grid grid-cols-3 gap-1 md:gap-2 mb-3 md:mb-4">
  <div v-for="stat in stats" :key="stat.label"
    class="bg-[#0f0f0f] rounded-lg p-1 md:p-2 lg:p-3 text-center border border-[#2a2a2a]">
    <div class="text-[13px] md:text-[15px] lg:text-[19px] font-bold text-cyan-400 mb-0.5">
      {{ stat.value }}
    </div>
    <div class="text-[6px] sm:text-[8px] md:text-[7px] lg:text-[9px] text-gray-500 md:uppercase tracking-tighter md:tracking-wide leading-[0.65rem] md:leading-tight break-words">
      {{ stat.label }}
    </div>
  </div>
</div>
```

**Mobile Optimizations:**
- Ultra-small text (6-8px) to prevent overflow
- Lowercase on mobile, uppercase on desktop
- Minimal padding and gaps
- Word breaking enabled
- Tighter tracking and line-height

---

### Gradient Text

**Pattern:** Text with gradient fill effect

**Implementation:**
```vue
<h1 class="text-3xl font-bold">
  <span class="text-white">Regular Text. </span>
  <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400">
    Gradient Text.
  </span>
</h1>
```

**Hover Variant:**
```vue
<h3 class="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
  Hover Me
</h3>
```

---

### CTA Buttons

**Pattern:** Full-width mobile, auto-width desktop

**Implementation:**
```vue
<div class="inline-block w-full md:w-auto">
  <div class="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold text-sm md:text-base group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
    <span>Button Text</span>
    <svg class="hidden md:inline w-5 h-5 group-hover:translate-x-1 transition-transform">
      <!-- Arrow icon -->
    </svg>
  </div>
</div>
```

**Notes:**
- Icon hidden on mobile to save space
- Shadow glow on hover
- Arrow translates on hover

---

### Tag Pills

**Pattern:** Inline skill/technology tags

**Implementation:**
```vue
<div class="flex gap-1 md:gap-1.5 flex-wrap mb-3 md:mb-4">
  <span
    v-for="tag in tags"
    :key="tag"
    class="px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[11px] font-semibold rounded-md bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/30"
  >
    {{ tag }}
  </span>
</div>
```

---

### Decorative Blur Elements

**Pattern:** Background blur orbs for visual interest

**Implementation:**
```vue
<!-- Static blur -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>

<!-- Interactive blur -->
<div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500"></div>
```

**Notes:**
- Use low opacity (5-10%)
- Position absolutely
- Blur-3xl for soft edges
- Can intensify on hover

---

## Data Patterns

### Service Data Files

**Location:** `/src/data/services/*.json`

**Structure:**
```json
{
  "title": "Service Title",
  "tagline": "Short description",
  "overview": "Longer description paragraph",
  "stats": [
    { "value": "Expert", "label": "On Retainer" }
  ],
  "tags": ["Skill 1", "Skill 2"],
  "sections": [
    {
      "heading": "Section Title",
      "tagline": "Section subtitle",
      "benefits": ["Benefit 1", "Benefit 2"],
      "visual": {
        "type": "workflow",
        "data": { /* type-specific structure */ }
      },
      "cta": "Call to action text"
    }
  ],
  "portfolioItems": [
    {
      "name": "Company Name",
      "url": "https://...",
      "logo": "/images/partners/logo.avif",
      "description": "What was built"
    }
  ],
  "testimonial": {
    "quote": "Testimonial text",
    "author": "Person Name",
    "role": "Job Title",
    "company": "Company Name"
  }
}
```

---

## Component Development Guidelines

### Creating New Components

1. **Create in `/src/components/`**
2. **Use Composition API with TypeScript**
3. **Define props interface**
4. **Export for use in other components**
5. **Add to ComponentShowcase.vue**
6. **Document in this file**

### Component Template
```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  // Define props
}

const props = defineProps<Props>()

// Component logic
</script>

<template>
  <!-- Component markup -->
</template>

<style scoped>
/* Component-specific styles (if needed) */
/* Prefer Tailwind classes */
</style>
```

### Testing Checklist
- [ ] Works at 320px width
- [ ] Works at 768px width
- [ ] Works at 1024px+ width
- [ ] Hover states function
- [ ] Focus states visible
- [ ] Props validated
- [ ] TypeScript types correct
- [ ] Added to showcase

---

## Future Components to Build

### Planned Components
- [ ] TestimonialCard
- [ ] PortfolioCard
- [ ] SkillTag
- [ ] StatBox (extracted)
- [ ] SectionHeading
- [ ] VisualRenderer (for different visual types)
- [ ] BenefitList
- [ ] WorkflowDiagram
- [ ] BeforeAfterComparison
- [ ] CodeBlock

### Enhancement Ideas
- [ ] Loading skeletons
- [ ] Error states
- [ ] Empty states
- [ ] Toast notifications
- [ ] Modal dialogs
- [ ] Form components
