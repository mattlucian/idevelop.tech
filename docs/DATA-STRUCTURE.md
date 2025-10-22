# Data Structure Documentation

## Overview

This document defines the content schema used throughout the idevelop.tech portfolio website. All domain content follows this consistent structure to enable dynamic rendering.

---

## Content Hierarchy

```
Domain
├── Metadata (title, overview, badges)
└── Categories[]
    └── Topics[]
        ├── Metadata (title, subtitle, skillTags, intro)
        └── Sections[]
            └── Content (heading, content)
```

**Levels:**
- **Domain** - Top-level expertise area (Software, Cloud, DevOps, etc.)
- **Category** - Grouping within domain (Backend, Frontend, Testing, etc.)
- **Topic** - Specific skill area (API Architecture, Languages, etc.)
- **Section** - Content block within a topic (REST APIs, GraphQL, etc.)

---

## TypeScript Interfaces

### Experience Content Types

Location: `src/types/experience.ts`

### Badge Interface

```typescript
export interface Badge {
  label: string    // Display label (e.g., "Experience")
  value: string    // Badge value (e.g., "10+ Years")
  icon: string     // Emoji or icon identifier (e.g., "⏱️")
}
```

**Usage:** Display key metrics and highlights about a domain.

**Example:**
```json
{
  "label": "Experience",
  "value": "10+ Years",
  "icon": "⏱️"
}
```

---

### Section Interface

```typescript
export interface Section {
  heading: string  // Section heading
  content: string  // Section content (plain text or markdown in future)
}
```

**Usage:** Content blocks within a topic.

**Example:**
```json
{
  "heading": "RESTful APIs",
  "content": "Designed and implemented RESTful APIs handling millions of requests per day..."
}
```

---

### Topic Interface

```typescript
export interface Topic {
  title: string        // Topic title
  subtitle: string     // Brief description
  skillTags: string[]  // Array of skill keywords
  intro: string        // Introduction paragraph
  sections: Section[]  // Content sections
}
```

**Usage:** Represents a specific skill or technology area.

**Example:**
```json
{
  "title": "API Architecture & Design",
  "subtitle": "RESTful and GraphQL APIs at scale",
  "skillTags": ["REST", "GraphQL", "API Gateway", "Rate Limiting"],
  "intro": "Extensive experience designing and implementing APIs...",
  "sections": [
    {
      "heading": "RESTful Design",
      "content": "Designed REST APIs following industry best practices..."
    },
    {
      "heading": "GraphQL Implementation",
      "content": "Built GraphQL schemas for flexible client queries..."
    }
  ]
}
```

---

### Category Interface

```typescript
export interface Category {
  name: string        // Category name
  subtitle: string    // Brief description
  topics: Topic[]     // Array of topics in this category
}
```

**Usage:** Groups related topics together.

**Example:**
```json
{
  "name": "Backend Development",
  "subtitle": "Server-side architecture & APIs",
  "topics": [
    { /* API Architecture topic */ },
    { /* Languages topic */ },
    { /* Data Access topic */ }
  ]
}
```

---

### ExperienceContent Interface

```typescript
export interface ExperienceContent {
  title: string        // Domain title
  overview: string     // Domain overview paragraph
  badges: Badge[]      // Key highlights
  categories: Category[] // Content categories
}
```

**Usage:** Complete domain data structure.

**Example:**
```json
{
  "title": "Software Engineering",
  "overview": "10+ years of full-stack development experience...",
  "badges": [
    { "label": "Experience", "value": "10+ Years", "icon": "⏱️" },
    { "label": "Approach", "value": "Full-Stack", "icon": "💻" }
  ],
  "categories": [
    { /* Backend category */ },
    { /* Frontend category */ }
  ]
}
```

---

### Service Content Types

Location: `src/types/service.ts`

#### ServiceStats Interface

```typescript
export interface ServiceStats {
  value: string
  label: string
}
```

**Usage:** Display key metrics about a service.

**Example:**
```json
{
  "value": "$50k",
  "label": "Cloud Spend"
}
```

---

#### PortfolioItem Interface

