# Lighthouse Optimization Plan

This document outlines the planned optimizations to improve Lighthouse scores based on CI audit results.

**Status**: Planning phase - optimizations will be implemented in a separate branch after merging Lighthouse CI + email improvements PR.

---

## 📊 Current Issues Identified

Based on Lighthouse CI reports, the following issues have been identified across all tested pages (Home, Hire Me, Tech):

### Performance Issues
- ❌ **Unsized images** - Images missing explicit width/height causing layout shift (CLS)
- ❌ **LCP lazy-loaded** - Largest Contentful Paint image is lazy-loaded (delays paint)
- ❌ **Responsive images** - Images not properly sized for different screen resolutions
- ⚠️ **Modern image formats** - Not using WebP/AVIF for better compression
- ⚠️ **Render-blocking resources** - CSS/JS blocking initial render
- ⚠️ **First Contentful Paint** - Slightly slow (~0.76-0.87 score)
- ⚠️ **Largest Contentful Paint** - Slightly slow (~0.89 score)
- ❌ **Preconnect missing** - No preconnect hints for external origins

### Accessibility Issues
- ❌ **Heading order** - Headings not in sequential order (h1 → h3 skips h2)
- ❌ **Link text** - Links with non-descriptive text ("learn more", "click here")
- ❌ **Color contrast** - Needs verification (showing null in tests, likely false positive)

### Security & Best Practices
- ❌ **CSP missing** - No Content Security Policy headers for XSS protection
- ❌ **Back/forward cache** - Page prevented from using bf-cache

### PWA Features (Missing)
- ❌ **Web app manifest** - No manifest.json for PWA installability
- ❌ **Service worker** - No service worker for offline support/caching
- ❌ **Maskable icon** - No adaptive icon for app installation
- ❌ **Splash screen** - No custom splash screen configured
- ❌ **Theme color** - No theme-color meta tag for address bar theming

---

## 🎯 Implementation Plan

### Phase 1: High-Value Quick Wins (Est: 30-60 min)

**Impact**: Immediate improvements to Core Web Vitals and accessibility

#### 1.1 Add Image Dimensions
**Issue**: Images without width/height cause Cumulative Layout Shift (CLS)

**Tasks**:
- [ ] Audit all `<img>` tags across all components
- [ ] Add explicit `width` and `height` attributes to each image
- [ ] Verify dimensions match actual image file dimensions
- [ ] Test for layout shift using Chrome DevTools

**Files to modify**:
- All Vue components with images
- Likely files: `HomeView.vue`, `HireMeView.vue`, `TechView.vue`, image-based components

**Example**:
```vue
<!-- Before -->
<img src="/hero.jpg" alt="Hero image" />

<!-- After -->
<img src="/hero.jpg" alt="Hero image" width="1920" height="1080" />
```

#### 1.2 Fix Heading Order
**Issue**: Skipping heading levels breaks semantic structure for screen readers

**Tasks**:
- [ ] Audit heading structure on each page (h1 → h2 → h3 must be sequential)
- [ ] Fix any skipped levels (no h1 → h3 without h2)
- [ ] Ensure only one h1 per page
- [ ] Verify with accessibility tree in DevTools

**Files to check**:
- All view components
- All card/section components with headings

#### 1.3 Remove Lazy Loading from Hero Images
**Issue**: Lazy-loading delays Largest Contentful Paint (LCP)

**Tasks**:
- [ ] Identify hero/above-the-fold images on each page
- [ ] Remove `loading="lazy"` from these images
- [ ] Keep lazy-loading for below-the-fold images
- [ ] Verify LCP improvement in Lighthouse

**Strategy**:
- Hero images (first visible): NO lazy loading
- Images below fold: YES lazy loading

#### 1.4 Fix Link Text
**Issue**: Non-descriptive link text harms accessibility and SEO

**Tasks**:
- [ ] Find all links with generic text ("learn more", "click here", "read more")
- [ ] Replace with descriptive text that explains destination
- [ ] Ensure link text makes sense out of context

**Examples**:
```vue
<!-- Before -->
<router-link to="/services/integration">Learn more</router-link>

<!-- After -->
<router-link to="/services/integration">Learn about Integration Services</router-link>
```

---

### Phase 2: Performance Optimization (Est: 1-2 hours)

**Impact**: Significant improvements to load time and perceived performance

#### 2.1 Convert Images to WebP
**Issue**: JPEG/PNG images are larger than necessary

