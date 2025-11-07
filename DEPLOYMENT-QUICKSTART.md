# Deployment Quick Start

**Created:** 2025-10-31
**Status:** ✅ Infrastructure Code Ready - Awaiting AWS Setup

---

## What's Been Built

I've created a complete CI/CD pipeline with Infrastructure as Code for your idevelop.tech frontend:

### ✅ AWS CDK Infrastructure (`/infrastructure`)

- **FrontendStack** - Complete AWS infrastructure definition:
  - S3 bucket for static hosting (with versioning)
  - CloudFront distribution with Origin Access Control
  - Security headers (HSTS, XSS protection, etc.)
  - Cache policies (long-lived for assets, no-cache for HTML)
  - Route 53 DNS configuration (automatic)
  - Error handling for SPA routing

- **Entry Point** (`bin/idevelop-frontend.ts`) - CDK app configuration
- **Configuration** (`cdk.json`) - CDK settings and feature flags
- **Package Files** - TypeScript compilation and CDK commands

### ✅ GitHub Actions Workflows (`/.github/workflows`)

- **PR Checks** (`pr-checks.yml`):
  - Runs on every pull request
  - Type checking, linting, build validation
  - Posts results as PR comments

- **Production Deployment** (`deploy-production.yml`):
  - Triggers on merge to main
  - Builds production bundle
  - Uploads to S3 with smart caching
  - Invalidates CloudFront
  - Posts deployment summary

### ✅ Documentation

- `/docs/DEPLOYMENT-PLAN.md` - Comprehensive deployment strategy
- `/docs/DEPLOYMENT-SETUP-GUIDE.md` - Step-by-step setup instructions
- `/infrastructure/README.md` - Infrastructure-specific docs

---

## What You Need to Do

Follow these steps in order. **Estimated time: 2-3 hours**

### 1. Request SSL Certificate (15 min)

```bash
# AWS Console → Certificate Manager (ACM)
# Region: us-east-1 (REQUIRED for CloudFront)
# Request certificate for: idevelop.tech, *.idevelop.tech
# Validation: DNS (CNAME records)
# Copy the Certificate ARN when validated
```

**Save the ARN:** `arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID`

### 2. Install CDK Dependencies (5 min)

```bash
# Install AWS CDK CLI globally
npm install -g aws-cdk

# Install infrastructure dependencies
cd infrastructure
npm install
```

### 3. Bootstrap CDK (5 min)

```bash
# Get your AWS account ID
aws sts get-caller-identity

# Bootstrap CDK (first time only)
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

### 4. Deploy Infrastructure (15 min)

```bash
# Set certificate ARN
export CERTIFICATE_ARN="arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID"

# Preview what will be created
npm run synth
npm run diff

# Deploy!
npm run deploy
# Type "y" when prompted

# Save the outputs:
# - BucketName (e.g., idevelop-tech-production)
# - DistributionId (e.g., E1234567890ABC)
```

### 5. Configure GitHub Actions IAM (15 min)

```bash
# Create OIDC provider
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

**Then create IAM policy and role** - See Step 5 in `/docs/DEPLOYMENT-SETUP-GUIDE.md`

**Save the Role ARN:** `arn:aws:iam::ACCOUNT_ID:role/GitHubActionsDeploymentRole`

### 6. Add GitHub Secrets (5 min)

Go to: `GitHub → Settings → Secrets and variables → Actions`

Add these secrets:

| Secret Name                    | Value                                       | Source      |
| ------------------------------ | ------------------------------------------- | ----------- |
| `AWS_ROLE_ARN`                 | Role ARN from Step 5                        | IAM Console |
| `S3_BUCKET_NAME`               | Bucket name from Step 4                     | CDK Output  |
| `CLOUDFRONT_DISTRIBUTION_ID`   | Distribution ID from Step 4                 | CDK Output  |
| `VITE_API_URL`                 | `https://api.idevelop.tech`                 | Manual      |
| `VITE_RECAPTCHA_SITE_KEY`      | `6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw` | .env file   |
| `VITE_GA_MEASUREMENT_ID`       | `G-XS6QVSG7MS`                              | .env file   |

