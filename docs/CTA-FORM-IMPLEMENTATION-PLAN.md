# CTA Form Implementation Plan

**Status:** Frontend Complete - Backend Pending
**Last Updated:** 2025-10-31
**Effort:** Contact form with reCAPTCHA v3 and serverless API backend

---

## Overview

Implement production-ready contact form submission with:

- reCAPTCHA v3 spam protection (invisible, score-based)
- Serverless API backend (api.idevelop.tech)
- Email delivery via AWS SES
- Rate limiting and submission logging
- Cookie compliance notification

---

## Implementation Status Summary

### ✅ Completed Components

**Cookie Consent System:**

- CookieNotice component with accept/decline functionality
- Privacy Policy page with comprehensive disclosure
- Consent management (localStorage-based)
- Conditional script loading (reCAPTCHA + Google Analytics)
- GA loading status indicator
- Cookie revoke functionality with accurate messaging
- reCAPTCHA badge hidden (text disclosure compliance)

**Environment Configuration:**

- `.env.development` with API URL, reCAPTCHA site key, GA measurement ID
- `.env.production` with API URL, reCAPTCHA site key, GA measurement ID
- reCAPTCHA v3 credentials obtained and configured

**Form UI:**

- CTAForm component ready with validation
- reCAPTCHA privacy notice on forms
- Responsive design complete

### ⚠️ Pending Components (Blockers)

**Backend API:**

- SST.dev project creation (see Section 6 for prompt)
- Lambda function for contact endpoint
- reCAPTCHA server-side verification
- AWS SES email configuration
- DynamoDB for rate limiting and logging
- Custom domain setup (api.idevelop.tech)

**Frontend API Integration:**

- Create `/src/types/api.ts` - Request/response TypeScript types
- Create `/src/services/contactApi.ts` - API client service
- Update CTAForm with API call logic
- Error handling for all error codes
- Loading states and user feedback

**Testing:**

- End-to-end contact form submission testing
- Google Analytics testing (requires production domain)
- Rate limiting verification
- Email delivery verification

### Next Steps Priority

1. **Backend API Deployment** (CRITICAL BLOCKER)
   - Use SST.dev prompt in Section 6
   - Deploy to AWS with custom domain
   - Test endpoint functionality

2. **Frontend API Integration** (depends on #1)
   - Create API types and service
   - Update CTAForm component
   - Implement error handling

3. **Frontend Deployment**
   - See `/docs/DEPLOYMENT-PLAN.md` for CI/CD setup
   - Deploy to production environment
   - Configure CloudFront and S3

4. **End-to-End Testing**
   - Verify contact form submission flow
   - Test Google Analytics tracking
   - Validate cookie consent behavior

---

## 1. API Schema Specification

### Endpoint

```
POST https://api.idevelop.tech/v1/contact
```

### Request Schema

```typescript
interface ContactFormRequest {
  // Form data
  name: string // Required, 1-100 chars
  email: string // Required, valid email format
  service: string // Required, one of predefined services
  message?: string // Optional, 0-1000 chars

  // reCAPTCHA verification
  recaptchaToken: string // Required, token from reCAPTCHA v3

  // Metadata (optional but recommended)
  metadata?: {
    userAgent?: string // Browser user agent
    referrer?: string // Page URL where form was submitted
    timestamp: string // ISO 8601 timestamp
  }
}
```

**Example request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Integration Services",
  "message": "I need help integrating Shopify with my ERP system.",
  "recaptchaToken": "03AGdBq27X...",
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://idevelop.tech/services/integration",
    "timestamp": "2025-10-31T14:30:00.000Z"
  }
}
```

### Response Schema

**Success (200):**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "estimatedResponse": "within 24 hours"
}
```

**Error (4xx/5xx):**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Error Codes

| HTTP Status | Error Code            | Description                                |
| ----------- | --------------------- | ------------------------------------------ |
| 400         | `VALIDATION_ERROR`    | Invalid or missing required fields         |
| 400         | `INVALID_EMAIL`       | Email format is invalid                    |
| 400         | `MESSAGE_TOO_LONG`    | Message exceeds 1000 characters            |
| 403         | `RECAPTCHA_FAILED`    | reCAPTCHA verification failed (likely bot) |
| 403         | `RECAPTCHA_LOW_SCORE` | reCAPTCHA score below threshold (0.5)      |
| 429         | `RATE_LIMIT_EXCEEDED` | Too many requests from this IP             |
| 500         | `EMAIL_SEND_FAILED`   | Failed to send email (internal error)      |
| 500         | `INTERNAL_ERROR`      | Unexpected server error                    |

