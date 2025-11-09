# idevelop.tech Project Plan

**Last Updated:** 2025-11-09
**Current Phase:** Phase 5 - Backend API Implementation

---

## Project Overview

Full-stack portfolio website migration from traditional Vue app to SST monorepo with serverless backend.

**Production URL (Current):** https://dxeay6n8brs8g.cloudfront.net
**Target URL:** https://idevelop.tech
**Repository:** https://github.com/mattlucian/idevelop.tech (private, will be public after Phase 8)

---

## Phase Status

- ✅ **Phase 1:** SST migration complete
- ✅ **Phase 2:** Verification and bug fixes complete
- ✅ **Phase 3:** CI/CD pipeline configured
- ✅ **Phase 4:** Production deployment to CloudFront
- ✅ **Phase 4.5:** Security audit and public repo preparation
- 🔄 **Phase 5:** Backend API implementation (CURRENT)
- ⏳ **Phase 6:** Testing and validation
- ⏳ **Phase 7:** Custom domain migration
- ⏳ **Phase 8:** Final security audit and make repository public

---

## Phase 5: Backend API Implementation (CURRENT)

### Objective
Implement serverless contact form API with email functionality.

### Tasks

#### 5.1: Infrastructure Setup
- [ ] Add API Gateway configuration to `sst.config.ts`
- [ ] Create Lambda function resource
- [ ] Configure DynamoDB table for rate limiting
- [ ] Set up SES email service
- [ ] Configure IAM permissions

#### 5.2: Lambda Function Implementation
- [ ] Implement contact form handler (`packages/functions/src/contact.ts`)
- [ ] Add request validation
- [ ] Integrate reCAPTCHA verification
- [ ] Implement rate limiting logic
- [ ] Add SES email sending
- [ ] Add error handling and logging

#### 5.3: Secrets Management
- [ ] Store reCAPTCHA secret in AWS SSM Parameter Store
- [ ] Configure SES credentials (if needed)
- [ ] Update Lambda to read from SSM
- [ ] Verify environment-specific secrets

#### 5.4: Frontend Integration
- [ ] Update `packages/web/src/components/ui/CTAForm.vue` to call API
- [ ] Add loading states
- [ ] Add success/error messages
- [ ] Test form submission flow
- [ ] Handle API errors gracefully

#### 5.5: Local Testing
- [ ] Test Lambda function locally with SST dev mode
- [ ] Verify reCAPTCHA integration
- [ ] Test rate limiting
- [ ] Verify email delivery
- [ ] Test error scenarios

### Success Criteria
- ✅ Contact form submits successfully
- ✅ reCAPTCHA validation works
- ✅ Emails delivered to matt@idevelop.tech
- ✅ Rate limiting prevents abuse
- ✅ Error handling works correctly
- ✅ All TypeScript checks pass
- ✅ Frontend shows appropriate feedback

### Reference Documentation
- `docs/CTA-FORM-IMPLEMENTATION-PLAN.md` - Detailed API implementation plan
- `packages/web/docs/COMPONENTS.md` - CTAForm component documentation

---

## Phase 6: Testing and Validation

### Objective
Thoroughly test all functionality before domain migration.

### Tasks

#### 6.1: Frontend Testing
- [ ] Manual testing on all pages (Home, Services, Hire Me, Tech, etc.)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify all navigation works
- [ ] Check images and assets load
- [ ] Test cookie consent
- [ ] Verify Google Analytics tracking

#### 6.2: Backend Testing
- [ ] Test contact form with valid data
- [ ] Test contact form with invalid data
- [ ] Test rate limiting (submit multiple times)
- [ ] Test reCAPTCHA failure scenarios
- [ ] Verify email formatting and content
- [ ] Test from different browsers/devices

#### 6.3: Performance Testing
- [ ] Check page load times
- [ ] Verify CloudFront caching
- [ ] Test API response times
- [ ] Check bundle sizes

#### 6.4: Security Testing
- [ ] Verify no secrets exposed in frontend
- [ ] Test CORS configuration
- [ ] Verify HTTPS enforcement
- [ ] Test input sanitization
- [ ] Verify rate limiting effectiveness

