# SEO Best Practices

This document outlines essential SEO implementation practices for all views in the idevelop.tech portfolio site.

---

## Core Principles

**SEO for SPAs (Single Page Applications):**

- Clean, semantic URL structure (no query parameters)
- Dynamic meta tags on every view
- Proper Open Graph and Twitter Card tags
- Consistent use of application constants for URLs

---

## URL Structure

**✅ DO:**

- Use clean, semantic URLs: `/services/ai-enablement`, `/tech`
- Use route params for dynamic content: `/services/:serviceId`
- Keep URLs lowercase with hyphens (kebab-case)
- Match route paths to content hierarchy

**❌ DON'T:**

- Use query parameters for primary navigation: `?service=ai-enablement`
- Use mixed case or underscores in URLs
- Create deeply nested URL structures unnecessarily

**Examples:**

```
/                          # Home page
/hire-me                   # Hire Me page
/tech                      # Tech experience browser
/services/ai-enablement    # Individual service pages
/services/cloud-consulting
/attributions              # Image credits
/components                # Component showcase
```

---

## Meta Tags Implementation

### Required on Every View

Every view component must use the `useMeta` composable to set:

1. **Page title** - Unique, descriptive, includes site name
2. **Description** - 150-160 characters, summarizes page content
3. **Open Graph tags** - For social media sharing (LinkedIn, Facebook)
4. **Twitter Card tags** - For Twitter sharing
5. **Canonical URL** - Full URL to the page

### Implementation Pattern

**Import the composable:**

```typescript
import { useMeta } from "@/composables/useMeta";
import { SITE } from "@/constants";
```

**Use in setup script:**

```typescript
useMeta({
  title: "Page Title - I Develop Tech",
  description:
    "Clear, concise description of what this page offers (150-160 chars)",
  ogTitle: "Page Title - I Develop Tech",
  ogDescription: "Social sharing description (can be slightly different)",
  ogUrl: `${SITE.url}/page-path`,
  ogImage: SITE.ogImage,
});
```

### Meta Tag Guidelines

**Title Format:**

- Service pages: `{Service Name} | I Develop Tech`
- Feature pages: `{Feature} - {Context} | I Develop Tech`
- Home: `I Develop Tech - Technical Consulting Services`
- Max length: ~60 characters (avoids truncation in search results)

**Description Format:**

- Start with the value proposition
- Include primary keywords naturally
- End with a call-to-action when appropriate
- Length: 150-160 characters (optimal for search results)

**Open Graph Image:**

- Use `SITE.ogImage` from constants (default fallback)
- Service-specific images: `${SITE.url}/og-image-{service}.jpg`
- Dimensions: 1200×630px (Facebook/LinkedIn standard)

**Examples:**

```typescript
// Home page
useMeta({
  title: "I Develop Tech - Technical Consulting Services",
  description:
    "Expert technical consulting for cloud infrastructure, AI enablement, systems integration, eCommerce operations, and web design. Affordable, on-demand tech expertise without full-time costs.",
  ogTitle: "I Develop Tech - Technical Consulting Services",
  ogDescription:
    "Expert technical consulting for cloud infrastructure, AI enablement, systems integration, and more. Affordable, on-demand tech expertise.",
  ogUrl: `${SITE.url}/`,
  ogImage: SITE.ogImage,
});

// Service page
useMeta({
  title: "AI Enablement & Team Training Services | I Develop Tech",
  description:
    "Practical AI adoption for your team. Hands-on training workshops, workflow analysis, and tool implementation. Move beyond ChatGPT to AI-powered documentation, testing, and code generation.",
  ogTitle: "AI Enablement & Team Training Services | I Develop Tech",
  ogDescription:
    "Help your team adopt AI effectively. Custom workshops, workflow optimization, and practical implementation. Focus on real productivity gains, not hype.",
  ogUrl: `${SITE.url}/services/ai-enablement`,
  ogImage: `${SITE.url}/og-image-ai-enablement.jpg`,
});

// Tech experience page
useMeta({
  title: "Technical Experience - Matt Myers | I Develop Tech",
  description:
    "Comprehensive technical expertise across software engineering, cloud architecture, DevOps, data engineering, security, and technical leadership. 10+ years building scalable systems.",
  ogTitle: "Technical Experience - Matt Myers | I Develop Tech",
  ogDescription:
    "Explore my technical experience in software development, cloud infrastructure, DevOps practices, and engineering leadership.",
  ogUrl: `${SITE.url}/tech`,
  ogImage: SITE.ogImage,
});
```

---

## Routing Best Practices

### Route Configuration

**Use dedicated routes for major pages:**

```typescript
// src/router/index.ts
{
  path: '/services/ai-enablement',
  name: 'ai-enablement-service',
  component: () => import('../views/services/AIEnablementServiceView.vue'),
}
```

**Benefits:**

- Clean URLs for SEO and social sharing
- Each page is independently crawlable
- Better analytics tracking per page
- Improved user experience (shareable URLs)

### Scroll Behavior

The router includes custom scroll behavior:

- Scroll to top on direct navigation
- Restore scroll position on browser back/forward
- Smooth transitions between pages

---

## Application Constants

**Always use constants from `/src/constants/index.ts`:**

```typescript
import { SITE, CONTACT, SCHEDULING_LINK } from "@/constants";
```

**Available constants:**

