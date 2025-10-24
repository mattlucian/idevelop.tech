# Component Creation Rules

This document establishes the mandatory rules for creating and using components in this project. **These rules MUST be followed by all developers and AI assistants working on this codebase.**

## Core Rule: The 2-3 Pattern Rule

**MANDATORY**: If you create the same UI pattern 2-3 or more times anywhere in the application, you **MUST** extract it into a reusable component.

### Why This Rule Exists

1. **Consistency**: Ensures identical patterns look and behave the same everywhere
2. **Maintainability**: Changes to a pattern only need to happen in one place
3. **Type Safety**: TypeScript props prevent incorrect usage
4. **Code Reduction**: Eliminates duplication and reduces bundle size
5. **Developer Experience**: Clear APIs with documented props

---

## When to Create a Component

### ✅ **CREATE a component when:**

- The pattern appears **2-3+ times** in the codebase
- The pattern has **consistent styling** across usages
- The pattern has **predictable variations** (sizes, colors, states)
- The pattern is a **reusable UI element** (button, badge, card, etc.)

### ❌ **DON'T create a component when:**

- The pattern is **unique** to a single location
- The pattern is a **one-off design** with no reuse potential
- The pattern is too **simple** (e.g., a single div with one class)
- The pattern is **page-specific layout** that won't be reused

---

## Component Creation Checklist

When creating a new reusable component, follow this checklist:

### 1. **Component Design**

- [ ] Identify all variations of the pattern across the codebase
- [ ] Define clear prop types with TypeScript interfaces
- [ ] Support common variants (size, color, state)
- [ ] Use sensible defaults for optional props
- [ ] Include slots for flexible content

### 2. **Implementation**

- [ ] Create component in appropriate `/src/components/` subdirectory
- [ ] Use PascalCase naming (e.g., `PrimaryButton.vue`, not `primary-button.vue`)
- [ ] Add JSDoc comments for all props
- [ ] Use `withDefaults()` for default prop values
- [ ] Define emits with TypeScript types

### 3. **Migration**

- [ ] Find all instances of the old pattern
- [ ] Import the new component in each file
- [ ] Replace old markup with component usage
- [ ] Verify functionality is preserved
- [ ] Test responsive behavior

### 4. **Documentation**

- [ ] Add component entry to `/docs/COMPONENTS.md` (name, purpose, file link only)
- [ ] Add JSDoc comments to all props in the component file
- [ ] Update component count in COMPONENTS.md if needed

---

## Existing Reusable Components

> **📚 Full Component Catalog**: See [COMPONENTS.md](./COMPONENTS.md) for the complete list with file links and usage details.

### Quick Reference by Category

## Elements

### Buttons

| Component           | When to Use                    | Key Props                              |
| ------------------- | ------------------------------ | -------------------------------------- |
| **PrimaryButton**   | Solid gradient CTA buttons     | `show-arrow`, `responsive`, `disabled` |
| **SecondaryButton** | Subtle gradient action buttons | `show-arrow`, `full-width`, `disabled` |
| **IconButton**      | Circular close/back buttons    | `size`, `type`, `absolute-position`    |

**Example:**

```vue
<PrimaryButton @click="handleClick">
  Let's Work Together
</PrimaryButton>

<SecondaryButton :full-width="false" show-arrow>
  Explore Service
</SecondaryButton>

<IconButton type="back" size="sm" @click="goBack" />
```

---

### Badges

| Component     | When to Use              | Key Props                                               |
| ------------- | ------------------------ | ------------------------------------------------------- |
| **Badge**     | Small tag pills/labels   | `variant` (default\|teal\|cyan\|purple\|emerald\|muted) |
| **IconBadge** | Circular icon containers | `size`, `color`, `bordered`                             |

**Example:**

```vue
<Badge variant="emerald">Vue.js</Badge>
<Badge variant="muted">Technology</Badge>

<IconBadge size="md" color="cyan">🔧</IconBadge>
<IconBadge size="lg" color="emerald" bordered>💻</IconBadge>
```

---

### Interactive

