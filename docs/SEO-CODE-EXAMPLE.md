# SEO Routing Code Changes - Concrete Examples

This document shows the **exact code changes** required to implement SEO-friendly routing while preserving the slide-out panel UX.

---

## File 1: Router Configuration

**File:** `src/router/index.ts`

### BEFORE (Current)

```typescript
routes: [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/ServicesView.vue'),
  },
  {
    path: '/hire-me',
    name: 'hire-me',
    component: () => import('../views/HireMeView.vue'),
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/ExperienceView.vue'),
  },
  // ... other routes
]
```

### AFTER (SEO-Optimized)

```typescript
routes: [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/ServicesView.vue'),
  },
  {
    path: '/services/:serviceId', // NEW: Clean service URLs
    name: 'service-detail',
    component: () => import('../views/ServicesView.vue'), // Same component!
  },
  {
    path: '/hire-me',
    name: 'hire-me',
    component: () => import('../views/HireMeView.vue'),
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/ExperienceView.vue'),
  },
  {
    path: '/experience/:domain', // NEW: Clean experience URLs
    name: 'experience-detail',
    component: () => import('../views/ExperienceView.vue'), // Same component!
  },
  // ... other routes
]
```

**Key Insight:** Both `/` and `/services/:serviceId` use the **same component**. The component checks for the param and shows/hides the panel accordingly.

---

## File 2: ServicesView Component

**File:** `src/views/ServicesView.vue`

### Change 1: selectService Function

**BEFORE:**

```typescript
const selectService = async (serviceName: string) => {
  // Update URL when selecting a service
  router.push({ name: 'home', query: { service: serviceName } })
}
```

**AFTER:**

```typescript
const selectService = async (serviceName: string) => {
  // Update URL when selecting a service (now uses route params)
  router.push({ name: 'service-detail', params: { serviceId: serviceName } })
}
```

**What changed:** `query: { service: X }` → `params: { serviceId: X }`

---

### Change 2: Route Watcher

**BEFORE:**

```typescript
// Watch for URL changes and load appropriate service
watch(
  () => route.query.service,
  async (serviceName) => {
    if (serviceName && typeof serviceName === 'string') {
      selectedServiceName.value = serviceName
      await loadServiceData(serviceName)
    } else {
      selectedServiceName.value = null
      serviceData.value = null
    }
  },
  { immediate: true },
)
```

**AFTER:**

```typescript
// Watch for URL changes and load appropriate service
// Handle both / (no param) and /services/:serviceId (with param)
watch(
  () => route.params.serviceId,
  async (serviceId) => {
    if (serviceId && typeof serviceId === 'string') {
      selectedServiceName.value = serviceId
      await loadServiceData(serviceId)
    } else {
      selectedServiceName.value = null
      serviceData.value = null
    }
  },
  { immediate: true },
)
```

**What changed:**

- Watch `route.params.serviceId` instead of `route.query.service`
- When on `/`, `serviceId` is `undefined` → panel hidden
- When on `/services/ai-enablement`, `serviceId` is `'ai-enablement'` → panel shown

---

### Change 3: loadServiceData Function

**BEFORE:**

```typescript
const loadServiceData = async (serviceName: string) => {
  try {
    let module
    const service = serviceCards.find((s) => s.name === serviceName)
    if (!service) return

    switch (service.path) {
      case 'tech-admin.json':
        module = await import('../data/services/tech-admin.json?raw')
        break
      case 'integration.json':
        module = await import('../data/services/integration.json?raw')
        break
      case 'ai.json':
        module = await import('../data/services/ai.json?raw')
        break
      case 'ecommerce.json':
        module = await import('../data/services/ecommerce.json?raw')
        break
      case 'web-design.json':
        module = await import('../data/services/web-design.json?raw')
        break
      case 'cloud-consulting.json':
        module = await import('../data/services/cloud-consulting.json?raw')
        break
      default:
        console.error(`Unknown data file: ${service.path}`)
        return
    }

    serviceData.value = JSON.parse(module.default)

    // Auto-select first section on desktop/tablet (1024px+)
    if (window.innerWidth >= 1024) {
      selectedSectionIndex.value = 0
    } else {
      selectedSectionIndex.value = -1
    }
  } catch (error) {
    console.error(`Error loading service data:`, error)
  }
}
```

