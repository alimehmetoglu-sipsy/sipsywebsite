#!/bin/bash

# SSL Setup Script for sipsy.ai using Let's Encrypt
# This script will configure SSL certificates and HTTPS

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
cp ~/sipsy-website/scripts/nginx-sipsy.conf /etc/nginx/sites-available/sipsy.ai

# Remove default nginx site
if [ -f /etc/nginx/sites-enabled/default ]; then
    rm /etc/nginx/sites-enabled/default
    print_success "Removed default Nginx site"
fi

# Create symlink if it doesn't exist
if [ ! -L /etc/nginx/sites-enabled/sipsy.ai ]; then
    ln -s /etc/nginx/sites-available/sipsy.ai /etc/nginx/sites-enabled/sipsy.ai
    print_success "Created Nginx site symlink"
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
certbot --nginx \
    -d sipsy.ai \
    -d www.sipsy.ai \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --redirect

print_success "SSL certificate obtained and installed"

# Test automatic renewal
print_info "Testing SSL certificate auto-renewal..."
certbot renew --dry-run

print_success "Auto-renewal test successful"

# Setup automatic renewal (cron job)
print_info "Setting up automatic SSL renewal..."
CRON_JOB="0 12 * * * /usr/bin/certbot renew --quiet"
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
echo "  sudo certbot certificates"
echo ""
print_info "To manually renew (if needed):"
echo "  sudo certbot renew"
echo ""
