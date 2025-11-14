# TODO

Active tasks and pending work for idevelop.tech.

---

## Pre-Launch Tasks

### Code Review & Consolidation

**Priority**: High

**Tasks**:
- [ ] Conduct thorough code review across all packages
- [ ] Identify redundant code and consolidate
- [ ] Review component patterns for consistency
- [ ] Check for unused imports, variables, functions
- [ ] Verify all TypeScript strict mode compliance
- [ ] Review error handling patterns
- [ ] Consolidate similar utilities/helpers

---

### DeepSource Issues

**Priority**: Medium

**Status**: ~28 remaining issues (mostly false positives)

**Tasks**:
- [ ] Review all remaining DeepSource issues
- [ ] Fix applicable issues (even low priority)
- [ ] Mute/suppress false positives with justification
- [ ] Document muting decisions in code comments
- [ ] Verify DeepSource shows clean state or only intentional suppressions

**Reference**: https://app.deepsource.com/gh/mattlucian/idevelop.tech/

---

### Service Worker & PWA

**Priority**: High

**Issue**: Install popup on mobile feels "scammy" and may reduce trust

**Tasks**:
- [ ] Discuss service worker implementation
- [ ] Remove/disable install popup on mobile
- [ ] Verify Lighthouse PWA check still passes without popup
- [ ] Test mobile experience without intrusive prompts
- [ ] Consider alternative PWA approaches (passive install)

**Current Behavior**: Service worker triggers install popup
**Desired Behavior**: PWA capabilities without aggressive install prompts

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
