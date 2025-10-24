# Architecture Documentation

## Overview

This document captures the key architectural decisions made during the development of the idevelop.tech portfolio website.

## Technology Stack

### Core Framework

- **Vue.js 3.5.22** with Composition API
- **TypeScript 5.9** for type safety
- **Vue Router 4.5.1** for navigation
- **Tailwind CSS 4.1.14** for styling

### Build Tools

- **Vite 7.1.7** - Fast build tool and dev server
- **vue-tsc** - TypeScript checker for Vue
- **ESLint + Prettier** - Code quality and formatting

### Node Version

- Required: Node 20.19.0+ or 22.12.0+

## Component Architecture

### Component Organization Structure

Components are organized into 7 categories based on functionality and reusability:

```
/src/components/
├── elements/              # Basic UI building blocks (10 components)
│   ├── buttons/          # Button variants
│   ├── badges/           # Badge and icon badge components
│   ├── interactive/      # Interactive effects (typewriter)
│   └── [utilities]       # CheckItem, ContactInfoItem, SocialIcon, LoadingSpinner
├── cards/                # Card-based components (7 components)
├── ui/                   # Complex UI components (6 components)
├── display/              # Data display components (1 component)
├── layout/               # Global layout components (2 components)
└── themes/               # Content theme components (5 components)
```

**Total: 31 reusable components**

### Component Categories

#### 1. Elements (`/components/elements/`)

**Purpose:** Atomic UI building blocks used across the application

**Buttons** (`elements/buttons/`):

- `PrimaryButton.vue` - Solid gradient CTA buttons
- `SecondaryButton.vue` - Subtle gradient action buttons
- `IconButton.vue` - Circular close/back navigation buttons

**Badges** (`elements/badges/`):

- `Badge.vue` - Tag pills for skills/technologies
- `IconBadge.vue` - Circular icon containers

**Interactive** (`elements/interactive/`):

- `TypewriterText.vue` - Animated typewriter effect

**Utilities** (`elements/`):

- `CheckItem.vue` - Checkmark list items
- `ContactInfoItem.vue` - Contact info display rows
- `SocialIcon.vue` - Social media icon links
- `LoadingSpinner.vue` - Loading indicators

#### 2. Cards (`/components/cards/`)

**Purpose:** Card-based content containers

- `ServiceCard.vue` - Service offering cards with hero images
- `IconCard.vue` - Feature cards with centered icons
- `ThinIconCard.vue` - Compact cards with left-aligned icons
- `InfoCard.vue` - Wrapper cards for grouped content
- `TestimonialCard.vue` - Client testimonial display
- `PortfolioItem.vue` - Portfolio work items
- `AttributionCard.vue` - Image attribution credits

#### 3. UI (`/components/ui/`)

**Purpose:** Complex, reusable UI components

**Panel System:**

- `PanelSidebar.vue` - Fixed sidebar for navigation
- `PanelContent.vue` - Fixed content display panel
- `PanelMobile.vue` - Mobile full-screen panel

**Section Components:**

- `SectionClickable.vue` - Numbered section buttons
- `SectionHeader.vue` - Section titles with icons

**Utilities:**

- `ShowcaseContent.vue` - Component showcase helper

#### 4. Display (`/components/display/`)

**Purpose:** Data visualization components

- `Timeline.vue` - Vertical timeline for sequential steps

#### 5. Layout (`/components/layout/`)

**Purpose:** Global application layout

- `Navigation.vue` - Site navigation with dynamic theming
- `Footer.vue` - Site footer with links and copyright

#### 6. Themes (`/components/themes/`)

**Purpose:** Content layout themes for service/tech pages

- `DefaultTheme.vue` - Standard layout with stats and benefits
- `OverviewTheme.vue` - Data-driven overview sections
- `ProcessTheme.vue` - Workflow visualization (supports 3 styles)
- `OptionsTheme.vue` - Side-by-side option cards
- `TechTheme.vue` - Technical/experience content display

### State Management Pattern

**Decision:** Use Vue Composition API with composables instead of Vuex/Pinia.

**Rationale:**

- Simple state requirements
- Composition API provides sufficient reactivity
- Avoids adding another dependency
- Easy to upgrade to Pinia later if needed

**Implementation:**

- Composables in `src/composables/`:
  - `useServiceData.ts` - Service data loading
  - `useServiceConfig.ts` - Service configuration
  - `useMeta.ts` - Meta tag management

### View Architecture

**Page Components** (`/src/views/`):

