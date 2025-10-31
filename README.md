# idevelop.tech

Portfolio website showcasing technical services and expertise. Built with Vue 3 (Composition API), TypeScript, and Tailwind CSS.

**Tech Stack**: Vue 3 + TypeScript + Vue Router + Tailwind CSS
**Color Schemes**: Cyan/Purple (services/business) | Emerald (tech/experience)

---

## Quick Start

```sh
npm install
npm run dev          # Dev server at http://localhost:5173
```

**Development Commands:**

```sh
npm run build        # Build for production (includes type checking)
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
npm run lint         # ESLint with auto-fix
npm run format       # Format with Prettier
```

**Prerequisites**: Node.js 20.19.0+ or 22.12.0+

---

## Documentation

**Quick Reference: When you need to... → Reference this doc**

| What You Need                                | Documentation File          |
| -------------------------------------------- | --------------------------- |
| Create/modify components                     | [COMPONENT-RULES.md][rules] |
| Find existing components                     | [COMPONENTS.md][comps]      |
| Apply styles, colors, typography, responsive | [DESIGN-SYSTEM.md][design]  |
| Work with service/tech data                  | [DATA-STRUCTURE.md][data]   |
| Understand system architecture               | [ARCHITECTURE.md][arch]     |
| Check current project status                 | [STATUS.md][status]         |
| Review configuration setup                   | [CONFIGURATION.md][config]  |

[rules]: docs/COMPONENT-RULES.md
[comps]: docs/COMPONENTS.md
[design]: docs/DESIGN-SYSTEM.md
[data]: docs/DATA-STRUCTURE.md
[arch]: docs/ARCHITECTURE.md
[status]: docs/IMPLEMENTATION-STATUS.md
[config]: docs/CONFIGURATION.md

See [CLAUDE.md](CLAUDE.md) for AI assistant instructions and complete development workflow.

---

## Project Structure

```
/src
  /components          # Reusable Vue components (elements/, cards/, ui/, layout/)
  /views              # Page-level components
    /services/        # Service detail views
  /data               # Content data (TypeScript + JSON)
    /services/        # Service TypeScript files
  /types              # TypeScript type definitions
    /shared/          # Shared types
  /constants          # Application-wide constants (URLs, contact info, site config)
  /composables        # Vue composables
  /router             # Vue Router configuration
/public               # Static assets
  /images            # Brand assets and images
/docs                 # Project documentation
```

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture and technical decisions.

---

## Common Tasks

**Add a new service:**

1. Create data file: `/src/data/services/{service-name}.ts` (export `ServicePageData`)
2. Create view: `/src/views/services/{ServiceName}ServiceView.vue`
3. Add route to `/src/router/index.ts`

See [DATA-STRUCTURE.md](docs/DATA-STRUCTURE.md) for type schemas.

**Add tech expertise:**

1. Edit `/src/data/tech.ts`
2. Add to appropriate domain's categories array

**Create a component:**

1. Check [COMPONENTS.md](docs/COMPONENTS.md) for existing components
2. Follow the 2-3 pattern rule (see [COMPONENT-RULES.md](docs/COMPONENT-RULES.md))
3. Support dual color scheme (cyan/emerald) via props
4. Document in COMPONENTS.md

**Add images with attribution:**

1. Place in `/public/images/`
2. Add attribution card to `/src/views/AttributionsView.vue`

---

## Application Constants

Centralized in `/src/constants/index.ts`:

```typescript
import { SCHEDULING_LINK, CONTACT, SITE } from '@/constants'
```

**Updating URLs/contact info:**

- Update `/src/constants/index.ts` (auto-updates all Vue components)
- Manually update static files:
  - `/index.html` - Meta tags, JSON-LD structured data
  - `/public/robots.txt` - Sitemap URL
  - `/public/sitemap.xml` - All URL locations

---

## Development Workflow

**Before starting work:**

- Check for multiple dev servers: `ps aux | grep "npm run dev" | grep -v grep`
- Kill extras if needed (only ONE server should run)

**After every code change:**

1. Run `npm run type-check` (must pass with 0 errors)
2. Run `npm run format` (ensures consistency)
3. Check browser console for errors
4. Test responsive layouts (320px, 768px, 1024px+)

**Before committing:**

- All type checks pass
- All files formatted
- No console errors
- Documentation updated if needed

See [CLAUDE.md](CLAUDE.md) for complete development workflow and mandatory rules.

---

## IDE Setup

**Recommended**: [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

**Important**: Disable Vetur (conflicts with Vue Official extension)

**Browser DevTools**:

- [Vue.js devtools for Chrome/Edge/Brave](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Vue.js devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

**TypeScript Support**: Uses `vue-tsc` for type checking and Volar for IDE support
