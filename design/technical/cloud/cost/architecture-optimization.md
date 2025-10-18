# Architecture Optimization (Level 3)

## Page Header

### Breadcrumb
Home > Cloud Engineering > Cost Optimization > Architecture Optimization

### Page Title
Architecture Optimization

### Subtitle
Cost-efficient architectural decisions

---

## Key Concepts

### Concept 1: Serverless vs Container Trade-offs
**Icon:** ⚖️  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Lambda cost model
- ECS/Fargate pricing
- Workload characteristics
- Break-even analysis

**Link:** /cloud-engineering/cost-optimization/architecture/serverless-vs-containers

### Concept 2: Storage Tiering
**Icon:** 📦  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- S3 storage classes
- Lifecycle policies
- Access pattern analysis
- Retrieval costs

**Link:** /cloud-engineering/cost-optimization/architecture/storage-tiering

### Concept 3: Data Transfer Optimization
**Icon:** 🌐  
**Experience Level:** Advanced • 5+ years  
**Key Points:**
- Inter-region costs
- VPC endpoints
- CloudFront usage
- Data compression

**Link:** /cloud-engineering/cost-optimization/architecture/data-transfer

### Concept 4: Service Selection
**Icon:** 🎯  
**Experience Level:** Expert • 7+ years  
**Key Points:**
- Managed vs self-managed
- Feature requirements
- Operational overhead
- Total cost of ownership

**Link:** /cloud-engineering/cost-optimization/architecture/service-selection

---

## Context Section

### Title
Architectural Cost Optimization

### Content
Redesigned batch processing to use Spot instances saving 70% on compute costs. Implemented S3 lifecycle policies moving infrequently accessed data to cheaper storage classes. Used VPC endpoints eliminating NAT gateway costs for S3/DynamoDB traffic. Selected managed services (RDS, ElastiCache) over self-managed reducing operational burden and total cost.
