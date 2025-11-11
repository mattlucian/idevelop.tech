# idevelop.tech Project Plan

**Last Updated:** 2025-11-11
**Current Phase:** Phase 6.5 - Content Polish

---

## Project Overview

Full-stack portfolio website migration from traditional Vue app to SST monorepo with serverless backend.

**Production URL (Current):** https://dxeay6n8brs8g.cloudfront.net
**Target URL:** https://idevelop.tech
**Repository:** https://github.com/mattlucian/idevelop.tech (private, will be public in Phase 6.8)

---

## Phase Status

- ✅ **Phase 1:** SST migration complete
- ✅ **Phase 2:** Verification and bug fixes complete
- ✅ **Phase 3:** CI/CD pipeline configured
- ✅ **Phase 4:** Production deployment to CloudFront
- ✅ **Phase 4.5:** Security audit and public repo preparation
- ✅ **Phase 5:** Backend API implementation complete (2025-11-09)
- ✅ **Phase 5.1:** Email authentication (DKIM, SPF, DMARC) complete (2025-11-11)
- ✅ **Phase 5.2:** CI/CD workflow fixes complete (2025-11-11)
- ✅ **Phase 5.3:** Dependency updates complete (2025-11-11)
- ✅ **Phase 5.4:** DevOps enhancements (branch strategy, CodeQL) complete (2025-11-11)
- ✅ **Phase 6:** Manual smoke testing complete (2025-11-11)
- 🔄 **Phase 6.5:** Content polish (CURRENT)
- ⏳ **Phase 6.6:** Add Lighthouse CI and remediate issues
- ⏳ **Phase 6.7:** CodeQL verification and remediation
- ⏳ **Phase 6.8:** Make repository public
- ⏳ **Phase 7:** Custom domain migration
- ⏳ **Phase 8:** Post-launch monitoring setup

---

## Phase 5: Backend API Implementation ✅ COMPLETE

**Completed:** 2025-11-09

### Objective
Implement serverless contact form API with email functionality.

### Tasks Completed

#### 5.1: Infrastructure Setup ✅
- ✅ Add API Gateway configuration to `sst.config.ts`
- ✅ Create Lambda function resource
- ✅ Configure DynamoDB table for rate limiting
- ✅ Set up SES email service
- ✅ Configure IAM permissions
- ✅ Set up custom domains (dev.idevelop.tech, dev-api.idevelop.tech)

#### 5.2: Lambda Function Implementation ✅
- ✅ Implement contact form handler (`packages/functions/src/contact.ts`)
- ✅ Add request validation
- ✅ Integrate reCAPTCHA verification
- ✅ Implement rate limiting logic
- ✅ Add SES email sending
- ✅ Add error handling and logging

#### 5.3: Secrets Management ✅
- ✅ Store reCAPTCHA secret in AWS SSM Parameter Store
- ✅ Configure SES email identity (matt@idevelop.tech)
- ✅ Update Lambda to read from SSM
- ✅ Verify environment-specific secrets

#### 5.4: Frontend Integration ✅
- ✅ Frontend already had API integration via `packages/web/src/services/contactApi.ts`
- ✅ Loading states and error handling already implemented
- ✅ Success/error messages working
- ✅ Form submission flow tested and working

#### 5.5: Testing ✅
- ✅ Deployed to dev stage with SST
- ✅ Verified reCAPTCHA integration working
- ✅ Rate limiting configured (5/hour per IP, 10/day per email)
- ✅ Email delivery confirmed - received at matt@idevelop.tech
- ✅ Error scenarios handled correctly

### Success Criteria - ALL MET ✅
- ✅ Contact form submits successfully
- ✅ reCAPTCHA validation works
- ✅ Emails delivered to matt@idevelop.tech
- ✅ Rate limiting prevents abuse
- ✅ Error handling works correctly
- ✅ All TypeScript checks pass
- ✅ Frontend shows appropriate feedback

### Deployment Details
- **Dev Frontend:** https://dev.idevelop.tech
- **Dev API:** https://dev-api.idevelop.tech
- **Lambda:** idevelop-tech-dev-ContactHandlerFunction
- **DynamoDB:** idevelop-tech-dev-RateLimitTable

### Post-Phase 5 Enhancements Completed

