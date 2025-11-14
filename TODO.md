# TODO

Active tasks and pending work for idevelop.tech.

---

## Pre-Launch Tasks

### Code Review & Consolidation

**Priority**: High

**Status**: In Progress

**Completed**:
- [x] Conducted thorough code review across all packages
- [x] Identified and removed unused components (7 deleted)
- [x] Consolidated CheckItem components (merged 2 into 1 with variants)
- [x] Created useColorScheme composable (eliminated 12+ duplications)
- [x] Created BeforeAfterComparison component (saved ~250 lines)
- [x] Checked for unused imports, variables, functions (18 issues fixed)
- [x] Verified TypeScript strict mode compliance (0 errors)
- [x] Updated Tailwind CSS gradient classes to v4 canonical names (54 classes)
- [x] Fixed ESLint configuration to use TypeScript and Prettier configs
- [x] Removed all ESLint errors (18 errors → 0 errors, 4 warnings remain)
- [x] Service page consolidation (eliminated ~225 lines of duplication)
  - [x] Created useBreadcrumbNavigation composable (removed router boilerplate from 6 pages)
  - [x] Created useServiceMeta composable (standardized SEO for service pages)
  - [x] Created usePageMeta composable (generic meta handler for all pages)
  - [x] Created TabNavigation component (eliminated ~48 lines of tab markup)
  - [x] Updated all 6 service views + FlxpointConsultingView to use new patterns
  - [x] Fixed all TypeScript and ESLint errors from refactoring (7 errors → 0 errors)
  - [x] Updated SEO.md documentation to reflect new composable patterns
- [x] Reviewed component patterns for consistency (service pages)

**Tasks**:
- [ ] Review error handling patterns
- [ ] Consolidate similar utilities/helpers
- [ ] Review component patterns for consistency (non-service pages)
- [ ] Add ESLint to CI/CD pipeline (GitHub Actions workflow)
  - [ ] Add `npm run lint` to PR Checks workflow
  - [ ] Configure as required status check for PRs
  - [ ] Update CLAUDE.md with ESLint enforcement policy
- [x] Add Tailwind CSS class validation to development process
  - [x] Research Tailwind CSS linting options (custom script vs stylelint)
    - **Finding**: No CLI tool exists for validating Tailwind classes in templates/HTML for v4
    - **Tested**: `eslint-plugin-tailwindcss` v4.0.0-beta.0 (broken - "Could not resolve tailwindcss")
    - **Tested**: `@poupe/eslint-plugin-tailwindcss` (CSS files only, not templates)
    - **Tested**: `@tailwindcss/vite` plugin (performance only, no diagnostics)
    - **Tested**: Tailwind CLI (build only, no validation commands)
    - **Conclusion**: VSCode Tailwind CSS IntelliSense warnings are NOT available via CLI
    - **Current Approach**: Manual fixes based on VSCode warnings
  - [x] Fixed canonical class name issues (44 replacements)
    - `min-h-[36px]` → `min-h-9` (10 instances)
    - `min-h-[52px]` → `min-h-13` (10 instances)
    - `flex-shrink-0` → `shrink-0` (30 instances)
    - `z-[60]` → `z-60` (3 instances)
  - [ ] Monitor `eslint-plugin-tailwindcss` for stable v4 support (check quarterly)
  - [ ] Periodically review VSCode warnings and fix manually
  - [ ] Update CLAUDE.md with Tailwind CSS best practices

---

### DeepSource Issues

**Priority**: Medium → ✅ **COMPLETE**

**Status**: All critical issues resolved (15 issues fixed)

**Solution Implemented** (2025-11-14):
- ✅ Fixed Issue #1 (JS-0047): Added default case to switch statement in logger.ts
- ✅ Fixed Issues #2-15 (JS-0682): Added explicit default values for 14 optional props across 8 Vue components
- ✅ Enabled ESLint rules to catch these issues locally before PR builds
  - `vue/require-default-prop`: "warn" - catches missing prop defaults
  - `default-case`: "warn" - catches missing switch default cases
- ✅ All type checks passing (0 errors)
- ✅ All lint checks passing (0 errors, only intentional console warnings)

**Local Validation Workflow**:
```bash
npm run lint        # Catches prop defaults, switch defaults, unused vars
npm run type-check  # Catches TypeScript errors
npm run format      # Ensures consistent formatting
```

**Reference**: https://app.deepsource.com/gh/mattlucian/idevelop.tech/

**Remaining Tasks**:
- [ ] Review any remaining DeepSource issues (if new ones appear)
- [ ] Add ESLint to CI/CD pipeline (see Code Review section above)

---

### Service Worker & PWA

**Priority**: High → ✅ **COMPLETE**

**Issue**: Install popup on mobile feels "scammy" and may reduce trust

**Solution Implemented** (2025-11-14):
- ✅ Added `beforeinstallprompt` event handler to suppress browser's native install popup
- ✅ Service worker remains active for offline caching and performance benefits
- ✅ Users can still install via browser's passive UI (Chrome: address bar icon, Safari: Share menu)
- ✅ Industry best practice: Same approach as GitHub, Twitter, YouTube, Spotify

**Implementation**:
- Modified `packages/web/src/main.ts` to prevent default install prompt
- Stores `deferredPrompt` for potential future contextual use (not currently shown)
- Service worker continues to provide PWA benefits without aggressive UX

**Testing Required**:
- [ ] Test on mobile device (iOS Safari, Chrome Android) to verify no install popup
- [ ] Verify Lighthouse PWA check still passes (expected: yes)
- [ ] Confirm service worker caching still works (offline functionality)
- [ ] Check browser console for any PWA-related warnings

