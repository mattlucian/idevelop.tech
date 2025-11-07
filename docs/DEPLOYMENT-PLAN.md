# Frontend Deployment Plan

**Project:** idevelop.tech
**Last Updated:** 2025-10-31
**Status:** Ready for Implementation

---

## Overview

This document outlines the deployment strategy for the idevelop.tech frontend application, including CI/CD pipeline setup, infrastructure as code configuration, and automated deployment workflows.

**Deployment Architecture:**

- **Hosting:** AWS S3 (static website hosting)
- **CDN:** AWS CloudFront (global content delivery)
- **DNS:** AWS Route 53 (domain management)
- **CI/CD:** GitHub Actions (automated build and deployment)
- **IaC:** AWS CDK or CloudFormation (infrastructure automation)

**Target Domains:**

- Primary: `idevelop.tech`
- WWW: `www.idevelop.tech`

---

## Deployment Workflow

### Desired PR-Based Workflow

```
1. Developer creates feature branch
   └─> git checkout -b feature/new-feature

2. Developer commits changes and pushes
   └─> git push origin feature/new-feature

3. Developer opens Pull Request (PR) to main
   └─> PR automatically triggers checks:
       ├─> Type checking (npm run type-check)
       ├─> Linting (npm run lint)
       ├─> Build test (npm run build)
       └─> Status check reported to PR

4. PR review and approval
   └─> Requires: ✅ All checks passing
   └─> Requires: Code review approval (optional)

5. PR merged to main branch
   └─> Automatically triggers deployment:
       ├─> Build production bundle
       ├─> Upload to S3 bucket
       ├─> Invalidate CloudFront cache
       └─> Deployment complete notification
```

---

## Infrastructure Setup

### Option 1: AWS CDK (Recommended - True IaC)

**Why AWS CDK:**

- Infrastructure defined in TypeScript (same language as project)
- Type-safe infrastructure code
- Similar to SST.dev approach (SST is built on CDK)
- Can live alongside frontend code in `/infrastructure` directory
- Generates CloudFormation templates
- Easy to version control and review infrastructure changes

**Project Structure:**

```
/idevelop.tech/
├── infrastructure/           # NEW - Infrastructure as Code
│   ├── bin/
│   │   └── idevelop-frontend.ts    # CDK app entry point
│   ├── lib/
│   │   ├── frontend-stack.ts       # S3 + CloudFront stack
│   │   └── dns-stack.ts            # Route 53 configuration
│   ├── cdk.json                    # CDK configuration
│   ├── package.json                # CDK dependencies
│   └── tsconfig.json               # TypeScript config
├── .github/
│   └── workflows/
│       ├── pr-checks.yml           # PR validation workflow
│       └── deploy-production.yml   # Production deployment workflow
├── src/                      # Frontend application code
└── [existing files]
```

**Infrastructure Components:**

```typescript
// infrastructure/lib/frontend-stack.ts
import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'

export class FrontendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // S3 Bucket for static website hosting
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'idevelop-tech-frontend',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html', // SPA routing
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Don't delete on stack deletion
      autoDeleteObjects: false,
    })

    // CloudFront Origin Access Identity (OAI)
    const oai = new cloudfront.OriginAccessIdentity(this, 'OAI')
    websiteBucket.grantRead(oai)

    // SSL Certificate (must be in us-east-1 for CloudFront)
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'Certificate',
      'arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID',
    )

    // CloudFront Distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket,
            originAccessIdentity: oai,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html', // SPA routing
        },
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html', // SPA routing
        },
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: ['idevelop.tech', 'www.idevelop.tech'],
      }),
    })

    // Route 53 DNS Records
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'idevelop.tech',
    })

    // A record for apex domain (idevelop.tech)
    new route53.ARecord(this, 'ApexARecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    })

    // A record for www subdomain
    new route53.ARecord(this, 'WwwARecord', {
      zone: hostedZone,
      recordName: 'www',
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    })

    // Outputs
    new cdk.CfnOutput(this, 'BucketName', {
      value: websiteBucket.bucketName,
      description: 'S3 bucket name for frontend',
    })

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID',
    })

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront domain name',
    })
  }
}
```

