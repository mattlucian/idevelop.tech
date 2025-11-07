# Migration Plan: Vue App → SST Monorepo

**Created:** 2025-11-07
**Status:** ✅ Phase 1 Complete - Ready for Phase 2
**Last Updated:** 2025-11-07
**Time Taken:** ~15 minutes (Phase 1)

---

## Overview

Migrating from traditional Vue + separate infrastructure setup to SST full-stack monorepo.

**From:**
```
~/source/idevelop.tech/
├── src/                    # Vue app
├── infrastructure/         # CDK (separate)
└── package.json
```

**To:**
```
~/source/idevelop.tech/
├── packages/
│   ├── web/               # Vue app (migrated)
│   ├── functions/         # Lambda functions (new)
│   └── core/              # Shared types (new)
├── infra/                 # SST infrastructure (new)
├── sst.config.ts          # SST config
└── package.json           # Root workspace
```

---

## Migration Strategy

### Phase 1: Setup New Project (Automated by Claude)

**What Claude will do:**
1. ✅ Create `~/source/idevelop.tech/` directory
2. ✅ Initialize SST project structure
3. ✅ Set up monorepo with npm workspaces
4. ✅ Copy entire Vue application to `packages/web/`
5. ✅ Create placeholder structures for API and shared code
6. ✅ Configure basic SST setup (no infrastructure yet)
7. ✅ Update all import paths and configurations
8. ✅ Create documentation

**What won't be migrated yet:**
- ❌ Infrastructure deployment (Phase 3)
- ❌ API implementation (Phase 3)
- ❌ GitHub Actions workflows (will need updates)

**Duration:** 15-20 minutes (automated)

---

### Phase 2: Verification (Manual by You)

**What you'll do:**

1. **Start new Claude Code session:**
   ```bash
   cd ~/source/sst.idevelop.tech
   # Open new Claude Code session here
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   # Should start at http://localhost:5173
   ```

4. **Verify functionality:**
   - [ ] Site loads at localhost
   - [ ] All pages navigate correctly
   - [ ] Cookie consent banner works
   - [ ] No console errors
   - [ ] Images and assets load

5. **Test build:**
   ```bash
   npm run build
   ```

**If issues occur:** Report to Claude in new session for fixes

**Duration:** 15-30 minutes

---

### Phase 3: Add Infrastructure (Next Session)

**In new Claude Code session in sst.idevelop.tech:**

1. **Add frontend infrastructure:**
   - S3 bucket for hosting
   - CloudFront distribution
   - Route 53 DNS records
   - SSL certificates

2. **Add API infrastructure:**
   - Lambda functions
   - API Gateway
   - DynamoDB tables
   - SES email configuration

3. **Implement contact form API:**
   - reCAPTCHA verification
   - Email sending
   - Rate limiting

4. **Deploy to AWS:**
   ```bash
   npm run deploy --stage production
   ```

**Duration:** 2-3 hours (in future session)

---

## File Structure Details

### Root Level
```
idevelop.tech/
├── package.json           # Root package.json (workspaces)
├── sst.config.ts          # SST configuration
├── tsconfig.json          # Root TypeScript config
├── .gitignore            # Git ignore patterns
└── README.md             # Project documentation
```

### packages/web/ (Vue Application)
```
packages/web/
├── src/                   # All Vue source (copied from old src/)
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── data/
│   ├── types/
│   └── main.ts
├── public/                # Static assets
├── index.html
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # Web-specific TypeScript
└── package.json           # Web dependencies
```

### packages/functions/ (API - Placeholder)
```
packages/functions/
├── src/
│   └── contact.ts         # Placeholder Lambda function
├── tsconfig.json
└── package.json
```

### packages/core/ (Shared - Placeholder)
```
packages/core/
├── src/
│   └── types/
│       └── index.ts       # Shared types
├── tsconfig.json
└── package.json
```

### infra/ (Infrastructure - Minimal)
```
infra/
└── web.ts                 # Frontend infrastructure (basic)
```

---

## Key Configuration Changes

### Root package.json (Workspaces)
```json
{
  "name": "sst-idevelop-tech",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "sst dev",
    "build": "sst build",
    "deploy": "sst deploy",
    "remove": "sst remove"
  }
}
```

### SST Config (Basic)
```typescript
// sst.config.ts
import { SSTConfig } from "sst";

export default {
  config(_input) {
    return {
      name: "idevelop-tech",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Basic setup, will add infrastructure later
    });
  },
} satisfies SSTConfig;
```

### Vite Config Updates
```typescript
// packages/web/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## Dependencies

### Root Dependencies (New)
- `sst` - SST framework
- `aws-cdk-lib` - CDK (SST dependency)
- `constructs` - CDK constructs

### Web Package Dependencies (Migrated)
- All existing Vue dependencies
- All existing dev dependencies
- No changes to existing packages

### Core Package Dependencies (New)
- TypeScript only (for shared types)

### Functions Package Dependencies (New)
- `@types/aws-lambda` - Lambda type definitions
- Any API-specific packages

---

## Environment Variables

### Current (.env files)
```
.env.development
.env.production
```

**These will be replaced by SST's environment system:**

```typescript
// In SST config
site.bind([api]); // Auto-injects API_URL

