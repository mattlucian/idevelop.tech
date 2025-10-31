# Component Creation Rules

**MANDATORY rules for creating and using components. All developers and AI assistants must follow these rules.**

---

## 🔴 Core Rule: The 2-3 Pattern Rule

**If you create the same UI pattern 2-3+ times, you MUST extract it into a reusable component.**

**Why:**

- Consistency across the app
- Single place for changes
- TypeScript type safety
- Reduced code duplication

---

## When to Create a Component

**CREATE a component when:**

- Pattern appears 2-3+ times
- Consistent styling across usages
- Predictable variations (size, color, state)
- Reusable UI element

**DON'T create a component when:**

- Pattern is unique to one location
- One-off design with no reuse potential
- Too simple (single div with one class)
- Page-specific layout that won't be reused

---

## Component Creation Workflow

**1. Design**

- [ ] Identify all variations across codebase
- [ ] Define TypeScript prop interface
- [ ] Support common variants (size, color, state)
- [ ] Use sensible defaults with `withDefaults()`
- [ ] Include slots for flexible content

**2. Implementation**

- [ ] Create in appropriate `/src/components/` subdirectory
- [ ] Use PascalCase naming (`PrimaryButton.vue`)
- [ ] Use `<script setup lang="ts">` syntax with proper order: `<script>` → `<template>` → `<style>`
- [ ] Define all interfaces in `/src/types/` (shared or domain-specific), import into component
- [ ] Add JSDoc comments for all props
- [ ] Define emits with TypeScript: `defineEmits<{ 'multi-word': [] }>()` (use kebab-case)
- [ ] Always use dynamic color props (`colorScheme`) for theme flexibility

**3. Migration**

- [ ] Find all pattern instances (use Grep/Glob)
- [ ] Import component in each file
- [ ] Replace old markup with component
- [ ] Verify functionality preserved
- [ ] Test responsive behavior (320px, 768px, 1024px+)
- [ ] Add to `/docs/COMPONENTS.md` catalog

---

## Component Catalog

**📚 See [COMPONENTS.md](./COMPONENTS.md) for the complete catalog.**

---

## Component Organization

**Directory structure:**

```
/src/components/
├── elements/        # Basic UI building blocks
│   ├── buttons/     # Button variants
│   ├── badges/      # Badge variants
│   └── interactive/ # Interactive elements
├── cards/           # Card-based components
├── ui/              # Complex UI components
├── display/         # Data display components
├── layout/          # Global layout components (Navigation, Footer)
└── integration/     # Integration-specific visualizations
```

**Naming conventions:**

- **PascalCase** for all component files (`PrimaryButton.vue`)
- **Descriptive names** that indicate purpose (`IconButton` not `CircleBtn`)
- **Variant suffixes** when appropriate (`PrimaryButton`, `SecondaryButton`)
- **Organize by category** based on component purpose

---

## TypeScript Component Patterns

**Props interface (always define in `/src/types/`):**

```typescript
// /src/types/shared/ui.ts or domain-specific file
export interface ButtonProps {
  /** JSDoc comment describing the prop */
  title: string
  /** Optional color variant (cyan for services, emerald for tech) */
  colorScheme?: 'cyan' | 'emerald' | 'purple'
  /** Whether the button is disabled */
  disabled?: boolean
}
```

```vue
<!-- Component file -->
<script setup lang="ts">
import type { ButtonProps } from '@/types/shared/ui'

const props = withDefaults(defineProps<ButtonProps>(), {
  colorScheme: 'cyan',
  disabled: false,
})
</script>
```

**Emits definition (use kebab-case for multi-word events):**

```vue
<script setup lang="ts">
const emit = defineEmits<{
  click: []
  'schedule-call': []
  'update-value': [value: string]
}>()
</script>
```

**Color scheme pattern:**

```vue
<script setup lang="ts">
import { computed } from 'vue'

const colorClasses = computed(() => ({
  text: {
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    purple: 'text-purple-400',
  }[props.colorScheme],
  bg: {
    cyan: 'bg-cyan-500/10 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 border-emerald-500/20',
    purple: 'bg-purple-500/10 border-purple-500/20',
  }[props.colorScheme],
}))
</script>

<template>
  <div :class="colorClasses.bg">
    <h2 :class="colorClasses.text">{{ title }}</h2>
  </div>
</template>
```

**Slot usage:**

```vue
<template>
  <div class="card">
    <!-- Default slot for main content -->
    <slot />

    <!-- Named slot for actions -->
    <div v-if="$slots.actions" class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>
```

**Lifecycle cleanup pattern:**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
```

---

## Component Quality Checklist

**Before completing migration:**

- [ ] All variants tested (sizes, colors, states)
- [ ] Responsive behavior verified (320px, 768px, 1024px+)
- [ ] TypeScript: `npm run type-check` passes
- [ ] Code formatted: `npm run format` executed
- [ ] No console errors or warnings
- [ ] Component added to `/docs/COMPONENTS.md`

---

## When to Componentize

**If any UI pattern appears 2-3+ times in the codebase, extract it to a component.**

See [COMPONENTS.md](./COMPONENTS.md) for existing components to reuse before creating new ones.

---

## Enforcement

**This is MANDATORY:**

- PRs with duplicated patterns will be rejected
- Claude must follow these rules
- Err on the side of creating components - easier to merge than refactor duplicates