**CDK Commands:**

```bash
# Install CDK globally
npm install -g aws-cdk

# Initialize CDK project (in infrastructure/)
cd infrastructure
cdk init app --language typescript

# Install dependencies
npm install

# Synthesize CloudFormation template (preview)
cdk synth

# Deploy infrastructure
cdk deploy

# View differences before deploying
cdk diff

# Destroy infrastructure (when needed)
cdk destroy
```

---

### Option 2: CloudFormation Template (Alternative IaC)

**Why CloudFormation:**

- Native AWS infrastructure as code
- No additional dependencies beyond AWS CLI
- Template can be stored in `/infrastructure` directory
- Version controlled and reviewable
- AWS-native (no abstraction layer)

**Project Structure:**

```
/idevelop.tech/
├── infrastructure/
│   └── cloudformation-template.yaml    # Infrastructure definition
├── .github/
│   └── workflows/
│       ├── pr-checks.yml
│       └── deploy-production.yml
└── [existing files]
```

**CloudFormation Template:**

```yaml
# infrastructure/cloudformation-template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'idevelop.tech Frontend Infrastructure'

Parameters:
  DomainName:
    Type: String
    Default: 'idevelop.tech'
    Description: 'Primary domain name'

  CertificateArn:
    Type: String
    Description: 'ARN of ACM certificate in us-east-1'

Resources:
  # S3 Bucket for Static Website
  WebsiteBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: idevelop-tech-frontend
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true

  # Bucket Policy for CloudFront Access
  WebsiteBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref WebsiteBucket
      PolicyDocument:
        Statement:
          - Sid: AllowCloudFrontOAI
            Effect: Allow
            Principal:
              CanonicalUser: !GetAtt CloudFrontOAI.S3CanonicalUserId
            Action: 's3:GetObject'
            Resource: !Sub '${WebsiteBucket.Arn}/*'

  # CloudFront Origin Access Identity
  CloudFrontOAI:
    Type: AWS::CloudFront::CloudFrontOriginAccessIdentity
    Properties:
      CloudFrontOriginAccessIdentityConfig:
        Comment: 'OAI for idevelop.tech'

  # CloudFront Distribution
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        DefaultRootObject: index.html
        Aliases:
          - idevelop.tech
          - www.idevelop.tech
        ViewerCertificate:
          AcmCertificateArn: !Ref CertificateArn
          SslSupportMethod: sni-only
          MinimumProtocolVersion: TLSv1.2_2021
        Origins:
          - Id: S3Origin
            DomainName: !GetAtt WebsiteBucket.RegionalDomainName
            S3OriginConfig:
              OriginAccessIdentity: !Sub 'origin-access-identity/cloudfront/${CloudFrontOAI}'
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          AllowedMethods:
            - GET
            - HEAD
            - OPTIONS
          CachedMethods:
            - GET
            - HEAD
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
          Compress: true
        CustomErrorResponses:
          - ErrorCode: 404
            ResponseCode: 200
            ResponsePagePath: /index.html
          - ErrorCode: 403
            ResponseCode: 200
            ResponsePagePath: /index.html
        PriceClass: PriceClass_100 # North America & Europe

Outputs:
  BucketName:
    Value: !Ref WebsiteBucket
    Description: 'S3 bucket name for frontend'

  DistributionId:
    Value: !Ref CloudFrontDistribution
    Description: 'CloudFront distribution ID'

  DistributionDomainName:
    Value: !GetAtt CloudFrontDistribution.DomainName
    Description: 'CloudFront domain name'
```

**CloudFormation Commands:**

