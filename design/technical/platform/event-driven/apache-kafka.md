# Apache Kafka (Level 3)

## Page Header

### Breadcrumb
Home > Platform Engineering > Event-Driven Architecture > Apache Kafka

### Page Title
Apache Kafka

### Subtitle
Distributed streaming platform

---

## Key Concepts

### Concept 1: Topics & Partitions
**Icon:** 📊  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Topic design
- Partition strategy
- Replication factor
- Retention policies

**Link:** /platform-engineering/event-driven/kafka/topics

### Concept 2: Producers & Consumers
**Icon:** 🔄  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Producer API
- Consumer groups
- Offset management
- Exactly-once semantics

**Link:** /platform-engineering/event-driven/kafka/producers-consumers

### Concept 3: Kafka Connect
**Icon:** 🔌  
**Experience Level:** Intermediate • 3+ years  
**Key Points:**
- Source connectors
- Sink connectors
- Change data capture
- Connector configuration

**Link:** /platform-engineering/event-driven/kafka/connect

### Concept 4: Stream Processing
**Icon:** 🌊  
**Experience Level:** Intermediate • 3+ years  
**Key Points:**
- Kafka Streams
- Stateful processing
- Windowing operations
- Stream joins

**Link:** /platform-engineering/event-driven/kafka/streams

---

## Context Section

### Title
Kafka Implementation

### Content
Revamped data pipelines into event-driven architecture using Kafka for distributed processing. Implemented topic-per-aggregate pattern with 10-50 partitions based on throughput needs. Used Kafka Connect for CDC from PostgreSQL enabling real-time data synchronization. Processed millions of events daily with consumer groups ensuring parallel processing and fault tolerance.
