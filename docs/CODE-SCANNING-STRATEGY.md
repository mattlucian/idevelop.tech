# Code Scanning Strategy

## Overview

Multi-layered code quality and security scanning:

1. **CodeQL** - Security + quality scanning (GitHub integrated)
2. **DeepSource** - Additional quality analysis (PR analysis)
3. **ESLint** - Local development feedback (pre-commit)
4. **TypeScript** - Type safety and compile-time checks

---

## Strategy Rationale

### CodeQL: Comprehensive Free Tier

**Coverage:**
- ✅ Public repositories (unlimited)
- ✅ Full PR analysis with inline feedback
- ✅ All branches (develop, main, feature/*)
- ✅ 200+ rules: 102 security + ~98 quality
- ✅ Works with `security-and-quality` query pack

**Benefits:**
- Security vulnerability detection
- Code quality checks
- Complexity analysis
- Best practice violations
- PR decoration with findings
- Historical tracking in Security tab

---

## Scanning Coverage

### CodeQL Analysis

**Runs on:**
- Every PR to develop/main
- Push to develop/main
- Weekly schedule (Mondays)

**Provides:**
- Security vulnerability detection
- Code quality checks
- Complexity analysis
- Best practice violations
- Maintainability issues

**Configuration:** `.github/workflows/codeql.yml`
- Query pack: `security-and-quality`
- Languages: JavaScript/TypeScript
- Autobuild enabled
- Results uploaded to GitHub Security tab

---

## DeepSource Integration

**Status:** ✅ Integrated
**Configuration:** `.deepsource.toml`

**Provides:**
- Code smell detection
- Cognitive complexity scoring
- Duplicate code detection
- Anti-pattern identification
- Automatic PR analysis
- Free for public repositories

### Quality Standards

DeepSource analysis established TypeScript quality standards (documented in CLAUDE.md):

**🔴 CRITICAL:** Never use `any` type
- Replace with specific types, interfaces, or `unknown`
- Use generics for reusable typed functions

**🟠 MAJOR:** Never use non-null assertions (`!`)
- Use proper null checking and validation
- Use optional chaining instead

**Best Practice:** Provide default values for optional props
- Improves component reliability
- Use `withDefaults()` for Vue components

---

## Quality Feedback Loop

### Developer Workflow

1. **Create PR:**
   ```
   feature/my-feature → PR to develop
   ```

2. **CodeQL runs** (~2 minutes):
   - Analyzes code changes
   - Shows security vulnerabilities
   - Shows quality issues inline

3. **Fix issues if needed:**
   - Address findings
   - Push fixes
   - CodeQL re-runs automatically

4. **Merge to develop:**
   - PR checks pass
   - CodeQL analyzes develop branch

5. **Merge to main:**
   - Create PR: develop → main
   - CodeQL runs again
   - Updates production baseline

---

## Quality Gates

### CodeQL

**Automatic checks:**
- Security vulnerabilities: Report all findings
- Code quality: Report all findings
- Complexity: Warn on high complexity
- Best practices: Report violations

**Current status:** Informational (doesn't block merges by default)

**Optional:** Configure branch protection to require "CodeQL Analysis" check

---

## Best Practices

### For Developers

**Monitor CodeQL on PRs:**
- Review findings before requesting review
- Fix critical/high security issues before merge
- Address quality warnings when reasonable

**Use GitHub Security tab:**
- Check security findings regularly
- Review historical trends
- Track fixed vs. new issues

**Weekly quality review:**
- Check GitHub Security tab
- Review recurring quality issues
- Plan refactoring for complex code

### For Maintainers

**Set quality standards:**
- Address all high/critical security findings
- Fix quality issues that impact maintainability
- Keep codebase clean and readable

**Balance speed vs quality:**
- Security issues: Fix immediately
- Quality issues: Fix when time permits or during refactoring

---

## Additional Tools (Optional)

### Enhanced ESLint

**Status:** Implemented
**Benefit:** Immediate local feedback during development

**Current plugins:**
- `eslint-plugin-vue` - Vue best practices
- `@typescript-eslint` - TypeScript rules
- Prettier integration

**Optional additions:**
```bash
npm install -D eslint-plugin-sonarjs eslint-plugin-complexity eslint-plugin-security
```

---

## Summary

**Multi-Layered Strategy:**
1. ✅ **CodeQL** - Primary security + quality scanning (GitHub integrated)
2. ✅ **DeepSource** - Additional quality metrics and code smell detection
3. ✅ **ESLint** - Local development feedback (pre-commit)
4. ✅ **TypeScript** - Compile-time type safety

**Quality Coverage:**
- **Security:** CodeQL (102 rules)
- **Quality:** CodeQL (~98 rules) + DeepSource (~60 rules) = 150+ combined
- **Anti-patterns:** DeepSource specializes in code smells
- **Local feedback:** ESLint + TypeScript

**Developer Experience:**
- Immediate local feedback (ESLint, TypeScript)
- PR-level analysis (CodeQL, DeepSource)
- Historical tracking (GitHub Security tab)
- All tools free for public repositories

**Result:** Professional-grade code quality without cost 🚀

---

**Tools:** CodeQL + DeepSource + ESLint + TypeScript = Comprehensive coverage
