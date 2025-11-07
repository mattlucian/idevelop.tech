# Design System Documentation

This document outlines the foundational design decisions for idevelop.tech, including color palette, typography, spacing, responsive design patterns, and component guidelines.

## Color Palette

### Primary Colors

- **Cyan**: `#06b6d4` (cyan-500), `#22d3ee` (cyan-400), `#67e8f9` (cyan-300) - Services/business theme
- **Purple**: `#a855f7` (purple-500), `#c084fc` (purple-400), `#d8b4fe` (purple-300)
- **Emerald**: `#10b981` (emerald-500), `#34d399` (emerald-400), `#6ee7b7` (emerald-300) - Tech/experience theme
- **Background**: `#0a0a0a` (primary bg), `#0f0f0f` (card bg), `#1a1a1a` (elevated bg)
- **Slate**: Used for secondary backgrounds and borders (`slate-700`, `slate-800`, `slate-900`)
- **Text**: `#ffffff` (white), `#94a3b8` (slate-400), `#64748b` (slate-500)

### Color Theme Strategy

The site uses a **dual color scheme** that switches contextually:

- **Services/Business Pages** (Home, Services, Hire Me): Cyan/purple theme
- **Tech/Experience Pages** (Tech domain pages): Emerald green theme
- **Dynamic Elements**: Components accept `colorScheme` or `color` props to support dual theming

### Gradient Patterns

- **Primary Gradient**: `from-cyan-400 via-cyan-300 to-purple-400`
- **Background Gradient**: `from-cyan-500/10 via-purple-500/10 to-cyan-500/10`
- **Secondary Gradient**: `from-slate-800/40 to-slate-900/40`
- **Button Gradient**: `from-cyan-500 to-purple-500`
- **Border Colors**: `border-cyan-500/30`, `border-slate-700/30`

### Icon Color Treatment

**Desaturation Filter**: `filter: saturate(0.3) brightness(1.05)`

Applied to emoji icons in IconFlowStep component to reduce color clash while preserving theme colors (cyan/emerald/purple). Retains 30% saturation for subtle color distinction.

## Typography

### Font Sizes

The site uses a **mobile-first responsive scaling** system. Base styles target mobile (320px+), progressively enhancing for larger screens.

**Page Headers:**

- H1 Hero: `text-4xl md:text-5xl lg:text-6xl` (36px → 48px → 60px)
- H1 Main: `text-3xl md:text-4xl` (30px → 36px)
- H2 Section: `text-3xl md:text-4xl` (30px → 36px)
- H2 CTA: `text-2xl md:text-3xl` (24px → 30px)
- H3 Service Title: `text-lg md:text-xl` (18px → 20px)

**Body Text:**

- Large Body: `text-lg md:text-xl` (18px → 20px)
- Base Body: `text-sm md:text-base` (14px → 16px)
- Small Text: `text-xs md:text-sm` (12px → 14px)
- Caption: `text-xs` (12px)

**Section Labels:**

- Uppercase Labels: `text-sm` with `uppercase tracking-wider` (14px)

### Font Weights

- **Headings**: `font-bold` (700)
- **Buttons/CTAs**: `font-semibold` (600)
- **Labels/Section Headers**: `font-semibold` (600)
- **Body**: Regular (400)

### Line Heights & Tracking

- **Hero Headers**: `leading-tight` (1.25)
- **Body Text**: `leading-relaxed` (1.625)
- **Headers**: `tracking-tight` (-0.025em)
- **Section Labels**: `tracking-wider` (0.05em)

## Spacing System

### Container Widths

- **Max Content Width**: `max-w-5xl` (1024px) - Used for service pages
- **Home Content Width**: `max-w-[1200px]` - Used for homepage grid
- **Text Content Width**: `max-w-3xl` (768px) - Used for readable text blocks
- **Side Content**: `w-full md:w-[340px] lg:w-[400px]` - Sidebar/sticky content

### Padding & Margins

**Section Padding:**

- Vertical: `py-8` or `py-16` (32px or 64px) depending on section importance
- Horizontal: `px-6` (24px) - Consistent across all sections

**Card Padding:**

- Standard Cards: `p-6 md:p-8 lg:p-12` (24px → 32px → 48px)
- Small Cards: `p-4 md:p-6` (16px → 24px)
- Compact Cards: `p-6` (24px)

**Page Layout:**

- Top Padding: `pt-16` or `pt-20` (64px or 80px) to account for fixed navigation
- Section Spacing: `mb-12` or `mb-16` (48px or 64px) between major sections

### Grid Gaps

- Service Cards Grid: `gap-6` (24px)
- Benefits Grid: `gap-8` (32px)
- Portfolio Items: `space-y-4` (16px vertical spacing)
- Tab Buttons: `gap-2` (8px)
- Form Elements: `gap-4` (16px)

## Responsive Design

### Breakpoints

The site uses **Tailwind's default breakpoints** with a mobile-first approach:

