# Data Structure Documentation

## Overview

This document defines the data schemas used in the idevelop.tech portfolio website. All service content is stored in **TypeScript data files** for type safety. Technical expertise data is also TypeScript.

---

## Data Files Organization

```
/src/data/
├── services/          # One data file per service page (TypeScript)
│   ├── ai-enablement.ts
│   ├── cloud-consulting.ts
│   ├── ecommerce-ops.ts
│   ├── flxpoint-consulting.ts
│   ├── integration.ts
│   ├── mcp-development.ts
│   └── tech-admin.ts
├── articles.ts        # Notes article metadata (drafts render only in dev)
├── services.ts        # Service configuration (HomeView cards, typewriter phrases)
└── tech.ts            # Technical expertise content
```

---

## Type System

Types are organized in `/src/types/`:

**Shared Types** (`/types/shared/`):

- `element.ts` - Basic UI elements (Badge)
- `card.ts` - Card components (Step, TimelineStep, PortfolioItem, Testimonial, ExpertiseBadge)
- `ui.ts` - UI components (Topic, BreadcrumbItem, TabConfig, ColorScheme, etc.)
- `integration.ts` - Integration diagrams (IntegrationDiagramConfig, IntegrationSystem, etc.)

**Domain Types** (`/types/`):

- `service.ts` - Service page types (`ServicePageBase` plus one interface per page)
- `article.ts` - Notes article metadata
- `tech.ts` - Technical expertise types (TechContent, Expertise, Category)
- `attribution.ts` - Image attribution data

---

## Service Page Data Structure

### ServicePageBase

**Location:** `src/types/service.ts`

Fields every service page shares, rendered by `ServicePageLayout`:

- `breadcrumbs`
- `hero` (title, subtitle, colorScheme)
- `portfolio` (title, items, optional testimonial)
- `cta` (title, subtitle, buttonText)

### Page-Specific Interfaces

Each page's interface extends `ServicePageBase` with only what its sections need, for example:

- **IntegrationServiceData**: connection diagrams per tab, stats
- **TechAdminServiceData**: common challenges
- **EcommerceOpsServiceData**: challenge areas (with typed links to example sections), platforms
- **CloudConsultingServiceData**: deliverables, AWS services
- **FlxpointConsultingData**: starting points, platform stages, related services, credentials

### Where Content Lives

- **Data files**: copy a page owner edits (hero, lists of challenges or deliverables, portfolio, CTA)
- **Section components**: example values that only make sense with their mockup markup (sample orders, bills, timelines)
- **Views**: composition only

### Icons and Images in Data

- Icons are stored by name (`"TruckIcon"`) and resolved with `getIconByName()` or `withIcons()` from `src/utils/iconMapping.ts`
- Logos use `partnerLogo("file.png")` / `platformLogo("file.png")` from `src/utils/imageAssets.ts`, which return content-hashed URLs plus the `.webp` copy

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

See "When Creating Service Pages" in `CLAUDE.md` for the full workflow: data file, view on `ServicePageLayout`, section components, route, sitemap entry, and home page card.

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
