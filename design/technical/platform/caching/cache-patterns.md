# Cache Patterns (Level 3)

## Page Header

### Breadcrumb
Home > Platform Engineering > Caching Strategies > Cache Patterns

### Page Title
Cache Patterns

### Subtitle
Caching strategies and implementation patterns

---

## Key Concepts

### Concept 1: Cache-Aside (Lazy Loading)
**Icon:** 📖  
**Experience Level:** Expert • 6+ years  
**Key Points:**
- On-demand loading
- Application control
- Cache miss handling
- Stale data risk

**Link:** /platform-engineering/caching/patterns/cache-aside

### Concept 2: Write-Through
**Icon:** ✍️  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Synchronous writes
- Data consistency
- Write latency
- Use case fit

**Link:** /platform-engineering/caching/patterns/write-through

### Concept 3: Write-Behind
**Icon:** ⏰  
**Experience Level:** Advanced • 4+ years  
**Key Points:**
- Asynchronous writes
- Write coalescing
- Data loss risk
- Performance benefits

**Link:** /platform-engineering/caching/patterns/write-behind

### Concept 4: Refresh-Ahead
**Icon:** 🔄  
**Experience Level:** Intermediate • 3+ years  
**Key Points:**
- Proactive refresh
- TTL-based updates
- Predictive loading
- Cache warming

**Link:** /platform-engineering/caching/patterns/refresh-ahead

---

## Context Section

### Title
Pattern Selection

### Content
Primarily used cache-aside pattern for read-heavy workloads giving application full control over caching logic. Implemented write-through for critical data requiring strong consistency like inventory counts. Applied refresh-ahead for popular products preemptively refreshing before expiration. Pattern selection based on consistency requirements, read/write ratio, and acceptable staleness.
