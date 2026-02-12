# VPS Setup Guide

Step-by-step guide to set up a Virtual Private Server for deployment.

## Prerequisites

- Access to any cloud provider (DigitalOcean, Linode, AWS, etc.)
- A terminal application on your local machine
- Basic command line knowledge

## Step 1: Create Your Server

1. Log into your cloud provider dashboard
2. Create a new server/droplet/instance
3. Choose **Ubuntu 20.04 LTS** or **Ubuntu 22.04 LTS**
4. Select your preferred server size
5. Choose a datacenter location close to your users
6. Deploy the server

## Step 2: Connect to Your Server

```bash
ssh root@YOUR_SERVER_IP
```

Replace `YOUR_SERVER_IP` with your actual server IP address.

## Step 3: Update the System

```bash
apt update
apt upgrade -y
apt update
```

## Step 4: Create a New User

```bash
# Create new user
adduser username

# Add user to sudo group
usermod -aG sudo username
```

Replace `username` with your desired username.

## Step 5: Set Up SSH Keys

### On Your Local Machine

```bash
# Generate SSH key
ssh-keygen -t ed25519

# Copy your public key
cat ~/.ssh/id_ed25519.pub
```

Copy the output (your public key).

### On Your Server

```bash
# Switch to your new user
su - username

# Create SSH directory
mkdir ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
```

Paste your public key and save (Ctrl+X, Y, Enter).

```bash
# Set correct permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

## Step 6: Test SSH Key Login

Open a new terminal and test:

```bash
ssh username@YOUR_SERVER_IP
```

You should be able to log in without a password.

## Step 7: Disable Password Login

```bash
sudo nano /etc/ssh/sshd_config
```

Find and change these lines:

```
PasswordAuthentication no
PermitRootLogin no
```

Save and restart SSH:

```bash
sudo systemctl restart ssh
```

## Step 8: Configure Firewall

```bash
# Install firewall
sudo apt install ufw -y

# Allow SSH
sudo ufw allow 22

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

## Step 9: Install Essential Tools

```bash
# Install basic tools
sudo apt install htop curl wget git -y

# Install web server (choose one)
sudo apt install nginx -y
# OR
sudo apt install apache2 -y
```

## Verification

Check that everything is working:

```bash
# Check system status
sudo systemctl status ssh
sudo systemctl status ufw

# Check open ports
sudo ufw status

# Check system resources
htop
```

## Next Steps

Your VPS is now ready for deployment. You can:

- Install your application runtime (Node.js, Python, etc.)
- Set up a database
- Configure your web server
- Deploy your application

**Important**: Always keep your system updated with `sudo apt update && sudo apt upgrade`