- `SITE.url` - Base URL (`https://idevelop.tech`)
- `SITE.name` - Site name (`idevelop.tech`)
- `SITE.ogImage` - Default Open Graph image
- `CONTACT.email` - Contact email
- `CONTACT.linkedin` - LinkedIn profile URL
- `CONTACT.github` - GitHub profile URL
- `SCHEDULING_LINK` - Google Calendar scheduling link

**Why this matters:**

- Single source of truth for URLs
- Easy environment-specific configuration
- Prevents hardcoded URLs that break in development
- Type-safe with TypeScript

---

## Semantic HTML

**Use proper heading hierarchy:**

```html
<h1>Page Title</h1>
<!-- Only one H1 per page -->
<h2>Major Section</h2>
<!-- Top-level sections -->
<h3>Subsection</h3>
<!-- Nested content -->
```

**Use semantic elements:**

- `<nav>` for navigation
- `<main>` for primary content
- `<article>` for standalone content
- `<section>` for thematic groupings
- `<header>` / `<footer>` for page structure

---

## Content Guidelines

### Keyword Optimization

**DO:**

- Use natural language with relevant keywords
- Include location keywords where relevant ("Florida, USA")
- Use industry-specific terminology appropriately
- Write for humans first, search engines second

**DON'T:**

- Keyword stuff or over-optimize
- Use hidden text or cloaking
- Create duplicate content across pages

### Content Structure

**Each page should have:**

1. Clear, unique H1 heading
2. Introductory paragraph with primary keywords
3. Scannable content (headings, lists, short paragraphs)
4. Call-to-action (contact, schedule, explore services)

---

## Social Sharing Optimization

### Open Graph Tags

Required for LinkedIn, Facebook, and other platforms:

```typescript
ogTitle: "Compelling Title for Social Sharing";
ogDescription: "Brief description that entices clicks";
ogUrl: `${SITE.url}/page-path`; // Full canonical URL
ogImage: `${SITE.url}/og-image.jpg`; // 1200×630px image
```

### Twitter Cards

Automatically generated from Open Graph tags by `useMeta` composable:

- `twitter:card` defaults to `summary_large_image`
- `twitter:title` uses `ogTitle`
- `twitter:description` uses `ogDescription`
- `twitter:image` uses `ogImage`

---

## Testing & Validation

### Pre-Deployment Checklist

**Meta Tags:**

- [ ] Every view has unique `title` and `description`
- [ ] All URLs use `SITE.url` constant (not hardcoded)
- [ ] Open Graph images exist and are correct dimensions
- [ ] No duplicate meta tags on any page

**URLs:**

- [ ] All URLs are clean (no query parameters)
- [ ] Internal links use router-link or programmatic navigation
- [ ] External links have `target="_blank"` and `rel="noopener noreferrer"`

**Content:**

- [ ] One H1 per page
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] Primary keywords in first paragraph
- [ ] Clear calls-to-action on every page

### Testing Tools

**Before deployment, validate with:**

1. **Google Rich Results Test** - https://search.google.com/test/rich-results
   - Validates structured data
   - Tests Google's ability to crawl content

2. **LinkedIn Post Inspector** - https://www.linkedin.com/post-inspector/
   - Preview how links appear on LinkedIn
   - Validate Open Graph tags

3. **Twitter Card Validator** - https://cards-dev.twitter.com/validator
   - Preview Twitter card appearance
   - Test Twitter-specific meta tags

4. **Chrome DevTools Lighthouse**
   - Run SEO audit
   - Check for common issues
   - Verify mobile-friendliness

---

## Common Pitfalls to Avoid

### ❌ Hardcoded URLs

```typescript
// BAD
ogUrl: "https://idevelop.tech/services/ai-enablement";

// GOOD
ogUrl: `${SITE.url}/services/ai-enablement`;
```

### ❌ Missing Meta Tags

Every view must have `useMeta()` called in the setup script. No exceptions.

### ❌ Duplicate Titles/Descriptions

Each page needs unique, descriptive meta tags. Copy-paste is not acceptable.

### ❌ Query Parameter URLs

```typescript
// BAD
router.push({ query: { service: "ai-enablement" } });

// GOOD
router.push("/services/ai-enablement");
```

### ❌ Overly Long Titles

Titles longer than ~60 characters get truncated in search results.

### ❌ Generic Descriptions

```typescript
// BAD
description: "This is a page about AI services.";

// GOOD
description: "Practical AI adoption for your team. Hands-on training workshops, workflow analysis, and tool implementation.";
```

---

## Quick Reference Checklist

Use this checklist when creating or updating any view:

- [ ] `useMeta()` composable imported and configured
- [ ] Unique, descriptive page title (~60 chars)
- [ ] Compelling description (150-160 chars)
- [ ] Open Graph tags (title, description, url, image)
- [ ] URLs use `SITE.url` constant
- [ ] Clean route path (no query params)
- [ ] One H1 heading per page
- [ ] Primary keywords in first paragraph
- [ ] Clear call-to-action
- [ ] External links have proper security attributes

---

## Summary

**The Three Pillars of SEO for This Site:**

1. **Clean URLs** - Semantic paths, no query parameters
2. **Meta Tags** - `useMeta()` on every view with unique content
3. **Constants** - Always use `SITE.url` and other constants

**Remember:** SEO is not about tricks or hacks. It's about making content accessible, shareable, and valuable to both search engines and humans.