```bash
# Validate template
aws cloudformation validate-template \
  --template-body file://infrastructure/cloudformation-template.yaml

# Create stack
aws cloudformation create-stack \
  --stack-name idevelop-tech-frontend \
  --template-body file://infrastructure/cloudformation-template.yaml \
  --parameters ParameterKey=CertificateArn,ParameterValue=arn:aws:acm:us-east-1:ACCOUNT_ID:certificate/CERT_ID

# Update stack
aws cloudformation update-stack \
  --stack-name idevelop-tech-frontend \
  --template-body file://infrastructure/cloudformation-template.yaml

# Delete stack
aws cloudformation delete-stack \
  --stack-name idevelop-tech-frontend

# View stack outputs
aws cloudformation describe-stacks \
  --stack-name idevelop-tech-frontend \
  --query 'Stacks[0].Outputs'
```

---

### Option 3: Manual Setup (Not Recommended)

**Why Not Recommended:**

- No version control for infrastructure
- Manual steps prone to errors
- Difficult to replicate across environments
- No review process for infrastructure changes
- Harder to maintain and document

**If you must use manual setup:**

1. Create S3 bucket via AWS Console
2. Configure static website hosting
3. Create CloudFront distribution
4. Configure Route 53 DNS records
5. Request/configure ACM certificate

---

## CI/CD Pipeline Setup

### GitHub Actions Workflows

#### 1. PR Checks Workflow

**File:** `.github/workflows/pr-checks.yml`

```yaml
name: PR Checks

on:
  pull_request:
    branches:
      - main

jobs:
  validate:
    name: Validate Code
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run type-check

      - name: Run linting
        run: npm run lint

      - name: Run build test
        run: npm run build

      - name: Comment PR with results
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            const status = '${{ job.status }}';
            const message = status === 'success'
              ? '✅ All checks passed! Ready to merge.'
              : '❌ Some checks failed. Please fix before merging.';

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: message
            });
```

#### 2. Production Deployment Workflow

**File:** `.github/workflows/deploy-production.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main
  workflow_dispatch: # Allow manual trigger

env:
  AWS_REGION: us-east-1
  NODE_VERSION: '20'

jobs:
  deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest

    permissions:
      id-token: write # Required for AWS OIDC
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run type-check

      - name: Run linting
        run: npm run lint

      - name: Build production bundle
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_RECAPTCHA_SITE_KEY: ${{ secrets.VITE_RECAPTCHA_SITE_KEY }}
          VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET_NAME }}/ \
            --delete \
            --cache-control "public,max-age=31536000,immutable" \
            --exclude "index.html" \
            --exclude "*.map"

          # Upload index.html separately with no-cache
          aws s3 cp dist/index.html s3://${{ secrets.S3_BUCKET_NAME }}/index.html \
            --cache-control "public,max-age=0,must-revalidate"

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"

      - name: Deployment summary
        run: |
          echo "✅ Deployment complete!"
          echo "🌐 Site: https://idevelop.tech"
          echo "📦 S3 Bucket: ${{ secrets.S3_BUCKET_NAME }}"
          echo "🔄 CloudFront invalidation in progress"
```

---

## AWS Configuration

### Prerequisites

1. **AWS Account**
   - Active AWS account with billing enabled
   - IAM user with programmatic access

2. **Domain Configuration**
   - Domain registered (idevelop.tech)
   - Route 53 hosted zone created
   - DNS nameservers configured

3. **SSL Certificate**
   - ACM certificate in `us-east-1` region
   - Certificate validated for `idevelop.tech` and `*.idevelop.tech`

### IAM Setup

#### GitHub Actions OIDC (Recommended - No Long-Lived Credentials)

**Why OIDC:**

- No AWS access keys to manage
- Temporary credentials per workflow run
- More secure than storing long-lived credentials
- AWS best practice for CI/CD

**Setup Steps:**

1. **Create OIDC Identity Provider in AWS:**

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

