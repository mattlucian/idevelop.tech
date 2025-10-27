# Component Library

Quick reference for all reusable components in the idevelop.tech application. For detailed prop documentation, see the component source files.

> **📘 Component Creation Rule**: If you create the same UI pattern 2-3+ times, extract it into a component. See [COMPONENT-RULES.md](./COMPONENT-RULES.md) for details.

---

## Elements

### Buttons

#### PrimaryButton

**Purpose**: Solid gradient CTA buttons for primary actions
**File**: [`/src/components/elements/buttons/PrimaryButton.vue`](../src/components/elements/buttons/PrimaryButton.vue)

#### SecondaryButton

**Purpose**: Subtle gradient buttons for secondary actions
**File**: [`/src/components/elements/buttons/SecondaryButton.vue`](../src/components/elements/buttons/SecondaryButton.vue)

#### OutlineButton

**Purpose**: Outline style navigation buttons with cyan/emerald variants
**File**: [`/src/components/elements/buttons/OutlineButton.vue`](../src/components/elements/buttons/OutlineButton.vue)
**Colors**: cyan, emerald
**Note**: Used for "Hire Me", "</>", "Back to business", and "Keep browsing" buttons

#### IconButton

**Purpose**: Circular buttons for close/back navigation
**File**: [`/src/components/elements/buttons/IconButton.vue`](../src/components/elements/buttons/IconButton.vue)

### Badges

#### Badge

**Purpose**: Small tag pills for skills, technologies, or categories
**File**: [`/src/components/elements/badges/Badge.vue`](../src/components/elements/badges/Badge.vue)
**Variants**: default, teal, cyan, purple, emerald, muted
**Note**: Use `emerald` variant for Experience/technical pages

#### IconBadge

**Purpose**: Circular containers for icons/emojis with background colors
**File**: [`/src/components/elements/badges/IconBadge.vue`](../src/components/elements/badges/IconBadge.vue)
**Sizes**: sm, md, lg, xl
**Colors**: cyan, teal, purple, green, emerald, neutral
**Note**: Use `emerald` color for Experience/technical pages

### Interactive

#### TypewriterText

**Purpose**: Animated typewriter effect that cycles through phrases
**File**: [`/src/components/elements/interactive/TypewriterText.vue`](../src/components/elements/interactive/TypewriterText.vue)

### Utility Elements

#### CheckItem

**Purpose**: Checkmark list items for feature/achievement lists
**File**: [`/src/components/elements/CheckItem.vue`](../src/components/elements/CheckItem.vue)
**Colors**: cyan, emerald

#### ContactInfoItem

**Purpose**: Contact information rows with icon badges and labels
**File**: [`/src/components/elements/ContactInfoItem.vue`](../src/components/elements/ContactInfoItem.vue)
**Colors**: cyan, emerald

#### SocialIcon

**Purpose**: Social media icon links (LinkedIn, GitHub)
**File**: [`/src/components/elements/SocialIcon.vue`](../src/components/elements/SocialIcon.vue)
**Platforms**: linkedin, github

#### LoadingSpinner

**Purpose**: Animated loading spinner with optional message
**File**: [`/src/components/elements/LoadingSpinner.vue`](../src/components/elements/LoadingSpinner.vue)
**Sizes**: sm, md, lg
**Colors**: cyan, emerald

---

## Cards

### ServiceCard

**Purpose**: Service offering cards with hero images, stats, and tags
**File**: [`/src/components/cards/ServiceCard.vue`](../src/components/cards/ServiceCard.vue)

### IconCard

**Purpose**: Feature/benefit cards with centered icons and gradient backgrounds
**File**: [`/src/components/cards/IconCard.vue`](../src/components/cards/IconCard.vue)
**Colors**: cyan, emerald

### ThinIconCard

**Purpose**: Compact cards with left-aligned icons for dense information
**File**: [`/src/components/cards/ThinIconCard.vue`](../src/components/cards/ThinIconCard.vue)
**Colors**: cyan, emerald

### InfoCard

**Purpose**: Wrapper cards with optional title and icon for grouped content
**File**: [`/src/components/cards/InfoCard.vue`](../src/components/cards/InfoCard.vue)
**Variants**: default, tight

### TestimonialCard

**Purpose**: Client testimonials with decorative quote mark and author info
**File**: [`/src/components/cards/TestimonialCard.vue`](../src/components/cards/TestimonialCard.vue)
**Colors**: cyan, emerald

### PortfolioItem

**Purpose**: Portfolio work items with logo, description, and external link
**File**: [`/src/components/cards/PortfolioItem.vue`](../src/components/cards/PortfolioItem.vue)
**Colors**: cyan, emerald

### AttributionCard

**Purpose**: Image attribution cards for photographer credits
**File**: [`/src/components/cards/AttributionCard.vue`](../src/components/cards/AttributionCard.vue)

---

## UI Components

### Panel Components

#### PanelSidebar

**Purpose**: Fixed sidebar panel for service/tech detail navigation
**File**: [`/src/components/ui/PanelSidebar.vue`](../src/components/ui/PanelSidebar.vue)
**Colors**: cyan, emerald

#### PanelContent

**Purpose**: Responsive content panel for displaying selected section details (works on both mobile and desktop)
**File**: [`/src/components/ui/PanelContent.vue`](../src/components/ui/PanelContent.vue)
**Colors**: cyan, emerald
**Header Styles**: decorative, simple
**Note**: Handles both mobile (full-screen) and desktop (side panel) layouts with single component

