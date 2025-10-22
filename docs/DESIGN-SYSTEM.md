# Design System Documentation

This document outlines the foundational design decisions for idevelop.tech. For component implementation details, see the **[Component Library](/components)**.

## Color Palette

### Primary Colors
- **Cyan**: `#06b6d4` (cyan-500), `#22d3ee` (cyan-400), `#67e8f9` (cyan-300)
- **Purple**: `#a855f7` (purple-500), `#c084fc` (purple-400), `#d8b4fe` (purple-300)
- **Teal**: `#14b8a6` (teal-500), `#2dd4bf` (teal-400) - Used for experience pages
- **Background**: `#0a0a0a` (primary bg), `#0f0f0f` (card bg), `#1a1a1a` (elevated bg)
- **Text**: `#ffffff` (white), `#9ca3af` (gray-400), `#6b7280` (gray-500)

### Gradient Patterns
- **Primary Gradient**: `from-cyan-400 via-cyan-300 to-purple-400`
- **Background Gradient**: `from-cyan-500/10 via-purple-500/10 to-cyan-500/10`
- **Button Gradient**: `from-cyan-500 to-purple-500`
- **Border Gradient**: `border-cyan-500/30` with hover `border-cyan-400/50`

**View live examples**: [Component Library - Colors](/components)

## Typography

### Font Sizes (Responsive)

#### Mobile → Tablet → Desktop Pattern
The site uses a progressive scaling system:

**Headers:**
- H1 Main: `text-3xl md:text-4xl` (30px → 36px)
- H2 Service Title: `text-lg md:text-xl` (18px → 20px)
- H3 CTA: `text-xl md:text-2xl lg:text-3xl` (20px → 24px → 30px)

**Body Text:**
- Service Tagline: `text-xs md:text-sm` (12px → 14px)
- Description: `text-xs md:text-sm lg:text-base` (12px → 14px → 16px)

**Micro Text (Stat Boxes):**
- Value: `text-[13px] md:text-[15px] lg:text-[19px]` (13px → 15px → 19px)
- Label: `text-[6px] sm:text-[8px] md:text-[7px] lg:text-[9px]` (6px → 8px → 7px → 9px)
  - Note: Labels use lowercase on mobile (`md:uppercase`) to save space

### Font Weights
- **Headings**: `font-bold` (700)
- **Buttons/CTAs**: `font-semibold` (600)
- **Body**: Regular (400)

### Line Heights & Tracking
- Headers: `leading-tight` with `tracking-tight`
- Body: `leading-relaxed`
- Stat Labels (mobile): `leading-[0.65rem]` with `tracking-tighter`
- Stat Labels (desktop): `leading-tight` with `tracking-wide`

**View live examples**: [Component Library - Typography](/components)

## Spacing System

### Container Widths
- **Max Content Width**: `max-w-[1200px]`
- **Modal/Panel Width**: Fixed pixel-based sizing for consistency
- **Left Panel**: `w-96` (384px)

### Padding & Margins
**Card Padding:**
- Mobile: `p-4` (16px)
- Tablet: `p-6` (24px)

**Stat Box Padding:**
- Mobile: `p-1` (4px)
- Tablet: `p-2` (8px)
- Desktop: `p-3` (12px)

**CTA Section:**
- Mobile: `p-6` (24px)
- Tablet: `p-8` (32px)
- Desktop: `p-12` (48px)

### Grid Gaps
- Service Cards: `gap-6` (24px)
- Stat Boxes: `gap-1 md:gap-2` (4px → 8px)
- Tags: `gap-1 md:gap-1.5` (4px → 6px)

**View live examples**: [Component Library - Spacing](/components)

## Components

All component implementation details, code examples, and patterns have been moved to the **[Component Library](/components)**.

### Available Components

**Design Foundation:**
- Color Palette
- Typography
- Spacing System

**Interactive Components:**
- TypewriterText
- Gradient Text
- CTA Buttons
- Button Variants
- Button Groups

