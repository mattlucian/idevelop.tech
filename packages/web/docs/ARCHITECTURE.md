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

Components are organized into 6 categories based on functionality and reusability:

```
/src/components/
├── elements/              # Basic UI building blocks
│   ├── buttons/          # Button variants
│   ├── badges/           # Badge and icon badge components
│   ├── interactive/      # Interactive effects (typewriter)
│   └── [utilities]       # CheckItem, ContactInfoItem, SocialIcon, LoadingSpinner, NumberedStep, SimpleCheckItem
├── cards/                # Card-based components
├── ui/                   # Complex UI components
├── display/              # Data display components
├── layout/               # Global layout components
└── integration/          # Integration diagram components
```

### Component Categories

#### 1. Elements (`/components/elements/`)

**Purpose:** Atomic UI building blocks used across the application

**Buttons** (`elements/buttons/`):

- `PrimaryButton.vue` - Solid gradient CTA buttons
- `OutlineButton.vue` - Outlined style buttons
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
- `NumberedStep.vue` - Numbered step items for processes
- `SimpleCheckItem.vue` - Simple checkmark list items

#### 2. Cards (`/components/cards/`)

**Purpose:** Card-based content containers

- `ServiceCard.vue` - Service offering cards with hero images
- `InfoCard.vue` - Wrapper cards for grouped content
- `PortfolioItem.vue` - Portfolio work items
- `AttributionCard.vue` - Image attribution credits
- `BenefitCard.vue` - Benefit/feature cards with icons
- `SimpleTestimonial.vue` - Simplified testimonial cards

#### 3. UI (`/components/ui/`)

**Purpose:** Complex, reusable UI components

**Panel System:**

- `PanelSidebar.vue` - Fixed sidebar for navigation
- `PanelContent.vue` - Responsive content display panel (mobile & desktop)

**Section Components:**

- `SelectableItem.vue` - Selectable list items
- `ServiceSection.vue` - Multi-variant service page sections (hero/benefits/process/portfolio/testimonials)

**Service Page Components:**

- `BreadcrumbNav.vue` - Breadcrumb navigation
- `CTASection.vue` - Call-to-action section
- `CTAForm.vue` - Call-to-action form
- `TabButton.vue` - Tab navigation buttons
- `TwoColumnListSection.vue` - Two-column list layout
- `FloatingActionBar.vue` - Floating action bar for mobile navigation

#### 4. Display (`/components/display/`)

**Purpose:** Data visualization components

- `Timeline.vue` - Vertical timeline for sequential steps

#### 5. Layout (`/components/layout/`)

**Purpose:** Global application layout

- `Navigation.vue` - Site navigation with dynamic theming
- `Footer.vue` - Site footer with links and copyright

#### 6. Integration (`/components/integration/`)

**Purpose:** Integration diagram visualization components

- `SystemBox.vue` - Visual box representing a system/platform
- `EntityMappingFlow.vue` - Visual arrow showing entity mapping
- `DetailedEntityMapping.vue` - Detailed entity field mappings
- `IntegrationDiagram.vue` - Complete integration diagram

### State Management Pattern

**Decision:** Use Vue Composition API with composables instead of Vuex/Pinia.

**Rationale:**

- Simple state requirements
- Composition API provides sufficient reactivity
- Avoids adding another dependency
- Easy to upgrade to Pinia later if needed

**Implementation:**

- Composables in `src/composables/`:
  - `useServiceConfig.ts` - Service configuration and data access
  - `useMeta.ts` - Meta tag management

### View Architecture

**Page Components** (`/src/views/`):

1. **HomeView.vue**
   - Service cards grid with 6 services
   - Links to dedicated service pages
   - Typewriter effect for dynamic expertise phrases

2. **HireMeView.vue**
   - Contact information
   - Calendly scheduling integration
   - Professional background

3. **TechView.vue**
   - Technical expertise browser
   - Domain/category/topic navigation
   - Responsive panel layout (PanelSidebar + PanelContent)

4. **ComponentView.vue**
   - Design system showcase

5. **AttributionsView.vue**
   - Image attribution credits

**Service Views** (`/src/views/services/`):

All service views use TypeScript data files and share common components:

6. **IntegrationServiceView.vue** - System integration services
   - Integration diagrams (accounting, fulfillment, marketplace)
   - Tab-based navigation for different integration types
7. **TechAdminServiceView.vue** - Technical administration services
   - Timeline visualization for support process
8. **AIEnablementServiceView.vue** - AI enablement services
   - Before/after comparisons for workflow, training, implementation
9. **EcommerceOpsServiceView.vue** - eCommerce operations services
   - Tab-based content for order routing, inventory sync, product data
10. **WebDesignServiceView.vue** - Web design services
    - Design process steps visualization
    - Platform configurations (Shopify, WordPress, custom)
    - Migration phases
