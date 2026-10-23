# CloudPulse AWS Deployment Plan

## Goal
Host CloudPulse on AWS with automated CI/CD.

## Planned Architecture
- GitHub: Source code repository
- GitHub Actions: CI/CD pipeline
- Amazon S3: Static website files
- Amazon CloudFront: HTTPS delivery
- AWS IAM: Deployment permissions

## Deployment Requirements
- Existing CI validation must pass before deployment.
- Use secure, least-privilege AWS permissions.
- Verify account eligibility and pricing before creating resources.
- Do not deploy if charges could violate the zero-cost requirement.

## Current Status
- Website: Built
- GitHub repository: Available
- CI validation: Passing
- AWS deployment: Pending cost and account eligibility verification
## Deployment Blockers
- GitHub OIDC provider setup is unavailable in the current AWS console.
- No IAM deployment role has been created.
- No CloudFront distribution has been created.
- Deployment remains disabled until secure authentication and zero-cost hosting eligibility are verified.
