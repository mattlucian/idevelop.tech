# Message Patterns (Level 3)

## Page Header

### Breadcrumb
Home > Platform Engineering > Event-Driven Architecture > Message Patterns

### Page Title
Message Patterns

### Subtitle
Event-driven communication patterns

---

## Key Concepts

### Concept 1: Publish-Subscribe
**Icon:** 📡  
**Experience Level:** Expert • 6+ years  
**Key Points:**
- Topic-based routing
- Multiple subscribers
- Decoupled producers/consumers
- Fan-out messaging

**Link:** /platform-engineering/event-driven/patterns/pub-sub

### Concept 2: Event Notification
**Icon:** 🔔  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Lightweight events
- State change notifications
- Asynchronous processing
- Eventual consistency

**Link:** /platform-engineering/event-driven/patterns/notification

### Concept 3: Event-Carried State Transfer
**Icon:** 📦  
**Experience Level:** Advanced • 4+ years  
**Key Points:**
- Self-contained events
- Data denormalization
- Reduced coupling
- Consistency trade-offs

**Link:** /platform-engineering/event-driven/patterns/state-transfer

### Concept 4: CQRS (Command Query Responsibility Segregation)
**Icon:** ⚡  
**Experience Level:** Advanced • 4+ years  
**Key Points:**
- Separate read/write models
- Event sourcing integration
- Scalability benefits
- Complexity considerations

**Link:** /platform-engineering/event-driven/patterns/cqrs

---

## Context Section

### Title
Pattern Implementation

### Content
Used publish-subscribe pattern for system-wide events like order placement and inventory updates. Implemented event-carried state transfer for high-throughput scenarios reducing database lookups. Applied CQRS for reporting workloads separating read-optimized views from transactional writes. Patterns enabled horizontal scaling and independent service evolution.
