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

## GitHub Repository Configuration

### Branch Protection Rules

Configure branch protection to enforce PR workflow and prevent accidental direct pushes.

**For `main` branch:**
```bash
gh api repos/OWNER/REPO/branches/main/protection -X PUT --input - << 'EOF'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["PR Checks", "CodeQL"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0
  },
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
```

**For `develop` branch:**
```bash
gh api repos/OWNER/REPO/branches/develop/protection -X PUT --input - << 'EOF'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["PR Checks"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0
  },
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
```

**What this does:**
- Requires pull requests before merging (no direct pushes)
- Requires status checks to pass (PR Checks, CodeQL for main)
- Enforces rules for admins (no bypass allowed)
- Prevents force pushes and branch deletion
- Dismisses stale reviews when new commits are pushed

### Automatic Branch Deletion

Enable automatic deletion of feature branches after PR merge:

```bash
gh api repos/OWNER/REPO -X PATCH --input - << 'EOF'
{
  "delete_branch_on_merge": true
}
EOF
```

**Benefits:**
- Keeps repository clean with only active branches
- Automatically removes merged feature branches
- Enforces completion of work before starting new features
- Typical state: Only `main`, `develop`, and 1-2 active feature branches

**Cleanup local branches:**
```bash
# Prune stale remote references
git fetch --prune

# Delete local branches that no longer exist on remote
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
```

**Reference**: See `docs/BRANCH-STRATEGY.md` for complete branch workflow

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

## New Relic Observability

Configure New Relic for Lambda monitoring, distributed tracing, and APM.

### Create New Relic Account

1. Sign up at [New Relic](https://newrelic.com/signup)
2. Free tier includes **100 GB/month** data ingestion with unlimited alerts
3. Note your Account ID from the account dropdown (e.g., 7377610)

**Note**: Sign up directly via New Relic website (AWS Marketplace signup also works)

### Get License Key

1. Go to [API Keys](https://one.newrelic.com/launcher/api-keys-ui.api-keys-launcher) in New Relic dashboard
2. Create or copy an existing **Ingest - License** key
   - **Important**: Use the Ingest License key (used for sending data), NOT the User API key (starts with NRAK)
   - If no ingest key exists, create one: Click "Create a key" → Type: "Ingest - License"
3. Copy the key value (shown only once during creation)

### Set SST Secrets

Store the license key as an SST secret (encrypted in AWS Parameter Store):

**Development:**
```bash
npx sst secret set NewRelicLicenseKey YOUR_LICENSE_KEY_HERE --stage dev
```

**Production:**
```bash
npx sst secret set NewRelicLicenseKey YOUR_LICENSE_KEY_HERE --stage production
```

**Note**: You can use the same license key for both dev and production. Service differentiation is handled via `NEW_RELIC_APP_NAME` environment variable (dev-api-idevelop-tech vs api-idevelop-tech).

**Verification:**
```bash
npx sst secret list --stage dev
npx sst secret list --stage production
```

### Verify Integration

After deployment, verify your service appears in New Relic:

1. Deploy your application: `npx sst deploy --stage dev`
2. Trigger a Lambda invocation (e.g., submit contact form)
3. Go to [New Relic APM](https://one.newrelic.com/nr1-core?filters=(domain%3D%27APM%27ANDtype%3D%27APPLICATION%27))
4. You should see your service: `dev-api-idevelop-tech` (or `api-idevelop-tech` for production)
5. Click into the service to view:
   - Distributed traces with full request flow
   - Lambda logs with request/response details
   - Performance metrics (duration, throughput, errors)
   - Cold start tracking
   - AWS service call timing (DynamoDB, SES, etc.)

**NRQL Query Examples:**
```sql
-- View recent transactions
SELECT * FROM Transaction
WHERE appName = 'dev-api-idevelop-tech'
SINCE 1 hour ago

-- Track HTTP status codes
SELECT count(*) FROM Transaction
WHERE appName = 'dev-api-idevelop-tech'
FACET http.statusCode
SINCE 1 day ago

-- Monitor error rate
SELECT percentage(count(*), WHERE error IS true)
FROM Transaction
WHERE appName = 'dev-api-idevelop-tech'
TIMESERIES SINCE 1 day ago
```

**Reference**:
- Lambda configuration: `sst.config.ts` (New Relic Node.js 20 APM layer)
- Architecture documentation: `docs/ARCHITECTURE.md` (Observability & Monitoring section)
- Platform comparison: `docs/OBSERVABILITY-COMPARISON.md`
- Latest layer versions: https://layers.newrelic-external.com/

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