- **Base (0-639px)**: Mobile devices (320px minimum)
- **sm: 640px**: Small tablets and large mobiles
- **md: 768px**: Tablets (primary responsive breakpoint)
- **lg: 1024px**: Desktop and tablet landscape
- **xl: 1280px**: Large desktop (rarely used)

### Mobile-First Philosophy

All base styles target 320px mobile screens, then progressively enhance for larger devices.

**Key Principle**: Make it work perfectly on the smallest screen first, then add features and increase sizes for larger screens.

### Common Responsive Patterns

**Grid Layouts:**

```
grid grid-cols-1 sm:grid-cols-2          // Single column → 2 columns
grid grid-cols-1 md:grid-cols-3          // Single column → 3 columns
flex flex-col md:flex-row                // Vertical stack → horizontal row
```

**Typography Scaling:**

```
text-3xl md:text-4xl lg:text-5xl         // Progressive size increase
text-sm md:text-base                     // Small → base size
```

**Spacing Scaling:**

```
p-4 md:p-6 lg:p-8                        // Progressive padding increase
gap-4 md:gap-6                           // Progressive gap increase
px-6                                      // Consistent horizontal padding
```

**Visibility Controls:**

```
hidden md:block                          // Hide on mobile, show on tablet+
md:hidden                                // Show on mobile, hide on tablet+
```

### Screen Size Strategies

**Mobile (≤767px):**

- Single column layouts
- Full-width buttons and forms
- Reduced padding and spacing
- Simplified navigation
- Hide decorative elements
- Stack complex layouts vertically

**Tablet (768px - 1023px):**

- Multi-column grids (2-3 columns)
- Moderate font sizes
- Increased padding and spacing
- Enhanced navigation options
- Show some decorative elements

**Desktop (≥1024px):**

- Full grid layouts
- Maximum font sizes for readability
- Full padding and spacing
- Complex interactions enabled
- All decorative elements visible
- Sticky positioning for sidebars (`md:sticky md:top-24`)

### Testing Requirements

Always test layouts at these critical widths:

- **320px**: Minimum supported (iPhone SE)
- **375px**: Standard mobile (iPhone)
- **768px**: Tablet portrait (iPad)
- **1024px**: Desktop/tablet landscape
- **1440px**: Large desktop

## Animation & Transitions

### Transition Standards

- **Duration**: `duration-300` for most interactions, `duration-500` for hero images
- **Easing**: Tailwind defaults (`ease-in-out`, `ease-out`)
- **Properties**: Prefer `transform` and `opacity` for GPU-accelerated animations

### Common Effects

**Hover States:**

```
hover:scale-105                          // Subtle scale increase
hover:border-cyan-400/50                 // Border color brightening
group-hover:translate-x-1                // Slide arrows/icons
hover:shadow-lg hover:shadow-cyan-500/50 // Glow effect
```

**Focus States:**

Follow hover patterns for keyboard accessibility.

### Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid `transition-all` except on small, simple elements
- Minimize layout shifts during loading states

## Accessibility

### Color Contrast

- All text meets WCAG AA standards minimum
- Gradient text only used on dark backgrounds with sufficient contrast
- Border colors provide visual distinction without relying solely on color

### Interactive Elements

- All clickable elements have visible hover and focus states
- Focus states follow hover patterns for consistency
- Minimum touch target size: 44px height on mobile devices
- Keyboard navigation supported for all interactive elements

### Typography

- Body text minimum: 12px for readability
- Line heights optimized for readability across all sizes
- Sufficient color contrast between text and background

## Best Practices

### Styling Guidelines

**Use Tailwind Utilities:**

- Prefer Tailwind classes over custom CSS
- Use the established color palette (cyan/purple/emerald/slate)
- Follow the responsive patterns documented above

**Component Patterns:**

- Extract repeated UI patterns into reusable components (see 2-3 Pattern Rule in COMPONENT-RULES.md)
- Support dual color scheme via `colorScheme` or `color` props
- Provide sensible defaults for all props
- Document new components in COMPONENTS.md

**Responsive Design:**

- Always start with mobile layout (320px)
- Test at all critical breakpoints (320px, 375px, 768px, 1024px, 1440px)
- Use progressive enhancement (base styles → enhanced styles)
- Avoid fixed widths that break at smaller sizes

### Performance

- Use `transform` and `opacity` for smooth animations
- Minimize layout shifts during page load
- Use appropriate image sizes for different screen sizes
- Lazy load off-screen content when appropriate

---

## Quick Reference

- **Component Documentation**: [COMPONENTS.md](./COMPONENTS.md)
- **Component Creation Rules**: [COMPONENT-RULES.md](./COMPONENT-RULES.md)
- **Data Structure Types**: [DATA-STRUCTURE.md](./DATA-STRUCTURE.md)
- **Architecture Details**: [ARCHITECTURE.md](./ARCHITECTURE.md)
