# API Versioning (Level 3)

## Page Header

### Breadcrumb
Home > Platform Engineering > API Platform Design > API Versioning

### Page Title
API Versioning

### Subtitle
Managing API evolution and backward compatibility

---

## Key Concepts

### Concept 1: URI Versioning
**Icon:** 🔢  
**Experience Level:** Expert • 6+ years  
**Key Points:**
- Version in path (/v1/)
- Clear semantics
- Easy routing
- Client adoption

**Link:** /platform-engineering/api-platform/versioning/uri

### Concept 2: Header-based Versioning
**Icon:** 📋  
**Experience Level:** Advanced • 4+ years  
**Key Points:**
- Accept header
- Custom headers
- Content negotiation
- API evolution

**Link:** /platform-engineering/api-platform/versioning/header

### Concept 3: Deprecation Strategy
**Icon:** ⚠️  
**Experience Level:** Expert • 5+ years  
**Key Points:**
- Sunset headers
- Migration timelines
- Client communication
- Support windows

**Link:** /platform-engineering/api-platform/versioning/deprecation

### Concept 4: Backward Compatibility
**Icon:** ↔️  
**Experience Level:** Expert • 6+ years  
**Key Points:**
- Additive changes
- Optional fields
- Default values
- Breaking change avoidance

**Link:** /platform-engineering/api-platform/versioning/compatibility

---

## Context Section

### Title
Versioning Approach

### Content
Used URI versioning (/v1/, /v2/) for major versions with clear breaking changes. Maintained backward compatibility within major versions through additive-only changes. Implemented 6-month deprecation cycle with sunset headers and proactive client communication. Supported two major versions simultaneously enabling gradual client migration.
