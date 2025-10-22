# Responsive Design Documentation

This document details all responsive design decisions, breakpoints, and mobile-first strategies implemented in idevelop.tech.

## Philosophy

**Mobile-First Approach:** All base styles target 320px mobile screens, then progressively enhance for larger devices.

**Key Principle:** Make it work perfectly on the smallest screen first, then add features and increase sizes for larger screens.

## Breakpoints

### Tailwind Breakpoints Used
```css
/* Base (mobile-first): 0px - 639px */
/* sm: 640px and up */
/* md: 768px and up (primary tablet) */
/* lg: 1024px and up (desktop) */
/* xl: 1280px and up (not used yet) */
```

### Critical Widths
- **320px**: Absolute minimum (iPhone SE, small Android)
- **375px**: iPhone standard size
- **425px**: Large mobile devices
- **768px**: Tablet portrait (iPad)
- **1024px**: Desktop / Tablet landscape

## Responsive Patterns

### Typography Scaling

**Pattern: Mobile → Tablet → Desktop**

```vue
<!-- Headers -->
<h1 class="text-3xl md:text-4xl">
  <!-- 30px → 36px -->
</h1>

<h2 class="text-xl md:text-2xl lg:text-3xl">
  <!-- 20px → 24px → 30px -->
</h2>

<h3 class="text-lg md:text-xl">
  <!-- 18px → 20px -->
</h3>

<!-- Body Text -->
<p class="text-sm md:text-base">
  <!-- 14px → 16px -->
</p>

<p class="text-xs md:text-sm lg:text-base">
  <!-- 12px → 14px → 16px -->
</p>

<!-- Micro Text (Stat Boxes) -->
<div class="text-[6px] sm:text-[8px] md:text-[7px] lg:text-[9px]">
  <!-- 6px → 8px → 7px → 9px -->
  <!-- Note: Dip at md: because tablet has less space than sm: landscape mobile -->
</div>
```

### Spacing Scaling

```vue
<!-- Padding -->
<div class="p-4 md:p-6">              <!-- 16px → 24px -->
<div class="p-1 md:p-2 lg:p-3">       <!-- 4px → 8px → 12px -->
<div class="p-6 md:p-8 lg:p-12">      <!-- 24px → 32px → 48px (CTA) -->

<!-- Gaps -->
<div class="gap-1 md:gap-2">          <!-- 4px → 8px -->
<div class="gap-6">                   <!-- 24px (consistent) -->

<!-- Margins -->
<div class="mb-3 md:mb-4">            <!-- 12px → 16px -->
<div class="mb-2 md:mb-3 lg:mb-4">    <!-- 8px → 12px → 16px -->
```

### Layout Transformations

#### Service Cards Grid
```vue
<!-- Mobile: Single column -->
<!-- Tablet/Desktop: 2 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
```

#### Typewriter Text Section
```vue
<!-- Mobile: Stacked vertically -->
<!-- Tablet+: Side by side -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1.5">
  <span class="text-center sm:text-right">Get expert help with</span>
  <TypewriterText class="text-center sm:text-left" />
</div>
```

#### Stat Boxes
```vue
<!-- Always 3 columns, but padding/sizing adjusts -->
<div class="grid grid-cols-3 gap-1 md:gap-2">
  <div class="p-1 md:p-2 lg:p-3">
    <!-- Content scales responsively -->
  </div>
</div>
```

#### CTA Buttons
```vue
<!-- Mobile: Full width -->
<!-- Desktop: Auto width (content-sized) -->
<div class="inline-block w-full md:w-auto">
  <div class="flex items-center justify-center">
    <span>Button Text</span>
    <svg class="hidden md:inline">Arrow</svg>
  </div>
</div>
```

## Mobile Optimizations (≤767px)

### Text Optimizations
1. **Lowercase Labels**: Stat box labels use lowercase on mobile to save horizontal space
   ```vue
   <div class="md:uppercase">label text</div>
   ```

2. **Ultra-Small Fonts**: Stat labels as small as 6px to prevent overflow at 320px
   ```vue
   <div class="text-[6px] sm:text-[8px]">
   ```

3. **Aggressive Tracking**: Tightest letter-spacing on small text
   ```vue
   <div class="tracking-tighter md:tracking-wide">
   ```

4. **Reduced Line Height**: Custom line heights for compact mobile text
   ```vue
   <div class="leading-[0.65rem] md:leading-tight">
   ```

### Layout Optimizations
1. **Minimal Padding**: Reduce all padding to maximize content area
   ```vue
   <div class="p-1 md:p-3">
   ```

2. **Tighter Gaps**: Reduce gaps between elements
   ```vue
   <div class="gap-1 md:gap-2">
   ```

3. **Full-Width Elements**: Buttons and inputs span full width
   ```vue
   <div class="w-full md:w-auto">
   ```

4. **Hidden Decorations**: Remove non-essential icons and graphics
   ```vue
   <svg class="hidden md:inline">
   ```

5. **Stacked Layouts**: Convert side-by-side to vertical
   ```vue
   <div class="grid grid-cols-1 sm:grid-cols-2">
   ```

### Header Optimizations
1. **Line Breaks**: Force multi-line on mobile to keep phrases together
   ```vue
   <h1>
     Complex Problems.<br class="sm:hidden" />
     Simple Solutions.
   </h1>
   ```