#### 6.5: Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### Success Criteria
- ✅ All features work as expected
- ✅ No console errors
- ✅ Forms submit successfully
- ✅ Emails received
- ✅ Performance acceptable (<3s page load)
- ✅ Mobile experience good
- ✅ No security issues found

---

## Phase 7: Custom Domain Migration

### Objective
Point idevelop.tech domain to new CloudFront distribution.

### Tasks

#### 7.1: DNS Preparation
- [ ] Document current DNS records (backup)
- [ ] Review current idevelop.tech configuration (Wix)
- [ ] Plan migration timeline
- [ ] Notify stakeholders (if any)

#### 7.2: SST Domain Configuration
- [ ] Uncomment domain config in `sst.config.ts`
- [ ] Create PR with domain changes
- [ ] Review and approve PR
- [ ] Merge to main (triggers deployment)

#### 7.3: AWS Certificate & DNS
- [ ] Wait for ACM certificate request
- [ ] Verify certificate validation (automatic via Route 53)
- [ ] Wait for DNS propagation (~5-30 minutes)
- [ ] Verify A record created (idevelop.tech → CloudFront)
- [ ] Verify CNAME created (www.idevelop.tech → idevelop.tech)

#### 7.4: Domain Verification
- [ ] Test https://idevelop.tech loads correctly
- [ ] Test https://www.idevelop.tech redirects
- [ ] Verify SSL certificate valid
- [ ] Test all pages work with new domain
- [ ] Verify contact form works with new domain
- [ ] Update Google Analytics property (if needed)

#### 7.5: DNS Cutover (if using external DNS)
If DNS is managed outside Route 53:
- [ ] Update A record to point to CloudFront
- [ ] Update www CNAME
- [ ] Wait for DNS propagation
- [ ] Verify old site still accessible during transition

#### 7.6: Post-Migration Verification
- [ ] Monitor CloudFront metrics
- [ ] Check for 404 errors
- [ ] Verify email form submissions
- [ ] Check Google Search Console
- [ ] Update sitemap submission

### Success Criteria
- ✅ https://idevelop.tech loads correctly
- ✅ SSL certificate valid
- ✅ All pages accessible
- ✅ Contact form works
- ✅ No broken links
- ✅ Old domain redirects (if applicable)

### Rollback Plan
If issues occur:
1. Revert DNS changes to point back to old hosting
2. Wait for DNS propagation
3. Debug issues in staging/development
4. Retry migration when fixed

### Notes
- **Current domain hosting:** Wix (assumed)
- **DNS management:** Will be transferred to Route 53 via SST
- **Downtime:** Minimal (~5-30 minutes during DNS propagation)
- **Email impact:** None (emails go to separate service)

---

## Phase 8: Final Security Audit & Make Repository Public

### Objective
Final security review and make repository public.

### Tasks

#### 8.1: Security Audit
- [ ] Run full codebase security scan
- [ ] Verify no new secrets introduced during Phase 5-7
- [ ] Check `.env` files for production secrets
- [ ] Review Lambda function for security issues
- [ ] Verify API Gateway CORS settings
- [ ] Check DynamoDB access controls
- [ ] Review IAM policies (least privilege)
- [ ] Verify reCAPTCHA secret in SSM (not code)
- [ ] Check git history for any leaked credentials
- [ ] Review all environment variables

#### 8.2: Documentation Review
- [ ] Update README with final production URL
- [ ] Verify all documentation is public-ready
- [ ] Remove any internal notes or TODOs
- [ ] Update architecture diagrams (if any)
- [ ] Verify LICENSE file is correct
- [ ] Review SECURITY.md for accuracy

#### 8.3: Make Repository Public
- [ ] Final commit of any documentation updates
- [ ] Run: `gh repo edit mattlucian/idevelop.tech --visibility public`
- [ ] Verify repository is public
- [ ] Verify GitHub Actions still work
- [ ] Verify Dependabot PRs start appearing

#### 8.4: Post-Public Setup
- [ ] Configure branch protection rules for `main`
  - Require pull request before merging
  - Require status checks to pass
  - No force pushes
  - No deletions
- [ ] Update repository description
- [ ] Add topics/tags to repository
- [ ] Update social preview image (if desired)
- [ ] Announce on LinkedIn/portfolio (optional)

