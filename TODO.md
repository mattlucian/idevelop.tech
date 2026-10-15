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
**Status**: Removed (2026-10)

The cache-first service worker served pages without checking the server, so visitors saw the previous deploy. Replaced by plain HTTP caching (pages `no-store`, hashed assets immutable). `public/sw.js` only retires the old worker in returning visitors' browsers; delete it once those registrations have aged out (2027).

---

## Active Tasks

### Offerings Detail & Notes Section
**Priority**: High
**Status**: Service pages redesigned and prerendering added on `feature/offerings-and-notes`; verifying on dev

**Tasks**:
- [ ] Verify on dev.idevelop.tech: service pages at mobile/tablet/desktop, prerendered HTML, link previews
- [ ] Confirm client permissions and testimonial wording before production deploy
- [ ] Write the AI Enablement guide ("Levels of AI Adoption"), then publish it and add it to the sitemap
- [ ] Later guides for the other services (MCP next)

**Reference**: local working plan in `planning/` (git-excluded)

---

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
