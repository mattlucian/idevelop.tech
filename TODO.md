# TODO

Active tasks and pending work for idevelop.tech.

---

## Completed Tasks ✅

### Google Analytics Integration
**Status**: ✅ **COMPLETE** (2025-11-19)

**Implementation**:
- ✅ GA4 tracking with measurement ID `G-XS6QVSG7MS`
- ✅ Cookie consent-based (GDPR compliant)
- ✅ SPA pageview tracking via Vue Router integration
- ✅ Environment-specific (production only)
- ✅ Privacy settings (IP anonymization, secure cookies)

**Solution**: Fixed gtag initialization by using Google's exact implementation pattern (`arguments` object instead of rest parameters).

**Reference**: `docs/OBSERVABILITY.md` (Frontend Analytics section)

---

### Monitoring & Observability
**Status**: ✅ **COMPLETE**

**Backend**: New Relic APM with Lambda monitoring and alerts
**Frontend**: Google Analytics 4 with SPA tracking

**Reference**: `docs/OBSERVABILITY.md`

---

### GitHub Repository Management
**Status**: ✅ **COMPLETE**

- Branch protection for `main` and `develop`
- Automatic branch deletion after merge
- Branch cleanup completed (27 branches removed)

**Reference**: `docs/BRANCH-STRATEGY.md`

---

### DeepSource Issues
**Status**: ✅ **COMPLETE**

All 15 critical issues resolved with ESLint rules enabled.

**Reference**: https://app.deepsource.com/gh/mattlucian/idevelop.tech/

---

### Service Worker & PWA
**Status**: ✅ **COMPLETE**

Suppressed install prompt while maintaining PWA benefits.

---

## Active Tasks

### Domain Migration
**Priority**: High
**Status**: Ready to proceed (AWS SES production access approved)

**Tasks**:
- [ ] Deploy with custom domain enabled in `sst.config.ts`
- [ ] Verify certificate validation complete
- [ ] Update DNS records at registrar to point to CloudFront
- [ ] Test https://idevelop.tech loads correctly
- [ ] Verify SSL certificate valid
- [ ] Test contact form with production domain
- [ ] Monitor CloudFront metrics for 24 hours

**Current State**:
- Production site: https://dxeay6n8brs8g.cloudfront.net
- Target domain: https://idevelop.tech

---

### Documentation Review (Optional)
**Priority**: Low
**Trigger**: After significant code changes

**Tasks**:
- [ ] Review ARCHITECTURE.md for accuracy
- [ ] Update frontend docs if component patterns changed
- [ ] Verify CLAUDE.md reflects current practices
- [ ] Check for orphaned documentation references

**Note**: Documentation is currently up-to-date with recent GA implementation and branch strategy updates.

---

## Post-Launch Tasks

*To be added as needed after domain migration completes*
