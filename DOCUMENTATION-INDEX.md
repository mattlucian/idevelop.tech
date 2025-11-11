# Documentation Index

**Quick navigation guide for all documentation in the SST monorepo**

---

## 🚀 Getting Started

Start here if you're new to the project or continuing after a break:

| Document | Purpose | Location |
|----------|---------|----------|
| **README.md** | Project overview, tech stack, quick start guide | `./README.md` |
| **PROJECT-PLAN.md** | Complete project roadmap and phase breakdown | `docs/PROJECT-PLAN.md` |
| **NEXT-SESSION-START.md** | Quick start guide for next development session | `docs/NEXT-SESSION-START.md` |
| **CLAUDE.md** | AI development guidelines (frontend, API, infra) | `./CLAUDE.md` ⚠️ |

---

## 📱 Frontend Development (packages/web/)

Documentation for Vue 3 application development:

### Core Frontend Docs

| Document | Purpose | Location |
|----------|---------|----------|
| **COMPONENT-RULES.md** | Component creation patterns (MANDATORY) | `packages/web/docs/` ⚠️ |
| **COMPONENTS.md** | Catalog of all Vue components | `packages/web/docs/` |
| **DESIGN-SYSTEM.md** | Colors, typography, spacing, responsive design | `packages/web/docs/` |
| **ARCHITECTURE.md** | Frontend architecture and technical decisions | `packages/web/docs/` |
| **DATA-STRUCTURE.md** | Type schemas for services and tech data | `packages/web/docs/` |
| **CONFIGURATION.md** | Frontend configuration (Vite, TypeScript, etc.) | `packages/web/docs/` |
| **IMPLEMENTATION-STATUS.md** | Current implementation status and progress | `packages/web/docs/` |
| **SEO.md** | SEO implementation and best practices | `packages/web/docs/` |
| **README.md** | Frontend package overview | `packages/web/docs/` |

### Quick Reference

**When you need to...**

- **Create a component** → Read `COMPONENT-RULES.md` ⚠️ MANDATORY
- **Find a component** → Check `COMPONENTS.md`
- **Style something** → Reference `DESIGN-SYSTEM.md`
- **Add service data** → Follow `DATA-STRUCTURE.md`
- **Understand architecture** → Read `ARCHITECTURE.md`

---

## ⚙️ Backend Development (packages/functions/)

Documentation for API and Lambda functions:

| Document | Purpose | Location |
|----------|---------|----------|
| **CTA-FORM-IMPLEMENTATION-PLAN.md** | Contact form API implementation plan | `docs/` |
| **PHASE-5-SETUP-INSTRUCTIONS.md** | Backend API setup guide and deployment results | `docs/` |
| **SES-EMAIL-DELIVERABILITY.md** | Email authentication (DKIM, SPF, DMARC) setup | `docs/` |

---

## 🏗️ Infrastructure & Deployment

Documentation for SST infrastructure and AWS deployment:

| Document | Purpose | Location |
|----------|---------|----------|
| **AWS-SETUP.md** | AWS SSO configuration and OIDC setup | `docs/` |
| **DEVELOPMENT-WORKFLOW.md** | Development and deployment workflow guide | `docs/` |

---

## 📦 Shared Code (packages/core/)

Documentation for shared types and utilities:

**Current**: Shared types are documented inline in `packages/core/src/types.ts`

**Future**: Will add dedicated documentation in Phase 3 when expanding shared code.

---

## 🔍 Documentation Organization

### Directory Structure

```
idevelop.tech/
├── CLAUDE.md                    # AI development guidelines (ALL layers)
├── README.md                    # Project overview, tech stack, quick start
├── DOCUMENTATION-INDEX.md       # This file
│
├── docs/                        # Root-level docs (full-stack)
│   ├── PROJECT-PLAN.md          # Complete project roadmap
│   ├── NEXT-SESSION-START.md    # Session quick start guide
│   ├── AWS-SETUP.md             # AWS SSO and OIDC setup
│   ├── DEVELOPMENT-WORKFLOW.md  # Development workflow guide
│   ├── CTA-FORM-IMPLEMENTATION-PLAN.md  # Contact form API plan
│   ├── PHASE-5-SETUP-INSTRUCTIONS.md    # Backend API setup
│   └── SES-EMAIL-DELIVERABILITY.md      # Email authentication
│
└── packages/
    └── web/
        └── docs/                # Frontend-specific docs
            ├── ARCHITECTURE.md
            ├── COMPONENT-RULES.md
            ├── COMPONENTS.md
            ├── CONFIGURATION.md
            ├── DATA-STRUCTURE.md
            ├── DESIGN-SYSTEM.md
            ├── IMPLEMENTATION-STATUS.md
            ├── SEO.md
            └── README.md
```

