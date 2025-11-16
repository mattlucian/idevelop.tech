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

- **Vue.js 3** with Composition API
- **TypeScript** for type safety
- **Vue Router** for navigation
- **Tailwind CSS** for styling
- **Vite** - Fast build tool and dev server

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

### Observability & Monitoring

- **Axiom** - Log aggregation and observability platform (500GB/month free tier)
- **AWS Distro for OpenTelemetry (ADOT)** - Distributed tracing
- **OpenTelemetry Protocol (OTLP)** - Vendor-agnostic telemetry
- **Axiom Lambda Extension** - Lambda logs and platform metrics

### Build & Development Tools

- **vue-tsc** - TypeScript checker for Vue
- **ESLint + Prettier** - Code quality and formatting
- **Dependabot** - Automated dependency updates
- **CodeQL + DeepSource** - Security and quality scanning

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

## Observability & Monitoring

### Solution Architecture

**Platform**: Axiom (500GB/month free tier) with AWS Distro for OpenTelemetry (ADOT)

**Observability Stack**:
```
Lambda Function
    ├─ ADOT Layer (OpenTelemetry)
    │   ├─ Auto-instrumentation (AWS SDK, HTTP, etc.)
    │   ├─ OTLP Collector (collector.yaml)
    │   └─ Exports → Axiom (OTLP/HTTP with gzip)
    │
    └─ Axiom Lambda Extension
        ├─ Lambda logs
        ├─ Platform metrics (invocations, duration, memory, cold starts)
        └─ Exports → Axiom (native API)
```

### Lambda Layers Configuration

**ADOT Lambda Layer** (`sst.config.ts:66`):
- ARN: `arn:aws:lambda:us-east-1:901920570463:layer:aws-otel-nodejs-arm64-ver-1-30-2:1`
- Purpose: Distributed tracing with OpenTelemetry
- Auto-instruments: AWS SDK calls, HTTP requests, Lambda invocations
- Sends: OTLP traces to Axiom

**Axiom Lambda Extension** (`sst.config.ts:63`):
- ARN: `arn:aws:lambda:us-east-1:694952825951:layer:axiom-extension-arm64:11`
- Purpose: Lambda logs and platform metrics
- Collects: Function logs, invocation count, execution duration, memory usage, cold starts
- Sends: Logs and metrics to Axiom (native format)

### OTLP Collector Configuration

**Location**: `packages/functions/src/collector.yaml`

**Pipelines**:
1. **Traces Pipeline**:
   - Receiver: OTLP (grpc:4317, http:4318)
   - Exporter: OTLP/HTTP to Axiom with gzip compression
   - Data: Distributed traces with spans for API Gateway, Lambda, AWS services

2. **Metrics Pipeline**:
   - Receiver: OTLP (grpc:4317, http:4318)
   - Exporter: Debug (discards data)
   - Rationale: OTLP metrics require separate dataset, not needed for current use case

**Environment Variables** (`sst.config.ts:77-86`):
```typescript
// Axiom configuration (used by both layers)
AXIOM_TOKEN: axiomToken.value              // SST secret
AXIOM_DATASET: "dev-idevelop-tech"         // Stage-specific dataset
AXIOM_URL: "https://api.axiom.co"          // Axiom API endpoint

// ADOT configuration
AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler"                    // Node.js wrapper
OPENTELEMETRY_COLLECTOR_CONFIG_URI: "/var/task/collector.yaml"  // Collector config
OTEL_SERVICE_NAME: "contact-api"                                // Service identifier
OTEL_RESOURCE_ATTRIBUTES: "service.name=contact-api,..."        // Metadata
```

### Dataset Architecture

**Development Dataset**:
- Name: `dev-idevelop-tech`
- Type: Events (supports logs and traces)
- Data: Lambda logs, OTLP traces, platform metrics

**Production Dataset** (pending):
- Name: `idevelop.tech`
- Type: Events
- Configuration: Same as dev, different token

