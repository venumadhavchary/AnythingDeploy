---
title: Auto Deploy with Git Push - Coolify Setup Guide
description: Set up automatic deployments when you push to Git using Coolify. Learn how to configure webhooks, branch strategies, and continuous deployment workflows.
keywords: auto deploy, git webhook, coolify auto deploy, continuous deployment, git push deploy, coolify webhook
contributors:
  - name: Your Name
    github: yourusername
    avatar: https://github.com/yourusername.png
---

# Auto Deploy with Git Push

Set up automatic deployments so your application updates whenever you push to your Git repository.

## Prerequisites

- Coolify instance set up
- Application already deployed on Coolify
- Git repository connected to Coolify

## Step 1: Enable Auto Deploy

1. Go to your application in Coolify dashboard
2. Navigate to "Settings"
3. Find "Deployment" section
4. Enable "Auto Deploy"

## Step 2: Configure Branch

1. Select which branch triggers auto deploy (usually `main` or `master`)
2. Optionally configure:
   - **Pull Request Deployments**: Deploy previews for PRs
   - **Manual Deploy Only**: Disable auto deploy (deploy manually)

## Step 3: Set Up Webhook (if needed)

For self-hosted Coolify instances:

1. Go to your Git provider (GitHub, GitLab, etc.)
2. Navigate to repository settings
3. Go to "Webhooks"
4. Add webhook URL from Coolify:
   - URL: `https://your-coolify-instance.com/api/v1/webhooks/git`
   - Content type: `application/json`
   - Events: `push`, `pull_request` (optional)

## Step 4: Test Auto Deploy

1. Make a small change to your code
2. Commit and push to the configured branch:
   ```bash
   git add .
   git commit -m "Test auto deploy"
   git push origin main
   ```
3. Check Coolify dashboard - deployment should start automatically
4. Monitor deployment logs

## Deployment Workflow

When you push to Git:

1. **Webhook Triggered**: Git provider sends webhook to Coolify
2. **Repository Cloned**: Coolify pulls latest code
3. **Build Started**: Application is built (Docker build or buildpack)
4. **Container Created**: New container is built
5. **Health Check**: Coolify verifies application is running
6. **Traffic Switched**: New version receives traffic
7. **Old Container Removed**: Previous version is cleaned up

## Branch Strategies

### Main Branch Only
- Deploy only from `main` branch
- Most stable, production-ready code

### Multiple Branches
- Deploy from `main`, `staging`, `develop`
- Each branch gets its own deployment
- Useful for testing environments

### Pull Request Previews
- Deploy preview for each PR
- Test changes before merging
- Automatically cleaned up after PR closes

## Environment-Specific Deployments

### Production
- Branch: `main`
- Domain: `yourdomain.com`
- Environment: Production variables

### Staging
- Branch: `staging`
- Domain: `staging.yourdomain.com`
- Environment: Staging variables

## Rollback

If something goes wrong:

1. Go to Coolify dashboard
2. Navigate to "Deployments" history
3. Find the last working deployment
4. Click "Redeploy" on that version

## Best Practices

1. **Use Branch Protection**: Protect main branch on Git
2. **Test Before Deploy**: Run tests in CI before auto deploy
3. **Monitor Deployments**: Watch logs for the first few auto deploys
4. **Use Environment Variables**: Don't hardcode secrets
5. **Health Checks**: Ensure your app has proper health check endpoints

## Troubleshooting

### Auto Deploy Not Triggering
- Verify webhook is configured correctly
- Check webhook delivery logs in Git provider
- Ensure branch name matches configuration
- Check Coolify logs for errors

### Deployment Fails
- Check build logs in Coolify
- Verify all dependencies are available
- Ensure environment variables are set
- Review application logs

### Slow Deployments
- Optimize Dockerfile (use multi-stage builds)
- Use build cache effectively
- Consider using buildpacks for faster builds

## Next Steps

- [Deploy to Coolify Guide](/files/devops/coolify/deploy-to-coolify)
- [Docker Guides](/files/devops/docker/)

## Contributors

<!-- Contributors listed from frontmatter -->

