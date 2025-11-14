# Lighthouse Hybrid Testing Approach

## Current Implementation

The project currently uses **local preview testing** via Lighthouse CI in GitHub Actions:

- Runs on: PRs and pushes to `develop` and `main`
- Tests against: `npm run preview` (local Vite preview server on port 3000)
- Storage: Temporary public storage (Google, ~6 month retention)
- Reports: Available in PR comments (for PRs) or Action logs (for pushes)

## Limitations of Current Approach

1. **Not testing real deployments**: Tests against a local build, not the actual deployed environment
2. **Missing real-world conditions**:
   - No CDN latency (CloudFront)
   - No actual DNS resolution
   - No real SSL/TLS handshake
   - Missing production headers/caching behavior
3. **No historical tracking**: Temporary storage means no trend analysis
4. **Limited discovery**: Reports only accessible via GitHub Actions UI after merge

## Proposed: Hybrid Approach

Combine **local preview testing** (current) with **post-deployment testing** for comprehensive coverage:

### Phase 1: Local Preview Testing (✅ Current)

**When:** On PR creation/updates
**Tests:** `http://localhost:3000/*` via GitHub Actions
**Purpose:** Fast feedback during development
**Storage:** Temporary public storage
**Reports:** PR comments

### Phase 2: Post-Deployment Testing (🔜 Future)

**When:** After successful deployment to `dev.idevelop.tech` or `idevelop.tech`
**Tests:** `https://dev.idevelop.tech/*` or `https://idevelop.tech/*`
**Purpose:** Validate real-world performance
**Storage:** Persistent (LHCI server or external service)
**Reports:** Dashboard with historical trends

## Implementation Options for Phase 2

### Option 1: Lighthouse CI Server (Self-Hosted)

**Pros:**
- Full control and ownership
- Complete historical data
- Trend graphs and comparisons
- No external service costs

**Cons:**
- Requires infrastructure (VM or container)
- Maintenance overhead
- Database management

**Setup:**
```yaml
# Add to .github/workflows/lighthouse-ci.yml
- name: Run Lighthouse CI (Post-Deploy)
  if: github.event_name == 'push' && github.ref == 'refs/heads/develop'
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://dev.idevelop.tech/
      https://dev.idevelop.tech/hire-me
      https://dev.idevelop.tech/tech
      https://dev.idevelop.tech/services/integration
      https://dev.idevelop.tech/services/web-development
    serverBaseUrl: https://lhci.idevelop.tech  # Your LHCI server
    serverToken: ${{ secrets.LHCI_SERVER_TOKEN }}
```

### Option 2: External Service (e.g., SpeedCurve, Calibre, DebugBear)

**Pros:**
- No infrastructure management
- Professional dashboards
- Additional features (monitoring, alerts, budgets)
- Easy integration

**Cons:**
- Monthly costs ($20-200+/month)
- Data stored externally
- Service dependency

### Option 3: GitHub Actions + Artifacts

**Pros:**
- Simple setup
- Free (within GitHub Actions limits)
- Persistent storage (90 days default, 400 days max)

**Cons:**
- No built-in dashboard
- Manual report access
- Limited trend analysis

**Setup:**
```yaml
- name: Run Lighthouse CI (Post-Deploy)
  if: github.event_name == 'push'
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: https://dev.idevelop.tech/
    uploadArtifacts: true  # Upload as GitHub artifacts

- name: Upload Lighthouse Reports
  uses: actions/upload-artifact@v4
  with:
    name: lighthouse-reports-${{ github.sha }}
    path: .lighthouseci/
    retention-days: 90
```

## Recommended Approach

**Start with Option 3** (GitHub Actions + Artifacts):

1. **Immediate benefits**:
   - No additional infrastructure
   - Persistent reports (90+ days)
   - Accessible via GitHub UI

2. **Easy migration path**:
   - If needed, later migrate to LHCI server or external service
   - Historical data still available in artifacts

3. **Cost-effective**:
   - Free within GitHub Actions limits
   - Good enough for current scale

## Implementation Timeline

### Short-term (Current Sprint)
- ✅ Local preview testing on PRs (implemented)
- ✅ Enable all Lighthouse categories (implemented)
- ✅ Fix accessibility and performance issues (in progress)

### Medium-term (Next Sprint)
- 🔜 Add post-deployment testing to develop branch
- 🔜 Upload reports as GitHub artifacts
- 🔜 Document report access process

### Long-term (Future)
- 📋 Evaluate need for LHCI server or external service
- 📋 Implement performance budgets and alerts
- 📋 Set up automated Slack/email notifications for regressions

## Report Access Guide

### For PR Testing (Current)
1. Open PR on GitHub
2. Wait for Lighthouse CI check to complete
3. View PR comment with report links
4. Click links to see detailed HTML reports

### For Post-Deployment Testing (After Implementation)
1. Go to: `Actions` → Select workflow run
2. Scroll to "Artifacts" section
3. Download `lighthouse-reports-<sha>.zip`
4. Extract and open HTML reports locally

### For LHCI Server (If Implemented)
1. Visit: `https://lhci.idevelop.tech`
2. View dashboard with historical trends
3. Compare runs, set budgets, view regressions

## Configuration Files

- **lighthouserc.json**: CI configuration for local preview testing
- **lighthouse-config.js**: Lighthouse audit settings (categories, audits)
- **.github/workflows/lighthouse-ci.yml**: GitHub Actions workflow

## Key Metrics to Track

### Performance
- First Contentful Paint (FCP) - Target: < 1.8s
- Largest Contentful Paint (LCP) - Target: < 2.5s
- Cumulative Layout Shift (CLS) - Target: < 0.1
- Total Blocking Time (TBT) - Target: < 200ms

### Accessibility
- Color contrast (WCAG AA)
- Heading order
- ARIA attributes
- Keyboard navigation

### Best Practices
- HTTPS usage
- Security headers
- Console errors
- Deprecated APIs

### SEO
- Meta descriptions
- Canonical URLs
- Structured data
- Mobile-friendly

## Performance Budgets (Future)

Once historical data is available, consider setting budgets:

```json
{
  "ci": {
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "first-contentful-paint": ["warn", {"maxNumericValue": 1800}],
        "largest-contentful-paint": ["warn", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
      }
    }
  }
}
```

## References

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [LHCI Server Setup](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/server.md)