```typescript
export interface PortfolioItem {
  name: string
  url: string
  logo: string
  description: string
}
```

**Usage:** Reference to client/project work.

**Example:**
```json
{
  "name": "Flxpoint",
  "url": "https://flxpoint.com",
  "logo": "/images/partners/flxpoint-logo-dark.png",
  "description": "Distributed eCommerce operations platform"
}
```

---

#### Testimonial Interface

```typescript
export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}
```

**Usage:** Client testimonial.

**Example:**
```json
{
  "quote": "Matt was able to help us accelerate our roadmap!",
  "author": "Travis",
  "role": "CEO",
  "company": "Flxpoint"
}
```

---

#### ServiceVisual Types

Service visuals support three types: `workflow`, `before-after`, and `code`. The `data` field structure varies by type:

**Workflow Type:**
```json
{
  "type": "workflow",
  "data": {
    "title": "CI/CD Pipeline",
    "steps": [
      { "icon": "💻", "label": "Code", "desc": "Push to GitHub" },
      { "icon": "🧪", "label": "Test", "desc": "Automated tests" }
    ]
  }
}
```

**Before-After Type:**
```json
{
  "type": "before-after",
  "data": {
    "before": {
      "title": "Legacy System",
      "items": ["Monolithic architecture", "Manual deployments"]
    },
    "after": {
      "title": "Modern System",
      "items": ["Microservices", "Automated CI/CD"]
    }
  }
}
```

**Code Type:**
```json
{
  "type": "code",
  "data": {
    "title": "AWS Architecture",
    "code": "CloudFront → Load Balancer → ECS"
  }
}
```

#### ServiceSection Interface

```typescript
export interface WorkflowStep {
  icon: string
  label: string
  desc: string
}

export interface WorkflowVisual {
  type: 'workflow'
  data: {
    title: string
    steps: WorkflowStep[]
  }
}

export interface BeforeAfterSection {
  title?: string
  items?: string[]
}

export interface DiagramVisual {
  type: 'diagram' | 'before-after'
  data: {
    title: string
    before: BeforeAfterSection | string[]
    after: BeforeAfterSection | string[]
  }
}

export interface CodeVisual {
  type: 'code'
  data: {
    title: string
    code: string
  }
}

export type Visual = WorkflowVisual | DiagramVisual | CodeVisual

export interface ServiceSection {
  heading: string
  tagline?: string
  content?: string
  benefits?: string[]
  visual?: Visual
  cta?: string
}
```

**Usage:** Represents a section within a service offering. Most fields are optional to allow flexible content structures.

#### ServiceContent Interface

```typescript
export interface ServiceContent {
  title: string
  tagline: string
  overview: string
  stats: ServiceStats[]
  tags: string[]
  sections: ServiceSection[]
  portfolioItems: PortfolioItem[]
  testimonial: Testimonial
}
```

**Usage:** Complete service data structure.

**All Service Files:**
- `src/data/services/software-cloud.json`
- `src/data/services/tech-admin.json`
- `src/data/services/integration.json`
- `src/data/services/web-design.json`
- `src/data/services/ai.json`
- `src/data/services/ecommerce.json`
- `src/data/services/cloud-consulting.json`

---

## JSON Schema

### Complete Domain File Structure