**Data Display:**
- Stat Boxes
- Tag Pills
- Badge Grid
- Icon Badges
- Icon Lists

**Layout Patterns:**
- Card Variants (Service & Experience)
- Side Panel Page Layout

**Content Elements:**
- Section Headings
- Intro Box
- Border Accent Boxes
- Decorative Blurs
- Navigation
- Custom Scrollbar

## Responsive Breakpoints

### Tailwind Defaults Used
- `sm`: 640px
- `md`: 768px (primary tablet breakpoint)
- `lg`: 1024px (desktop breakpoint)

### Mobile-First Approach
All base styles are mobile (320px), then progressively enhanced:
1. **320px - 639px**: Base mobile styles
2. **640px - 767px**: Small tablets (`sm:`)
3. **768px - 1023px**: Tablets (`md:`)
4. **1024px+**: Desktop (`lg:`)

### Critical Breakpoints
- **320px**: Minimum supported width - ultra-compact layouts
- **425px**: Small mobile - slightly relaxed sizing
- **768px**: Tablet - medium-sized text and spacing
- **1024px**: Desktop - full-featured layout with modals

**Detailed responsive patterns**: [RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md)

## Design Decisions by Screen Size

### Mobile (≤767px)
- Stack all layouts vertically
- Full-width buttons
- Minimal padding to maximize content area
- Smallest font sizes to prevent text overflow
- Hide non-essential icons and decorations
- Typewriter text stacks below static text

### Tablet (768px - 1023px)
- 2-column service card grid
- Medium font sizes to balance readability and space
- Moderate padding
- Stat boxes with reduced padding to prevent wrapping
- CTA section with reduced heading sizes

### Desktop (≥1024px)
- 2-column service card grid (maintained)
- Full decorative elements visible
- Maximum font sizes for readability
- Service detail panels slide in from right
- Background scroll locked when modal open (via `scrollBehavior` in router)

## Animation & Transitions

### Standard Transitions
- **Duration**: `duration-300` for most interactions
- **Easing**: Default ease
- **Hero Images**: `duration-500` for slower, smoother effects

### Scroll Behavior
- **Router scrollBehavior**: Prevents scroll on same-route navigation (query params)
- **No overflow toggling**: Maintains scroll position naturally
- **Section transitions**: Smooth scroll within content panels

### Hover Effects
- Scale transforms: `group-hover:scale-105`
- Shadow intensification: `group-hover:shadow-lg group-hover:shadow-cyan-500/50`
- Gradient text reveals
- Border color brightening
- Arrow translations: `group-hover:translate-x-1`

## Accessibility Considerations

### Color Contrast
- All text meets WCAG AA standards
- Gradient text used on dark backgrounds only
- Border colors provide sufficient contrast

### Interactive Elements
- All clickable elements have hover states
- Focus states follow hover patterns
- Sufficient padding for touch targets (minimum 44px height on mobile)

### Responsive Text
- Minimum font size: 6px (only for non-critical stat labels)
- Body text minimum: 12px
- Line height adjusted for readability at all sizes

## Best Practices

### When to Use Custom Pixel Sizes
- Stat boxes and micro-text where Tailwind defaults don't work
- Specific breakpoint needs (e.g., 320px ultra-mobile)
- Fine-tuning visual balance

### When to Use Tailwind Defaults
- Standard body text and headings
- Padding and margin (use spacing scale)
- Common breakpoints

### Component Reusability
- Extract repeated patterns into components
- Use props for customization
- Document in the Component Library
- Provide sensible defaults

### Performance
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Lazy load images with proper placeholders
- Minimize layout shifts during loading
- Use `transition-all` sparingly (only on small elements)

---

## Quick Reference

**Need component code?** → [Component Library](/components)
**Need responsive patterns?** → [RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md)
**Need component docs?** → [COMPONENTS.md](./COMPONENTS.md)
**Need architecture info?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
