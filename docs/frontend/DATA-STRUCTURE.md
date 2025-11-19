# Data Structure Documentation

## Overview

This document defines the data schemas used in the idevelop.tech portfolio website. All service content is stored in **TypeScript data files** for type safety. Technical expertise data is also TypeScript.

---

## Data Files Organization

```
/src/data/
├── services/          # Individual service data files (TypeScript)
│   ├── ai-enablement.ts
│   ├── cloud-consulting.ts
│   ├── ecommerce-ops.ts
│   ├── integration.ts
│   ├── tech-admin.ts
│   └── web-design.ts
├── services.ts        # Service configuration (HomeView cards)
└── tech.ts            # Technical expertise content
```

---

## Type System

Types are organized in `/src/types/`:

**Shared Types** (`/types/shared/`):

- `element.ts` - Basic UI elements (Badge)
- `card.ts` - Card components (Step, BenefitItem, PortfolioItem, Testimonial, etc.)
- `ui.ts` - UI components (Topic, BreadcrumbItem, TabConfig, ColorScheme, etc.)
- `integration.ts` - Integration diagrams (IntegrationDiagramConfig, IntegrationSystem, etc.)

**Domain Types** (`/types/`):

- `service.ts` - Service configuration types (ServicePageData with all service-specific interfaces)
- `tech.ts` - Technical expertise types (TechContent, Expertise, Category)
- `attribution.ts` - Image attribution data

---

## Service Page Data Structure

### ServicePageData (Base Interface)

**Location:** `src/types/service.ts`

All service pages use `ServicePageData` interface with these core sections:

- Navigation (breadcrumbs)
- Hero section (title, subtitle, colorScheme)
- Benefits section (benefits array, expertiseBadge)
- Two-column lists (whatIOffer, howItWorks)
- Portfolio section (items, testimonial)
- CTA section (title, subtitle, buttonText)
- Optional tabs for service-specific content

### Service-Specific Extensions

Each service extends `ServicePageData` with unique content:

- **IntegrationServiceData** - Integration diagrams for accounting/fulfillment/marketplace
- **TechAdminServiceData** - Timeline steps for process visualization
- **AIEnablementServiceData** - Comparison tab content (workflow/training/implementation)
- **CloudConsultingServiceData** - Cloud journey configurations
- **EcommerceOpsServiceData** - Ecommerce operations tab content
- **WebDesignServiceData** - Design process steps, platforms, migration phases

---

## Tech/Experience Data Structure

**Location:** `src/types/tech.ts` | **File:** `src/data/tech.ts`

### TechContent Interface

Contains:

- `title` - Domain title
- `overview` - Summary text
- `badges` - Key metrics/highlights (Badge[])
- `categories` - Grouped expertise areas (Category[])

### Hierarchy

```
TechContent
└── categories: Category[]
    └── topics: Expertise[]
        └── sections: Topic[]
```

**Category** = Grouped expertise (e.g., "Software Engineering")
**Expertise** = Individual skill area (e.g., "API Architecture")
**Topic** = Content section with heading and content
**Badge** = Label/value/icon metric (e.g., "Experience: 10+ Years")

---

## Service Configuration (HomeView)

**Location:** `src/data/services.ts`

Contains `ServicesConfig` with:

- `serviceCards` - Array of service card configurations for homepage
- `expertisePhrases` - Rotating expertise phrases for typewriter effect

Each `ServiceCard` includes name, path, icon, title, tagline, stats, tags, colors, and visual style.

---

## Attribution Data

**Location:** `src/types/attribution.ts`

Simple interface for image credits:

- `title` - Service/page name
- `imageUrl`, `imageAlt` - Image details
- `description` - Image description
- `photographer`, `photographerUrl`, `photoUrl` - Attribution links

---

## Adding New Content

### Add a Service

1. Create TypeScript data file: `src/data/services/{name}.ts`
2. Create view component: `src/views/services/{Name}ServiceView.vue`
3. Add route to `src/router/index.ts`
4. Add service card to `src/data/services.ts` for HomeView
5. If custom data needed, extend interface in `src/types/service.ts`

### Add Tech Expertise

Edit `src/data/tech.ts`:

1. Find the category in `categories` array
2. Add new expertise to `topics` array
3. Include title, subtitle, skillTags, intro, and sections

---

## Type Validation

Run type checking:

```bash
npm run type-check
```

All TypeScript data files are validated at compile-time.
