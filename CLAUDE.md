# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website project for idevelop.tech featuring services and technical expertise/experience showcase. The site displays services offered and professional experience across 6 core domains.

## Tech Stack

- Vue.js 3 with Composition API
- Vue Router for navigation
- Tailwind CSS for styling
- JSON-based content structure

## Content Architecture

Content is organized in JSON files within the `/src/data` directory:

### Data Organization
```
/src/data/
├── services/               # Service offerings
│   ├── tech-admin.json
│   ├── integration.json
│   ├── ai.json
│   ├── ecommerce.json
│   ├── web-design.json
│   └── cloud-consulting.json
└── experience/             # Technical expertise/skills
    ├── software.json
    ├── cloud.json
    ├── devops.json
    ├── data.json
    ├── security.json
    └── leadership.json
```

### URL Structure
```
/                                  # Home (ServicesView - service cards)
/hire-me                           # Hire Me page
/experience                        # Experience overview (ExperienceView)
/experience?domain=software        # Software experience detail
/experience?domain=cloud           # Cloud experience detail
/experience?domain=devops          # DevOps experience detail
/experience?domain=data            # Data engineering experience detail
/experience?domain=security        # Security experience detail
/experience?domain=leadership      # Leadership experience detail
/components                        # Component showcase (manually navigated)
```

## Content Statistics

- **Services**: 6 service offerings (tech-admin, integration, ai, ecommerce, web-design, cloud-consulting)
- **Experience**: 6 expertise domains (software, cloud, devops, data, security, leadership)
- **Total Data Files**: 12 JSON files

## File Naming Convention

- **Data files**: Lowercase with hyphens (kebab-case), organized in `/services` and `/experience` subdirectories
- **Components**: PascalCase (e.g., `TypewriterText.vue`, `ServiceCard.vue`)
- **Views**: PascalCase with "View" suffix (e.g., `ServicesView.vue`, `ExperienceView.vue`, `HireMeView.vue`)

## Documentation

Comprehensive project documentation is located in the `/docs` directory:

- **DESIGN-SYSTEM.md** - Complete design system including colors, typography, spacing, and component patterns
- **COMPONENTS.md** - Component library catalog with usage examples and best practices
- **RESPONSIVE-DESIGN.md** - Responsive design strategy, breakpoints, and mobile-first approach
- **ARCHITECTURE.md** - System architecture and technical decisions
- **DATA-STRUCTURE.md** - Data models and content structure
- **IMPLEMENTATION-STATUS.md** - Current implementation status and roadmap
- **ATTRIBUTIONS.md** - Image attribution tracking

**When working on this project, consult these docs for:**
- Design patterns and component usage
- Responsive breakpoint strategy
- Typography and spacing scales
- Color palette and gradients
- Best practices and guidelines

## Development Commands

Common development commands:

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Image Attribution Process

All third-party images (especially from Unsplash) must be properly attributed. See `/docs/ATTRIBUTIONS.md` for the complete process.

**Quick Reference:**
- When user says "please attribute this image per our attribution process":
  1. Open `/docs/ATTRIBUTIONS.md`
  2. Find the image by its ID (e.g., `web-design-hero`)
  3. Update the TBD section with provided attribution
  4. Preserve all existing attributions

## Implementation Status

**Completed:**
- **ServicesView** (Home page `/`): Service cards with hero images, drill-down panels, responsive design
  - 6 services: Tech Admin, Integration, AI Enablement, eCommerce Ops, Web Design, Cloud Consulting
  - Hero images with gradient overlays and hover effects
  - Responsive stat boxes optimized for 320px-1440px+ widths
  - URL-based service selection with preserved scroll position
  - Mobile full-screen, desktop side-panel drill-down
- **ExperienceView** (`/experience`): Domain/expertise overview and detailed domain views
  - Software, Cloud, DevOps, Data, Security, Leadership domains
  - Card-based navigation
  - Query parameter-based domain selection (e.g., `/experience?domain=software`)
  - Dynamic data loading from JSON files
  - Structured content display with topics and categories
  - Sidebar navigation for topics within each domain
- **HireMeView** (`/hire-me`): Contact and hiring information page
- **ComponentShowcase** (`/components`): Design system showcase
- **TypewriterText Component**: Reusable animated text component with configurable speeds
- **Responsive Design System**: Mobile-first approach with carefully tuned breakpoints
  - 320px ultra-mobile optimization
  - 768px tablet-specific adjustments
  - 1024px+ desktop enhancements
- **Design Documentation**: Complete design system, component library, and responsive strategy docs
- **Navigation**: Global nav with mobile menu
- **Router**: Vue Router with scroll behavior configuration
- **Image Attribution System**: ATTRIBUTIONS.md tracking
- **Data Structure**: Reorganized JSON data into `/services` and `/experience` subdirectories

**TODO:**
- Attribution page (`/attribution` route) for displaying image credits
- Extract reusable components (StatBox, ServiceCard, etc.)
- Additional services/experience content expansion
- SEO optimization and meta tags