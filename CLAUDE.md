# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this SST monorepo.

---

## 📁 Project Structure

This is an **SST (Serverless Stack) monorepo** containing:

- **packages/web/** - Vue 3 frontend application
- **packages/functions/** - AWS Lambda functions (API endpoints)
- **packages/core/** - Shared TypeScript types and utilities
- **sst.config.ts** - Infrastructure as Code (SST v3, no separate infra/ folder needed)

**Current Status**: Production Deployed with Custom Domain ✅

**Production URL**: https://idevelop.tech

---

## 📝 Documentation Principles

When writing or updating documentation in this repository:

- **Be concise** - Get to the point quickly, avoid verbose explanations
- **🔴 Use visual icons for critical rules** - Important warnings should stand out visually
- **Stay on subject** - Document rules, not examples that add maintenance burden
- **Avoid summary information** - No component counts, file counts, or statistics that require updates
- **No version histories** - Source control handles change tracking
- **No changelogs** - Git commit history is the source of truth
- **Focus on principles over specifics** - Document "how to think" not "what exists"

### 🔴 CRITICAL: Temporary Documentation Location

**Task-list documents, planning docs, and session notes must NOT live in `/docs`**

When creating temporary planning or task-tracking documents:

❌ **WRONG**: `/docs/planning-task-list.md`
❌ **WRONG**: `/docs/SESSION-2025-11-13.md`
❌ **WRONG**: Any checklist or todo-style doc in `/docs`

✅ **CORRECT**: `/planning/task-list.md`
✅ **CORRECT**: Use `TODO.md` for ongoing project todos
✅ **CORRECT**: Delete planning docs after extracting valuable content

**Why this matters**:
- `/docs` is for long-lived reference documentation only
- Temporary docs mixed with permanent docs cause confusion
- Makes it unclear what can be safely deleted
- Planning docs should be in `/planning` (easy to delete entire directory)

**The `/planning` directory**:
- Contains temporary task lists, analysis documents, and planning notes
- Safe to delete entire directory after completion
- Can be git-ignored if desired (optional)
- Clear separation from permanent documentation

---

## Quick Reference Card

**At-a-glance project summary:**

- **Architecture**: SST full-stack monorepo (npm workspaces)
- **Frontend**: Vue 3 (Composition API) + TypeScript + Vue Router + Tailwind CSS
- **Backend**: AWS Lambda + API Gateway + DynamoDB + SES (to be implemented)
- **Infrastructure**: SST v3 (Pulumi-based) + AWS
- **Deployment**: GitHub Actions CI/CD with AWS OIDC
- **Production**: S3 + CloudFront (HTTPS)
- **Color Schemes**: Cyan/Purple (services/business) | Emerald (tech/experience)

---

## Documentation Reference Key

**Quick lookup: When you need to... → Reference this doc**

### Full-Stack Architecture

| What You Need                         | Documentation File          |
| ------------------------------------- | --------------------------- |
| Complete system architecture overview | `docs/ARCHITECTURE.md` ⭐    |
| SST monorepo structure                | `docs/ARCHITECTURE.md`      |
| Backend & infrastructure architecture | `docs/ARCHITECTURE.md`      |
| CI/CD pipeline and deployment         | `docs/ARCHITECTURE.md`      |

### Frontend Development

| What You Need                                | Documentation File                     |
| -------------------------------------------- | -------------------------------------- |
| Write/edit content (service pages, copy)     | See "Frontend: When Writing Content" ⚠️ |
| Create/modify components                     | `docs/frontend/COMPONENT-RULES.md` ⚠️   |
| Find existing components                     | Check `/src/components/` directory     |
| Apply styles, colors, typography, responsive | `docs/frontend/DESIGN-SYSTEM.md`       |
| Work with service/tech data                  | `docs/frontend/DATA-STRUCTURE.md`      |
| Review frontend configuration                | `docs/frontend/CONFIGURATION.md`       |
| SEO implementation                           | `docs/frontend/SEO.md`                 |

### Backend Development

| What You Need                      | Documentation File                  |
| ---------------------------------- | ----------------------------------- |
| Lambda functions overview          | `docs/backend/FUNCTIONS.md`         |
| Contact form API implementation    | `packages/functions/src/contact.ts` |
| Email authentication setup         | `docs/SETUP.md` (email section)     |
| Backend architecture and IAM roles | `docs/ARCHITECTURE.md`              |

### Infrastructure & Deployment

| What You Need                   | Documentation File        |
| ------------------------------- | ------------------------- |
| Quick reference & commands      | `README.md` ⭐            |
| Initial project setup (forking) | `docs/SETUP.md`           |
| Branch strategy & CI/CD         | `docs/BRANCH-STRATEGY.md` |
| Active tasks and pending work   | `TODO.md`                 |
| Infrastructure architecture     | `docs/ARCHITECTURE.md`    |

---

## MANDATORY RULES

### 🚨 MOST CRITICAL RULE: NEVER PUSH DIRECTLY TO PROTECTED BRANCHES 🚨

**STOP AND READ THIS BEFORE ANY `git push` COMMAND:**

❌ **FORBIDDEN**: `git push origin main`
❌ **FORBIDDEN**: `git push origin develop`
❌ **FORBIDDEN**: Direct commits to `main` or `develop`

✅ **REQUIRED**: Always create feature branch → commit → push feature branch → create PR to `develop`

**Why this is absolutely critical:**
- Direct pushes skip ALL PR checks (CodeQL, DeepSource, build validation)
- Direct pushes skip code review process
- Direct pushes skip CI/CD validation gates
- Direct pushes can break production without any safety checks

**Before EVERY `git push`, verify you are on a feature branch:**
```bash
git branch --show-current  # Must show "feature/*" or "docs/*" or "hotfix/*", NEVER "develop" or "main"
```

**If you accidentally push to develop or main:**
1. IMMEDIATELY notify the user
2. Create a revert commit if needed
3. Re-apply changes through proper PR workflow

---

### 🔴 CRITICAL: NEVER USE GIT REBASE

**FORBIDDEN**: `git rebase`

**REQUIRED**: Always use `git merge` to integrate changes

**Why this is critical:**
- Rebasing rewrites commit history, causing conflicts for shared branches
- Rebasing makes it harder to track what actually happened
- Force pushes after rebase can lose work
- Merge commits provide clear history of when branches were integrated

**When you need to integrate develop into your feature branch:**
```bash
# ✅ CORRECT: Merge develop into feature branch
git fetch origin develop
git merge origin/develop

# ❌ WRONG: Never rebase
git rebase origin/develop  # DO NOT USE
```

**If conflicts occur:**
1. Resolve conflicts in the affected files
2. Stage resolved files: `git add <file>`
3. Complete merge: `git commit`
4. Push to remote: `git push origin <branch-name>`

---

### 🔴 CRITICAL: Session Start Rules

**Execute these steps when you first start working:**

1. **Identify current working directory**:
   - Root (`~/source/idevelop.tech/`) - For SST commands, monorepo tasks
   - Web package (`packages/web/`) - For frontend development
   - Functions package (`packages/functions/`) - For API development

2. **Check for multiple dev servers**: Only ONE dev server should run at a time

   ```bash
   ps aux | grep "npm run dev" | grep -v grep
   ```

3. **Kill extra servers**: Use `KillShell` tool with shell IDs from system reminders

4. **Review git status**: Check current branch and staged/unstaged changes

5. **Check dev server output**: Look for any startup errors or warnings

**Why this matters**: Multiple servers waste resources and cause port conflicts. Clean environment = reliable development.

---

### 🔴 CRITICAL: After Every Code Change

**Execute these steps after ANY file modification:**

1. **Type check**:
   - Frontend: `cd packages/web && npm run type-check`
   - Must pass with 0 errors
   - Fix any type errors before proceeding

2. **Format code**:
   - Frontend: `cd packages/web && npm run format`
   - Ensures consistency with user's "format on save" IDE setting
   - Prevents unnecessary git diffs

3. **Run ESLint**:
   - Frontend: `cd packages/web && npm run lint`
   - Must pass with 0 errors
   - Fix any linting errors before proceeding
   - ESLint runs automatically in CI/CD and will block PRs if errors exist

4. **Test in browser**: Check dev server output for changes
   - Verify no console errors or warnings
   - Check affected pages still render correctly

5. **Verify changes**: Quick visual check if UI was modified
   - Look for layout issues, styling problems, broken interactions

**Why this matters**: The user has "format on save" enabled. If you don't format, your changes create unnecessary diffs when they save, causing confusion in source control.

---

### 🔴 CRITICAL: Before Completing Any Task

**Final checklist before marking work complete:**

- [ ] All type checks pass (frontend: `npm run type-check` shows 0 errors)
- [ ] All modified files formatted (frontend: `npm run format` executed)
- [ ] All ESLint checks pass (frontend: `npm run lint` shows 0 errors)
- [ ] No console errors in browser dev tools
- [ ] Changes tested at relevant breakpoints (mobile 320px, tablet 768px, desktop 1024px+)
- [ ] Git status reviewed - no unintended file changes
- [ ] Documentation updated if architecture changed

**Why this matters**: Incomplete work causes downstream issues. Always deliver fully-tested, production-ready code.

---

### 🔴 CRITICAL: Git Workflow and Branch Strategy

**🚨 NEVER PUSH DIRECTLY TO `main` OR `develop` BRANCHES 🚨**

**MANDATORY: ALL CHANGES MUST GO THROUGH PULL REQUESTS**

**Branch workflow:**
```
feature/* → PR → develop → PR → main
              ↓              ↓
          dev stage    production stage
```

**Required workflow:**
1. Create feature branch from `develop`
2. Make changes and commit
3. Push branch and create PR to `develop` (NOT `main`)
4. After PR merged to develop → test on dev.idevelop.tech
5. Create PR from `develop` to `main` when ready for production

**Branch naming:**
- `feature/*` - New features
- `docs/*` - Documentation
- `hotfix/*` - Production fixes (branch from main)

**Branch lifecycle:**
- ✅ **Auto-deletion enabled**: Feature branches are automatically deleted after PR merge
- Keep repository clean: Only `main`, `develop`, and 1-2 active feature branches
- Local cleanup: `git fetch --prune` to remove stale remote references

**Merge strategy (CRITICAL):**
- ❌ **NEVER use "Squash and merge" for develop → main**
- ✅ **ALWAYS use "Create a merge commit" for develop → main**
- ✅ Feature branches → develop: "Squash and merge" is OK (keeps develop cleaner)
- **Why**: Squashing develop → main breaks git history sync and causes divergence
- **Result**: main and develop must share the same commit history to remain maintainable

**Why this is critical:**
Direct pushes skip PR checks (ESLint, CodeQL, DeepSource, build validation), code review, and CI/CD gates. Squashing develop → main creates divergent histories that become impossible to maintain.

**See `docs/BRANCH-STRATEGY.md` for complete workflow details.**

---

## Frontend Development

### When Writing Content

**Content writing principles for service pages, marketing copy, and user-facing text:**

- ✅ **Be concise & authentic** - Get to the point quickly, avoid marketing fluff and over-promising
- ✅ **Avoid specific commitments** - Don't promise exact timeframes, response times, or guarantees you can't control
  - ❌ Bad: "Response times under 1 hour guaranteed"
  - ✅ Good: "Responsive communication during business hours"
  - ❌ Bad: "We'll complete your project in 2 weeks"
  - ✅ Good: "Timeline varies based on project scope"
- ✅ **Make text actionable or meaningful** - Every sentence should provide value or drive action
  - Remove filler phrases like "industry-leading", "cutting-edge", "world-class"
  - Focus on what the user gets, not vague superlatives
- ✅ **Value-first messaging** - Lead with benefits and outcomes, not features
  - ❌ Bad: "We use the latest technologies and frameworks"
  - ✅ Good: "Build scalable solutions that grow with your business"
- ✅ **Professional but straightforward tone** - Clear and direct, not corporate or overly casual
  - Avoid buzzwords and jargon unless necessary for clarity
  - Use active voice and simple sentence structure
  - Be helpful, not salesy
- ✅ **Specificity over generalization** - When you can be specific, be specific; when you can't, stay general
  - ✅ Good: "Integrate with Salesforce, HubSpot, and custom CRMs"
  - ❌ Bad: "Integrate with all major platforms"
  - ✅ Good: "Timeline depends on integration complexity and requirements"
  - ❌ Bad: "Fast turnaround on all projects"
- ✅ **Problem-focused messaging** - Speak to user pain points and business problems, not technical solutions
  - Focus on what users struggle with (order fulfillment, inventory management) not implementation details (distributed routing, automated sync mechanisms)
  - Use business language over technical jargon in hero sections and CTAs
  - ❌ Bad: "Get distributed order routing, automated inventory sync, and product data management"
  - ✅ Good: "Automate your order fulfillment, inventory management, and product catalog"
- ✅ **Remove redundant qualifiers** - Cut words that don't add meaning
  - Avoid redundant adjectives: "custom-built integrations designed for" → "built for"
  - Remove implied context: "Technical solutions" → "Solutions" (when technical is obvious)
  - Watch for vague adverbs: "efficiently", "seamlessly", "quickly" (unless specific)
  - ❌ Bad: "Custom-built technical solutions that efficiently scale"
  - ✅ Good: "Solutions that scale with your business"
- ✅ **Avoid absolutes and superlatives** - Don't make claims you can't always deliver
  - Replace absolutes with relative terms: "fastest" → "optimized", "shortest" → "efficient", "best" → "effective"
  - Avoid: "always", "never", "guaranteed", "every time", "100%"
  - ❌ Bad: "Shortest delivery time" or "Always available"
  - ✅ Good: "Optimized delivery time" or "Available during business hours"
- ✅ **Professional language only** - Avoid informal/casual phrases in business context
  - Remove casual phrases: "headaches", "hassle-free", "no sweat", "pain-free"
  - Keep tone professional even when being approachable
  - ❌ Bad: "Scale Without Headaches" or "Hassle-free integration"
  - ✅ Good: "Scale Operations" or "Streamlined integration"
- ✅ **Simple, clear word choices** - Prefer straightforward words over dramatic marketing language
  - Avoid dramatic words: "beyond", "revolutionary", "game-changing", "transform"
  - Use simple alternatives: "and more" instead of "and beyond"
  - ❌ Bad: "Revolutionary solutions that go beyond expectations"
  - ✅ Good: "Proven solutions that meet your business needs"
- ✅ **Avoid outcome promises** - Don't guarantee results dependent on external factors
  - Be careful with conversion, results, and ROI language that sets expectations
  - Focus on what you control (process, optimization) not outcomes (conversions, sales)
  - ❌ Bad: "Conversion-Focused Websites" or "Guaranteed to drive sales"
  - ✅ Good: "User-Focused Design" or "Optimized for user experience"
  - ❌ Bad: "Website that drives results"
  - ✅ Good: "Website that supports your business goals"
- ✅ **Avoid absolute descriptors** - Don't use "complete", "perfect", "total", "full", "comprehensive" as qualifiers
  - These set unrealistic expectations, especially in complex scenarios
  - Use "thorough", "detailed", or omit the qualifier entirely
  - ❌ Bad: "Complete SEO preservation" or "Comprehensive documentation"
  - ✅ Good: "SEO preservation" or "Documentation included"
- ✅ **Avoid absolute quantifiers** - Don't use "all", "every", "any", "exactly" unless truly accurate
  - These words set absolute expectations that may not always be met
  - Use specific lists or remove the quantifier
  - ❌ Bad: "Works on all devices" or "Sync across all platforms" or "Every feature you need"
  - ✅ Good: "Works on mobile, tablet, and desktop" or "Sync across platforms" or "Key features for your business"
- ✅ **Avoid technical promises** - Don't promise specific technical performance you can't guarantee
  - Replace technical commitments with accurate descriptions of capability
  - Watch for: "real-time", "instant", "immediate", "zero downtime", "100% uptime"
  - ❌ Bad: "Real-time inventory sync" or "Instant updates" or "Zero downtime guaranteed"
  - ✅ Good: "Automated inventory sync" or "Regular automated updates" or "Minimal downtime migration"
- ✅ **Avoid casual imperatives** - Don't start with informal commands
  - Remove phrases like "Stop settling", "Stop guessing", "Don't wait", "Stop juggling"
  - Start directly with value proposition instead
  - ❌ Bad: "Stop settling for cookie-cutter templates" or "Stop copying data between systems"
  - ✅ Good: "Professional, custom design tailored to your brand" or "Automate data flows between systems"

**Content review checklist:**

- [ ] No unrealistic promises or specific commitments (response times, deadlines, guarantees)
- [ ] Every sentence provides value or drives action
- [ ] No marketing fluff or empty superlatives
- [ ] Professional tone without being corporate or stiff
- [ ] Value-first: benefits before features
- [ ] Specific where possible, appropriately general where needed
- [ ] Problem-focused messaging (pain points, not technical solutions)
- [ ] No redundant qualifiers or vague adverbs ("seamlessly", "efficiently", "beautifully")
- [ ] No absolutes or superlatives ("fastest", "always", "best", "perfect")
- [ ] Professional language only (no "headaches", "hassle-free")
- [ ] Simple, clear words (no "beyond", "revolutionary", "game-changing", "transform")
- [ ] No outcome promises (avoid "conversion-focused", "drives results", "guaranteed ROI", "maximized sales")
- [ ] No absolute descriptors (avoid "complete", "perfect", "total", "full", "comprehensive")
- [ ] No absolute quantifiers (avoid "all", "every", "any", "exactly" unless truly accurate)
- [ ] No technical promises (avoid "real-time", "instant", "immediate", "zero downtime", "100% uptime")
- [ ] No casual imperatives (avoid "Stop...", "Don't wait", specific examples: "Stop settling", "Stop guessing", "Stop juggling", "Stop copying")

**Why this matters**: Authentic, actionable content builds trust. Over-promising damages credibility and creates unrealistic expectations.

---

### When Writing Vue Code

**Vue 3 development standards (packages/web/):**

- ✅ **Use Composition API** (not Options API)
- ✅ **Use `<script setup lang="ts">` syntax** for all components
- ✅ **Import types** from `packages/web/src/types/` (organized: shared/ subfolder + flat domain types)
- ✅ **Follow existing component patterns** for props, emits, and composables
- ✅ **Support dual color scheme** via props (`colorScheme` or `color`)
- ✅ **Use TypeScript interfaces** for all props (no implicit types)
- ✅ **Leverage Vue 3 features**: `defineProps`, `defineEmits`, `withDefaults`

**TypeScript Quality Standards** ⚠️ **MANDATORY**:

- 🔴 **NEVER use `any` type** - Always provide specific types (CRITICAL severity)
  - Replace `any` with proper interfaces, types, or `unknown` for truly dynamic data
  - Use generics for reusable typed functions
  - Example: `Record<string, unknown>` instead of `any` for objects

- 🔴 **NEVER use non-null assertions (`!`)** - Use proper null checking (MAJOR severity)
  - Replace `value!` with proper validation: `if (!value) throw new Error(...)`
  - Use optional chaining: `value?.property` instead of `value!.property`
  - For environment variables, validate at startup and throw clear errors

- ✅ **Provide default values for optional Vue props** - Improves component reliability
  - Use `withDefaults()` for props with defaults
  - Example: `withDefaults(defineProps<Props>(), { optional: 'default' })`

- ✅ **Remove unused imports** - Keep code clean
  - Exception: Vue types used implicitly by Composition API are acceptable

- ✅ **Use modern JavaScript syntax**:
  - Optional chaining: `obj?.property` instead of `obj && obj.property`
  - Nullish coalescing: `value ?? 'default'` instead of `value || 'default'`
  - Object shorthand: `{ foo }` instead of `{ foo: foo }`
  - Template literals only when using interpolation

**References**:

- `docs/frontend/COMPONENT-RULES.md` - Component structure and patterns
- `docs/frontend/DESIGN-SYSTEM.md` - Color schemes, design tokens, and responsive patterns
- `docs/CODE-SCANNING-STRATEGY.md` - Code quality analysis and standards

---

### When Creating/Modifying Components

**⚠️ MANDATORY: The 2-3 Pattern Rule**

**If you create the same UI pattern 2-3+ times, you MUST extract it into a reusable component.**

**Component creation workflow (packages/web/):**

1. **Check existing components first**: Browse `/src/components/` directory structure
2. **Apply the pattern rule**:
   - See duplicated pattern? → Create a component
   - Writing similar code 2-3 times? → Stop and componentize it
   - Copying/pasting UI elements? → Extract to a component first
3. **Organize correctly**: Place in appropriate folder under `packages/web/src/components/`
   - `elements/` - Basic UI building blocks (buttons, badges, utilities)
   - `cards/` - Card-based components
   - `ui/` - Complex UI components (panels, sections, navigation)
   - `display/` - Data display components (timelines, charts)
   - `layout/` - Global layout components (Navigation, Footer)
   - `integration/` - Integration-specific visualizations
4. **Support dual theming**: Add `colorScheme` or `color` prop
   - `cyan` for services/business pages
   - `emerald` for tech/experience pages

**References**:

- `docs/frontend/COMPONENT-RULES.md` ⚠️ **MANDATORY READ** - Complete component creation process

**This rule applies to all developers and AI assistants. No exceptions.**

---

### When Styling Components

**Design system compliance (packages/web/):**

- ✅ **Use Tailwind CSS utility classes** (no custom CSS unless absolutely necessary)
- ✅ **Follow color scheme strategy**:
  - Services/Business pages: `cyan-400`, `cyan-500`, `purple-400`, `purple-500`
  - Tech/Experience pages: `emerald-400`, `emerald-500`
- ✅ **Use responsive font scale**:
  - Headers: `text-3xl md:text-4xl`, `text-lg md:text-xl`
  - Body: `text-xs md:text-sm lg:text-base`
- ✅ **Follow spacing scale**: 4, 6, 8, 12, 16, 24, 32, 48 (Tailwind spacing units)
- ✅ **Use gradient patterns from design system**:
  - Primary: `from-cyan-400 via-cyan-300 to-purple-400`
  - Background: `from-cyan-500/10 via-purple-500/10 to-cyan-500/10`
  - Button: `from-cyan-500 to-purple-500`
- ✅ **Background colors**: `bg-[#0a0a0a]` (primary), `bg-[#0f0f0f]` (cards), `bg-[#1a1a1a]` (elevated)

**References**:

- `docs/frontend/DESIGN-SYSTEM.md` - Complete color palette, typography, spacing, gradients, and responsive design

---

### When Handling Responsive Design

**Mobile-first breakpoint strategy (packages/web/):**

- ✅ **Base styles target 320px** (mobile-first)
- ✅ **Breakpoints**:
  - `md:` = 768px (tablet)
  - `lg:` = 1024px (desktop)
  - `xl:` = 1440px (large desktop)
- ✅ **Test all breakpoints** when changing layouts
- ✅ **Use responsive components**:
  - `PanelContent` / `PanelSidebar` for mobile/desktop panel layouts
  - `ServiceSection` with responsive variants
- ✅ **Progressive enhancement**: Start mobile, layer up complexity

**References**:

- `docs/frontend/DESIGN-SYSTEM.md` - Complete responsive design strategy, typography, and spacing scales

---

### When Working with Data

**Data structure and content rules (packages/web/):**

- ✅ **Service data**: TypeScript files in `packages/web/src/data/services/*.ts`
  - Follow `ServicePageData` type from `packages/web/src/types/servicePage.ts`
- ✅ **Tech data**: JSON file `packages/web/src/data/tech.json`
  - Follow `TechContent` type from `packages/web/src/types/tech.ts`
- ✅ **Use constants from `packages/web/src/constants/index.ts`**:
  - Never hardcode: URLs, contact info, site config, scheduling links
  - Import: `SCHEDULING_LINK`, `CONTACT`, `SITE`
- ✅ **File naming**: kebab-case for data files (e.g., `ai-enablement.ts`)

**References**:

- `docs/frontend/DATA-STRUCTURE.md` - Complete type schemas and data organization
- `packages/web/src/constants/index.ts` - Application-wide constants

---

### When Adding Images

**Image attribution workflow (packages/web/):**

1. **Place image**: Add to appropriate `packages/web/public/` subdirectory
2. **Check attribution requirement**: If from Unsplash or third-party, attribution is MANDATORY
3. **Update AttributionsView**: Add new `AttributionCard` to `packages/web/src/views/AttributionsView.vue`
   - Include: service/page name, image preview, description, photographer name + Unsplash link
4. **Follow existing pattern**: Use grid layout with consistent card structure

**Why this matters**: Legal compliance and proper credit to photographers.

---

### When Creating Service Pages

**Service detail page workflow (packages/web/):**

1. **Create data file**: `packages/web/src/data/services/{service-name}.ts`
   - Export `ServicePageData` object
   - Follow type schema from `packages/web/src/types/servicePage.ts`
2. **Create view component**: `packages/web/src/views/services/{ServiceName}ServiceView.vue`
   - Use `ServiceSection` component with `variant` prop (hero/benefits/process/portfolio/testimonials)
   - Add `BreadcrumbNav` for navigation
   - Support mobile/desktop responsive layouts
3. **Add route**: Update `packages/web/src/router/index.ts` with new route
   - Path: `/services/{service-name}`
   - Component: lazy-loaded view
4. **Update service config**: Add to service list if needed

**References**:

- `docs/frontend/DATA-STRUCTURE.md` - Service data type schemas
- `docs/frontend/COMPONENT-RULES.md` - Component creation patterns

---

## Backend Development (API/Lambda Functions)

### When Writing Lambda Functions

**Lambda function development standards (packages/functions/):**

- ✅ TypeScript with full type safety
- ✅ Import shared types from `@idevelop-tech/core`
- ✅ Use `APIGatewayProxyHandlerV2` type for HTTP handlers
- ✅ Return structured responses with CORS headers
- ✅ Implement error handling and validation
- ✅ Use AWS SDK v3 (modular imports)

**Including non-code assets (HTML templates, etc.):**

SST v3 requires specific configuration to include non-JS/TS files in Lambda packages:

- ✅ **Use `copyFiles` in sst.config.ts** - NOT esbuild loaders
- ✅ **List files individually** - Glob patterns (`*.html`) are NOT supported
- ✅ **Read from `process.cwd()`** - Copied files are in Lambda root directory

**Example configuration:**
```typescript
// sst.config.ts
const handler = new sst.aws.Function("Handler", {
  handler: "packages/functions/src/myfunction.handler",
  copyFiles: [
    {
      from: "packages/functions/src/templates/template1.html",
      to: "templates/template1.html",
    },
    {
      from: "packages/functions/src/templates/template2.html",
      to: "templates/template2.html",
    },
  ],
});

// myfunction.ts
import { readFileSync } from "fs";
import { join } from "path";

const template = readFileSync(
  join(process.cwd(), "templates", "template1.html"),
  "utf-8"
);
```

**What NOT to do:**
- ❌ `bundle: { loader: { ".html": "text" } }` - Bundle expects string, not object
- ❌ `nodejs.esbuild: { loader: { ".html": "text" } }` - Loader not supported here
- ❌ `copyFiles: [{ from: "path/*.html" }]` - Glob patterns don't work

**References**:

- `packages/core/src/types.ts` - Shared request/response types
- `packages/functions/src/contact.ts` - Contact form implementation example
- `packages/functions/src/email-templates/` - HTML email template examples
- `docs/SESSION-2025-11-13-LAMBDA-LIGHTHOUSE.md` - Lambda template bundling journey

---

### When Implementing API Endpoints

**API endpoint patterns (packages/functions/):**

**Implemented endpoints:**

- Contact form: `POST /contact`
  - reCAPTCHA verification
  - SES email sending
  - DynamoDB rate limiting
  - Structured error responses

**Reference**: `packages/functions/src/contact.ts`

---

## Infrastructure Development

### When Working with SST Config

**SST configuration patterns (root sst.config.ts):**

_To be documented in Phase 3 when adding infrastructure_

**Planned components:**

- S3 + CloudFront for static hosting
- API Gateway + Lambda for backend
- DynamoDB for rate limiting
- SES for email sending
- Route 53 DNS configuration
- Environment variable management

**References**:

- `README.md` - SST project structure and commands
- `docs/DEPLOYMENT-PLAN.md` - Infrastructure deployment strategy

---

### When Adding Infrastructure Resources

**Infrastructure as code patterns (infra/):**

_To be documented in Phase 3 when creating infrastructure modules_

**Planned organization:**

- `infra/web.ts` - Frontend hosting (S3, CloudFront, DNS)
- `infra/api.ts` - Backend resources (API Gateway, Lambda)
- `infra/database.ts` - Data layer (DynamoDB)
- `infra/email.ts` - Email service (SES)

---

## Shared Code (packages/core/)

### When Defining Shared Types

**Shared type organization (packages/core/src/):**

- ✅ **Export from index.ts**: All public types must be exported
- ✅ **Organize by domain**: Group related types together
- ✅ **Use TypeScript interfaces**: Prefer interfaces over types for object shapes
- ✅ **Document complex types**: Add JSDoc comments for non-obvious types

**Current shared types:**

```typescript
// Contact form types
export interface ContactFormRequest {
  name: string;
  email: string;
  service: string;
  message?: string;
  recaptchaToken: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  requestId?: string;
}
```

**Adding new shared types:**

1. Define in appropriate file under `packages/core/src/`
2. Export from `packages/core/src/index.ts`
3. Import in consuming packages: `import type { TypeName } from '@idevelop-tech/core'`

---

## Version Control & Deployment

**🔴 See "MANDATORY RULES" section above for critical git workflow requirements.**

### Commit Guidelines

- NEVER commit without user explicitly requesting
- Review before committing: `git status` and `git diff`
- Use HEREDOC for commit messages with Claude Code co-author attribution
- NEVER use `--no-verify` or skip hooks
- NEVER force push to main/master
- NEVER amend commits from other developers

### PR Creation

Use `gh pr create --base develop` with summary and test plan. Always specify `--base develop`.

**See `docs/BRANCH-STRATEGY.md` for complete git and deployment workflows.**

---

## Project Architecture

**SST v3 full-stack serverless monorepo:**

- **packages/web/** - Vue 3 (Composition API) + TypeScript + Tailwind CSS
- **packages/functions/** - AWS Lambda functions (contact form API)
- **packages/core/** - Shared TypeScript types
- **sst.config.ts** - Infrastructure as Code

**Color Schemes:**
- Services/Business: Cyan/Purple (`cyan-400`, `purple-400`)
- Tech/Experience: Emerald (`emerald-400`)
- Components support `colorScheme` prop for dual theming

**See `docs/ARCHITECTURE.md` for complete architecture details, file structure, and technology decisions.**

---

## Development Environment

### Development Commands

**Root commands (from `~/source/idevelop.tech/`):**

```bash
npm install          # Install all workspace dependencies
npm run dev          # Start SST dev mode (Phase 3)
npm run build        # Build all packages
npm run deploy       # Deploy to AWS (Phase 3)
npm run remove       # Remove from AWS (Phase 3)
```

**Frontend commands (from `packages/web/`):**

```bash
npm run dev          # Start Vite dev server at http://localhost:5173
npm run build        # Build for production (includes type checking)
npm run preview      # Preview production build locally
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
```

### Environment Management

**Development server rules:**

- ✅ Only ONE `npm run dev` server should run at a time
- ✅ Check for running servers: `ps aux | grep "npm run dev" | grep -v grep`
- ✅ Kill extras with `KillShell` tool (use shell IDs from system reminders)
- ✅ Check at start of each session for background processes

**Why this matters**: Multiple servers waste resources and cause port conflicts.

---

## Application Constants

Application-wide constants are centralized in `packages/web/src/constants/index.ts` following Vue best practices.

**Available constants:**

```typescript
import { SCHEDULING_LINK, CONTACT, SITE } from "@/constants";

// Scheduling and contact links
SCHEDULING_LINK; // Google Calendar appointment link

// Contact information
CONTACT.email; // matt@idevelop.tech
CONTACT.location; // Florida, USA
CONTACT.linkedin; // https://www.linkedin.com/in/matt-lucian/
CONTACT.github; // https://github.com/mattlucian

// Site configuration
SITE.name; // idevelop.tech
SITE.url; // https://idevelop.tech
SITE.companyName; // I Develop Tech LLC
SITE.repository; // https://github.com/mattlucian/idevelop.tech
SITE.ogImage; // https://idevelop.tech/images/brand/og-image.png
```

**When to use constants:**

- External URLs used in multiple places (scheduling links, social media, etc.)
- Configuration values that might change across environments
- Repeated literal values that should be centralized

**Benefits:**

- Single source of truth for shared values
- Easy to update links/values across entire application
- Type-safe with TypeScript
- Better maintainability and consistency

---

## File Naming Conventions

- **Data files**: Lowercase with hyphens (kebab-case)
  - Services: `packages/web/src/data/services/{service-name}.ts`
  - Tech: `packages/web/src/data/tech.json` (all domains in one file)
  - Config: `packages/web/src/data/services.json`
- **Components**: PascalCase (e.g., `TypewriterText.vue`, `ServiceCard.vue`, `PrimaryButton.vue`)
- **Views**: PascalCase with "View" suffix (e.g., `HomeView.vue`, `TechView.vue`, `IntegrationServiceView.vue`)
  - Service views are in `packages/web/src/views/services/` subdirectory
- **Lambda functions**: kebab-case (e.g., `contact.ts`)
- **Constants**: Located in `packages/web/src/constants/index.ts`

---

## Project Overview

This is a portfolio website and full-stack application for idevelop.tech:

- **Frontend**: Service showcase and technical expertise portfolio
- **Backend**: Contact form API with reCAPTCHA, email, and rate limiting
- **Infrastructure**: AWS-hosted with SST for deployment

**Goal**: Modern, type-safe, full-stack portfolio with professional DevOps practices.

**Reference**: `docs/ARCHITECTURE.md` for complete full-stack architecture and technical decisions.