11. **CloudConsultingServiceView.vue** - Cloud infrastructure services
    - Cloud journey configurations (strategy, migration, optimization)

## Routing Strategy

### Current Route Structure

```
/                               -> HomeView (services grid)
/services/integration           -> IntegrationServiceView
/services/tech-admin            -> TechAdminServiceView
/services/ai-enablement         -> AIEnablementServiceView
/services/ecommerce-ops         -> EcommerceOpsServiceView
/services/web-design            -> WebDesignServiceView
/services/cloud-consulting      -> CloudConsultingServiceView
/hire-me                        -> HireMeView
/tech                           -> TechView
/components                     -> ComponentView
/attributions                   -> AttributionsView
```

### Service Page Architecture

**Decision:** Use dedicated view files for each service instead of a dynamic `:serviceId` route.

**Rationale:**

- Each service has unique interactive components (tabs, diagrams, visualizations)
- Service-specific layouts without conditional rendering
- Better code organization and maintainability
- Easier to customize individual services
- Type-safe data structures specific to each service

**Implementation:**

- Each service has its own view file in `/views/services/`
- TypeScript data files in `/src/data/services/` (e.g., `integration.ts`, `tech-admin.ts`)
- Dedicated routes: `/services/integration`, `/services/tech-admin`, etc.
- All services use shared components from `ServiceSection` with variants (hero, benefits, process, portfolio, testimonials)
- Service-specific interactivity built with specialized components (IntegrationDiagram, Timeline, TabButton, etc.)
- Type definitions in `/src/types/service.ts` with service-specific interfaces extending base `ServicePageData`

### Scroll Behavior

**Custom scroll handling** configured in router:

```javascript
scrollBehavior(to, from, savedPosition) {
  // Only restore scroll position when using browser back/forward buttons
  // and when navigating FROM another page (not initial load)
  if (savedPosition && from.name) {
    return savedPosition
  }
  // Always scroll to top for direct navigation or initial page load
  return { top: 0 }
}
```

**Lazy Loading:**

All routes use dynamic imports for code splitting:

```javascript
component: () => import("../views/HomeView.vue");
```

This optimizes initial bundle size and loads pages on demand.

## Data Strategy

### Data Organization

**Migration from JSON to TypeScript:**

The project has migrated from JSON data files to TypeScript for better type safety and maintainability.

```
/src/data/
├── services/              # Service data (TypeScript files)
│   ├── tech-admin.ts
│   ├── integration.ts
│   ├── ai-enablement.ts
│   ├── ecommerce-ops.ts
│   ├── web-design.ts
│   └── cloud-consulting.ts
├── services.ts            # Service configuration/metadata (TypeScript)
└── tech.ts                # Technical expertise (TypeScript)
```

**Benefits of TypeScript data:**

- Compile-time type checking for all service data
- Better IDE autocomplete and IntelliSense
- Type-safe imports and exports
- Easier refactoring and maintenance

### Type System

TypeScript interfaces organized by usage and domain:

**Shared Types** (`/src/types/shared/`):

- `element.ts` - Element component types
- `card.ts` - Card component types (BenefitItem, TimelineStep, VisualStep, DesignProcessStep, etc.)
- `ui.ts` - UI component types (ColorScheme, BreadcrumbItem, TabConfig, PortfolioSection, JourneyConfig, BeforeAfterComparison, WorkflowStage, PlatformConfig, MigrationPhase, etc.)
- `display.ts` - Display types (StepDisplay, Display)
- `integration.ts` - Integration diagram types (IntegrationDiagramConfig, SystemConfig, EntityMappingConfig, etc.)

**Domain Types** (`/src/types/`):

- `service.ts` - Service page data structures
  - Base: `ServicePageData`
  - Extended: `IntegrationServiceData`, `TechAdminServiceData`, `AIEnablementServiceData`, `CloudConsultingServiceData`, `EcommerceOpsServiceData`, `WebDesignServiceData`
- `tech.ts` - Technical expertise structure (TechContent, ServiceCard, etc.)

### Service Data Structure

The service data structure is defined in `/src/types/service.ts`:

```typescript
/**
 * Base service page data structure
 */
interface ServicePageData {
  // Navigation
  breadcrumbs: BreadcrumbItem[];

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    colorScheme: ColorScheme;
  };

  // Tab System (optional)
  tabs?: TabConfig[];

  // Benefits Section
  benefits: BenefitItem[];
  expertiseBadge: ExpertiseBadge;

  // What I Offer / How It Works
  whatIOffer: string[];
  howItWorks: string[];

  // Portfolio
  portfolio: PortfolioSection;

  // CTA Section
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}
```

**Service-specific extensions:**

Each service extends `ServicePageData` with custom fields:

