# idevelop.tech

[![Deploy Production](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml)
[![PR Checks](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml)
[![DeepSource](https://app.deepsource.com/gh/mattlucian/idevelop.tech.svg/?label=active+issues&show_trend=true&token=78yqFa5jiiY8qC23puM8RAj_)](https://app.deepsource.com/gh/mattlucian/idevelop.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Full-stack portfolio application showcasing technical consulting services, cloud infrastructure expertise, and software development capabilities.

**Live Site**: https://dxeay6n8brs8g.cloudfront.net

---

## Tech Stack

**Frontend**: Vue 3 (Composition API) + TypeScript + Tailwind CSS + Vite
**Backend**: AWS Lambda + API Gateway + DynamoDB + SES
**Infrastructure**: SST v3 + S3 + CloudFront + GitHub Actions
**Architecture**: Serverless monorepo with TypeScript throughout

---

## Project Structure

```
idevelop.tech/
├── packages/
│   ├── web/         # Vue 3 frontend
│   ├── functions/   # AWS Lambda functions
│   └── core/        # Shared TypeScript types
├── sst.config.ts    # Infrastructure as Code
└── docs/            # Documentation
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- AWS CLI (for deployment)

### Development

```bash
# Install dependencies
npm install

# Frontend development
cd packages/web
npm run dev          # http://localhost:5173
npm run type-check   # TypeScript validation
npm run lint         # ESLint + auto-fix
npm run format       # Prettier
npm run build        # Production build
```

### Deployment

Automated via GitHub Actions:
- Push to `develop` → Deploy to dev environment
- Push to `main` → Deploy to production

**Manual deployment**:
```bash
aws sso login --profile idevelop-tech
AWS_PROFILE=idevelop-tech npx sst deploy --stage production
```

---

## Configuration

### For Forking/Adaptation

1. **One-time manual setup**: See [docs/SETUP.md](docs/SETUP.md)
   - GitHub Actions OIDC
   - Email DNS (SPF, DMARC, DKIM)
   - reCAPTCHA keys
   - AWS SES verification

2. **Update application constants**: `packages/web/src/constants/index.ts`
   - Site name, URL, company name
   - Contact information
   - Social media links

3. **Environment variables**: `packages/web/.env.*`
   - `VITE_API_URL` - API endpoint
   - `VITE_RECAPTCHA_SITE_KEY` - reCAPTCHA public key
   - `VITE_GA_MEASUREMENT_ID` - Analytics (optional)

---

## Documentation

### Project Management
- **[TODO.md](TODO.md)** - Active tasks and pending work
- **[docs/BRANCH-STRATEGY.md](docs/BRANCH-STRATEGY.md)** - Git workflow and CI/CD

### Architecture
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Full-stack architecture decisions
- **[docs/frontend/](docs/frontend/)** - Frontend documentation
  - `COMPONENTS.md` - Component catalog
  - `COMPONENT-RULES.md` - Component patterns (2-3 rule)
  - `DESIGN-SYSTEM.md` - Design tokens and styling
  - `DATA-STRUCTURE.md` - Type schemas
- **[docs/backend/FUNCTIONS.md](docs/backend/FUNCTIONS.md)** - Lambda functions

### Development
- **[CLAUDE.md](CLAUDE.md)** - AI development guidelines and coding standards
- **[.github/SECURITY.md](.github/SECURITY.md)** - Security policy

---

## Security

- AWS OIDC authentication (no long-lived credentials)
- Secrets managed via AWS SSM and GitHub Secrets
- Automated security scanning (CodeQL, DeepSource)
- Dependency scanning (Dependabot)

See [.github/SECURITY.md](.github/SECURITY.md) for vulnerability reporting.

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Built with Vue 3, TypeScript, Tailwind CSS, SST, and AWS**
