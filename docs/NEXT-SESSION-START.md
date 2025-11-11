# Next Session Quick Start Guide

**Task:** Testing and Validation (Phase 6)

---

## Context Summary

### What's Been Done
- ✅ SST monorepo structure created
- ✅ Vue frontend deployed to CloudFront
- ✅ CI/CD pipeline configured (GitHub Actions)
- ✅ Security audit completed (no secrets in code)
- ✅ Backend API implemented (contact form with reCAPTCHA, SES, rate limiting)
- ✅ Email authentication configured (DKIM, SPF, DMARC)
- ✅ CI/CD workflows fixed for SST v3
- ✅ Dependencies updated (GitHub Actions, npm packages)
- ✅ Repository prepared for public visibility (but still private)

### Current State
- **Branch:** `main` (clean, all recent PRs merged)
- **Production URL:** https://dxeay6n8brs8g.cloudfront.net
- **Dev URL:** https://dev.idevelop.tech
- **Frontend:** Working perfectly, deployed via CI/CD
- **Backend:** Fully implemented and deployed
- **Contact Form:** Working end-to-end (form → API → email)
- **Domain:** Using CloudFront URLs (will migrate to idevelop.tech in Phase 7)

### Recent Completions (2025-11-11)
1. **Email Authentication:** DKIM, SPF, and DMARC configured for better deliverability
2. **Workflow Fixes:** Removed invalid `sst outputs` command, disabled production custom domain
3. **Dependency Updates:** All GitHub Actions and npm packages updated to latest versions

### What's Next
Thorough testing of all functionality before domain migration.

---

## Phase 6: Testing and Validation

### Goal
Systematically test all features, pages, and functionality to ensure everything works correctly before migrating the domain.

### Testing Categories

#### 6.1: Frontend Testing
- [ ] Manual testing on all pages (Home, Services, Hire Me, Tech, etc.)
- [ ] Test responsive design (mobile 320px, tablet 768px, desktop 1024px+)
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

### Testing URLs

**Production:**
- Frontend: https://dxeay6n8brs8g.cloudfront.net
- API: https://api.idevelop.tech (via SST deployment)

**Development:**
- Frontend: https://dev.idevelop.tech
- API: https://dev-api.idevelop.tech

**Local Development:**
- Frontend: http://localhost:5173
- API: SST dev mode deploys to personal AWS environment

---

## Quick Commands Reference

### AWS Authentication
```bash
# Login to AWS (if session expired)
aws sso login --profile idevelop-tech

# Verify authentication
aws sts get-caller-identity --profile idevelop-tech

# Set profile for session
export AWS_PROFILE=idevelop-tech
```

### Development Workflow
```bash
# Start SST dev mode (in one terminal)
AWS_PROFILE=idevelop-tech npm run dev

# Start frontend dev server (in another terminal)
cd packages/web
npm run dev
# Frontend at http://localhost:5173

# Type checking
cd packages/web && npm run type-check

# Build frontend
cd packages/web && npm run build

# Format code
cd packages/web && npm run format
```

### Testing Production
```bash
# Visit production URL
open https://dxeay6n8brs8g.cloudfront.net

# Test contact form
# Fill out and submit on /hire-me page

# Check if email was received at matt@idevelop.tech

# Test rate limiting
# Submit form 6+ times within an hour (should get rate limited)
```

### Git Workflow (if changes needed)
```bash
# Check status
git status

# Create feature branch for any fixes
git checkout -b fix/issue-description

# Make changes, commit, and push
git add .
git commit -m "Fix: description of fix"
git push origin fix/issue-description

# Create PR
gh pr create --title "Fix: description" --base main
```

---

## Testing Checklist Details

### Frontend Pages to Test
- [ ] **Home (/)** - Service cards grid, navigation
- [ ] **Services pages** - All service detail pages
- [ ] **Hire Me (/hire-me)** - Contact form, scheduling link
- [ ] **Tech (/tech)** - Tech expertise browser
- [ ] **Components (/components)** - Design system showcase
- [ ] **Attributions (/attributions)** - Image credits
- [ ] **Accessibility (/accessibility)** - Accessibility statement
- [ ] **404 page** - Custom 404 handling

### Contact Form Testing Matrix
| Test Case | Input | Expected Result |
|-----------|-------|-----------------|
| Valid submission | All fields filled, valid email | Success message, email received |
| Invalid email | Bad email format | Client-side validation error |
| Missing name | Name field empty | Client-side validation error |
| Missing service | No service selected | Client-side validation error |
| reCAPTCHA fail | Low score from reCAPTCHA | Server rejects with error message |
| Rate limit IP | 6+ submissions in 1 hour from same IP | "Too many requests" error |
| Rate limit email | 11+ submissions in 1 day with same email | "Too many requests" error |
| Network error | Simulate offline | Error message shown |

