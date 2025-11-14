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
