# Setup Guide

Quick setup instructions for forking and deploying this project.

---

## Prerequisites

- Node.js 20+
- AWS Account
- Domain name (optional, uses CloudFront URL by default)

---

## 1. AWS Configuration

### Install AWS CLI

```bash
# Mac
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install
```

### Configure AWS SSO

```bash
aws configure sso

# Prompts:
# - SSO session name: your-project-sso
# - SSO start URL: https://d-xxxxxxxxxx.awsapps.com/start
# - SSO region: us-east-1
# - CLI profile name: your-project
```

### Login to AWS

```bash
aws sso login --profile your-project
export AWS_PROFILE=your-project
aws sts get-caller-identity  # Verify
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Project

### Update `sst.config.ts`

```typescript
// Change app name
const app = new aws.sst.App({
  name: "your-project-name",  // Change this
  home: "aws",
  providers: {
    aws: {
      region: "us-east-1",
    },
  },
});

// Configure domain (optional)
domain: isProduction
  ? {
      name: "yourdomain.com",
      dns: sst.cloudflare.dns(),  // or sst.aws.dns()
    }
  : {
      name: "dev.yourdomain.com",
      dns: sst.cloudflare.dns(),
    }
```

### Update `packages/web/src/constants/index.ts`

```typescript
export const SITE = {
  name: 'Your Site Name',
  url: 'https://yourdomain.com',
  companyName: 'Your Company LLC',
  // ... other constants
}

export const CONTACT = {
  email: 'you@yourdomain.com',
  // ... other contact info
}
```

### Environment Variables

Contact form requires:
- **reCAPTCHA**: Get site key from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
- **AWS SES**: Verify email identity in [AWS SES Console](https://console.aws.amazon.com/ses)

```bash
# Store in AWS Systems Manager Parameter Store
aws ssm put-parameter \
  --name "/your-project/dev/recaptcha-secret" \
  --value "YOUR_SECRET_KEY" \
  --type "SecureString"

aws ssm put-parameter \
  --name "/your-project/production/recaptcha-secret" \
  --value "YOUR_SECRET_KEY" \
  --type "SecureString"
```

---

## 4. Deploy

### Dev Environment

```bash
npm run dev  # Deploys to personal dev stage
```

### Production Deployment

Set up GitHub Actions:

1. Configure AWS OIDC in GitHub (see below)
2. Push to `main` branch → auto-deploys production
3. Push to `develop` branch → auto-deploys dev stage

---

## 5. GitHub Actions Setup

### Create OIDC Identity Provider (One-Time)

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### Create IAM Role for GitHub Actions

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Create role → Web identity → GitHub token.actions.githubusercontent.com
3. Add condition: `token.actions.githubusercontent.com:sub` = `repo:YOUR_GITHUB_USERNAME/YOUR_REPO:*`
4. Attach `AdministratorAccess` policy (or more restrictive)
5. Copy role ARN

### Add GitHub Secret

1. Go to repository → Settings → Secrets and variables → Actions
2. Add secret: `AWS_ROLE_ARN` = `arn:aws:iam::ACCOUNT_ID:role/github-actions-role`

---

## 6. Email Configuration

### SES Production Access (Required)

By default, AWS SES is in sandbox mode and can only send to verified email addresses. For the contact form to work with customer emails:

1. Request production access: [SES Console](https://console.aws.amazon.com/ses) → Account dashboard → "Request production access"
2. Fill out the form (see `docs/SES-SANDBOX-PRODUCTION.md` for detailed instructions)
3. Usually approved within 24 hours

**Without production access**, the contact form will fail when customers submit with unverified email addresses.

### Email Authentication (Optional)

For production email deliverability, configure:

**SPF Record:**
```
yourdomain.com  TXT  "v=spf1 include:amazonses.com ~all"
```

**DMARC Record:**
```
_dmarc.yourdomain.com  TXT  "v=DMARC1; p=none; rua=mailto:you@yourdomain.com"
```

**SES DKIM:**
1. Go to [SES Console](https://console.aws.amazon.com/ses)
2. Verified identities → Select domain → DKIM
3. Add 3 CNAME records to DNS

---

## Quick Commands

```bash
# Development
cd packages/web && npm run dev  # Frontend only
AWS_PROFILE=your-project npm run dev  # Full-stack with SST

# Type checking
cd packages/web && npm run type-check

# Deployment
git push origin develop  # Deploy to dev
git push origin main     # Deploy to production

# AWS
aws sso login --profile your-project
export AWS_PROFILE=your-project
```

---

## Documentation

- **`docs/PROJECT-PLAN.md`** - Implementation phases and project plan
- **`docs/BRANCH-STRATEGY.md`** - Git workflow and CI/CD
- **`docs/QUICK-START.md`** - Quick reference for common tasks
- **`CLAUDE.md`** - Development guidelines and coding standards

---

## Architecture

- **Frontend**: Vue 3 + TypeScript + Tailwind CSS
- **Backend**: AWS Lambda (Node.js)
- **Database**: DynamoDB
- **Email**: AWS SES
- **Hosting**: S3 + CloudFront
- **IaC**: SST v3

See `packages/web/docs/ARCHITECTURE.md` for frontend architecture details.
