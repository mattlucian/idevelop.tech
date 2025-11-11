# Phase 5: Backend API Setup Instructions

**Last Updated:** 2025-11-09
**Status:** ✅ COMPLETE - Backend API Deployed and Tested

---

## Overview

The backend API infrastructure has been implemented. This document outlines the **manual AWS setup steps** required before deploying.

**What's been automated (via SST):**
- ✅ API Gateway HTTP API
- ✅ Lambda function deployment
- ✅ DynamoDB table creation
- ✅ IAM permissions configuration

**What you need to do manually:**
- ⚠️ Configure reCAPTCHA secret in SSM Parameter Store
- ⚠️ Verify SES email identities (noreply@idevelop.tech and matt@idevelop.tech)
- ⚠️ (Optional) Request SES production access

---

## Prerequisites

Before starting, ensure you have:

1. **AWS SSO configured and logged in:**
   ```bash
   aws sso login --profile idevelop-tech
   export AWS_PROFILE=idevelop-tech
   ```

2. **reCAPTCHA secret key** from Google reCAPTCHA admin console:
   - Visit: https://www.google.com/recaptcha/admin
   - Find your site: `6Lc2tf0rAAAAADcg5fae_hlq6hWoUUdtu_CQsjcw`
   - Copy the **Secret Key** (NOT the site key)

---

## Step 1: Store reCAPTCHA Secret in SSM Parameter Store

The Lambda function needs to verify reCAPTCHA tokens. Store the secret key securely in AWS SSM.

### For Development Stage

```bash
aws ssm put-parameter \
  --name "/idevelop-tech/dev/recaptcha-secret" \
  --value "YOUR_RECAPTCHA_SECRET_KEY_HERE" \
  --type "SecureString" \
  --profile idevelop-tech \
  --region us-east-1
```

### For Production Stage

```bash
aws ssm put-parameter \
  --name "/idevelop-tech/production/recaptcha-secret" \
  --value "YOUR_RECAPTCHA_SECRET_KEY_HERE" \
  --type "SecureString" \
  --profile idevelop-tech \
  --region us-east-1
```

### Verify Parameters Were Created

```bash
# Check dev parameter
aws ssm get-parameter \
  --name "/idevelop-tech/dev/recaptcha-secret" \
  --with-decryption \
  --profile idevelop-tech \
  --region us-east-1

# Check production parameter
aws ssm get-parameter \
  --name "/idevelop-tech/production/recaptcha-secret" \
  --with-decryption \
  --profile idevelop-tech \
  --region us-east-1
```

**Expected output:**
```json
{
    "Parameter": {
        "Name": "/idevelop-tech/production/recaptcha-secret",
        "Type": "SecureString",
        "Value": "6Lc2tf0rAAAAAB...",
        "Version": 1,
        "ARN": "arn:aws:ssm:us-east-1:996725884498:parameter/idevelop-tech/production/recaptcha-secret"
    }
}
```

---

## Step 2: Verify SES Email Identities

AWS SES requires email address verification before sending emails.

### Verify noreply@idevelop.tech (FROM address)

```bash
aws ses verify-email-identity \
  --email-address noreply@idevelop.tech \
  --profile idevelop-tech \
  --region us-east-1
```

**Action required:** Check the inbox for `noreply@idevelop.tech` and click the verification link in the email from AWS.

### Verify matt@idevelop.tech (TO address)

```bash
aws ses verify-email-identity \
  --email-address matt@idevelop.tech \
  --profile idevelop-tech \
  --region us-east-1
```

**Action required:** Check the inbox for `matt@idevelop.tech` and click the verification link in the email from AWS.

### Check Verification Status

```bash
aws ses list-verified-email-addresses \
  --profile idevelop-tech \
  --region us-east-1
```

**Expected output:**
```json
{
    "VerifiedEmailAddresses": [
        "noreply@idevelop.tech",
        "matt@idevelop.tech"
    ]
}
```

---

## Step 3: (Optional) Request SES Production Access

By default, AWS SES operates in **sandbox mode**, which:
- ✅ Allows sending to verified email addresses only
- ❌ Blocks sending to unverified recipients
- ❌ Has sending limits (200 emails/day, 1 email/second)

### For Testing (Sandbox Mode is Fine)

If you're just testing the contact form, **sandbox mode is sufficient** as long as:
- `noreply@idevelop.tech` is verified (FROM address)
- `matt@idevelop.tech` is verified (TO address)

The contact form will work perfectly for testing.

### For Production (Request Production Access)

To receive emails from **any** user (not just verified addresses):

1. **Request production access:**
   - Visit: https://console.aws.amazon.com/ses/home?region=us-east-1#/account
   - Click "Request production access"
   - Fill out the form:
     - **Mail Type:** Transactional
     - **Website URL:** https://idevelop.tech
     - **Use Case Description:**
       ```
       This is a contact form for my professional services website (idevelop.tech).
       Users submit inquiries about web development, cloud consulting, and integration services.
       Emails are sent from noreply@idevelop.tech to matt@idevelop.tech.
       Expected volume: <50 emails/month.
       ```
     - **Opt-out process:** Not applicable (single recipient, no mailing lists)
     - **Bounce/complaint handling:** Manual monitoring via AWS SES console

