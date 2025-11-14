# Final Documentation Centralization Strategy

**Created**: 2025-11-14
**Type**: Temporary planning document (delete after completion)

---

## Frontend Docs Analysis: Abstract vs. Keep

### Documents to ABSTRACT (Move to /docs)

#### 1. **ARCHITECTURE.md** → `/docs/ARCHITECTURE.md`
**Why abstract**:
- Currently only covers Vue frontend (components, views, router)
- Should cover full-stack: SST monorepo, Lambda functions, API Gateway, DynamoDB, SES
- System architecture is project-wide, not frontend-specific
- Needs sections for: Backend architecture, Infrastructure (SST), CI/CD, Deployment

**Action**: Expand and move to `/docs/ARCHITECTURE.md`

---

### Documents to KEEP in Frontend

#### 2. **COMPONENT-RULES.md** → `/docs/frontend/COMPONENT-RULES.md`
**Why frontend-specific**:
- The 2-3 pattern rule for Vue components
- Vue Composition API patterns
- Component creation workflow specific to Vue

**Action**: Keep in `/docs/frontend/`

#### 3. **COMPONENTS.md** → `/docs/frontend/COMPONENTS.md`
**Why frontend-specific**:
- Catalog of Vue components
- Frontend component library reference
- No backend equivalent

**Action**: Keep in `/docs/frontend/`

#### 4. **CONFIGURATION.md** → `/docs/frontend/CONFIGURATION.md`
**Why frontend-specific**:
- Vite configuration
- package.json, tsconfig.json (frontend-specific)
- ESLint, Prettier, Tailwind configuration
- No SST or backend config covered

**Action**: Keep in `/docs/frontend/`

#### 5. **DATA-STRUCTURE.md** → `/docs/frontend/DATA-STRUCTURE.md`
**Why frontend-specific**:
- Vue data structures (ServicePageData, TechContent)
- TypeScript types for frontend components
- Service/tech JSON schemas for frontend

**Action**: Keep in `/docs/frontend/`

#### 6. **DESIGN-SYSTEM.md** → `/docs/frontend/DESIGN-SYSTEM.md`
**Why frontend-specific**:
- UI design tokens (colors, typography, spacing)
- Tailwind CSS patterns
- Responsive design strategy
- Component styling patterns

**Action**: Keep in `/docs/frontend/`

#### 7. **SEO.md** → `/docs/frontend/SEO.md`
**Why frontend-specific**:
- Frontend SEO implementation (meta tags)
- useMeta composable
- robots.txt, sitemap.xml
- While SEO impacts whole site, implementation is frontend

**Action**: Keep in `/docs/frontend/`

---

## Final Centralized Structure

```
idevelop.tech/
├── README.md                     # Main project overview (stays at root)
├── CLAUDE.md                     # AI dev guidelines (stays at root)
│
├── .github/
│   └── SECURITY.md               # Security policy (GitHub requirement)
│
├── planning/                     # TEMPORARY planning docs (can delete)
│   ├── final-documentation-strategy.md
│   ├── DOCUMENTATION-REORGANIZATION-PLAN.md
│   └── DOCUMENTATION-CENTRALIZATION-ANALYSIS.md
│
└── docs/                         # ALL PERMANENT DOCUMENTATION
    ├── PROJECT-PLAN.md           # Current status & todos (ONLY todo doc)
    ├── QUICK-START.md            # Quick reference commands
    ├── SETUP.md                  # Fork and deployment guide
    ├── BRANCH-STRATEGY.md        # Git workflow and CI/CD
    ├── CODE-SCANNING-STRATEGY.md # Security scanning tools
    ├── ARCHITECTURE.md           # ⭐ FULL-STACK architecture (expanded)
    │
    ├── frontend/                 # Frontend-specific docs
    │   ├── COMPONENT-RULES.md
    │   ├── COMPONENTS.md
    │   ├── CONFIGURATION.md
    │   ├── DATA-STRUCTURE.md
    │   ├── DESIGN-SYSTEM.md
    │   └── SEO.md
    │
    └── backend/                  # Backend-specific docs
        └── FUNCTIONS.md          # Lambda functions overview
```

