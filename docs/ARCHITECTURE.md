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

### State Management Pattern

**Decision:** Use Vue Composition API with shared reactive state instead of Vuex/Pinia.

**Rationale:**
- Simple state requirements (only view toggle currently)
- Composition API provides sufficient reactivity
- Avoids adding another dependency
- Easy to upgrade to Pinia later if needed

**Implementation:**
- `useViewToggle` composable (`src/composables/useViewToggle.ts`)
- Shared `ref` across components
- Computed properties for derived state
- Clean separation of concerns

### Component Organization

**Single Responsibility Components:**

1. **Layout Components**
   - `App.vue` - Root application wrapper
   - `Navigation.vue` - Top navigation bar
   - `ViewToggle.vue` - Business/Technical toggle button

2. **Page Components**
   - `ServicesView.vue` - Home page with service cards and drill-down panels
   - `HireMeView.vue` - Contact/hiring page
   - `ExperienceView.vue` - Experience overview and domain detail browser
   - `ComponentShowcase.vue` - Design system showcase

3. **Content Components**
   - `ServiceCard.vue` - Service card with hero image and stats
   - `TypewriterText.vue` - Animated typewriter text effect
   - `DomainLayoutSidebar.vue` - Domain content with sidebar navigation
   - `TopicContent.vue` - Individual topic content display
   - `CategoryView.vue` - Category display component

## Routing Strategy

### Query Parameter Navigation

**Decision:** Use query parameters on `/experience` route instead of separate routes for each domain.

**Rationale:**
- Simpler routing structure
- Single component handles all domain detail views
- Easy URL sharing (e.g., `/experience?domain=software`)
- No need to manage multiple routes for similar content

**Implementation:**
- Base route: `/experience` loads `ExperienceView.vue`
- Domain selection adds query parameter: `/experience?domain=software`
- Component watches `route.query.domain` to load appropriate data
- Data loaded dynamically from `/data/experience/` JSON files

### Current Route Structure

```
/                              -> ServicesView (home with service cards)
/hire-me                       -> HireMeView
/components                    -> ComponentShowcase
/experience                    -> ExperienceView (domain overview)
/experience?domain=software    -> ExperienceView (shows software domain details)
/experience?domain=cloud       -> ExperienceView (shows cloud domain details)
/experience?domain=devops      -> ExperienceView (shows devops domain details)
/experience?domain=leadership  -> ExperienceView (shows leadership domain details)
/experience?domain=data        -> ExperienceView (shows data domain details)
/experience?domain=security    -> ExperienceView (shows security domain details)
```

### Future Route Structure (Not Yet Implemented)

```
/software/backend                    -> CategoryView (Level 2)
/software/backend/languages          -> TopicView (Level 3)
/software/backend/languages/java     -> TechnologyView (Level 4)
```

## Data Strategy

### JSON over Markdown (Current Approach)

**Decision:** Use structured JSON files instead of parsing markdown files.

**Rationale:**
- Faster development velocity (no markdown parser setup)
- Easier data validation with TypeScript
- Better IDE support and autocomplete
- Simpler component rendering logic
- Direct mapping to TypeScript interfaces

**Trade-offs:**
- Content authoring is less friendly (JSON vs Markdown)
- No rich text editing experience (plain JSON)
- Manual formatting required for complex content

### Data Loading Pattern

**Vite Static Import Requirements:**
```javascript
// Cannot use dynamic imports with Vite
// ❌ const module = await import(`../../data/${file}`)

// Must use explicit switch statement
// ✅
switch (domain.path) {
  case 'software.json':
    module = await import('../data/experience/software.json?raw')
    break
  case 'cloud.json':
    module = await import('../data/experience/cloud.json?raw')
    break
  // ... other domains
}
```

**Reason:** Vite requires static analysis of imports at build time.

## Data Structure

### Type System

TypeScript interfaces defined in `src/types/experience.ts`:

```typescript
interface Badge {
  label: string
  value: string
  icon: string
}

interface Section {
  heading: string
  content: string
}

interface Topic {
  title: string
  subtitle: string
  skillTags: string[]
  intro: string
  sections: Section[]
}

interface Category {
  name: string
  subtitle: string
  topics: Topic[]
}

interface ExperienceContent {
  title: string
  overview: string
  badges: Badge[]
  categories: Category[]
}
```

### Content Hierarchy

```
Domain (e.g., "Software Engineering")
├── Overview
├── Badges (metadata)
└── Categories (e.g., "Backend Development")
    └── Topics (e.g., "API Architecture")
        └── Sections (e.g., "RESTful Design")
```

### Dynamic Overview Generation

