# Deployment Setup Guide

**Status:** Ready for Implementation
**Time Estimate:** 2-3 hours
**Last Updated:** 2025-10-31

---

## Overview

This guide walks you through setting up the complete CI/CD pipeline for idevelop.tech using AWS CDK and GitHub Actions.

**What you'll set up:**

1. ✅ AWS CDK infrastructure (S3, CloudFront, Route 53)
2. ✅ GitHub Actions workflows (PR checks, auto-deployment)
3. ✅ AWS IAM roles with OIDC (secure, no access keys)
4. ✅ GitHub repository secrets
5. ✅ SSL certificate (ACM)

**What you get:**

- Automated deployments on merge to main
- PR validation (type check, lint, build)
- Global CDN with HTTPS
- Infrastructure version controlled in code

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] **AWS Account** with admin access
- [ ] **AWS CLI** installed and configured
  - Test: `aws sts get-caller-identity`
- [ ] **Node.js 20+** installed
  - Test: `node --version`
- [ ] **AWS CDK CLI** installed globally
  - Install: `npm install -g aws-cdk`
  - Test: `cdk --version`
- [ ] **Domain** registered (idevelop.tech)
- [ ] **GitHub repository** access with admin permissions

---

## Step 1: Request SSL Certificate (ACM)

**Time:** 10-15 minutes (plus validation time)

### 1.1 Create Certificate in ACM

```bash
# Login to AWS Console
# Navigate to: Certificate Manager (ACM)
# Important: Change region to us-east-1 (required for CloudFront)

# Click "Request certificate"
# Choose "Request a public certificate"
```

### 1.2 Configure Certificate

**Domain names to add:**

```
idevelop.tech
*.idevelop.tech
```

**Validation method:** DNS validation (recommended)

**Key algorithm:** RSA 2048

### 1.3 Validate Certificate

ACM will provide DNS records to add to your domain:

```
Type: CNAME
Name: _xxxxx.idevelop.tech
Value: _xxxxx.acm-validations.aws.
```

**If using Route 53:**

- Click "Create records in Route 53" button (automatic)

**If using external DNS:**

- Add CNAME records manually
- Wait 5-30 minutes for validation

### 1.4 Copy Certificate ARN

Once validated, copy the ARN:

```
arn:aws:acm:us-east-1:123456789012:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Save this - you'll need it for CDK deployment.**

---

## Step 2: Install CDK Dependencies

**Time:** 5 minutes

```bash
# Navigate to infrastructure directory
cd infrastructure

# Install dependencies
npm install

# Install ts-node and source-map-support
npm install --save-dev ts-node source-map-support

# Verify installation
npm run synth -- --help
```

**Expected output:** CDK help text showing available commands.

---

## Step 3: Bootstrap CDK

**Time:** 5 minutes (first time only)

```bash
# Get your AWS account ID
aws sts get-caller-identity

# Bootstrap CDK in us-east-1
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

**What this does:**

- Creates CDK toolkit stack in your AWS account
- Sets up S3 bucket for CDK assets
- Creates IAM roles for CDK deployments
- Only needed once per account/region

**Expected output:**

```
✅ Environment aws://123456789012/us-east-1 bootstrapped
```

---

## Step 4: Deploy Infrastructure with CDK

**Time:** 10-15 minutes

### 4.1 Set Certificate ARN

```bash
# Option 1: Environment variable
export CERTIFICATE_ARN="arn:aws:acm:us-east-1:YOUR_ACCOUNT_ID:certificate/YOUR_CERT_ID"

# Option 2: Create cdk.context.json (in infrastructure/ directory)
cat > infrastructure/cdk.context.json << 'EOF'
{
  "certificateArn": "arn:aws:acm:us-east-1:YOUR_ACCOUNT_ID:certificate/YOUR_CERT_ID",
  "domainName": "idevelop.tech",
  "environment": "production"
}
EOF
```

### 4.2 Preview Infrastructure

```bash
cd infrastructure

# Synthesize CloudFormation template
npm run synth

# Review what will be created
npm run diff
```

### 4.3 Deploy Stack

```bash
# Deploy infrastructure
npm run deploy

# Confirm changes when prompted
# Type "y" and press Enter
```

**Deployment progress:**

