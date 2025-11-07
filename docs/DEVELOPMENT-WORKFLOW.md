# Development Workflow Guide

**Last Updated:** 2025-11-07

---

## Overview

This project uses a **two-stage deployment model**:
- **Dev stages** - Personal development environments (`dev-yourname`)
- **Production** - Live site (`idevelop.tech`)

**Key Principles:**
- Frontend development happens **locally** with Vite (fast, instant refresh)
- Backend development uses **SST dev mode** (deploys to personal AWS environment)
- Production deploys are **automated via CI/CD** (GitHub Actions)

---

## Development Environments

| Environment | Purpose | URL | Deploy Method |
|------------|---------|-----|---------------|
| **Local** | Frontend development | http://localhost:5173 | `npm run dev` (Vite) |
| **Dev (Personal)** | Full-stack testing | Auto-generated CloudFront URL | `npm run dev` (SST) |
| **Production** | Live site | https://idevelop.tech | CI/CD (merge to main) |

---

## Daily Development Workflow

### Scenario 1: Frontend-Only Changes

**Best for:** UI updates, styling, component changes, content updates

```bash
# 1. Create feature branch
git checkout -b feature/update-homepage

# 2. Start local dev server
cd packages/web
npm run dev
# → http://localhost:5173

# 3. Make changes
# Edit Vue components, styles, data files, etc.
# Hot-reload is instant

# 4. Verify build works
npm run build

# 5. Commit and create PR
git add .
git commit -m "Update homepage design"
git push origin feature/update-homepage
gh pr create --title "Update homepage design"

# 6. Merge PR → Auto-deploys to production
```

**Why this works:**
- ✅ Fast feedback (instant hot-reload)
- ✅ No AWS costs
- ✅ No waiting for deployments
- ✅ Uses production API endpoints (when backend exists)

---

### Scenario 2: Backend Development (Future - When API Exists)

**Best for:** Lambda function changes, API endpoints, database operations

```bash
# 1. Create feature branch
git checkout -b feature/add-contact-form-api

# 2. Start SST dev mode (Terminal 1)
AWS_PROFILE=idevelop-tech npm run dev
# This deploys to AWS: dev-yourname stage
# Outputs: API Gateway URL, Lambda functions

# 3. Start frontend locally (Terminal 2)
cd packages/web
npm run dev
# Frontend runs at localhost:5173
# Connects to dev-yourname AWS resources

# 4. Make backend changes
# Edit packages/functions/src/contact.ts
# SST auto-deploys changes in ~5-10 seconds

# 5. Test end-to-end
# Frontend (local) → Backend (AWS dev-yourname)

# 6. Commit and create PR
git add .
git commit -m "Add contact form API endpoint"
git push origin feature/add-contact-form-api
gh pr create

# 7. Merge PR → Auto-deploys to production
```

**What SST dev mode does:**
- Creates **personal AWS environment** (dev-yourname)
- Deploys real infrastructure (Lambda, API Gateway, etc.)
- **Hot-reloads** Lambda code changes
- Each developer has isolated environment
- Automatically cleans up on exit

---

### Scenario 3: Full-Stack Development

**Best for:** Features that touch both frontend and backend

**Terminal 1 - Backend (SST):**
```bash
AWS_PROFILE=idevelop-tech npm run dev
# Deploys Lambda functions to AWS dev-yourname
```

**Terminal 2 - Frontend (Vite):**
```bash
cd packages/web
npm run dev
# Runs locally at localhost:5173
```

**Workflow:**
1. Make backend changes → SST auto-deploys (~10 seconds)
2. Make frontend changes → Vite hot-reloads (instant)
3. Test end-to-end (local → AWS)
4. Commit, PR, merge → Production

---

## Git Workflow

### Branch Strategy

```
main
├── feature/update-homepage
├── feature/add-contact-api
└── fix/broken-link
```

**Rules:**
- All work happens in feature branches
- PRs required for all changes
- `main` branch is production-ready
- No direct commits to `main`

### Creating a Feature

```bash
# 1. Pull latest
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "Add feature description"

# 4. Push branch
git push origin feature/your-feature-name

# 5. Create PR
gh pr create --title "Feature: Your feature name" --body "Description"
```

### PR Process

1. **Create PR** → Triggers GitHub Actions
2. **Automated checks run:**
   - Type checking
   - Build test
   - Linting
3. **Review** (optional for solo projects)
4. **Merge PR** → Automatically deploys to production
5. **Delete branch** (cleanup)

---

## CI/CD Pipeline

### What Happens on PR

**File:** `.github/workflows/pr-checks.yml`

```
PR Created/Updated
    ↓
Run Checks:
 - Type check
 - Build test
 - Lint
    ↓
Status: ✅ Pass or ❌ Fail
```

**No deployment** - just validation

### What Happens on Merge to Main

**File:** `.github/workflows/deploy-production.yml`

