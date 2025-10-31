# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📝 Documentation Principles

When writing or updating documentation in this repository:

- **Be concise** - Get to the point quickly, avoid verbose explanations
- **🔴 Use visual icons for critical rules** - Important warnings should stand out visually
- **Stay on subject** - Document rules, not examples that add maintenance burden
- **Avoid summary information** - No component counts, file counts, or statistics that require updates
- **No version histories** - Source control handles change tracking
- **No changelogs** - Git commit history is the source of truth
- **Focus on principles over specifics** - Document "how to think" not "what exists"

---

## Quick Reference Card

**At-a-glance project summary:**

- **Tech Stack**: Vue 3 (Composition API) + TypeScript + Vue Router + Tailwind CSS
- **Color Schemes**: Cyan/Purple (services/business) | Emerald (tech/experience)

---

## Documentation Reference Key

**Quick lookup: When you need to... → Reference this doc**

| What You Need                                | Documentation File                      |
| -------------------------------------------- | --------------------------------------- |
| Create/modify components                     | `/docs/COMPONENT-RULES.md` ⚠️ MANDATORY |
| Find existing components                     | `/docs/COMPONENTS.md`                   |
| Apply styles, colors, typography, responsive | `/docs/DESIGN-SYSTEM.md`                |
| Work with service/tech data                  | `/docs/DATA-STRUCTURE.md`               |
| Understand system architecture               | `/docs/ARCHITECTURE.md`                 |
| Check current project status                 | `/docs/IMPLEMENTATION-STATUS.md`        |
| Review configuration setup                   | `/docs/CONFIGURATION.md`                |

---

## MANDATORY RULES

### 🔴 CRITICAL: Session Start Rules

**Execute these steps when you first start working:**

1. **Check for multiple dev servers**: Only ONE `npm run dev` should run at a time
   ```bash
   ps aux | grep "npm run dev" | grep -v grep
   ```
2. **Kill extra servers**: Use `KillShell` tool with shell IDs from system reminders
3. **Review git status**: Check current branch and staged/unstaged changes
4. **Check dev server output**: Look for any startup errors or warnings

**Why this matters**: Multiple servers waste resources and cause port conflicts. Clean environment = reliable development.

---

### 🔴 CRITICAL: After Every Code Change

**Execute these steps after ANY file modification:**

1. **Type check**: Run `npm run type-check`
   - Must pass with 0 errors
   - Fix any type errors before proceeding
2. **Format code**: Run `npm run format`
   - Ensures consistency with user's "format on save" IDE setting
   - Prevents unnecessary git diffs
3. **Test in browser**: Check dev server output for changes
   - Verify no console errors or warnings
   - Check affected pages still render correctly
4. **Verify changes**: Quick visual check if UI was modified
   - Look for layout issues, styling problems, broken interactions

**Why this matters**: The user has "format on save" enabled. If you don't format, your changes create unnecessary diffs when they save, causing confusion in source control.

---

### 🔴 CRITICAL: Before Completing Any Task

**Final checklist before marking work complete:**

- [ ] All type checks pass (`npm run type-check` shows 0 errors)
- [ ] All modified files formatted (`npm run format` executed)
- [ ] No console errors in browser dev tools
- [ ] Changes tested at relevant breakpoints (mobile 320px, tablet 768px, desktop 1024px+)
- [ ] Git status reviewed - no unintended file changes
- [ ] Documentation updated if architecture changed

**Why this matters**: Incomplete work causes downstream issues. Always deliver fully-tested, production-ready code.

---

### When Writing Vue Code

**Vue 3 development standards:**

- ✅ **Use Composition API** (not Options API)
- ✅ **Use `<script setup lang="ts">` syntax** for all components
- ✅ **Import types** from `/src/types/` (organized: shared/ subfolder + flat domain types)
- ✅ **Follow existing component patterns** for props, emits, and composables
- ✅ **Support dual color scheme** via props (`colorScheme` or `color`)
- ✅ **Use TypeScript interfaces** for all props (no implicit types)
- ✅ **Leverage Vue 3 features**: `defineProps`, `defineEmits`, `withDefaults`

**References**:

- `/docs/COMPONENT-RULES.md` - Component structure and patterns
- `/docs/DESIGN-SYSTEM.md` - Color schemes, design tokens, and responsive patterns

---

### When Creating/Modifying Components

**⚠️ MANDATORY: The 2-3 Pattern Rule**