- `IntegrationServiceData` - Adds `integrationDiagrams` (accounting, fulfillment, marketplace)
- `TechAdminServiceData` - Adds `timelineSteps` for support process
- `AIEnablementServiceData` - Adds `tabContent` for workflow/training/implementation comparisons
- `CloudConsultingServiceData` - Adds `cloudJourneys` (strategy, migration, optimization)
- `EcommerceOpsServiceData` - Adds `tabContent` for order routing/inventory/product data
- `WebDesignServiceData` - Adds `designProcess`, `platforms`, `migrationSteps`

### Tech Data Structure

The tech expertise structure is defined in `/src/types/tech.ts`:

```typescript
interface TechContent {
  title: string;
  overview: string;
  badges: Badge[];
  categories: Category[];
}

interface ServiceCard {
  name: string;
  title: string;
  tagline: string;
  description: string;
  route: string;
  thumbnail: string;
}
```

## Styling Architecture

### Color Scheme Strategy

**Dual Theme System:**

- **Services/Business Pages:** Cyan (`cyan-400`, `cyan-500`) + purple accents
- **Tech/Experience Pages:** Emerald (`emerald-400`, `emerald-500`) accents

**Dynamic Theming:**

- Navigation logo and "Hire Me" button adapt to page context
- All components support `color-scheme` or `color` prop
- Consistent color abstraction across all 42 components

**Color Implementation:**

```typescript
interface Props {
  colorScheme?: "cyan" | "emerald";
}

const colorClasses = {
  cyan: {
    border: "border-cyan-500",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  emerald: {
    border: "border-emerald-500",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
};
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
  title: string;
  colorScheme?: "cyan" | "emerald";
}

withDefaults(defineProps<Props>(), {
  colorScheme: "cyan",
});
```

### Events-Up Pattern

**Child to Parent:**

- Typed emits via `defineEmits<{ ... }>()`
- Click handlers for navigation
- Event bubbling for nested components

**Example:**

```typescript
defineEmits<{
  click: [];
  close: [];
}>();
```

### Composables for Shared Logic

**Current Composables:**

- `useServiceConfig()` - Service card configuration and data access
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

## Application Constants

Application-wide constants are centralized in `/src/constants/index.ts` following Vue best practices.

**Available constants:**

```typescript
import { SCHEDULING_LINK, CONTACT, SITE } from "@/constants";

// Scheduling and contact links
SCHEDULING_LINK; // Google Calendar appointment link

// Contact information
CONTACT.email; // matt@idevelop.tech
CONTACT.location; // Florida, USA
CONTACT.linkedin; // LinkedIn profile URL
CONTACT.github; // GitHub profile URL

// Site configuration
SITE.name; // idevelop.tech
SITE.url; // https://idevelop.tech
SITE.companyName; // I Develop Tech LLC
SITE.repository; // GitHub repository URL
SITE.ogImage; // Open Graph image URL
```

**Benefits:**

- Single source of truth for shared values
- Easy to update links/values across entire application
- Type-safe with TypeScript
- Better maintainability and consistency

## Key Architectural Principles

1. **Component Reusability:** If a pattern appears 2-3+ times, extract it into a component (see `/docs/COMPONENT-RULES.md`)
2. **Type Safety:** TypeScript interfaces for all data structures and component props
3. **Data-Driven Design:** Components render based on data structure, not hardcoded content
4. **TypeScript Data Files:** Migrated from JSON to TypeScript for compile-time type checking
5. **Separation of Concerns:** Content (TypeScript data), presentation (Vue), styling (Tailwind)
6. **Color Abstraction:** All components support dual color schemes (cyan/emerald)
7. **Folder Organization:** Components categorized by functionality (elements, cards, ui, etc.)
8. **Centralized Constants:** Application-wide values in `/src/constants/index.ts`

## Future Considerations

### State Management

**When to consider Pinia:**

- Multiple complex state domains
- Need for dev tools time-travel debugging
- Persistence requirements
- Team scaling

**Current assessment:** Composables are sufficient for current needs.

### Performance Optimizations

**Already Implemented:**

- Code splitting by route (all routes use dynamic imports)
- Lazy loading for all views

**Potential future improvements:**

- Image optimization pipeline (WebP conversion, responsive images)
- Bundle size analysis and optimization
- Component-level code splitting for large components
- Service Worker for caching

### Mobile Optimizations

**Considerations:**

- Service Worker for offline support
- Progressive Web App features
- Touch gesture enhancements
- Mobile-specific navigation patterns

## Related Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** - Complete component catalog
- **[COMPONENT-RULES.md](./COMPONENT-RULES.md)** - Component creation guidelines
- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Design patterns, styling, and responsive strategy
- **[DATA-STRUCTURE.md](./DATA-STRUCTURE.md)** - Detailed data schema
- **[IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md)** - Current status
- **[CLAUDE.md](../CLAUDE.md)** - Project instructions for AI assistance
