# Documentation

This directory contains comprehensive documentation for the idevelop.tech portfolio website project.

## 📚 Documentation Index

### Getting Started

Start here if you're new to the project:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture, technology stack, and component organization
2. **[IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md)** - Current status, completed features, and roadmap

### Development Guides

Core guides for building features:

- **[COMPONENT-RULES.md](./COMPONENT-RULES.md)** - ⚠️ **MANDATORY** - The 2-3 pattern rule and component creation guidelines
- **[COMPONENTS.md](./COMPONENTS.md)** - Complete catalog of all 31 reusable components
- **[THEMES.md](./THEMES.md)** - Service detail theme system and custom layout creation
- **[DATA-STRUCTURE.md](./DATA-STRUCTURE.md)** - JSON schemas, content hierarchy, and type definitions

### Design & Styling

Design system and styling guidelines:

- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Colors, typography, spacing, animation, component patterns
- **[RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md)** - Breakpoint strategy, mobile-first patterns, testing checklist

### Configuration & SEO

- **[CONFIGURATION.md](./CONFIGURATION.md)** - Configuration files reference and modification guide
- **[SEO-PLAN.md](./SEO-PLAN.md)** - SEO strategy and implementation plan
- **[SEO-CODE-EXAMPLE.md](./SEO-CODE-EXAMPLE.md)** - Code examples for SEO implementation
- **[SEO-ROUTING-EXAMPLE.md](./SEO-ROUTING-EXAMPLE.md)** - Routing examples with SEO considerations

---

## 📖 Quick Reference by Task

### I want to...

**...build a new feature**
→ Read: [ARCHITECTURE.md](./ARCHITECTURE.md), [COMPONENTS.md](./COMPONENTS.md), [COMPONENT-RULES.md](./COMPONENT-RULES.md)

**...create a new component**
→ Read: [COMPONENT-RULES.md](./COMPONENT-RULES.md) ⚠️ **MANDATORY**

**...style a component**
→ Read: [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md), [RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md)

**...add content (services/tech)**
→ Read: [DATA-STRUCTURE.md](./DATA-STRUCTURE.md)

**...create a custom service layout**
→ Read: [THEMES.md](./THEMES.md)

**...modify configuration**
→ Read: [CONFIGURATION.md](./CONFIGURATION.md)

**...check project status**
→ Read: [IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md)

**...optimize for SEO**
→ Read: [SEO-PLAN.md](./SEO-PLAN.md), [SEO-CODE-EXAMPLE.md](./SEO-CODE-EXAMPLE.md)

---

## 🎯 Core Concepts

### The 2-3 Pattern Rule

**MANDATORY**: If you create the same UI pattern 2-3+ times, you **MUST** extract it into a reusable component.

→ See [COMPONENT-RULES.md](./COMPONENT-RULES.md) for complete details

### Component Organization

31 components organized into 7 categories:

- **Elements** (10): Buttons, badges, interactive, utilities
- **Cards** (7): ServiceCard, IconCard, TestimonialCard, etc.
- **UI** (6): Panels, sections, showcase
- **Display** (1): Timeline
- **Layout** (2): Navigation, Footer
- **Themes** (5): Content layout themes

→ See [COMPONENTS.md](./COMPONENTS.md) for complete catalog

### Dual Color Scheme

- **Cyan/Purple** for Services/Business pages
- **Emerald** for Tech/Experience pages
- All components support `colorScheme` prop

→ See [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) for color palette

### Data Structure

- Services: Individual JSON files in `/src/data/services/`
- Tech: Consolidated in `/src/data/tech.json`
- Configuration: `/src/data/services.json`

→ See [DATA-STRUCTURE.md](./DATA-STRUCTURE.md) for schemas

---

## 📝 Document Relationships

```
ARCHITECTURE.md
├── Component Organization → COMPONENTS.md
├── Component Rules → COMPONENT-RULES.md
├── Design System → DESIGN-SYSTEM.md
├── Data Strategy → DATA-STRUCTURE.md
└── Theme System → THEMES.md

DESIGN-SYSTEM.md
├── Responsive Patterns → RESPONSIVE-DESIGN.md
└── Component Implementation → COMPONENTS.md

DATA-STRUCTURE.md
└── Theme Customization → THEMES.md

IMPLEMENTATION-STATUS.md
└── Configuration → CONFIGURATION.md
```

---

## 🚀 Recent Updates

- **2025-10-24**: Complete documentation update after major refactoring
- 31 components across 7 categories
- Type system reorganization
- View renaming (ServicesView → HomeView, etc.)
- SEO implementation completed

→ See [IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md) for detailed changelog

---

## 💡 Tips

1. **Always check COMPONENT-RULES.md first** before creating new UI patterns
2. **Use COMPONENTS.md** as a quick reference for available components
3. **Consult DESIGN-SYSTEM.md** for consistent styling
4. **Follow DATA-STRUCTURE.md** schemas when adding content
5. **Check IMPLEMENTATION-STATUS.md** to avoid duplicate work

---

## 📬 Need Help?

If you can't find what you're looking for:

1. Check the [main README.md](../README.md) in project root
2. Review [CLAUDE.md](../CLAUDE.md) for AI assistant instructions
3. Consult the relevant documentation file from the index above
