# Secrets Management (Level 3)

## Page Header

### Breadcrumb
Home > Cloud Engineering > Security & Identity > Secrets Management

### Page Title
Secrets Management

### Subtitle
Secure credential and configuration storage

---

## Key Concepts

### Concept 1: AWS Secrets Manager
**Icon:** 🔑  
**Experience Level:** Advanced • 4+ years  
**Key Points:**
- Secret storage
- Automatic rotation
- Access policies
- Versioning

**Link:** /cloud-engineering/security/secrets/secrets-manager

### Concept 2: Parameter Store
**Icon:** ⚙️  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Configuration management
- Hierarchical parameters
- String vs SecureString
- Change notifications

**Link:** /cloud-engineering/security/secrets/parameter-store

### Concept 3: Encryption at Rest
**Icon:** 🔐  
**Experience Level:** Advanced • 6+ years  
**Key Points:**
- KMS integration
- Customer managed keys
- Encryption contexts
- Key rotation

**Link:** /cloud-engineering/security/secrets/encryption

### Concept 4: Rotation Policies
**Icon:** 🔄  
**Experience Level:** Intermediate • 3+ years  
**Key Points:**
- Automated rotation
- Lambda rotation functions
- Application updates
- Zero-downtime rotation

**Link:** /cloud-engineering/security/secrets/rotation

---

## Context Section

### Title
Secrets Management Implementation

### Content
Migrated all application secrets from environment variables to AWS Secrets Manager with automatic rotation enabled. Used Parameter Store for non-sensitive configuration with hierarchical organization. Implemented KMS encryption for all sensitive data at rest. Achieved audit requirement of 90-day maximum secret age through automated rotation.
