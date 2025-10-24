# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website project for idevelop.tech featuring services and technical expertise showcase. The site displays 6 service offerings and professional experience across 6 technical domains.

## Tech Stack

- Vue.js 3 with Composition API
- TypeScript for type safety
- Vue Router for navigation
- Tailwind CSS for styling
- JSON-based content structure

## Color Scheme Strategy

The site uses a **dual color scheme** that switches contextually:

- **Services/Business Pages** (Home, Services, Hire Me): Cyan (`cyan-400`, `cyan-500`) and purple theme
- **Tech/Experience Pages** (Tech domain pages): Emerald green (`emerald-400`, `emerald-500`) theme
- **Dynamic Elements**: Logo and "Hire Me" button adapt to page context (cyan → emerald on Tech pages)

**When creating components or content:**

- Use `cyan` variants for Services/business-related content
- Use `emerald` variants for Tech/technical-related content
- All 31 components support `colorScheme` or `color` prop for dual theming
- See DESIGN-SYSTEM.md for complete color palette documentation

## Content Architecture

Content is organized in JSON files within the `/src/data` directory:

### Data Organization

```
/src/data/
├── services/                  # Individual service files (6 files)
│   ├── tech-admin.json
│   ├── integration.json
│   ├── ai-enablement.json
│   ├── ecommerce-ops.json
│   ├── web-design.json
│   └── cloud-consulting.json
├── services.json              # Service configuration/metadata
└── tech.json                  # All technical expertise domains
```

### URL Structure

```
/                                  # Home (HomeView - service cards grid)
/services/:serviceId               # ServiceView (individual service details)
/hire-me                           # HireMeView (contact and hiring info)
/tech                              # TechView (technical expertise browser with all domains)
/components                        # ComponentView (design system showcase)
/attributions                      # AttributionsView (image credits)
```

## Content Statistics

- **Services**: 6 service offerings (tech-admin, integration, ai-enablement, ecommerce-ops, web-design, cloud-consulting)
- **Tech Domains**: 6 domains in tech.json (software, cloud, devops, data, security, leadership)
- **Total Data Files**: 8 JSON files (6 service files + services.json + tech.json)
- **Components**: 31 reusable components across 7 categories
- **Views**: 6 page-level components

## File Naming Convention

- **Data files**: Lowercase with hyphens (kebab-case)
  - Services: `/src/data/services/{service-name}.json`
  - Tech: `/src/data/tech.json` (all domains in one file)
  - Config: `/src/data/services.json`
- **Components**: PascalCase (e.g., `TypewriterText.vue`, `ServiceCard.vue`, `PrimaryButton.vue`)
- **Views**: PascalCase with "View" suffix (e.g., `HomeView.vue`, `TechView.vue`, `ServiceView.vue`, `ComponentView.vue`)

## Component Architecture

### Organization Structure

Components are organized into 7 categories by functionality:

```
/src/components/
├── elements/              # Basic UI building blocks (10 components)
│   ├── buttons/          # PrimaryButton, SecondaryButton, IconButton
│   ├── badges/           # Badge, IconBadge
│   ├── interactive/      # TypewriterText
│   └── [utilities]       # CheckItem, ContactInfoItem, SocialIcon, LoadingSpinner
├── cards/                # Card-based components (7 components)
│   # ServiceCard, IconCard, ThinIconCard, InfoCard
│   # TestimonialCard, PortfolioItem, AttributionCard
├── ui/                   # Complex UI components (6 components)
│   # PanelSidebar, PanelContent, PanelMobile
│   # SectionClickable, SectionHeader, ShowcaseContent
├── display/              # Data display components (1 component)
│   # Timeline
├── layout/               # Global layout components (2 components)
│   # Navigation, Footer
└── themes/               # Content theme components (5 components)
    # DefaultTheme, OverviewTheme, ProcessTheme, OptionsTheme, TechTheme
```

**Total: 31 reusable components**

## ⚠️ CRITICAL RULE: Component Creation (The 2-3 Pattern Rule)

**MANDATORY**: If you create the same UI pattern 2-3+ times in this codebase, you **MUST** extract it into a reusable component.

### Quick Reference:

- **See duplicated pattern?** → Create a component
- **Writing similar code 2-3 times?** → Stop and componentize it
- **Copying/pasting UI elements?** → Extract to a component first

### Documentation:

- **Full component catalog**: See `/docs/COMPONENTS.md` for all 31 components organized by folder
- **Component creation rules**: See `/docs/COMPONENT-RULES.md` for the complete process

### Existing Reusable Components (31 Total):

**Elements (10):**

- Buttons: `PrimaryButton`, `SecondaryButton`, `IconButton`
- Badges: `Badge`, `IconBadge`
- Interactive: `TypewriterText`
- Utilities: `CheckItem`, `ContactInfoItem`, `SocialIcon`, `LoadingSpinner`