**If you create the same UI pattern 2-3+ times, you MUST extract it into a reusable component.**

**Component creation workflow:**

1. **Check existing components first**: Review `/docs/COMPONENTS.md` catalog
2. **Apply the pattern rule**:
   - See duplicated pattern? → Create a component
   - Writing similar code 2-3 times? → Stop and componentize it
   - Copying/pasting UI elements? → Extract to a component first
3. **Organize correctly**: Place in appropriate folder
   - `elements/` - Basic UI building blocks (buttons, badges, utilities)
   - `cards/` - Card-based components
   - `ui/` - Complex UI components (panels, sections, navigation)
   - `display/` - Data display components (timelines, charts)
   - `layout/` - Global layout components (Navigation, Footer)
   - `integration/` - Integration-specific visualizations
4. **Support dual theming**: Add `colorScheme` or `color` prop
   - `cyan` for services/business pages
   - `emerald` for tech/experience pages
5. **Document it**: Add to `/docs/COMPONENTS.md` catalog after creation

**References**:

- `/docs/COMPONENT-RULES.md` ⚠️ **MANDATORY READ** - Complete component creation process
- `/docs/COMPONENTS.md` - Full catalog of existing components

**This rule applies to all developers and AI assistants. No exceptions.**

---

### When Styling Components

**Design system compliance:**

- ✅ **Use Tailwind CSS utility classes** (no custom CSS unless absolutely necessary)
- ✅ **Follow color scheme strategy**:
  - Services/Business pages: `cyan-400`, `cyan-500`, `purple-400`, `purple-500`
  - Tech/Experience pages: `emerald-400`, `emerald-500`
- ✅ **Use responsive font scale**:
  - Headers: `text-3xl md:text-4xl`, `text-lg md:text-xl`
  - Body: `text-xs md:text-sm lg:text-base`
- ✅ **Follow spacing scale**: 4, 6, 8, 12, 16, 24, 32, 48 (Tailwind spacing units)
- ✅ **Use gradient patterns from design system**:
  - Primary: `from-cyan-400 via-cyan-300 to-purple-400`
  - Background: `from-cyan-500/10 via-purple-500/10 to-cyan-500/10`
  - Button: `from-cyan-500 to-purple-500`
- ✅ **Background colors**: `bg-[#0a0a0a]` (primary), `bg-[#0f0f0f]` (cards), `bg-[#1a1a1a]` (elevated)

**References**:

- `/docs/DESIGN-SYSTEM.md` - Complete color palette, typography, spacing, gradients, and responsive design

---

### When Handling Responsive Design

**Mobile-first breakpoint strategy:**

- ✅ **Base styles target 320px** (mobile-first)
- ✅ **Breakpoints**:
  - `md:` = 768px (tablet)
  - `lg:` = 1024px (desktop)
  - `xl:` = 1440px (large desktop)
- ✅ **Test all breakpoints** when changing layouts
- ✅ **Use responsive components**:
  - `PanelContent` / `PanelSidebar` for mobile/desktop panel layouts
  - `ServiceSection` with responsive variants
- ✅ **Progressive enhancement**: Start mobile, layer up complexity

**References**:

- `/docs/DESIGN-SYSTEM.md` - Complete responsive design strategy, typography, and spacing scales

---

### When Working with Data

**Data structure and content rules:**

- ✅ **Service data**: TypeScript files in `/src/data/services/*.ts`
  - Follow `ServicePageData` type from `/src/types/servicePage.ts`
- ✅ **Tech data**: JSON file `/src/data/tech.json`
  - Follow `TechContent` type from `/src/types/tech.ts`
- ✅ **Use constants from `/src/constants/index.ts`**:
  - Never hardcode: URLs, contact info, site config, scheduling links
  - Import: `SCHEDULING_LINK`, `CONTACT`, `SITE`
- ✅ **File naming**: kebab-case for data files (e.g., `ai-enablement.ts`)

**References**:

- `/docs/DATA-STRUCTURE.md` - Complete type schemas and data organization
- `/src/constants/index.ts` - Application-wide constants

---

### When Adding Images

**Image attribution workflow:**

1. **Place image**: Add to appropriate `/public` subdirectory
2. **Check attribution requirement**: If from Unsplash or third-party, attribution is MANDATORY
3. **Update AttributionsView**: Add new `AttributionCard` to `/src/views/AttributionsView.vue`
   - Include: service/page name, image preview, description, photographer name + Unsplash link
