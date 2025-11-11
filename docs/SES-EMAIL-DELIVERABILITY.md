# SES Email Deliverability Setup

**Status:** ✅ Complete (Implemented 2025-11-11)
**Priority:** Medium
**Completion Time:** 45 minutes

---

## Overview

This document outlines how to improve email deliverability for the contact form by configuring DKIM, SPF, and DMARC records for AWS SES.

**Current Status:**
- ✅ SES configured and sending emails
- ✅ Email identity verified: `matt@idevelop.tech`
- ✅ **DKIM configured** (3 CNAME records, verified by SES)
- ✅ **SPF configured** (Google Workspace + AWS SES)
- ✅ **DMARC configured** (monitor mode, reports to matt@idevelop.tech)
- ✅ Domain-level authentication complete

**Why This Matters:**
- Improves email deliverability (reduces spam folder placement)
- Authenticates emails as legitimately from idevelop.tech
- Builds sender reputation
- Required by some email providers (Gmail, Outlook, etc.)

---

## Prerequisites

- AWS SES configured (✅ Complete)
- Access to DNS management for idevelop.tech
- Domain ownership verification

---

## Step 1: Configure DKIM in SES

DKIM (DomainKeys Identified Mail) cryptographically signs your emails to prove they came from your domain.

### Enable DKIM for Domain

```bash
# Verify domain identity in SES (if not already done)
aws ses verify-domain-identity \
  --domain idevelop.tech \
  --profile idevelop-tech \
  --region us-east-1

# Enable DKIM for domain
aws ses set-identity-dkim-enabled \
  --identity idevelop.tech \
  --dkim-enabled \
  --profile idevelop-tech \
  --region us-east-1

# Get DKIM tokens
aws ses get-identity-dkim-attributes \
  --identities idevelop.tech \
  --profile idevelop-tech \
  --region us-east-1
```

### Add DKIM DNS Records

SES will provide 3 CNAME records to add to your DNS:

**Example output:**
```json
{
  "DkimAttributes": {
    "idevelop.tech": {
      "DkimEnabled": true,
      "DkimVerificationStatus": "Pending",
      "DkimTokens": [
        "token1example",
        "token2example",
        "token3example"
      ]
    }
  }
}
```

**Add these CNAME records to Route 53 or your DNS provider:**

| Name | Type | Value |
|------|------|-------|
| `token1example._domainkey.idevelop.tech` | CNAME | `token1example.dkim.amazonses.com` |
| `token2example._domainkey.idevelop.tech` | CNAME | `token2example.dkim.amazonses.com` |
| `token3example._domainkey.idevelop.tech` | CNAME | `token3example.dkim.amazonses.com` |

**Via Route 53 (if using Route 53):**
```bash
# SST/Pulumi can add these automatically, or use AWS CLI
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --change-batch file://dkim-records.json \
  --profile idevelop-tech
```

### Verify DKIM Status

```bash
aws ses get-identity-dkim-attributes \
  --identities idevelop.tech \
  --profile idevelop-tech \
  --region us-east-1
```

**Wait for:** `"DkimVerificationStatus": "Success"`

---

## Step 2: Configure SPF Record

SPF (Sender Policy Framework) authorizes AWS SES to send emails on behalf of your domain.

### Add SPF TXT Record to DNS

**Record:**
| Name | Type | Value | TTL |
|------|------|-------|-----|
| `idevelop.tech` | TXT | `v=spf1 include:amazonses.com ~all` | 300 |

