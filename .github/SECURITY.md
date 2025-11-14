# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

**Email:** matt@idevelop.tech

Please **do not** use the public issue tracker for security vulnerabilities.

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Varies based on severity

## Supported Versions

Only the latest deployed version receives security updates. This is a portfolio website with continuous deployment from the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | ✅ |
| Older deployments | ❌ |

## Security Practices

This project follows security best practices:

- ✅ **No hardcoded secrets** - All sensitive data stored in AWS SSM or GitHub Secrets
- ✅ **AWS OIDC authentication** - No long-lived credentials in CI/CD
- ✅ **Environment variable separation** - Dev/production configs isolated
- ✅ **Dependency scanning** - Automated via Dependabot (monthly updates)
- ✅ **Code scanning** - CodeQL security analysis (weekly + on PRs)
- ✅ **TypeScript** - Type safety reduces certain vulnerability classes
- ✅ **CSP headers** - Content Security Policy for XSS protection (when deployed)
- ✅ **API security** - reCAPTCHA verification, rate limiting, input validation
- ✅ **Least-privilege IAM** - Scoped permissions for all AWS resources

## Known Public Information

The following information is intentionally public and not considered sensitive:

- AWS Account ID (996725884498) - Required for IAM role ARNs
- reCAPTCHA Site Key - Public key for frontend validation
- Google Analytics Measurement ID - Public tracking ID
- CloudFront distribution URLs - Public hosting endpoints

## Third-Party Dependencies

This project uses automated dependency scanning and updates via Dependabot. Security advisories for dependencies are monitored and addressed promptly.

## Infrastructure Security

- AWS resources deployed via Infrastructure as Code (SST)
- Least-privilege IAM policies
- CloudFront with HTTPS enforcement
- No direct server access required
