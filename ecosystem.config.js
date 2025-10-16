// PM2 Ecosystem Configuration for sipsy.ai
// This file defines how PM2 should manage the applications

const os = require('os');
const path = require('path');

// Get user home directory
const homeDir = os.homedir();
const logDir = path.join(homeDir, '.pm2', 'logs');

module.exports = {
  apps: [
    {
      name: 'strapi-backend',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      error_file: path.join(logDir, 'strapi-error.log'),
      out_file: path.join(logDir, 'strapi-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',
      watch: false,
    },
    {
      name: 'nextjs-frontend',
      cwd: './',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: path.join(logDir, 'nextjs-error.log'),
      out_file: path.join(logDir, 'nextjs-out.log'),
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '400M',
      watch: false,
    },
  ],
};
