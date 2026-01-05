# Laravel Deployment with Nixpacks

## Step 1: Create New Project in Coolify

1. Click **+ Add** button
2. Select **Public Repository** or **Private Repository**
3. Enter your repository URL (e.g., `https://github.com/venumadhavchary/laravel`)
4. Click **Continue**

## Step 2: Configure Project

1. **Project Name**: Enter your project name (e.g., `my-laravel-app`)
2. **Build Pack**: Select `nixpacks`
3. **Ports Exposes**: Set to `80`
4. Click **Save**

## Step 3: Add Environment Variables

1. Go to **Environment Variables** tab
2. Add these variables:

```env
APP_NAME=Laravel
APP_ENV=production
APP_KEY=
APP_DEBUG=false

DB_CONNECTION=mysql
DB_HOST=<your_db_host>
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=<your_db_password>

REDIS_HOST=<your_redis_host>
REDIS_PORT=6379
REDIS_PASSWORD=null
```

3. Click **Save**

## Step 4: Create Database (if needed / ignore if sqlite)

1. Go to **Resources** → **+ Add** → **Database**
2. Select **MySQL** or **PostgreSQL**
3. Give it a name (e.g., `laravel-db`)
4. Click **Create**
5. Copy the connection details and update your environment variables

## Step 5: Create nixpacks.toml

In your project repository root, create `nixpacks.toml`:

```toml
[phases.setup]
nixPkgs = ["...", "python311Packages.supervisor"]

[phases.build]
cmds = [
    "mkdir -p /etc/supervisor/conf.d/",
    "cp /assets/worker-*.conf /etc/supervisor/conf.d/",
    "cp /assets/supervisord.conf /etc/supervisord.conf",
    "chmod +x /assets/start.sh",
    "..."
]

[start]
cmd = '/assets/start.sh'

[staticAssets]
"start.sh" = '''
#!/bin/bash

# Transform the nginx configuration
node /assets/scripts/prestart.mjs /assets/nginx.template.conf /etc/nginx.conf

# Start supervisor
supervisord -c /etc/supervisord.conf -n
'''

"supervisord.conf" = '''
[unix_http_server]
file=/assets/supervisor.sock

[supervisord]
logfile=/var/log/supervisord.log
logfile_maxbytes=50MB
logfile_backups=10
loglevel=info
pidfile=/assets/supervisord.pid
nodaemon=false
silent=false
minfds=1024
minprocs=200

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///assets/supervisor.sock

[include]
files = /etc/supervisor/conf.d/*.conf
'''

"worker-nginx.conf" = '''
[program:worker-nginx]
process_name=%(program_name)s_%(process_num)02d
command=nginx -c /etc/nginx.conf
autostart=true
autorestart=true
stdout_logfile=/var/log/worker-nginx.log
stderr_logfile=/var/log/worker-nginx.log
'''

"worker-phpfpm.conf" = '''
[program:worker-phpfpm]
process_name=%(program_name)s_%(process_num)02d
command=php-fpm -y /assets/php-fpm.conf -F
autostart=true
autorestart=true
stdout_logfile=/var/log/worker-phpfpm.log
stderr_logfile=/var/log/worker-phpfpm.log
'''

"worker-laravel.conf" = '''
[program:worker-laravel]
process_name=%(program_name)s_%(process_num)02d
command=bash -c 'exec php /app/artisan queue:work --sleep=3 --tries=3 --max-time=3600'
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
numprocs=12 # To reduce memory/CPU usage, change to 2.
startsecs=0
stopwaitsecs=3600
stdout_logfile=/var/log/worker-laravel.log
stderr_logfile=/var/log/worker-laravel.log
'''

"php-fpm.conf" = '''
[www]
listen = 127.0.0.1:9000
user = www-data
group = www-data
listen.owner = www-data
listen.group = www-data
pm = dynamic
pm.max_children = 50
pm.min_spare_servers = 4
pm.max_spare_servers = 32
pm.start_servers = 18
clear_env = no
php_admin_value[post_max_size] = 35M
php_admin_value[upload_max_filesize] = 30M
'''

"nginx.template.conf" = '''
user www-data www-data;
worker_processes 5;
daemon off;

worker_rlimit_nofile 8192;

events {
  worker_connections  4096;  # Default: 1024
}

http {
    include    $!{nginx}/conf/mime.types;
    index    index.html index.htm index.php;

    default_type application/octet-stream;
    log_format   main '$remote_addr - $remote_user [$time_local]  $status '
        '"$request" $body_bytes_sent "$http_referer" '
        '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx-access.log;
    error_log /var/log/nginx-error.log;
    sendfile     on;
    tcp_nopush   on;
    server_names_hash_bucket_size 128; # this seems to be required for some vhosts

    server {
        listen ${PORT};
        listen [::]:${PORT};
        server_name localhost;

        $if(NIXPACKS_PHP_ROOT_DIR) (
            root ${NIXPACKS_PHP_ROOT_DIR};
        ) else (
            root /app;
        )

        add_header X-Content-Type-Options "nosniff";

        client_max_body_size 35M;
     
        index index.php;
     
        charset utf-8;
     

        $if(NIXPACKS_PHP_FALLBACK_PATH) (
            location / {
                try_files $uri $uri/ ${NIXPACKS_PHP_FALLBACK_PATH}?$query_string;
            }
        ) else (
          location / {
                try_files $uri $uri/ /index.php?$query_string;
           }
        )
     
        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }
     
        $if(IS_LARAVEL) (
            error_page 404 /index.php;
        ) else ()
     
        location ~ \.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include $!{nginx}/conf/fastcgi_params;
            include $!{nginx}/conf/fastcgi.conf;
        }
     
        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
}
'''
```

Commit and push to your repository:

```bash
git add nixpacks.toml
git commit -m "Add nixpacks configuration"
git push
```

## Step 6: Set Post-Deployment Command

1. Go to **General** tab
2. Find **Post Deployment Command** section
3. Add:

```bash
php artisan migrate --force && php artisan optimize:clear && php artisan config:clear && php artisan route:clear && php artisan view:clear 
```

4. Click **Save**

## Step 7: Deploy

1. Go back to your project
2. Click **Deploy** button
3. Wait for deployment to complete
4. Your app will be live at the generated URL!

## Step 8: Generate App Key (First Deploy)

After first deployment (or copy paste from local):

1. Go to **Terminal** tab
2. Run:

```bash
php artisan key:generate
```

3. Restart the application

---

## What This Setup Includes

✅ Nginx web server  
✅ PHP-FPM  
✅ Laravel queue workers (12 processes)  
✅ Supervisor for process management  
✅ Auto-restart on failures  

---

## Troubleshooting

**Permission Issues?**

Go to Terminal and run:
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

**Cache Problems?**
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

**Check Logs**

Go to **Logs** tab to see:
- Nginx logs
- PHP-FPM logs
- Queue worker logs
- Application logs