**Tasks**:
- [ ] Audit all images in `packages/web/public/`
- [ ] Convert to WebP using Squoosh or ImageOptim
- [ ] Keep original as fallback for older browsers
- [ ] Update image references in components
- [ ] Reduce quality to 85-90% for optimal size/quality

**Tools**:
- Squoosh: https://squoosh.app/
- ImageOptim: https://imageoptim.com/
- CLI: `cwebp -q 85 input.jpg -o output.webp`

**Example**:
```vue
<picture>
  <source srcset="/hero.webp" type="image/webp" />
  <img src="/hero.jpg" alt="Hero image" width="1920" height="1080" />
</picture>
```

#### 2.2 Generate Responsive Images
**Issue**: Serving full-size images to mobile devices wastes bandwidth

**Tasks**:
- [ ] Identify images that need responsive versions
- [ ] Generate multiple sizes (e.g., 320w, 640w, 1024w, 1920w)
- [ ] Add `srcset` and `sizes` attributes
- [ ] Test on different viewport sizes

**Example**:
```vue
<img
  src="/hero-1024.webp"
  srcset="
    /hero-320.webp 320w,
    /hero-640.webp 640w,
    /hero-1024.webp 1024w,
    /hero-1920.webp 1920w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Hero image"
  width="1920"
  height="1080"
/>
```

#### 2.3 Preload LCP Images
**Issue**: Browser discovers hero images late in page load

**Tasks**:
- [ ] Identify LCP image for each page
- [ ] Add `<link rel="preload">` in head for each page's hero image
- [ ] Use route-specific preloads in Vue Router
- [ ] Verify earlier LCP timing

**Implementation**:
```vue
<!-- In each view component's <script setup> -->
<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/hero.webp',
      type: 'image/webp'
    }
  ]
})
</script>
```

#### 2.4 Add Preconnect Hints
**Issue**: Browser doesn't establish connections to external origins early

**Tasks**:
- [ ] Identify external origins used (Google Fonts, reCAPTCHA, etc.)
- [ ] Add `<link rel="preconnect">` in `index.html`
- [ ] Add `<link rel="dns-prefetch">` as fallback
- [ ] Verify earlier connection establishment

**Add to `packages/web/index.html`**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://www.google.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

---

### Phase 3: Security & Advanced (Est: 1 hour)

**Impact**: Better security posture and advanced performance features

#### 3.1 Add Content Security Policy
**Issue**: No CSP headers to prevent XSS attacks

**Tasks**:
- [ ] Define CSP policy for the application
- [ ] Test policy in report-only mode first
- [ ] Add CSP headers in CloudFront response headers
- [ ] Verify no blocked resources

**Recommended CSP** (start strict, relax as needed):
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self';
  frame-src https://www.google.com;
