// PM2 Ecosystem Configuration for sipsy.ai
// This file defines how PM2 should manage the applications

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
      error_file: '~/.pm2/logs/strapi-error.log',
      out_file: '~/.pm2/logs/strapi-out.log',
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
      error_file: '~/.pm2/logs/nextjs-error.log',
      out_file: '~/.pm2/logs/nextjs-out.log',
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
