# Branch Strategy

**Last Updated:** 2025-11-11

---

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
- **Protection:** None (allows fast iteration)
- **Workflow:** `.github/workflows/deploy-dev.yml`

### `main` - Production Branch
- **Purpose:** Stable production-ready code
- **Deployment:** Automatically deploys to `production` stage on push
- **Environment:**
  - Frontend: CloudFront URL (Phase 7: will be https://idevelop.tech)
  - API: https://api.idevelop.tech
  - Stage: `production`
- **Protection:** Will be enabled in Phase 8 (when repo goes public)
  - Require PR before merge
  - Require status checks to pass
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
   - Frontend: CloudFront URL (Phase 7: idevelop.tech)
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
  - Deploy to CloudFront (Phase 7: idevelop.tech)

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
  ? undefined  // No custom domain until Phase 7
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

## Best Practices

### Feature Development
- Always branch from `develop`
- Keep feature branches short-lived (< 1 week)
- Squash commits when merging to keep history clean

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

## Phase 8 Changes (Post-Public)

When repository becomes public:

1. **Enable branch protection on `main`:**
   - Require pull request reviews
   - Require status checks to pass
   - No force pushes
   - No branch deletion

2. **Optional: Enable branch protection on `develop`:**
   - Require status checks to pass (optional)
   - Allow force pushes (for history cleanup)

3. **Add CODEOWNERS file** (optional):
   ```
   # Require review from owner
   * @mattlucian
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
- **Project Plan:** `docs/PROJECT-PLAN.md`
- **Coding Standards:** `CLAUDE.md`
