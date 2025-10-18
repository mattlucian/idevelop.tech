# Dependency & Repository Management (Level 3)

## Page Header

### Breadcrumb
Home > DevOps > CI/CD & Build Systems > Dependency & Repository Management

### Page Title
Dependency & Repository Management

### Subtitle
Artifact storage and dependency resolution strategies

---

## Key Concepts

### Concept 1: Repository Strategies
**Icon:** 📦  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Centralized repositories
- Public vs private artifacts
- Repository proxying
- Versioning strategies

**Link:** /devops/cicd/dependencies/repository-strategies

### Concept 2: Artifactory (Legacy)
**Icon:** 🏛️  
**Experience Level:** Advanced • 4+ years  
**Key Points:**
- Universal artifact manager
- Build integration
- Virtual repositories
- Migration considerations

**Link:** /devops/cicd/dependencies/artifactory

### Concept 3: AWS S3 for Artifacts
**Icon:** 🪣  
**Experience Level:** Advanced • 3+ years  
**Key Points:**
- S3-backed repositories
- IAM integration
- Cost efficiency
- Lifecycle management

**Link:** /devops/cicd/dependencies/s3-artifacts

### Concept 4: Dependency Resolution
**Icon:** 🔗  
**Experience Level:** Expert • 6+ years  
**Key Points:**
- Dependency caching
- Version resolution
- Transitive dependencies
- Lock files

**Link:** /devops/cicd/dependencies/resolution

---

## Context Section

### Title
Repository Evolution

### Content
Initially used Artifactory as central repository manager for Maven, NPM, and Docker artifacts. Over time, migrated to S3-backed storage for simplified operations and better AWS integration. S3 approach provided native IAM access controls, reduced operational overhead, and eliminated additional licensing costs. Maintained compatibility with standard package managers through S3 static website hosting and CloudFront distribution. This migration reduced repository management costs by 80% while improving reliability through AWS's infrastructure.