2. **Wait for approval:** Usually takes 24-48 hours

3. **Verify approval:**
   ```bash
   aws ses get-account-sending-enabled \
     --profile idevelop-tech \
     --region us-east-1
   ```

---

## Step 4: Deploy the Backend with SST

Once the manual setup is complete, deploy the infrastructure.

### Deploy to Development Stage (Personal Testing)

```bash
# Ensure AWS profile is set
export AWS_PROFILE=idevelop-tech

# Start SST dev mode (creates personal dev environment)
npm run dev
```

**What this does:**
- Creates a personal dev stage (e.g., `dev-matt`)
- Deploys Lambda function, API Gateway, and DynamoDB table
- Provides live Lambda function URLs
- Hot-reloads Lambda code on changes

### Deploy to Production Stage

```bash
# Ensure AWS profile is set
export AWS_PROFILE=idevelop-tech

# Deploy to production
npx sst deploy --stage production
```

**What this does:**
- Deploys Lambda function, API Gateway, and DynamoDB to production
- Updates CloudFront distribution with API URL
- Returns API Gateway URL for testing

### View Deployment Outputs

```bash
npx sst outputs --stage production
```

**Expected outputs:**
```json
{
  "web": "https://dxeay6n8brs8g.cloudfront.net",
  "api": "https://abcd1234.execute-api.us-east-1.amazonaws.com",
  "stage": "production"
}
```

---

## Step 5: Test the Contact Form

### Local Testing (SST Dev Mode)

1. **Start SST dev mode (in one terminal):**
   ```bash
   export AWS_PROFILE=idevelop-tech
   npm run dev
   ```

2. **Start frontend dev server (in another terminal):**
   ```bash
   cd packages/web
   npm run dev
   ```

3. **Open browser:** http://localhost:5173

4. **Navigate to "Hire Me" page** and submit the contact form

5. **Check Lambda logs:**
   - Look in the terminal running `npm run dev`
   - You'll see real-time logs from the Lambda function

6. **Verify email received:** Check `matt@idevelop.tech` inbox

### Production Testing

1. **Deploy to production:**
   ```bash
   export AWS_PROFILE=idevelop-tech
   npx sst deploy --stage production
   ```

2. **Visit production site:** https://dxeay6n8brs8g.cloudfront.net

3. **Navigate to "Hire Me"** and submit the contact form

4. **Verify email received:** Check `matt@idevelop.tech` inbox

5. **Check CloudWatch logs:**
   ```bash
   aws logs tail /aws/lambda/idevelop-tech-production-ContactHandler \
     --follow \
     --profile idevelop-tech \
     --region us-east-1
   ```

---

## Step 6: Test Error Scenarios

### Test Rate Limiting

1. Submit the contact form **6 times in a row** from the same IP
2. **Expected:** 6th submission should fail with:
   ```json
   {
     "success": false,
     "error": {
       "code": "RATE_LIMIT_EXCEEDED",
       "message": "Too many requests from this IP. Limit: 5 requests per hour"
     }
   }
   ```

### Test Invalid Email

1. Submit form with invalid email (e.g., `test@invalid`)
2. **Expected:** Browser validation should catch this
3. If browser validation is disabled, API should return:
   ```json
   {
     "success": false,
     "error": {
       "code": "INVALID_EMAIL",
       "message": "Invalid email address format"
     }
   }
   ```

### Test reCAPTCHA Failure

This is hard to test manually, but the Lambda function will return:
```json
{
  "success": false,
  "error": {
    "code": "RECAPTCHA_FAILED",
    "message": "reCAPTCHA verification failed"
  }
}
```

---

## Troubleshooting

### Issue: Lambda function fails with "reCAPTCHA secret not found"

**Cause:** SSM parameter not created or wrong stage name

**Solution:**
```bash
# Check if parameter exists
aws ssm get-parameter \
  --name "/idevelop-tech/production/recaptcha-secret" \
  --profile idevelop-tech \
  --region us-east-1

# If not found, create it (see Step 1)
```

### Issue: SES email not sending

**Possible causes:**
1. Email addresses not verified
2. SES in sandbox mode and recipient not verified
3. SES region mismatch

**Solution:**
```bash
# 1. Check verified email addresses
aws ses list-verified-email-addresses \
  --profile idevelop-tech \
  --region us-east-1

# 2. Check SES sending status
aws ses get-send-quota \
  --profile idevelop-tech \
  --region us-east-1

# 3. Verify SES region is us-east-1
```

### Issue: CORS errors in browser console

**Cause:** Frontend origin not in API Gateway CORS allowlist

**Solution:**
- Check `sst.config.ts` CORS configuration
- Ensure your frontend origin is included:
  - Development: `http://localhost:5173`
  - Production: `https://dxeay6n8brs8g.cloudfront.net`

### Issue: DynamoDB rate limiting not working

**Cause:** DynamoDB table permissions or TTL not enabled