```json
{
  "title": "Domain Title",
  "overview": "Multi-paragraph overview of the domain...",
  "badges": [
    {
      "label": "Badge Label",
      "value": "Badge Value",
      "icon": "🎯"
    }
  ],
  "categories": [
    {
      "name": "Category Name",
      "subtitle": "Category description",
      "topics": [
        {
          "title": "Topic Title",
          "subtitle": "Topic description",
          "skillTags": ["Skill1", "Skill2", "Skill3"],
          "intro": "Topic introduction paragraph...",
          "sections": [
            {
              "heading": "Section Heading",
              "content": "Section content..."
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Real Example: Software Engineering Domain

### Minimal Example

```json
{
  "title": "Software Engineering",
  "overview": "Full-stack development with focus on scalability.",
  "badges": [
    {
      "label": "Experience",
      "value": "10+ Years",
      "icon": "⏱️"
    }
  ],
  "categories": [
    {
      "name": "Backend Development",
      "subtitle": "Server-side architecture",
      "topics": [
        {
          "title": "API Architecture",
          "subtitle": "RESTful and GraphQL APIs",
          "skillTags": ["REST", "GraphQL"],
          "intro": "Experience designing scalable APIs.",
          "sections": [
            {
              "heading": "RESTful APIs",
              "content": "Designed REST APIs following best practices."
            }
          ]
        }
      ]
    }
  ]
}
```

### Complete Example

**All Experience Files:**
- `src/data/experience/software.json`
- `src/data/experience/cloud.json`
- `src/data/experience/devops.json`
- `src/data/experience/data.json`
- `src/data/experience/security.json`
- `src/data/experience/leadership.json`

### Complete Service File Structure

```json
{
  "title": "Service Title",
  "tagline": "Brief tagline",
  "overview": "Service overview paragraph",
  "stats": [
    { "value": "$50k", "label": "Cloud Spend" },
    { "value": "50%", "label": "Cost Saved" }
  ],
  "tags": ["Tag 1", "Tag 2", "Tag 3"],
  "sections": [
    {
      "heading": "Section Heading",
      "tagline": "Section tagline",
      "benefits": [
        "Benefit 1",
        "Benefit 2"
      ],
      "visual": {
        "type": "workflow",
        "data": {
          "title": "Visual Title",
          "steps": [
            { "icon": "💻", "label": "Step", "desc": "Description" }
          ]
        }
      },
      "cta": "Call to action text"
    }
  ],
  "portfolioItems": [
    {
      "name": "Project Name",
      "url": "https://example.com",
      "logo": "/images/partners/logo.png",
      "description": "Project description"
    }
  ],
  "testimonial": {
    "quote": "Testimonial text",
    "author": "Name",
    "role": "Role",
    "company": "Company"
  }
}
```

**Actual Service Files:**
- `src/data/services/software-cloud.json`
- `src/data/services/tech-admin.json`
- `src/data/services/integration.json`
- `src/data/services/web-design.json`
- `src/data/services/ai.json`
- `src/data/services/ecommerce.json`
- `src/data/services/cloud-consulting.json`

---

## Data Validation Rules

### Required Fields

**Domain Level:**
- ✅ `title` (string, non-empty)
- ✅ `overview` (string, non-empty)
- ✅ `badges` (array, at least 1 badge)
- ✅ `categories` (array, at least 1 category)

**Badge:**
- ✅ `label` (string, non-empty)
- ✅ `value` (string, non-empty)
- ✅ `icon` (string, can be emoji or icon identifier)

**Category:**
- ✅ `name` (string, non-empty)
- ✅ `subtitle` (string, non-empty)
- ✅ `topics` (array, at least 1 topic)

**Topic:**
- ✅ `title` (string, non-empty)
- ✅ `subtitle` (string, non-empty)
- ✅ `skillTags` (array, can be empty)
- ✅ `intro` (string, non-empty)
- ✅ `sections` (array, can be empty)

**Section:**
- ✅ `heading` (string, non-empty)
- ✅ `content` (string, non-empty)

### Optional Fields

Currently all fields are required. Future enhancements may add:
- `metadata` (object) - SEO metadata
- `images` (array) - Associated images
- `links` (array) - External references
- `projects` (array) - Related project case studies

---

## Content Patterns

### Overview Category

Each experience domain includes an "Overview" category as the first category in the JSON file. This category provides a summary of the domain.

**Standard Structure:**
```json
{
  "name": "Overview",
  "subtitle": "Domain summary and experience",
  "topics": [
    {
      "title": "Summary",
      "subtitle": "Brief domain description",
      "skillTags": ["Extracted", "From", "Badges"],
      "intro": "Copy of domain overview text",
      "sections": []
    }
  ]
}
```

**Pattern:** The Overview category typically:
- Uses badges values as skillTags
- Copies the domain overview as the intro text
- Has empty sections array

---

## Content Guidelines

### Writing Style

**Titles & Headings:**
- Use title case (e.g., "Backend Development")
- Be concise and descriptive
- Avoid acronyms in titles unless widely known

**Subtitles:**
- Use sentence case or lowercase
- Brief description (5-10 words)
- Complement the title with specifics

**Overview:**
- 2-4 sentences
- Lead with years of experience or key achievement
- Highlight scale/impact where possible
- Mention current approach or focus

**Intro (Topic):**
- 1-3 sentences
- Set context for the topic
- Mention breadth of experience

**Content (Section):**
- Use clear, professional language
- Lead with accomplishments
- Include specific examples where possible
- Keep paragraphs focused (3-5 sentences)

### Skill Tags

**Format:**
- Use proper product/technology names (e.g., "PostgreSQL" not "postgres")
- Mix of technologies, patterns, and concepts
- 4-8 tags per topic is ideal
- Prioritize most relevant/impressive skills first

**Example:**
```json
"skillTags": [
  "Java",
  "Spring Boot",
  "Microservices",
  "Event-Driven Architecture",
  "Apache Kafka",
  "PostgreSQL"
]
```

### Badge Values

**Experience:**
- Use range format: "5+ Years", "10+ Years"
- Be conservative (round down)

**Approach/Philosophy:**
- One or two words: "Full-Stack", "Cloud-Native", "AI Enabled"

**Technologies:**
- List 2-4 primary technologies
- Use commas: "Java, C#, Vue.js"

---

## File Naming Conventions

### Domain Data Files

**Pattern:** `experience/[domain-name].json`

**Examples:**
- `experience/software.json`
- `experience/cloud.json`
- `experience/devops.json`
- `experience/data.json`
- `experience/security.json`
- `experience/leadership.json`

**Location:** `src/data/experience/`

### Configuration Mapping

Each file must be mapped in `ExperienceView.vue` in the `domainCards` array:

```javascript
const domainCards = [
  {
    name: 'software',
    path: 'software.json',
    title: 'Software Engineering',
    subtitle: 'Full-stack development and architecture',
    // ... other properties
  },
  // ... other domains
]
```

And in the import switch statement:

```javascript
switch (domain.path) {
  case 'software.json':
    module = await import('../data/experience/software.json?raw')
    break
  // ... other cases
}
```

**Note:** Both the domainCards array and import switch must be updated when adding a new domain.

---

## Future Enhancements

### Potential Content Improvements

**1. Markdown Support:**
Add markdown rendering for richer content formatting in sections:

```typescript
interface Section {
  heading: string
  content: string
  format?: 'text' | 'markdown'  // NEW
}
```

**2. Content Management:**
If content volume grows significantly, consider:
- **Headless CMS** (Sanity, Contentful) for web-based editing
- **Git-based CMS** (Netlify CMS) to keep content in repository
- **SQLite** for embedded database with query capabilities

**3. Validation:**
Add JSON Schema or Zod validation in CI pipeline to catch errors before deployment

---

## Validation Tools

### JSON Schema Validation

Future enhancement: Create JSON Schema definition for validation.

**Example JSON Schema:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["title", "overview", "badges", "categories"],
  "properties": {
    "title": { "type": "string", "minLength": 1 },
    "overview": { "type": "string", "minLength": 10 },
    "badges": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["label", "value", "icon"],
        "properties": {
          "label": { "type": "string" },
          "value": { "type": "string" },
          "icon": { "type": "string" }
        }
      }
    }
  }
}
```

