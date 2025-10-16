#!/bin/bash

# Deployment Script for sipsy.ai
# This script will deploy both Strapi backend and Next.js frontend

set -e  # Exit on error

echo "==========================================="
echo "Deploying sipsy.ai"
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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Check for .env files
print_info "Checking environment files..."
if [ ! -f "backend/.env" ]; then
    print_error "backend/.env file not found!"
    print_info "Please create backend/.env from backend/.env.production.template"
    exit 1
fi

if [ ! -f ".env.local" ]; then
    print_error ".env.local file not found!"
    print_info "Please create .env.local from .env.production.template"
    exit 1
fi

print_success "Environment files found"

# Install dependencies for backend
print_info "Installing Strapi dependencies..."
cd backend
npm ci --production=false --quiet
print_success "Strapi dependencies installed"

# Build Strapi admin panel
print_info "Building Strapi admin panel..."
NODE_ENV=production npm run build
print_success "Strapi admin panel built"

cd ..

# Install dependencies for frontend
print_info "Installing Next.js dependencies..."
npm ci --production=false --quiet
print_success "Next.js dependencies installed"

# Build Next.js application
print_info "Building Next.js application..."
npm run build
print_success "Next.js application built"

# Stop existing PM2 processes (if any)
print_info "Stopping existing PM2 processes..."
pm2 stop all || true
print_success "PM2 processes stopped"

# Start Strapi with PM2
print_info "Starting Strapi with PM2..."
cd backend
pm2 start npm --name "strapi-backend" -- start
cd ..
print_success "Strapi started"

# Start Next.js with PM2
print_info "Starting Next.js with PM2..."
pm2 start npm --name "nextjs-frontend" --  start
print_success "Next.js started"

# Save PM2 process list
print_info "Saving PM2 process list..."
pm2 save
print_success "PM2 process list saved"

# Display PM2 status
echo ""
print_info "Current PM2 processes:"
pm2 list

echo ""
echo "==========================================="
print_success "Deployment completed successfully!"
echo "==========================================="
echo ""
print_info "Your applications are now running:"
echo "  • Strapi: http://localhost:1337"
echo "  • Next.js: http://localhost:3000"
echo ""
print_info "To view logs:"
echo "  • Strapi: pm2 logs strapi-backend"
echo "  • Next.js: pm2 logs nextjs-frontend"
echo ""
print_info "To restart:"
echo "  • pm2 restart all"
echo ""
