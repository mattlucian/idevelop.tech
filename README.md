# idevelop.tech

[![Deploy Production](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml)
[![PR Checks](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml)
[![ESLint](https://github.com/mattlucian/idevelop.tech/actions/workflows/eslint.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/mattlucian/idevelop.tech/actions/workflows/codeql.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/codeql.yml)
[![DeepSource](https://app.deepsource.com/gh/mattlucian/idevelop.tech.svg/?label=active+issues&show_trend=true&token=78yqFa5jiiY8qC23puM8RAj_)](https://app.deepsource.com/gh/mattlucian/idevelop.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Full-stack portfolio application showcasing technical consulting services, cloud infrastructure expertise, and software development capabilities.

**Live Site**: https://idevelop.tech

---

## Why This Project?

Production-ready full-stack development practices:

- **🏗️ Architecture** - Serverless-first, type-safe monorepo, Infrastructure as Code (SST v3)
- **🔒 Security** - AWS OIDC auth, automated scanning (CodeQL, DeepSource), branch protection
- **⚡ Developer Experience** - Full TypeScript, automated quality checks, hot reload, AI guidelines
- **🚀 CI/CD** - GitHub Actions, separate dev/prod environments, automated workflows

---

## Quick Start

<details>
<summary><b>Prerequisites</b></summary>

- Node.js 20.19.0+ or 22.12.0+
- AWS CLI (for deployment)
- AWS account with appropriate permissions

</details>

<details>
<summary><b>Development Setup</b></summary>

```bash
# Clone repository
git clone https://github.com/mattlucian/idevelop.tech.git
cd idevelop.tech

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

</details>

<details>
<summary><b>Environment Variables</b></summary>

Create `packages/web/.env.local`:

```env
VITE_API_URL=your-api-gateway-url
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
VITE_GA_MEASUREMENT_ID=your-ga-id  # Production only (disabled in dev)
```

</details>

<details>
<summary><b>Deployment</b></summary>

**Automated via GitHub Actions:**
- Push to `develop` → Deploy to dev environment
- Push to `main` → Deploy to production

**Manual deployment:**
```bash
aws sso login --profile idevelop-tech
AWS_PROFILE=idevelop-tech npx sst deploy --stage production
```

</details>

---

## Tech Stack

```
Frontend
┌─────────────────────────────────────────────────────────────────┐
│ Vue 3 • TypeScript • Tailwind CSS • Vite • Vue Router           │
└─────────────────────────────────────────────────────────────────┘

Backend & API
┌─────────────────────────────────────────────────────────────────┐
│ AWS Lambda • API Gateway • DynamoDB • SSM Parameters            │
└─────────────────────────────────────────────────────────────────┘

Infrastructure & Services
┌─────────────────────────────────────────────────────────────────┐
│ SST v3 • S3 • CloudFront • SES • GitHub Actions                 │
└─────────────────────────────────────────────────────────────────┘

Observability & Security
┌─────────────────────────────────────────────────────────────────┐
│ New Relic • Google Analytics 4 • CodeQL • DeepSource • reCAPTCHA│
└─────────────────────────────────────────────────────────────────┘
```

---

## Architecture

### Request Flow

```mermaid
graph TB
    A[User Browser] -->|HTTPS| B[CloudFront CDN]
    B --> C[S3 Static Assets<br/>Vue 3 SPA]

    A -->|reCAPTCHA| D[Google reCAPTCHA v3]

    C -->|API Request| E[API Gateway]
    E -->|IAM Auth| F[Lambda Functions<br/>Contact Handler]

    F --> G[DynamoDB<br/>Rate Limiting]
    F --> H[SES<br/>Email Delivery]
    F --> I[SSM Parameter Store<br/>Secrets]

    style B fill:#5b9bd5,stroke:#333
    style E fill:#5b9bd5,stroke:#333
    style F fill:#70ad47,stroke:#333
```

### Deployment Architecture

```mermaid
graph TB
    A[Developer] -->|git push| B[GitHub Repository]
    B -->|triggers| C[GitHub Actions<br/>CI/CD Pipeline]

    C -->|OIDC Auth| D[AWS]

    C -->|SST Deploy| E[CloudFormation]

    E --> F[S3 + CloudFront<br/>Frontend]
    E --> G[API Gateway + Lambda<br/>Backend]
    E --> H[DynamoDB + SES<br/>Services]

    style C fill:#ed7d31,stroke:#333
    style E fill:#5b9bd5,stroke:#333
    style F fill:#70ad47,stroke:#333
    style G fill:#70ad47,stroke:#333
    style H fill:#70ad47,stroke:#333
```

---

## Project Structure

```
idevelop.tech/
├── packages/
│   ├── web/         # Vue 3 frontend
│   ├── functions/   # AWS Lambda functions
│   └── core/        # Shared TypeScript types
├── sst.config.ts    # Infrastructure as Code
├── docs/            # Documentation
└── .github/         # CI/CD workflows
```

---

## CI/CD Workflow

### 1. Branch Creation & Pull Request

```mermaid
graph TB
    A[develop branch] -->|create branch| B[feature/my-feature]
    C[main branch] -->|create branch| D[hotfix/critical-fix]

    B -->|code changes| E[Commit & Push]
    D -->|code changes| F[Commit & Push]

    E -->|open PR| G[PR to develop]
    F -->|open PR| H[PR to main]

    G -->|triggers| I[Status Checks]
    H -->|triggers| I

    I --> J[TypeScript Check]
    I --> K[ESLint]
    I --> L[Build Validation]
    I --> M[CodeQL Security]
    I --> N[DeepSource]

    style B fill:#5b9bd5,stroke:#333
    style D fill:#e74c3c,stroke:#333
    style I fill:#ed7d31,stroke:#333
```

**Branch Types**:
- `feature/*` - New features (from develop)
- `docs/*` - Documentation (from develop)
- `hotfix/*` - Production fixes (from main)

### 2. Development Workflow (PR → develop)

```mermaid
graph TB
    A[feature/* branch] -->|open PR| B[PR to develop]
    B -->|status checks| C{All Checks Pass?}
    C -->|No| D[Fix Issues]
    D -->|push changes| B
    C -->|Yes| E[Merge to develop]
    E -->|auto-deploy| F[Dev Environment<br/>dev.idevelop.tech]

    style C fill:#ed7d31,stroke:#333
    style F fill:#5b9bd5,stroke:#333
```

**What Happens**:
- All status checks must pass (TypeScript, ESLint, Build, CodeQL, DeepSource)
- After merge, automatic deployment to dev environment
- Test changes at https://dev.idevelop.tech

### 3. Production Deployment (develop → main)

```mermaid
graph TB
    A[develop branch] -->|open PR| B[PR to main]
    B -->|status checks| C{All Checks Pass?}
    C -->|No| D[Fix Issues]
    D -->|merge to develop| A
    C -->|Yes| E[Merge to main]
    E -->|auto-deploy| F[Production<br/>idevelop.tech]

    style C fill:#ed7d31,stroke:#333
    style F fill:#70ad47,stroke:#333
```

**What Happens**:
- Additional CodeQL security scan required for production
- After merge, automatic deployment to production
- Live at https://idevelop.tech (custom domain) or CloudFront URL

**Status Checks** (required for all PRs):
- ✅ TypeScript type checking
- ✅ ESLint code quality
- ✅ Build validation
- ✅ CodeQL security scan (main only)
- ✅ DeepSource analysis

---

## Documentation

**Architecture & Development**:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Full-stack architecture decisions
- [CLAUDE.md](CLAUDE.md) - AI development guidelines and coding standards
- [BRANCH-STRATEGY.md](docs/BRANCH-STRATEGY.md) - Git workflow and CI/CD

**Frontend**:
- [Component Rules](docs/frontend/COMPONENT-RULES.md) - Component patterns (2-3 rule)
- [Design System](docs/frontend/DESIGN-SYSTEM.md) - Design tokens and styling
- [Data Structure](docs/frontend/DATA-STRUCTURE.md) - Type schemas

**Backend & Operations**:
- [Lambda Functions](docs/backend/FUNCTIONS.md) - API implementation
- [Observability](docs/OBSERVABILITY.md) - Monitoring and analytics (New Relic + GA4)

**Setup & Configuration**:
- [SETUP.md](docs/SETUP.md) - Initial project setup and configuration
- [TODO.md](TODO.md) - Active tasks and pending work

**Security**:
- [SECURITY.md](.github/SECURITY.md) - Security policy and vulnerability reporting

---

## License

MIT License - See [LICENSE](LICENSE) for details.
