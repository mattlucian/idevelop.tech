# Next Session Quick Start Guide

**Task:** Implement Backend API for Contact Form (Phase 5)

---

## Context Summary

### What's Been Done
- ✅ SST monorepo structure created
- ✅ Vue frontend deployed to CloudFront
- ✅ CI/CD pipeline configured (GitHub Actions)
- ✅ Security audit completed (no secrets in code)
- ✅ MIT License added, README updated for public
- ✅ Repository prepared for public visibility (but still private)

### Current State
- **Branch:** `main` (clean, all branches merged and deleted)
- **Production URL:** https://dxeay6n8brs8g.cloudfront.net
- **Frontend:** Working perfectly, deployed via CI/CD
- **Backend:** Not yet implemented (Phase 5 task)
- **Domain:** Using CloudFront URL (will migrate to idevelop.tech in Phase 7)

### What's Next
Implement serverless backend API for contact form functionality.

---

## Phase 5: Backend API Implementation

### Goal
Create Lambda function that handles contact form submissions with:
- reCAPTCHA verification
- Email sending via SES
- Rate limiting via DynamoDB
- Proper error handling

### Key Files to Modify

1. **`sst.config.ts`** - Add infrastructure
   - API Gateway HTTP API
   - Lambda function
   - DynamoDB table
   - SES email identity
   - IAM permissions

2. **`packages/functions/src/contact.ts`** - Implement handler
   - Request validation
   - reCAPTCHA verification
   - Rate limiting check
   - Email sending
   - Error handling

3. **`packages/web/src/components/ui/CTAForm.vue`** - Update frontend
   - Call API endpoint
   - Show loading state
   - Display success/error messages

4. **AWS SSM Parameter Store** - Store secrets
   - reCAPTCHA secret key
   - SES configuration (if needed)

### Implementation Plan

Detailed steps available in:
- **`docs/CTA-FORM-IMPLEMENTATION-PLAN.md`** - Complete implementation guide
- **`docs/PROJECT-PLAN.md`** - Overall project phases and timeline

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
# Start SST dev mode (deploys Lambda to personal AWS environment)
AWS_PROFILE=idevelop-tech npm run dev
# This creates a personal "dev-yourname" stage in AWS

# In another terminal: Start frontend dev server
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

### Deployment Commands
```bash
# Deploy to production (after testing)
AWS_PROFILE=idevelop-tech npx sst deploy --stage production

# View deployment outputs
AWS_PROFILE=idevelop-tech npx sst outputs --stage production

# Remove dev environment (cleanup)
AWS_PROFILE=idevelop-tech npx sst remove --stage dev-yourname
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/backend-api

# Check status
git status

# Stage and commit
git add .
git commit -m "Implement contact form API

- Add API Gateway and Lambda to SST config
- Implement contact form handler with reCAPTCHA
- Add rate limiting with DynamoDB
- Configure SES email sending
- Update frontend to call API endpoint

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push and create PR
git push origin feature/backend-api
gh pr create --title "Implement backend API for contact form" --base main
```

---

## Important Environment Variables

### Frontend (Public - Already Configured)
```bash
# packages/web/.env.production
VITE_API_URL=https://api.idevelop.tech  # Will be set by SST
VITE_RECAPTCHA_SITE_KEY=6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw  # Public
VITE_GA_MEASUREMENT_ID=G-XS6QVSG7MS  # Public
```

### Backend (Secrets - To Be Configured)
**Store in AWS SSM Parameter Store:**
```bash
# reCAPTCHA Secret Key (get from Google reCAPTCHA admin)
aws ssm put-parameter \
  --name "/idevelop-tech/production/recaptcha-secret" \
  --value "YOUR_SECRET_KEY_HERE" \
  --type "SecureString" \
  --profile idevelop-tech

# Verify it was stored
aws ssm get-parameter \
  --name "/idevelop-tech/production/recaptcha-secret" \
  --with-decryption \
  --profile idevelop-tech
```

**Note:** You need to obtain the reCAPTCHA secret key from:
https://www.google.com/recaptcha/admin

---

## Project Structure Reminder

```
idevelop.tech/
├── packages/
│   ├── web/              # Vue 3 frontend (DONE)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── ui/CTAForm.vue  # UPDATE THIS
│   │   │   └── views/
│   │   └── package.json
│   │
│   ├── functions/        # Lambda functions (TO DO)
│   │   ├── src/
│   │   │   └── contact.ts  # IMPLEMENT THIS
│   │   └── package.json
│   │
│   └── core/             # Shared types (DONE)
│       ├── src/
│       │   ├── index.ts
│       │   └── types.ts
│       └── package.json
│
├── sst.config.ts         # ADD INFRASTRUCTURE HERE
├── docs/
│   ├── PROJECT-PLAN.md              # Overall plan
│   ├── CTA-FORM-IMPLEMENTATION-PLAN.md  # API implementation guide
│   └── AWS-SETUP.md                 # AWS configuration
│
└── CLAUDE.md             # Project coding standards
```

