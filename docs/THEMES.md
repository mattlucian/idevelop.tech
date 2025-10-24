# Service Detail Themes

This document explains the theme system for customizing the visual presentation of service and tech detail pages.

## Overview

The theme system allows each service/tech section to have its own unique layout and visual presentation. Themes are self-contained Vue components that can be easily added, modified, or removed without changing parent views.

## Architecture

### Directory Structure

```
/src/components/themes/
├── DefaultTheme.vue      # Standard service layout with benefits, stats, visuals, CTA
├── OverviewTheme.vue     # Data-driven overview for service introduction
├── ProcessTheme.vue      # Workflow visualization with 3 style variants
├── OptionsTheme.vue      # Side-by-side option cards with neutral colors
└── TechTheme.vue         # Technical expertise/experience content display
```

### How It Works

1. **JSON Configuration**: Each section specifies a `theme` property
2. **Component Registry**: ServiceView/TechView maintain theme registries
3. **Dynamic Loading**: Vue's `<component :is>` dynamically renders the theme
4. **Props Passing**: Theme components receive `section` and data as props

### Component Flow

```
JSON Data → View Component → Theme Registry → Theme Component → Rendered UI
```

## Available Themes

### DefaultTheme

**File**: `/src/components/themes/DefaultTheme.vue`
**Use**: Standard service detail presentation
**Features**:

- Cyan/purple color scheme
- Stat boxes (if stats exist)
- Grid layout for benefits (2 columns on desktop)
- Display support (workflow, diagram, code, options)
- Gradient CTA section

**JSON Example**:

```json
{
  "heading": "API Integrations",
  "tagline": "Connect platforms via REST, SOAP, GraphQL",
  "theme": "default",
  "benefits": ["Support for REST, SOAP, and GraphQL", "Secure authentication"],
  "cta": "Build reliable API connections"
}
```

### OverviewTheme

**File**: `/src/components/themes/OverviewTheme.vue`
**Use**: Service introduction sections
**Features**:

- Data-driven (pulls from serviceData.stats, whatIOffer, howItWorks)
- Dynamic stat boxes (3-column grid)
- Two-column "What I Offer" and "How It Works" cards
- Cyan/purple gradient accents
- Hover effects

**Data Requirements**:

```json
{
  "stats": [
    { "value": "Expert", "label": "On Retainer" },
    { "value": "Affordable", "label": "Access" }
  ],
  "whatIOffer": ["Retainer-based access", "Fast response times"],
  "howItWorks": ["Strategic planning", "Hands-on execution"]
}
```

**Section JSON**:

```json
{
  "heading": "Overview",
  "tagline": "Expert tech guidance without full-time cost",
  "theme": "overview"
}
```

### ProcessTheme

**File**: `/src/components/themes/ProcessTheme.vue`
**Use**: Step-by-step workflows
**Features**:

- 3 style variants (boxed, boxed-inline, timeline)
- CTA displayed at top in gradient box
- Cyan/purple color scheme
- Uses Timeline component

**Style Variants**:

- `boxed` - 2x2 grid, centered icons (4 steps)
- `boxed-inline` - 3x2 grid, left-aligned icons (6 steps)
- `timeline` - Vertical timeline with connecting line

**JSON Example**:

```json
{
  "heading": "Building an Integration",
  "tagline": "Transparent process from start to finish",
  "theme": "process",
  "visual": {
    "type": "workflow",
    "data": {
      "title": "Integration Process",
      "style": "timeline",
      "steps": [
        { "icon": "🔍", "label": "Discovery", "desc": "Map APIs and flows" },
        { "icon": "⚙️", "label": "Development", "desc": "Build logic" },
        { "icon": "🧪", "label": "Testing", "desc": "Validate data" },
        { "icon": "🚀", "label": "Deploy", "desc": "Go live" }
      ]
    }
  },
  "cta": "Fixed-fee projects with updates"
}
```

### OptionsTheme

**File**: `/src/components/themes/OptionsTheme.vue`
**Use**: Presenting multiple choices equally
**Features**:

- Neutral color rotation (cyan, purple, emerald)
- 2-3 options in responsive grid
- Each option: icon, title, description, items list
- Equal visual weight

**JSON Example**:

```json
{
  "heading": "Engagement Options",
  "tagline": "Choose what works best",
  "theme": "options",
  "visual": {
    "type": "options",
    "data": {
      "options": [
        {
          "icon": "📋",
          "title": "Project-Based",
          "description": "Focused engagements",
          "items": ["Starting at 10+ hours", "Fixed-fee pricing", "Clear deliverables"]
        },
        {
          "icon": "🔄",
          "title": "Retainer",
          "description": "Ongoing partnership",
          "items": ["10-30 hrs/month", "Fast response", "Continuous optimization"]
        }
      ]
    }
  }
}
```

### TechTheme

**File**: `/src/components/themes/TechTheme.vue`
**Use**: Technical expertise/experience content
**Features**:

- Emerald color scheme
- Topic heading and content display
- Simple, clean presentation

**Used**: Automatically by TechView for expertise content

## Creating a New Theme

### Step 1: Create Component

Create `/src/components/themes/YourTheme.vue`:

```vue
<script setup lang="ts">
import type { ServiceContent, ServiceSection } from '../../types/service'

interface Props {
  section: ServiceSection
  serviceData: ServiceContent | null
}

defineProps<Props>()
</script>

<template>
  <div>
    <h3>{{ section.heading }}</h3>
    <p>{{ section.tagline }}</p>

    <div v-if="section.benefits">
      <ul>
        <li v-for="benefit in section.benefits" :key="benefit">
          {{ benefit }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

### Step 2: Register Theme

In `/src/views/ServiceView.vue`:

```typescript
import YourTheme from '../components/themes/YourTheme.vue'

const themeComponents: Record<string, Component> = {
  default: DefaultTheme,
  overview: OverviewTheme,
  process: ProcessTheme,
  options: OptionsTheme,
  yourtheme: YourTheme, // Add here
}
```

### Step 3: Use in JSON

In `/src/data/services/{name}.json`:

```json
{
  "sections": [
    {
      "heading": "Your Section",
      "theme": "yourtheme",
      "benefits": [...]
    }
  ]
}
```

## Props Interface

All themes receive:

```typescript
interface Props {
  section: ServiceSection
  serviceData: ServiceContent | null
}

// ServiceSection includes:
{
  heading: string
  tagline?: string
  content?: string
  benefits?: string[]
  visual?: Display
  cta?: string
  theme?: 'default' | 'process' | 'overview' | 'options'
}
```

## Display Types

**Location**: `src/types/shared/display.ts`

**StepDisplay (workflows)**:

```typescript
{
  type: 'workflow'
  data: {
    title: string
    steps: Step[]
    style?: 'boxed' | 'boxed-inline' | 'timeline'
  }
}
```

**OptionsDisplay**:

```typescript
{
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

**DiagramDisplay**, **CodeDisplay** also available - see DATA-STRUCTURE.md

## Common Patterns

### Access Section Data

```vue
<template>
  <h3>{{ section.heading }}</h3>
  <p>{{ section.tagline }}</p>

  <div v-if="section.benefits?.length">
    <ul>
      <li v-for="benefit in section.benefits" :key="benefit">
        {{ benefit }}
      </li>
    </ul>
  </div>
</template>
```

### Access Service Data

```vue
<template>
  <div v-if="serviceData?.stats">
    <div v-for="stat in serviceData.stats" :key="stat.label">
      <span>{{ stat.value }}</span>
      <span>{{ stat.label }}</span>
    </div>
  </div>
</template>
```

### Use Shared Components

```vue
<script setup lang="ts">
import Timeline from '../display/Timeline.vue'
import IconCard from '../cards/IconCard.vue'
import Badge from '../elements/badges/Badge.vue'
</script>

<template>
  <Timeline :steps="section.visual.data.steps" />
  <IconCard icon="🚀" title="Feature" />
  <Badge variant="cyan">New</Badge>
</template>
```

## Styling Guidelines

### Color Schemes

**Services (Cyan/Purple)**:

```vue
<div class="text-cyan-400 border-cyan-500/20">...</div>
<div class="bg-gradient-to-r from-cyan-400 to-purple-400">...</div>
```

**Tech (Emerald)**:

```vue
<div class="text-emerald-400 border-emerald-500/20">...</div>
<div class="bg-gradient-to-r from-emerald-400 to-teal-400">...</div>
```

### Layout

- Section spacing: `mb-8`
- Subsection spacing: `mb-6`
- Grid layouts: `grid grid-cols-1 md:grid-cols-2 gap-4`
- Responsive text: `text-sm md:text-base lg:text-lg`

### Visual Effects

```vue
<!-- Gradient background -->
<div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-xl"></div>

<!-- Corner accent -->
<div class="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-bl-full"></div>

<!-- Accent bar -->
<div class="w-1 h-5 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
```

## Best Practices

### 1. Self-Contained

Each theme should be independent with no parent state dependencies (except props).

### 2. Handle Missing Data

```vue
<div v-if="section.benefits?.length">
  <!-- Benefits display -->
</div>

<div v-if="serviceData?.stats?.length">
  <!-- Stats display -->
</div>
```

### 3. Use Design System

- Follow DESIGN-SYSTEM.md patterns
- Use design tokens
- Maintain responsive breakpoints (320px, 768px, 1024px)

### 4. Reuse Components

Use existing components from:

- `/components/elements/` - Buttons, badges, utilities
- `/components/cards/` - Card variants
- `/components/display/` - Timeline

### 5. Document

For custom themes, document:

- Purpose
- Features
- JSON example

## Troubleshooting

### Theme Not Rendering

1. Check theme registered in `themeComponents`
2. Verify JSON theme name matches registry key (case-sensitive)
3. Check Vue devtools for errors

### Props Undefined

1. Ensure `defineProps<Props>()` is used
2. Check parent passes props correctly
3. Add null checks: `v-if="section && serviceData"`

### Styles Not Applied

1. Use complete class strings (not dynamic concatenation)
2. Verify Tailwind class names
3. For dynamic: `:class="['base', dynamicClass]"`

## Related Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** - Available components
- **[DATA-STRUCTURE.md](./DATA-STRUCTURE.md)** - JSON schemas
- **[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)** - Design guidelines
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
