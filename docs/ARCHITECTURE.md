# Architecture Documentation

## Overview

This document captures the key architectural decisions for the full-stack idevelop.tech application, including frontend, backend, infrastructure, and deployment.

## Project Structure

This is an **SST (Serverless Stack) v3 monorepo** containing:

- **packages/web/** - Vue 3 frontend application
- **packages/functions/** - AWS Lambda functions (API endpoints)
- **packages/core/** - Shared TypeScript types and utilities
- **sst.config.ts** - Infrastructure as Code (SST v3, no separate infra/ folder needed)

**Architecture Pattern**: Full-stack serverless monorepo with TypeScript throughout

---

## Technology Stack

### Frontend

- **Vue.js 3.5.22** with Composition API
- **TypeScript 5.9** for type safety
- **Vue Router 4.5.1** for navigation
- **Tailwind CSS 4.1.14** for styling
- **Vite 7.1.7** - Fast build tool and dev server

### Backend

- **AWS Lambda** - Serverless compute (Node.js 20.x runtime)
- **API Gateway HTTP API** - RESTful API endpoints
- **AWS SES** - Email delivery
- **AWS DynamoDB** - Rate limiting and session storage
- **AWS SSM Parameter Store** - Secrets management

### Infrastructure

- **SST v3 (Ion)** - Infrastructure as Code (Pulumi-based)
- **S3 + CloudFront** - Static site hosting with CDN
- **GitHub Actions** - CI/CD with OIDC authentication
- **AWS** - Cloud platform (us-east-1)

### Build & Development Tools

- **vue-tsc** - TypeScript checker for Vue
- **ESLint + Prettier** - Code quality and formatting
- **Dependabot** - Automated dependency updates
- **CodeQL + DeepSource** - Security and quality scanning

### Node Version

- Required: Node 20.19.0+ or 22.12.0+

---

## Backend Architecture

### Lambda Functions

**Location**: `packages/functions/src/`

**Contact Handler** (`contact.ts`):
- Processes contact form submissions
- **Input validation**: TypeScript types from `@idevelop-tech/core`
- **reCAPTCHA verification**: Server-side validation via Google API
- **Rate limiting**: DynamoDB-based (5/hour per IP, 10/day per email)
- **Email delivery**: AWS SES to admin and sender
- **Error handling**: Structured responses with request IDs

**IAM Permissions** (least-privilege):
- DynamoDB: PutItem, Query (scoped to rate limit table)
- SES: SendEmail, SendRawEmail (scoped to verified identities)
- SSM: GetParameter (scoped to stage-specific parameters)

### API Gateway

**Type**: HTTP API (v2)
**Endpoints**:
- `POST /contact` - Contact form submission

**Features**:
- CORS configured per stage (dev vs production)
- Request/response transformation
- Custom domains: `dev-api.idevelop.tech`, `api.idevelop.tech`

### DynamoDB Tables

**RateLimitTable**:
- Primary key: Composite (IP address + email)
- TTL enabled for automatic cleanup
- Tracks submission counts per time window

### Email System (SES)

**Verified Identity**: matt@idevelop.tech, idevelop.tech domain
**Authentication**:
- DKIM: 3 CNAME records for email signing
- SPF: TXT record allowing Google Workspace + AWS SES
- DMARC: Monitor mode with reports

**Email Flow**:
- Single thread with sender and admin BCC
- HTML templates with variable substitution
- Templates bundled via SST `copyFiles` configuration

---

## Infrastructure Architecture

### SST Configuration

**Location**: `sst.config.ts` (root)

**Resources Defined**:
1. **Frontend**: S3 bucket + CloudFront distribution
2. **API**: HTTP API Gateway + Lambda function
3. **Database**: DynamoDB table with TTL
4. **Storage**: SSM parameters for secrets
5. **Email**: SES identity verification

**Stages**:
- `dev` - Development environment (dev.idevelop.tech)
- `production` - Production environment (CloudFront URL, custom domain pending)

### Deployment Architecture

**Frontend Deployment**:
```
Build (Vite) → S3 Bucket → CloudFront (CDN) → Users
```

**API Deployment**:
```
TypeScript → SST Bundle → Lambda Function → API Gateway → Users
```

**Secrets Flow**:
```
SSM Parameter Store (encrypted) → Lambda Environment Variables → Runtime
```

### CI/CD Pipeline

**GitHub Actions Workflows**:

1. **PR Checks** (`.github/workflows/pr-checks.yml`):
   - Type checking
   - ESLint
   - Build verification
   - Triggers: PRs to develop/main

2. **Deploy Dev** (`.github/workflows/deploy-dev.yml`):
   - Deploys to dev stage
   - Trigger: Push to develop branch
   - URL: https://dev.idevelop.tech

3. **Deploy Production** (`.github/workflows/deploy-production.yml`):
   - Deploys to production stage
   - Trigger: Push to main branch
   - URL: https://dxeay6n8brs8g.cloudfront.net (CloudFront)

4. **CodeQL Security Scan** (`.github/workflows/codeql.yml`):
   - Weekly scans + PR scans
   - Security + quality analysis
   - 200+ rules (security-and-quality pack)

**Authentication**: AWS OIDC (no long-lived credentials in GitHub)

### Branch Strategy

```
feature/* → PR → develop → deploy to dev
                    ↓
                 (test)
                    ↓
            PR → main → deploy to production
```

**Branch Protection**:
- PRs required for main and develop
- CI checks must pass
- Code review recommended

---

## Frontend Architecture

### Component Organization Pattern

**Decision**: Organize components into 6 functional categories rather than flat structure.

**Categories**:
- `elements/` - Atomic UI building blocks (buttons, badges, utilities)
- `cards/` - Card-based content containers
- `ui/` - Complex, reusable UI components (panels, sections)
- `display/` - Data visualization components
- `layout/` - Global application layout
- `integration/` - Integration diagram visualizations

**Rationale**:
- Clear separation of concerns by component complexity
- Easy to locate components by purpose
- Scalable as component library grows
- Enforces reusability patterns

**Reference**: See `docs/frontend/COMPONENTS.md` for complete component catalog

### State Management Pattern

**Decision:** Use Vue Composition API with composables instead of Vuex/Pinia.

**Rationale:**

- Simple state requirements
- Composition API provides sufficient reactivity
- Avoids adding another dependency
- Easy to upgrade to Pinia later if needed

**Implementation:**

- Composables in `src/composables/`:
  - `useServiceConfig.ts` - Service configuration and data access
  - `useMeta.ts` - Meta tag management

### View Architecture Pattern

**Decision**: Separate main views (`/src/views/`) from service views (`/src/views/services/`).

**Structure**:
- Main application views in `/src/views/`
- Service-specific views in `/src/views/services/` subdirectory

**Rationale**:
- Clear separation between general pages and service offerings
- Easier to maintain growing number of service pages
- Logical grouping by business domain

### Routing Strategy

#### Service Page Architecture

**Decision:** Use dedicated view files for each service instead of a dynamic `:serviceId` route.

**Rationale:**

- Each service has unique interactive components (tabs, diagrams, visualizations)
- Service-specific layouts without conditional rendering
- Better code organization and maintainability
- Easier to customize individual services
- Type-safe data structures specific to each service

**Implementation**:
- Dedicated route per service (e.g., `/services/integration`)
- Shared components with variants for common patterns
- Service-specific interactivity via specialized components
- TypeScript data files per service

#### Route Optimization

**Decision**: Use dynamic imports for all routes (code splitting).

**Rationale**: Optimizes initial bundle size and loads pages on demand.

### Data Strategy

**Decision**: Migrate from JSON to TypeScript for all data files.

**Rationale**:
- Compile-time type checking for all content
- Better IDE autocomplete and IntelliSense
- Type-safe imports and exports
- Easier refactoring and maintenance

**Organization**:
- Service data: TypeScript files in `/src/data/services/`
- Type definitions: Organized in `/src/types/` by domain
- Shared types in `/src/types/shared/` aligned with component categories

**Type System Pattern**:
- Base interfaces for common patterns (`ServicePageData`)
- Service-specific extensions for unique content
- Separation of shared component types vs domain types

**Reference**: See `docs/frontend/DATA-STRUCTURE.md` for complete type schemas

### Styling Strategy

**Decision**: Dual color scheme system (cyan vs emerald) with component-level theming.

**Rationale**:
- Visual distinction between business-focused (cyan) and technical (emerald) content
- All components support color scheme props for flexibility
- Dynamic theming allows context-aware UI elements

**Implementation**:
- Tailwind CSS for utility-first styling
- Mobile-first responsive approach
- Dark theme as base design

**Reference**: See `docs/frontend/DESIGN-SYSTEM.md` for complete design tokens and patterns

### Component Communication Pattern

**Props-Down, Events-Up**: Standard Vue pattern with TypeScript interfaces.

**Composables**: Shared logic extracted to reusable composables (`useServiceConfig`, `useMeta`).

**Rationale**: Maintains unidirectional data flow, enforces type safety, promotes reusability.

---

## Build & Development

### Build Tooling

**Vite**: Fast build tool with:
- Vue plugin with JSX support
- TypeScript support with separate type checking
- Path aliases (`@` -> `./src`)
- Dynamic imports for code splitting

**TypeScript**: Strict mode enabled with separate type checking process.

**Reference**: See `docs/frontend/CONFIGURATION.md` for complete configuration details

---

## Key Architectural Principles

1. **Serverless-First**: Full-stack serverless architecture with AWS Lambda and SST
2. **Type Safety**: TypeScript throughout (frontend, backend, infrastructure)
3. **Component Reusability**: 2-3 pattern rule enforced (see `docs/frontend/COMPONENT-RULES.md`)
4. **Data-Driven Design**: Components render from TypeScript data files, not hardcoded content
5. **Separation of Concerns**: Clear boundaries between content, presentation, and styling
6. **Infrastructure as Code**: All AWS resources defined in `sst.config.ts`
7. **CI/CD Automation**: GitHub Actions with OIDC authentication
8. **Least-Privilege Security**: IAM permissions scoped to minimum required access

---

## Future Considerations

### State Management

**Current**: Vue Composition API with composables

**When to add Pinia**:
- Multiple complex state domains emerge
- Need dev tools time-travel debugging
- State persistence requirements
- Team scaling beyond solo development

### Performance Optimization

**Implemented**:
- Route-based code splitting
- Lazy loading for all views
- CloudFront CDN for static assets

**Future**:
- Image optimization (WebP, responsive images)
- Service Worker for offline support
- PWA features for mobile

---

## Related Documentation

- **[frontend/COMPONENTS.md](./frontend/COMPONENTS.md)** - Component catalog
- **[frontend/COMPONENT-RULES.md](./frontend/COMPONENT-RULES.md)** - Component creation rules
- **[frontend/DESIGN-SYSTEM.md](./frontend/DESIGN-SYSTEM.md)** - Design patterns and tokens
- **[frontend/DATA-STRUCTURE.md](./frontend/DATA-STRUCTURE.md)** - Type schemas and data organization
- **[frontend/CONFIGURATION.md](./frontend/CONFIGURATION.md)** - Configuration files reference
- **[backend/FUNCTIONS.md](./backend/FUNCTIONS.md)** - Lambda functions overview
- **[BRANCH-STRATEGY.md](./BRANCH-STRATEGY.md)** - Git workflow and CI/CD
- **[CODE-SCANNING-STRATEGY.md](./CODE-SCANNING-STRATEGY.md)** - Security and quality scanning