**Explanation:**
- `v=spf1` - SPF version 1
- `include:amazonses.com` - Allow Amazon SES to send
- `~all` - Soft fail for others (mark as suspicious but don't reject)

**If you already have an SPF record:**
Merge it: `v=spf1 include:amazonses.com include:otherprovider.com ~all`

### Verify SPF

```bash
dig idevelop.tech TXT +short | grep spf
```

**Expected output:**
```
"v=spf1 include:amazonses.com ~all"
```

---

## Step 3: Configure DMARC Record

DMARC (Domain-based Message Authentication, Reporting and Conformance) tells email providers what to do with emails that fail SPF/DKIM checks.

### Add DMARC TXT Record to DNS

**Record:**
| Name | Type | Value | TTL |
|------|------|-------|-----|
| `_dmarc.idevelop.tech` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc@idevelop.tech` | 300 |

**Explanation:**
- `v=DMARC1` - DMARC version 1
- `p=none` - Policy: Monitor only (don't reject or quarantine)
- `rua=mailto:dmarc@idevelop.tech` - Send aggregate reports here

**For stricter policy (after testing):**
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@idevelop.tech; pct=10
```

### Verify DMARC

```bash
dig _dmarc.idevelop.tech TXT +short
```

**Expected output:**
```
"v=DMARC1; p=none; rua=mailto:dmarc@idevelop.tech"
```

---

## Step 4: Verify noreply@idevelop.tech

Currently using `matt@idevelop.tech` as FROM address. For production, set up a dedicated noreply address.

### Verify Email Identity

```bash
aws ses verify-email-identity \
  --email-address noreply@idevelop.tech \
  --profile idevelop-tech \
  --region us-east-1
```

### Update Lambda Configuration

After verification, update `sst.config.ts`:

```typescript
SES_FROM_EMAIL: "noreply@idevelop.tech"
```

Then redeploy:

```bash
npx sst deploy --stage production
```

---

## Step 5: Request SES Production Access

**Current:** SES is in sandbox mode (can only send to verified addresses)
**For Production:** Request production access to send to any email address

### Request Access

1. Visit: https://console.aws.amazon.com/ses/home?region=us-east-1#/account
2. Click "Request production access"
3. Fill out form:
   - **Mail Type:** Transactional
   - **Website URL:** https://idevelop.tech
   - **Use Case Description:**
     ```
     Contact form for professional services website (idevelop.tech).
     Users submit inquiries about web development, cloud consulting, and integration services.
     Emails are sent from noreply@idevelop.tech to matt@idevelop.tech.
     Expected volume: <50 emails/month.
     No bulk emailing or marketing - only transactional contact form submissions.
     ```
   - **Compliance:** Contact forms only, no marketing
   - **Bounce/Complaint Handling:** Manual monitoring via SES console

4. Wait for approval (24-48 hours typically)

### Check Production Status

```bash
aws ses get-account-sending-enabled \
  --profile idevelop-tech \
  --region us-east-1
```

---

## Step 6: Test Email Deliverability

### Test Tools

1. **Mail-Tester:** https://www.mail-tester.com
   - Submit contact form with mail-tester address
   - Get deliverability score (aim for 9+/10)

2. **MXToolbox:** https://mxtoolbox.com/SuperTool.aspx
   - Check SPF: `nslookup -type=txt idevelop.tech`
   - Check DKIM: `nslookup -type=txt token1._domainkey.idevelop.tech`
   - Check DMARC: `nslookup -type=txt _dmarc.idevelop.tech`

3. **Google Postmaster Tools:** https://postmaster.google.com
   - Monitor Gmail deliverability
   - Track sender reputation

### Send Test Emails

Test to various providers:
- Gmail
- Outlook/Hotmail
- Yahoo Mail
- ProtonMail
- Corporate email (if available)

**Check:**
- ✅ Lands in inbox (not spam)
- ✅ DKIM signature present
- ✅ SPF passes
- ✅ DMARC passes

---

## Monitoring & Maintenance

### SES Metrics to Monitor

```bash
# Check sending statistics
aws ses get-send-statistics \
  --profile idevelop-tech \
  --region us-east-1

# Check bounce rate
aws cloudwatch get-metric-statistics \
  --namespace AWS/SES \
  --metric-name Bounce \
  --start-time 2025-11-01T00:00:00Z \
  --end-time 2025-11-09T23:59:59Z \
  --period 86400 \
  --statistics Sum \
  --profile idevelop-tech \
  --region us-east-1
```

### SES Console Monitoring

Visit: https://console.aws.amazon.com/ses/home?region=us-east-1#/account

**Monitor:**
- Bounce rate (keep < 5%)
- Complaint rate (keep < 0.1%)
- Sending reputation
- Blacklist status

### Set Up CloudWatch Alarms

```bash
# Alert on high bounce rate
aws cloudwatch put-metric-alarm \
  --alarm-name ses-high-bounce-rate \
  --alarm-description "Alert when SES bounce rate > 5%" \
  --metric-name Bounce \
  --namespace AWS/SES \
  --statistic Average \
  --period 3600 \
  --evaluation-periods 1 \
  --threshold 0.05 \
  --comparison-operator GreaterThanThreshold \
  --profile idevelop-tech \
  --region us-east-1
```

---

## Troubleshooting

### Issue: DKIM Verification Pending

**Cause:** DNS records not propagated or incorrect

**Solution:**
```bash
# Check DKIM DNS records
dig token1._domainkey.idevelop.tech CNAME +short

# Should return: token1.dkim.amazonses.com
```

### Issue: Emails Going to Spam

**Possible causes:**
1. SPF/DKIM/DMARC not configured
2. No email sending history (new domain)
3. Content triggers spam filters
4. Blacklisted IP (rare with SES)

**Solutions:**
1. Configure all authentication records
2. Build sending reputation gradually
3. Avoid spam trigger words in email content
4. Monitor SES reputation dashboard

### Issue: SPF Record Conflicts

**Cause:** Multiple SPF records (not allowed)

**Solution:** Merge into one record:
```
v=spf1 include:amazonses.com include:otherprovider.com ~all
```

---

## Quick Reference Commands

```bash
# Verify domain DKIM status
aws ses get-identity-dkim-attributes --identities idevelop.tech --profile idevelop-tech --region us-east-1

# Check SPF record
dig idevelop.tech TXT +short | grep spf

# Check DMARC record
dig _dmarc.idevelop.tech TXT +short

# List verified identities
aws ses list-verified-email-addresses --profile idevelop-tech --region us-east-1

# Check SES sending statistics
aws ses get-send-statistics --profile idevelop-tech --region us-east-1
```

---

## Timeline for Implementation

**Estimated:** 30-60 minutes

1. Enable DKIM (5 min)
2. Add DKIM DNS records (10 min)
3. Add SPF DNS record (5 min)
4. Add DMARC DNS record (5 min)
5. Wait for DNS propagation (5-30 min)
6. Verify all records (5 min)
7. Test deliverability (10 min)

**Total:** 45-70 minutes (including DNS propagation)

---

## Next Steps

After completing this setup:
1. Monitor email deliverability for 1-2 weeks
2. Review DMARC reports
3. Adjust DMARC policy to `p=quarantine` or `p=reject` after confidence
4. Set up automated monitoring/alerts
5. Document any issues and resolutions

---

## Implementation Results (2025-11-11)

### ✅ What Was Configured

**1. SPF Record:**
```
idevelop.tech   TXT   "v=spf1 include:_spf.google.com include:amazonses.com ~all"
```
- Authorizes Google Workspace and AWS SES to send as @idevelop.tech
- Benefits both manual Gmail emails and automated SES contact form emails

**2. DMARC Record:**
```
_dmarc.idevelop.tech   TXT   "v=DMARC1; p=none; rua=mailto:matt@idevelop.tech; pct=100; adkim=r; aspf=r"
```
- Policy: Monitor mode (p=none)
- Weekly aggregate reports sent to matt@idevelop.tech
- Relaxed alignment for both DKIM and SPF

**3. AWS SES DKIM (3 CNAME Records):**
```
mlffkq53gmbwxwhib265ib36svvffe7y._domainkey.idevelop.tech   CNAME   mlffkq53gmbwxwhib265ib36svvffe7y.dkim.amazonses.com
b7k3gsqzqlw2kdup7wzuyupfevmy3gpx._domainkey.idevelop.tech   CNAME   b7k3gsqzqlw2kdup7wzuyupfevmy3gpx.dkim.amazonses.com
sdp6367nbdutybgskmm2mopp77dsttpd._domainkey.idevelop.tech   CNAME   sdp6367nbdutybgskmm2mopp77dsttpd.dkim.amazonses.com
```
- SES DKIM Status: SUCCESS (verified)
- RSA-2048 signing keys
- Domain-level DKIM enabled for all @idevelop.tech addresses via SES

### 📊 Verification Status

- ✅ All DNS records live and propagated
- ✅ AWS SES DKIM verification: SUCCESS
- ✅ SPF record resolves correctly
- ✅ DMARC record resolves correctly
- ✅ All 3 DKIM CNAME records resolving to AWS

### 🎯 Benefits Achieved

**For Gmail (Manual Emails):**
- Now pass SPF authentication (was failing before)
- Now pass DMARC checks (was failing before)
- Improved inbox delivery

**For SES (Contact Form):**
- Full email authentication (SPF + DKIM + DMARC)
- Professional domain-level authentication
- Maximum deliverability

**For Domain:**
- Protection against email spoofing
- Visibility into all email activity via DMARC reports
- Improved sender reputation

### 📧 DMARC Reports

Weekly aggregate reports will be sent to matt@idevelop.tech showing:
- Email volume from @idevelop.tech domain
- Pass/fail rates for SPF and DKIM
- Source IPs and sending services
- Any unauthorized spoofing attempts

---

**Status:** ✅ Complete and Operational
**Implemented:** 2025-11-11
**Reference:** https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication.html
