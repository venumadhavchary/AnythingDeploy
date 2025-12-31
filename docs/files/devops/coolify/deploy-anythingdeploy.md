---
title: Deploy AnythingDeploy Itself
description: How to deploy this documentation site to Coolify
contributors:
  - name: Your Name
    github: yourusername
    avatar: https://github.com/yourusername.png
---

# Deploy AnythingDeploy to Coolify

This guide shows you how to deploy the AnythingDeploy documentation site itself to Coolify.

## Prerequisites

- Coolify instance set up
- Git repository with AnythingDeploy code
- Node.js 18+ (for building)

## Step 1: Prepare Your Repository

1. Ensure your `package.json` has build scripts:
   ```json
   {
     "scripts": {
       "dev": "vitepress dev docs",
       "build": "vitepress build docs",
       "preview": "vitepress preview docs"
     }
   }
   ```

2. Create a `Dockerfile` (optional, or use Coolify's buildpack):
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci

   COPY . .

   RUN npm run build

   FROM nginx:alpine
   COPY --from=0 /app/docs/.vitepress/dist /usr/share/nginx/html

   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

## Step 2: Deploy to Coolify

1. Go to your Coolify dashboard
2. Click "New Resource" → "Application"
3. Connect your Git repository
4. Select the branch (usually `main`)

## Step 3: Configure Build Settings

### Option A: Using Buildpack (Recommended)

1. In Coolify, select "Buildpack"
2. Choose "Node.js" buildpack
3. Set build command: `npm run build`
4. Set start command: `npx serve docs/.vitepress/dist -p 3000`
5. Set publish directory: `docs/.vitepress/dist`

### Option B: Using Dockerfile

1. Select "Dockerfile"
2. Coolify will use your Dockerfile automatically
3. Ensure port is exposed (80 or 3000)

## Step 4: Environment Variables

No environment variables needed for basic deployment.

Optional variables if you add features:
- `VITE_API_URL` (if you add API calls)
- `VITE_ANALYTICS_ID` (for analytics)

## Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Access your site via the provided URL

## Step 6: Set Up Custom Domain

1. Go to application settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `anythingdeploy.com`)
4. Configure DNS:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: Your Coolify instance domain
5. SSL certificate will be auto-provisioned

## Step 7: Enable Auto Deploy

1. Go to application settings
2. Enable "Auto Deploy"
3. Select branch: `main`
4. Now every push to main will auto-deploy!

## Updating the Site

1. Make changes to your guides
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update deployment guide"
   git push origin main
   ```
3. Coolify will automatically:
   - Pull latest code
   - Rebuild the site
   - Deploy new version

## Troubleshooting

### Build Fails
- Check Node.js version (needs 18+)
- Verify all dependencies in `package.json`
- Check build logs in Coolify

### Site Not Loading
- Verify build completed successfully
- Check that publish directory is correct
- Ensure port is configured correctly

### Auto Deploy Not Working
- Verify webhook is set up in Git provider
- Check branch name matches configuration
- Review Coolify logs

## Next Steps

- [Auto Deploy Setup](/files/devops/coolify/auto-deploy-setup)
- [Contribute to AnythingDeploy](/contribute)

## Contributors

<!-- Contributors listed from frontmatter -->