2. **Create IAM Role for GitHub Actions:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/idevelop.tech:*"
        }
      }
    }
  ]
}
```

3. **Attach Deployment Policy to Role:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::idevelop-tech-frontend", "arn:aws:s3:::idevelop-tech-frontend/*"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations"
      ],
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

### GitHub Repository Secrets

**Required Secrets:**

Navigate to: `GitHub Repo → Settings → Secrets and variables → Actions`

Add the following secrets:

| Secret Name                  | Description                              | Example Value                                          |
| ---------------------------- | ---------------------------------------- | ------------------------------------------------------ |
| `AWS_ROLE_ARN`               | IAM role ARN for OIDC                    | `arn:aws:iam::123456789012:role/github-actions-deploy` |
| `S3_BUCKET_NAME`             | S3 bucket name for frontend              | `idevelop-tech-frontend`                               |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID               | `E1234567890ABC`                                       |
| `VITE_API_URL`               | Production API URL                       | `https://api.idevelop.tech`                            |
| `VITE_RECAPTCHA_SITE_KEY`    | reCAPTCHA v3 site key (public)           | `6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw`             |
| `VITE_GA_MEASUREMENT_ID`     | Google Analytics measurement ID (public) | `G-XS6QVSG7MS`                                         |

**Security Notes:**

- Use OIDC for AWS authentication (no long-lived access keys)
- Only store truly secret values in GitHub Secrets
- Public values (site key, GA ID) can be in secrets for consistency but are not sensitive

---

## Implementation Steps

### Step 1: Choose Infrastructure Approach

**Recommended: AWS CDK**

1. Create infrastructure directory:

```bash
mkdir infrastructure
cd infrastructure
```

2. Initialize CDK project:

```bash
npm install -g aws-cdk
cdk init app --language typescript
```

3. Install dependencies:

```bash
npm install @aws-cdk/aws-s3 @aws-cdk/aws-cloudfront @aws-cdk/aws-route53 @aws-cdk/aws-route53-targets @aws-cdk/aws-certificatemanager
```

4. Copy the FrontendStack code from "Option 1" above into `lib/frontend-stack.ts`

5. Update `bin/idevelop-frontend.ts`:

```typescript
#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { FrontendStack } from '../lib/frontend-stack'

const app = new cdk.App()
new FrontendStack(app, 'IdevelopTechFrontend', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
})
```

6. Deploy infrastructure:

```bash
cdk bootstrap  # First time only
cdk deploy
```

7. Note the outputs (bucket name, distribution ID)

---

### Step 2: Configure AWS IAM for GitHub Actions

1. **Create OIDC Provider** (if not exists):

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

2. **Create IAM Role:**

- Go to AWS Console → IAM → Roles → Create Role
- Select "Web identity"
- Identity provider: `token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`
- GitHub organization: `YOUR_USERNAME`
- GitHub repository: `idevelop.tech`
- Attach custom policy (see "Attach Deployment Policy" above)

3. **Copy Role ARN** for GitHub Secrets

---

### Step 3: Create GitHub Workflows

1. Create workflow directory:

```bash
mkdir -p .github/workflows
```

2. Create PR checks workflow:

```bash
# Copy pr-checks.yml content from above
nano .github/workflows/pr-checks.yml
```

3. Create deployment workflow:

```bash
# Copy deploy-production.yml content from above
nano .github/workflows/deploy-production.yml
```

4. Commit workflows:

```bash
git add .github/workflows/
git commit -m "Add CI/CD workflows for automated deployment"
git push origin main
```

---

### Step 4: Configure GitHub Secrets

1. Go to GitHub repository
2. Navigate to: `Settings → Secrets and variables → Actions`
3. Click "New repository secret"
4. Add all required secrets (see table above)

---

### Step 5: Configure DNS (Route 53)

**Option A: Using CDK (if using Option 1)**

- DNS records created automatically by CDK stack

**Option B: Manual Configuration**

1. Create A record for apex domain:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "idevelop.tech",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "YOUR_CLOUDFRONT_DOMAIN.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }'
```

2. Create A record for www:

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "www.idevelop.tech",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "YOUR_CLOUDFRONT_DOMAIN.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }'
```

