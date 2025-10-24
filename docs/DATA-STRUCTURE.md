# Data Structure Documentation

## Overview

This document defines the data schemas used in the idevelop.tech portfolio website. All content is stored in JSON files and follows TypeScript interfaces for type safety.

---

## Data Files Organization

```
/src/data/
├── services/              # Individual service files (6 files)
│   ├── tech-admin.json
│   ├── integration.json
│   ├── ai-enablement.json
│   ├── ecommerce-ops.json
│   ├── web-design.json
│   └── cloud-consulting.json
├── services.json          # Service configuration/metadata
└── tech.json             # All technical expertise domains
```

---

## Type System

### Location

Types are organized in `/src/types/`:

**Shared Types** (`/types/shared/`):

- `element.ts` - Badge
- `card.ts` - Step
- `ui.ts` - Topic, PanelColorScheme
- `display.ts` - Display types (StepDisplay, DiagramDisplay, CodeDisplay, OptionsDisplay)

**Domain Types** (`/types/`):

- `service.ts` - Service data structure
- `tech.ts` - Technical expertise structure

---

## Service Data Structure

### ServiceContent

**Location:** `src/types/service.ts`

```typescript
interface ServiceContent {
  title: string
  tagline: string
  overview: string
  stats: ServiceStat[]
  tags: string[]
  whatIOffer?: string[]
  howItWorks?: string[]
  sections: ServiceSection[]
  portfolioItems: PortfolioItem[]
  testimonial: Testimonial
}
```

**Files:** Each service has its own file in `src/data/services/`

### ServiceSection

```typescript
interface ServiceSection {
  heading: string
  tagline?: string
  content?: string
  benefits?: string[]
  visual?: Display
  cta?: string
  theme?: 'default' | 'process' | 'overview' | 'options'
}
```

**Theme Property:** Controls which layout component renders the section. See [THEMES.md](./THEMES.md).

### Supporting Types

**ServiceStat:**

```typescript
interface ServiceStat {
  value: string // e.g., "$50k"
  label: string // e.g., "Saved"
}
```

**PortfolioItem:**

```typescript
interface PortfolioItem {
  name: string
  url: string
  logo: string // Path to logo image
  description: string
}
```

**Testimonial:**

```typescript
interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}
```

### Display Types

**Location:** `src/types/shared/display.ts`

**StepDisplay (for workflows):**

```typescript
interface StepDisplay {
  type: 'workflow'
  data: {
    title: string
    steps: Step[]
    style?: 'boxed' | 'boxed-inline' | 'timeline'
  }
}
```

**DiagramDisplay (for before/after):**

```typescript
interface DiagramDisplay {
  type: 'diagram' | 'before-after'
  data: {
    title: string
    before: { title?: string; items: string[] }
    after: { title?: string; items: string[] }
  }
}
```

**CodeDisplay:**

```typescript
interface CodeDisplay {
  type: 'code'
  data: {
    title: string
    code: string
  }
}
```

**OptionsDisplay:**

```typescript
interface OptionsDisplay {
  type: 'options'
  data: {
    options: Array<{
      icon: string
      title: string
      description: string
      items: string[]
    }>
  }
}
```

---

## Tech/Experience Data Structure

### TechContent

**Location:** `src/types/tech.ts`
**File:** `src/data/tech.json` (all domains in one file)

```typescript
interface TechContent {
  title: string
  overview: string
  badges: Badge[]
  categories: Category[]
}
```

### Hierarchy

```
Domain
└── Categories[]
    └── Expertise[]
        └── Topics[]
```

**Expertise** = A skill/technology area (e.g., "API Architecture")
**Topic** = Content section within expertise (e.g., "RESTful APIs")

### Category

```typescript
interface Category {
  name: string
  subtitle: string
  topics: Expertise[]
}
```

### Expertise

```typescript
interface Expertise {
  title: string
  subtitle: string
  skillTags: string[]
  intro: string
  sections: Topic[]
}
```

### Topic