1. **HomeView.vue** (formerly ServicesView)
   - Service cards grid
   - Service detail panels (sidebar + content)
   - URL-based service selection

2. **HireMeView.vue**
   - Contact information
   - Calendly integration
   - Professional background

3. **TechView.vue** (formerly TechExperienceView)
   - Technical expertise browser
   - Domain/category/topic navigation
   - Query parameter-based routing

4. **ServiceView.vue** (formerly ServiceDetailView)
   - Individual service detail pages
   - Dynamic theme support
   - Sidebar navigation

5. **ComponentView.vue** (formerly ComponentShowcase)
   - Design system showcase

6. **AttributionsView.vue**
   - Image attribution credits

## Routing Strategy

### Current Route Structure

```
/                          -> HomeView (services grid)
/services/:serviceId       -> ServiceView (service details)
/hire-me                   -> HireMeView
/tech                      -> TechView (expertise overview)
/tech?domain=software      -> TechView (software domain details)
/components                -> ComponentView
/attributions              -> AttributionsView
```

### Query Parameter Navigation

**Decision:** Use query parameters for tech domain navigation instead of separate routes.

**Rationale:**

- Simpler routing structure
- Single component handles all domain detail views
- Easy URL sharing (e.g., `/tech?domain=software`)
- No need to manage multiple routes for similar content

**Implementation:**

- Base route: `/tech` loads `TechView.vue`
- Domain selection adds query parameter: `/tech?domain=software`
- Component watches `route.query.domain` to load appropriate data
- Data loaded dynamically from `/data/experiences.json`

### Scroll Behavior

**Custom scroll handling** configured in router:

```javascript
scrollBehavior(to, from, savedPosition) {
  // Initial load: scroll to top
  if (!from.name) return { top: 0 }

  // Same route: don't scroll
  if (to.name === from.name) return false

  // Home ↔ Service detail: preserve scroll
  const servicesRoutes = ['home', 'service-detail']
  if (servicesRoutes.includes(to.name) && servicesRoutes.includes(from.name)) {
    return { left: window.scrollX, top: window.scrollY }
  }

  // Browser back/forward: restore position
  if (savedPosition) return savedPosition

  // New navigation: scroll to top
  return { top: 0 }
}
```

## Data Strategy

### Data Organization

```
/src/data/
├── services/              # Service offerings (6 files)
│   ├── tech-admin.json
│   ├── integration.json
│   ├── ai-enablement.json
│   ├── ecommerce-ops.json
│   ├── web-design.json
│   └── cloud-consulting.json
└── experiences.json       # Technical expertise (all domains)
```

### Type System

TypeScript interfaces organized by usage:

**Shared Types** (`/src/types/shared/`):

- `element.ts` - Element component types (Badge)
- `card.ts` - Card component types (Step)
- `ui.ts` - UI component types (Topic, PanelColorScheme)
- `display.ts` - Display types (StepDisplay, Display)

**Domain Types** (`/src/types/`):

- `service.ts` - Service data structure
- `tech.ts` - Technical expertise structure

### Service Data Structure

```typescript
interface ServiceContent {
  title: string
  tagline: string
  overview: string
  stats: ServiceStat[]
  tags: string[]
  whatIOffer?: string[]
  howItWorks?: string[]
  sections: ServiceSection[]
  portfolioItems: PortfolioItem[]
  testimonial: Testimonial
}

interface ServiceSection {
  heading: string
  tagline?: string
  content?: string
  benefits?: string[]
  visual?: Display
  cta?: string
  theme?: 'default' | 'process' | 'overview' | 'options'
}
```

### Tech Data Structure

```typescript
interface TechContent {
  title: string
  overview: string
  badges: Badge[]
  categories: Category[]
}

interface Expertise {
  title: string
  subtitle: string
  skillTags: string[]
  intro: string
  sections: Topic[]
}
```

### Theme System

**Decision:** Use component-based themes instead of conditional rendering.

**Rationale:**

- Each section can specify a `theme` property
- Theme components are self-contained
- Easy to add new themes without modifying parent components
- Clean separation of layout logic

**Available Themes:**

- `default` - Standard layout with stats, benefits, visuals
- `process` - Workflow visualization (boxed, boxed-inline, timeline)
- `overview` - Data-driven overview with stats and features
- `options` - Side-by-side option cards

**Implementation:**