---

### Step 6: Test Deployment

1. **Test PR Workflow:**

```bash
# Create feature branch
git checkout -b test/deployment-setup

# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "Test PR checks workflow"
git push origin test/deployment-setup

# Open PR on GitHub
# Verify checks run automatically
```

2. **Test Production Deployment:**

```bash
# Merge PR to main
# Verify deployment workflow runs
# Check GitHub Actions tab for progress
```

3. **Verify Deployment:**

```bash
# Check S3 bucket
aws s3 ls s3://idevelop-tech-frontend/ --recursive

# Check CloudFront invalidation
aws cloudfront list-invalidations \
  --distribution-id YOUR_DISTRIBUTION_ID

# Visit site
curl -I https://idevelop.tech
```

---

## Deployment Workflow Details

### Build Process

**Vite Build Configuration:**

The production build:

- Minifies JavaScript and CSS
- Optimizes images and assets
- Generates source maps (excluded from deployment)
- Creates hashed filenames for cache busting
- Output directory: `/dist`

**Environment Variables:**

Build-time environment variables are injected via GitHub Actions secrets:

- `VITE_API_URL` - API endpoint URL
- `VITE_RECAPTCHA_SITE_KEY` - reCAPTCHA public key
- `VITE_GA_MEASUREMENT_ID` - Google Analytics ID

### S3 Upload Strategy

**Cache Control Headers:**

```bash
# Static assets (JS, CSS, images) - immutable, long cache
--cache-control "public,max-age=31536000,immutable"

# HTML files - no cache, always revalidate
--cache-control "public,max-age=0,must-revalidate"
```

**Sync vs. Copy:**

- `aws s3 sync` - Upload only changed files, delete removed files
- `--delete` flag - Remove files from S3 that don't exist locally
- Separate upload for `index.html` with different cache headers

### CloudFront Invalidation

**Invalidation Strategy:**

```bash
# Invalidate all paths (wildcard)
aws cloudfront create-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --paths "/*"
```

**Cost Note:**

- First 1,000 invalidation paths per month: Free
- Additional paths: $0.005 per path
- Wildcard `/*` counts as 1 path

**Timing:**

- Invalidation takes 1-5 minutes to complete
- CloudFront continues serving cached content until invalidation completes
- Users may see stale content briefly after deployment

---

## Monitoring and Troubleshooting

### GitHub Actions Debugging

**View Workflow Runs:**

- Go to GitHub repository
- Click "Actions" tab
- Select workflow run to view logs

**Common Issues:**

1. **Type check fails:**
   - Run `npm run type-check` locally
   - Fix TypeScript errors before pushing

2. **Build fails:**
   - Check environment variables in GitHub Secrets
   - Verify all dependencies in `package.json`
   - Check build logs for missing assets

3. **AWS authentication fails:**
   - Verify OIDC provider exists
   - Check IAM role trust policy
   - Verify role ARN in GitHub Secrets

### AWS Debugging

**S3 Bucket Access:**

```bash
# List bucket contents
aws s3 ls s3://idevelop-tech-frontend/ --recursive

# Check bucket policy
aws s3api get-bucket-policy --bucket idevelop-tech-frontend

# Check public access settings
aws s3api get-public-access-block --bucket idevelop-tech-frontend
```

**CloudFront Debugging:**

```bash
# Get distribution details
aws cloudfront get-distribution --id DISTRIBUTION_ID

# Check invalidation status
aws cloudfront get-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --id INVALIDATION_ID

# View distribution logs
aws cloudfront list-distributions
```

**DNS Verification:**

```bash
# Check DNS resolution
dig idevelop.tech
dig www.idevelop.tech

# Check CloudFront domain
dig YOUR_DISTRIBUTION.cloudfront.net
```

---

## Cost Breakdown

### Monthly AWS Costs (Estimated)