### Documentation Categories

**🔴 MANDATORY Reading**

These docs contain critical rules that MUST be followed:

- `CLAUDE.md` - Development guidelines for ALL code
- `packages/web/docs/COMPONENT-RULES.md` - Component creation patterns

**📋 Reference Docs**

Check these when you need specific information:

- `packages/web/docs/COMPONENTS.md` - Component catalog
- `packages/web/docs/DESIGN-SYSTEM.md` - Styling and design tokens
- `packages/web/docs/DATA-STRUCTURE.md` - Type schemas

**📚 Architectural Docs**

Read these to understand system design:

- `packages/web/docs/ARCHITECTURE.md` - Frontend architecture
- `docs/DEPLOYMENT-PLAN.md` - Infrastructure architecture

**🚀 Getting Started Docs**

Read these when starting or resuming work:

- `README.md` - Project overview
- `docs/PROJECT-PLAN.md` - Complete roadmap
- `docs/NEXT-SESSION-START.md` - Session quick start

---

## 📝 Documentation Principles

All documentation in this project follows these principles:

- **Concise** - Get to the point quickly
- **Actionable** - Focus on "how to" not "what exists"
- **Timeless** - No version history or changelogs (git handles that)
- **Visual** - Use 🔴 icons for critical rules
- **Organized** - Frontend docs in `packages/web/docs/`, full-stack in root `docs/`

---

## 🎯 Documentation by Task

### I want to add a new feature

1. Read `CLAUDE.md` - Development guidelines
2. Check `packages/web/docs/ARCHITECTURE.md` - Understand current structure
3. Follow `packages/web/docs/COMPONENT-RULES.md` - Create components correctly
4. Reference `packages/web/docs/DESIGN-SYSTEM.md` - Style consistently
5. Update `packages/web/docs/COMPONENTS.md` - Document new components

### I want to fix a bug

1. Check `CLAUDE.md` - Critical development rules
2. Review `packages/web/docs/ARCHITECTURE.md` - Understand code organization
3. Check `packages/web/docs/COMPONENTS.md` - Find affected components
4. Test across breakpoints per `packages/web/docs/DESIGN-SYSTEM.md`

### I want to add content (service/tech)

1. Follow `packages/web/docs/DATA-STRUCTURE.md` - Type schemas
2. Apply content rules from `CLAUDE.md` - Writing standards
3. Create service page per `CLAUDE.md` workflow

### I want to deploy

1. Review `docs/AWS-SETUP.md` - AWS SSO configuration
2. Follow `docs/DEVELOPMENT-WORKFLOW.md` - Deployment workflow
3. Check `docs/PROJECT-PLAN.md` - Current phase status

### I want to add API functionality

1. Read `docs/CTA-FORM-IMPLEMENTATION-PLAN.md` - Contact form example
2. Review `docs/PHASE-5-SETUP-INSTRUCTIONS.md` - Backend API setup
3. Follow `CLAUDE.md` backend guidelines
4. Use shared types from `packages/core/`

---

## 🔄 Documentation Maintenance

### When to Update Documentation

- **Component added** → Update `packages/web/docs/COMPONENTS.md`
- **Architecture changed** → Update `packages/web/docs/ARCHITECTURE.md`
- **Design pattern added** → Update `packages/web/docs/DESIGN-SYSTEM.md`
- **Type schema changed** → Update `packages/web/docs/DATA-STRUCTURE.md`
- **New workflow created** → Update `CLAUDE.md`
- **Infrastructure added** → Create new doc in `docs/` or `infra/docs/`

### What NOT to Document

- ❌ Component counts or file statistics (changes too often)
- ❌ Version histories (git handles this)
- ❌ Changelogs (git commit messages are the source of truth)
- ❌ Specific examples that add maintenance burden

### Documentation Standards

- Use Markdown for all documentation
- Keep files focused on single topics
- Use tables for quick reference
- Use code blocks for examples
- Use emoji icons sparingly (🔴 for critical only)

---

## 📞 Need Help?

**Can't find what you need?**

1. Check this index first
2. Search docs with: `grep -r "keyword" docs/ packages/web/docs/`
3. Check `CLAUDE.md` for development patterns
4. Review git history: `git log --all --grep="keyword"`

**Documentation missing or unclear?**

- Create new documentation following the principles above
- Update this index when adding new docs
- Keep docs concise and actionable

---

**Last Updated**: 2025-11-11 (Phase 6)
