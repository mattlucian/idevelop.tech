# Code Scanning Strategy

**Date**: 2025-11-12
**Repository**: idevelop.tech
**Status**: Production

---

## Overview

This repository uses a **dual-strategy** approach for code quality and security scanning:

1. **CodeQL** - Runs on all PRs and branches (security + quality)
2. **SonarCloud** - Runs on develop/main only (comprehensive metrics)

---

## Why This Strategy?

### SonarCloud Free Tier Limitation

**SonarCloud Free Plan**:
- ✅ Supports: Public repositories
- ✅ Unlimited: Main branch analysis
- ❌ No support: PR/branch analysis (paid feature)

**Our Solution**:
- Use **CodeQL** for PR-level quality feedback (free, unlimited)
- Use **SonarCloud** for post-merge quality tracking (free for main branch)

---

## Scanning Coverage

### Pull Requests (Before Merge)

**CodeQL: `security-and-quality` pack** ✅

**Runs on**: Every PR to develop/main

**Provides**:
- ✅ Security vulnerability detection (102 rules)
- ✅ Code quality checks (~50 rules)
- ✅ Complexity analysis
- ✅ Best practice violations
- ✅ Maintainability issues
- ✅ PR decoration with findings

**Example checks**:
- Cyclomatic complexity warnings
- Duplicate string literals
- Unused variables
- Insecure patterns
- SQL injection risks
- XSS vulnerabilities

**View results**: GitHub Security tab + PR checks

---

### Post-Merge (After Merge)

**SonarCloud: Comprehensive analysis** ✅

**Runs on**: Push to develop or main (post-merge only)

**Provides**:
- ✅ Overall maintainability rating (A-E)
- ✅ Technical debt estimation (hours)
- ✅ Code smell detection and tracking
- ✅ Duplicate code percentage
- ✅ Security hotspots
- ✅ Historical quality trends
- ✅ Quality gate pass/fail

**Example metrics**:
- Maintainability Rating: A
- Technical Debt: 2h 15m
- Code Smells: 12
- Duplications: 1.2%
- Coverage: 0% (until tests added)

**View results**: https://sonarcloud.io/project/overview?id=mattlucian_idevelop-tech

---

## Workflow Details

### CodeQL Workflow (`.github/workflows/codeql.yml`)

**Triggers**:
```yaml
on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]
  schedule:
    - cron: '0 10 * * 1'  # Weekly on Mondays
```

**Configuration**:
- Query pack: `security-and-quality`
- Languages: JavaScript/TypeScript
- Autobuild: Yes (analyzes bundled code)
- Results: Uploaded to GitHub Security tab

**What happens**:
1. PR created → CodeQL runs automatically
2. Scans all changed code + dependencies
3. Decorates PR with findings
4. Blocks merge if critical issues found (optional)

---

### SonarCloud Workflow (`.github/workflows/sonarcloud.yml`)

**Triggers**:
```yaml
on:
  push:
    branches: [develop, main]
  # NO pull_request trigger (free tier limitation)
```

**Configuration**:
- Organization: mattlucian
- Project: mattlucian_idevelop-tech
- New code: Previous version (automatic)
- Results: Uploaded to SonarCloud dashboard

**What happens**:
1. PR merged to develop → SonarCloud analyzes entire branch
2. Creates new "version" baseline
3. Updates quality metrics
4. Tracks technical debt over time

---

## Quality Feedback Loop

### Developer Experience

**1. Create PR**:
```
feature/my-feature → PR to develop
```

**2. CodeQL runs** (~2 minutes):
- Analyzes code changes
- Shows quality issues inline
- Provides immediate feedback

**3. Fix issues if needed**:
- Address CodeQL findings
- Push fixes
- CodeQL re-runs automatically

**4. Merge to develop**:
- PR checks pass (CodeQL green)
- Merge to develop
- SonarCloud analyzes develop branch

**5. SonarCloud updates** (~3 minutes):
- New quality baseline created
- Dashboard shows updated metrics
- Technical debt tracked

**6. Merge to main** (when ready):
- Create PR: develop → main
- CodeQL runs again
- Merge to main
- SonarCloud updates production metrics

---

## Quality Gates

### CodeQL (PR Level)

**Automatic checks**:
- Security vulnerabilities: Block on HIGH/CRITICAL
- Code quality: Warn on issues
- Complexity: Warn on high complexity

**Configuration** (optional - via branch protection):
- Require: "CodeQL Analysis" check to pass
- Prevent merge if issues found