```typescript
interface Topic {
  heading: string
  content: string
}
```

### Badge

**Location:** `src/types/shared/element.ts`

```typescript
interface Badge {
  label: string // e.g., "Experience"
  value: string // e.g., "10+ Years"
  icon: string // Emoji
}
```

---

## Complete File Examples

### Service File

**Location:** `src/data/services/tech-admin.json`

```json
{
  "title": "Technical Administration",
  "tagline": "Optimize Your Technology Operations",
  "overview": "Streamline technical operations with expert administration...",
  "stats": [
    { "value": "$50k", "label": "Cloud Spend" },
    { "value": "50%", "label": "Cost Saved" },
    { "value": "99.9%", "label": "Uptime" }
  ],
  "tags": ["AWS", "Docker", "CI/CD", "Monitoring"],
  "whatIOffer": ["Cloud infrastructure optimization", "Automated deployment pipelines"],
  "howItWorks": ["Initial infrastructure audit", "Implementation roadmap"],
  "sections": [
    {
      "heading": "Infrastructure Optimization",
      "tagline": "Right-size your cloud resources",
      "theme": "overview"
    },
    {
      "heading": "Deployment Process",
      "theme": "process",
      "visual": {
        "type": "workflow",
        "data": {
          "title": "CI/CD Pipeline",
          "style": "timeline",
          "steps": [
            { "icon": "💻", "label": "Code", "desc": "Push to GitHub" },
            { "icon": "🧪", "label": "Test", "desc": "Run tests" },
            { "icon": "🚀", "label": "Deploy", "desc": "Release" }
          ]
        }
      },
      "cta": "Get started with a free audit"
    }
  ],
  "portfolioItems": [
    {
      "name": "Flxpoint",
      "url": "https://flxpoint.com",
      "logo": "/images/partners/flxpoint-logo-dark.png",
      "description": "eCommerce operations platform"
    }
  ],
  "testimonial": {
    "quote": "Matt reduced our cloud costs by 50%.",
    "author": "Travis",
    "role": "CEO",
    "company": "Flxpoint"
  }
}
```

### Tech File

**Location:** `src/data/tech.json` (all domains)

