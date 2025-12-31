---
title: Deploy to Coolify
description: Complete guide to deploying your application using Coolify
contributors:
  - name: Your Name
    github: yourusername
    avatar: https://github.com/yourusername.png
---

# Deploy to Coolify

Coolify is a self-hosted alternative to Heroku, Vercel, and Netlify. It uses Docker to deploy your applications with minimal configuration.

## Prerequisites

- A server with Docker installed
- Coolify instance running (or use Coolify Cloud)
- Your application code in a Git repository
- Basic knowledge of Docker

## Step 1: Set Up Coolify

1. Install Coolify on your server or sign up for Coolify Cloud
2. Access your Coolify dashboard
3. Create a new project

## Step 2: Connect Your Repository

1. In Coolify, click "New Resource"
2. Select "Application"
3. Connect your Git repository:
   - GitHub
   - GitLab
   - Bitbucket
   - Or use a public Git URL

## Step 3: Configure Your Application

1. Select your repository and branch
2. Choose the build pack or Docker configuration:
   - **Build Pack**: For Node.js, Python, PHP, etc.
   - **Dockerfile**: For custom Docker setups
   - **Docker Compose**: For multi-container applications

3. Configure environment variables if needed
4. Set up your domain (optional)

## Step 4: Deploy

1. Click "Deploy"
2. Coolify will:
   - Clone your repository
   - Build your application
   - Start the container
   - Provide you with a URL

## Step 5: Verify Deployment

1. Check the deployment logs in Coolify
2. Visit your application URL
3. Verify all features are working

## Environment Variables

Add environment variables in Coolify dashboard:
- Go to your application settings
- Navigate to "Environment Variables"
- Add your variables (e.g., `DATABASE_URL`, `API_KEY`)

## Custom Domains

1. In application settings, go to "Domains"
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificates are automatically provisioned

## Troubleshooting

### Build Fails
- Check build logs in Coolify
- Verify your Dockerfile or build configuration
- Ensure all dependencies are correctly specified

### Application Won't Start
- Check application logs
- Verify environment variables are set
- Ensure your application listens on the correct port

### Domain Not Working
- Verify DNS records are correct
- Wait for DNS propagation (can take up to 48 hours)
- Check SSL certificate status

## Next Steps

- [Set up Auto Deploy with Git](/files/devops/coolify/auto-deploy-setup)
- [Configure Docker for your app](/files/devops/docker/docker-basics)

## Contributors

<!-- Contributors listed from frontmatter -->