| Service                  | Usage (Low Traffic)       | Cost       |
| ------------------------ | ------------------------- | ---------- |
| S3 Storage               | 100 MB                    | ~$0.00     |
| S3 Requests              | 10,000 GET requests       | ~$0.00     |
| CloudFront Data Transfer | 10 GB out (first 10 TB)   | ~$0.85     |
| CloudFront Requests      | 10,000 requests           | ~$0.01     |
| Route 53 Hosted Zone     | 1 zone                    | $0.50      |
| Route 53 Queries         | 1M queries                | $0.40      |
| **Total**                | **Low traffic portfolio** | **~$1.76** |

**Notes:**

- AWS Free Tier covers most S3 costs
- CloudFront Free Tier: 1 TB data transfer out (first 12 months)
- Route 53 hosted zone is not part of Free Tier
- Costs scale with traffic volume

---

## Security Best Practices

### AWS Security

1. **S3 Bucket:**
   - ✅ Block all public access
   - ✅ Use CloudFront OAI for access control
   - ✅ Enable versioning (optional, for rollback)
   - ✅ Enable server-side encryption

2. **CloudFront:**
   - ✅ Enforce HTTPS only (`redirect-to-https`)
   - ✅ Use TLSv1.2 or higher
   - ✅ Enable WAF (optional, for DDoS protection)
   - ✅ Set security headers (CSP, HSTS, etc.)

3. **IAM:**
   - ✅ Use OIDC (no long-lived credentials)
   - ✅ Principle of least privilege
   - ✅ Scope permissions to specific resources
   - ✅ Enable MFA for AWS Console access

### GitHub Actions Security

1. **Secrets Management:**
   - ✅ Never commit secrets to repository
   - ✅ Use GitHub Secrets for sensitive values
   - ✅ Rotate credentials periodically
   - ✅ Audit secret access logs

2. **Workflow Security:**
   - ✅ Pin action versions (`@v4` not `@latest`)
   - ✅ Review third-party actions before use
   - ✅ Use `permissions` to limit token scope
   - ✅ Enable branch protection rules

3. **Code Review:**
   - ✅ Require PR reviews before merge
   - ✅ Require passing checks before merge
   - ✅ Enable automatic security updates (Dependabot)

---

## Rollback Strategy

### Manual Rollback

**Option 1: Revert Git Commit**

```bash
# Find commit to revert to
git log --oneline

# Revert to previous commit
git revert HEAD

# Push to trigger deployment
git push origin main
```

**Option 2: Redeploy Previous Version**

```bash
# Checkout previous commit
git checkout PREVIOUS_COMMIT_SHA

# Manually trigger deployment workflow
# (via GitHub Actions UI)
```

**Option 3: S3 Versioning (if enabled)**

```bash
# List object versions
aws s3api list-object-versions \
  --bucket idevelop-tech-frontend

# Copy previous version to current
aws s3api copy-object \
  --bucket idevelop-tech-frontend \
  --copy-source idevelop-tech-frontend/index.html?versionId=VERSION_ID \
  --key index.html

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --paths "/*"
```

---

## Environment Management

### Development Environment

**Local Development:**

- Uses `.env.development` file
- API URL: `http://localhost:3000`
- Hot module reloading enabled
- Source maps enabled

**Commands:**

```bash
npm run dev           # Start dev server
npm run type-check    # Check types
npm run lint          # Lint code
npm run format        # Format code
```

### Staging Environment (Optional)

**If staging needed:**

1. Create separate S3 bucket: `idevelop-tech-frontend-staging`
2. Create separate CloudFront distribution
3. Create separate GitHub workflow: `deploy-staging.yml`
4. Trigger on push to `develop` branch

### Production Environment

**Production Setup:**

- Uses `.env.production` values (via GitHub Secrets)
- API URL: `https://api.idevelop.tech`
- Optimized build with minification
- Source maps excluded from deployment

---

## Next Steps After Deployment

### 1. Verify Deployment

- [ ] Check site loads: https://idevelop.tech
- [ ] Check www redirect: https://www.idevelop.tech
- [ ] Test all pages and navigation
- [ ] Verify images and assets load
- [ ] Check browser console for errors

