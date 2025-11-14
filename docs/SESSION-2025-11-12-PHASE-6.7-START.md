# Phase 6.7 & Email Improvements - Session Start Guide

**Date**: 2025-11-12
**Session Type**: Pre-Launch Quality & Email Enhancement
**Focus**: Lighthouse CI integration + Rich HTML emails with sender confirmation

---

## Session Objectives

### 1. Lighthouse CI Integration (Phase 6.7)
**Purpose**: Automated quality gates for performance, accessibility, SEO, and best practices

**Implementation Details**:
- Add Lighthouse CI to GitHub Actions workflow
- Run audits on every PR automatically
- Set thresholds to block PRs if quality drops:
  - Performance: Must be ≥ 90
  - Accessibility: Must be ≥ 95
  - Best Practices: Recommended ≥ 90
  - SEO: Recommended ≥ 90
- Generate reports visible in PR checks
- Establish baseline scores for ongoing monitoring

**Benefits**:
- Catches performance regressions before merge
- Ensures accessibility standards maintained
- Validates SEO implementation
- Professional DevOps signal for portfolio

**Files to Create/Modify**:
- `.github/workflows/lighthouse-ci.yml` - New workflow file
- `lighthouserc.json` - Lighthouse CI configuration
- `docs/PROJECT-PLAN.md` - Update Phase 6.7 status

---

### 2. Email Flow Improvements

#### Improvement A: Rich HTML Email Templates
**Current State**: Plain text emails sent via SES
**Desired State**: Branded HTML emails with rich formatting

**Design Specifications**:
- **Style**: Rich (full branded experience with gradients)
- **Color Scheme**: Cyan/purple gradient theme matching site
- **Components**:
  - Logo/header with gradient background
  - Formatted sections for contact details
  - Professional typography
  - Mobile-responsive design
  - Footer with contact information and social links
  - Subtle hover effects and modern styling

**Templates to Create**:
1. **Admin Notification Template** (`admin-notification.html`):
   - Subject: "New Contact Form Submission from [Name]"
   - To: matt@idevelop.tech
   - Contains: Full submission details (name, email, service, message)
   - Action-oriented (reply button/link)

