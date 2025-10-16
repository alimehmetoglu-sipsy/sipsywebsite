#!/bin/bash

# AWS Lightsail Server Setup Script for sipsy.ai
# This script will install and configure all necessary software on Ubuntu 22.04

set -e  # Exit on error

echo "==========================================="
echo "AWS Lightsail Server Setup - sipsy.ai"
echo "==========================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}➜ $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run this script as root or with sudo"
    print_info "Run it as a regular user (ubuntu)"
    exit 1
fi

# Update system packages
print_info "Updating system packages..."
sudo apt-get update -qq
sudo apt-get upgrade -y -qq
print_success "System packages updated"

# Install essential packages
print_info "Installing essential packages..."
sudo apt-get install -y -qq \
    curl \
    git \
    build-essential \
    software-properties-common \
    ufw \
    fail2ban
print_success "Essential packages installed"

# Install Node.js (v20 LTS)
print_info "Installing Node.js v20..."
if command -v node &> /dev/null; then
    print_warning "Node.js already installed ($(node -v))"
else
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y -qq nodejs
    print_success "Node.js v20 installed: $(node -v)"
fi

# Install PM2
print_info "Installing PM2..."
if command -v pm2 &> /dev/null; then
    print_warning "PM2 already installed ($(pm2 -v))"
else
    sudo npm install -g pm2@latest
    pm2 startup systemd -u ubuntu --hp /home/ubuntu
    print_success "PM2 installed: $(pm2 -v)"
fi

# Install Nginx
print_info "Installing Nginx..."
if command -v nginx &> /dev/null; then
    print_warning "Nginx already installed ($(nginx -v 2>&1 | grep -o '[0-9.]*'))"
else
    sudo apt-get install -y -qq nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    print_success "Nginx installed and started"
fi

# Configure UFW Firewall
print_info "Configuring firewall..."
sudo ufw --force enable
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw status
print_success "Firewall configured"

# Configure fail2ban for SSH security
print_info "Configuring fail2ban..."
if [ ! -f /etc/fail2ban/jail.local ]; then
    sudo tee /etc/fail2ban/jail.local > /dev/null <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
EOF
    sudo systemctl enable fail2ban
    sudo systemctl restart fail2ban
    print_success "fail2ban configured"
else
    print_warning "fail2ban already configured"
fi

# Create application directory
print_info "Creating application directory..."
mkdir -p ~/sipsy-website
print_success "Application directory created"

# Install Certbot for SSL
print_info "Installing Certbot for SSL..."
if command -v certbot &> /dev/null; then
    print_warning "Certbot already installed"
else
    sudo snap install core; sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -sf /snap/bin/certbot /usr/bin/certbot
    print_success "Certbot installed"
fi

echo ""
echo "==========================================="
print_success "Server setup completed successfully!"
echo "==========================================="
echo ""
print_info "Next steps:"
echo "  1. Clone your repository to ~/sipsy-website"
echo "  2. Configure environment variables"
echo "  3. Run the deployment script"
echo ""