#### Phase 5.1: Email Authentication ✅ (2025-11-11)
- ✅ Configured DKIM for AWS SES (3 CNAME records verified)
- ✅ Configured SPF record for Google Workspace + AWS SES
- ✅ Configured DMARC record (monitor mode, reports to matt@idevelop.tech)
- ✅ All DNS records propagated and verified
- ✅ Email deliverability significantly improved
- **Documentation:** `docs/SES-EMAIL-DELIVERABILITY.md`

#### Phase 5.2: CI/CD Workflow Fixes ✅ (2025-11-11)
- ✅ Fixed production deployment workflow (removed invalid `sst outputs` command)
- ✅ Disabled custom domain for production (intentionally using CloudFront URL until Phase 7)
- ✅ Updated workflow to work with SST v3 (Ion)
- **PRs:** #18 (hotfix/disable-production-domain), #19 (fix/remove-sst-outputs-command)

#### Phase 5.3: Dependency Updates ✅ (2025-11-11)
- ✅ Updated GitHub Actions (checkout v4→v5, setup-node v4→v6, aws-actions v4→v5)
- ✅ Updated aws-cdk-lib (2.142.1→2.223.0)
- ✅ Updated AWS SDK clients (@aws-sdk/* 3.927.0→3.928.0)
- ✅ Updated constructs (10.3.0→10.4.3)
- ✅ Updated autoprefixer, eslint-plugin-vue
- ✅ All builds passing
- **PRs:** #16 (GitHub Actions), #17 (npm dependencies), #20 (additional Actions updates)

### Reference Documentation
- `docs/PHASE-5-SETUP-INSTRUCTIONS.md` - Complete setup guide and deployment results
- `docs/CTA-FORM-IMPLEMENTATION-PLAN.md` - Original implementation plan
- `packages/web/docs/COMPONENTS.md` - CTAForm component documentation

---

## Phase 5.4: DevOps Enhancements ✅ COMPLETE

**Completed:** 2025-11-11

### Objective
Implement enterprise-grade CI/CD practices and branch strategy.

### Tasks Completed

#### Branch Strategy ✅
- ✅ Created `develop` branch for staging/development
- ✅ Implemented two-branch deployment workflow
- ✅ Created `deploy-dev.yml` workflow for dev deployments
- ✅ Updated `pr-checks.yml` to run on both develop and main
- ✅ Comprehensive documentation in `docs/BRANCH-STRATEGY.md`

#### CodeQL Security Scanning ✅
- ✅ Created `codeql.yml` workflow for automated security scanning
- ✅ Configured for JavaScript/TypeScript analysis
- ✅ Set to run on PRs, pushes, and weekly schedule
- ✅ Uses `security-extended` query suite
- ⚠️ Will fully activate when repository becomes public

#### Branch Flow ✅
```
feature/* → PR → develop → deploy to dev.idevelop.tech
                    ↓
                 (test)
                    ↓
            PR → main → deploy to production (CloudFront URL)
```

### Reference Documentation
- `docs/BRANCH-STRATEGY.md` - Complete branch and workflow guide
- `.github/workflows/codeql.yml` - Security scanning configuration
- `.github/workflows/deploy-dev.yml` - Dev deployment workflow

---

## Phase 6: Manual Smoke Testing ✅ COMPLETE

**Completed:** 2025-11-11

### Objective
Manual testing of development environment to catch critical issues.

### Tasks Completed
- ✅ Tested all pages (Home, Services, Hire Me, Tech, Components, Attributions, Accessibility)
- ✅ Verified navigation works (desktop & mobile menu)
- ✅ Checked responsive design across breakpoints
- ✅ Verified images and assets load correctly
- ✅ Tested contact form rendering and client-side validation
- ✅ Confirmed no console errors in browser DevTools
- ✅ Tested link functionality throughout site

### Testing Environment
- **Dev Site:** https://dev.idevelop.tech
- **Browser:** Chrome (primary test)
- **Responsive:** Verified mobile/tablet/desktop layouts

### Notes
- ⚠️ Contact form submission not fully testable until domain migration (reCAPTCHA domain restriction)
- ✅ Frontend code quality confirmed via CI/CD checks (type-check, lint, build)

---

## Phase 6.5: Content Polish 🔄 CURRENT

**Status:** In Progress

### Objective
Refine website content before making repository public and migrating domain.

### Tasks
- [ ] Review and update service page copy
- [ ] Refine hero section messaging
- [ ] Update portfolio project descriptions
- [ ] Polish technical expertise descriptions
- [ ] Review /hire-me page copy
- [ ] Verify all CTAs are clear and actionable
- [ ] Check for typos, grammar, consistency

### Approach
- Remove marketing fluff and over-promising
- Ensure authenticity and professionalism
- Follow content guidelines in `packages/web/docs/COMPONENT-RULES.md`
- Avoid specific commitments (response times, deadlines)
- Focus on value propositions over superlatives

### Success Criteria
- ✅ Content reads professionally
- ✅ No unrealistic promises
- ✅ Messaging is clear and authentic
- ✅ All text provides value

---

## Phase 6.6: Lighthouse CI & Remediation

**Status:** Pending

### Objective
Add automated performance monitoring and remediate any critical issues.

### Tasks

#### 6.6.1: Add Lighthouse CI
- [ ] Create `.github/workflows/lighthouse-ci.yml`
- [ ] Configure to run on PRs to develop and main
- [ ] Set performance budgets (if needed)
- [ ] Verify workflow passes on current codebase

#### 6.6.2: Baseline Audit
- [ ] Run Lighthouse manually on dev.idevelop.tech
- [ ] Document baseline scores (Performance, Accessibility, Best Practices, SEO)
- [ ] Identify any critical issues (score < 70)

#### 6.6.3: Remediation (if needed)
- [ ] Fix critical performance issues
- [ ] Fix critical accessibility issues
- [ ] Fix critical SEO issues
- [ ] Re-run audit to confirm fixes

### Success Criteria
- ✅ Lighthouse CI workflow running in GitHub Actions
- ✅ All categories score > 70 (minimum acceptable)
- ✅ Target: Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 90
- ✅ No critical issues blocking launch

### Time Estimate
- Setup: 15-20 minutes
- Audit: 5-10 minutes
- Remediation: 0-2 hours (depending on issues found)

---

## Phase 6.7: CodeQL Verification & Remediation

**Status:** Pending (will activate when repo is public)

### Objective
Verify CodeQL security scanning works and remediate any vulnerabilities.

### Tasks

#### 6.7.1: Verify CodeQL After Public
- [ ] Make repository public (Phase 6.8)
- [ ] Wait for CodeQL scan to complete (~2 minutes)
- [ ] Check GitHub Security tab for results
- [ ] Review any security findings

#### 6.7.2: Remediation (if needed)
- [ ] Review each security alert
- [ ] Prioritize by severity (critical > high > medium > low)
- [ ] Fix or dismiss each alert with justification
- [ ] Re-run scan to verify fixes

### Success Criteria
- ✅ CodeQL scan completes successfully
- ✅ No critical or high severity issues
- ✅ All alerts reviewed and addressed
- ✅ Security tab shows clean state

### Notes
- CodeQL currently fails on private repo (requires GitHub Advanced Security license)
- Will automatically work once repo is public
- Configuration is already correct in `.github/workflows/codeql.yml`

---

## Phase 6.8: Make Repository Public

**Status:** Pending

### Objective
Make repository public to enable full security tooling and portfolio visibility.

### Pre-Flight Checklist

#### Security Verification
- [ ] Run final secret scan: `git log -p | grep -E "(password|secret|key|token)" -i`
- [ ] Verify no `.env` files in repo
- [ ] Confirm reCAPTCHA secret is in AWS SSM (not code)
- [ ] Check AWS credentials not in code
- [ ] Review git history for any sensitive data

#### Documentation Review
- [ ] README.md is complete and professional
- [ ] CLAUDE.md demonstrates architectural thinking
- [ ] All docs are public-ready (no internal notes)
- [ ] LICENSE file is appropriate
- [ ] SECURITY.md is accurate

### Tasks

#### 6.8.1: Final Security Check
```bash
# Check for common secrets
git log -p | grep -E "(sk_|pk_|AKIA|aws_|password|token)" -i

# Check for .env files
git log --all --full-history -- "**/.env*"

# Check current files
find . -name ".env*" -o -name "*secret*" -o -name "*key*"
```

#### 6.8.2: Make Public
- [ ] Go to GitHub Settings → General → Danger Zone
- [ ] Click "Change visibility" → "Change to public"
- [ ] Confirm: "I want to make this repository public"
- [ ] Verify repository is public

#### 6.8.3: Enable Branch Protection
- [ ] Go to Settings → Branches
- [ ] Add rule for `main` branch:
  - [ ] Require pull request before merging
  - [ ] Require status checks to pass: `Validate Build`, `CodeQL Security Scan`
  - [ ] Do not allow bypassing the above settings
- [ ] (Optional) Add rule for `develop` branch:
  - [ ] Require status checks to pass

#### 6.8.4: Verify Post-Public
- [ ] CodeQL scan triggers automatically
- [ ] Security tab is accessible
- [ ] Repository is discoverable
- [ ] All workflows still function

### Success Criteria
- ✅ Repository is public
- ✅ No secrets exposed
- ✅ Branch protection enabled
- ✅ CodeQL working
- ✅ All documentation is professional

### Rollback Plan
If issues are found post-public:
1. Immediately make repository private again
2. Remove sensitive data if exposed
3. Fix issues
4. Re-attempt making public

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

## Phase 8: Post-Launch Monitoring Setup

### Objective
Add monitoring and observability after site is live.

### Tasks (Deferred - Optional)

#### 8.1: Uptime Monitoring
- [ ] Set up BetterStack or similar (free tier)
- [ ] Monitor https://idevelop.tech
- [ ] Alert on downtime
- [ ] Create status page (optional)

#### 8.2: Error Tracking
- [ ] Consider Sentry for frontend/backend error tracking
- [ ] Set up if errors become problematic
- [ ] Monitor Lambda CloudWatch logs
- [ ] Set up CloudWatch Alarms for SES bounce/complaint rates (optional)

#### 8.3: Analytics Enhancement
- [ ] Review Google Analytics data
- [ ] Consider PostHog for session replay (optional)
- [ ] Set up conversion tracking

#### 8.4: Dependency Scanning
- [ ] Add Snyk for dependency vulnerability scanning
- [ ] Configure automatic PR creation for security updates

#### 8.5: Performance Monitoring
- [ ] Monitor Lighthouse CI scores over time
- [ ] Set up alerts if scores drop below thresholds

### Notes
- These are optional enhancements
- Add only if needed based on actual usage
- Focus on content and portfolio value first

---

## Removed: Marketing & Announcement

**Decision:** Removed Phase 8 announcement/marketing tasks.

**Rationale:**
- Portfolio site, not product launch
- Focus on technical excellence, not marketing
- Organic discovery is sufficient
- Can announce informally when ready

---

## Documentation Review
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

## Next Session: Phase 6 - Testing and Validation

**Start here after context clear.**

### Prerequisites
- AWS SSO configured and logged in
- Development environment ready
- Phase 5 complete (Backend API working)

### Overview
Thoroughly test all functionality before proceeding to domain migration (Phase 7).

### Testing Approach
1. **Manual testing** - Test all pages, forms, and user flows
2. **Cross-browser testing** - Chrome, Safari, Firefox, Edge
3. **Responsive testing** - Mobile, tablet, desktop breakpoints
4. **Performance testing** - Page load times, API response times
5. **Security testing** - CORS, input sanitization, rate limiting

### Key Areas to Test
- Frontend navigation and routing
- Contact form submission (valid/invalid data)
- reCAPTCHA integration
- Rate limiting (multiple submissions)
- Email delivery and formatting
- Mobile responsive design
- Cookie consent
- Google Analytics tracking

### Commands to Use
```bash
# Authenticate
aws sso login --profile idevelop-tech
export AWS_PROFILE=idevelop-tech

# Start dev environment for testing
npm run dev

# In another terminal
cd packages/web && npm run dev

# Check for type errors
cd packages/web && npm run type-check

# Check for build errors
cd packages/web && npm run build

# Test production deployment
# Production URL: https://dxeay6n8brs8g.cloudfront.net
```

### Testing Checklist
See Phase 6 section above for complete checklist of tests to perform.

### Reference Documentation
- `docs/PROJECT-PLAN.md` - Phase 6 testing checklist
- `packages/functions/src/contact.ts` - Contact form API implementation
- `CLAUDE.md` - Project coding standards

---

## Notes

- All phases are documented for traceability
- Each phase has clear success criteria
- Rollback plans exist for all phases
- Security is checked twice (Phase 4.5 and 8)
- Repository goes public LAST (after everything works)

---

**Current Status:** Ready to begin Phase 5 - Backend API Implementation