### 2. Test Cookie Consent

- [ ] Cookie banner appears on first visit
- [ ] Accept/Decline buttons work
- [ ] Consent stored in localStorage
- [ ] reCAPTCHA loads after consent
- [ ] Google Analytics loads after consent

### 3. Configure Google Analytics

- [ ] Verify GA tracking code loads
- [ ] Check real-time visitors in GA dashboard
- [ ] Verify page view tracking
- [ ] Set up goals and conversions (optional)

### 4. Test Contact Form (After Backend Deployed)

- [ ] Form validation works
- [ ] reCAPTCHA token generated
- [ ] API request succeeds
- [ ] Email delivered successfully
- [ ] Success message displays

### 5. Performance Optimization

- [ ] Run Lighthouse audit
- [ ] Check PageSpeed Insights
- [ ] Verify CloudFront caching works
- [ ] Test load times from different regions
- [ ] Optimize images if needed

### 6. SEO Configuration

- [ ] Add sitemap.xml
- [ ] Configure robots.txt
- [ ] Add meta tags and Open Graph
- [ ] Submit to Google Search Console
- [ ] Verify structured data

---

## Support and Resources

### Documentation

- **AWS CDK:** https://docs.aws.amazon.com/cdk/
- **CloudFormation:** https://docs.aws.amazon.com/cloudformation/
- **GitHub Actions:** https://docs.github.com/en/actions
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html

### AWS Support

- **AWS Console:** https://console.aws.amazon.com/
- **AWS CLI:** https://aws.amazon.com/cli/
- **AWS Support:** https://aws.amazon.com/support/

### GitHub Support

- **GitHub Actions:** https://github.com/features/actions
- **GitHub Secrets:** https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

## Appendix A: Complete File Structure

```
/idevelop.tech/
├── .github/
│   └── workflows/
│       ├── pr-checks.yml              # PR validation workflow
│       └── deploy-production.yml      # Production deployment workflow
├── infrastructure/                     # Infrastructure as Code
│   ├── bin/
│   │   └── idevelop-frontend.ts       # CDK app entry
│   ├── lib/
│   │   └── frontend-stack.ts          # CDK stack definition
│   ├── cdk.json                       # CDK configuration
│   ├── package.json                   # CDK dependencies
│   └── tsconfig.json                  # TypeScript config
├── src/                               # Frontend application
│   └── [existing structure]
├── docs/
│   ├── DEPLOYMENT-PLAN.md             # This document
│   └── CTA-FORM-IMPLEMENTATION-PLAN.md
├── .env.development                   # Local environment config
├── .env.production                    # Production environment config (values in GitHub Secrets)
├── .gitignore
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Appendix B: Quick Reference Commands

### Infrastructure

```bash
# CDK commands
cdk synth        # Preview CloudFormation template
cdk diff         # Show changes before deploy
cdk deploy       # Deploy infrastructure
cdk destroy      # Delete infrastructure

# CloudFormation commands
aws cloudformation create-stack --stack-name idevelop-tech-frontend --template-body file://template.yaml
aws cloudformation update-stack --stack-name idevelop-tech-frontend --template-body file://template.yaml
aws cloudformation delete-stack --stack-name idevelop-tech-frontend
```

### Deployment

```bash
# Manual deployment (if needed)
npm run build
aws s3 sync dist/ s3://idevelop-tech-frontend/ --delete
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

### Debugging

```bash
# Check S3 bucket
aws s3 ls s3://idevelop-tech-frontend/

# Check CloudFront distribution
aws cloudfront get-distribution --id DIST_ID

# Check DNS
dig idevelop.tech
dig www.idevelop.tech

# Check SSL certificate
openssl s_client -connect idevelop.tech:443 -servername idevelop.tech
```

---

**Document Status:** Ready for implementation
**Recommended Approach:** AWS CDK (Option 1)
**Next Step:** Follow "Implementation Steps" section
