# TODO

Active tasks and pending work for idevelop.tech.

---

## Pre-Launch Tasks

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

### Monitoring & Observability

**Priority**: Medium - Alert configuration pending

**Status**: ✅ New Relic integration complete and deployed

**Platform**: New Relic (100 GB/month free tier)

**Pending Tasks**:
- [ ] Configure alert policies (Lambda errors, high error rates, performance degradation)
- [ ] Test alerts with intentional errors
- [ ] Document alerting runbook

**Reference**:
- Dashboard: https://one.newrelic.com (Account ID: 7377610)
- Documentation: `docs/NEW-RELIC-MONITORING.md`
- Implementation: `sst.config.ts`, `packages/functions/src/utils/instrument-lambda.ts`

---

### GitHub Repository Management

**Priority**: High → ✅ **COMPLETE**

**Status**: All tasks completed (2025-11-14)

**Completed Tasks**:

#### Branch Cleanup
- [x] Review all existing branches
- [x] Delete merged/stale branches (27 local + remotes deleted)
- [x] Verify only main, develop, and 1-2 active feature branches remain

#### Branch Protection Rules
- [x] Enable branch protection for `main`
  - [x] Require pull request before merging
  - [x] Require status checks: PR Checks, CodeQL
  - [x] Enforce for admins (no bypass allowed)
  - [x] No force pushes or deletions
- [x] Enable branch protection for `develop`
  - [x] Require pull request before merging
  - [x] Require status checks: PR Checks
  - [x] Enforce for admins (no bypass allowed)
  - [x] No force pushes or deletions

#### Branch Management Strategy
- [x] Enable automatic branch deletion after merge (via GitHub API)
- [x] Document branch lifecycle in BRANCH-STRATEGY.md
  - [x] Create feature branch → PR → Merge → Auto-delete
  - [x] Only 1-2 active feature branches at a time
- [x] Add branch naming conventions to CLAUDE.md
- [x] Add GitHub Repository Configuration section to docs/SETUP.md

**Result**: Repository now maintains clean branch structure with automated cleanup

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

**Status**: ✅ Ready to proceed (AWS SES production access approved)

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

**Status**: ✅ Ready to deploy (same New Relic account, stage-aware config)

**Solution**: New Relic (100 GB/month free tier - same account for dev and prod)

**Tasks**:
- [x] Set production SST secret: `npx sst secret set NewRelicLicenseKey LICENSE_KEY --stage production`
- [ ] Deploy to production (observability already configured in sst.config.ts)
- [ ] Verify `api-idevelop-tech` service appears in New Relic
- [ ] Test with contact form submission on production domain
- [ ] Configure production-specific alert policies (stricter thresholds than dev)
- [ ] Set up CloudFront production monitoring (optional)
- [ ] Set up external uptime monitoring (optional - UptimeRobot, Pingdom, etc.)
- [ ] Establish incident response runbook
- [ ] Document production alerting configuration

**Configuration**:
- **Same New Relic account** for both dev and prod (Account ID: 7377610)
- **Same license key** for both environments (best practice: separate keys, but acceptable for portfolio site)
- **Service differentiation**: Service names are environment-aware
  - Dev: `dev-api-idevelop-tech`
  - Prod: `api-idevelop-tech`
- **Alert policies**: Create separate policies for dev vs prod with different thresholds

**Reference**:
- Configuration: `sst.config.ts` (lines 24-82, stage-aware)
- Platform comparison: `docs/OBSERVABILITY-COMPARISON.md`
- Dashboard: https://one.newrelic.com
- Account ID: 7377610

**Note**: Infrastructure is fully stage-aware and ready for production deployment