### Validation Rules

```typescript
const validationRules = {
  name: {
    required: true,
    minLength: 1,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/, // Letters, spaces, hyphens, apostrophes
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
  },
  service: {
    required: true,
    enum: [
      'General Inquiry',
      'Integration Services',
      'Tech Admin & Fractional CTO',
      'AI Enablement',
      'eCommerce Operations',
      'Web Design & Development',
      'Cloud & Infrastructure Consulting',
    ],
  },
  message: {
    required: false,
    maxLength: 1000,
  },
  recaptchaToken: {
    required: true,
    minLength: 20,
  },
}
```

### Rate Limiting

```typescript
const rateLimits = {
  perIP: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5, // 5 submissions per hour per IP
  },
  perEmail: {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 10, // 10 submissions per day per email
  },
}
```

---

## 2. reCAPTCHA v3 Setup

### ⚠️ ACTION REQUIRED: Get reCAPTCHA Credentials

**Step 1: Register reCAPTCHA Site**

1. Visit: **https://www.google.com/recaptcha/admin**
2. Sign in with your Google account
3. Click "+" button to register a new site

**Step 2: Configure Site Settings**

- **Label:** `idevelop.tech Contact Form`
- **reCAPTCHA type:** Select **"Score based (v3)"** ⚠️ (NOT v2 with checkbox)
- **Domains:** Add the following domains:
  - `idevelop.tech`
  - `www.idevelop.tech`
  - `localhost` (for local development)
- Accept the reCAPTCHA Terms of Service
- Click "Submit"

**Step 3: Copy Credentials**

After creating the site, you'll see two keys:

```
SITE KEY (Public):     [Copy this - safe to expose in frontend]
SECRET KEY (Private):  [Copy this - keep secret, backend only]
```

**Step 4: Provide Credentials**

Create these files (they are gitignored, safe to add):

```bash
# .env.development
VITE_API_URL=http://localhost:3000
VITE_RECAPTCHA_SITE_KEY=paste_your_site_key_here

# .env.production
VITE_API_URL=https://api.idevelop.tech
VITE_RECAPTCHA_SITE_KEY=paste_your_site_key_here
```

**For Backend API (SST project):**

- Store `SECRET KEY` in AWS SSM Parameter Store
- Will be used for server-side verification

### reCAPTCHA Configuration

```typescript
// Frontend configuration
const RECAPTCHA_CONFIG = {
  siteKey: 'YOUR_SITE_KEY_HERE', // Public key from Google
  action: 'contact_form_submit', // Custom action name for this form
  minScore: 0.5, // Minimum acceptable score (0.0 - 1.0)
}

// Backend configuration (in API project)
const RECAPTCHA_SECRET_KEY = 'YOUR_SECRET_KEY_HERE'
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
```

### Score Thresholds

reCAPTCHA v3 returns a score from 0.0 (likely bot) to 1.0 (likely human):

| Score Range | Interpretation    | Action                 |
| ----------- | ----------------- | ---------------------- |
| 0.9 - 1.0   | Very likely human | Accept immediately     |
| 0.7 - 0.8   | Likely human      | Accept                 |
| 0.5 - 0.6   | Borderline        | Accept with monitoring |
| 0.3 - 0.4   | Likely bot        | Reject                 |
| 0.0 - 0.2   | Very likely bot   | Reject immediately     |

**Recommended threshold:** 0.5 (good balance of security and UX)

---

## 3. Frontend Implementation

### Files to Create/Update

```
/src/
├── types/
│   └── api.ts                    # NEW - API request/response types
├── services/
│   └── contactApi.ts             # NEW - API client service
├── composables/
│   └── useRecaptcha.ts           # NEW - reCAPTCHA integration
├── components/
│   └── ui/
│       ├── CTAForm.vue           # UPDATE - Add reCAPTCHA and API call
│       └── CookieNotice.vue      # NEW - Cookie consent banner
└── index.html                    # UPDATE - Add reCAPTCHA script
```