**Current Behavior**: Service worker active, install prompt suppressed
**Result**: PWA capabilities with professional, non-intrusive experience

---

### Monitoring & Observability (Dev Environment)

**Priority**: High - Complete before launch

**Status**: Deciding on monitoring solution

**Options**:
- DataDog Lambda monitoring
- Alternative solutions (AWS CloudWatch Insights, Sentry, etc.)
- Cost evaluation needed

**Tasks**:
- [ ] Choose monitoring solution
- [ ] Set up monitoring on dev environment
- [ ] Configure Lambda monitoring (errors, latency, invocations)
- [ ] Configure CloudFront monitoring (cache hit rate, errors)
- [ ] Set up alerting for critical errors
- [ ] Test monitoring with intentional errors
- [ ] Verify alerts trigger correctly
- [ ] Document monitoring setup

**Note**: Must be complete before domain migration/launch

---

### GitHub Repository Management

**Priority**: High

**Tasks**:

#### Branch Cleanup
- [ ] Review all existing branches
- [ ] Delete merged/stale branches
- [ ] Verify only main, develop, and 1-2 active feature branches remain

#### Branch Protection Rules
- [ ] Enable branch protection for `main`
  - [ ] Require pull request before merging
  - [ ] Require status checks: PR Checks, CodeQL
  - [ ] Require approvals (if team expands)
  - [ ] Do not allow bypassing
- [ ] Enable branch protection for `develop`
  - [ ] Require pull request before merging
  - [ ] Require status checks: PR Checks
  - [ ] Allow fast-forward merges

#### Branch Management Strategy
- [ ] Enable automatic branch deletion after merge (Settings → General)
- [ ] Document branch lifecycle in BRANCH-STRATEGY.md
  - Create feature branch → PR → Merge → Auto-delete
  - Only 1-2 active feature branches at a time
- [ ] Add branch naming conventions to CLAUDE.md (if not present)

**Goal**: Keep repository clean with only main, develop, and 1-2 active branches

---

### Enhanced README

**Priority**: High

**Goal**: Professional, visual README that showcases project quality

**Tasks**:

#### Visual Diagrams
- [ ] Create branch & CI/CD flow diagram
  - Show: feature/* → PR → develop → test → PR → main → production
  - Include: Auto-deployments, status checks, CodeQL scans
  - Format: Mermaid diagram or embedded image
- [ ] Create architecture diagram (optional)
  - High-level: Frontend → API Gateway → Lambda → DynamoDB/SES
  - Link to detailed ARCHITECTURE.md

#### Badges & Status
- [ ] Add all relevant badges at top
  - [x] Deploy Production status (already present)
  - [x] PR Checks status (already present)
  - [x] DeepSource active issues (already present)
  - [x] DeepSource resolved issues (already present)
  - [x] License badge (already present)
  - [ ] CodeQL status badge
  - [ ] Lighthouse CI scores (if possible)
  - [ ] Test coverage (if applicable)
- [ ] Verify all badges link to correct dashboards

#### Content Enhancement
- [ ] Add "Why This Project?" section
  - Showcase architectural decisions
  - Highlight DevOps best practices
  - Emphasize type safety, security, monitoring
- [ ] Add "Key Features" section with visual callouts
- [ ] Improve "Quick Start" with collapsible sections
- [ ] Add "Contributing" section (even if solo project)
- [ ] Include screenshots/GIFs of key features (optional)

#### Professional Polish
- [ ] Consistent formatting throughout
- [ ] Clear hierarchy and navigation
- [ ] Concise but comprehensive
- [ ] Links to all relevant documentation
- [ ] Code examples where helpful

**Reference**: Review top open-source projects for README inspiration

---

### Documentation Review

**Priority**: Medium

**Trigger**: After code review & consolidation

**Tasks**:
- [ ] Review all documentation for accuracy after code changes
- [ ] Update ARCHITECTURE.md if patterns changed
- [ ] Update frontend docs if components changed
- [ ] Verify README accuracy
- [ ] Check CLAUDE.md for outdated patterns
- [ ] Ensure no orphaned documentation references

---

## Domain Migration

**Blocked by**: AWS SES production access approval

**Tasks**:
- [ ] Confirm AWS SES production access granted
- [ ] Update `sst.config.ts` to enable custom domain for production
- [ ] Deploy to production (triggers certificate request and DNS setup)
- [ ] Verify certificate validation complete
- [ ] Update DNS records at registrar to point to CloudFront
- [ ] Wait for DNS propagation (~5-30 minutes)
- [ ] Test https://idevelop.tech loads correctly
- [ ] Verify SSL certificate valid
- [ ] Test contact form with production domain
- [ ] Update `.env.production` with production domain URLs (if needed)
- [ ] Monitor CloudFront metrics for 24 hours

**Current State**:
- Production site: https://dxeay6n8brs8g.cloudfront.net
- Target domain: https://idevelop.tech

---

## Post-Launch Tasks

### Production Monitoring & Observability

**Priority**: High - Complete shortly after launch

**Status**: TBD

**Tasks**:
- [ ] Deploy monitoring solution to production (same as dev)
- [ ] Configure production-specific alerts
- [ ] Set up error tracking for production Lambda
- [ ] Configure CloudFront production monitoring
- [ ] Set up uptime monitoring (optional)
- [ ] Establish incident response process
- [ ] Document production monitoring setup

**Note**: Should use same solution as dev environment for consistency