```
IdevelopTechFrontend: creating CloudFormation changeset...

✅ IdevelopTechFrontend

Outputs:
IdevelopTechFrontend.BucketName = idevelop-tech-production
IdevelopTechFrontend.DistributionId = E1234567890ABC
IdevelopTechFrontend.DistributionDomainName = d111111abcdef8.cloudfront.net
IdevelopTechFrontend.WebsiteURL = https://idevelop.tech

Stack ARN:
arn:aws:cloudformation:us-east-1:123456789012:stack/idevelop-tech-frontend-production/...
```

### 4.4 Save Stack Outputs

**Copy these values - you'll need them for GitHub Secrets:**

```bash
# Get outputs programmatically
aws cloudformation describe-stacks \
  --stack-name idevelop-tech-frontend-production \
  --query 'Stacks[0].Outputs' \
  --output table
```

**Save these values:**

- `BucketName`: e.g., `idevelop-tech-production`
- `DistributionId`: e.g., `E1234567890ABC`

---

## Step 5: Configure GitHub Actions IAM Role (OIDC)

**Time:** 10 minutes

### 5.1 Create OIDC Provider

```bash
# Check if OIDC provider already exists
aws iam list-open-id-connect-providers

# If not found, create it
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### 5.2 Create IAM Policy

Create file: `github-actions-policy.json`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::idevelop-tech-production",
        "arn:aws:s3:::idevelop-tech-production/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

**Replace:**

- `YOUR_ACCOUNT_ID` with your AWS account ID
- `YOUR_DISTRIBUTION_ID` with the DistributionId from Step 4.4

**Create policy:**

```bash
aws iam create-policy \
  --policy-name GitHubActionsDeploymentPolicy \
  --policy-document file://github-actions-policy.json
```

**Copy the policy ARN from output.**

### 5.3 Create IAM Role

Create file: `github-actions-trust-policy.json`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/idevelop.tech:*"
        }
      }
    }
  ]
}
```

**Replace:**

- `YOUR_ACCOUNT_ID` with your AWS account ID
- `YOUR_GITHUB_USERNAME` with your GitHub username (e.g., `mattlucian`)

**Create role:**

```bash
# Create the role
aws iam create-role \
  --role-name GitHubActionsDeploymentRole \
  --assume-role-policy-document file://github-actions-trust-policy.json

# Attach the policy
aws iam attach-role-policy \
  --role-name GitHubActionsDeploymentRole \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsDeploymentPolicy
```

### 5.4 Get Role ARN

```bash
aws iam get-role \
  --role-name GitHubActionsDeploymentRole \
  --query 'Role.Arn' \
  --output text
```

**Copy the role ARN:**

```
arn:aws:iam::123456789012:role/GitHubActionsDeploymentRole
```

---

## Step 6: Configure GitHub Repository Secrets

**Time:** 5 minutes

### 6.1 Navigate to GitHub Secrets

```
1. Go to: https://github.com/YOUR_USERNAME/idevelop.tech
2. Click: Settings → Secrets and variables → Actions
3. Click: "New repository secret"
```

### 6.2 Add Required Secrets

Add these secrets one by one:

| Secret Name                  | Value                                                         | Source           |
| ---------------------------- | ------------------------------------------------------------- | ---------------- |
| `AWS_ROLE_ARN`               | `arn:aws:iam::123456789012:role/GitHubActionsDeploymentRole`  | Step 5.4         |
| `S3_BUCKET_NAME`             | `idevelop-tech-production`                                    | Step 4.4         |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1234567890ABC`                                              | Step 4.4         |
| `VITE_API_URL`               | `https://api.idevelop.tech`                                   | Your API domain  |
| `VITE_RECAPTCHA_SITE_KEY`    | `6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw`                    | From `.env` file |
| `VITE_GA_MEASUREMENT_ID`     | `G-XS6QVSG7MS`                                                | From `.env` file |
| `CERTIFICATE_ARN` (optional) | `arn:aws:acm:us-east-1:123456789012:certificate/YOUR_CERT_ID` | Step 1.4         |

**Security Note:** The reCAPTCHA site key and GA ID are public values, but storing them in secrets maintains consistency.

---

## Step 7: Verify DNS Configuration

**Time:** 5 minutes

### 7.1 Check Route 53 Records

```bash
# List records in your hosted zone
aws route53 list-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --query "ResourceRecordSets[?Name=='idevelop.tech.']"
```

