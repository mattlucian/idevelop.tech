# Cache Invalidation (Level 3)

## Page Header

### Breadcrumb
Home > Platform Engineering > Caching Strategies > Cache Invalidation

### Page Title
Cache Invalidation

### Subtitle
Strategies for maintaining cache consistency

---

## Key Concepts

### Concept 1: TTL-based Expiration
**Icon:** ⏰  
**Experience Level:** Expert • 6+ years  
**Key Points:**
- Time-to-live configuration
- Sliding vs absolute expiration
- TTL strategy per data type
- Balance freshness vs load

**Link:** /platform-engineering/caching/invalidation/ttl

### Concept 2: Event-driven Invalidation
**Icon:** 🔔  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Change notifications
- Pub/sub patterns
- Selective invalidation
- Eventual consistency

**Link:** /platform-engineering/caching/invalidation/event-driven

### Concept 3: Cache Warming
**Icon:** 🔥  
**Experience Level:** Advanced • 4+ years  
**Key Points:**
- Proactive population
- Deployment strategies
- Critical path optimization
- Monitoring effectiveness

**Link:** /platform-engineering/caching/invalidation/warming

### Concept 4: Stale-While-Revalidate
**Icon:** ♻️  
**Experience Level:** Intermediate • 3+ years  
**Key Points:**
- Serve stale data
- Background refresh
- User experience optimization
- Consistency trade-offs

**Link:** /platform-engineering/caching/invalidation/stale-while-revalidate

---

## Context Section

### Title
Invalidation Strategy

### Content
Implemented tiered TTL strategy with 5-minute TTLs for frequently changing data and 1-hour TTLs for stable reference data. Used Kafka events to trigger targeted cache invalidation on data updates avoiding full cache flushes. Implemented cache warming on deployment preloading top 1000 products. Stale-while-revalidate for non-critical data maintaining responsiveness during background updates.
