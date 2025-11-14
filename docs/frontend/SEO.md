# SEO Best Practices

Essential SEO implementation for all views in the idevelop.tech portfolio site.

---

## 🔴 Critical Rules

**Every view must:**
- [ ] Call `useMeta()` with unique title and description
- [ ] Use `SITE.url` constant (never hardcode URLs)
- [ ] Have clean URLs (no query parameters)
- [ ] Include one H1 heading
- [ ] Use semantic HTML elements

**Meta tags:**
- [ ] Title: ~60 chars, unique, includes site name
- [ ] Description: 150-160 chars, value proposition first
- [ ] Open Graph: title, description, url, image (1200×630px)
- [ ] Use constants from `/src/constants/index.ts`

---

## Core Principles

**SEO for SPAs:**

- Clean, semantic URL structure (no query parameters)
- Dynamic meta tags on every view via `useMeta` composable
- Proper Open Graph and Twitter Card tags
- Use application constants for all URLs

---

## Implementation Pattern

### Required on Every View

```typescript
import { useMeta } from "@/composables/useMeta";
import { SITE } from "@/constants";

useMeta({
  title: "Page Title | I Develop Tech",
  description: "Clear, value-focused description (150-160 chars)",
  ogTitle: "Page Title | I Develop Tech",
  ogDescription: "Social sharing description",
  ogUrl: `${SITE.url}/page-path`,
  ogImage: SITE.ogImage,
});
```

### Meta Tag Guidelines

**Title Format:**
- Service pages: `{Service Name} | I Develop Tech`
- Feature pages: `{Feature} - {Context} | I Develop Tech`
- Home: `I Develop Tech - Technical Consulting Services`
- Max length: ~60 characters

**Description Format:**
- Start with value proposition
- Include primary keywords naturally
- Length: 150-160 characters

**Open Graph Image:**
- Default: `SITE.ogImage` from constants
- Service-specific: `${SITE.url}/og-image-{service}.jpg`
- Dimensions: 1200×630px

**Twitter Cards:**
Automatically generated from Open Graph tags by `useMeta` composable.

---

## URL Structure

**✅ DO:**
- Clean, semantic URLs: `/services/ai-enablement`
- Lowercase with hyphens (kebab-case)
- Match route paths to content hierarchy

**❌ DON'T:**
- Query parameters: `?service=ai-enablement`
- Mixed case or underscores
- Deeply nested structures

**Route Configuration:**

```typescript
// src/router/index.ts
{
  path: '/services/ai-enablement',
  name: 'ai-enablement-service',
  component: () => import('../views/services/AIEnablementServiceView.vue'),
}
```

---

## Application Constants

**Always use constants from `/src/constants/index.ts`:**

```typescript
import { SITE, CONTACT, SCHEDULING_LINK } from "@/constants";
```

**Available constants:**
- `SITE.url` - Base URL
- `SITE.name` - Site name
- `SITE.ogImage` - Default OG image
- `CONTACT.email`, `CONTACT.linkedin`, `CONTACT.github`
- `SCHEDULING_LINK`

**Why:**
- Single source of truth
- Environment-specific configuration
- Type-safe with TypeScript

---

## Semantic HTML

**Proper heading hierarchy:**

```html
<h1>Page Title</h1>        <!-- Only one H1 per page -->
<h2>Major Section</h2>      <!-- Top-level sections -->
<h3>Subsection</h3>         <!-- Nested content -->
```

**Use semantic elements:**
- `<nav>` for navigation
- `<main>` for primary content
- `<article>` for standalone content
- `<section>` for thematic groupings
- `<header>` / `<footer>` for page structure

---

## Content Guidelines

**Each page should have:**
1. Clear, unique H1 heading
2. Introductory paragraph with primary keywords
3. Scannable content (headings, lists, short paragraphs)
4. Call-to-action

**Keyword optimization:**
- Use natural language with relevant keywords
- Include location keywords where relevant
- Write for humans first, search engines second
- No keyword stuffing, hidden text, or duplicate content

---

## Common Pitfalls

**❌ Hardcoded URLs:**
```typescript
// BAD
ogUrl: "https://idevelop.tech/services/ai-enablement";

// GOOD
ogUrl: `${SITE.url}/services/ai-enablement`;
```

**❌ Missing Meta Tags:**
Every view must call `useMeta()`. No exceptions.

**❌ Query Parameter URLs:**
```typescript
// BAD
router.push({ query: { service: "ai-enablement" } });

// GOOD
router.push("/services/ai-enablement");
```

**❌ Generic Descriptions:**
```typescript
// BAD
description: "This is a page about AI services.";

// GOOD
description: "Practical AI adoption for your team. Hands-on training workshops, workflow analysis, and tool implementation.";
```

---

## Testing & Validation

**Before deployment, validate with:**

1. **Google Rich Results Test** - https://search.google.com/test/rich-results
2. **LinkedIn Post Inspector** - https://www.linkedin.com/post-inspector/
3. **Twitter Card Validator** - https://cards-dev.twitter.com/validator
4. **Chrome Lighthouse** - SEO audit

---

## Summary

**The Three Pillars:**
1. **Clean URLs** - Semantic paths, no query parameters
2. **Meta Tags** - `useMeta()` on every view with unique content
3. **Constants** - Always use `SITE.url` and other constants

SEO is about making content accessible, shareable, and valuable to both search engines and humans.
