# AWS Setup Guide

**Last Updated:** 2025-11-07
**Status:** Complete and Tested

---

## Overview

This project uses AWS SSO (IAM Identity Center) for secure, credential-free access to AWS services across multiple accounts.

**Benefits:**
- ✅ No hardcoded access keys
- ✅ Temporary credentials (auto-expire)
- ✅ Multi-account support
- ✅ Centralized access management
- ✅ MFA support (if enabled by admin)

---

## Prerequisites

1. **AWS Organization with SSO enabled**
   - You must have access to an AWS Organization with IAM Identity Center configured
   - Your administrator should provide the SSO start URL

2. **AWS CLI installed**
   ```bash
   # Check if installed
   aws --version

   # Install on Mac
   brew install awscli

   # Install on Linux
   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
   unzip awscliv2.zip
   sudo ./aws/install
   ```

---

## One-Time Configuration

### Step 1: Configure AWS SSO

```bash
aws configure sso
```

### Step 2: Answer Prompts

```bash
SSO session name (Recommended): idevelop-tech-sso
# Any name works, but use something descriptive

SSO start URL [None]: https://d-xxxxxxxxxx.awsapps.com/start
# Your organization's SSO portal URL (ask your admin if unknown)

SSO region [None]: us-east-1
# The region where your Identity Center is configured

SSO registration scopes [sso:account:access]: [Press Enter]
# Just press Enter to use the default
```

### Step 3: Browser Authentication

- A browser window will open automatically
- Log in with your AWS SSO credentials
- Approve the AWS CLI access request
- Return to terminal

### Step 4: Select Account and Role

```bash
There are X AWS accounts available to you.
> I Develop Tech LLC (996725884498)
  Client Account Name (123456789012)
  [other accounts...]

# Select the account you want to use (arrow keys + Enter)

There are X roles available to you.
> AdministratorAccess
  PowerUserAccess
  DeveloperAccess

# Select the role (AdministratorAccess or PowerUserAccess recommended)

CLI default client Region [None]: us-east-1
CLI default output format [None]: json
CLI profile name [AdministratorAccess-996725884498]: idevelop-tech

# Give it a memorable profile name
```

### Step 5: Verify Configuration

```bash
# Login (required after configuration and when session expires)
aws sso login --profile idevelop-tech

# Verify it works
aws sts get-caller-identity --profile idevelop-tech
```

**Expected output:**
```json
{
    "UserId": "AROA...:your.email",
    "Account": "996725884498",
    "Arn": "arn:aws:sts::996725884498:assumed-role/AWSReservedSSO_AdministratorAccess_.../your.email"
}
```

---

## Daily Usage

### Login to AWS SSO

SSO sessions expire (typically after 8-12 hours). You'll need to re-authenticate:

```bash
# Login when session expires
aws sso login --profile idevelop-tech
```

**Signs your session expired:**
- Commands fail with "Unable to locate credentials"
- Commands fail with "ExpiredToken"

### Using the Profile

#### Option 1: Set Environment Variable (Recommended)

```bash
# Set for current terminal session
export AWS_PROFILE=idevelop-tech

# Now all AWS commands use this profile
aws s3 ls
npx sst deploy
```

#### Option 2: Prefix Each Command

```bash
# Use --profile flag
aws s3 ls --profile idevelop-tech

# Or set as environment variable per command
AWS_PROFILE=idevelop-tech npx sst deploy
```

---

## Configuration Files

AWS CLI stores configuration in:

### ~/.aws/config

```ini
[profile idevelop-tech]
sso_session = idevelop-tech-sso
sso_account_id = 996725884498
sso_role_name = AdministratorAccess
region = us-east-1
output = json

[sso-session idevelop-tech-sso]
sso_start_url = https://d-xxxxxxxxxx.awsapps.com/start
sso_region = us-east-1
sso_registration_scopes = sso:account:access
```

### ~/.aws/credentials

**Note:** This file should be **empty** or not exist when using SSO. Temporary credentials are stored in `~/.aws/sso/cache/`.

---

## Multiple Accounts (Client Work)

If you work with multiple AWS accounts (e.g., your business + client accounts):

### Configure Additional Profiles

```bash
# Configure second account
aws configure sso

# Use different names
SSO session name: client-name-sso
Profile name: client-name

# Select the client's AWS account when prompted
```

### Switch Between Accounts

```bash
# Your account
export AWS_PROFILE=idevelop-tech
npx sst deploy

# Client account
export AWS_PROFILE=client-name
npx sst deploy --stage client-staging
```

---

## GitHub Actions CI/CD Setup

This project uses GitHub Actions with AWS OIDC authentication for secure, credential-free deployments.

### Why OIDC Instead of Access Keys?

**Traditional approach (access keys):**
- ❌ Long-lived credentials stored in GitHub secrets
- ❌ Manual rotation required
- ❌ Security risk if leaked
- ❌ Hard to audit and manage

**OIDC approach:**
- ✅ No hardcoded credentials
- ✅ Temporary credentials (auto-expire)
- ✅ GitHub requests credentials from AWS at deploy time
- ✅ Fine-grained permissions per repository
- ✅ Easy to revoke and audit

### One-Time Setup (Already Completed)

The following steps have already been completed for this project:

#### 1. Created OIDC Identity Provider

