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