| Component          | When to Use            | Key Props                                                      |
| ------------------ | ---------------------- | -------------------------------------------------------------- |
| **TypewriterText** | Animated typing effect | `:phrases`, `typing-speed`, `deleting-speed`, `pause-duration` |

---

### Utility Elements

| Component           | When to Use          | Key Props                            |
| ------------------- | -------------------- | ------------------------------------ |
| **CheckItem**       | Checkmark list items | `color` (cyan\|emerald)              |
| **ContactInfoItem** | Contact info rows    | `icon`, `label`, `color`             |
| **SocialIcon**      | Social media links   | `platform` (linkedin\|github), `url` |
| **LoadingSpinner**  | Loading indicators   | `size`, `message`, `color`           |

---

## Cards

| Component           | When to Use                       | Key Props                                                          |
| ------------------- | --------------------------------- | ------------------------------------------------------------------ |
| **ServiceCard**     | Service offering cards            | `icon`, `label`, `title`, `tagline`, `stats`, `tags`, `hero-image` |
| **IconCard**        | Feature cards with centered icons | `icon`, `title`, `description`, `color`                            |
| **ThinIconCard**    | Compact cards with left icons     | `icon`, `title`, `description`, `color`                            |
| **InfoCard**        | Wrapper cards for grouped content | `title`, `icon`, `variant`                                         |
| **TestimonialCard** | Client testimonials               | `:testimonial`, `color-scheme`                                     |
| **PortfolioItem**   | Portfolio work items              | `:item`, `color-scheme`                                            |
| **AttributionCard** | Image attribution credits         | `:service`, `:image`, `:photographer`                              |

**Example:**

```vue
<IconCard icon="🚀" title="Fast Setup" description="Get started in minutes" color="cyan" />

<TestimonialCard :testimonial="testimonialData" color-scheme="emerald" />

<PortfolioItem
  :item="{ name: 'Project', url: '...', logo: '...', description: '...' }"
  color-scheme="cyan"
/>
```

---

## UI Components

### Panel Components

| Component        | When to Use                 | Key Props                        |
| ---------------- | --------------------------- | -------------------------------- |
| **PanelSidebar** | Fixed sidebar navigation    | `color-scheme`, `hide-on-mobile` |
| **PanelContent** | Fixed content display panel | `color-scheme`, `header-style`   |
| **PanelMobile**  | Mobile full-screen panel    | `color-scheme`                   |

---

### Section Components

| Component            | When to Use               | Key Props                                                  |
| -------------------- | ------------------------- | ---------------------------------------------------------- |
| **SectionClickable** | Numbered section buttons  | `section-number`, `heading`, `is-selected`, `color-scheme` |
| **SectionHeader**    | Section titles with icons | `title`, `icon`, `color-scheme`                            |

**Example:**

```vue
<SectionHeader title="Details" icon="M9 5H7a2 2 0 00-2 2v12..." color-scheme="cyan" />

<SectionClickable
  :section-number="1"
  heading="Getting Started"
  :is-selected="selectedIndex === 1"
  color-scheme="emerald"
  @click="selectSection(1)"
/>
```

---

## Display Components

| Component    | When to Use                  | Key Props         |
| ------------ | ---------------------------- | ----------------- |
| **Timeline** | Vertical timeline with steps | `title`, `:steps` |

---

## Layout Components

| Component      | When to Use            | Key Props                                  |
| -------------- | ---------------------- | ------------------------------------------ |
| **Navigation** | Global site navigation | (No props - handles routing automatically) |
| **Footer**     | Site footer            | (No props - static content)                |

---

## Component Location Guidelines