### Success Criteria
- ✅ No secrets in code or git history
- ✅ Repository is public
- ✅ CI/CD still works
- ✅ Branch protection enabled
- ✅ Documentation is accurate
- ✅ Site fully functional at idevelop.tech

---

## Critical Path

```
Phase 5 (Backend API) → Phase 6 (Testing) → Phase 7 (Domain) → Phase 8 (Public Repo)
```

**Important:** Do not skip phases. Each phase validates the previous phase's work.

---

## Risk Management

### High Risk Items
1. **Domain migration downtime** - Mitigated by DNS TTL management and rollback plan
2. **Email delivery issues** - Test thoroughly in Phase 6, have backup contact method
3. **Secrets exposed in public repo** - Multiple security audits (Phase 4.5 and 8)

### Medium Risk Items
1. **API rate limiting too strict** - Adjustable via configuration
2. **reCAPTCHA blocking legitimate users** - Monitor and adjust threshold
3. **CloudFront caching issues** - Clear cache if needed

### Low Risk Items
1. **CI/CD issues after going public** - Already tested in private repo
2. **Dependabot noise** - Can be adjusted in configuration
3. **Branch protection conflicts** - Admins can bypass if needed

---

## Rollback Plans

### Phase 5 Rollback
- Remove API Gateway from SST config
- Deploy without backend
- Frontend continues to work (form just won't submit)

### Phase 6 Rollback
- Fix issues found in testing
- Re-test before proceeding

### Phase 7 Rollback
- Revert DNS to old hosting
- Keep CloudFront deployment as backup
- Debug and retry

### Phase 8 Rollback
- Can make repository private again if needed
- No impact on production site

---

## Timeline Estimates

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 5: Backend API | 4-6 hours | None |
| Phase 6: Testing | 2-3 hours | Phase 5 complete |
| Phase 7: Domain Migration | 1-2 hours + 30min propagation | Phase 6 complete |
| Phase 8: Public Repo | 1 hour | Phase 7 complete |

**Total remaining:** ~8-12 hours of work + propagation time

---

## Success Metrics

### Technical Metrics
- [ ] 100% TypeScript type coverage
- [ ] 0 console errors in production
- [ ] <3 second page load time
- [ ] <500ms API response time
- [ ] 100% uptime during migration

### Business Metrics
- [ ] Contact form submissions work
- [ ] Professional appearance
- [ ] Mobile-friendly experience
- [ ] SEO maintained/improved
- [ ] Public repository showcases skills

---

## Next Session: Phase 5 - Backend API Implementation

**Start here after context clear.**

### Prerequisites
- AWS SSO configured and logged in
- Development environment ready
- All previous phases complete

### First Tasks
1. Review `docs/CTA-FORM-IMPLEMENTATION-PLAN.md`
2. Add API Gateway to `sst.config.ts`
3. Implement Lambda function skeleton
4. Set up local testing with SST dev mode

### Key Files to Work With
- `sst.config.ts` - Infrastructure configuration
- `packages/functions/src/contact.ts` - Lambda handler
- `packages/web/src/components/ui/CTAForm.vue` - Frontend form
- `packages/core/src/types.ts` - Shared types

### Commands to Use
```bash
# Start SST dev mode (deploys to personal AWS environment)
AWS_PROFILE=idevelop-tech npm run dev

# In another terminal, start frontend
cd packages/web && npm run dev

# Type check
cd packages/web && npm run type-check

# Deploy to production (after testing)
AWS_PROFILE=idevelop-tech npx sst deploy --stage production
```

### Reference Documentation
- `docs/CTA-FORM-IMPLEMENTATION-PLAN.md` - Complete API implementation guide
- `docs/AWS-SETUP.md` - AWS configuration reference
- `CLAUDE.md` - Project coding standards
- `packages/web/docs/` - Frontend documentation

---

## Notes

- All phases are documented for traceability
- Each phase has clear success criteria
- Rollback plans exist for all phases
- Security is checked twice (Phase 4.5 and 8)
- Repository goes public LAST (after everything works)

---

**Current Status:** Ready to begin Phase 5 - Backend API Implementation