### 7. Test Deployment (15 min)

```bash
# Create test branch
git checkout -b test/deployment-setup

# Make a small change
echo "<!-- Test -->" >> README.md

# Commit and push
git add .
git commit -m "Test: CI/CD pipeline setup"
git push origin test/deployment-setup

# Open PR on GitHub
# Watch GitHub Actions run PR checks ✅

# Merge PR
# Watch GitHub Actions deploy to production ✅

# Verify site
curl -I https://idevelop.tech
# Expected: HTTP/2 200 OK
```

---

## Quick Commands Reference

### CDK Commands (in `/infrastructure`)

```bash
npm run synth     # Preview CloudFormation template
npm run diff      # Show changes before deploying
npm run deploy    # Deploy infrastructure
npm run destroy   # Tear down infrastructure
```

### Verify Deployment

```bash
# Check stack outputs
aws cloudformation describe-stacks \
  --stack-name idevelop-tech-frontend-production \
  --query 'Stacks[0].Outputs'

# Check S3 bucket
aws s3 ls s3://idevelop-tech-production/

# Check CloudFront status
aws cloudfront get-distribution --id YOUR_DIST_ID

# Check DNS
dig idevelop.tech
```

### Manual Deployment (if needed)

```bash
# Build site
npm run build

# Upload to S3
aws s3 sync dist/ s3://BUCKET_NAME/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Repository                       │
│                                                              │
│  1. Developer pushes to main branch                         │
│  2. GitHub Actions workflow triggered                       │
│  3. Build production bundle with environment variables      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS Infrastructure                        │
│                   (Managed by CDK)                          │
│                                                              │
│  ┌─────────────────┐       ┌──────────────────┐           │
│  │   S3 Bucket     │◄──────│  CloudFront CDN  │           │
│  │                 │       │  (Global Edge)   │           │
│  │  Static Files   │       │  - HTTPS Only    │           │
│  │  - HTML         │       │  - TLS 1.2+      │           │
│  │  - JS/CSS       │       │  - Security Hdrs │           │
│  │  - Images       │       └────────┬─────────┘           │
│  └─────────────────┘                │                      │
│                                     │                      │
│  ┌─────────────────┐                │                      │
│  │   Route 53      │◄───────────────┘                      │
│  │                 │                                        │
│  │  idevelop.tech ──────► CloudFront Alias                │
│  │  www.idevelop.tech ──► CloudFront Alias                │
│  └─────────────────┘                                        │
│                                                              │
│  ┌─────────────────┐                                        │
│  │   ACM Cert      │                                        │
│  │  *.idevelop.tech│  (SSL/TLS for HTTPS)                 │
│  └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Deployment Flow

```
Developer Workflow:
1. Create feature branch
2. Make changes
3. Open Pull Request
   └─> GitHub Actions: PR Checks
       ├─> Type check ✓
       ├─> Linting ✓
       └─> Build test ✓
4. Review and approve
5. Merge to main
   └─> GitHub Actions: Deploy
       ├─> Build production bundle
       ├─> Upload to S3
       ├─> Invalidate CloudFront
       └─> ✅ Deployment complete!