```bash
AWS_PROFILE=idevelop-tech aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

**What this does:**
- Establishes trust between AWS and GitHub Actions
- Allows GitHub to request temporary AWS credentials
- Provider ARN: `arn:aws:iam::996725884498:oidc-provider/token.actions.githubusercontent.com`

#### 2. Created IAM Role for GitHub Actions

```bash
AWS_PROFILE=idevelop-tech aws iam create-role \
  --role-name GitHubActionsDeployRole \
  --assume-role-policy-document file:///tmp/github-oidc-trust-policy.json
```

**Trust policy** (`/tmp/github-oidc-trust-policy.json`):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::996725884498:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:mattlucian/idevelop.tech:*"
        }
      }
    }
  ]
}
```

**What this does:**
- Creates IAM role that GitHub Actions can assume
- Restricts access to specific repository (`mattlucian/idevelop.tech`)
- GitHub Actions can only assume role when deploying from this repo

#### 3. Attached Administrator Access Policy

```bash
AWS_PROFILE=idevelop-tech aws iam attach-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

**What this does:**
- Grants deployment permissions to the role
- Allows SST to create/update/delete infrastructure
- Role ARN: `arn:aws:iam::996725884498:role/GitHubActionsDeployRole`

#### 4. Configured GitHub Secret

```bash
gh secret set AWS_ROLE_ARN -b "arn:aws:iam::996725884498:role/GitHubActionsDeployRole"
```

**What this does:**
- Stores IAM role ARN in GitHub repository secrets
- Used by `.github/workflows/deploy-production.yml`
- Visible in: https://github.com/mattlucian/idevelop.tech/settings/secrets/actions

### How It Works

**On every push to main:**

1. GitHub Actions workflow triggers (`.github/workflows/deploy-production.yml`)
2. GitHub generates a JWT token proving the workflow is from `mattlucian/idevelop.tech`
3. Workflow calls AWS STS with the JWT token
4. AWS validates token against OIDC provider
5. AWS checks trust policy (repo must match `mattlucian/idevelop.tech`)
6. AWS issues temporary credentials (valid ~1 hour)
7. Workflow uses credentials to run `npx sst deploy --stage production`
8. Credentials expire after workflow completes

**Security benefits:**
- No credentials stored in GitHub (only role ARN, which is not secret)
- Credentials are temporary and automatically expire
- Can't be used outside GitHub Actions context
- Can only be used by specified repository

### Verifying Setup

Check that everything is configured:

```bash
# 1. Verify OIDC provider exists
AWS_PROFILE=idevelop-tech aws iam list-open-id-connect-providers

# 2. Verify IAM role exists
AWS_PROFILE=idevelop-tech aws iam get-role --role-name GitHubActionsDeployRole

# 3. Verify GitHub secret is set (shows metadata, not value)
gh secret list
```

### Adding Additional Repositories

To grant CI/CD access to other repositories:

```bash
# Update trust policy to include new repo
AWS_PROFILE=idevelop-tech aws iam update-assume-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::996725884498:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": [
            "repo:mattlucian/idevelop.tech:*",
            "repo:mattlucian/other-repo:*"
          ]
        }
      }
    }]
  }'
```

---

## Troubleshooting

### Issue: "Unable to locate credentials"

**Cause:** SSO session expired

**Solution:**
```bash
aws sso login --profile idevelop-tech
```

### Issue: "SSO start URL not found"

**Cause:** Missing SSO configuration

**Solution:**
```bash
# Reconfigure SSO
aws configure sso
```

### Issue: "No such file or directory: ~/.aws/sso/cache"

**Cause:** Never logged in before

**Solution:**
```bash
aws sso login --profile idevelop-tech
```

### Issue: Wrong account selected

**Cause:** Multiple profiles configured

**Solution:**
```bash
# Check current profile
echo $AWS_PROFILE

# List all profiles
aws configure list-profiles

# Switch profile
export AWS_PROFILE=idevelop-tech

# Verify correct account
aws sts get-caller-identity
```

---

## Security Best Practices

1. **Never commit credentials to git**
   - `.aws/` is already in `.gitignore`
   - Never share SSO tokens

2. **Use appropriate roles**
   - Development: PowerUserAccess or DeveloperAccess
   - Production deploys: AdministratorAccess

3. **Logout when done**
   ```bash
   # Not required, but good practice
   aws sso logout --profile idevelop-tech
   ```

4. **Rotate regularly**
   - SSO sessions auto-expire
   - No long-lived access keys to rotate

5. **Use MFA if available**
   - Enable in IAM Identity Center
   - Adds extra security layer

---

## SST-Specific Usage

### Deploy with SST

```bash
# Set profile
export AWS_PROFILE=idevelop-tech

# Deploy to staging
npx sst deploy --stage staging

# Deploy to production
npx sst deploy --stage production

# Or use inline
AWS_PROFILE=idevelop-tech npx sst deploy --stage staging
```

### SST Commands with SSO

All SST commands work with AWS_PROFILE:

```bash
export AWS_PROFILE=idevelop-tech

npx sst dev           # Start dev mode
npx sst deploy        # Deploy infrastructure
npx sst remove        # Remove infrastructure
npx sst console       # Open SST console
npx sst shell         # Run commands with SST context
```

---

## Additional Resources

- [AWS SSO Documentation](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
- [AWS CLI SSO Configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)
- [SST AWS Provider](https://sst.dev/docs/providers/aws)

---

## Quick Reference

```bash
# Configure SSO (one-time)
aws configure sso

# Login (when session expires)
aws sso login --profile idevelop-tech

# Set default profile
export AWS_PROFILE=idevelop-tech

# Verify
aws sts get-caller-identity

# Deploy with SST
npx sst deploy --stage staging
```
