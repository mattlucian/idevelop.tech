---
name: verify-deploy
description: Verify an idevelop.tech deploy to dev or production (build ID, prerendered routes, routing fallback, cache headers, Lighthouse). Read-only.
---

# Verify a Deploy

Confirms a dev or production deploy is live and healthy. Every step is read-only: GitHub run status, `curl`, and Lighthouse report links. Never run `sst deploy` or `sst dev`.

**Argument**: `dev` (default) or `production`.

- dev: workflow `deploy-dev.yml`, branch `develop`, site `https://dev.idevelop.tech`
- production: workflow `deploy-production.yml`, branch `main`, site `https://idevelop.tech`

## Steps

1. **Wait for the deploy run** for the branch's latest commit:
   `gh run list --workflow <workflow> --limit 1 --json databaseId,headSha,status`, then `gh run watch <id> --exit-status`. Report failure output (`gh run view <id> --log-failed`) and stop if it failed. An "A concurrent update was detected" failure on a second run for the same commit is harmless when the first run succeeded.

2. **Build ID**: `curl -s <site>/version.json` must match the short SHA of the deployed commit (`git rev-parse --short origin/<branch>`). The footer's `Build <sha>` on any page should match too.
   - For about two minutes after a deploy, CloudFront may still be updating. Retry for up to 3 minutes before reporting a mismatch or 5xx.

3. **Routes**: for each URL in `packages/web/public/sitemap.xml` (on the site's domain), `curl` must return 200 with that page's own `<title>` and an `<h1>`.

4. **Fallbacks**: `/services/web-design`, a random `/services/test-<n>`, and a random `/x-<n>` must return 200 (the app shell). Any 5xx is a failure.

5. **Cache headers**:
   - Page HTML and `/version.json`: `no-store`
   - An `/assets/*.js` file from the home page: `immutable`
   - `/sw.js` and `/images/brand/og-image.png`: `max-age=0,must-revalidate`

6. **Lighthouse** (dev, and production when requested): find the latest `lighthouse-ci.yml` run for the commit, get report links from its log (`grep "Open the report at"`), and extract from each report's embedded `window.__LIGHTHOUSE_JSON__` the performance score, FCP, LCP, TBT, and CLS. Flag CLS above 0.1 or performance below 90, and name the shifting element from the `layout-shifts` audit.

## Output

A short table: check, result, and any failure detail. End with what needs action, if anything.