```json
{
  "domains": [
    {
      "id": "software",
      "title": "Software Engineering",
      "overview": "10+ years of full-stack development...",
      "badges": [
        { "label": "Experience", "value": "10+ Years", "icon": "⏱️" },
        { "label": "Approach", "value": "Full-Stack", "icon": "💻" }
      ],
      "categories": [
        {
          "name": "Backend Development",
          "subtitle": "Server-side architecture & APIs",
          "topics": [
            {
              "title": "API Architecture",
              "subtitle": "RESTful and GraphQL APIs",
              "skillTags": ["REST", "GraphQL", "OpenAPI"],
              "intro": "Experience designing scalable APIs...",
              "sections": [
                {
                  "heading": "RESTful APIs",
                  "content": "Designed REST APIs following best practices..."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Content Guidelines

### Service Content

**Title:** Service name (e.g., "Technical Administration")
**Tagline:** Value proposition (5-10 words)
**Overview:** Brief description (2-3 sentences)
**Stats:** 3 key metrics
**Tags:** 4-6 technology/skill tags
**Sections:** 2-5 sections per service

### Tech Content

**Title:** Domain name (e.g., "Software Engineering")
**Overview:** Experience summary (2-4 sentences)
**Badges:** 3-5 key highlights
**Categories:** Group related expertise (2-4 per domain)
**Expertise:** Individual skills (3-6 per category)

### Writing Style

**Professional & Concise:**

- Use active voice
- Lead with accomplishments
- Include specific examples
- Keep paragraphs focused (3-5 sentences)

**Skill Tags:**

- Proper product names ("PostgreSQL" not "postgres")
- Mix technologies, patterns, concepts
- 4-8 tags per expertise
- Most impressive first

---

## Theme-Specific Data

### Process Theme

```json
{
  "theme": "process",
  "visual": {
    "type": "workflow",
    "data": {
      "title": "Workflow Title",
      "style": "timeline",
      "steps": [
        { "icon": "🔍", "label": "Discover", "desc": "Understand needs" },
        { "icon": "⚙️", "label": "Build", "desc": "Create solution" },
        { "icon": "🚀", "label": "Deploy", "desc": "Go live" }
      ]
    }
  }
}
```

**Style Options:**

- `boxed` - 2x2 grid (4 steps)
- `boxed-inline` - 3x2 grid (6 steps)
- `timeline` - Vertical timeline

### Options Theme

```json
{
  "theme": "options",
  "visual": {
    "type": "options",
    "data": {
      "options": [
        {
          "icon": "📋",
          "title": "Project-Based",
          "description": "Fixed scope",
          "items": ["10+ hours", "Fixed fee", "Clear deliverables"]
        },
        {
          "icon": "🔄",
          "title": "Retainer",
          "description": "Ongoing partnership",
          "items": ["Monthly hours", "Flexible", "Priority support"]
        }
      ]
    }
  }
}
```

### Overview Theme

Uses `whatIOffer` and `howItWorks` arrays from ServiceContent root level. No visual needed - pulls data from service stats and arrays.

---

## Adding New Content

### Add a Service

1. **Create file:** `src/data/services/{name}.json` following ServiceContent schema
2. **Add to config:** `src/composables/useServiceConfig.ts`:
   ```typescript
   {
     name: '{name}',
     icon: '📦',
     label: 'Label',
     title: 'Title',
     tagline: 'Tagline',
     stats: [/* ... */],
     tags: [/* ... */],
     heroImage: '/images/hero-{name}.jpg'
   }
   ```
3. Service appears automatically in HomeView

### Add Tech Expertise

1. **Edit:** `src/data/tech.json`
2. **Find domain** in domains array
3. **Find category** in that domain
4. **Add to topics array:**
   ```json
   {
     "title": "New Skill",
     "subtitle": "Description",
     "skillTags": ["Tag1", "Tag2"],
     "intro": "Introduction...",
     "sections": [{ "heading": "Topic", "content": "Content..." }]
   }
   ```

### Add New Domain

1. **Edit:** `src/data/tech.json`
2. **Add to domains array:**
   ```json
   {
     "id": "new-domain",
     "title": "Domain Title",
     "overview": "Overview text...",
     "badges": [
       /* ... */
     ],
     "categories": [
       /* ... */
     ]
   }
   ```

---

## Validation

### JSON Syntax

```bash
# Validate with jq
cat src/data/services/tech-admin.json | jq '.'
cat src/data/tech.json | jq '.'

# Format
cat src/data/services/tech-admin.json | jq '.' > temp.json
mv temp.json src/data/services/tech-admin.json
```

### TypeScript

```bash
npm run type-check
```

---

## Related Documentation

- **[THEMES.md](./THEMES.md)** - Theme system and layout options
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[COMPONENTS.md](./COMPONENTS.md)** - Component library
- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Design patterns

---

## Quick Reference

### Data Files

**Services:**

- `src/data/services/tech-admin.json`
- `src/data/services/integration.json`
- `src/data/services/ai-enablement.json`
- `src/data/services/ecommerce-ops.json`
- `src/data/services/web-design.json`
- `src/data/services/cloud-consulting.json`
- `src/data/services.json` (metadata/config)

**Tech:**

- `src/data/tech.json` (all domains)

**Types:**

- `src/types/service.ts`
- `src/types/tech.ts`
- `src/types/shared/*.ts`

### Required Fields

**Service:**

- ✅ title, tagline, overview
- ✅ stats, tags
- ✅ sections, portfolioItems, testimonial

**Tech Domain:**

- ✅ id, title, overview
- ✅ badges, categories

### Image Paths

- Hero images: `/images/hero-{service}.jpg`
- Partner logos: `/images/partners/{name}-logo.png`
- Brand assets: `/images/brand/`