4. **Follow existing pattern**: Use grid layout with consistent card structure

**Why this matters**: Legal compliance and proper credit to photographers.

---

### When Creating Service Pages

**Service detail page workflow:**

1. **Create data file**: `/src/data/services/{service-name}.ts`
   - Export `ServicePageData` object
   - Follow type schema from `/src/types/servicePage.ts`
2. **Create view component**: `/src/views/services/{ServiceName}ServiceView.vue`
   - Use `ServiceSection` component with `variant` prop (hero/benefits/process/portfolio/testimonials)
   - Add `BreadcrumbNav` for navigation
   - Support mobile/desktop responsive layouts
3. **Add route**: Update `/src/router/index.ts` with new route
   - Path: `/services/{service-name}`
   - Component: lazy-loaded view
4. **Update service config**: Add to service list if needed

**References**:

- `/docs/DATA-STRUCTURE.md` - Service data type schemas
- `/docs/COMPONENTS.md` - ServiceSection component documentation

---

### When Using Git/Creating Commits

**Version control workflow:**

- ✅ **NEVER commit without user explicitly requesting**
- ✅ **Review before committing**: Run `git status` and `git diff` in parallel
- ✅ **Check recent commits**: Run `git log` to match commit message style
- ✅ **Follow commit format**:

  ```
  Concise description of changes (focus on "why" not "what")

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

- ✅ **Use HEREDOC for commit messages**: Ensures proper formatting
- ❌ **NEVER use --no-verify or skip hooks**
- ❌ **NEVER force push to main/master**
- ❌ **NEVER amend commits from other developers**

**Pre-commit hook workflow:**

1. If commit fails due to pre-commit hook changes, verify it's safe to amend:
   - Check authorship: `git log -1 --format='%an %ae'`
   - Check not pushed: `git status` shows "Your branch is ahead"
2. If both true: amend the commit. Otherwise: create NEW commit.

---

### When Creating Pull Requests

**PR creation workflow:**

1. **Gather context**: Run in parallel:
   - `git status` - See all untracked files
   - `git diff` - See staged and unstaged changes
   - `git log` + `git diff [base-branch]...HEAD` - Full commit history since branch diverged
2. **Analyze changes**: Review ALL commits that will be included (not just latest)
3. **Push if needed**: Use `-u` flag for new branches
4. **Create PR**: Use `gh pr create` with HEREDOC for body:

   ```bash
   gh pr create --title "PR title" --body "$(cat <<'EOF'
   ## Summary
   - Bullet point summary

   ## Test plan
   - [ ] Testing checklist

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

5. **Return PR URL**: Show user the created PR link

---

## Project Architecture

### Tech Stack

- **Vue.js 3** with Composition API (`<script setup>`)
- **TypeScript** for type safety
- **Vue Router** for navigation with custom scroll behavior
- **Tailwind CSS** for styling
- **JSON/TypeScript** for content structure

### Color Scheme Strategy

The site uses a **dual color scheme** that switches contextually:

- **Services/Business Pages** (Home, Services, Hire Me): Cyan (`cyan-400`, `cyan-500`) and purple theme
- **Tech/Experience Pages** (Tech domain pages): Emerald green (`emerald-400`, `emerald-500`) theme
- **Dynamic Elements**: Logo and "Hire Me" button adapt to page context (cyan → emerald on Tech pages)

All components support `colorScheme` or `color` prop for dual theming.

**Reference**: `/docs/DESIGN-SYSTEM.md` for complete color palette documentation.

---

### File Structure

```
/src/
├── components/           # Reusable components
│   ├── elements/        # Basic UI building blocks
│   │   ├── buttons/     # Button components
│   │   ├── badges/      # Badge components
│   │   └── interactive/ # Interactive elements
│   ├── cards/           # Card-based components
│   ├── ui/              # Complex UI components
│   ├── integration/     # Integration-specific components
│   ├── display/         # Data display components
│   └── layout/          # Global layout components
├── views/               # Page-level components
│   ├── services/        # Service detail views
│   └── [other views]    # General views
├── data/                # Content data files
│   ├── services/        # Service data files
│   ├── services.json    # Service configuration
│   └── tech.json        # Technical expertise domains
├── types/               # TypeScript type definitions
│   ├── shared/          # Shared types
│   └── [domain types]   # Domain-specific types
├── constants/           # Application-wide constants
│   └── index.ts         # SCHEDULING_LINK, CONTACT, SITE
└── router/              # Vue Router configuration
    └── index.ts         # Route definitions and scroll behavior
```

