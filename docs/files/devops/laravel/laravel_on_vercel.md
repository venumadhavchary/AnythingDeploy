---
title: Deploy Laravel on Vercel - Complete Serverless Guide
description: Complete guide to deploy Laravel applications on Vercel using serverless functions and static asset optimization.
keywords: laravel vercel deployment, laravel serverless, php vercel, laravel static deployment
---

# How to Deploy Laravel Applications on Vercel: Complete Guide

## Overview

Deploying Laravel on Vercel requires a different approach since Vercel is optimized for static sites and serverless functions. This guide covers deploying Laravel as a hybrid application using Vercel's serverless functions for dynamic content and static hosting for assets.

> **Note**: This approach is suitable for smaller Laravel applications. For complex applications with heavy database operations, consider traditional hosting solutions.

## Prerequisites

- Laravel application (8.x or higher recommended)
- Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)
- Basic knowledge of serverless architecture

## Step 1: Prepare Your Laravel Application

### 1.1 Update Composer Dependencies

Add the `vercel/vercel` package to handle serverless deployments:

```bash
composer require vercel/vercel
```

### 1.2 Create Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "/api/index.php",
      "use": "vercel-php@0.6.0"
    },
    {
      "src": "/public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/public/assets/$1"
    },
    {
      "src": "/css/(.*)",
      "dest": "/public/css/$1"
    },
    {
      "src": "/js/(.*)",
      "dest": "/public/js/$1"
    },
    {
      "src": "/images/(.*)",
      "dest": "/public/images/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index.php"
    }
  ],
  "functions": {
    "api/index.php": {
      "runtime": "vercel-php@0.6.0"
    }
  }
}
```

### 1.3 Create API Handler

Create `/api/index.php` in your project root:

```php
<?php

// Include Laravel's autoloader
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel application
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Handle the request
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
```

## Step 2: Environment Configuration

### 2.1 Create .env.production

Create a production environment file:

```env
APP_NAME=Laravel
APP_ENV=production
APP_KEY=your-app-key-here
APP_DEBUG=false
APP_URL=https://your-app.vercel.app

DB_CONNECTION=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=your-database-name
DB_USERNAME=your-username
DB_PASSWORD=your-password

# Session and Cache (use database or file-based for serverless)
SESSION_DRIVER=database
CACHE_DRIVER=database
QUEUE_CONNECTION=database

# File Storage (use cloud storage for production)
FILESYSTEM_DISK=public
```

### 2.2 Configure Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Add all your environment variables from `.env.production`

## Step 3: Database Configuration

### 3.1 Serverless Database Setup

For serverless deployment, use a cloud database service:

**Recommended Options:**
- **PlanetScale** (MySQL-compatible, serverless-friendly)
- **Neon** (PostgreSQL)
- **Supabase** (PostgreSQL)
- **AWS RDS** with connection pooling

### 3.2 Update Database Configuration

In `config/database.php`, optimize for serverless:

```php
'mysql' => [
    'driver' => 'mysql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'prefix_indexes' => true,
    'strict' => true,
    'engine' => null,
    'options' => extension_loaded('pdo_mysql') ? array_filter([
        PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
    ]) : [],
    // Optimize for serverless
    'options' => [
        PDO::ATTR_TIMEOUT => 5,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ],
],
```

## Step 4: Optimize Laravel for Serverless

### 4.1 Update Bootstrap Files

Modify `bootstrap/app.php` for serverless optimization:

```php
<?php

$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

// Optimize for serverless - disable some middleware that might cause issues
$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

return $app;
```

### 4.2 Session Configuration

Update `config/session.php` for serverless:

```php
'driver' => env('SESSION_DRIVER', 'database'),
'lifetime' => env('SESSION_LIFETIME', 120),
'expire_on_close' => false,
'encrypt' => false,
'files' => storage_path('framework/sessions'),
'connection' => env('SESSION_CONNECTION'),
'table' => 'sessions',
'store' => env('SESSION_STORE'),
'lottery' => [2, 100],
'cookie' => env(
    'SESSION_COOKIE',
    Str::slug(env('APP_NAME', 'laravel'), '_').'_session'
),
'path' => '/',
'domain' => env('SESSION_DOMAIN'),
'secure' => env('SESSION_SECURE_COOKIE', true),
'http_only' => true,
'same_site' => 'lax',
```

### 4.3 Cache Configuration

Update `config/cache.php`:

```php
'default' => env('CACHE_DRIVER', 'database'),