**Cards (7):**

- `ServiceCard`, `IconCard`, `ThinIconCard`, `InfoCard`
- `TestimonialCard`, `PortfolioItem`, `AttributionCard`

**UI Components (6):**

- Panels: `PanelSidebar`, `PanelContent`, `PanelMobile`
- Sections: `SectionClickable`, `SectionHeader`
- Showcase: `ShowcaseContent`

**Display (1):**

- `Timeline`

**Layout (2):**

- `Navigation`, `Footer`

**Themes (5):**

- `DefaultTheme`, `OverviewTheme`, `ProcessTheme`, `OptionsTheme`, `TechTheme`

### Full Component Rules:

See `/docs/COMPONENT-RULES.md` for complete documentation including:

- When to create components
- Component creation checklist
- Migration process
- Testing requirements
- Examples and patterns

**This rule applies to all developers and AI assistants. No exceptions.**

## Service Detail Theme System

Service detail pages (`/services/:serviceId`) use a **dynamic theme component system** for customizing layouts:

- Each service section can specify a `"theme"` property in its JSON data
- Theme components live in `/src/components/themes/`
- Add new themes by creating a component and registering it in `ServiceView.vue`
- **No conditional logic needed** - themes are self-contained Vue components

**Available Themes:**

- `default` - Standard layout with stats, benefits, visuals, and CTA
- `overview` - Data-driven overview with stats, whatIOffer, howItWorks sections
- `process` - Workflow visualization with 3 style variants (boxed, boxed-inline, timeline)
- `options` - Side-by-side option cards with neutral color rotation

**Tech pages** use `TechTheme` automatically for displaying technical expertise content.

**See `/docs/THEMES.md` for complete documentation on creating and using themes.**

## Documentation

Comprehensive project documentation is located in the `/docs` directory:

- **COMPONENT-RULES.md** - ⚠️ **MANDATORY** Component creation rules (read this first!)
- **COMPONENTS.md** - Complete catalog of all 31 components organized by folder
- **THEMES.md** - Service detail theme system guide (how to create custom layouts)
- **DESIGN-SYSTEM.md** - Complete design system including colors, typography, spacing, and component patterns
- **RESPONSIVE-DESIGN.md** - Responsive design strategy, breakpoints, and mobile-first approach
- **ARCHITECTURE.md** - System architecture, component organization, and technical decisions
- **DATA-STRUCTURE.md** - Data models, JSON schemas, and content structure
- **IMPLEMENTATION-STATUS.md** - Current implementation status, recent refactoring, and roadmap

**When working on this project, consult these docs for:**

- Component creation and reusability rules (MANDATORY - COMPONENT-RULES.md)
- Component catalog and file locations (COMPONENTS.md)
- Creating custom service detail layouts (THEMES.md)
- Design patterns and component usage (DESIGN-SYSTEM.md)
- Responsive breakpoint strategy (RESPONSIVE-DESIGN.md)
- Typography and spacing scales (DESIGN-SYSTEM.md)
- Color palette and gradients (DESIGN-SYSTEM.md)
- Current codebase status (IMPLEMENTATION-STATUS.md)
- Best practices and guidelines

## Development Commands

Common development commands:

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Build for production (includes type checking)
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## ⚠️ CRITICAL: Always Format After Edits

**MANDATORY for Claude Code**: After making ANY edits to files in this project, you **MUST** run:

```bash
npm run format
```

**Why this is critical:**

- The user has "format on save" enabled in their IDE
- If you don't format after edits, your changes will create unnecessary git diffs when the user saves
- This causes confusion in source control and makes it harder to review actual changes
- Running `npm run format` ensures your edits match the project's formatting standards

**When to run it:**

- After editing any `.vue`, `.ts`, `.js`, `.json`, or `.md` files
- Before completing any task that involved file modifications
- Always, without exception, after making edits

**This applies to all file types in the project. No exceptions.**

## Image Attribution Process

All third-party images (especially from Unsplash) must be properly attributed on the `/attributions` page.

**Quick Reference:**

- When adding new images with attribution:
  1. Add the image to the appropriate view/component
  2. Update `/src/views/AttributionsView.vue` with a new `AttributionCard` containing:
     - Service/page name
     - Image preview
     - Image description
     - Full photographer attribution with Unsplash links
  3. Follow the existing card pattern in the grid layout

## Implementation Status

### Completed Features

**Views (6 total):**

- **HomeView** (`/`) - Service cards grid with drill-down panels
  - 6 services: Tech Admin, Integration, AI Enablement, eCommerce Ops, Web Design, Cloud Consulting
  - Hero images with gradient overlays and hover effects
  - Responsive stat boxes optimized for 320px-1440px+ widths
  - URL-based service selection with preserved scroll position
  - Mobile full-screen, desktop side-panel drill-down
  - ✅ Fully componentized (uses ServiceCard, PrimaryButton, IconButton, IconBadge)