**Why Events Dataset Type**:
- Axiom offers two dataset types: "Events" and "OpenTelemetry Metrics (Preview)"
- Events type: Accepts logs AND traces (required for our use case)
- Metrics type: Only accepts OTLP metrics (not logs/traces)
- OTLP metrics require separate dataset with `x-axiom-metrics-dataset` header

### Observability Data Collected

**OTLP Traces** (via ADOT):
- Full distributed tracing across request lifecycle
- Trace IDs for correlation across services
- Spans for each operation:
  - API Gateway HTTP request (method, path, status code)
  - Lambda function invocation (cold start indicator, duration)
  - AWS SDK calls (DynamoDB queries, SES emails, SSM parameters)
- Span attributes: HTTP status codes, error messages, service metadata

**Lambda Platform Metrics** (via Axiom Extension):
- Invocation count
- Execution duration
- Memory usage (allocated vs used)
- Cold start occurrences
- Billed duration

**Lambda Logs** (via Axiom Extension):
- Function logs with timestamps
- Request/response details
- Error messages and stack traces
- Correlated with trace IDs

### Querying and Monitoring

**Axiom Dashboard**: Prebuilt Lambda dashboard shows invocations, duration, errors

**APL Query Examples**:
```apl
// View all traces
['dev-idevelop-tech']
| where kind == "span"
| sort by _time desc

// Track HTTP status codes
['dev-idevelop-tech']
| where ['http.status_code'] > 0
| summarize count() by ['http.status_code']

// Monitor cold starts
['dev-idevelop-tech']
| where ['faas.coldstart'] == true
| summarize count() by bin(_time, 1h)

// Find errors
['dev-idevelop-tech']
| where ['otel.status_code'] == "ERROR"
| project _time, ['service.name'], ['exception.message']
```

### IAM Permissions

**X-Ray Permissions** (`sst.config.ts:110-114`):
```typescript
{
  actions: ["xray:PutTraceSegments", "xray:PutTelemetryRecords"],
  resources: ["*"]
}
```

Required for ADOT to send trace data to AWS X-Ray backend (used internally by OTLP collector).

### Alerting (Pending)

**Planned Alerts**:
- Lambda function errors (5xx responses)
- High error rates (>5% of requests)
- Increased cold starts (performance degradation)
- Rate limit hits (potential abuse)

**Reference**: See `TODO.md` for alerting implementation tasks

### Setup Reference

**Documentation**: `docs/SETUP.md` (Axiom Observability section)

**Configuration Files**:
- `sst.config.ts` - Lambda layers, environment variables, permissions
- `packages/functions/src/collector.yaml` - OTLP collector configuration

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
3. **Observability by Default**: Distributed tracing and monitoring integrated at infrastructure level
4. **Component Reusability**: 2-3 pattern rule enforced (see `docs/frontend/COMPONENT-RULES.md`)
5. **Data-Driven Design**: Components render from TypeScript data files, not hardcoded content
6. **Separation of Concerns**: Clear boundaries between content, presentation, and styling
7. **Infrastructure as Code**: All AWS resources defined in `sst.config.ts`
8. **CI/CD Automation**: GitHub Actions with OIDC authentication
9. **Least-Privilege Security**: IAM permissions scoped to minimum required access

---

## Related Documentation

- **[frontend/COMPONENT-RULES.md](./frontend/COMPONENT-RULES.md)** - Component creation rules
- **[frontend/DESIGN-SYSTEM.md](./frontend/DESIGN-SYSTEM.md)** - Design patterns and tokens
- **[frontend/DATA-STRUCTURE.md](./frontend/DATA-STRUCTURE.md)** - Type schemas and data organization
- **[frontend/CONFIGURATION.md](./frontend/CONFIGURATION.md)** - Configuration files reference
- **[backend/FUNCTIONS.md](./backend/FUNCTIONS.md)** - Lambda functions overview
- **[BRANCH-STRATEGY.md](./BRANCH-STRATEGY.md)** - Git workflow and CI/CD
- **[CODE-SCANNING-STRATEGY.md](./CODE-SCANNING-STRATEGY.md)** - Security and quality scanning
