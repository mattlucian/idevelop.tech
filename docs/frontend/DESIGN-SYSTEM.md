# Design System Documentation

Foundational design decisions for idevelop.tech: color palette, typography, spacing, responsive patterns, and component guidelines.

## Color Palette

### Primary Colors

- **Cyan**: `#06b6d4` (cyan-500), `#22d3ee` (cyan-400), `#67e8f9` (cyan-300) - Services/business theme
- **Purple**: `#a855f7` (purple-500), `#c084fc` (purple-400), `#d8b4fe` (purple-300)
- **Emerald**: `#10b981` (emerald-500), `#34d399` (emerald-400), `#6ee7b7` (emerald-300) - Tech/experience theme
- **Background**: `#0a0a0a` (primary bg), `#0f0f0f` (card bg), `#1a1a1a` (elevated bg)
- **Slate**: Secondary backgrounds and borders (`slate-700`, `slate-800`, `slate-900`)
- **Text**: `#ffffff` (white), `#94a3b8` (slate-400), `#64748b` (slate-500)

### Color Theme Strategy

**Dual color scheme** that switches contextually:

- **Services/Business Pages** (Home, Services, Hire Me): Cyan/purple theme
- **Tech/Experience Pages** (Tech domain pages): Emerald green theme
- **Dynamic Elements**: Components accept `colorScheme` or `color` props to support dual theming

### Gradient Patterns

- **Primary Gradient**: `from-cyan-400 via-cyan-300 to-purple-400`
- **Background Gradient**: `from-cyan-500/10 via-purple-500/10 to-cyan-500/10`
- **Secondary Gradient**: `from-slate-800/40 to-slate-900/40`
- **Button Gradient**: `from-cyan-500 to-purple-500`
- **Border Colors**: `border-cyan-500/30`, `border-slate-700/30`

### Icon System

**Primary Icon Library**: Heroicons from @heroicons/vue/24/outline (MIT-licensed by Tailwind Labs)

**Icon Colors:**
- Cyan Theme: `text-cyan-400` (services/business)
- Emerald Theme: `text-emerald-400` (tech/experience)
- Purple Theme: `text-purple-400` (secondary accents)
- Slate Theme: `text-slate-400` (neutral elements)
- White: `text-white` (high contrast)

**Icon Sizing:** Scales from 16px (w-4 h-4) to 96px (w-24 h-24) using Tailwind utilities

**Icon Usage:** Centralized icon mapping system (`src/utils/iconMapping.ts`). Data files reference icons by name string.

**See ARCHITECTURE.md for complete implementation details.**

---

## Typography

### Font Sizes

**Mobile-first responsive scaling** - Base styles target mobile (320px+), progressively enhance for larger screens.

**Page Headers:**
- H1 Hero: `text-4xl md:text-5xl lg:text-6xl`
- H1 Main: `text-3xl md:text-4xl`
- H2 Section: `text-3xl md:text-4xl`
- H2 CTA: `text-2xl md:text-3xl`
- H3 Service Title: `text-lg md:text-xl`

**Body Text:**
- Large Body: `text-lg md:text-xl`
- Base Body: `text-sm md:text-base`
- Small Text: `text-xs md:text-sm`
- Caption: `text-xs`

**Section Labels:** `text-sm` with `uppercase tracking-wider`

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

---

## Spacing System

### Container Widths

- **Max Content Width**: `max-w-5xl` (1024px) - Service pages
- **Home Content Width**: `max-w-[1200px]` - Homepage grid
- **Text Content Width**: `max-w-3xl` (768px) - Readable text blocks
- **Side Content**: `w-full md:w-[340px] lg:w-[400px]` - Sidebar/sticky content

### Padding & Margins

**Section Padding:**
- Vertical: `py-8` or `py-16` (32px or 64px)
- Horizontal: `px-6` (24px) - Consistent across all sections

