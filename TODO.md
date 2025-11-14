# TODO

Active tasks and pending work for idevelop.tech.

---

## Custom Domain Migration

**Blocked by**: AWS SES production access approval

**Tasks**:
- [ ] Confirm AWS SES production access granted
- [ ] Update `sst.config.ts` to enable custom domain for production
- [ ] Deploy to production (triggers certificate request and DNS setup)
- [ ] Verify certificate validation complete
- [ ] Update DNS records at registrar to point to CloudFront
- [ ] Wait for DNS propagation (~5-30 minutes)
- [ ] Test https://idevelop.tech loads correctly
- [ ] Verify SSL certificate valid
- [ ] Test contact form with production domain
- [ ] Update `.env.production` with production domain URLs (if needed)
- [ ] Monitor CloudFront metrics for 24 hours

**Current State**:
- Production site: https://dxeay6n8brs8g.cloudfront.net
- Target domain: https://idevelop.tech

---

## Post-Launch Monitoring (Optional)

**Status**: TBD - Deciding on monitoring solution

**Options**:
- DataDog Lambda monitoring (dev environment first)
- Alternative monitoring solution
- Cost evaluation needed

**Tasks** (once decided):
- [ ] Choose monitoring solution
- [ ] Set up monitoring on dev environment
- [ ] Verify monitoring works correctly
- [ ] Deploy to production if satisfied
- [ ] Configure alerts for Lambda errors, high latency, etc.

**Note**: May be completed before or after domain migration depending on priority.