### Environment Variables

```env
# .env.development
VITE_API_URL=http://localhost:3000
VITE_RECAPTCHA_SITE_KEY=your_development_site_key

# .env.production
VITE_API_URL=https://api.idevelop.tech
VITE_RECAPTCHA_SITE_KEY=your_production_site_key
```

**⚠️ Important:** These files are already in `.gitignore` - safe to create locally

---

## 4. Backend API Implementation (SST.DEV)

### Project Overview

**Repository:** `idevelop-api` (separate project)
**Domain:** `api.idevelop.tech`
**Tech Stack:**

- SST.dev (Ion) - Infrastructure as Code
- Node.js 20.x / TypeScript
- AWS Lambda (serverless functions)
- AWS SES (email delivery)
- AWS DynamoDB (rate limiting & logging)
- API Gateway (HTTP endpoints)

### AWS Resources Required

1. **Lambda Function**
   - Runtime: Node.js 20.x
   - Memory: 512 MB
   - Timeout: 10 seconds
   - Handler: POST /v1/contact

2. **API Gateway**
   - HTTP API with custom domain
   - CORS configuration for idevelop.tech

3. **DynamoDB Table**
   - Rate limiting tracking
   - Submission logging
   - TTL for automatic cleanup

4. **AWS SES**
   - Email identity verification (idevelop.tech domain)
   - From: noreply@idevelop.tech
   - To: matt@idevelop.tech

5. **SSM Parameters** (for secrets)
   - RECAPTCHA_SECRET_KEY
   - SES_FROM_EMAIL
   - SES_TO_EMAIL
   - Rate limit configurations

### Business Logic

1. **Input Validation** - Validate all fields, sanitize input
2. **reCAPTCHA Verification** - Verify token with Google, check score >= 0.5
3. **Rate Limiting** - Check DynamoDB for IP/email limits
4. **Email Delivery** - Send formatted email via SES
5. **Logging** - Store submission in DynamoDB for tracking

### SST Project Prompt

See section **"5. SST.DEV Project Creation Prompt"** below for complete implementation prompt.

---

## 5. Cookie Compliance ✅ IMPLEMENTED

### ⚠️ COMPLIANCE STATUS: COMPLETE

**Status:** ✅ Fully implemented with consent management
**Regulation:** GDPR (EU), CCPA (California), other privacy laws
**Action:** Cookie notice active with accept/decline functionality

### Cookies Used

**Essential Cookies (reCAPTCHA v3):**
Google reCAPTCHA v3 sets the following cookies:

| Cookie Name   | Purpose                                              | Duration   | Domain        |
| ------------- | ---------------------------------------------------- | ---------- | ------------- |
| `_GRECAPTCHA` | Analysis and differentiation between humans and bots | 6 months   | `.google.com` |
| `rc::a`       | Distinguishes humans from bots (session storage)     | Persistent | `.google.com` |
| `rc::b`       | Session-based bot detection                          | Session    | `.google.com` |
| `rc::c`       | Session-based bot detection                          | Session    | `.google.com` |

**Non-Essential Cookies (Google Analytics):**

| Cookie Name | Purpose                     | Duration | Domain        |
| ----------- | --------------------------- | -------- | ------------- |
| `_ga`       | User identification         | 2 years  | `.google.com` |
| `_gid`      | User identification         | 24 hours | `.google.com` |
| `_gat`      | Request throttling          | 1 minute | `.google.com` |
| `_ga_*`     | Property-specific user data | 2 years  | `.google.com` |

**Privacy Impact:**

- Third-party cookies (Google domain)
- Used for spam/bot detection and analytics
- May track user behavior across sites
- Subject to Google's Privacy Policy

### Cookie Notice Implementation ✅

**Implemented Features:**

1. ✅ Cookie consent banner on first visit
2. ✅ Accept/Decline buttons with clear actions
3. ✅ Consent preference storage (localStorage: `cookie_consent`)
4. ✅ Conditional script loading:
   - Essential (reCAPTCHA): Loads on Accept or Decline
   - Analytics (GA): Only loads on Accept