**Total permanent docs**: 19 files (organized and centralized)
**Temporary planning docs**: 3 files (in /planning, easily deleted)

---

## Documents to REMOVE (Todo Lists/Milestones)

1. ✅ **LIGHTHOUSE-OPTIMIZATIONS.md** - Completed checklist (DELETE)
2. ✅ **POST-PUBLIC-CONFIGURATION.md** - One-time setup complete (DELETE)
3. ✅ **packages/web/docs/IMPLEMENTATION-STATUS.md** - 907-line status tracker (DELETE)

**Why remove**: All completed checklists with no ongoing reference value.

---

## Migration Steps

### Step 1: Remove Todo-List Documents
```bash
rm /Users/matthewlmyers/source/idevelop.tech/LIGHTHOUSE-OPTIMIZATIONS.md
rm /Users/matthewlmyers/source/idevelop.tech/POST-PUBLIC-CONFIGURATION.md
rm /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/IMPLEMENTATION-STATUS.md
```

### Step 2: Create Documentation Subdirectories
```bash
mkdir -p /Users/matthewlmyers/source/idevelop.tech/docs/frontend
mkdir -p /Users/matthewlmyers/source/idevelop.tech/docs/backend
```

### Step 3: Move & Expand ARCHITECTURE.md
```bash
# Move to docs/
mv /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/ARCHITECTURE.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/ARCHITECTURE.md

# Then expand to include:
# - SST monorepo structure
# - Backend architecture (Lambda, API Gateway)
# - Infrastructure (DynamoDB, SES)
# - CI/CD architecture
# - Deployment architecture
```

### Step 4: Move Frontend-Specific Docs
```bash
mv /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/COMPONENT-RULES.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/frontend/

mv /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/COMPONENTS.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/frontend/

mv /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/CONFIGURATION.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/frontend/

mv /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/DATA-STRUCTURE.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/frontend/

mv /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/DESIGN-SYSTEM.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/frontend/

mv /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/SEO.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/frontend/

# Remove now-empty directory
rmdir /Users/matthewlmyers/source/idevelop.tech/packages/web/docs
```

### Step 5: Move Backend Docs
```bash
mv /Users/matthewlmyers/source/idevelop.tech/packages/functions/README.md \
   /Users/matthewlmyers/source/idevelop.tech/docs/backend/FUNCTIONS.md
```

### Step 6: Remove packages/web/docs/README.md
```bash
rm /Users/matthewlmyers/source/idevelop.tech/packages/web/docs/README.md
```
**Why**: This was an index to frontend docs - no longer needed with centralized structure

### Step 7: Update CLAUDE.md Documentation References
Update all paths in CLAUDE.md from:
- `packages/web/docs/` → `docs/frontend/`
- `packages/functions/src/contact.ts` → Keep as-is (code reference)
- Add reference to `docs/ARCHITECTURE.md` for full-stack architecture

---

## Benefits of This Structure

### Clear Separation
- ✅ Frontend-specific docs in `/docs/frontend/`
- ✅ Backend-specific docs in `/docs/backend/`
- ✅ Project-wide docs in `/docs/` root

### Full-Stack ARCHITECTURE.md
- ✅ Covers entire system, not just frontend
- ✅ SST monorepo structure
- ✅ Backend architecture (Lambda, API Gateway, DynamoDB, SES)
- ✅ CI/CD and deployment architecture

### Temporary Planning Docs Separated
- ✅ `/planning/` directory for temporary analysis/planning
- ✅ Clear what can be deleted after completion
- ✅ No confusion with permanent documentation

### Easy Navigation
- ✅ All docs in one `/docs/` tree
- ✅ Clear subdirectories for specific areas
- ✅ `docs/PROJECT-PLAN.md` as the ONLY todo list

---

## After Completion: Delete /planning

Once all tasks complete and permanent docs updated:
```bash
rm -rf /Users/matthewlmyers/source/idevelop.tech/planning
```

This removes all temporary planning documents cleanly.
