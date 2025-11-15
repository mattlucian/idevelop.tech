# idevelop.tech

[![Deploy Production](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/deploy-production.yml)
[![PR Checks](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/pr-checks.yml)
[![ESLint](https://github.com/mattlucian/idevelop.tech/actions/workflows/eslint.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/mattlucian/idevelop.tech/actions/workflows/codeql.yml/badge.svg)](https://github.com/mattlucian/idevelop.tech/actions/workflows/codeql.yml)
[![DeepSource](https://app.deepsource.com/gh/mattlucian/idevelop.tech.svg/?label=active+issues&show_trend=true&token=78yqFa5jiiY8qC23puM8RAj_)](https://app.deepsource.com/gh/mattlucian/idevelop.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Full-stack portfolio application showcasing technical consulting services, cloud infrastructure expertise, and software development capabilities.

**Live Site**: https://dxeay6n8brs8g.cloudfront.net

---

## Why This Project?

Production-ready full-stack development practices:

- **🏗️ Architecture** - Serverless-first, type-safe monorepo, Infrastructure as Code (SST v3)
- **🔒 Security** - AWS OIDC auth, automated scanning (CodeQL, DeepSource), branch protection
- **⚡ Developer Experience** - Full TypeScript, automated quality checks, hot reload, AI guidelines
- **🚀 CI/CD** - GitHub Actions, separate dev/prod environments, automated workflows

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

Code Quality & Security
┌─────────────────────────────────────────────────────────────────┐
│ TypeScript (strict) • ESLint • CodeQL • DeepSource • reCAPTCHA  │
└─────────────────────────────────────────────────────────────────┘
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

## Architecture

```mermaid
graph TB
    subgraph "Frontend"
        A[Vue 3 SPA] -->|HTTPS| B[CloudFront CDN]
        B --> C[S3 Bucket]
    end

    subgraph "Backend"
        A -->|API Calls| D[API Gateway]
        D --> E[Lambda Functions]
        E --> F[DynamoDB]
        E --> G[SES Email]
        E --> H[SSM Parameters]
    end

    subgraph "Security"
        A -->|Verify| I[reCAPTCHA v3]
        D -->|IAM| E
    end

    subgraph "CI/CD"
        J[GitHub Actions] -->|Deploy| B
        J -->|Deploy| D
        K[OIDC] -->|Auth| J
    end

    style A fill:#bbf,stroke:#333
    style E fill:#bfb,stroke:#333
    style J fill:#fbb,stroke:#333
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
VITE_GA_MEASUREMENT_ID=your-ga-id  # Optional
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
  - `COMPONENT-RULES.md` - Component patterns (2-3 rule)
  - `DESIGN-SYSTEM.md` - Design tokens and styling
  - `DATA-STRUCTURE.md` - Type schemas
  - `CONFIGURATION.md` - Key configuration files
- **[docs/backend/FUNCTIONS.md](docs/backend/FUNCTIONS.md)** - Lambda functions

### Development
- **[CLAUDE.md](CLAUDE.md)** - AI development guidelines and coding standards
- **[.github/SECURITY.md](.github/SECURITY.md)** - Security policy

---

## Contributing

Contributions are welcome! This project follows professional development practices:

### Branch Strategy

1. **Create feature branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** with quality checks:
   ```bash
   # After changes
   npm run type-check   # Must pass
   npm run lint         # Must pass
   npm run format       # Must run
   ```

3. **Create Pull Request** to `develop`:
   - All status checks must pass
   - ESLint, TypeScript, CodeQL, DeepSource
   - PRs to `main` are only from `develop`

4. **Branch cleanup**: Feature branches auto-delete after merge

### Code Standards

- **TypeScript**: Strict mode, no `any` types, no non-null assertions (`!`)
- **Vue 3**: Composition API with `<script setup lang="ts">`
- **Components**: Follow 2-3 pattern rule (see `docs/frontend/COMPONENT-RULES.md`)
- **Styling**: Tailwind CSS, follow design system tokens
- **Error Handling**: Centralized logger, structured errors, proper validation

See [CLAUDE.md](CLAUDE.md) for complete development guidelines.

---

## Security

- AWS OIDC authentication (no long-lived credentials)
- Secrets managed via AWS SSM and GitHub Secrets
- Automated security scanning (CodeQL, DeepSource)
- Dependency scanning (Dependabot)
- Branch protection with required reviews
- Environment variable validation

See [.github/SECURITY.md](.github/SECURITY.md) for vulnerability reporting.

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Built with Vue 3, TypeScript, Tailwind CSS, SST, and AWS**