2. **Responsive Text Width**: Prevent edge overflow
   ```vue
   <div class="max-w-[95%] sm:max-w-xl">
   ```

3. **Horizontal Padding**: Add breathing room
   ```vue
   <div class="px-2 sm:px-0">
   ```

## Tablet Optimizations (768px - 1023px)

### The "Tablet Squeeze"
Tablets have a unique challenge: they're not as wide as desktop but try to show more than mobile. This requires specific attention.

### Font Size Strategy
```vue
<!-- Often tablet uses smaller size than both mobile and desktop -->
<div class="text-[8px] md:text-[7px] lg:text-[9px]">
  <!-- Dip at md: because 2-column layout creates less space per card -->
</div>

<!-- But body text grows progressively -->
<p class="text-xs md:text-sm lg:text-base">
  <!-- 12px → 14px → 16px -->
</p>
```

### Specific Tablet Adjustments
1. **Service Titles**: Reduced from 2xl to xl
   ```vue
   <h3 class="text-lg md:text-xl">
   ```

2. **CTA Headings**: Moderate size increase
   ```vue
   <h2 class="text-xl md:text-2xl lg:text-3xl">
   ```

3. **Stat Box Values**: Careful scaling to prevent wrap
   ```vue
   <div class="text-[13px] md:text-[15px] lg:text-[19px]">
   ```

## Desktop Optimizations (≥1024px)

### Enhanced Features
1. **Side Panels**: Service details slide in from right instead of full-screen
2. **Hover States**: Rich hover effects with transforms and gradients
3. **Scroll Lock**: Background content locked when modal open
4. **Decorative Elements**: Full blur effects and animations visible
5. **Icons Always Visible**: No hiding of supplementary graphics

### Modal/Panel Behavior
```vue
<!-- Desktop uses fixed positioning without changing overflow -->
<div class="min-h-screen bg-[#0a0a0a] overflow-auto">
  <!-- Never changes to overflow-hidden to preserve scroll -->
</div>
```

**Critical Decision:** Do NOT toggle `overflow-hidden` on desktop when opening modals. This causes scroll position reset. Instead, let the overlay handle preventing interaction with background.

## Common Pitfalls & Solutions

### Problem: Text Overflow in Stat Boxes at 320px
**Solution:**
- Use custom pixel sizes (6-8px)
- Apply `break-words`
- Use `tracking-tighter`
- Lowercase on mobile
- Reduce padding to minimum

### Problem: Typewriter Text Hits Screen Edge
**Solution:**
- Use `max-w-[95%]` on mobile
- Add horizontal padding `px-2`
- Stack vertically on small screens
- Remove fixed `min-w` on mobile

### Problem: CTA Button Text Wraps to 3 Lines
**Solution:**
- Full-width button on mobile
- Smaller text size
- Hide icon on mobile
- Reduce padding

### Problem: Header Breaks Awkwardly
**Solution:**
- Use responsive `<br class="sm:hidden" />` to control breaks
- Keep related phrases together
- Test at multiple widths

### Problem: Scroll Jumps When Opening Modal
**Solution:**
- Do NOT toggle overflow classes
- Use router `scrollBehavior` to prevent scroll on same-route navigation
- Let natural overflow handle scroll preservation

## Testing Checklist

### Required Test Widths
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone standard)
- [ ] 425px (large mobile)
- [ ] 768px (tablet portrait)
- [ ] 1024px (desktop/tablet landscape)
- [ ] 1440px (desktop)

### What to Test at Each Width
- [ ] No horizontal scroll
- [ ] No text overflow
- [ ] All buttons accessible
- [ ] Proper line breaks
- [ ] Readable text sizes
- [ ] Appropriate padding/spacing
- [ ] Hover states work (desktop)
- [ ] Touch targets adequate (mobile)
- [ ] Images load and scale properly
- [ ] Animations smooth

### Browser DevTools Settings
```
Chrome DevTools → Toggle Device Toolbar (Cmd+Shift+M)
Common Presets:
- iPhone SE (375x667)
- iPhone 12 Pro (390x844)
- iPad (768x1024)
- iPad Pro (1024x1366)
- Responsive (drag to custom width)
```

## Performance Considerations

### Mobile-Specific Optimizations
1. **Image Sizes**: Use appropriately sized images for mobile
2. **Lazy Loading**: Defer off-screen content
3. **Reduced Animations**: Consider `prefers-reduced-motion`
4. **Touch Events**: Use `touchstart` where appropriate

### CSS Performance
1. **Transform Over Properties**: Use `transform` for animations (GPU-accelerated)
2. **Minimize Layout Shifts**: Size containers properly
3. **Contain Repaints**: Use `will-change` sparingly

## Future Improvements

### Potential Enhancements
- [ ] Intersection Observer for scroll animations
- [ ] Dynamic image loading based on viewport
- [ ] Service worker for offline support
- [ ] Skeleton loaders for better perceived performance
- [ ] Optimized font loading strategy
- [ ] Responsive images with `srcset`
- [ ] Container queries when better supported

### Accessibility Todos
- [ ] Skip links for keyboard navigation
- [ ] Focus trap in modals
- [ ] Announce dynamic content to screen readers
- [ ] Ensure all interactions keyboard-accessible
- [ ] Test with actual screen readers
- [ ] Add ARIA labels where needed