### Section Components

#### SectionClickable

**Purpose**: Numbered section buttons with badges and hover states
**File**: [`/src/components/ui/SectionClickable.vue`](../src/components/ui/SectionClickable.vue)
**Colors**: cyan, emerald

#### SectionHeader

**Purpose**: Section titles with SVG icons
**File**: [`/src/components/ui/SectionHeader.vue`](../src/components/ui/SectionHeader.vue)
**Colors**: cyan, emerald

### Utility UI

#### SelectableItem

**Purpose**: Selectable list items with hover and active states
**File**: [`/src/components/ui/SelectableItem.vue`](../src/components/ui/SelectableItem.vue)
**Colors**: cyan, emerald

#### ComponentShowcaseSection

**Purpose**: Section wrapper for organizing component examples
**File**: [`/src/components/ui/ComponentShowcaseSection.vue`](../src/components/ui/ComponentShowcaseSection.vue)

---

## Display Components

### Timeline

**Purpose**: Vertical timeline with connecting line for sequential steps
**File**: [`/src/components/display/Timeline.vue`](../src/components/display/Timeline.vue)

---

## Layout Components

### Navigation

**Purpose**: Global site navigation with mobile menu
**File**: [`/src/components/layout/Navigation.vue`](../src/components/layout/Navigation.vue)
**Features**:

- Dynamic color theming: Logo and "Hire Me" button switch from cyan (business) to emerald (technical) on Tech/Components/Attributions pages
- Contextual navigation: Shows "</>" button on Services pages, "Back to business" button on Tech/Components/Attributions pages
- Uses OutlineButton component for all navigation buttons

### Footer

**Purpose**: Site footer with social links, navigation, and copyright
**File**: [`/src/components/layout/Footer.vue`](../src/components/layout/Footer.vue)

---

## Theme Components

**See [THEMES.md](./THEMES.md) for complete documentation on the theme system.**

Theme components provide custom layouts for service/tech detail pages. Each section can specify a `"theme"` property to use a different layout.

### DefaultTheme

**Purpose**: Standard detail layout with stats, benefits, visuals, and CTA
**File**: [`/src/components/themes/DefaultTheme.vue`](../src/components/themes/DefaultTheme.vue)

### OverviewTheme

**Purpose**: Data-driven overview layout for introduction sections
**File**: [`/src/components/themes/OverviewTheme.vue`](../src/components/themes/OverviewTheme.vue)

### ProcessTheme

**Purpose**: Workflow visualization theme with multiple style variants
**File**: [`/src/components/themes/ProcessTheme.vue`](../src/components/themes/ProcessTheme.vue)
**Style Variants**: boxed, boxed-inline, timeline

### OptionsTheme

**Purpose**: Side-by-side option cards for presenting multiple choices
**File**: [`/src/components/themes/OptionsTheme.vue`](../src/components/themes/OptionsTheme.vue)

### TechTheme

**Purpose**: Default theme for technical/experience content display
**File**: [`/src/components/themes/TechTheme.vue`](../src/components/themes/TechTheme.vue)

---

## Quick Reference

### Component Count by Folder

| Folder                   | Count  | Components                                                                                                    |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------- |
| **elements/buttons**     | 4      | PrimaryButton, SecondaryButton, OutlineButton, IconButton                                                     |
| **elements/badges**      | 2      | Badge, IconBadge                                                                                              |
| **elements/interactive** | 1      | TypewriterText                                                                                                |
| **elements** (misc)      | 4      | CheckItem, ContactInfoItem, SocialIcon, LoadingSpinner                                                        |
| **cards**                | 7      | ServiceCard, IconCard, ThinIconCard, InfoCard, TestimonialCard, PortfolioItem, AttributionCard                |
| **ui**                   | 5      | PanelSidebar, PanelContent, SectionClickable, SectionHeader, SelectableItem, ComponentShowcaseSection         |
| **display**              | 1      | Timeline                                                                                                      |
| **layout**               | 2      | Navigation, Footer                                                                                            |
| **themes**               | 5      | DefaultTheme, OverviewTheme, ProcessTheme, OptionsTheme, TechTheme                                            |
| **Total**                | **31** |                                                                                                               |

---

## Finding Component Props

All components use TypeScript interfaces with JSDoc comments. To see available props:

1. **In VS Code**: Hover over the component in your template
2. **In Component File**: Look at the interface definition at the top of the `<script>` section
3. **TypeScript Autocomplete**: Start typing props and see suggestions

**Example from PrimaryButton.vue:**

```typescript
interface Props {
  /** Show arrow icon on desktop (default: true) */
  showArrow?: boolean
  /** Full width on mobile, auto on desktop (default: true) */
  responsive?: boolean
  /** Disabled state */
  disabled?: boolean
}
```

---

## Related Documentation

- **[COMPONENT-RULES.md](./COMPONENT-RULES.md)** - ⚠️ Mandatory component creation rules
- **[THEMES.md](./THEMES.md)** - Service/tech detail theme system guide
- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Design patterns and styling guidelines
- **[RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md)** - Responsive breakpoints and strategies
- **[CLAUDE.md](../CLAUDE.md)** - Project overview and development guidelines
