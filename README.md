# idevelop.tech

A modern portfolio website showcasing technical expertise across multiple domains, built with Vue.js 3, TypeScript, and Tailwind CSS.

---

## Quick Start

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- npm (comes with Node.js)

### Installation & Development

```sh
npm install
npm run dev
```

Visit http://localhost:5173 to view the site.

### Build for Production

```sh
npm run build
npm run preview      # Preview production build locally
```

### Other Commands

```sh
npm run type-check   # Run TypeScript type checking
npm run lint         # Lint and auto-fix code
npm run format       # Format code with Prettier
```

---

## Documentation

Comprehensive project documentation is located in the `/docs` directory:

| Document | Purpose |
|----------|---------|
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** | Technical stack, application structure, routing, state management |
| **[DATA-STRUCTURE.md](docs/DATA-STRUCTURE.md)** | JSON schemas, content hierarchy, type definitions |
| **[DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)** | Colors, typography, spacing, animation guidelines |
| **[COMPONENTS.md](docs/COMPONENTS.md)** | Component library catalog with usage examples |
| **[RESPONSIVE-DESIGN.md](docs/RESPONSIVE-DESIGN.md)** | Breakpoint strategy, mobile-first patterns, testing checklist |
| **[CONFIGURATION.md](docs/CONFIGURATION.md)** | Configuration files reference and modification guide |
| **[IMPLEMENTATION-STATUS.md](docs/IMPLEMENTATION-STATUS.md)** | Completed features, roadmap, TODOs |
| **[ATTRIBUTIONS.md](docs/ATTRIBUTIONS.md)** | Third-party image credits and attribution process |

### When to Use Each Document

**Building features?** → ARCHITECTURE.md, COMPONENTS.md
**Styling components?** → DESIGN-SYSTEM.md, RESPONSIVE-DESIGN.md
**Managing content?** → DATA-STRUCTURE.md
**Modifying configs?** → CONFIGURATION.md
**Tracking progress?** → IMPLEMENTATION-STATUS.md
**Adding images?** → ATTRIBUTIONS.md

---

## Project Structure

```
/src
  /components            # Reusable Vue components
  /views                 # Page-level components
  /data
    /services            # Service offering data (JSON)
    /experience          # Technical expertise data (JSON)
  /types                 # TypeScript type definitions
  /composables           # Vue composables
  /router                # Vue Router configuration
/public                  # Static assets
  /images
    /brand               # idevelop.tech logos and favicons
    /partners            # Client/partner logos
/docs                    # Project documentation
```

---

## Development Workflow

### Adding New Content

**Services:** Create JSON in `/src/data/services/`, follow `ServiceContent` schema
**Experience:** Create JSON in `/src/data/experience/`, follow `ExperienceContent` schema
**Images:** Place in `/public/images/brand/` or `/public/images/partners/` as appropriate

See [DATA-STRUCTURE.md](docs/DATA-STRUCTURE.md) for complete schemas and examples.

### Creating Components

1. Build component following patterns in [COMPONENTS.md](docs/COMPONENTS.md)
2. Use design tokens from [DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)
3. Test responsively using breakpoints in [RESPONSIVE-DESIGN.md](docs/RESPONSIVE-DESIGN.md)
4. Document usage with examples

### Updating Documentation

When making changes that affect documentation:

1. Update the relevant documentation file(s)
2. Keep examples and code snippets accurate
3. Update cross-references if file/component names change
4. Test that all links still work

---

## IDE Setup

### Recommended IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension

**Important:** Disable Vetur if you have it installed, as it conflicts with Vue (Official)

### Browser DevTools

**Chromium (Chrome, Edge, Brave):**
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

**Firefox:**
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

### Type Support for `.vue` Files

TypeScript cannot handle type information for `.vue` imports by default, so we use `vue-tsc` for type checking and Volar for IDE support.

---

## Contributing

When contributing to this project:

- Follow existing patterns documented in `/docs`
- Keep documentation in sync with code changes
- Test responsive layouts at 320px, 768px, and 1024px+ widths
- Run `npm run type-check` and `npm run lint` before committing