**Reference**: `/docs/ARCHITECTURE.md` for detailed architecture documentation.

---

### URL Structure & Routes

```
/                       # HomeView - Service cards grid
/services/{name}        # Service detail pages
/hire-me                # HireMeView - Contact and hiring info
/tech                   # TechView - Technical expertise browser
/components             # ComponentView - Design system showcase
/attributions           # AttributionsView - Image credits
```

**Reference**: `/docs/COMPONENTS.md` for component catalog.

---

### Data Organization

```
/src/data/
├── services/        # Individual service TypeScript files
├── services.json    # Service configuration/metadata
└── tech.json        # Technical expertise domains
```

**Reference**: `/docs/DATA-STRUCTURE.md` for complete type schemas and data structure.

---

## Development Environment

### Development Commands

```bash
npm run dev          # Start development server at http://localhost:5173
npm run build        # Build for production (includes type checking)
npm run preview      # Preview production build locally
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
```

### Environment Management

**Development server rules:**

- ✅ Only ONE `npm run dev` server should run at a time
- ✅ Check for running servers: `ps aux | grep "npm run dev" | grep -v grep`
- ✅ Kill extras with `KillShell` tool (use shell IDs from system reminders)
- ✅ Check at start of each session for background processes

**Why this matters**: Multiple servers waste resources and cause port conflicts.

---

## Content Management

### Adding New Content

**Quick reference workflows:**

**Adding a new service:**

1. Create TypeScript data file: `/src/data/services/{service-name}.ts`
2. Export `ServicePageData` object (follow schema from `/src/types/servicePage.ts`)
3. Create view component: `/src/views/services/{ServiceName}ServiceView.vue`
4. Add route to `/src/router/index.ts`
5. Service appears automatically in HomeView

**Adding tech expertise:**

1. Edit `/src/data/tech.json`
2. Add to appropriate domain's categories array
3. Follow `TechContent` schema (see `/docs/DATA-STRUCTURE.md`)

**Creating a component:**

1. Check if pattern appears 2-3+ times (MANDATORY - see `/docs/COMPONENT-RULES.md`)
2. Create in appropriate `/src/components/` subfolder
3. Support dual color scheme (cyan/emerald) via props
4. Add to `/docs/COMPONENTS.md` catalog

---

## Application Constants

Application-wide constants are centralized in `/src/constants/index.ts` following Vue best practices.

**Available constants:**

```typescript
import { SCHEDULING_LINK, CONTACT, SITE } from '@/constants'

// Scheduling and contact links
SCHEDULING_LINK // Google Calendar appointment link

// Contact information
CONTACT.email // matt@idevelop.tech
CONTACT.location // Florida, USA
CONTACT.linkedin // https://www.linkedin.com/in/matt-lucian/
CONTACT.github // https://github.com/mattlucian

// Site configuration
SITE.name // idevelop.tech
SITE.url // https://idevelop.tech
SITE.companyName // I Develop Tech LLC
SITE.repository // https://github.com/mattlucian/idevelop.tech
SITE.ogImage // https://idevelop.tech/images/brand/og-image.png
```

**When to use constants:**

- External URLs used in multiple places (scheduling links, social media, etc.)
- Configuration values that might change across environments
- Repeated literal values that should be centralized

**Benefits:**

- Single source of truth for shared values
- Easy to update links/values across entire application
- Type-safe with TypeScript
- Better maintainability and consistency

---

## File Naming Conventions

- **Data files**: Lowercase with hyphens (kebab-case)
  - Services: `/src/data/services/{service-name}.ts`
  - Tech: `/src/data/tech.json` (all domains in one file)
  - Config: `/src/data/services.json`
- **Components**: PascalCase (e.g., `TypewriterText.vue`, `ServiceCard.vue`, `PrimaryButton.vue`)
- **Views**: PascalCase with "View" suffix (e.g., `HomeView.vue`, `TechView.vue`, `IntegrationServiceView.vue`)
  - Service views are in `/src/views/services/` subdirectory
- **Constants**: Located in `/src/constants/index.ts`

---

## Project Overview

This is a portfolio website project for idevelop.tech featuring services and technical expertise showcase.

**Reference**: `/docs/ARCHITECTURE.md` for complete system architecture and technical decisions.
