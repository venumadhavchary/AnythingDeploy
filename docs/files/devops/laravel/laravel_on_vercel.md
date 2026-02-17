---
title: How to Deploy Laravel on Vercel - Step by Step Guide 2026
description: Learn how to deploy Laravel applications on Vercel serverless platform. Complete beginner-friendly guide with copy-paste code examples. Deploy Laravel in minutes!
keywords: deploy laravel on vercel, laravel vercel deployment, vercel laravel serverless, laravel vercel tutorial, how to deploy laravel vercel, laravel serverless deployment guide
---

# How to Deploy Laravel on Vercel: Complete Step-by-Step Guide

## 📋 What You'll Learn

Deploy your Laravel application on Vercel's serverless platform in minutes. This guide provides copy-paste ready code and clear instructions for beginners and experienced developers.

## ✅ What You Need Before Starting

- ✔️ A Laravel application (Laravel 8.x or newer)
- ✔️ Free Vercel account ([Sign up here](https://vercel.com/signup))
- ✔️ Git repository (GitHub, GitLab, or Bitbucket)
- ✔️ GitHub account connected to Vercel

> **💡 Important Note**: This method works best for small to medium Laravel applications. For large applications with heavy database operations or real-time features, consider VPS or managed Laravel hosting.

## Step 1: Create Vercel Configuration File

### 1.1 Create vercel.json

In your Laravel project root folder (where package.json is located), create a new file named `vercel.json` and paste this configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.php",
      "use": "vercel-php@0.7.0"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(css|js|images|fonts|assets)/(.*)",
      "dest": "public/$1/$2"
    },
    {
      "src": "/(.*\\.(png|jpg|jpeg|gif|svg|ico|webp))",
      "dest": "public/$1"
    },
    {
      "src": "/(.*)",
      "dest": "api/index.php"
    }
  ],
  "env": {
    "APP_ENV": "production",
    "APP_DEBUG": "false",
    "LOG_CHANNEL": "stderr",
    "SESSION_DRIVER": "cookie"
  }
}
```

**What this does:**
- Routes all PHP requests through `api/index.php`
- Serves static files (CSS, JS, images) directly from `public` folder
- Sets basic environment variables for production

### 1.2 Create API Folder and Handler

Create a new folder named `api` in your project root, then create a file `index.php` inside it with this content:

```php
<?php

// Laravel Vercel Entry Point
require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
```

**File structure should look like this:**
```
your-laravel-project/
├── api/
│   └── index.php          ← New file you just created
├── app/
├── bootstrap/
├── public/
├── vercel.json            ← New file you just created
├── composer.json
└── ...
```

## Step 2: Configure Environment Variables

### 2.1 Prepare Your Environment Variables

You DON'T need to create `.env.production` file. Instead, you'll add these directly in Vercel dashboard. Here's what you'll need:

```env
APP_NAME=YourAppName
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://your-project.vercel.app

LOG_CHANNEL=stderr

# Use cookie-based sessions for serverless (recommended)
SESSION_DRIVER=cookie
SESSION_LIFETIME=120

# Use array cache for serverless (or Redis for production)
CACHE_DRIVER=array

# Database (use serverless-friendly databases)
DB_CONNECTION=mysql
DB_HOST=your-database-host.com
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

> **🔑 Generate APP_KEY**: Run `php artisan key:generate --show` on your local machine and copy the output

### 2.2 Add Environment Variables in Vercel (After Initial Deploy)

You'll do this after connecting your repository. We'll remind you in Step 6.

## Step 3: Choose and Setup Your Database

### 3.1 Recommended Serverless Databases

For Laravel on Vercel, use these serverless-friendly databases:

**🥇 Best Options:**

