#!/bin/bash

# SSL Setup Script for sipsy.ai using Let's Encrypt
# This script will configure SSL certificates and HTTPS for Amazon Linux 2023

set -e

echo "==========================================="
echo "SSL Setup for sipsy.ai"
echo "==========================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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
if [ "$EUID" -ne 0 ]; then
    print_error "This script must be run with sudo"
    print_info "Usage: sudo bash scripts/setup-ssl.sh"
    exit 1
fi

# Detect user home directory
if [ -d "/home/ec2-user" ]; then
    USER_HOME="/home/ec2-user"
elif [ -d "/home/ubuntu" ]; then
    USER_HOME="/home/ubuntu"
else
    USER_HOME="$HOME"
fi

print_info "Using home directory: $USER_HOME"

# Verify domain is pointed to this server
print_info "Checking DNS configuration..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short sipsy.ai | tail -n1)

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    print_warning "DNS may not be configured correctly yet"
    echo "  Server IP: $SERVER_IP"
    echo "  Domain IP: $DOMAIN_IP"
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Please configure DNS first and try again"
        exit 1
    fi
else
    print_success "DNS is configured correctly"
fi

# Copy Nginx configuration
print_info "Installing Nginx configuration..."
cp $USER_HOME/sipsy-website/scripts/nginx-sipsy.conf /etc/nginx/conf.d/sipsy.ai.conf

# Remove default nginx config (Amazon Linux uses conf.d, not sites-available)
if [ -f /etc/nginx/conf.d/default.conf ]; then
    mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled
    print_success "Disabled default Nginx config"
fi

# Test Nginx configuration
print_info "Testing Nginx configuration..."
nginx -t

# Reload Nginx
print_info "Reloading Nginx..."
systemctl reload nginx
print_success "Nginx reloaded"

# Get email for Let's Encrypt
read -p "Enter your email for SSL certificate notifications: " EMAIL

if [ -z "$EMAIL" ]; then
    print_error "Email is required"
    exit 1
fi

# Obtain SSL certificate with Certbot
print_info "Obtaining SSL certificate from Let's Encrypt..."

# Check if certbot is in PATH, if not use full path
if command -v certbot &> /dev/null; then
    CERTBOT_CMD="certbot"
elif [ -f "/usr/local/bin/certbot" ]; then
    CERTBOT_CMD="/usr/local/bin/certbot"
else
    print_error "Certbot not found. Please install it first."
    exit 1
fi

$CERTBOT_CMD --nginx \
    -d sipsy.ai \
    -d www.sipsy.ai \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --redirect

print_success "SSL certificate obtained and installed"

# Test automatic renewal
print_info "Testing SSL certificate auto-renewal..."
$CERTBOT_CMD renew --dry-run

print_success "Auto-renewal test successful"

# Setup automatic renewal (cron job)
print_info "Setting up automatic SSL renewal..."
CERTBOT_PATH=$(which certbot || echo "/usr/local/bin/certbot")
CRON_JOB="0 12 * * * $CERTBOT_PATH renew --quiet"
(crontab -l 2>/dev/null | grep -v certbot; echo "$CRON_JOB") | crontab -
print_success "Automatic renewal configured (runs daily at 12:00)"

# Restart Nginx to apply all changes
print_info "Restarting Nginx..."
systemctl restart nginx
print_success "Nginx restarted"

echo ""
echo "==========================================="
print_success "SSL setup completed successfully!"
echo "==========================================="
echo ""
print_info "Your site is now available at:"
echo "  https://sipsy.ai"
echo "  https://www.sipsy.ai"
echo ""
print_info "SSL certificate will auto-renew before expiration"
echo ""
print_info "To check certificate status:"
echo "  sudo $CERTBOT_CMD certificates"
echo ""
print_info "To manually renew (if needed):"
echo "  sudo $CERTBOT_CMD renew"
echo ""
