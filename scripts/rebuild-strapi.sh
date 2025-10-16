#!/bin/bash
# Strapi Cache Clear and Rebuild Script

echo "Stopping Strapi backend..."
pm2 stop strapi-backend

echo "Deleting PM2 process..."
pm2 delete strapi-backend

echo "Clearing Strapi cache and build artifacts..."
cd ~/sipsywebsite/backend
rm -rf .cache dist build node_modules/.cache

echo "Rebuilding Strapi with increased memory..."
NODE_OPTIONS="--max-old-space-size=2048" npm run build

echo "Starting Strapi backend..."
pm2 start ~/sipsywebsite/ecosystem.config.js --only strapi-backend
pm2 save

echo "Checking PM2 status..."
pm2 status

echo "Done! Strapi should now use the updated configuration."
echo "Check logs with: pm2 logs strapi-backend"