1. **PlanetScale** (Recommended)
   - Free tier: 5GB storage
   - MySQL-compatible
   - No connection limits
   - Sign up: [planetscale.com](https://planetscale.com)

2. **Supabase**
   - Free tier: 500MB database
   - PostgreSQL
   - Built-in auth
   - Sign up: [supabase.com](https://supabase.com)

3. **Neon**
   - Free tier: 512MB storage
   - PostgreSQL
   - Serverless
   - Sign up: [neon.tech](https://neon.tech)

> **💡 For Testing**: You can use SQLite (no database setup needed) by setting `DB_CONNECTION=sqlite` in Vercel environment variables

### 3.2 Get Your Database Connection Details

After signing up for a database service:

1. Create a new database
2. Copy the connection details:
   - Host
   - Database name
   - Username
   - Password
   - Port (usually 3306 for MySQL, 5432 for PostgreSQL)

**Keep these details ready** - you'll add them to Vercel in Step 6.

> **⚠️ Important**: Make sure your database allows connections from anywhere (0.0.0.0/0) since Vercel uses dynamic IPs

## Step 4: Optimize Laravel Configuration (Optional but Recommended)

### 4.1 Update Session Driver

Open `config/session.php` and ensure the default uses cookie driver:

```php
'driver' => env('SESSION_DRIVER', 'cookie'),
```

### 4.2 Update Cache Driver

Open `config/cache.php` and set default to array:

```php
'default' => env('CACHE_DRIVER', 'array'),
```

### 4.3 Update Logging Channel

Open `config/logging.php` and set default to stderr:

```php
'default' => env('LOG_CHANNEL', 'stderr'),
```

**Why these changes?**
- Cookie sessions work better in serverless (no persistent filesystem)
- Array cache prevents file system issues
- Stderr logging shows logs in Vercel dashboard

## Step 5: Commit Your Changes to Git

Now commit all changes to your Git repository:

```bash
git add .
git commit -m "Configure Laravel for Vercel deployment"
git push origin main
```

> **📝 Note**: Replace `main` with your branch name if different (could be `master`)

## Step 6: Deploy to Vercel

### 6.1 Connect Your Repository to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your Laravel project repository
5. Click **"Import"**

### 6.2 Configure Project Settings

On the configuration screen:

1. **Framework Preset**: Select **"Other"**
2. **Build & Development Settings**:
   - Leave everything as default
3. Click **"Deploy"**

> **⏱️ Wait**: First deployment takes 2-5 minutes

### 6.3 Add Environment Variables (After First Deploy)

**After the first deployment completes:**

1. Go to your project dashboard
2. Click **"Settings"** (top navigation)
3. Click **"Environment Variables"** (left sidebar)
4. Add each variable one by one:
   - Click **"Add New"**
   - Enter **Name** (e.g., `APP_KEY`)
   - Enter **Value** (e.g., your generated key)
   - Select **"Production"**, **"Preview"**, and **"Development"**
   - Click **"Save"**

**Required variables to add:**
```
APP_NAME=YourAppName
APP_ENV=production
APP_KEY=base64:your-generated-key-here
APP_DEBUG=false
APP_URL=https://your-project.vercel.app
LOG_CHANNEL=stderr
SESSION_DRIVER=cookie
CACHE_DRIVER=array
DB_CONNECTION=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 6.4 Redeploy After Adding Variables

1. Go to **"Deployments"** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** again to confirm

**Your Laravel app is now live! 🎉**

## Step 7: Run Database Migrations

### 7.1 Connect to Your Production Database Locally

Update your local `.env` file with production database credentials temporarily:

```env
DB_CONNECTION=mysql
DB_HOST=your-production-database-host
DB_PORT=3306
DB_DATABASE=your_production_database
DB_USERNAME=your_production_username
DB_PASSWORD=your_production_password
```

### 7.2 Run Migrations

```bash
php artisan migrate --force
```

> **⚠️ Important**: The `--force` flag is required for production environments

### 7.3 Restore Local Database Settings

After migrations complete, restore your local `.env` to use your local database.

## Step 8: Test Your Deployment

1. Open your Vercel URL (found in your project dashboard)
2. Test key features:
   - Homepage loads ✓
   - Routes work ✓
   - Database connection works ✓
   - Forms submit correctly ✓

## Step 9: Add Custom Domain (Optional)

### 9.1 Add Domain in Vercel

1. Go to project **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `myapp.com`)
4. Click **"Add"**

### 9.2 Update DNS Records

Add these records in your domain registrar:

**For root domain (myapp.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 9.3 Update APP_URL

1. Go to Vercel **Settings** → **Environment Variables**
2. Edit `APP_URL` to your custom domain
3. Redeploy the project

## ⚠️ Important Limitations to Know

### What Works
✅ Standard Laravel routes and controllers
✅ Blade templates and views
✅ Database queries (with serverless databases)
✅ API endpoints
✅ Authentication (Session-based with cookies)
✅ Form submissions
✅ Static assets (CSS, JS, images)

### What Doesn't Work
❌ **File Uploads to Local Storage** - Use S3, Cloudinary, or similar
❌ **Long-Running Tasks** - 10 second timeout (60 seconds on Pro)
❌ **Background Jobs/Queues** - Use external queue services
❌ **WebSockets** - Use Pusher or similar services
❌ **Scheduled Tasks (Cron)** - Use Vercel Cron or external services
❌ **File-based Sessions** - Use cookie or database sessions

### Performance Tips

💡 **For File Uploads**: Use [Cloudinary](https://cloudinary.com/) or [AWS S3](https://aws.amazon.com/s3/)
💡 **For Background Jobs**: Use [Laravel Vapor Queue](https://vapor.laravel.com/) or [SQS](https://aws.amazon.com/sqs/)
💡 **For WebSockets**: Use [Pusher](https://pusher.com/) or [Ably](https://ably.com/)
💡 **For Scheduled Tasks**: Use [EasyCron](https://www.easycron.com/) or Vercel Cron

## 🔧 Troubleshooting Common Issues

### Issue 1: 500 Internal Server Error

**Symptoms**: White screen or 500 error

**Solutions**:
1. Check Vercel logs: Project → **Deployments** → Click deployment → **Function Logs**
2. Verify `APP_KEY` is set in environment variables
3. Make sure all required environment variables are added
4. Check database connection details are correct

### Issue 2: "Class not found" Errors

**Solutions**:
```bash
# Add to your project, commit, and push:
composer dump-autoload
git add composer.json composer.lock
git commit -m "Update autoload"
git push
```

### Issue 3: Database Connection Failed

**Solutions**:
1. Verify database is online and accessible
2. Check database allows connections from anywhere (0.0.0.0/0)
3. Confirm environment variables match database credentials
4. Test connection locally with production credentials

### Issue 4: Assets Not Loading (CSS/JS)

**Solutions**:
1. Run `npm run build` or `npm run prod` locally
2. Commit `public/build` or `public/css`, `public/js` folders
3. Push changes to repository

### Issue 5: Routes Not Working

**Solution**: Make sure `vercel.json` routes configuration is correct (see Step 1)

### How to View Logs

1. Go to your Vercel project
2. Click **"Deployments"**
3. Click on the latest deployment
4. Click **"Function Logs"** to see errors

### Enable Debug Mode (Temporarily)

To see detailed errors:
1. Go to **Settings** → **Environment Variables**
2. Set `APP_DEBUG=true`
3. Redeploy
4. **Remember to set back to `false` after fixing!**

## References

- [Vercel Documentation](https://vercel.com/docs) - Official Vercel documentation and deployment guides
- [Laravel Deployment Documentation](https://laravel.com/docs/11.x/deployment) - Official Laravel deployment best practices
- [vercel-php Community Runtime](https://github.com/vercel-community/php) - Community-maintained PHP runtime for Vercel (GitHub repository)
- [Laravel Serverless Best Practices](https://laravel.com/docs/11.x/octane) - Laravel Octane for optimized serverless performance

---

This guide provides a comprehensive approach to deploying Laravel on Vercel. While this setup works for many applications, consider traditional hosting solutions for applications requiring complex background processing or real-time features.