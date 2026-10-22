# CloudPulse — Cloud Operations Dashboard

CloudPulse is a responsive front-end portfolio project that simulates a cloud operations dashboard. It demonstrates how an operations team might review service health, deployment outcomes, monitoring metrics, and incidents.

> **Important:** All dashboard metrics are simulated. The project does not connect to AWS, monitor real services, or perform deployments yet.

## Features

- Responsive dark-mode dashboard
- Service health inventory with Healthy, Warning, and Critical states
- Uptime and response-time chart with 24h, 7d, and 30d selectors
- Deployment history table
- Incident register with a demo-only Resolve action
- Global search across services, deployments, and incidents
- Architecture dialog showing the planned AWS CI/CD flow
- GitHub Actions CI workflow for basic project validation

## Run locally

1. Download or clone this repository.
2. Open the `cloudpulse` folder in VS Code.
3. Open `index.html` in your browser, or use the VS Code Live Server extension.
4. Try the sidebar, search box, chart range selector, incident Resolve button, and View Architecture dialog.

No build tools or external JavaScript packages are required to run the website.

## Project structure

```text
cloudpulse/
├── index.html
├── css/style.css
├── js/app.js
├── tests/validate.js
├── .github/workflows/ci.yml
├── .gitignore
└── README.md
```

## CI pipeline

The workflow in `.github/workflows/ci.yml` runs on pushes to `main` and `feature/**`, pull requests into `main`, and manual workflow dispatch.

It checks out the repository, configures Node.js, and runs `node tests/validate.js`. The checks validate required files, expected HTML references, and JavaScript syntax. This is a starter CI workflow, not an AWS deployment pipeline yet.

## Planned AWS architecture

```text
Developer
   |
   v
GitHub repository
   |
   v
GitHub Actions: validate and package
   |
   v
Amazon S3 static website origin
   |
   +---- optional future CloudFront + HTTPS
```

Before enabling AWS deployment, review service pricing and configure least-privilege access. Prefer GitHub OIDC role assumption over long-lived AWS access keys. CloudFront and other AWS services are not created by this repository.

## Cloud support practice scenarios

1. **CI job fails:** inspect the Actions log, identify the failing validation step, fix the issue, and push again.
2. **Website assets do not load:** check file paths, capitalization, browser developer tools, and deployment artifact contents.
3. **Deployment access denied:** verify the assumed IAM role, trust relationship, and least-privilege S3 permissions.
4. **Old website version appears:** check the deployed object, browser cache, and any future CDN cache invalidation.
5. **Unexpected cost concern:** review AWS Billing and Cost Explorer before creating resources; budgets are alerts, not a hard spending cap.

## Next steps

- Add stronger HTML accessibility and link validation.
- Add artifact packaging to the CI workflow.
- Add a protected deployment job after reviewing AWS costs.
- Connect real monitoring data only when a backend, IAM permissions, and safe cost controls are designed.

## Resume description

**CloudPulse — Cloud Operations Dashboard with CI**

Built a responsive cloud operations dashboard using HTML, CSS, and JavaScript, featuring simulated service health, deployment history, monitoring metrics, and incident management. Configured a GitHub Actions CI workflow to validate required files and JavaScript syntax, with an AWS S3 deployment architecture documented as a future extension.