### SonarCloud (Branch Level)

**Quality gate** (configurable in SonarCloud):
- New code maintainability: Grade A or B
- New code coverage: 0% (no tests yet)
- New duplications: < 3%
- New security hotspots: 0

**Status**: Currently informational only (doesn't block merges)

---

## Comparison: CodeQL vs SonarCloud

| Feature | CodeQL | SonarCloud |
|---------|--------|------------|
| **Timing** | Pre-merge (PR) | Post-merge (branch) |
| **Focus** | Security + Quality | Comprehensive Quality |
| **Cost** | Free (unlimited) | Free (main branch only) |
| **PR Support** | ✅ Yes | ❌ No (paid feature) |
| **Runs On** | PRs + branches | develop/main only |
| **Results** | GitHub Security tab | SonarCloud dashboard |
| **Inline Feedback** | ✅ Yes (PR decoration) | ❌ No (post-merge) |
| **Historical Tracking** | ❌ Limited | ✅ Excellent |
| **Technical Debt** | ❌ No | ✅ Yes (hours) |
| **Maintainability Rating** | ❌ No | ✅ Yes (A-E) |
| **Duplicate Detection** | Limited | ✅ Comprehensive |
| **Security** | ✅ Excellent (102 rules) | ✅ Good (hotspots) |
| **Quality Rules** | ~50 rules | ~300+ rules |

---

## Best Practices

### For Developers

**1. Watch CodeQL on PRs**:
- Review findings before requesting review
- Fix critical/high issues before merge
- Document false positives (if any)

**2. Check SonarCloud after merge**:
- Review quality delta (what changed?)
- Address new code smells
- Monitor technical debt trend

**3. Weekly quality review**:
- Check SonarCloud dashboard
- Prioritize technical debt
- Plan refactoring sprints

### For Maintainers

**1. Set quality standards**:
- Maintain A/B rating on new code
- Keep technical debt < 5% of codebase
- Address all security hotspots

**2. Monitor trends**:
- Weekly quality score review
- Track debt over time
- Celebrate improvements

**3. Balance speed vs quality**:
- CodeQL: Must pass (security)
- SonarCloud: Track and improve (quality)

---

## Alternative Options (If Needed)

If SonarCloud's main-branch-only limitation becomes problematic, consider:

### Option 1: SonarCloud Paid Plan

**Cost**: $10/month per user
**Benefit**: PR analysis and branch support
**Best for**: If you add team members

### Option 2: DeepSource (Free PR Analysis)

**Cost**: Free for public repos (with PR support!)
**Benefit**: Similar to SonarCloud but supports PR analysis
**Best for**: If you want PR-level quality metrics

**Setup**:
1. Sign up: https://deepsource.com
2. Connect repository
3. Automatic PR analysis

### Option 3: Enhanced ESLint (Local)

**Cost**: Free
**Benefit**: Immediate local feedback
**Best for**: Developer experience

**Add plugins**:
```bash
npm install -D eslint-plugin-sonarjs eslint-plugin-complexity
```

See: `docs/CODE-QUALITY-ASSESSMENT.md` for full ESLint setup guide

---

## Current Metrics

### CodeQL Results (Latest Scan)

**Status**: ✅ PASSING
- Security issues: 0
- Quality issues: TBD (first scan with new rules)
- Rules checked: ~150 total (102 security + ~50 quality)

### SonarCloud Results (Latest Scan)

**Status**: ⏳ PENDING (awaiting first scan)
- Maintainability: TBD
- Technical Debt: TBD
- Code Smells: TBD
- Duplications: TBD

**Dashboard**: https://sonarcloud.io/project/overview?id=mattlucian_idevelop-tech

---

## Summary

**Our Strategy**:
1. ✅ **CodeQL** provides PR-level quality + security feedback (free, unlimited)
2. ✅ **SonarCloud** tracks comprehensive quality metrics post-merge (free for main branch)
3. ✅ Best of both worlds within free tier limitations

**Quality Coverage**:
- **Before merge**: CodeQL catches issues early (PR level)
- **After merge**: SonarCloud tracks quality over time (branch level)
- **Result**: High quality standards without cost

**Developer Experience**:
- Immediate PR feedback (CodeQL)
- Historical tracking (SonarCloud)
- No quality checks bypassed
- Free tier optimized

---

**This strategy maximizes quality coverage within free tier constraints.** 🚀