**AFTER:**

```typescript
const loadServiceData = async (serviceName: string) => {
  try {
    let module
    const service = serviceCards.find((s) => s.name === serviceName)
    if (!service) return

    switch (service.path) {
      case 'tech-admin.json':
        module = await import('../data/services/tech-admin.json?raw')
        break
      case 'integration.json':
        module = await import('../data/services/integration.json?raw')
        break
      case 'ai-enablement.json': // RENAMED from ai.json
        module = await import('../data/services/ai-enablement.json?raw')
        break
      case 'ecommerce-ops.json': // RENAMED from ecommerce.json
        module = await import('../data/services/ecommerce-ops.json?raw')
        break
      case 'web-design.json':
        module = await import('../data/services/web-design.json?raw')
        break
      case 'cloud-consulting.json':
        module = await import('../data/services/cloud-consulting.json?raw')
        break
      default:
        console.error(`Unknown data file: ${service.path}`)
        return
    }

    serviceData.value = JSON.parse(module.default)

    // Auto-select first section on desktop/tablet (1024px+)
    if (window.innerWidth >= 1024) {
      selectedSectionIndex.value = 0
    } else {
      selectedSectionIndex.value = -1
    }
  } catch (error) {
    console.error(`Error loading service data:`, error)
  }
}
```

**What changed:** Updated import paths to match renamed JSON files

---

### Change 4: serviceCards Configuration

**BEFORE:**

```typescript
const serviceCards: ServiceCard[] = [
  {
    name: 'tech-admin',
    path: 'tech-admin.json',
    // ...
  },
  {
    name: 'integration',
    path: 'integration.json',
    // ...
  },
  {
    name: 'ai-enablement',
    path: 'ai.json', // Mismatch!
    // ...
  },
  {
    name: 'ecommerce-ops',
    path: 'ecommerce.json', // Mismatch!
    // ...
  },
  // ...
]
```

**AFTER:**

```typescript
const serviceCards: ServiceCard[] = [
  {
    name: 'tech-admin',
    path: 'tech-admin.json',
    // ...
  },
  {
    name: 'integration',
    path: 'integration.json',
    // ...
  },
  {
    name: 'ai-enablement',
    path: 'ai-enablement.json', // Now matches name!
    // ...
  },
  {
    name: 'ecommerce-ops',
    path: 'ecommerce-ops.json', // Now matches name!
    // ...
  },
  // ...
]
```

**What changed:** Aligned JSON filenames with service names

---

## File 3: ExperienceView Component

**File:** `src/views/ExperienceView.vue`

### Similar Changes

The ExperienceView follows the same pattern:

**Route Watcher - BEFORE:**

```typescript
watch(
  () => route.query.domain,
  async (domainName) => {
    if (domainName && typeof domainName === 'string') {
      selectedDomainName.value = domainName
      await loadDomainData(domainName)
    } else {
      selectedDomainName.value = null
      domainData.value = null
    }
  },
  { immediate: true },
)
```

**Route Watcher - AFTER:**

```typescript
watch(
  () => route.params.domain,
  async (domainName) => {
    if (domainName && typeof domainName === 'string') {
      selectedDomainName.value = domainName
      await loadDomainData(domainName)
    } else {
      selectedDomainName.value = null
      domainData.value = null
    }
  },
  { immediate: true },
)
```

**selectDomain Function - BEFORE:**

```typescript
const selectDomain = async (domainName: string) => {
  router.push({ name: 'experience', query: { domain: domainName } })
}
```

