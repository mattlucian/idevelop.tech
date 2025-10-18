# VPC Architecture (Level 3)

## Page Header

### Breadcrumb
Home > Cloud Engineering > Networking & Delivery > VPC Architecture

### Page Title
VPC Architecture

### Subtitle
Virtual Private Cloud network design

---

## Key Concepts

### Concept 1: Network Design
**Icon:** 🏗️  
**Experience Level:** Expert • 7+ years  
**Key Points:**
- CIDR block planning
- Public vs private subnets
- Availability zone distribution
- IP address management

**Link:** /cloud-engineering/networking/vpc/design

### Concept 2: Route Tables
**Icon:** 🗺️  
**Experience Level:** Expert • 7+ years  
**Key Points:**
- Routing rules
- Subnet associations
- Local vs internet traffic
- VPC peering routes

**Link:** /cloud-engineering/networking/vpc/route-tables

### Concept 3: Internet & NAT Gateways
**Icon:** 🌐  
**Experience Level:** Advanced • 6+ years  
**Key Points:**
- Public internet access
- Outbound NAT
- High availability
- Elastic IPs

**Link:** /cloud-engineering/networking/vpc/gateways

### Concept 4: Security Groups
**Icon:** 🔒  
**Experience Level:** Expert • 8+ years  
**Key Points:**
- Stateful firewall rules
- Inbound/outbound rules
- Security group chaining
- Least privilege

**Link:** /cloud-engineering/networking/vpc/security-groups

---

## Context Section

### Title
VPC Implementation

### Content
Designed multi-tier VPC architecture with public subnets for load balancers and private subnets for application and database tiers. Implemented NAT gateways for secure outbound internet access from private subnets. Used security groups as virtual firewalls with principle of least privilege.