### TypeScript Validation

Runtime validation using TypeScript:

```typescript
import type { ExperienceContent } from '@/types/experience'

function validateExperienceContent(data: unknown): data is ExperienceContent {
  // Runtime validation logic
  // Return true if valid, false otherwise
}
```

Or using libraries like Zod:

```typescript
import { z } from 'zod'

const BadgeSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  icon: z.string()
})

const ExperienceSchema = z.object({
  title: z.string().min(1),
  overview: z.string().min(10),
  badges: z.array(BadgeSchema).min(1),
  categories: z.array(CategorySchema).min(1)
})

// Validate at runtime
const result = ExperienceSchema.safeParse(jsonData)
```

---

## Content Authoring Workflow

### Current Workflow

1. Edit JSON file in `src/data/` (either `services/` or `experience/` subdirectory)
2. Follow schema structure defined in `src/types/`
3. Save file
4. Vite dev server hot-reloads changes
5. View changes immediately in browser

### Best Practices

1. **Validate JSON Syntax:**
   ```bash
   # Use jq to validate
   cat src/data/services/ai.json | jq '.'
   ```

2. **Image Paths:**
   - Brand assets: `/images/brand/`
   - Partner logos: `/images/partners/`

3. **Consistent Formatting:**
   - Use proper title case for headings
   - Keep consistent tone across services
   - Use similar structure for related sections

