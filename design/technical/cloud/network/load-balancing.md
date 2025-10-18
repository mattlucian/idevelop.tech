# Load Balancing (Level 3)

## Page Header

### Breadcrumb
Home > Cloud Engineering > Networking & Delivery > Load Balancing

### Page Title
Load Balancing

### Subtitle
Traffic distribution and high availability

---

## Key Concepts

### Concept 1: Application Load Balancers
**Icon:** ⚖️  
**Experience Level:** Expert • 7+ years  
**Key Points:**
- Layer 7 routing
- Path-based routing
- Host-based routing
- WebSocket support

**Link:** /cloud-engineering/networking/load-balancing/alb

### Concept 2: Target Groups
**Icon:** 🎯  
**Experience Level:** Expert • 7+ years  
**Key Points:**
- Target registration
- Health check configuration
- Deregistration delay
- Sticky sessions

**Link:** /cloud-engineering/networking/load-balancing/target-groups

### Concept 3: Health Checks
**Icon:** 💓  
**Experience Level:** Expert • 7+ years  
**Key Points:**
- Health check paths
- Interval & timeout
- Healthy/unhealthy thresholds
- Custom health endpoints

**Link:** /cloud-engineering/networking/load-balancing/health-checks

### Concept 4: SSL/TLS Termination
**Icon:** 🔐  
**Experience Level:** Advanced • 6+ years  
**Key Points:**
- Certificate management
- HTTPS listeners
- Security policies
- End-to-end encryption

**Link:** /cloud-engineering/networking/load-balancing/ssl

---

## Context Section

### Title
Load Balancer Implementation

### Content
Deployed Application Load Balancers for all public-facing services with path-based routing to multiple backend services. Configured sophisticated health checks ensuring only healthy targets receive traffic. Implemented SSL termination at load balancer level with ACM-managed certificates for simplified certificate rotation.
