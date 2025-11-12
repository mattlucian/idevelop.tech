# Post-Public Configuration Steps

**Repository**: mattlucian/idevelop.tech
**Status**: Public (as of 2025-11-12)
**Action Required**: Enable GitHub security features via repository settings

---

## Issue Identified

CodeQL Security Scan is failing with:
```
Code scanning is not enabled for this repository.
Please enable code scanning in the repository settings.
```

**Cause**: Code scanning must be manually enabled in repository settings after making a repository public.

---

## Required Configuration Steps

### 1. Enable Code Scanning ⚠️ **REQUIRED**

**Path**: Settings → Security → Code security and analysis

1. Go to: https://github.com/mattlucian/idevelop.tech/settings/security_analysis
2. Find "Code scanning" section
3. Click "Set up" → "Advanced"
4. This will take you to create a CodeQL workflow (we already have one)
5. Instead, look for "Enable" button next to "CodeQL analysis"
6. Click "Enable" to activate code scanning

**Alternative method**:
1. Go to repository Settings
2. Click "Security" in left sidebar
3. Under "Code security and analysis":
   - Find "Code scanning"
   - Click "Enable" or "Set up" → "Default"
   - Choose "CodeQL Analysis"
   - Click "Enable CodeQL"

**What this does**:
- Enables the Security tab to receive scan results
- Allows CodeQL workflow to upload findings
- Activates security alerts for code vulnerabilities

---

### 2. Verify Other Security Features

**Path**: Settings → Security → Code security and analysis

Check that these are enabled (should be automatic for public repos):

- [ ] **Dependency graph** - Should show "Enabled"
- [ ] **Dependabot alerts** - Should show "Enabled"
- [ ] **Dependabot security updates** - Should show "Enabled" or "Enable" button
- [ ] **Secret scanning** - Should show "Enabled" (automatic for public repos)
- [ ] **Push protection** - Optional (prevents pushing secrets)

**To enable Dependabot security updates** (if not auto-enabled):
1. Click "Enable" next to "Dependabot security updates"
2. This allows Dependabot to automatically create PRs for security updates

---

### 3. Trigger CodeQL Scan Manually

After enabling code scanning:

**Option A: Via GitHub UI**
1. Go to: https://github.com/mattlucian/idevelop.tech/actions
2. Click "CodeQL Security Scan" workflow
3. Click "Run workflow" dropdown
4. Select branch (develop or main)
5. Click "Run workflow"

**Option B: Via CLI**
```bash
gh workflow run codeql.yml --ref develop
```

**Option C: Push a commit**
```bash
# Any push to develop or main will trigger the scan
git push origin develop
```

---

### 4. Verify Scan Results

After the scan completes (takes ~2-3 minutes):

1. Go to: https://github.com/mattlucian/idevelop.tech/security
2. Click "Code scanning" in left sidebar
3. Should see: "No alerts" (if code is secure)
4. If alerts exist, review and address them

---

### 5. Enable Branch Protection (Recommended)

**Path**: Settings → Branches → Branch protection rules

**For `main` branch**:
1. Click "Add rule" or "Add branch protection rule"
2. Branch name pattern: `main`
3. Enable:
   - [x] Require a pull request before merging
     - [x] Require approvals: 1
     - [x] Dismiss stale pull request approvals when new commits are pushed
   - [x] Require status checks to pass before merging
     - [x] Require branches to be up to date
     - Add status checks:
       - `Analyze Code (javascript)` (CodeQL)
       - `Type check frontend`
       - `Build frontend`
       - `Lint frontend`
   - [x] Require conversation resolution before merging
   - [x] Do not allow bypassing the above settings
   - [x] Restrict who can push to matching branches (optional)
4. Click "Create" or "Save changes"

**For `develop` branch** (same as main):
1. Repeat steps above
2. Branch name pattern: `develop`
3. Enable same protections

**Why branch protection**:
- Prevents accidental direct pushes
- Ensures all code is reviewed
- Requires tests/scans to pass
- Maintains code quality

---

### 6. Verify Dependabot Configuration

**Check Dependabot is working**:

1. Go to: https://github.com/mattlucian/idevelop.tech/pulls
2. Look for PRs from `dependabot[bot]`
3. If none exist yet, that's normal (runs monthly on Mondays at 09:00)

**Manual trigger** (if you want to test now):
```bash
# Not directly possible - Dependabot runs on schedule
# Or manually via: Settings → Security → Dependabot → View Dependabot updates
```

**What to expect**:
- Monthly PRs for dependency updates
- Grouped updates (all minor/patch together)
- Automatic security vulnerability PRs (as they're discovered)

---

## Verification Checklist

After completing the above steps:

- [ ] Code scanning enabled in repository settings
- [ ] CodeQL workflow runs successfully (green checkmark)
- [ ] Security tab shows scan results
- [ ] Dependabot alerts enabled
- [ ] Secret scanning enabled (automatic)
- [ ] Branch protection rules configured (optional but recommended)
- [ ] All workflows passing (CodeQL, PR checks, deploy)

---

## Current Workflow Status

**As of 2025-11-12**:

```
❌ CodeQL Security Scan - FAILING (needs code scanning enabled)
✅ Deploy Dev - Working
✅ Deploy Production - Working
✅ PR Checks - Working
✅ Dependabot Updates - Configured (waiting for schedule)
```

**After enabling code scanning**:

```
✅ CodeQL Security Scan - Should pass
✅ All other workflows - Already passing
```

---

## Troubleshooting

### CodeQL still failing after enabling

1. **Check workflow file syntax**:
   ```bash
   cat .github/workflows/codeql.yml
   ```

2. **Check workflow permissions**:
   - Settings → Actions → General → Workflow permissions
   - Should be: "Read and write permissions" OR
   - Workflow has explicit `permissions:` block (ours does)

3. **Re-run workflow**:
   ```bash
   gh run rerun 19284380113
   ```

4. **Check logs**:
   ```bash
   gh run view --log-failed
   ```

### Dependabot not creating PRs

1. **Check configuration**:
   ```bash
   cat .github/dependabot.yml
   ```

2. **Check schedule**:
   - Our config: Monthly on Mondays at 09:00 UTC
   - Wait for next scheduled run

3. **Check Dependabot logs**:
   - Go to: https://github.com/mattlucian/idevelop.tech/network/updates
   - Click on an update to see logs

### Secret scanning alerts

If you see secret scanning alerts:

1. **Review the alert**:
   - Go to: Security → Secret scanning
   - Review flagged secrets

2. **If false positive**:
   - Mark as "False positive" in GitHub UI

3. **If real secret**:
   - Rotate the secret immediately
   - Update AWS SSM Parameter Store
   - Update environment variables
   - Close the alert

---

## Next Steps After Configuration

1. **Monitor Security tab daily** (for first week)
2. **Review and merge Dependabot PRs** (when they appear)
3. **Set up email notifications**:
   - Settings → Notifications
   - Enable "Security alerts"
4. **Subscribe to repository** (to get notified of issues/PRs)
5. **Consider adding CODEOWNERS file** (for automatic review requests)

---

## Resources

- **GitHub Code Scanning docs**: https://docs.github.com/en/code-security/code-scanning
- **CodeQL queries**: https://codeql.github.com/codeql-query-help/
- **Dependabot docs**: https://docs.github.com/en/code-security/dependabot
- **Branch protection**: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches

---

**Created**: 2025-11-12
**Status**: Action required
**Priority**: High (code scanning)
