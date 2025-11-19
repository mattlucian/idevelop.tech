# Branch Strategy

## Overview

This repository uses a **two-branch deployment strategy** with separate environments for development and production.

---

## Branch Structure

```
feature/* → PR → develop → PR → main
              ↓              ↓
          dev stage    production stage
     (dev.idevelop.tech)  (idevelop.tech)
```

---

## Branches

### `develop` - Development/Staging Branch
- **Purpose:** Integration branch for features before production
- **Deployment:** Automatically deploys to `dev` stage on push
- **Environment:**
  - Frontend: https://dev.idevelop.tech
  - API: https://dev-api.idevelop.tech
  - Stage: `dev`
- **Protection:** ✅ **ENABLED**
  - Require PR before merge
  - Require status checks: PR Checks
  - Enforce for admins (no bypass allowed)
  - No force pushes
  - No deletions
- **Workflow:** `.github/workflows/deploy-dev.yml`

### `main` - Production Branch
- **Purpose:** Stable production-ready code
- **Deployment:** Automatically deploys to `production` stage on push
- **Environment:**
  - Frontend: CloudFront URL (custom domain pending)
  - API: https://api.idevelop.tech
  - Stage: `production`
- **Protection:** ✅ **ENABLED**
  - Require PR before merge
  - Require status checks: PR Checks, CodeQL
  - Enforce for admins (no bypass allowed)
  - No force pushes
  - No deletions
- **Workflow:** `.github/workflows/deploy-production.yml`

---

## Workflow

### Development Flow

1. **Create feature branch** from `develop`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and create PR to `develop`**
   ```bash
   git push origin feature/my-feature
   gh pr create --base develop --title "feat: add new feature"
   ```

4. **PR Checks run automatically**
   - Type checking
   - Build validation
   - Linting
   - Security scans (CodeQL, Snyk)

5. **Merge PR → Automatic deployment to dev**
   - Frontend: https://dev.idevelop.tech
   - API: https://dev-api.idevelop.tech
   - Test functionality on dev environment

6. **When ready for production, create PR from `develop` to `main`**
   ```bash
   gh pr create --base main --head develop --title "release: version x.x.x"
   ```

7. **Merge to main → Automatic deployment to production**
   - Frontend: CloudFront URL (custom domain pending)
   - API: https://api.idevelop.tech

---

## GitHub Actions Workflows

### `.github/workflows/pr-checks.yml`
- **Triggers:** Pull requests to `develop` or `main`
- **Purpose:** Validate code quality before merge
- **Checks:**
  - TypeScript type checking
  - Frontend build
  - ESLint
  - CodeQL security scanning
  - Snyk dependency scanning

### `.github/workflows/deploy-dev.yml`
- **Triggers:** Push to `develop` branch
- **Purpose:** Deploy to dev/staging environment
- **Actions:**
  - Run `npx sst deploy --stage dev`
  - Deploy to dev.idevelop.tech

### `.github/workflows/deploy-production.yml`
- **Triggers:** Push to `main` branch
- **Purpose:** Deploy to production environment
- **Actions:**
  - Run `npx sst deploy --stage production`
  - Deploy to CloudFront (custom domain pending)

---

## SST Stage Configuration

### `dev` Stage (sst.config.ts)
```typescript
domain: isProduction
  ? undefined
  : {
      name: "dev.idevelop.tech",
    }

cors: {
  allowOrigins: [
    "http://localhost:5173",
    "https://dev.idevelop.tech"
  ]
}
```

### `production` Stage (sst.config.ts)
```typescript
domain: isProduction
  ? undefined  // Custom domain configuration pending
  : { ... }

cors: {
  allowOrigins: [
    "https://idevelop.tech",
    "https://www.idevelop.tech"
  ]
}
```

---

## Environment Variables

Both stages use environment-specific configuration:

- **reCAPTCHA secrets:** AWS SSM Parameter Store (`/idevelop-tech/{stage}/recaptcha-secret`)
- **DynamoDB tables:** Stage-specific table names
- **API URLs:** Injected at build time via `VITE_API_URL`
- **Google Analytics:** Production only (`VITE_GA_MEASUREMENT_ID`)

---

## Branch Lifecycle

### Automatic Branch Deletion

✅ **ENABLED:** Branches are automatically deleted after PR merge

**How it works:**
1. Create feature branch from `develop`
2. Push branch and create PR to `develop`
3. After PR is merged → **Branch is automatically deleted** from GitHub
4. Local branches remain until manually deleted

**Cleanup local branches:**
```bash
# Prune stale remote references
git fetch --prune

# Delete local branches that no longer exist on remote
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
```

### Branch Management Policy

**Active branches should be limited to:**
- `main` - Production branch
- `develop` - Development/staging branch
- 1-2 active feature branches at most

**Why this matters:**
- Reduces repository clutter
- Makes it clear which branches are actively worked on
- Prevents confusion about which branch to use
- Enforces completion of work before starting new features

**If you need to keep work-in-progress:**
- Commit and push your branch
- Open a draft PR to signal active work
- Branch will only be deleted after PR merge

---

## Best Practices

### Merge Strategy (CRITICAL)

**develop → main merges:**
- ❌ **NEVER use "Squash and merge"**
- ✅ **ALWAYS use "Create a merge commit"**
- **Why:** Preserves git history sync between main and develop
- **Result:** Prevents divergent histories that become unmaintainable

**feature → develop merges:**
- ✅ **"Squash and merge" is RECOMMENDED**
- **Why:** Keeps develop history clean and focused
- **Result:** One commit per feature in develop

**Visual guide when merging PRs:**
```
develop → main PR:
┌─────────────────────────────────────┐
│ Merge pull request                   │
│ ○ Create a merge commit      ← USE  │
│ ○ Squash and merge           ← NEVER│
│ ○ Rebase and merge           ← NEVER│
└─────────────────────────────────────┘

feature → develop PR:
┌─────────────────────────────────────┐
│ Merge pull request                   │
│ ○ Create a merge commit              │
│ ○ Squash and merge           ← USE  │
│ ○ Rebase and merge                   │
└─────────────────────────────────────┘
```

### Feature Development
- Always branch from `develop`
- Keep feature branches short-lived (< 1 week)
- Open draft PR early to signal active work

### Testing
- Test locally first: `npm run dev` (in both root and packages/web)
- Test on dev environment after merging to `develop`
- Verify production after merging to `main`

### Hotfixes
For critical production issues:
```bash
git checkout main
git checkout -b hotfix/critical-fix
# Make fix
git push origin hotfix/critical-fix
gh pr create --base main --title "hotfix: critical issue"
```

After merge to `main`, backport to `develop`:
```bash
git checkout develop
git merge main
git push origin develop
```

---

## Troubleshooting

### Workflow not triggering
- Check that changes aren't in ignored paths (docs, markdown files)
- Verify GitHub Actions are enabled for the repository
- Check workflow logs in GitHub Actions tab

### Deployment fails
- Check AWS credentials are configured (OIDC role)
- Verify SST is installed: `npx sst version`
- Check CloudWatch logs for Lambda errors
- Verify DynamoDB tables exist

### Environment mismatch
- Check `$app.stage` in SST logs
- Verify correct branch triggered the workflow
- Check environment variables in GitHub Actions logs

---

## Related Documentation

- **AWS Setup:** `docs/AWS-SETUP.md`
- **Deployment Guide:** `docs/PHASE-5-SETUP-INSTRUCTIONS.md`
- **Project Todos:** `TODO.md`
- **Coding Standards:** `CLAUDE.md`