**Pattern:** Overview category is generated programmatically from domain metadata.

**Implementation:**
```javascript
const overviewCategory = computed(() => ({
  name: "Overview",
  subtitle: "Domain summary and experience",
  topics: [{
    title: "Summary",
    subtitle: config.subtitle,
    skillTags: domainData.value.badges.map(badge => badge.value),
    intro: domainData.value.overview,
    sections: domainData.value.badges.map(badge => ({
      heading: badge.label,
      content: badge.value
    }))
  }]
}))
```

**Rationale:**
- Avoids duplication in JSON files
- Single source of truth for domain metadata
- Consistent overview structure across all domains

## Styling Architecture

### Tailwind CSS Configuration

**Approach:** Minimal custom configuration, leverage Tailwind defaults.

**Configuration:**
- Standard content paths
- No custom theme extensions
- No custom plugins
- Typography plugin available but not yet used

### Color Scheme

**Technical View (Dark Theme):**
- Background: `#0a0a0a` (near black)
- Text: `text-gray-100`
- Accent backgrounds: `#333333`, `#1a1a1a`

**Business View (Light Theme):**
- Background: `bg-gray-50`
- Text: `text-gray-900`

**View Toggle:**
- Active state: `bg-white text-gray-900`
- Inactive state: `text-gray-300`
- Glassmorphism effect: `bg-white/10 backdrop-blur-md`

### Responsive Design

**Mobile-First Approach:**
- Base styles for mobile
- Desktop enhancements via Tailwind responsive prefixes
- Modal overlay for mobile topic viewing
- Sidebar layout for desktop

## Component Communication

### Props-Down Pattern

**Parent to Child:**
- Props with TypeScript interfaces
- defineProps with type checking
- No prop mutation

**Example:**
```typescript
interface Props {
  title: string
  overview: string
  categories: Category[]
  badges?: Badge[]
}

const props = defineProps<Props>()
```

### Events-Up Pattern

**Child to Parent:**
- Not heavily used yet
- Click handlers defined in parent, passed to child
- Direct state mutation in shared composables

### Shared State via Composables

**View Toggle:**
- Shared reactive state across all components
- Import `useViewToggle()` where needed
- Consistent API: `{ currentView, setView, toggleView, isBusinessView, isTechnicalView, themeClasses }`

## Build Configuration

### Vite Setup

**Standard configuration:**
- Vue plugin
- Vue DevTools plugin (development only)
- Path alias: `@` -> `./src`

**No custom configuration for:**
- Asset handling
- Code splitting
- Environment variables

### TypeScript Configuration

**Strict mode:** Enabled via Vue defaults
**Type checking:** Run separately via `vue-tsc --build`
**Build process:** Type check + Vite build run in parallel

## Future Architectural Considerations

### Level 2-4 Navigation

**Options to consider:**
1. Continue single-component pattern with nested routing
2. Separate components per level
3. Recursive component that handles any depth

**Recommendation:** Start with option 1 (single-component pattern) for consistency.

### Markdown Integration

**Options:**
1. Add markdown parser (marked, markdown-it)
2. Keep JSON, add tooling to convert markdown → JSON
3. Hybrid: JSON for structure, markdown for content fields

**Recommendation:** Option 3 provides best balance of structure and authoring experience.

### State Management

**When to consider Pinia:**
- Multiple users of shared state beyond view toggle
- Need for dev tools time-travel debugging
- Complex state mutations
- Persistence requirements

**Current assessment:** Not needed yet, but keep Composition API patterns compatible.

### Mobile Optimizations

**Considerations:**
- Currently uses modal for mobile topic viewing
- Consider dedicated mobile routes for deep linking
- Performance optimization for JSON loading
- Image optimization for badges/icons (when added)

## Key Principles

1. **Data-Driven Design:** Components render based on data structure, not hardcoded content
2. **Type Safety:** TypeScript interfaces for all data structures
3. **Component Reuse:** Single components serve multiple routes via configuration
4. **Progressive Enhancement:** Start simple, add complexity only when needed
5. **Developer Experience:** Fast dev server, hot reload, TypeScript autocomplete
6. **Separation of Concerns:** Content (JSON), presentation (Vue), styling (Tailwind)

## Related Documentation

- `IMPLEMENTATION-STATUS.md` - Current implementation state
- `DATA-STRUCTURE.md` - Detailed data schema documentation
- `COMPONENTS.md` - Component library catalog
- `DESIGN-SYSTEM.md` - Design patterns and guidelines
- `RESPONSIVE-DESIGN.md` - Responsive design strategy
- `ATTRIBUTIONS.md` - Image attribution tracking
- `CLAUDE.md` - Claude Code project instructions