```
PR Merged to Main
    ↓
GitHub Actions:
 1. Checkout code
 2. Install dependencies
 3. Configure AWS credentials (OIDC)
 4. Deploy with SST (npx sst deploy --stage production)
    ↓
Production Updated
```

**Automatic, no manual intervention needed**

---

## Environment Variables

### Development (.env.development)

Frontend uses Vite environment variables:

```bash
VITE_API_URL=                              # Empty for local dev
VITE_RECAPTCHA_SITE_KEY=6Lc2tf...          # Public key, safe to commit
VITE_GA_MEASUREMENT_ID=                    # Disabled in dev
```

### Production (Managed by SST)

SST injects environment variables during build:

```typescript
// sst.config.ts
environment: {
  VITE_API_URL: "",                        # Will be API Gateway URL
  VITE_RECAPTCHA_SITE_KEY: "6Lc2tf...",
  VITE_GA_MEASUREMENT_ID: "G-XS6QVSG7MS",  # Only in production
}
```

**Note:** SST automatically populates API URLs when resources are linked

---

## SST Commands Reference

### Development

```bash
# Start dev mode (deploys to personal AWS environment)
AWS_PROFILE=idevelop-tech npm run dev

# Or without SST (frontend only)
cd packages/web
npm run dev
```

### Manual Deployment

```bash
# Deploy to your personal dev environment
AWS_PROFILE=idevelop-tech npx sst deploy --stage dev-yourname

# Deploy to production (CI/CD handles this normally)
AWS_PROFILE=idevelop-tech npx sst deploy --stage production
```

### Cleanup

```bash
# Remove your personal dev environment
AWS_PROFILE=idevelop-tech npx sst remove --stage dev-yourname

# SST dev mode auto-removes on exit (Ctrl+C)
```

### Inspection

```bash
# View deployed resources
AWS_PROFILE=idevelop-tech npx sst console

# Get deployment outputs (URLs, ARNs, etc.)
AWS_PROFILE=idevelop-tech npx sst outputs --stage production

# List all stages
AWS_PROFILE=idevelop-tech npx sst list
```

---

## Common Development Tasks

### Running Tests (Future)

```bash
# Unit tests
cd packages/web
npm run test

# E2E tests (future)
npm run test:e2e
```

### Code Quality

```bash
# Type check
cd packages/web
npm run type-check

# Lint and auto-fix
npm run lint

# Format code
npm run format
```

### Building for Production

```bash
cd packages/web
npm run build
# Output: packages/web/dist/
```

---

## Troubleshooting

### Issue: "Cannot find SST types"

**Cause:** Type definitions not generated

**Solution:**
```bash
AWS_PROFILE=idevelop-tech npx sst install
```

### Issue: "Unable to locate credentials"

**Cause:** AWS SSO session expired

**Solution:**
```bash
aws sso login --profile idevelop-tech
```

### Issue: Port 5173 already in use

**Cause:** Another Vite instance running

**Solution:**
```bash
lsof -ti:5173 | xargs kill -9
```

### Issue: Dev mode stuck on deployment

**Cause:** AWS resources taking time to create (first deploy)

**Solution:**
- Wait (first deploy can take 10-15 minutes for CloudFront)
- Check AWS Console for progress
- Ctrl+C and retry if truly stuck

### Issue: Changes not reflecting in dev mode

**Cause:** SST cache or build issue

**Solution:**
```bash
# Clean SST cache
rm -rf .sst

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Retry
npm run dev
```

---

## Best Practices

### Do's ✅

- **Always work in feature branches**
- **Run type-check before committing**
- **Use SST dev mode for backend work**
- **Use local Vite for frontend work**
- **Write descriptive commit messages**
- **Keep PRs focused and small**

### Don'ts ❌

- **Don't commit directly to main**
- **Don't skip PR checks**
- **Don't deploy to production manually** (use CI/CD)
- **Don't commit `.env` files with secrets**
- **Don't leave dev environments running** (clean up after testing)

---

## Stage Naming Conventions

```
dev-matt         # Personal dev environment (Matt)
dev-jane         # Personal dev environment (Jane)
production       # Live site
```

**Rules:**
- Dev stages: `dev-[yourname]`
- Production stage: `production` (only via CI/CD)
- No staging environment (keeping it simple)

---

## Quick Reference

### Start Development
```bash
# Frontend only
cd packages/web && npm run dev

# Full-stack (2 terminals)
# Terminal 1: AWS_PROFILE=idevelop-tech npm run dev
# Terminal 2: cd packages/web && npm run dev
```

### Create Feature
```bash
git checkout -b feature/name
# Make changes
git add . && git commit -m "Description"
git push origin feature/name
gh pr create
```

### Deploy to Production
```bash
# Just merge your PR - CI/CD handles deployment
gh pr merge
```

### Check AWS Resources
```bash
AWS_PROFILE=idevelop-tech npx sst console
```

---

## Resources

- [SST Documentation](https://sst.dev/docs)
- [SST Dev Mode](https://sst.dev/docs/live)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS SSO Setup](./AWS-SETUP.md)