**Card Padding:**
- Standard Cards: `p-6 md:p-8 lg:p-12`
- Small Cards: `p-4 md:p-6`
- Compact Cards: `p-6`

**Page Layout:**
- Top Padding: `pt-16` or `pt-20` (accounts for fixed navigation)
- Section Spacing: `mb-12` or `mb-16` (between major sections)

### Grid Gaps

- Service Cards Grid: `gap-6` (24px)
- Benefits Grid: `gap-8` (32px)
- Portfolio Items: `space-y-4` (16px vertical)
- Tab Buttons: `gap-2` (8px)
- Form Elements: `gap-4` (16px)

---

## Responsive Design

### Breakpoints

**Tailwind's default breakpoints** with mobile-first approach:

- **Base (0-639px)**: Mobile devices (320px minimum)
- **md: 768px**: Tablets (primary responsive breakpoint)
- **lg: 1024px**: Desktop and tablet landscape
- **xl: 1280px**: Large desktop (rarely used)

### Mobile-First Philosophy

All base styles target 320px mobile screens, then progressively enhance for larger devices.

**Key Principle**: Make it work on the smallest screen first, then add features for larger screens.

### Responsive Patterns

**Grid Layouts:** Single column → multi-column
**Typography:** Smaller sizes → larger sizes
**Spacing:** Reduced padding → increased padding
**Visibility:** Hide decorative elements on mobile, show on desktop
**Sticky positioning:** Only on desktop (`md:sticky md:top-24`)

**Testing:** Always test at 320px (mobile), 768px (tablet), 1024px (desktop)

---

## Animation & Transitions

### Transition Standards

- **Duration**: `duration-300` for most interactions
- **Easing**: Tailwind defaults (`ease-in-out`, `ease-out`)
- **Properties**: Prefer `transform` and `opacity` for GPU-accelerated animations

### Common Effects

**Hover States:**
- Scale: `hover:scale-105` (subtle increase)
- Border: `hover:border-cyan-400/50` (color brightening)
- Slide: `group-hover:translate-x-1` (arrows/icons)
- Glow: `hover:shadow-lg hover:shadow-cyan-500/50`

**Performance:** Use `transform` and `opacity` (GPU-accelerated). Avoid `transition-all` except on small elements.

---

## Accessibility

### Color Contrast

- All text meets WCAG AA standards minimum
- Gradient text only on dark backgrounds with sufficient contrast
- Border colors provide visual distinction without relying solely on color

### Interactive Elements

- All clickable elements have visible hover and focus states
- Focus states follow hover patterns for consistency
- Minimum touch target: 44px height on mobile
- Keyboard navigation supported for all interactive elements

### Typography

- Body text minimum: 12px for readability
- Line heights optimized for readability across all sizes
- Sufficient color contrast between text and background

---

## Best Practices

### Styling Guidelines

**Use Tailwind Utilities:**
- Prefer Tailwind classes over custom CSS
- Use established color palette (cyan/purple/emerald/slate)
- Follow responsive patterns documented above

**Component Patterns:**
- Extract repeated UI patterns into reusable components (2-3 Pattern Rule in COMPONENT-RULES.md)
- Support dual color scheme via `colorScheme` or `color` props
- Provide sensible defaults for all props

**Responsive Design:**
- Always start with mobile layout (320px)
- Test at critical breakpoints (320px, 768px, 1024px)
- Use progressive enhancement (base → enhanced styles)
- Avoid fixed widths that break at smaller sizes

### Performance

- Use `transform` and `opacity` for smooth animations
- Minimize layout shifts during page load
- Use appropriate image sizes for different screen sizes
- Lazy load off-screen content when appropriate

---

## Quick Reference

- **Component Creation Rules**: [COMPONENT-RULES.md](./COMPONENT-RULES.md)
- **Data Structure Types**: [DATA-STRUCTURE.md](./DATA-STRUCTURE.md)
- **Architecture Details**: [ARCHITECTURE.md](./ARCHITECTURE.md)
