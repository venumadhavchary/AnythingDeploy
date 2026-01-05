# Laravel Deployment with Docker

## Step 1: Create New Project in Coolify

1. Click **+ Add** button
2. Select **Public Repository** or **Private Repository**
3. Enter your repository URL (e.g., `https://github.com/username/laravel-app`)
4. Click **Continue**

## Step 2: Configure Project

1. **Project Name**: Enter your project name (e.g., `my-laravel-app`)
2. **Build Pack**: Select `dockerfile`
3. **Ports Exposes**: Set to `8000`
4. Click **Save**

## Step 3: Add Environment Variables

1. Go to **Environment Variables** tab
2. Add these variables:

```env
APP_NAME=Laravel
APP_ENV=staging
APP_KEY=
APP_DEBUG=false

DB_CONNECTION=mysql
DB_HOST=<your_db_host>
DB_PORT=3306
DB_DATABASE=<your_database>
DB_USERNAME=<your_username>
DB_PASSWORD=<your_password>
```

3. Click **Save**

## Step 4: Create Database (if needed / ignore if sqlite)

1. Go to **Resources** → **+ Add** → **Database**
2. Select **MySQL** or **PostgreSQL**
3. Give it a name (e.g., `laravel-db`)
4. Click **Create**
5. Copy the connection details and update your environment variables

## Step 5: Create Dockerfile

In your project repository root, create `Dockerfile`:

```dockerfile
FROM unit:1.34.1-php8.3

# Install dependencies
RUN apt update && apt install -y \
    curl unzip git libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libssl-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pcntl opcache pdo pdo_mysql intl zip gd exif ftp bcmath \
    && pecl install redis \
    && docker-php-ext-enable redis

# PHP configuration
RUN echo "opcache.enable=1" > /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit=tracing" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit_buffer_size=256M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "memory_limit=512M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "upload_max_filesize=64M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/custom.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Create directories and set permissions
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache

# Copy application files
COPY . .

# Set permissions
RUN chown -R unit:unit storage bootstrap/cache && chmod -R 775 storage bootstrap/cache

# Install dependencies
RUN composer install --prefer-dist --optimize-autoloader --no-interaction

# Copy Nginx Unit configuration
COPY unit.json /docker-entrypoint.d/unit.json

EXPOSE 8000

CMD ["unitd", "--no-daemon"]
```

## Step 6: Create unit.json

In your project repository root, create `unit.json`:

```json
{
    "listeners": {
        "*:8000": {
            "pass": "routes",
            "forwarded": {
                "protocol": "X-Forwarded-Proto",
                "source": ["0.0.0.0/0"]
            }
        }
    },
    "routes": [
        {
            "match": {
                "uri": "!/index.php"
            },
            "action": {
                "share": "/var/www/html/public$uri",
                "fallback": {
                    "pass": "applications/laravel"
                }
            }
        }
    ],
    "applications": {
        "laravel": {
            "type": "php",
            "root": "/var/www/html/public/",
            "script": "index.php"
        }
    }
}
```

Commit and push both files:

```bash
git add Dockerfile unit.json
git commit -m "Add Docker configuration"
git push
```

## Step 7: Set Post-Deployment Command

1. Go to **General** tab
2. Find **Post Deployment Command** section
3. Add:

```bash
php artisan migrate --force && php artisan optimize:clear && php artisan config:clear && php artisan route:clear && php artisan view:clear 
```

4. Click **Save**

## Step 8: Deploy

1. Go back to your project
2. Click **Deploy** button
3. Wait for deployment to complete (first build may take 5-10 minutes)
4. Your app will be live at the generated URL!

## Step 9: Generate App Key (First Deploy)

After first deployment:

1. Go to **Terminal** tab
2. Run:

```bash
php artisan key:generate
```

3. Restart the application

---

## What This Setup Includes

✅ Nginx Unit web server  
✅ PHP 8.3 with extensions  
✅ OPcache with JIT enabled  
✅ Redis support  
✅ Optimized for production  

---

## Troubleshooting

**App Key Error?**

Go to Terminal and run:
```bash
php artisan key:generate
```

**Permission Issues?**

Go to Terminal and run:
```bash
chmod -R 775 storage bootstrap/cache
chown -R unit:unit storage bootstrap/cache
```

**HTTPS Mixed Content Error?**

1. Update `unit.json` with your load balancer IP
2. Configure Laravel to trust proxies

Add to `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->trustProxies(at: '*');
})
```

Then redeploy.

**Check Logs**

Go to **Logs** tab to see:
- Build logs
- Application logs
- Error logs

**Database Connection Failed?**

1. Check environment variables are correct
2. Ensure database is running
3. Test connection from Terminal:

```bash
php artisan migrate --pretend
```