User Experience:
1. Visit https://idevelop.tech
2. CloudFront (edge location) serves cached content
3. HTTPS with valid certificate
4. Fast global delivery
```

---

## Cost Estimate

**Monthly (Low Traffic):**
- S3 Storage: ~$0.00 (< 1 GB)
- CloudFront: ~$0.85 (10 GB transfer)
- Route 53: ~$0.90 (hosted zone + queries)
- **Total: ~$1.75/month**

**First 12 Months:**
- CloudFront Free Tier: 1 TB data transfer
- Effective cost: ~$0.90/month (Route 53 only)

---

## Security Features

✅ Implemented:
- S3 bucket encryption (S3-managed)
- S3 bucket versioning (rollback capability)
- CloudFront Origin Access Control (OAC)
- HTTPS enforced (TLS 1.2+)
- Security headers (HSTS, XSS protection, frame options)
- GitHub OIDC (no long-lived AWS credentials)
- IAM least privilege access

---

## Troubleshooting

### Certificate validation stuck?
- Verify CNAME records in DNS
- Wait up to 30 minutes
- Check: `dig _xxxxx.idevelop.tech`

### CDK bootstrap error?
```bash
cdk bootstrap aws://ACCOUNT_ID/us-east-1
```

### GitHub Actions auth failed?
- Verify OIDC provider exists
- Check role trust policy matches repo
- Verify role ARN in secrets

### Site not updating?
- Wait 1-5 minutes for CloudFront invalidation
- Check invalidation status in AWS Console
- Clear browser cache

---

## Next Steps After Deployment

1. ✅ **Verify Site Live**
   - Visit https://idevelop.tech
   - Test all pages and navigation
   - Verify HTTPS certificate valid

2. 🔨 **Deploy Backend API**
   - Follow `/docs/CTA-FORM-IMPLEMENTATION-PLAN.md`
   - Use SST.dev for contact form API
   - Deploy to api.idevelop.tech

3. 🔗 **Integrate Contact Form**
   - Create API types and service
   - Update CTAForm component
   - Test end-to-end submission

4. 📊 **Monitor Performance**
   - Run Lighthouse audit
   - Check CloudWatch metrics
   - Optimize based on data

---

## Support Resources

### Documentation
- **Setup Guide**: `/docs/DEPLOYMENT-SETUP-GUIDE.md` (detailed step-by-step)
- **Deployment Plan**: `/docs/DEPLOYMENT-PLAN.md` (comprehensive reference)
- **Infrastructure Docs**: `/infrastructure/README.md` (CDK-specific)

### AWS Console Links
- [CloudFormation Stacks](https://console.aws.amazon.com/cloudformation)
- [S3 Buckets](https://console.aws.amazon.com/s3)
- [CloudFront Distributions](https://console.aws.amazon.com/cloudfront)
- [Route 53 Hosted Zones](https://console.aws.amazon.com/route53)
- [Certificate Manager](https://console.aws.amazon.com/acm)
- [IAM Roles](https://console.aws.amazon.com/iam)

### CLI Helpers
```bash
# Get stack outputs
aws cloudformation describe-stacks --stack-name idevelop-tech-frontend-production

# View GitHub Actions runs (requires gh CLI)
gh run list --workflow=deploy-production.yml

# Monitor CloudFront
aws cloudfront get-distribution --id DIST_ID
```

---

## Files Created

```
/infrastructure/
├── bin/
│   └── idevelop-frontend.ts       # CDK app entry point
├── lib/
│   └── frontend-stack.ts          # S3 + CloudFront + Route 53 stack
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── cdk.json                       # CDK configuration
├── .gitignore                     # Ignore build artifacts
└── README.md                      # Infrastructure docs

/.github/workflows/
├── pr-checks.yml                  # PR validation workflow
└── deploy-production.yml          # Production deployment workflow

/docs/
├── DEPLOYMENT-PLAN.md             # Comprehensive deployment docs
├── DEPLOYMENT-SETUP-GUIDE.md      # Step-by-step setup guide
└── CTA-FORM-IMPLEMENTATION-PLAN.md # Updated with status
```

---

## Ready to Deploy!

Follow the 7 steps above, and you'll have a fully automated deployment pipeline running in 2-3 hours.

**Start here:** `/docs/DEPLOYMENT-SETUP-GUIDE.md` (detailed walkthrough)

Good luck! 🚀
