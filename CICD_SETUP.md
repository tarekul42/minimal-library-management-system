# CI/CD Setup Guide

This guide will help you configure the CI/CD pipeline for automatic deployment to Vercel.

## Overview

The project now includes two GitHub Actions workflows:

1. **CI Workflow** (`.github/workflows/ci.yml`): Runs tests, linting, and builds on every push/PR
2. **CD Workflow** (`.github/workflows/cd.yml`): Deploys to Vercel on every push to main

## Step 1: Link Your Project to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Link your project to Vercel:
   ```bash
   npx vercel link
   ```
   
   Follow the prompts to:
   - Log in to your Vercel account
   - Select or create a new project
   - Link to your existing project

3. This will create a `.vercel` directory with a `project.json` file containing your `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.

## Step 2: Get Your Vercel Token

1. Go to [Vercel Account Settings > Tokens](https://vercel.com/account/tokens)
2. Click **"Create"**
3. Give your token a descriptive name (e.g., "GitHub Actions - Library Management")
4. Set the scope to your account or team
5. Click **"Create Token"**
6. **Copy the token immediately** (you won't be able to see it again!)

## Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **"New repository secret"**
4. Add each of the following secrets:

   **Secret 1: VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: The token you copied from Vercel

   **Secret 2: VERCEL_ORG_ID**
   - Name: `VERCEL_ORG_ID`
   - Value: Found in `.vercel/project.json` under `orgId`

   **Secret 3: VERCEL_PROJECT_ID**
   - Name: `VERCEL_PROJECT_ID`
   - Value: Found in `.vercel/project.json` under `projectId`

## Step 4: Test the Workflows

1. Commit and push the new workflow files to a branch:
   ```bash
   git add .
   git commit -m "chore: add CI/CD workflows"
   git push origin <your-branch>
   ```

2. Create a pull request to `main` - this will trigger the **CI workflow**

3. Once merged to `main`, the **CD workflow** will automatically deploy to Vercel

## Step 5: Monitor Deployments

- **GitHub Actions**: Go to the "Actions" tab in your repository to see workflow runs
- **Vercel Dashboard**: Check your Vercel dashboard for deployment status

## Troubleshooting

### Build Fails in CI/CD

- Check the workflow logs in the Actions tab
- Ensure all dependencies are correctly listed in `package.json`
- Verify that the build works locally with `npm run build`

### Deployment Fails

- Verify all three secrets are correctly set in GitHub
- Check that the Vercel project is properly linked
- Ensure the Vercel token has appropriate permissions

### Environment Variables

If your app requires environment variables:

1. Add them to your Vercel project settings
2. Optionally, add them as GitHub secrets and pass them in the workflow

## Additional Notes

- The `.vercel` directory is gitignored to prevent exposing sensitive IDs
- You can manually deploy to Vercel using `npx vercel --prod`
- The CI workflow tests on both Node.js 18.x and 20.x for compatibility