5. ✅ Revoke consent functionality on Privacy page
6. ✅ Visual indicator showing GA loading status
7. ✅ Cookie deletion on revoke (first-party only)
8. ✅ Privacy Policy page with comprehensive disclosure
9. ✅ Links to Google Privacy Policy and Terms
10. ✅ reCAPTCHA badge hidden (text disclosure compliance)

**Files Implemented:**

```
✅ /src/components/ui/CookieNotice.vue     # Cookie consent banner with dynamic loading
✅ /src/views/PrivacyView.vue              # Privacy policy page with revoke functionality
✅ /src/router/index.ts                    # /privacy route added
✅ /src/assets/main.css                    # reCAPTCHA badge visibility CSS
✅ /.env.development                       # Development environment config
✅ /.env.production                        # Production environment config
```

**Key Implementation Details:**

- Consent stored as JSON object with `essential`, `analytics`, and `timestamp` fields
- Scripts only load after consent (no preload)
- GA loading status check: `window.gtag` and `window.dataLayer` detection
- Cookie deletion attempts all domain variations (localhost, production, dot-prefix)
- Third-party Google cookies cannot be deleted (browser security restriction - normal behavior)
- Accurate messaging: revoke prevents future GA loading (most important aspect)

**Privacy Policy Coverage:**

- Comprehensive cookie disclosure (essential and non-essential)
- Purpose explanation (spam protection, analytics)
- Google Privacy Policy links
- User rights (accept, decline, revoke)
- Data retention and handling
- Contact information

---

## 6. SST.DEV Project Creation Prompt

**Use this prompt in a separate Claude Code session to create the backend API:**

````
I need you to create a serverless API project using SST.dev (Ion) for handling contact form submissions from my portfolio website (idevelop.tech). The API will be deployed to AWS and hosted at api.idevelop.tech.

## Project Requirements

**Tech Stack:**
- SST.dev (Ion) - Infrastructure as Code
- Node.js 20.x / TypeScript
- AWS Lambda for serverless functions
- AWS SES for email delivery
- AWS DynamoDB for rate limiting and submission logging
- API Gateway for HTTP endpoints

**Project Name:** idevelop-api
**Domain:** api.idevelop.tech
**Region:** us-east-1 (or closest to Florida)

## API Endpoint Specification

### POST /v1/contact