// Accessed in Vue:
const apiUrl = import.meta.env.VITE_API_URL; // Auto-set by SST
```

**For now:** Keep .env files for compatibility during Phase 2

---

## Git Strategy

### Option 1: New Repository (Recommended)
```bash
# Create new repo
cd ~/source/sst.idevelop.tech
git init
git add .
git commit -m "Initial SST migration"

# Create GitHub repo
gh repo create sst.idevelop.tech --public
git push -u origin main

# Keep old repo for reference
# ~/source/idevelop.tech remains unchanged
```

### Option 2: Same Repository (Alternative)
```bash
# In old repo
git checkout -b sst-migration
# Copy files from sst.idevelop.tech
# Commit to branch
# Can compare with main branch
```

**Recommendation:** Option 1 (new repo) for clean separation

---

## Rollback Plan

If migration fails, you can:

1. **Continue using old setup:**
   - Old repo at `~/source/idevelop.tech` is unchanged
   - Can deploy from old infrastructure/

2. **Debug and retry:**
   - New setup at `~/source/sst.idevelop.tech` can be modified
   - Can delete and start over if needed

3. **Hybrid approach:**
   - Deploy frontend from old setup
   - Build API in SST separately
   - Merge later

**No risk:** Old setup remains functional throughout migration

---

## Success Criteria

### Phase 1 Success (Setup)
- [ ] New directory created with proper structure
- [ ] All Vue files copied successfully
- [ ] package.json files configured
- [ ] SST config file exists
- [ ] No syntax errors in files

### Phase 2 Success (Verification)
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts dev server
- [ ] Vue app runs at localhost:5173
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)

### Phase 3 Success (Infrastructure)
- [ ] SST deploy succeeds
- [ ] Site accessible at idevelop.tech
- [ ] API accessible at api.idevelop.tech
- [ ] Contact form submits successfully
- [ ] Emails delivered via SES

---

## Timeline

| Phase | Duration | Who | Location |
|-------|----------|-----|----------|
| Phase 1: Setup | 15-20 min | Claude | idevelop.tech/ |
| Phase 2: Verification | 15-30 min | You | idevelop.tech/ |
| Phase 3: Infrastructure | 2-3 hours | Claude + You | idevelop.tech/ |

**Total:** 3-4 hours across 2 sessions

---

## Next Steps

### Immediate (This Session)
1. ✅ Review this plan
2. ✅ Confirm approach
3. ✅ Execute Phase 1 (automated migration)
4. ✅ Receive migration report

### After Phase 1 Complete
1. Open new terminal
2. Navigate to `~/source/sst.idevelop.tech`
3. Start new Claude Code session there
4. Execute Phase 2 verification steps
5. Report results to Claude

### After Phase 2 Complete
1. Continue in same session (sst.idevelop.tech)
2. Execute Phase 3 with Claude
3. Add infrastructure code
4. Deploy to AWS
5. Test production site

---

## Commands Reference

### Phase 1 (Automated by Claude)
```bash
# Claude will run these
mkdir -p ~/source/sst.idevelop.tech
cd ~/source/sst.idevelop.tech
# ... setup commands
```

### Phase 2 (Manual by You)
```bash
# You will run these
cd ~/source/sst.idevelop.tech
npm install
npm run dev
npm run build
```

### Phase 3 (With Claude in New Session)
```bash
# In new Claude session
npm run dev          # Start SST dev mode
npm run deploy       # Deploy to AWS
npm run remove       # Remove from AWS (if needed)
```

---

## Questions to Answer Before Starting

1. **Keep old repo?**
   - ✅ Yes, keep as backup (recommended)
   - ❌ No, will delete after migration

2. **Git strategy?**
   - ✅ New repository (recommended)
   - ❌ Same repo, new branch

3. **Ready to proceed?**
   - ✅ Yes, execute Phase 1 now
   - ❌ No, have questions first

---

## Risk Assessment

**Low Risk:**
- ✅ Old setup remains unchanged (can always roll back)
- ✅ New setup is isolated (no conflicts)
- ✅ Incremental verification (catch issues early)
- ✅ Can pause at any phase

**Potential Issues:**
- ⚠️ Dependency version conflicts (easily fixed)
- ⚠️ Import path issues (automated fixes included)
- ⚠️ Environment variable differences (documented)

**Mitigation:**
- Step-by-step verification
- Clear rollback plan
- Old setup as reference

---

## Ready to Execute?

**Confirm you want to proceed with Phase 1:**
- Creates new directory structure
- Copies all Vue application files
- Sets up SST project basics
- No infrastructure deployment yet (safe)

**Estimated time:** 15-20 minutes

**After completion:** You'll need to start new Claude session in `idevelop.tech/`

Type "yes" to proceed with Phase 1 automated migration.