### 7.2 Verify Records Created

You should see:

- **A record** for `idevelop.tech` → CloudFront alias
- **A record** for `www.idevelop.tech` → CloudFront alias

### 7.3 Manual DNS (if CDK didn't create records)

If records weren't created automatically:

```bash
# Get your hosted zone ID
aws route53 list-hosted-zones \
  --query "HostedZones[?Name=='idevelop.tech.'].Id" \
  --output text

# Get your CloudFront distribution domain
aws cloudformation describe-stacks \
  --stack-name idevelop-tech-frontend-production \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionDomainName'].OutputValue" \
  --output text
```

Create records via AWS Console:

1. Go to Route 53 → Hosted Zones → idevelop.tech
2. Create A record:
   - Name: `idevelop.tech`
   - Type: A
   - Alias: Yes
   - Target: Your CloudFront distribution
3. Create A record for www:
   - Name: `www.idevelop.tech`
   - Type: A
   - Alias: Yes
   - Target: Your CloudFront distribution

---

## Step 8: Test the Deployment Pipeline

**Time:** 10-15 minutes

### 8.1 Test PR Workflow

```bash
# Create a test branch
git checkout -b test/deployment-setup

# Make a small change
echo "<!-- Test deployment setup -->" >> index.html

# Commit and push
git add index.html
git commit -m "Test: Verify PR checks workflow"
git push origin test/deployment-setup
```

**Then:**

1. Go to GitHub and open a Pull Request
2. Watch GitHub Actions tab for PR checks
3. Verify checks run: type-check, lint, build

**Expected result:** ✅ All checks pass, PR shows green checkmark

### 8.2 Test Production Deployment

```bash
# Merge the PR via GitHub UI
# Or merge locally:
git checkout main
git merge test/deployment-setup
git push origin main
```

**Then:**

1. Go to GitHub Actions tab
2. Watch "Deploy to Production" workflow
3. Monitor progress through build, upload, and invalidation

**Expected result:** ✅ Workflow completes, site is deployed

### 8.3 Verify Live Site

```bash
# Test the site
curl -I https://idevelop.tech

# Expected: HTTP/2 200 OK

# Test www redirect
curl -I https://www.idevelop.tech

# Expected: HTTP/2 200 OK
```

**Manual verification:**

1. Open https://idevelop.tech in browser
2. Verify HTTPS with valid certificate
3. Test navigation and all pages
4. Check browser console for errors
5. Verify cookie consent banner appears

---

## Step 9: Initial Manual Deployment (Optional)

**Time:** 5 minutes

If you want to deploy immediately before setting up GitHub Actions:

```bash
# Build the site locally
npm run build

# Upload to S3
cd infrastructure
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name idevelop-tech-frontend-production \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
  --output text)

DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name idevelop-tech-frontend-production \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
  --output text)

# Upload files
aws s3 sync ../dist/ s3://$BUCKET_NAME/ \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

aws s3 cp ../dist/index.html s3://$BUCKET_NAME/index.html \
  --cache-control "public,max-age=0,must-revalidate"

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths "/*"

echo "✅ Deployment complete! Site available at https://idevelop.tech"
```

---

## Troubleshooting

### Certificate Validation Stuck

**Problem:** Certificate stays in "Pending validation" status

**Solution:**

1. Verify CNAME records added to DNS
2. Check DNS propagation: `dig _xxxxx.idevelop.tech`
3. Wait up to 30 minutes for validation
4. If Route 53: ensure hosted zone is active

### CDK Bootstrap Error

**Problem:** `CDKToolkit stack doesn't exist`

**Solution:**

```bash
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

### GitHub Actions Authentication Failed

**Problem:** `Error: Could not assume role`

**Solution:**

1. Verify OIDC provider exists: `aws iam list-open-id-connect-providers`
2. Check role trust policy matches your GitHub repo
3. Verify role ARN in GitHub Secrets is correct
4. Check role has correct permissions attached

### CloudFront Invalidation Slow

**Problem:** Site not updating after deployment

**Solution:**

- Invalidations take 1-5 minutes to complete
- Wait for invalidation to finish
- Check invalidation status:
  ```bash
  aws cloudfront get-invalidation \
    --distribution-id YOUR_DIST_ID \
    --id YOUR_INVALIDATION_ID
  ```

### DNS Not Resolving

**Problem:** Domain doesn't point to CloudFront

**Solution:**

1. Verify Route 53 records: `dig idevelop.tech`
2. Check nameservers: `dig NS idevelop.tech`
3. Wait for DNS propagation (up to 48 hours, usually < 1 hour)
4. Test CloudFront directly: `curl https://d111111abcdef8.cloudfront.net`