**Request Schema:**
```typescript
interface ContactFormRequest {
  name: string              // Required, 1-100 chars, letters/spaces/hyphens/apostrophes
  email: string             // Required, valid email format
  service: string           // Required, one of predefined services
  message?: string          // Optional, 0-1000 chars
  recaptchaToken: string    // Required, reCAPTCHA v3 token
  metadata?: {
    userAgent?: string
    referrer?: string
    timestamp: string       // ISO 8601
  }
}
````

**Success Response (200):**

```typescript
{
  success: true,
  message: "Message sent successfully",
  requestId: "uuid-here",
  estimatedResponse: "within 24 hours"
}
```

**Error Response (4xx/5xx):**

```typescript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human-readable message",
    details?: any
  }
}
```

**Error Codes:**

- VALIDATION_ERROR (400) - Invalid or missing fields
- INVALID_EMAIL (400) - Invalid email format
- MESSAGE_TOO_LONG (400) - Message exceeds 1000 chars
- RECAPTCHA_FAILED (403) - reCAPTCHA verification failed
- RECAPTCHA_LOW_SCORE (403) - reCAPTCHA score below 0.5
- RATE_LIMIT_EXCEEDED (429) - Too many requests
- EMAIL_SEND_FAILED (500) - Failed to send email
- INTERNAL_ERROR (500) - Unexpected error

## Business Logic

1. **Input Validation:**
   - Validate all required fields
   - Sanitize input (trim whitespace, validate formats)
   - Check service against allowed list:
     - General Inquiry
     - Integration Services
     - Tech Admin & Fractional CTO
     - AI Enablement
     - eCommerce Operations
     - Web Design & Development
     - Cloud & Infrastructure Consulting

2. **reCAPTCHA Verification:**
   - Verify token with Google reCAPTCHA API
   - Endpoint: https://www.google.com/recaptcha/api/siteverify
   - Minimum score threshold: 0.5
   - Reject if verification fails or score too low

3. **Rate Limiting:**
   - Per IP: 5 requests per hour
   - Per email: 10 requests per 24 hours
   - Use DynamoDB with TTL for tracking
   - Return 429 if exceeded

4. **Email Delivery:**
   - Use AWS SES to send email
   - From: noreply@idevelop.tech
   - To: matt@idevelop.tech
   - Subject: "[idevelop.tech] {service} - {name}"
   - Email template with HTML formatting
   - Include all form data and metadata
   - Auto-reply to submitter confirming receipt

5. **Logging:**
   - Store all submissions in DynamoDB for tracking
   - Log fields: requestId, timestamp, email, service, ipAddress, recaptchaScore, status
   - Use for analytics and spam detection

6. **CORS Configuration:**
   - Allow origins: https://idevelop.tech, https://www.idevelop.tech, http://localhost:5173
   - Allow methods: POST, OPTIONS
   - Allow headers: Content-Type

## SST Configuration

**Environment Variables (SSM Parameters):**

- RECAPTCHA_SECRET_KEY - reCAPTCHA server-side secret
- SES_FROM_EMAIL - noreply@idevelop.tech
- SES_TO_EMAIL - matt@idevelop.tech
- RATE_LIMIT_PER_IP - 5
- RATE_LIMIT_PER_EMAIL - 10
- RECAPTCHA_MIN_SCORE - 0.5

**Resources:**

- Lambda function (Node.js 20.x, 512 MB memory, 10s timeout)
- API Gateway HTTP API with custom domain
- DynamoDB table for rate limiting and submissions
- SES email identity verification
- SSM parameters for secrets

## Project Structure

```
idevelop-api/
├── sst.config.ts           # SST configuration
├── packages/
│   └── functions/
│       └── src/
│           ├── contact.ts       # Main Lambda handler
│           ├── validation.ts    # Input validation logic
│           ├── recaptcha.ts     # reCAPTCHA verification
│           ├── rateLimit.ts     # Rate limiting logic
│           ├── email.ts         # SES email sending
│           ├── database.ts      # DynamoDB operations
│           └── types.ts         # TypeScript types
├── package.json
├── tsconfig.json
└── README.md
```

## Implementation Steps

1. Initialize SST project with Ion
2. Configure AWS resources (Lambda, API Gateway, DynamoDB, SES)
3. Implement validation logic with proper error handling
4. Implement reCAPTCHA verification
5. Implement rate limiting with DynamoDB
6. Implement email sending with SES (HTML template)
7. Add comprehensive error handling and logging
8. Add CORS configuration
9. Add unit tests for validation and business logic
10. Create deployment documentation
11. Configure custom domain (api.idevelop.tech)

## Success Criteria

- API responds with correct status codes and error messages
- reCAPTCHA verification works correctly
- Rate limiting prevents abuse
- Emails are delivered reliably with proper formatting
- All submissions logged to DynamoDB
- CORS allows requests from idevelop.tech domain
- Custom domain configured and working
- Infrastructure deployable with single command (sst deploy)
- Environment variables managed securely via SSM

## Notes

- Use AWS SES sandbox mode initially, then request production access
- Verify email domain (idevelop.tech) in SES
- Set up CloudWatch alarms for errors and rate limit hits
- Consider adding SNS topic for failed email notifications
- Implement exponential backoff for SES rate limits
- Add request/response logging for debugging

Please create this project following SST best practices with proper error handling, logging, and TypeScript types throughout.

```

---

## 7. Implementation Checklist

### Phase 1: Setup & Configuration

- [x] **Get reCAPTCHA Credentials** ✅ COMPLETE
  - [x] Register site at https://www.google.com/recaptcha/admin
  - [x] Copy SITE KEY (public): `6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw`
  - [x] Copy SECRET KEY (private) - stored securely
  - [x] Create `.env.development` with SITE KEY and GA_MEASUREMENT_ID
  - [x] Create `.env.production` with SITE KEY and GA_MEASUREMENT_ID

- [ ] **Backend API Project** ⚠️ PENDING - BLOCKER FOR TESTING
  - [ ] Create SST project using provided prompt
  - [ ] Configure AWS resources (Lambda, SES, DynamoDB)
  - [ ] Add SECRET KEY to SSM Parameter Store
  - [ ] Verify SES email domain (idevelop.tech)
  - [ ] Deploy to AWS and test endpoint