**selectDomain Function - AFTER:**

```typescript
const selectDomain = async (domainName: string) => {
  router.push({ name: 'experience-detail', params: { domain: domainName } })
}
```

---

## File 4: Navigation Component

**File:** `src/components/Navigation.vue`

### If there are direct service links in the nav

**BEFORE:**

```typescript
<router-link :to="{ name: 'home', query: { service: 'ai-enablement' } }">
  AI Services
</router-link>
```

**AFTER:**

```typescript
<router-link :to="{ name: 'service-detail', params: { serviceId: 'ai-enablement' } }">
  AI Services
</router-link>
```

---

## File Renames Required

**Services:**

```bash
mv src/data/services/ai.json src/data/services/ai-enablement.json
mv src/data/services/ecommerce.json src/data/services/ecommerce-ops.json
```

**Experience:** (No renames needed, already match)

- `comprehensive.json` ✓
- `software.json` ✓
- `cloud.json` ✓
- `devops.json` ✓
- `data.json` ✓
- `security.json` ✓
- `leadership.json` ✓

---

## URL Mapping Reference

### Services

| Card Click       | Old URL                      | New URL                      |
| ---------------- | ---------------------------- | ---------------------------- |
| Tech Admin       | `/?service=tech-admin`       | `/services/tech-admin`       |
| Integration      | `/?service=integration`      | `/services/integration`      |
| AI Enablement    | `/?service=ai-enablement`    | `/services/ai-enablement`    |
| eCommerce Ops    | `/?service=ecommerce-ops`    | `/services/ecommerce-ops`    |
| Web Design       | `/?service=web-design`       | `/services/web-design`       |
| Cloud Consulting | `/?service=cloud-consulting` | `/services/cloud-consulting` |

### Experience

| Card Click | Old URL                            | New URL                     |
| ---------- | ---------------------------------- | --------------------------- |
| Overview   | `/experience?domain=comprehensive` | `/experience/comprehensive` |
| Software   | `/experience?domain=software`      | `/experience/software`      |
| Cloud      | `/experience?domain=cloud`         | `/experience/cloud`         |
| DevOps     | `/experience?domain=devops`        | `/experience/devops`        |
| Data       | `/experience?domain=data`          | `/experience/data`          |
| Security   | `/experience?domain=security`      | `/experience/security`      |
| Leadership | `/experience?domain=leadership`    | `/experience/leadership`    |

---

## Testing the Changes

### Manual Testing Steps

1. **Home page (`/`):**
   - Should show service cards only
   - No panel visible
   - Click any card → URL changes to `/services/{service}`

2. **Service page (`/services/ai-enablement`):**
   - Should show cards + panel
   - Panel slides in from right (desktop)
   - Panel is full-screen (mobile)
   - Click [X] → navigates to `/` → panel closes

3. **Direct URL visit (`/services/ai-enablement`):**
   - Type URL directly in browser
   - Should show cards + panel immediately
   - Panel should be pre-opened

4. **Browser back button:**
   - Navigate from `/` → `/services/ai-enablement`
   - Click browser back
   - Should go to `/` and close panel

5. **Refresh page:**
   - On `/services/ai-enablement`
   - Press F5 to refresh
   - Panel should remain open

---

## Summary of Changes

**Lines Changed:** ~10-15 lines across 3 files
**Files Modified:** 3 (router, ServicesView, ExperienceView)
**Files Renamed:** 2 (ai.json, ecommerce.json)
**New Routes:** 2 (service-detail, experience-detail)

**UX Impact:** None - 100% preserved
**SEO Impact:** Significant - Clean URLs, better indexing
**Social Sharing Impact:** Significant - Proper URL structure for previews

---

## Next Step: Get Approval

Review this document and confirm:

1. ✅ The URL structure looks good
2. ✅ The UX preservation is acceptable
3. ✅ File renames are okay

Then we'll proceed with implementation!