- **ServiceView** (`/services/:serviceId`) - Individual service detail pages
  - Dynamic theme system (5 themes available)
  - Section navigation with clickable sidebar
  - Portfolio items with client logos
  - Client testimonials
  - Mobile/desktop responsive layouts
  - ✅ Fully componentized (uses theme components, SectionClickable, TestimonialCard, PortfolioItem, SectionHeader)

- **TechView** (`/tech`) - Technical expertise browser
  - All 6 domains from tech.json (software, cloud, devops, data, security, leadership)
  - Sidebar navigation for categories and expertise topics
  - Auto-selects first topic on desktop (1024px+)
  - Emerald color scheme throughout
  - ✅ Fully componentized (uses Badge, IconBadge, IconButton, PanelSidebar, PanelContent, TechTheme)

- **HireMeView** (`/hire-me`) - Contact and hiring information
  - Calendly integration with inline widget and loading spinner
  - Sticky "Schedule a Call" button
  - Contact info: email, location (Florida, USA), social links (LinkedIn, GitHub)
  - About Me, Technical Achievements, and Leadership Experience sections
  - Fixed panel layout with body scroll lock
  - Navigation displays "Keep browsing" button (vs "Hire Me" on other pages)
  - ✅ Fully componentized (uses SecondaryButton, IconBadge, InfoCard, ContactInfoItem, SocialIcon)

- **ComponentView** (`/components`) - Design system showcase
  - Refactored from 2,075 lines to 209 lines (89.9% reduction!)
  - Extracted ShowcaseContent component to eliminate duplication
  - ✅ All examples now use real components where applicable

- **AttributionsView** (`/attributions`) - Image credits and photographer information
  - Grid layout with image previews
  - Proper Unsplash attribution links with photographer info
  - Accessible from footer
  - ✅ Uses AttributionCard component

**Component Library:**

- **31 reusable components** created and organized across 7 categories
- All components support dual color scheme (cyan for services, emerald for tech)
- 50+ instances migrated across multiple files
- Significant code reduction through deduplication

**Component Organization:**

- Reorganized into folder structure: elements/, cards/, ui/, display/, layout/, themes/
- Elements subfolder organization: buttons/, badges/, interactive/
- Type system aligned with component structure

**Infrastructure:**

- Responsive Design System: Mobile-first approach with 320px, 768px, 1024px, 1440px breakpoints
- Navigation: Global nav with mobile menu and dynamic theming
- Footer: Site footer with social links, copyright, and navigation
- Router: Vue Router with custom scroll behavior configuration
- SEO: useMeta composable for dynamic meta tags, robots.txt, sitemap.xml

**Data Structure:**

- Services organized in `/src/data/services/` (6 individual files)
- Tech domains consolidated in `/src/data/tech.json` (all 6 domains)
- Service configuration in `/src/data/services.json`

**Recent Major Refactoring:**

- Component reorganization (7 categories, 31 components)
- Type system reorganization (/types/shared/ + flat domain types)
- View renaming (ServicesView → HomeView, etc.)
- ServiceView extraction (4 new components created)
- Documentation updates (all 6 major docs updated)

**Documentation:**

- ✅ Complete documentation suite (9 files)
- ✅ COMPONENT-RULES.md with mandatory component creation guidelines
- ✅ All docs updated to reflect current architecture

### In Progress / TODO

**Content:**

- Service portfolio - Need real project examples
- Case studies - Placeholder data needs details
- Expanded expertise content

**Design Polish:**

- Loading states - Basic implementation, needs skeleton screens
- Error states - Minimal error handling
- Transition refinements

**Future Enhancements:**

- Analytics integration (Google Analytics, Plausible, etc.)
- Performance optimization (image lazy loading, code splitting)
- Testing (unit, integration, E2E, accessibility)
- CI/CD pipeline and automated deployments
- Production hosting setup

---

## Quick Reference

**Adding a new service:**

1. Create JSON file in `/src/data/services/{service-name}.json`
2. Follow `ServiceContent` schema (see DATA-STRUCTURE.md)
3. Add service config to `useServiceConfig.ts`
4. Service appears automatically in HomeView

**Adding tech expertise:**

1. Edit `/src/data/tech.json`
2. Add to appropriate domain's categories array
3. Follow `TechContent` schema (see DATA-STRUCTURE.md)

**Creating a component:**

1. Check if pattern appears 2-3+ times (MANDATORY - see COMPONENT-RULES.md)
2. Create in appropriate `/src/components/` subfolder
3. Support dual color scheme (cyan/emerald)
4. Add to COMPONENTS.md catalog

**Creating a theme:**

1. Create component in `/src/components/themes/`
2. Register in ServiceView theme registry
3. Use in service JSON with `"theme": "your-theme-name"`
4. See THEMES.md for detailed guide
