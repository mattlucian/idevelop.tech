# SEO Optimization Plan

## Overview

Quick wins to improve SEO from D+ to B- grade without major refactoring (estimated 2-4 hours total).

## ✅ CURRENT PROGRESS (Updated: 2025-01-23)

**Completed Phases:**

- ✅ Phase 1: Route Structure Refactor (COMPLETE)
- ✅ Phase 2: Meta Tags System (COMPLETE)
- ✅ Phase 3: Sitemap & Discovery (COMPLETE)
- ✅ Phase 4: Structured Data (COMPLETE)
- ⏸️ Phase 5: Testing & Validation (PENDING - Tabled for later)

**What's Implemented:**

1. Clean URL structure for all services (`/services/ai-enablement`, etc.)
2. Dynamic meta tags on all pages (useMeta composable)
3. Open Graph and Twitter Card tags
4. sitemap.xml with all routes
5. robots.txt for crawler guidance
6. Comprehensive JSON-LD Organization schema with service catalog

**What's Next:**

- Testing with Google Rich Results Test, social preview tools
- Optional: Submit sitemap to Google Search Console once deployed

## Current State (Baseline)

**SEO Issues:**

- Pure client-side SPA with no SSR/SSG
- Minimal HTML shell (only title tag, empty app div)
- Query parameter routing (`?service=ai` and `?domain=software`)
- All content loaded client-side via JSON
- No meta tags (description, Open Graph, Twitter cards)
- No sitemap.xml or robots.txt
- No structured data (JSON-LD)

**What Google Sees:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>I Develop Tech</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

**Current SEO Grade:** D+ to C-

---

## Target State (After Quick Wins)

**Improvements:**

- Clean URL structure: `/services/ai-enablement`, `/experience/software`
- Comprehensive meta tags on all pages
- Dynamic meta tags per service/domain
- sitemap.xml with all routes
- robots.txt for crawler guidance
- JSON-LD structured data for organization and services
- Open Graph and Twitter Card tags for social sharing

**Target SEO Grade:** B- to B

---

## Implementation Plan

### Phase 1: Route Structure Refactor

**Estimated Time:** 1-2 hours

**Current URLs:**

- Services: `/?service=ai-enablement`
- Experience: `/experience?domain=software`

**New URLs:**

- Services: `/services/ai-enablement`
- Experience: `/experience/software`

**Tasks:**

1. Update router configuration with new routes
2. Rename JSON files to match full service names (e.g., `ai.json` → `ai-enablement.json`)
3. Update ServicesView to use `route.params.serviceId` instead of `route.query.service`
4. Update ExperienceView to use `route.params.domain` instead of `route.query.domain`
5. Update Navigation component and all internal links

**Critical UX Consideration:**

- Must preserve dynamic slide-out panel behavior on desktop
- Must preserve full-screen panel on mobile
- Slide-out should work when clicking card OR navigating to URL directly

---

### Phase 2: Meta Tags System

**Estimated Time:** 1 hour

**What We'll Build:**

1. Composable for dynamic meta tag management (`src/composables/useMeta.ts`)
2. Per-view meta tags with dynamic content
3. Default fallback meta tags in index.html

**Meta Tags to Add:**

- `<meta name="description">` - Page-specific descriptions
- `<meta property="og:title">` - Open Graph title
- `<meta property="og:description">` - Open Graph description
- `<meta property="og:image">` - Social sharing image
- `<meta property="og:url">` - Canonical URL
- `<meta name="twitter:card">` - Twitter card type
- `<meta name="twitter:title">` - Twitter title
- `<meta name="twitter:description">` - Twitter description

**Dynamic Meta Examples:**

- Service pages: Title includes service name, description from JSON
- Experience pages: Title includes domain, description from content
- Home: Generic consulting services description

---

### Phase 3: Sitemap & Discovery

**Estimated Time:** 30-45 minutes

**Files to Create:**

1. **public/sitemap.xml:**
   - Homepage: https://idevelop.tech/
   - Hire Me: https://idevelop.tech/hire-me
   - Experience overview: https://idevelop.tech/experience
   - 6 Service pages: https://idevelop.tech/services/{service}
   - 6 Domain pages: https://idevelop.tech/experience/{domain}
   - Attributions: https://idevelop.tech/attributions

