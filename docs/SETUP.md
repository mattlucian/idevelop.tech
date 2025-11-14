# Setup Guide

Manual one-time setup for external services and configurations.

**Note**: For development commands and deployment, see the main README.

---

## GitHub Actions (CI/CD)

### Create OIDC Identity Provider

One-time AWS setup for GitHub Actions authentication:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### Create IAM Role

1. Go to [IAM Console](https://console.aws.amazon.com/iam) → Roles → Create role
2. Select "Web identity"
3. Identity provider: `token.actions.githubusercontent.com`
4. Audience: `sts.amazonaws.com`
5. Add condition: `token.actions.githubusercontent.com:sub` = `repo:YOUR_USERNAME/YOUR_REPO:*`
6. Attach policy: `AdministratorAccess` (or more restrictive)
7. Name: `github-actions-role`
8. Copy the role ARN

### Add GitHub Secret

1. Go to repository → Settings → Secrets and variables → Actions
2. New repository secret:
   - Name: `AWS_ROLE_ARN`
   - Value: `arn:aws:iam::ACCOUNT_ID:role/github-actions-role`

**Reference**: `.github/workflows/deploy-*.yml` uses this role for deployments

---

## Email Configuration (Production)

Configure DNS records for email deliverability.

### SPF Record

Allows AWS SES to send email on your behalf:

```
Type: TXT
Host: yourdomain.com
Value: "v=spf1 include:_spf.google.com include:amazonses.com ~all"
```

**Note**: Includes both Google Workspace and AWS SES

### DMARC Record

Email authentication reporting:

```
Type: TXT
Host: _dmarc.yourdomain.com
Value: "v=DMARC1; p=none; rua=mailto:you@yourdomain.com"
```

### DKIM Records (AWS SES)

1. Go to [SES Console](https://console.aws.amazon.com/ses) → Verified identities
2. Select your domain → DKIM authentication
3. Copy the 3 CNAME records
4. Add to your DNS provider

**Verification**: All 3 CNAME records must show "Successful" in SES console

---

## reCAPTCHA

Get site keys from [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin):

1. Register a new site
2. Type: reCAPTCHA v3
3. Domains: `yourdomain.com`, `dev.yourdomain.com`
4. Copy keys:
   - **Site Key** → Add to `.env.production` and `.env.development`
   - **Secret Key** → Store in AWS SSM Parameter Store (see below)

**Environment files**:
- `packages/web/.env.production` → `VITE_RECAPTCHA_SITE_KEY`
- `packages/web/.env.development` → `VITE_RECAPTCHA_SITE_KEY`

**Secret storage** (if using AWS SSM):
```bash
aws ssm put-parameter \
  --name "/your-project/production/recaptcha-secret" \
  --value "YOUR_SECRET_KEY" \
  --type "SecureString"
```

---

## AWS SES Email Verification

Verify sending email address:

1. Go to [SES Console](https://console.aws.amazon.com/ses)
2. Verified identities → Create identity
3. Identity type: Email address or Domain
4. Enter: `you@yourdomain.com` or `yourdomain.com`
5. Verify via email link or DNS records

---

## Custom Domain (Optional)

Update `sst.config.ts` to enable custom domain:

```typescript
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

**Deployment**: Next deployment will configure domain and output nameservers