---

## Related Documentation

- `ARCHITECTURE.md` - Technical architecture and patterns
- `IMPLEMENTATION-STATUS.md` - Current implementation state
- `COMPONENTS.md` - Component library catalog
- `DESIGN-SYSTEM.md` - Design patterns and guidelines
- `RESPONSIVE-DESIGN.md` - Responsive design strategy
- `ATTRIBUTIONS.md` - Image attribution tracking
- `CLAUDE.md` - Claude Code project instructions

---

## Quick Reference

### Adding a New Domain

1. Create JSON file: `src/data/experience/new-domain.json`
2. Follow ExperienceContent schema (see `src/types/experience.ts`)
3. Add domain card to `ExperienceView.vue` domainCards array:
   ```javascript
   const domainCards = [
     // ... existing domains
     {
       name: 'new-domain',
       path: 'new-domain.json',
       title: 'New Domain Title',
       subtitle: 'Brief description',
       icon: '🎯',
       stats: [
         { value: 'Stat1', label: 'Label1' },
         { value: 'Stat2', label: 'Label2' },
         { value: 'Stat3', label: 'Label3' }
       ],
       tags: ['Tag1', 'Tag2', 'Tag3'],
       borderColor: 'border-l-teal-500'
     }
   ]
   ```
4. Add import case in `ExperienceView.vue` switch statement:
   ```javascript
   case 'new-domain.json':
     module = await import('../data/experience/new-domain.json?raw')
     break
   ```

### Adding a New Service

1. Create JSON file: `src/data/services/{name}.json`
2. Follow ServiceContent schema (see "Complete Service File Structure" above)
3. Add service card configuration in `ServicesView.vue`:
   ```javascript
   const serviceCards = [
     {
       name: '{name}',
       path: '{name}.json',
       icon: '📦',
       label: 'Service Label',
       title: 'Service Title',
       tagline: 'Service tagline',
       stats: [
         { value: 'Stat1', label: 'Label1' },
         { value: 'Stat2', label: 'Label2' },
         { value: 'Stat3', label: 'Label3' }
       ],
       tags: ['Tag1', 'Tag2', 'Tag3'],
       borderColor: 'border-cyan-500/30',
       bgColor: 'bg-[#0a0a0a]',
       visualStyle: 'gradient',
       heroImage: '/images/hero-{name}.jpg'
     }
   ]
   ```
4. Add import case in `ServicesView.vue` switch statement:
   ```javascript
   case '{name}.json':
     module = await import('../data/services/{name}.json?raw')
     break
   ```
5. Service will automatically appear in the services grid

### Adding Content to Existing Domain

1. Open domain JSON file in `src/data/experience/`
2. Navigate to appropriate category in `categories` array
3. Add new topic to `topics` array:
   ```json
   {
     "title": "New Topic",
     "subtitle": "Description",
     "skillTags": ["Skill1", "Skill2"],
     "intro": "Introduction...",
     "sections": [
       {
         "heading": "Heading",
         "content": "Content..."
       }
     ]
   }
   ```
4. Save file - changes hot reload automatically

### Validating JSON Files

```bash
# Use jq to validate JSON syntax
cat src/data/experience/software.json | jq '.'

# Pretty print
cat src/data/experience/software.json | jq '.' > temp.json
mv temp.json src/data/experience/software.json
```