2. **public/robots.txt:**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://idevelop.tech/sitemap.xml
   ```

---

### Phase 4: Structured Data (JSON-LD)

**Estimated Time:** 30-45 minutes

**Schemas to Implement:**

1. **Organization Schema** (global - in index.html or App.vue):

   ```json
   {
     "@context": "https://schema.org",
     "@type": "ProfessionalService",
     "name": "I Develop Tech",
     "url": "https://idevelop.tech",
     "description": "Technical consulting services specializing in cloud infrastructure, AI enablement, and systems integration",
     "founder": {
       "@type": "Person",
       "name": "Matt Myers"
     }
   }
   ```

2. **Service Schema** (per service page):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "name": "AI Enablement",
     "description": "Hands-on AI training workshops...",
     "provider": {
       "@type": "Organization",
       "name": "I Develop Tech"
     },
     "serviceType": "Training and Consultation"
   }
   ```

---

### Phase 5: Testing & Validation

**Estimated Time:** 15-30 minutes

**Testing Checklist:**

- [ ] Google Rich Results Test - Validate structured data
- [ ] LinkedIn Preview - Check social card appearance
- [ ] Twitter Card Validator - Verify Twitter cards
- [ ] Lighthouse SEO Audit - Verify score improvements
- [ ] Manual URL testing - All routes resolve correctly
- [ ] Browser navigation - Back/forward buttons work
- [ ] Dynamic panel behavior - Still works on desktop/mobile

**Tools:**

- https://search.google.com/test/rich-results
- https://www.linkedin.com/post-inspector/
- https://cards-dev.twitter.com/validator
- Chrome DevTools Lighthouse

---

## Key Decisions Made

1. **Service URL naming:** Use full names like `/services/ai-enablement` (rename JSON files to match)
2. **Backward compatibility:** No redirects needed (still in development)
3. **Production domain:** https://idevelop.tech
4. **UX preservation:** Must maintain dynamic slide-out panels

---

## File Changes Completed

### ✅ New Files Created:

- `docs/SEO-PLAN.md` (this file)
- `src/composables/useMeta.ts` - Meta tag management composable
- `public/sitemap.xml` - Full sitemap with all routes
- `public/robots.txt` - Crawler guidance

### ✅ Modified Files:

- `src/router/index.ts` - Added service-detail route with params
- `src/views/ServicesView.vue` - Uses route params, dynamic meta tags, preserved panel UX
- `src/views/HireMeView.vue` - Added meta tags
- `src/views/AttributionsView.vue` - Added meta tags
- `src/views/TechExperienceView.vue` - Added meta tags
- `src/components/Navigation.vue` - Updated for new route structure
- `index.html` - Added default meta tags and JSON-LD structured data

### ✅ Renamed/Reorganized Files:

- `src/data/services/ai.json` → `ai-enablement.json`
- `src/data/services/ecommerce.json` → `ecommerce-ops.json`
- `src/data/experience/comprehensive.json` → `tech.json`
- Archived old domain files to `src/data/experience/archive/`
- Deleted `/src/views/ExperienceView.vue` (replaced with TechExperienceView)

---

## Success Metrics

**Before:**

- SEO Grade: D+ to C-
- Meta tags: 1 (title only)
- Indexed pages: Unclear (all dynamic)
- Social previews: Generic/broken

**After:**

- SEO Grade: B- to B
- Meta tags: 8+ per page
- Indexed pages: 15+ (clearly defined)
- Social previews: Rich with images and descriptions

---

## Next Steps After Quick Wins

**Optional Future Enhancements** (if SEO becomes strategic priority):

1. Migrate to Nuxt.js for SSR/SSG (20-40 hours)
2. Add blog/content marketing section
3. Implement prerendering with vite-plugin-ssr
4. Add more structured data (breadcrumbs, FAQs, reviews)
5. Optimize images with lazy loading and proper alt tags

---

## Notes

- This plan focuses on "quick wins" to get 70% of SEO benefits with 20% of the effort
- No major framework changes or SSR required
- Preserves existing UX and visual design
- Improves both search engine crawling AND social media sharing
- Sets foundation for future SEO investments if needed