---

## Post-Setup Checklist

After completing setup, verify:

- [ ] Certificate is validated and shows "Issued" status
- [ ] CDK stack deployed successfully
- [ ] GitHub Actions workflows exist in `.github/workflows/`
- [ ] All GitHub Secrets configured
- [ ] DNS records point to CloudFront
- [ ] Test PR opens and runs checks
- [ ] Test deployment completes successfully
- [ ] Site loads at https://idevelop.tech
- [ ] HTTPS certificate valid (not browser warning)
- [ ] Cookie consent banner appears
- [ ] All pages navigate correctly

---

## Next Steps

✅ **Infrastructure Setup Complete!**

**Now you can:**

1. **Deploy Backend API**
   - Follow `/docs/CTA-FORM-IMPLEMENTATION-PLAN.md` Section 6
   - Use SST.dev to create contact form API
   - Deploy to api.idevelop.tech

2. **Integrate Contact Form**
   - Create API types and service
   - Update CTAForm component
   - Test end-to-end submission

3. **Monitor and Optimize**
   - Check CloudWatch logs
   - Review CloudFront metrics
   - Run Lighthouse audit
   - Optimize performance

---

## Maintenance

### Updating Infrastructure

```bash
# Make changes to infrastructure/lib/frontend-stack.ts
cd infrastructure

# Preview changes
npm run diff

# Deploy updates
npm run deploy
```

### Rolling Back Deployment

**Option 1: Revert commit**

```bash
git revert HEAD
git push origin main
# Triggers automatic redeployment
```

**Option 2: Restore S3 version**

```bash
# List object versions
aws s3api list-object-versions --bucket idevelop-tech-production

# Copy previous version
aws s3api copy-object \
  --bucket idevelop-tech-production \
  --copy-source "idevelop-tech-production/index.html?versionId=VERSION_ID" \
  --key index.html
```

### Destroying Infrastructure

**Warning:** This deletes all infrastructure. Only use for teardown.

```bash
cd infrastructure
npm run destroy

# Confirm with "y"
```

---

## Cost Monitoring

### View Current Costs

```bash
# Check S3 storage
aws s3 ls s3://idevelop-tech-production --recursive --summarize

# View CloudWatch metrics (via console)
# Go to: CloudFront → Distributions → Your Distribution → Monitoring
```

### Expected Monthly Costs

- S3: ~$0.00 (< 1 GB)
- CloudFront: ~$0.85 (10 GB transfer)
- Route 53: ~$0.90 (hosted zone + queries)
- **Total: ~$1.75/month**

### Free Tier Benefits (First 12 Months)

- CloudFront: 1 TB data transfer
- Lambda: 1M requests (for backend API)
- S3: 5 GB storage, 20K GET requests

---

## Support Resources

### Documentation

- **This Project**: `/docs/DEPLOYMENT-PLAN.md`
- **AWS CDK**: https://docs.aws.amazon.com/cdk/
- **GitHub Actions**: https://docs.github.com/en/actions
- **CloudFront**: https://docs.aws.amazon.com/cloudfront/

### AWS Console Links

- **CloudFormation**: https://console.aws.amazon.com/cloudformation
- **S3**: https://console.aws.amazon.com/s3
- **CloudFront**: https://console.aws.amazon.com/cloudfront
- **Route 53**: https://console.aws.amazon.com/route53
- **Certificate Manager**: https://console.aws.amazon.com/acm
- **IAM**: https://console.aws.amazon.com/iam

### CLI Helpers

```bash
# View stack outputs
aws cloudformation describe-stacks \
  --stack-name idevelop-tech-frontend-production \
  --query 'Stacks[0].Outputs'

# Check CloudFront distribution status
aws cloudfront get-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --query 'Distribution.Status'

# List GitHub Actions runs (requires gh CLI)
gh run list --workflow=deploy-production.yml
```

---

**Setup Complete! 🎉**

You now have a fully automated deployment pipeline with Infrastructure as Code!