```

**Implementation location**: CloudFront custom response headers or Lambda@Edge

#### 3.2 Investigate Back/Forward Cache
**Issue**: Pages can't use back/forward cache (bf-cache)

**Common causes**:
- `unload` event listeners
- `beforeunload` event listeners
- `Cache-Control: no-store` headers
- Open connections (IndexedDB, WebSockets)

**Tasks**:
- [ ] Check for unload/beforeunload listeners
- [ ] Audit cache headers
- [ ] Test bf-cache with Chrome DevTools
- [ ] Remove/refactor blocking patterns

**Testing**:
```javascript
// In DevTools Console after navigating back
window.performance.getEntriesByType('navigation')[0].type
// Should be 'back_forward' if cache is working
```

---

### Phase 4: PWA Features (Est: 2-3 hours)

**Impact**: App-like experience, offline support, home screen installation

#### 4.1 Create Web App Manifest
**Issue**: No manifest.json for PWA features

**Tasks**:
- [ ] Create `packages/web/public/manifest.json`
- [ ] Add manifest link to `index.html`
- [ ] Configure name, icons, theme colors, display mode
- [ ] Test manifest in DevTools Application panel

**Create `packages/web/public/manifest.json`**:
```json
{
  "name": "I Develop Tech - Professional Software Development",
  "short_name": "I Develop Tech",
  "description": "Portfolio and services for professional software development, integration, and consulting",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#06b6d4",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["business", "productivity"],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**Add to `packages/web/index.html`**:
```html
<link rel="manifest" href="/manifest.json" />
```

#### 4.2 Create Maskable Icon
**Issue**: No adaptive icon for modern app installations

**Tasks**:
- [ ] Design maskable icon with safe zone
- [ ] Use Maskable.app to test icon
- [ ] Generate 512x512 maskable PNG
- [ ] Add to manifest with `"purpose": "maskable"`

**Resources**:
- Maskable.app: https://maskable.app/
- Safe zone: Center content in 80% of canvas, outer 10% may be cropped

#### 4.3 Configure Theme Color
**Issue**: No theme-color for mobile address bar theming

**Tasks**:
- [ ] Choose theme color matching brand (cyan: #06b6d4)
- [ ] Add meta tag to `index.html`
- [ ] Test on mobile devices

**Add to `packages/web/index.html`**:
```html
<meta name="theme-color" content="#06b6d4" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

#### 4.4 Implement Service Worker
**Issue**: No offline support or advanced caching

**Strategy**: Use Vite PWA plugin for automatic service worker generation

**Tasks**:
- [ ] Install `vite-plugin-pwa`
- [ ] Configure caching strategy
- [ ] Test offline functionality
- [ ] Add update notification UI

**Install**:
```bash
npm install -D vite-plugin-pwa
```

**Configure in `packages/web/vite.config.ts`**:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: false, // Use existing manifest.json
      devOptions: {
        enabled: true
      }
    })
  ]
})
```

**Add update notification in `App.vue`**:
```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

onMounted(() => {
  if (needRefresh.value) {
    // Show update notification
    console.log('New version available!')
  }
})
</script>
```

---

## 📈 Expected Improvements

### Performance
- **LCP**: Improve from ~2.6s to <2.0s (target: <2.5s)
- **CLS**: Reduce to near 0 (target: <0.1)
- **FCP**: Improve from ~1.9s to <1.5s (target: <1.8s)
- **Overall Performance**: 82% → 90%+ (CI environment)

### Accessibility
- **Score**: 95%+ with proper heading structure and link text
- **Screen reader experience**: Significantly improved

### SEO
- **Score**: Maintain 90%+ with better semantic structure
- **Link text**: Better crawlability and user understanding

### Best Practices
- **Score**: 90%+ with CSP headers
- **Security**: Protected against XSS attacks

### PWA
- **Installability**: Full PWA support for home screen installation
- **Offline**: Basic offline functionality for static content
- **Experience**: Native app-like experience

---

## 🧪 Testing Strategy

### Manual Testing
1. **Performance**: Chrome DevTools Performance panel, measure Core Web Vitals
2. **Images**: Visual regression testing at different viewport sizes
3. **Accessibility**: Screen reader testing (NVDA, VoiceOver)
4. **PWA**: Test installation on mobile and desktop
5. **Offline**: Disconnect network, test cached resources

### Automated Testing
1. **Lighthouse CI**: Verify improvements in CI
2. **Type checking**: Ensure no TypeScript errors
3. **Build**: Verify production build succeeds
4. **Visual**: Take screenshots for before/after comparison

### Browser Testing
- Chrome (desktop & mobile)
- Safari (desktop & iOS)
- Firefox (desktop & mobile)
- Edge (desktop)

---

## 📦 Implementation Branches

**Branch Strategy**:
1. Current: `feature/lighthouse-ci-and-email-improvements` (Lighthouse CI setup + email templates)
2. Next: `feature/lighthouse-phase-1` (Quick wins: images, headings, links)
3. Then: `feature/lighthouse-phase-2` (Performance: WebP, responsive images, preload)
4. Then: `feature/lighthouse-phase-3` (Security: CSP, bf-cache)
5. Finally: `feature/pwa-implementation` (PWA: manifest, service worker, icons)

Each phase will be:
- Implemented in separate PR
- Tested thoroughly
- Merged to `develop`
- Verified on dev stage before next phase

---

## 🎯 Success Metrics

**Target Lighthouse Scores (CI environment)**:
- Performance: ≥85% (relaxed for CI constraints)
- Accessibility: ≥95%
- Best Practices: ≥90%
- SEO: ≥95%
- PWA: Fully installable

**Core Web Vitals Targets**:
- LCP: <2.5s (Good)
- FID: <100ms (Good)
- CLS: <0.1 (Good)

**Business Impact**:
- Demonstrates modern web development expertise
- Shows attention to performance and accessibility
- Proves understanding of PWA architecture
- Improves user experience and SEO rankings

---

## 📚 References

- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Maskable Icons](https://web.dev/maskable-icon/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Back/Forward Cache](https://web.dev/bfcache/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

---

**Last Updated**: 2025-11-12
**Status**: Planning Complete - Ready for Implementation
