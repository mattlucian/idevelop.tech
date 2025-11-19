# Production Deployment Plan - Custom Domain Migration

**Target**: Migrate from CloudFront URL to idevelop.tech
**Current**: https://dxeay6n8brs8g.cloudfront.net
**Risk**: DNS changes only (code already tested in dev)

---

## Pre-Flight Checklist

- [ ] Clean git status (`git status`)
- [ ] Code quality checks pass (from `packages/web/`):
  ```bash
  npm run type-check  # Must show 0 errors
  npm run lint        # Must show 0 errors
  npm run format      # Format all files
  ```

---

## Deployment Steps

### Step 1: Merge Code to Main

**1.1: Merge docs/monitoring-updates → develop**

```bash
gh pr create --base develop \
  --title "docs: Add monitoring documentation updates" \
  --body "Merge monitoring docs updates"
```

Wait for PR to merge (won't trigger deployment - docs only).

**1.2: Merge develop → main (75 commits)**

```bash
git checkout develop && git pull origin develop

gh pr create --base main \
  --title "chore: Sync production with develop - 75 commits" \
  --body "Deploy all develop changes to production (observability, email, Lighthouse, code quality, etc.)"
```

Wait for:
- [ ] PR checks pass
- [ ] PR merges
- [ ] GitHub Actions deployment completes (~5-10 min)
- [ ] Verify CloudFront site works: https://dxeay6n8brs8g.cloudfront.net

---

### Step 2: Prepare Custom Domain PR (Don't Merge Yet!)

**2.1: Create feature branch**

```bash
git checkout main && git pull origin main
git checkout -b feature/enable-production-domain
```

**2.2: Update sst.config.ts**

Change lines 142-146:

```typescript
// OLD:
domain: isProduction ? undefined : { name: "dev.idevelop.tech" }

// NEW:
domain: isProduction
  ? { name: "idevelop.tech", redirects: ["www.idevelop.tech"] }
  : { name: "dev.idevelop.tech" }
```

Delete comment on lines 138-141 (outdated Phase 7 reference).

**2.3: Commit and create PR (but don't merge)**

```bash
git add sst.config.ts
git commit -m "feat: Enable custom domain for production (idevelop.tech)"
git push origin feature/enable-production-domain

gh pr create --base main \
  --title "feat: Enable custom domain for production" \
  --body "Enable idevelop.tech as production domain with www redirect"
```

**WAIT for PR checks to pass, but DO NOT MERGE YET!**

- [ ] PR checks pass (green checkmark)
- [ ] PR is ready to merge
- [ ] **STOP HERE - proceed to Step 3**

---

### Step 3: Delete DNS & Immediately Merge PR

**⚠️ DOWNTIME BEGINS - Complete Steps 3 & 4 quickly to minimize downtime**

**3.1: Delete Wix DNS records**

```bash
# Delete apex A record
AWS_PROFILE=idevelop-tech aws route53 change-resource-record-sets \
  --hosted-zone-id Z03094451DRNX224UVGJW \
  --change-batch '{
    "Changes": [{
      "Action": "DELETE",
      "ResourceRecordSet": {
        "Name": "idevelop.tech.",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [{"Value": "185.230.63.107"}]
      }
    }]
  }'

# Delete www CNAME record
AWS_PROFILE=idevelop-tech aws route53 change-resource-record-sets \
  --hosted-zone-id Z03094451DRNX224UVGJW \
  --change-batch '{
    "Changes": [{
      "Action": "DELETE",
      "ResourceRecordSet": {
        "Name": "www.idevelop.tech.",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "pointing.wixdns.net"}]
      }
    }]
  }'
```

**3.2: Immediately merge PR**

```bash
# Merge via GitHub CLI (fastest)
gh pr merge --merge --delete-branch

# Or click "Merge" button in GitHub web UI
```

This triggers GitHub Actions auto-deployment immediately.

---

### Step 4: Monitor Auto-Deployment

GitHub Actions is now running (triggered by Step 3.2 merge).

**Monitor**: https://github.com/mattlucian/idevelop.tech/actions

Watch for:
- [ ] ACM certificate request (~2-3 min)
- [ ] Certificate validation via DNS (~2-5 min)
- [ ] CloudFront distribution update (~5-10 min)
- [ ] Deployment completes successfully

**⚠️ DOWNTIME WINDOW**: ~10-20 minutes (from Step 3.1 until deployment completes)

---

### Step 5: Verify Site

```bash
# Check DNS propagation
dig idevelop.tech A +short

# Should show CloudFront IPs (not 185.230.63.107)
```

**Test**:
- [ ] https://idevelop.tech loads correctly
- [ ] https://www.idevelop.tech redirects to https://idevelop.tech
- [ ] SSL certificate valid (check browser padlock)
- [ ] Contact form works
- [ ] No console errors

---

## Rollback (If Needed)

**If site not working after Step 4, restore Wix DNS:**

First, check what records exist:
```bash
AWS_PROFILE=idevelop-tech aws route53 list-resource-record-sets \
  --hosted-zone-id Z03094451DRNX224UVGJW \
  --query "ResourceRecordSets[?Name=='idevelop.tech.' || Name=='www.idevelop.tech.']"
```

**Option 1: If CloudFront records exist (SST created them)**

Delete CloudFront records first, then create Wix records:

```bash
# Delete CloudFront apex A alias record (if exists)
# Note: Get exact values from list-resource-record-sets output above
# Alias records have "AliasTarget" instead of "ResourceRecords"

# After deleting CloudFront records, create Wix records:
AWS_PROFILE=idevelop-tech aws route53 change-resource-record-sets \
  --hosted-zone-id Z03094451DRNX224UVGJW \
  --change-batch '{
    "Changes": [
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "idevelop.tech.",
          "Type": "A",
          "TTL": 300,
          "ResourceRecords": [{"Value": "185.230.63.107"}]
        }
      },
      {
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "www.idevelop.tech.",
          "Type": "CNAME",
          "TTL": 300,
          "ResourceRecords": [{"Value": "pointing.wixdns.net"}]
        }
      }
    ]
  }'
```

**Option 2: Simple UPSERT (works whether CloudFront records exist or not)**

Use UPSERT to replace any existing records:

```bash
# This will replace CloudFront records with Wix records if they exist
# Or create Wix records if no records exist
AWS_PROFILE=idevelop-tech aws route53 change-resource-record-sets \
  --hosted-zone-id Z03094451DRNX224UVGJW \
  --change-batch '{
    "Changes": [
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "idevelop.tech.",
          "Type": "A",
          "TTL": 300,
          "ResourceRecords": [{"Value": "185.230.63.107"}]
        }
      },
      {
        "Action": "UPSERT",
        "ResourceRecordSet": {
          "Name": "www.idevelop.tech.",
          "Type": "CNAME",
          "TTL": 300,
          "ResourceRecords": [{"Value": "pointing.wixdns.net"}]
        }
      }
    ]
  }'
```

**Note**: UPSERT won't work if trying to replace alias records with regular records (different record types). In that case, you must DELETE the alias records first (Option 1).

DNS will restore to Wix in 5-30 minutes (depends on propagation).

---

## Quick Reference

**Hosted Zone ID**: Z03094451DRNX224UVGJW

**Wix DNS (for rollback)**:
- `idevelop.tech.` A → 185.230.63.107
- `www.idevelop.tech.` CNAME → pointing.wixdns.net

**Current CloudFront URL**: https://dxeay6n8brs8g.cloudfront.net

**GitHub Actions**: https://github.com/mattlucian/idevelop.tech/actions

---

**Total Time**: ~1-2 hours (mostly waiting for CI/CD and DNS propagation)