### Phase 2: Frontend Implementation

- [x] **Cookie Notice** ✅ COMPLETE
  - [x] Create CookieNotice component with banner UI
  - [x] Implement cookie consent storage (localStorage)
  - [x] Add conditional loading for reCAPTCHA and Google Analytics
  - [x] Add Privacy Policy page with comprehensive cookie disclosure
  - [x] Update router with /privacy route
  - [x] Add visual GA loading status indicator
  - [x] Add cookie revoke functionality
  - [x] Hide reCAPTCHA badge (compliance via text disclosure)
  - [x] Test cookie acceptance flow
  - [x] Update messaging for accuracy (revoke prevents future loading)

- [x] **reCAPTCHA Integration** ✅ COMPLETE (UI only, needs backend)
  - [x] Dynamic reCAPTCHA script loading (only after consent)
  - [x] Environment-based configuration (dev/production)
  - [x] Cookie consent integration
  - [x] Badge visibility settings
  - Note: Full testing requires backend API deployment

- [ ] **CTAForm Updates** ⚠️ PARTIALLY COMPLETE
  - [x] Form UI and validation ready
  - [x] reCAPTCHA privacy notice on form
  - [ ] Create API types (types/api.ts) - PENDING
  - [ ] Create API service (services/contactApi.ts) - PENDING
  - [ ] Update CTAForm with API call - PENDING
  - [ ] Add error handling for all error codes - PENDING
  - [ ] Test with live backend - PENDING

### Phase 3: Testing

- [ ] **Local Testing**
  - [ ] Test form validation
  - [ ] Test reCAPTCHA token generation
  - [ ] Test API call with mock/local API
  - [ ] Test error handling (network errors, API errors)
  - [ ] Test rate limiting
  - [ ] Test cookie notice flow

- [ ] **Integration Testing**
  - [ ] Test form submission end-to-end
  - [ ] Verify email delivery
  - [ ] Verify DynamoDB logging
  - [ ] Test on all 6 service pages
  - [ ] Test on mobile devices
  - [ ] Test with slow network

### Phase 4: Deployment

- [ ] **Frontend Deployment**
  - [ ] Add production environment variables
  - [ ] Build production bundle
  - [ ] Deploy to hosting
  - [ ] Verify reCAPTCHA works in production

- [ ] **Backend Deployment**
  - [ ] Request SES production access (if needed)
  - [ ] Configure custom domain (api.idevelop.tech)
  - [ ] Set up CloudWatch alarms
  - [ ] Test production API endpoint

### Phase 5: Monitoring

- [ ] Set up error tracking
- [ ] Monitor submission logs in DynamoDB
- [ ] Monitor email delivery rates
- [ ] Monitor reCAPTCHA scores for spam patterns
- [ ] Set up alerts for rate limit hits

---

## 8. Timeline Estimate

| Phase | Estimated Time | Dependencies |
|-------|----------------|--------------|
| Phase 1: Setup | 2-3 hours | reCAPTCHA credentials, AWS account |
| Phase 2: Frontend | 3-4 hours | Phase 1 complete |
| Phase 3: Testing | 2-3 hours | Phase 2 complete |
| Phase 4: Deployment | 1-2 hours | Phase 3 complete, SES approval |
| Phase 5: Monitoring | 1 hour | Phase 4 complete |
| **Total** | **9-13 hours** | |

---

## 9. Cost Estimate

### AWS Costs (Monthly)

| Service | Usage | Cost |
|---------|-------|------|
| Lambda | 1,000 invocations | ~$0.00 (free tier) |
| API Gateway | 1,000 requests | ~$0.00 (free tier) |
| DynamoDB | 1,000 reads/writes | ~$0.00 (free tier) |
| SES | 100 emails | ~$0.00 (free tier) |
| **Total** | Low traffic | **$0-5/month** |

### reCAPTCHA v3

- **Cost:** Free (up to 1M assessments/month)
- Expected usage: < 1,000 assessments/month

**Total Monthly Cost:** $0-5 (within AWS free tier for typical contact form usage)

---

## 10. Privacy & Compliance

### Required Disclosures

1. **Cookie Notice Banner**
   - Notify users of reCAPTCHA cookies
   - Provide accept/decline option
   - Link to Privacy Policy

