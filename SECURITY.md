# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| develop | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **Email**: matt@idevelop.tech
   - Subject: "[SECURITY] Brief description"
   - Include: Steps to reproduce, potential impact, suggested fix (if any)

2. **GitHub Security Advisories**:
   - https://github.com/mattlucian/idevelop.tech/security/advisories/new

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Fix timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Best effort

### Scope

**In scope**:
- AWS Lambda functions (API endpoints)
- Frontend (XSS, CSRF, injection attacks)
- Infrastructure configuration (IAM, secrets management)
- Dependency vulnerabilities
- Authentication/authorization issues

**Out of scope**:
- Social engineering attacks
- Physical security
- Denial of service (DoS) attacks
- Rate limiting bypasses (report via email for investigation)

## Security Measures

This project implements:

- **Dependency scanning**: Dependabot + npm audit
- **Code scanning**: CodeQL (weekly + on PRs)
- **Secret scanning**: GitHub Secret Scanning (automatic)
- **OIDC authentication**: No long-lived AWS credentials
- **Least-privilege IAM**: Scoped permissions for all resources
- **Rate limiting**: API endpoints protected against abuse
- **Input validation**: All user inputs validated and sanitized
- **reCAPTCHA**: Bot protection on contact forms

## Secure Development Practices

- All secrets stored in AWS SSM Parameter Store
- Environment variables limited to public configuration
- No hardcoded credentials in source code
- Regular security audits (quarterly)
- Dependency updates (monthly via Dependabot)
- GitHub branch protection rules enforced

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers in our release notes (with permission).