2. **Sender Confirmation Template** (`sender-confirmation.html`):
   - Subject: "Thanks for contacting I Develop Tech"
   - To: [sender's email]
   - Reply-To: matt@idevelop.tech
   - Message tone: Professional, friendly, no specific timeframe
   - Content: "Thanks for reaching out! I'll review your message and get back to you shortly. Feel free to reply to this email to add additional context."
   - Includes: Summary of what they submitted (for their records)

#### Improvement B: Dual Email Flow
**Current Flow**:
- Single email to matt@idevelop.tech

**New Flow**:
1. **Email 1**: Admin notification to matt@idevelop.tech
   - Full details of submission
   - Sender's contact info prominent
   - Service they're interested in
2. **Email 2**: Confirmation to sender
   - Reply-To: matt@idevelop.tech
   - Acknowledgment of receipt
   - Professional thank you
   - Encourages additional context via reply

**Files to Create**:
- `packages/functions/src/email-templates/admin-notification.html`
- `packages/functions/src/email-templates/sender-confirmation.html`
- `packages/functions/src/email-templates/styles.ts` (optional: shared CSS constants)

**Files to Modify**:
- `packages/functions/src/contact.ts`:
  - Add HTML email template rendering
  - Send two emails instead of one
  - Add Reply-To header for sender confirmation
  - Update email sending logic in `sendEmail()` function
  - Update types if needed (add htmlBody to email params)

---

## Technical Requirements

### Lighthouse CI Setup

**GitHub Actions Workflow**:
```yaml
# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [develop, main]
  push:
    branches: [develop, main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build site
        run: cd packages/web && npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/hire-me
            http://localhost:3000/tech
          uploadArtifacts: true
          temporaryPublicStorage: true
```

**Configuration File**:
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "cd packages/web && npm run preview -- --port 3000",
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/hire-me",
        "http://localhost:3000/tech"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

### Email Templates Structure

**Shared Design Tokens**:
```typescript
// Color scheme matching site
const COLORS = {
  primary: '#06b6d4', // cyan-500
  secondary: '#a855f7', // purple-500
  background: '#0a0a0a',
  cardBg: '#0f0f0f',
  text: '#ffffff',
  textMuted: '#94a3b8', // slate-400
  border: '#334155', // slate-700
};

const GRADIENTS = {
  primary: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)',
  header: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
};
```

**Email Template Pattern**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Title</title>
  <style>
    /* Inline styles for email client compatibility */
    /* Mobile-responsive design */
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <!-- Email content with rich branding -->
</body>
</html>
```

---

## Implementation Steps

### Step 1: Lighthouse CI (Est: 30-45 minutes)
1. Create `.github/workflows/lighthouse-ci.yml`
2. Create `lighthouserc.json` configuration
3. Test locally with `npx @lhci/cli@0.12.x autorun`
4. Push to feature branch and verify workflow runs
5. Review initial scores and adjust thresholds if needed
6. Document baseline scores

### Step 2: Email Templates (Est: 1-2 hours)
1. Create directory: `packages/functions/src/email-templates/`
2. Create admin notification HTML template
3. Create sender confirmation HTML template
4. Test templates with sample data (render to file for visual check)
5. Ensure mobile responsiveness (test in multiple email clients if possible)

### Step 3: Update Contact Function (Est: 30-45 minutes)
1. Read current `contact.ts` implementation
2. Add template rendering function (substitute variables)
3. Update `sendEmail()` to support HTML body
4. Implement dual-email sending:
   - Send admin notification (existing flow)
   - Send sender confirmation (new flow with Reply-To)
5. Add error handling for email failures
6. Update types if needed

### Step 4: Testing (Est: 30 minutes)
1. Deploy to dev stage: `npm run deploy -- --stage dev`
2. Test contact form submission on dev.idevelop.tech
3. Verify both emails arrive
4. Check HTML rendering in email client
5. Verify Reply-To header works
6. Test on mobile email client

### Step 5: Documentation & PR (Est: 15 minutes)
1. Update `docs/PROJECT-PLAN.md` - Mark Phase 6.7 complete
2. Update `packages/functions/README.md` - Document email templates
3. Create PR with comprehensive description
4. Link to rendered email screenshots (if available)

---

## Success Criteria

### Lighthouse CI
- ✅ Workflow runs automatically on PRs to develop/main
- ✅ Tests 3+ key pages (home, hire-me, tech)
- ✅ Reports visible in PR checks
- ✅ Blocks PRs below thresholds (Performance < 90, Accessibility < 95)
- ✅ Baseline scores documented

### Email Improvements
- ✅ Rich HTML emails with brand colors and gradients
- ✅ Mobile-responsive design
- ✅ Admin receives detailed notification
- ✅ Sender receives professional confirmation
- ✅ Reply-To header set to matt@idevelop.tech
- ✅ Both emails render correctly in major email clients
- ✅ Error handling for email failures
- ✅ Type-safe implementation

---

## Potential Issues & Solutions

### Issue 1: Lighthouse CI Build Time
**Problem**: Building and running Lighthouse adds time to PR checks
**Solution**: Only run on specific paths (web package changes) or run in parallel with other checks

### Issue 2: Email Template Rendering
**Problem**: Email clients have poor HTML/CSS support
**Solution**: Use inline styles, table-based layout, test with Litmus or Email on Acid

### Issue 3: SES Sandbox Limitations
**Problem**: Can only send to verified email addresses in sandbox
**Solution**: Already in production mode (verified in Phase 4), sender confirmation will work

### Issue 4: Reply-To Header
**Problem**: Some email clients don't respect Reply-To
**Solution**: Also include "Reply to: matt@idevelop.tech" in email body text

---

## Files to Create

```
.github/workflows/lighthouse-ci.yml
lighthouserc.json
packages/functions/src/email-templates/admin-notification.html
packages/functions/src/email-templates/sender-confirmation.html
packages/functions/src/email-templates/utils.ts (template rendering helper)
```

---

## Files to Modify

```
packages/functions/src/contact.ts (email sending logic)
docs/PROJECT-PLAN.md (Phase 6.7 status)
packages/functions/README.md (email documentation)
```

---

## Git Workflow

**Branch Strategy**:
1. Create feature branch from develop: `feature/lighthouse-ci-and-email-improvements`
2. Implement Lighthouse CI
3. Commit and push
4. Implement email improvements
5. Commit and push
6. Create PR to develop with comprehensive description
7. Wait for Lighthouse CI to run (meta!)
8. Review, merge, and verify on dev stage

**PR Title**: `feat: Add Lighthouse CI and rich HTML emails with sender confirmation`

**PR Description Template**:
```markdown
## Summary
- Add Lighthouse CI for automated quality gates
- Implement rich HTML email templates with branding
- Add sender confirmation emails with Reply-To header

## Lighthouse CI
- Runs on every PR to develop/main
- Tests 3 key pages (home, hire-me, tech)
- Thresholds: Performance ≥ 90, Accessibility ≥ 95
- Reports uploaded to temporary public storage

## Email Improvements
- Rich HTML templates with cyan/purple gradient branding
- Admin notification to matt@idevelop.tech (full details)
- Sender confirmation with Reply-To header
- Mobile-responsive design
- Professional tone with encouragement to reply

## Test Plan
- [ ] Lighthouse CI workflow runs successfully
- [ ] Lighthouse reports visible in PR checks
- [ ] Test contact form on dev stage
- [ ] Verify admin email arrives with HTML formatting
- [ ] Verify sender confirmation arrives
- [ ] Test Reply-To header works
- [ ] Check mobile email rendering

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## Next Session Instructions

When resuming work on this session:

1. **Check current branch**: Should be on `develop` or feature branch
2. **Pull latest**: `git pull origin develop`
3. **Review this document**: Read implementation steps
4. **Start with Lighthouse CI**: Create workflow file first (quick win)
5. **Then email templates**: More complex, requires testing
6. **Follow git workflow**: Feature branch → PR → develop

**Priority**: High (last quality gate before custom domain migration)
**Estimated Total Time**: 2-3 hours
**Blocking**: No (site is functional, these are enhancements)

---

## References

- **Lighthouse CI Docs**: https://github.com/GoogleChrome/lighthouse-ci
- **SES HTML Email**: https://docs.aws.amazon.com/ses/latest/dg/send-email-formatted.html
- **Email Client CSS Support**: https://www.caniemail.com/
- **PROJECT-PLAN.md**: Phase 6.7 details
- **Current contact.ts**: `packages/functions/src/contact.ts`

---

**Session Status**: Ready to begin
**User Preferences Confirmed**: Rich emails, thresholds enabled, professional tone
**Blocking Issues**: None
**Next Action**: Create feature branch and start with Lighthouse CI implementation