'stores' => [
    'database' => [
        'driver' => 'database',
        'table' => 'cache',
        'connection' => null,
        'lock_connection' => null,
    ],
    // ... other cache stores
],
```

## Step 5: Create Required Database Tables

Run these migrations for serverless-compatible session and cache storage:

```bash
php artisan session:table
php artisan cache:table
php artisan queue:table
php artisan migrate
```

## Step 6: Deploy to Vercel

### 6.1 Connect Repository

1. Visit [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Connect your Git repository
4. Select your Laravel project

### 6.2 Configure Build Settings

1. **Framework Preset**: Other
2. **Build Command**: `composer install --optimize-autoloader --no-dev && php artisan config:cache && php artisan route:cache`
3. **Output Directory**: Leave empty
4. **Install Command**: `composer install --optimize-autoloader --no-dev`

### 6.3 Deploy

Click **Deploy** and wait for the build to complete.

## Step 7: Post-Deployment Configuration

### 7.1 Generate Application Key

If you haven't set `APP_KEY`, generate one locally and add it to Vercel's environment variables:

```bash
php artisan key:generate --show
```

### 7.2 Run Migrations

For the first deployment, you'll need to run migrations. You can either:

1. Run them locally against your production database
2. Create a custom Vercel serverless function for migrations
3. Use a database management tool

### 7.3 Configure Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Update `APP_URL` in environment variables

## Limitations and Considerations

### Current Limitations

- **Cold Start Latency**: Serverless functions have cold start times
- **Execution Time Limit**: Vercel functions have a 10-second timeout (Pro: 60 seconds)
- **File Storage**: Local file storage is ephemeral; use cloud storage for uploads
- **Background Jobs**: Limited queue processing capabilities
- **WebSockets**: Not supported in serverless environment

### Performance Optimizations

1. **Use Database for Sessions/Cache**: Avoid file-based storage
2. **Optimize Autoloading**: Use `--optimize-autoloader` flag
3. **Cache Configuration**: Use `php artisan config:cache`
4. **Route Caching**: Use `php artisan route:cache`
5. **Use CDN**: For static assets and file uploads

## Troubleshooting

### Common Issues

**Issue**: 500 Internal Server Error
**Solution**: Check Vercel function logs and ensure all environment variables are set correctly

**Issue**: Database Connection Errors
**Solution**: Verify database credentials and ensure the database server accepts connections from Vercel's IP ranges

**Issue**: Session Issues
**Solution**: Make sure session table exists and `SESSION_DRIVER=database` is set

### Debugging

Enable detailed error reporting by setting:
```env
APP_DEBUG=true
LOG_CHANNEL=stderr
```

## Alternative: Static Site Generation

For content-heavy Laravel applications, consider using Laravel's static site generation:

1. Use packages like `spatie/laravel-export` for static generation
2. Deploy static files to Vercel
3. Use external APIs for dynamic functionality

## References

- [Vercel Documentation](https://vercel.com/docs) - Official Vercel documentation and deployment guides
- [Laravel Deployment Documentation](https://laravel.com/docs/11.x/deployment) - Official Laravel deployment best practices
- [vercel-php Community Runtime](https://github.com/vercel-community/php) - Community-maintained PHP runtime for Vercel (GitHub repository)
- [Laravel Serverless Best Practices](https://laravel.com/docs/11.x/octane) - Laravel Octane for optimized serverless performance

---

This guide provides a comprehensive approach to deploying Laravel on Vercel. While this setup works for many applications, consider traditional hosting solutions for applications requiring complex background processing or real-time features.