2. **Privacy Policy Page**
   - List cookies used (reCAPTCHA cookies)
   - Explain purpose (spam protection)
   - Link to Google's Privacy Policy
   - User rights and contact information

3. **Form Disclosure**
   - "Protected by reCAPTCHA" notice on form
   - Links to Google Privacy Policy and Terms

### Data Handling

- **Personal Data Collected:** Name, email, message, IP address, user agent
- **Purpose:** Respond to inquiries, spam prevention
- **Storage:** DynamoDB (AWS), encrypted at rest
- **Retention:** 90 days (configurable via DynamoDB TTL)
- **Third Parties:** Google (reCAPTCHA), AWS (hosting)

---

## 11. Support & Troubleshooting

### Common Issues

**Issue:** reCAPTCHA script not loading
- **Solution:** Check SITE KEY in environment variables
- **Solution:** Verify cookie notice allows loading script

**Issue:** API returns 403 RECAPTCHA_FAILED
- **Solution:** Verify reCAPTCHA token is being sent
- **Solution:** Check SECRET KEY in backend
- **Solution:** Verify domain is registered in reCAPTCHA admin

**Issue:** Emails not delivered
- **Solution:** Check SES sandbox mode (verify recipient email)
- **Solution:** Request SES production access
- **Solution:** Verify domain in SES

**Issue:** Rate limit hit too quickly
- **Solution:** Adjust rate limits in backend configuration
- **Solution:** Check for multiple users behind same IP (corporate network)

### Monitoring Queries

**DynamoDB - Check recent submissions:**
```

Scan or Query submissions table, sort by timestamp DESC

```

**CloudWatch - Lambda errors:**
```

Filter pattern: [ERROR] or [Exception]

```

**SES - Email delivery stats:**
```

Check SES dashboard for bounce/complaint rates

```

---

## 12. Future Enhancements

**Potential improvements after initial launch:**

1. **Admin Dashboard**
   - View all submissions in web interface
   - Mark as read/responded
   - Search and filter submissions

2. **Auto-categorization**
   - Use AI to categorize inquiries
   - Auto-assign to appropriate service category

3. **Response Templates**
   - Pre-written responses for common questions
   - Faster reply times

4. **Analytics**
   - Track conversion rates by service
   - Identify most popular services
   - A/B test form variations

5. **Multi-language Support**
   - Detect user language
   - Provide forms in multiple languages

---

## 13. Contact & Support

**Implementation Support:**
- Claude Code sessions for frontend/backend implementation
- Reference this document for all specifications

**AWS Support:**
- SES production access: https://aws.amazon.com/ses/
- SST Discord: https://discord.gg/sst

**reCAPTCHA Support:**
- reCAPTCHA Admin: https://www.google.com/recaptcha/admin
- Documentation: https://developers.google.com/recaptcha/docs/v3

---

## Appendix A: File Locations Reference

```

/idevelop.tech/ (frontend)
├── docs/
│ └── CTA-FORM-IMPLEMENTATION-PLAN.md # This document
├── src/
│ ├── types/
│ │ └── api.ts # API types (NEW)
│ ├── services/
│ │ └── contactApi.ts # API client (NEW)
│ ├── composables/
│ │ └── useRecaptcha.ts # reCAPTCHA (NEW)
│ ├── components/
│ │ └── ui/
│ │ ├── CTAForm.vue # UPDATE
│ │ └── CookieNotice.vue # NEW
│ ├── views/
│ │ └── PrivacyView.vue # NEW
│ └── router/
│ └── index.ts # UPDATE (add /privacy)
├── .env.development # NEW (gitignored)
├── .env.production # NEW (gitignored)
└── index.html # UPDATE (reCAPTCHA script)

/idevelop-api/ (backend - separate repo)
├── sst.config.ts
├── packages/
│ └── functions/
│ └── src/
│ ├── contact.ts
│ ├── validation.ts
│ ├── recaptcha.ts
│ ├── rateLimit.ts
│ ├── email.ts
│ ├── database.ts
│ └── types.ts
└── README.md

```

---

**Document Status:** Ready for implementation
**Next Step:** Obtain reCAPTCHA credentials (see Section 2)
```