```javascript
const themeComponents: Record<string, Component> = {
  default: DefaultTheme,
  process: ProcessTheme,
  overview: OverviewTheme,
  options: OptionsTheme
}

const currentTheme = computed(() => {
  const theme = section.value?.theme || 'default'
  return themeComponents[theme] || DefaultTheme
})
```

## Styling Architecture

### Color Scheme Strategy

**Dual Theme System:**

- **Services/Business Pages:** Cyan (`cyan-400`, `cyan-500`) + purple accents
- **Tech/Experience Pages:** Emerald (`emerald-400`, `emerald-500`) accents

**Dynamic Theming:**

- Navigation logo and "Hire Me" button adapt to page context
- All components support `color-scheme` or `color` prop
- Consistent color abstraction across all 31 components

**Color Implementation:**

```typescript
interface Props {
  colorScheme?: 'cyan' | 'emerald'
}

const colorClasses = {
  cyan: {
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  emerald: {
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
}
```

### Base Colors

**Dark Theme (Global):**

- Background: `#0a0a0a` (near black)
- Secondary backgrounds: `#1a1a1a`, `#0f0f0f`
- Borders: `#333333`, `#2a2a2a`
- Text: `text-white`, `text-gray-300`, `text-gray-400`

### Responsive Design

**Mobile-First Approach:**

- Base styles for 320px+ (ultra-mobile)
- Tablet adjustments at 768px
- Desktop enhancements at 1024px+
- Large desktop optimizations at 1440px+

**Breakpoint Strategy:**

- Mobile: Full-screen modals, stacked layouts
- Tablet: Transition layouts, partial sidebars
- Desktop: Fixed panels, multi-column layouts

## Component Communication

### Props-Down Pattern

**Parent to Child:**

- Props with TypeScript interfaces
- `defineProps<Props>()` with type checking
- No prop mutation
- Sensible defaults via `withDefaults()`

**Example:**

```typescript
interface Props {
  title: string
  colorScheme?: 'cyan' | 'emerald'
}

withDefaults(defineProps<Props>(), {
  colorScheme: 'cyan',
})
```

### Events-Up Pattern

**Child to Parent:**

- Typed emits via `defineEmits<{ ... }>()`
- Click handlers for navigation
- Event bubbling for nested components

**Example:**

```typescript
defineEmits<{
  click: []
  close: []
}>()
```

### Composables for Shared Logic

**Current Composables:**

- `useServiceData()` - Service data loading and caching
- `useServiceConfig()` - Service card configuration
- `useMeta()` - SEO meta tag management

## Build Configuration

### Vite Setup

**Standard configuration:**

- Vue plugin with JSX support
- Vue DevTools plugin (development only)
- Path alias: `@` -> `./src`

**Asset Handling:**

- Static assets in `/public/`
- Image optimization ready
- SVG inline support

### TypeScript Configuration

**Strict mode:** Enabled
**Type checking:** Separate process via `vue-tsc --build`
**Build process:** Type check + Vite build

## Key Architectural Principles

1. **Component Reusability:** If a pattern appears 2-3+ times, extract it into a component
2. **Type Safety:** TypeScript interfaces for all data structures and component props
3. **Data-Driven Design:** Components render based on data structure, not hardcoded content
4. **Progressive Enhancement:** Start simple, add complexity only when needed
5. **Separation of Concerns:** Content (JSON), presentation (Vue), styling (Tailwind)
6. **Color Abstraction:** All components support dual color schemes (cyan/emerald)
7. **Folder Organization:** Components categorized by functionality (elements, cards, ui, etc.)

## Future Considerations

### State Management

**When to consider Pinia:**

- Multiple complex state domains
- Need for dev tools time-travel debugging
- Persistence requirements
- Team scaling

**Current assessment:** Composables are sufficient for current needs.

### Performance Optimizations

**Potential improvements:**

- Code splitting by route
- Lazy loading for theme components
- Image optimization pipeline
- Bundle size analysis

### Mobile Optimizations

**Considerations:**

- Service Worker for offline support
- Progressive Web App features
- Touch gesture enhancements
- Mobile-specific navigation patterns

## Related Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** - Complete component catalog
- **[COMPONENT-RULES.md](./COMPONENT-RULES.md)** - Component creation guidelines
- **[THEMES.md](./THEMES.md)** - Theme system documentation
- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Design patterns and styling
- **[DATA-STRUCTURE.md](./DATA-STRUCTURE.md)** - Detailed data schema
- **[IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md)** - Current status
- **[CLAUDE.md](../CLAUDE.md)** - Project instructions for AI assistance
