# AWS SES Sandbox vs Production Access

## The Problem

By default, AWS SES accounts start in **sandbox mode** with strict limitations:

- ✅ **CAN send FROM**: Verified email addresses/domains only
- ✅ **CAN send TO**: Verified email addresses/domains only
- ❌ **CANNOT send TO**: Random customer email addresses (unverified)
- 📊 **Sending limit**: 200 emails per 24 hours, 1 email per second

This breaks the contact form use case where:
1. Random customers submit the form with their email
2. We want to send them a confirmation email
3. We want to BCC ourselves for tracking

**The customer's email will NEVER be verified**, so SES rejects the send in sandbox mode.

## The Solution: Request Production Access

Moving out of sandbox mode allows you to:
- ✅ Send to ANY email address (verified or not)
- ✅ Higher sending limits (50,000 emails per day initially)
- ✅ Maintain verified FROM addresses for sender reputation

### How to Request Production Access

1. **Open AWS Console**
   - Navigate to: SES → Account dashboard
   - Click: "Request production access" button

2. **Fill Out the Form**
   - **Mail type**: Transactional
   - **Website URL**: `https://idevelop.tech`
   - **Use case description**:
     ```
     Transactional email system for business website contact form.

     When potential customers submit our contact form, we send them:
     1. Confirmation email acknowledging their inquiry
     2. Details of their submission for their records
     3. Expected response timeline

     We also BCC ourselves to track conversations in our email client.

     Emails are sent from our verified domain (idevelop.tech) to customer
     email addresses (which cannot be pre-verified as they are prospects).

     Expected volume: < 100 emails per day
     Rate limiting: 5 submissions per IP per hour, 10 per email per 24h
     reCAPTCHA v3 verification on all submissions to prevent abuse
     ```
   - **Compliance acknowledgment**: Check the box confirming you'll only send to recipients who expect email
   - **Bounce/complaint handling**: Describe your process (we handle via SES notifications)

3. **Submit and Wait**
   - Usually approved within **24 hours**
   - AWS may ask follow-up questions via support ticket
   - You'll receive email notification when approved

4. **Verify Approval**
   - SES → Account dashboard
   - Check "Account status" shows **Production** (not Sandbox)

## Code Changes Required

The contact form Lambda function (`packages/functions/src/contact.ts`) has been updated to use the correct pattern:

### Before (Broken in Sandbox)
```typescript
Destination: {
  ToAddresses: [email, SES_TO_EMAIL], // Both customer and admin in TO field
}
```
**Problem**: SES rejects if `email` (customer) is not verified

### After (Works in Production)
```typescript
Destination: {
  ToAddresses: [email],           // Customer receives email
  BccAddresses: [SES_TO_EMAIL],   // Admin gets BCC copy
}
```
**Result**:
- Customer receives confirmation email
- Admin receives BCC copy for tracking
- Customer can reply (goes to `ReplyToAddresses`)
- Creates conversation thread in admin's email client

## Temporary Workaround for Testing (Sandbox Only)

If you need to test before production access is approved:

1. **Verify test email addresses in SES**
   - SES → Verified identities → Create identity
   - Add test email addresses (e.g., `matt.lucian+test@gmail.com`)
   - Confirm verification emails

2. **Use verified test addresses**
   - Only submit contact form with verified addresses
   - Both TO and BCC addresses must be verified

3. **Remove test addresses after production approval**
   - No longer needed once out of sandbox

## Monitoring After Production Approval

Once in production, monitor:

1. **Bounce rate**: Should be < 5%
   - High bounce rate can trigger suspension
   - Implement bounce notifications and remove bad addresses

2. **Complaint rate**: Should be < 0.1%
   - Complaints come from "Mark as spam" clicks
   - Ensure you only email people who expect it

3. **Sending limits**
   - Monitor daily send volume
   - Request limit increases if needed via support ticket

## Related Files

- `packages/functions/src/contact.ts` - Lambda handler with BCC implementation
- `sst.config.ts` - SES email configuration and permissions
- `docs/SES-EMAIL-DELIVERABILITY.md` - Email deliverability best practices

## References

- [AWS SES Sandbox Documentation](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
- [Moving out of SES Sandbox](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