---

## Testing Checklist (After Implementation)

### Local Testing (SST Dev Mode)
- [ ] Lambda function deploys successfully
- [ ] API Gateway endpoint created
- [ ] Frontend can call API endpoint
- [ ] reCAPTCHA verification works
- [ ] Email sends successfully
- [ ] Rate limiting works (try multiple submissions)
- [ ] Error handling works
- [ ] TypeScript checks pass

### Production Testing (After Deploy)
- [ ] Deploy to production stage
- [ ] Test contact form on production CloudFront URL
- [ ] Verify email received at matt@idevelop.tech
- [ ] Test from mobile device
- [ ] Test error scenarios

---

## Key Documentation References

### Implementation Guides
1. **`docs/CTA-FORM-IMPLEMENTATION-PLAN.md`** ⭐ PRIMARY REFERENCE
   - Complete API implementation guide
   - Request/response schemas
   - reCAPTCHA integration steps
   - SES email configuration
   - Rate limiting strategy

2. **`docs/PROJECT-PLAN.md`**
   - Overall project phases
   - Phase 5 detailed tasks
   - Success criteria
   - Timeline estimates

3. **`docs/AWS-SETUP.md`**
   - AWS SSO configuration
   - OIDC authentication
   - IAM role setup

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

## Expected Deliverables (Phase 5)

### Code Changes
1. Updated `sst.config.ts` with:
   - API Gateway configuration
   - Lambda function
   - DynamoDB table
   - SES email identity
   - IAM permissions

2. Implemented `packages/functions/src/contact.ts` with:
   - Request validation
   - reCAPTCHA verification
   - Rate limiting logic
   - Email sending via SES
   - Error handling

3. Updated `packages/web/src/components/ui/CTAForm.vue` with:
   - API endpoint integration
   - Loading states
   - Success/error messages

### AWS Resources Created
- API Gateway HTTP API
- Lambda function (contact form handler)
- DynamoDB table (rate limiting)
- SES email identity (matt@idevelop.tech verified)
- SSM parameters (reCAPTCHA secret)

### Testing Results
- All local tests pass
- Production deployment successful
- Contact form works end-to-end
- Emails received successfully

---

## Common Issues & Solutions

### Issue: AWS SSO session expired
```bash
# Solution: Re-authenticate
aws sso login --profile idevelop-tech
```

### Issue: SST dev mode fails to start
```bash
# Solution: Check AWS credentials
aws sts get-caller-identity --profile idevelop-tech

# If that fails, re-login
aws sso login --profile idevelop-tech
```

### Issue: Lambda function fails to read SSM parameter
**Solution:** Verify IAM permissions in `sst.config.ts` include `ssm:GetParameter`

### Issue: SES email not sending
**Solutions:**
1. Verify email address is verified in SES console
2. Check if SES is in sandbox mode (can only send to verified addresses)
3. Request production access if needed

### Issue: Frontend can't call API (CORS error)
**Solution:** Verify CORS configuration in API Gateway setup

---

## Phase 5 Success Criteria

Before moving to Phase 6 (Testing), verify:

- ✅ Contact form submits successfully
- ✅ reCAPTCHA validation works
- ✅ Emails delivered to matt@idevelop.tech
- ✅ Rate limiting prevents abuse
- ✅ Error handling works correctly
- ✅ All TypeScript checks pass (`npm run type-check`)
- ✅ Frontend shows appropriate feedback (loading/success/error)
- ✅ No console errors in browser
- ✅ API response times < 500ms
- ✅ No secrets exposed in code

---

## After Phase 5 Completion

### Next Steps
1. **Phase 6:** Thorough testing (manual + automated)
2. **Phase 7:** Domain migration (idevelop.tech → CloudFront)
3. **Phase 8:** Final security audit → Make repository public

### Timeline
- Phase 5: 4-6 hours
- Phase 6: 2-3 hours
- Phase 7: 1-2 hours + 30min DNS propagation
- Phase 8: 1 hour

**Total remaining:** ~8-12 hours

---

## Quick Start Command Sequence

```bash
# 1. Authenticate with AWS
aws sso login --profile idevelop-tech
export AWS_PROFILE=idevelop-tech

# 2. Verify authentication
aws sts get-caller-identity

# 3. Start SST dev mode (in one terminal)
npm run dev

# 4. Start frontend dev server (in another terminal)
cd packages/web && npm run dev

# 5. Open browser to http://localhost:5173

# 6. Begin implementing (follow docs/CTA-FORM-IMPLEMENTATION-PLAN.md)
```

---

**Ready to start Phase 5! 🚀**

**Primary Reference:** `docs/CTA-FORM-IMPLEMENTATION-PLAN.md`
