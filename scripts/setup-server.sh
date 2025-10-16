#!/bin/bash

# AWS Lightsail Server Setup Script for sipsy.ai
# This script will install and configure all necessary software on Amazon Linux 2023

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

# Detect OS
print_info "Detecting operating system..."
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VER=$VERSION_ID
    print_success "Detected: $PRETTY_NAME"
else
    print_error "Cannot detect OS"
    exit 1
fi

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run this script as root or with sudo"
    print_info "Run it as a regular user (ec2-user)"
    exit 1
fi

# Update system packages
print_info "Updating system packages..."
sudo dnf update -y -q
print_success "System packages updated"

# Install essential packages
print_info "Installing essential packages..."
sudo dnf install -y -q \
    git \
    tar \
    wget \
    curl \
    gcc-c++ \
    make
print_success "Essential packages installed"

# Check Node.js
print_info "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js already installed: $NODE_VERSION"
else
    print_info "Installing Node.js v20..."
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo dnf install -y nodejs
    print_success "Node.js v20 installed: $(node -v)"
fi

# Install PM2
print_info "Installing PM2..."
if command -v pm2 &> /dev/null; then
    print_warning "PM2 already installed ($(pm2 -v))"
else
    sudo npm install -g pm2@latest
    pm2 startup systemd -u ec2-user --hp /home/ec2-user
    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
    print_success "PM2 installed: $(pm2 -v)"
fi

# Install Nginx
print_info "Installing Nginx..."
if command -v nginx &> /dev/null; then
    print_warning "Nginx already installed ($(nginx -v 2>&1 | grep -o '[0-9.]*'))"
else
    sudo dnf install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    print_success "Nginx installed and started"
fi

# Configure Firewall (firewalld on Amazon Linux)
print_info "Configuring firewall..."
if command -v firewall-cmd &> /dev/null; then
    sudo systemctl start firewalld
    sudo systemctl enable firewalld
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --reload
    print_success "Firewall configured"
else
    print_warning "firewalld not available, skipping..."
fi

# Install fail2ban (optional, may not be in default repos)
print_info "Checking fail2ban..."
if sudo dnf install -y fail2ban 2>/dev/null; then
    sudo tee /etc/fail2ban/jail.local > /dev/null <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
EOF
    sudo systemctl enable fail2ban
    sudo systemctl start fail2ban
    print_success "fail2ban configured"
else
    print_warning "fail2ban not available in repos, skipping..."
fi

# Create application directory
print_info "Creating application directory..."
mkdir -p ~/sipsy-website
print_success "Application directory created"

# Install Certbot for SSL (using Python pip on Amazon Linux 2023)
print_info "Installing Certbot for SSL..."
if command -v certbot &> /dev/null; then
    print_warning "Certbot already installed"
else
    sudo dnf install -y python3-pip augeas-libs
    sudo python3 -m pip install certbot certbot-nginx
    print_success "Certbot installed"
fi

echo ""
echo "==========================================="
print_success "Server setup completed successfully!"
echo "==========================================="
echo ""
print_info "System Information:"
echo "  • Node.js: $(node -v)"
echo "  • NPM: $(npm -v)"
echo "  • PM2: $(pm2 -v 2>/dev/null || echo 'not found')"
echo "  • Nginx: $(nginx -v 2>&1 | grep -o '[0-9.]*' | head -1)"
echo ""
print_info "Next steps:"
echo "  1. Clone your repository to ~/sipsy-website"
echo "  2. Configure environment variables"
echo "  3. Run the deployment script"
echo ""