### Performance Benchmarks
- [ ] Page load time < 3 seconds (on good connection)
- [ ] First Contentful Paint < 1.5 seconds
- [ ] API response time < 500ms
- [ ] No console errors or warnings
- [ ] No 404s for assets
- [ ] CloudFront cache hit ratio > 80%

### Security Checks
- [ ] No API keys or secrets in frontend bundle
- [ ] CORS only allows configured origins
- [ ] All requests over HTTPS
- [ ] XSS protection (test script injection in form)
- [ ] SQL injection protection (N/A - using DynamoDB)
- [ ] Rate limiting working correctly

---

## Known Issues (if any)

_None currently - to be updated during testing._

---

## Success Criteria

Before moving to Phase 7 (Domain Migration), verify:

- ✅ All pages load correctly
- ✅ Navigation works on all breakpoints
- ✅ Contact form submits successfully
- ✅ Emails are received with correct formatting
- ✅ reCAPTCHA validation works
- ✅ Rate limiting prevents abuse
- ✅ No console errors
- ✅ Mobile experience is good
- ✅ Performance is acceptable
- ✅ Security measures are effective
- ✅ Cross-browser compatibility confirmed

---

## After Phase 6 Completion

### Next Steps
1. **Phase 7:** Custom domain migration (idevelop.tech → CloudFront)
2. **Phase 8:** Final security audit → Make repository public

### Timeline
- Phase 6: 2-3 hours (testing)
- Phase 7: 1-2 hours + 30min DNS propagation
- Phase 8: 1 hour

**Total remaining:** ~4-6 hours

---

## Reference Documentation

### Project Documentation
1. **`docs/PROJECT-PLAN.md`** ⭐ PRIMARY REFERENCE
   - Complete project plan
   - Phase 6 detailed checklist
   - Success criteria

2. **`docs/PHASE-5-SETUP-INSTRUCTIONS.md`**
   - Backend API setup and configuration
   - Deployment details
   - API endpoints and testing

3. **`docs/SES-EMAIL-DELIVERABILITY.md`**
   - Email authentication setup
   - DKIM, SPF, DMARC configuration
   - Email deliverability improvements

### Coding Standards
4. **`CLAUDE.md`** ⭐ CODING STANDARDS
   - Component rules and patterns
   - TypeScript best practices
   - Git commit message format
   - Development workflow

5. **`packages/web/docs/`**
   - Frontend architecture
   - Component documentation
   - Design system
   - Data structures

---

## Testing Tools & Resources

### Browser DevTools
- Chrome DevTools (Performance, Network tabs)
- Safari Web Inspector
- Firefox Developer Tools
- Edge DevTools

### Testing Checklist
Use this systematic approach:
1. Start with desktop Chrome (most common)
2. Test all pages and navigation
3. Test contact form thoroughly
4. Switch to mobile viewport (responsive)
5. Test in Safari, Firefox, Edge
6. Test on actual mobile device if available
7. Document any issues found

### Performance Testing
```bash
# Build production bundle and check size
cd packages/web
npm run build

# Check dist/ folder size
du -sh dist/
```

### Email Testing
- Submit contact form
- Check matt@idevelop.tech inbox
- Verify email formatting
- Check sender (should be matt@idevelop.tech via SES)
- Verify subject line and content

---

## Common Issues & Solutions

### Issue: Page loads slowly
**Check:**
1. CloudFront cache status (X-Cache header)
2. Asset sizes (images compressed?)
3. Bundle size (run build and check dist/)

### Issue: Contact form not submitting
**Check:**
1. Browser console for errors
2. Network tab for API call
3. reCAPTCHA loaded correctly
4. CORS errors (check API Gateway config)

### Issue: Email not received
**Check:**
1. Spam folder
2. AWS SES console for delivery status
3. CloudWatch logs for Lambda errors
4. SES sending quota (sandbox mode?)

### Issue: Rate limiting not working
**Check:**
1. DynamoDB table has entries
2. Lambda has permissions to DynamoDB
3. IP address captured correctly
4. Timestamps in correct format

---

## Quick Start Command Sequence

```bash
# 1. Ensure you're on latest main
git checkout main
git pull origin main

# 2. Authenticate with AWS (if needed)
aws sso login --profile idevelop-tech
export AWS_PROFILE=idevelop-tech

# 3. Open production site in browser
open https://dxeay6n8brs8g.cloudfront.net

# 4. Start systematic testing using checklist above

# 5. If starting local dev (optional)
npm run dev  # Terminal 1
cd packages/web && npm run dev  # Terminal 2
```

---

**Ready to start Phase 6! 🧪**

**Primary Reference:** `docs/PROJECT-PLAN.md` (Phase 6 section)
