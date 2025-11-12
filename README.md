# idevelop.tech

[![Deploy Production](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml)
[![PR Checks](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml)
[![DeepSource](https://app.deepsource.com/gh/mattlucian/idevelop.tech.svg/?label=active+issues&show_trend=true&token=78yqFa5jiiY8qC23puM8RAj_)](https://app.deepsource.com/gh/mattlucian/idevelop.tech/)
[![DeepSource](https://app.deepsource.com/gh/mattlucian/idevelop.tech.svg/?label=resolved+issues&show_trend=true&token=78yqFa5jiiY8qC23puM8RAj_)](https://app.deepsource.com/gh/mattlucian/idevelop.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Portfolio website and full-stack application showcasing technical consulting services, cloud infrastructure expertise, and software development capabilities.

**Live Site:** https://dxeay6n8brs8g.cloudfront.net (Custom domain setup in progress)

---

## 🚀 Tech Stack

**Frontend:**
- Vue 3 (Composition API) + TypeScript
- Vue Router for navigation
- Tailwind CSS for styling
- Vite for build tooling

**Backend:**
- AWS Lambda (serverless functions)
- API Gateway (HTTP endpoints)
- DynamoDB (rate limiting)
- SES (email delivery)
- AWS SSM (secrets management)

**Infrastructure:**
- SST v3 (Infrastructure as Code)
- AWS (S3, CloudFront, Route 53)
- GitHub Actions (CI/CD)
- AWS OIDC (secure deployments)

---

## 📁 Project Structure

This is an SST monorepo with multiple packages:

```
idevelop.tech/
├── packages/
│   ├── web/         # Vue 3 frontend application
│   ├── functions/   # AWS Lambda functions (API endpoints)
│   └── core/        # Shared TypeScript types
├── .github/
│   └── workflows/   # CI/CD pipelines
├── sst.config.ts    # Infrastructure as Code
└── docs/            # Project documentation
```

---

## 🛠️ Development

### Prerequisites

- Node.js 20+
- npm 10+
- AWS CLI (for deployment)
- AWS SSO configured (for deployment)

### Quick Start

```bash
# Install dependencies
npm install

# Start frontend dev server
cd packages/web
npm run dev
# → http://localhost:5173

# Type check
npm run type-check

# Build for production
npm run build

# Lint and format
npm run lint
npm run format
```

### Deployment

Deployments are automated via GitHub Actions:

- **PR Checks:** Runs on every pull request (type-check, build, lint)
- **Production Deploy:** Auto-deploys to AWS on merge to `main` branch

**Manual deployment (requires AWS SSO):**
```bash
# Login to AWS
aws sso login --profile idevelop-tech

# Deploy to production
AWS_PROFILE=idevelop-tech npx sst deploy --stage production
```

---

## 📦 Packages

### `packages/web` - Frontend
Vue 3 application with TypeScript, Vue Router, and Tailwind CSS. Handles all UI and user interactions.

**Development:**
```bash
cd packages/web
npm run dev          # Start dev server
npm run build        # Production build
npm run type-check   # TypeScript validation
npm run lint         # ESLint
npm run format       # Prettier
```

### `packages/functions` - Backend
AWS Lambda functions for API endpoints. Includes contact form handler with reCAPTCHA verification, rate limiting, and email delivery.

### `packages/core` - Shared
Shared TypeScript types and utilities used across frontend and backend packages.

---

## 🌐 Environment Variables

**Frontend (`packages/web/.env.*`):**
```bash
VITE_API_URL                # API endpoint URL
VITE_RECAPTCHA_SITE_KEY     # reCAPTCHA public site key
VITE_GA_MEASUREMENT_ID      # Google Analytics measurement ID
```

**Note:** All values in `.env.production` and `.env.development` are public keys/IDs safe for client-side use. Secret keys (reCAPTCHA secret, AWS credentials) are managed via AWS SSM Parameter Store and GitHub Secrets.

---

## 🔒 Security

- AWS OIDC authentication (no long-lived credentials)
- Secrets managed via AWS SSM and GitHub Secrets
- Automated dependency scanning via Dependabot
- See [SECURITY.md](.github/SECURITY.md) for vulnerability reporting

---

## 📚 Documentation

- **[docs/PROJECT-PLAN.md](docs/PROJECT-PLAN.md)** - Complete project roadmap and phase breakdown
- **[docs/NEXT-SESSION-START.md](docs/NEXT-SESSION-START.md)** - Quick start guide for next development session
- **[docs/DEVELOPMENT-WORKFLOW.md](docs/DEVELOPMENT-WORKFLOW.md)** - Development and deployment workflow
- **[docs/AWS-SETUP.md](docs/AWS-SETUP.md)** - AWS SSO configuration and OIDC setup
- **[docs/CTA-FORM-IMPLEMENTATION-PLAN.md](docs/CTA-FORM-IMPLEMENTATION-PLAN.md)** - Backend API implementation guide
- **[packages/web/docs/](packages/web/docs/)** - Frontend architecture and component documentation

---

## 🤝 Contributing

This is a portfolio project showcasing full-stack development practices. Feel free to explore the code, open issues for suggestions, or reference patterns for your own projects.

---

## 📄 License

See [LICENSE](LICENSE) file for details.

---

## 🏗️ Architecture

**Current Infrastructure:**
- **Frontend:** S3 + CloudFront (HTTPS, global CDN)
- **CI/CD:** GitHub Actions (PR checks, auto-deploy to production)
- **Authentication:** AWS OIDC (secure, credential-free deployments)

**Backend Infrastructure:**
- API Gateway + Lambda (serverless contact form API)
- DynamoDB (rate limiting storage)
- SES (email delivery with DKIM/SPF/DMARC)
- AWS SSM Parameter Store (secrets management)

---

## 📊 Project Status

- ✅ **Phase 1:** SST migration complete
- ✅ **Phase 2:** Verification and bug fixes complete
- ✅ **Phase 3:** CI/CD pipeline configured
- ✅ **Phase 4:** Production deployment to CloudFront
- ✅ **Phase 4.5:** Security audit and public repo preparation
- ✅ **Phase 5:** Backend API implementation complete
  - ✅ Contact form API with reCAPTCHA
  - ✅ Email authentication (DKIM, SPF, DMARC)
  - ✅ CI/CD workflow optimizations
  - ✅ Dependency updates
- 🔄 **Phase 6:** Testing and validation (CURRENT)
- 🔜 **Phase 7:** Custom domain migration (idevelop.tech)
- 🔜 **Phase 8:** Final security audit and make repository public

**See [docs/PROJECT-PLAN.md](docs/PROJECT-PLAN.md) for detailed phase breakdown.**

---

**Built with:** Vue 3, TypeScript, Tailwind CSS, SST, AWS