```
/src/components/
├── elements/
│   ├── buttons/
│   │   ├── PrimaryButton.vue
│   │   ├── SecondaryButton.vue
│   │   └── IconButton.vue
│   ├── badges/
│   │   ├── Badge.vue
│   │   └── IconBadge.vue
│   ├── interactive/
│   │   └── TypewriterText.vue
│   ├── CheckItem.vue
│   ├── ContactInfoItem.vue
│   ├── SocialIcon.vue
│   └── LoadingSpinner.vue
├── cards/
│   ├── ServiceCard.vue
│   ├── IconCard.vue
│   ├── ThinIconCard.vue
│   ├── InfoCard.vue
│   ├── TestimonialCard.vue
│   ├── PortfolioItem.vue
│   └── AttributionCard.vue
├── ui/
│   ├── PanelSidebar.vue
│   ├── PanelContent.vue
│   ├── PanelMobile.vue
│   ├── SectionClickable.vue
│   ├── SectionHeader.vue
│   └── ShowcaseContent.vue
├── display/
│   └── Timeline.vue
├── layout/
│   ├── Navigation.vue
│   └── Footer.vue
└── themes/
    ├── DefaultTheme.vue
    ├── OverviewTheme.vue
    ├── ProcessTheme.vue
    ├── OptionsTheme.vue
    └── TechTheme.vue
```

### Naming Conventions

- **PascalCase** for all component files (e.g., `PrimaryButton.vue`)
- **Descriptive names** that indicate purpose (e.g., `IconButton` not `CircleBtn`)
- **Variant suffixes** when appropriate (e.g., `PrimaryButton`, `SecondaryButton`)
- **Folder organization** by component category (elements, cards, ui, display, layout, themes)

---

## Migration Process

When you identify a pattern that should be componentized:

### Step 1: Analysis

```bash
# Search for the pattern across the codebase
# Example: Finding all solid gradient buttons
grep -r "bg-gradient-to-r from-cyan-500 to-purple-500" src/
```

### Step 2: Create Component

1. Create new `.vue` file in appropriate `/src/components/` subdirectory
2. Extract common HTML structure
3. Define props for variations
4. Add TypeScript types
5. Test the component

### Step 3: Migration

1. Import component in target files
2. Replace old markup with component
3. Map data to props
4. Test functionality

### Step 4: Cleanup

1. Remove unused CSS classes
2. Update documentation
3. Commit with clear message

---

## Component Testing Checklist

Before marking a component migration as complete:

- [ ] Component renders correctly in all usage contexts
- [ ] All variants (sizes, colors, states) work as expected
- [ ] Responsive behavior is preserved
- [ ] TypeScript types are correct (no type errors)
- [ ] Dev server runs without errors
- [ ] Production build succeeds
- [ ] No console warnings or errors

---

## Common Patterns to Componentize

Based on analysis of this codebase, watch for these patterns:

### Buttons

- Any button with gradient background (solid or subtle)
- Circular icon buttons (close/back actions)
- CTAs with consistent styling

### Badges & Tags

- Small labels with rounded corners
- Technology/skill tags
- Status indicators
- Circular icon containers

### Cards

- Cards with consistent padding/spacing
- Clickable/hoverable cards
- Feature cards with icons
- Testimonial cards
- Portfolio items

### Lists & Items

- Checkmark list items
- Contact information rows
- Section headers with icons

### Interactive Elements

- Loading spinners
- Typewriter animations
- Navigation components

---

## Version History

### v2.0 (Current)

- Reorganized component structure into categorized folders
- **31 total components** across 7 categories:
  - **Elements** (10): Buttons, badges, interactive, utilities
  - **Cards** (7): ServiceCard, IconCard, ThinIconCard, InfoCard, TestimonialCard, PortfolioItem, AttributionCard
  - **UI** (6): Panels, sections, showcase
  - **Display** (1): Timeline
  - **Layout** (2): Navigation, Footer
  - **Themes** (5): DefaultTheme, OverviewTheme, ProcessTheme, OptionsTheme, TechTheme
- Added color scheme abstraction (cyan/emerald) across all components
- Established folder-based organization pattern

### v1.0

- Initial component library established
- 7 core components created
- 50+ instances migrated across 6 files
- 65 lines of code eliminated through deduplication

---

## Enforcement

**This rule is MANDATORY and will be enforced:**

1. **Code Reviews**: PRs with duplicated patterns will be rejected
2. **AI Assistants**: Claude must follow these rules when generating code
3. **Documentation**: This file must be updated when new components are created
4. **CLAUDE.md**: The main instructions file references this document

**If you're unsure whether to create a component, err on the side of creating one.** It's easier to merge components later than to refactor duplicated code.
