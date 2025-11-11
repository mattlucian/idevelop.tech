# idevelop.tech Quick Start Guide

**Last Updated:** 2025-11-11
**Current Phase:** Phase 6.5 - Content Polish

---

## 📍 Current Status

- ✅ SST monorepo with Vue 3 frontend + Lambda backend
- ✅ Two-branch deployment strategy (develop → main)
- ✅ CI/CD with GitHub Actions
- ✅ CodeQL security scanning configured
- ✅ Production deployed to CloudFront
- 🔄 Content polish in progress
- ⏳ Repository will be public after Phase 6.8
- ⏳ Domain migration (idevelop.tech) in Phase 7

---

## 🌐 Current URLs

| Environment | Frontend | API |
|-------------|----------|-----|
| **Development** | https://dev.idevelop.tech | https://dev-api.idevelop.tech |
| **Production** | https://dxeay6n8brs8g.cloudfront.net | https://api.idevelop.tech |
| **Target** | https://idevelop.tech (Phase 7) | https://api.idevelop.tech |

---

## 🚀 Quick Commands

### AWS Authentication
```bash
aws sso login --profile idevelop-tech
export AWS_PROFILE=idevelop-tech
aws sts get-caller-identity  # Verify
```

### Development
```bash
# Start local frontend (in packages/web/)
npm run dev          # http://localhost:5173
npm run type-check   # TypeScript validation
npm run lint         # ESLint
npm run format       # Prettier
npm run build        # Production build

# Start SST dev mode (in root)
npm run dev          # Deploys to personal dev stage
```

### Deployment
```bash
# Deploy to dev stage
git checkout develop
git push origin develop  # Auto-deploys via GitHub Actions

# Deploy to production
git checkout main
git push origin main     # Auto-deploys via GitHub Actions
```

### Git Workflow
```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# Make changes, commit, push
git add .
git commit -m "feat: description"
git push origin feature/my-feature

# Create PR to develop
gh pr create --base develop --title "feat: description"

# After testing on dev, PR from develop to main
gh pr create --base main --head develop --title "release: description"
```

---

## 📋 Remaining Phases

### Phase 6.5: Content Polish (CURRENT)
- Review and refine all website copy
- Remove marketing fluff
- Ensure professionalism and authenticity

### Phase 6.6: Lighthouse CI
- Add automated performance monitoring
- Run baseline audit
- Remediate any critical issues (score < 70)

### Phase 6.7: CodeQL Verification
- Will activate when repo becomes public
- Review and remediate any security findings

### Phase 6.8: Make Repository Public
- Final security check
- Enable branch protection rules
- Make repository visible to the world

### Phase 7: Domain Migration
- Update `sst.config.ts` to enable custom domain
- Deploy and wait for DNS propagation
- Verify https://idevelop.tech works
- Test contact form end-to-end

### Phase 8: Post-Launch (Optional)
- Add monitoring (BetterStack, Sentry, etc.)
- Add Snyk dependency scanning
- Enhance analytics if needed

---

## 📚 Key Documentation

### Project Planning & Status
- **`docs/PROJECT-PLAN.md`** ⭐ **PRIMARY REFERENCE** - Complete phase-by-phase plan
- **`docs/BRANCH-STRATEGY.md`** - Branch workflow and deployment strategy

### Backend & Infrastructure
- **`docs/SETUP.md`** - Initial project setup for forking (AWS, email, deployment)

### Implementation Details
- **`packages/functions/src/contact.ts`** - Contact form API implementation

### Frontend Documentation
- **`packages/web/docs/`** - Frontend-specific documentation
  - `ARCHITECTURE.md` - Component organization
  - `COMPONENTS.md` - Component catalog
  - `COMPONENT-RULES.md` ⚠️ **MANDATORY** - 2-3 pattern rule
  - `DATA-STRUCTURE.md` - Type schemas
  - `DESIGN-SYSTEM.md` - Colors, typography, responsive design
  - `IMPLEMENTATION-STATUS.md` - Frontend completion status

### Coding Standards
- **`CLAUDE.md`** ⭐ **CODING STANDARDS** - Project instructions and conventions

---

## 🔧 Troubleshooting

### AWS SSO Session Expired
```bash
aws sso login --profile idevelop-tech
export AWS_PROFILE=idevelop-tech
```

### Dev Server Not Working
```bash
# Kill existing servers
ps aux | grep "npm run dev" | grep -v grep
kill <PID>

# Restart
cd packages/web
npm run dev
```

### Type Errors After Changes
```bash
cd packages/web
npm run type-check
npm run format
```

### Deployment Failed
1. Check GitHub Actions logs
2. Verify AWS credentials
3. Check CloudWatch logs for Lambda errors
4. Verify SST version: `npx sst version`

---

## 🎯 Next Steps

1. **Complete content polish** (Phase 6.5)
2. **Add Lighthouse CI** (Phase 6.6) - 15 minutes
3. **Security check & make repo public** (Phase 6.8) - 10 minutes
4. **Verify CodeQL results** (Phase 6.7) - 5 minutes
5. **Domain migration** (Phase 7) - 30 minutes + propagation
6. **Optional monitoring** (Phase 8) - As needed

---

## 📞 Contact & Links

- **Repository:** https://github.com/mattlucian/idevelop.tech (private)
- **AWS Account:** idevelop-tech
- **Domain Registrar:** [Check current DNS]
- **Email:** matt@idevelop.tech

---

**Ready to start? Check `docs/PROJECT-PLAN.md` for detailed phase instructions.**