**Solution:**
```bash
# Check DynamoDB table
aws dynamodb describe-table \
  --table-name idevelop-tech-production-RateLimitTable \
  --profile idevelop-tech \
  --region us-east-1
```

### Issue: Lambda function times out

**Cause:** External API calls (reCAPTCHA, SES) taking too long

**Solution:**
- Check CloudWatch logs for slow operations
- Increase Lambda timeout in `sst.config.ts` (currently 10 seconds)

---

## Security Checklist

Before deploying to production:

- [ ] reCAPTCHA secret stored in SSM (not hardcoded)
- [ ] SES email identities verified
- [ ] CORS origins restricted to production domains
- [ ] Rate limiting configured and tested
- [ ] Lambda IAM permissions follow least privilege
- [ ] No secrets in environment variables
- [ ] CloudWatch logging enabled for debugging

---

## Cost Estimate

**Monthly cost for Phase 5 backend:**

| Service | Usage | Cost |
|---------|-------|------|
| Lambda | ~100 requests/month, 512MB, 2s avg | $0.00 (free tier) |
| API Gateway | ~100 requests/month | $0.00 (free tier) |
| DynamoDB | ~100 writes, minimal storage | $0.00 (free tier) |
| SES | ~50 emails/month | $0.00 (free tier: 1000 emails/month via Lambda) |
| SSM Parameters | 2 parameters | $0.00 (free tier) |

**Total:** $0.00/month (well within AWS free tier)

---

## Next Steps (Phase 6)

After successful deployment and testing:

1. ✅ Mark Phase 5 complete
2. ⏭️ Move to **Phase 6: Testing and Validation**
   - Manual testing on all pages
   - Cross-browser testing
   - Performance testing
   - Security testing
3. ⏭️ **Phase 7: Custom Domain Migration**
   - Point idevelop.tech to CloudFront
   - Enable custom domain in `sst.config.ts`
4. ⏭️ **Phase 8: Final Security Audit & Make Repository Public**

---

## Reference Files

**Infrastructure:**
- `sst.config.ts` - SST configuration with all resources
- `packages/functions/src/contact.ts` - Lambda handler implementation
- `packages/core/src/types.ts` - Shared TypeScript types

**Frontend:**
- `packages/web/src/components/ui/CTAForm.vue` - Contact form component
- `packages/web/src/services/contactApi.ts` - API client service
- `packages/web/src/types/api.ts` - Frontend API types

**Documentation:**
- `docs/CTA-FORM-IMPLEMENTATION-PLAN.md` - Original implementation plan
- `docs/PROJECT-PLAN.md` - Overall project phases
- `docs/AWS-SETUP.md` - AWS SSO configuration guide

---

## Quick Command Reference

```bash
# Login to AWS
aws sso login --profile idevelop-tech
export AWS_PROFILE=idevelop-tech

# Store reCAPTCHA secret
aws ssm put-parameter \
  --name "/idevelop-tech/production/recaptcha-secret" \
  --value "YOUR_SECRET_HERE" \
  --type "SecureString" \
  --region us-east-1

# Verify SES emails
aws ses verify-email-identity --email-address noreply@idevelop.tech --region us-east-1
aws ses verify-email-identity --email-address matt@idevelop.tech --region us-east-1

# Deploy to development
npm run dev

# Deploy to production
npx sst deploy --stage production

# View outputs
npx sst outputs --stage production

# Tail Lambda logs
aws logs tail /aws/lambda/idevelop-tech-production-ContactHandler --follow --region us-east-1
```

---

## Deployment Results (2025-11-09)

### ✅ Completed Successfully

**Dev Environment:**
- Frontend: https://dev.idevelop.tech
- API: https://dev-api.idevelop.tech
- Contact form: ✅ Working - Email received successfully

**Resources Created:**
- ✅ Lambda Function (ContactHandler)
- ✅ API Gateway with custom domain
- ✅ DynamoDB Table (rate limiting)
- ✅ SES email sending (matt@idevelop.tech verified)
- ✅ SSL certificates for dev subdomains
- ✅ Route 53 DNS records

**Configuration:**
- reCAPTCHA v3: ✅ Working
- Rate limiting: ✅ Configured (5/hour per IP, 10/day per email)
- Email FROM: matt@idevelop.tech (temporary, will change to noreply@)
- Email TO: matt@idevelop.tech

### 📋 Follow-up Tasks

**For Production Deployment:**
1. Verify and configure `noreply@idevelop.tech` in SES
2. Update Lambda `SES_FROM_EMAIL` to use noreply address
3. Set up SES DKIM and SPF records for better deliverability
4. Request SES production access (if needed for non-verified recipients)
5. Deploy to production stage with `idevelop.tech` and `api.idevelop.tech` domains

**For Email Deliverability (Future):**
- Configure DKIM signing in SES
- Add SPF record to DNS: `v=spf1 include:amazonses.com ~all`
- Add DMARC record for email authentication
- Monitor SES bounce and complaint rates

---

**Status:** ✅ Phase 5 Complete - Ready for Phase 6 (Testing & Validation) 🚀
