# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Strapi v5.23.4 headless CMS server application built with TypeScript. It provides a backend API for content management with block-based content modeling capabilities.

## Architecture

### Core Structure

- **Config Layer** (`backend/config/`): Database, middleware, admin, and server configuration
- **Application Layer** (`backend/src/`): Main application entry point and lifecycle hooks
- **API Layer** (`backend/src/api/`): Content types, controllers, routes, and services (currently empty - will be populated as content types are created)
- **Admin Layer** (`backend/src/admin/`): Admin panel customizations
- **Extensions** (`backend/src/extensions/`): Plugin extensions and customizations

### Key Configuration Files

- `backend/config/database.ts`: Database configuration (currently SQLite with better-sqlite3)
- `backend/config/server.ts`: Server configuration and port settings
- `backend/config/middlewares.ts`: Middleware stack configuration
- `backend/src/index.ts`: Application lifecycle hooks (register/bootstrap)

## Development Commands

### Core Development

```bash
npm run develop    # Start development server with auto-reload
npm run dev        # Alias for develop
npm run start      # Start production server
npm run build      # Build admin panel
```


### Strapi CLI

```bash
npm run strapi     # Access Strapi CLI directly
npm run console    # Open Strapi console
npm run deploy     # Deploy to Strapi Cloud
```

### Maintenance

```bash
npm run upgrade        # Upgrade to latest Strapi version
npm run upgrade:dry    # Preview upgrade changes
```

## Environment Configuration

The application uses environment variables defined in `.env.local`:

- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 1337)
- `STRAPI_TOKEN` : Bearer token
- `APP_KEYS`: Application encryption keys
- `API_TOKEN_SALT`: API token salt
- `ADMIN_JWT_SECRET`: Admin JWT secret
- `TRANSFER_TOKEN_SALT`: Transfer token salt
- `JWT_SECRET`: General JWT secret
- `ENCRYPTION_KEY`: Encryption key

Copy `.env.example` to `.env` and update values for local development.

## TypeScript Configuration

- **Target**: ES2019 with CommonJS modules
- **Strict Mode**: Disabled (Strapi compatibility)
- **Output**: `dist/` directory
- **Excludes**: Admin files, tests, and plugins from server compilation

## Content Type Development

When creating new content types, they will be automatically scaffolded in:

- `backend/src/api/[content-type]/controllers/`
- `backend/src/api/[content-type]/routes/`
- `backend/src/api/[content-type]/services/`
- `backend/src/api/[content-type]/content-types/`

Use the Strapi admin panel or CLI to generate content types rather than creating them manually.

## Admin Panel

Access the admin panel at `http://localhost:1337/admin` when running in development mode. Admin customizations go in `src/admin/`.

## Strapi Documentation Reference

When answering questions about Strapi features, architecture, or best practices, reference the official Strapi v5 documentation:

### Core Documentation Areas

- **Installation & Setup**: `https://docs.strapi.io/cms/installation`, `https://docs.strapi.io/cms/quick-start`
- **Project Structure**: `https://docs.strapi.io/cms/project-structure`
- **Configuration**: `https://docs.strapi.io/cms/configurations/database`, `https://docs.strapi.io/cms/configurations/server`, `https://docs.strapi.io/cms/configurations/environment`
- **Backend Customization**: `https://docs.strapi.io/cms/backend-customization/controllers`, `https://docs.strapi.io/cms/backend-customization/services`, `https://docs.strapi.io/cms/backend-customization/routes`, `https://docs.strapi.io/cms/backend-customization/policies`, `https://docs.strapi.io/cms/backend-customization/middlewares`
- **Content API**: `https://docs.strapi.io/cms/api/content-api`, `https://docs.strapi.io/cms/api/rest`, `https://docs.strapi.io/cms/api/document-service`
- **Admin Panel**: `https://docs.strapi.io/cms/admin-panel-customization`, `https://docs.strapi.io/cms/features/admin-panel`
- **Content Management**: `https://docs.strapi.io/cms/features/content-manager`, `https://docs.strapi.io/cms/features/content-type-builder`
- **Plugin Development**: `https://docs.strapi.io/cms/plugins-development/developing-plugins`, `https://docs.strapi.io/cms/plugins-development/create-a-plugin`

### Key Features Documentation

- **Draft & Publish**: `https://docs.strapi.io/cms/features/draft-and-publish`
- **Internationalization**: `https://docs.strapi.io/cms/features/internationalization`
- **Role-Based Access Control**: `https://docs.strapi.io/cms/features/rbac`
- **Users & Permissions**: `https://docs.strapi.io/cms/features/users-permissions`
- **API Tokens**: `https://docs.strapi.io/cms/features/api-tokens`
- **Media Library**: `https://docs.strapi.io/cms/features/media-library`
- **Custom Fields**: `https://docs.strapi.io/cms/features/custom-fields`
- **Review Workflows**: `https://docs.strapi.io/cms/features/review-workflows`
- **Releases**: `https://docs.strapi.io/cms/features/releases`
- **Content History**: `https://docs.strapi.io/cms/features/content-history`
- **Audit Logs**: `https://docs.strapi.io/cms/features/audit-logs`

### Cloud & Deployment

- **Strapi Cloud**: `https://docs.strapi.io/cloud/getting-started/intro`, `https://docs.strapi.io/cloud/projects/overview`
- **Deployment**: `https://docs.strapi.io/cms/deployment`, `https://docs.strapi.io/cloud/getting-started/deployment`
- **CLI**: `https://docs.strapi.io/cms/cli`, `https://docs.strapi.io/cloud/cli/cloud-cli`

### Development Topics

- **TypeScript**: `https://docs.strapi.io/cms/typescript`, `https://docs.strapi.io/cms/typescript/development`
- **Testing**: `https://docs.strapi.io/cms/testing`
- **Database**: `https://docs.strapi.io/cms/configurations/database`, `https://docs.strapi.io/cms/database-migrations`
- **Error Handling**: `https://docs.strapi.io/cms/error-handling`
- **Webhooks**: `https://docs.strapi.io/cms/backend-customization/webhooks`
- **CRON Jobs**: `https://docs.strapi.io/cms/configurations/cron`

## Data Transfer & Deployment

### Export Data from Local Strapi

To export data from local Strapi instance (content, files, and configurations):

```bash
cd backend
npm run strapi export
```

This creates an encrypted export file: `backend/export_YYYYMMDDHHMMSS.tar.gz.enc`

**Note**:
- Export includes: entities, assets, links, and configurations
- Admin users and API tokens are NOT exported
- Leave encryption password empty when prompted (press Enter)

### Import Data to Production

1. **Copy export file to AWS server:**
```bash
scp -i sipsy-lightsail-key.pem backend/export_*.tar.gz.enc bitnami@54.243.251.248:~/sipsywebsite/backend/
```

2. **SSH to AWS server:**
```bash
ssh -i sipsy-lightsail-key.pem bitnami@54.243.251.248
```

3. **Import data:**
```bash
cd ~/sipsywebsite/backend
npm run strapi import -- -f ./export_YYYYMMDDHHMMSS.tar.gz.enc
```

When prompted:
- Press Enter for decryption key (if no password was used during export)
- Type "Yes" to confirm data deletion warning

4. **Restart services:**
```bash
pm2 restart strapi-backend
pm2 restart nextjs-frontend
```

### Alternative: Strapi Transfer Command

For direct transfer between instances (requires transfer token):

```bash
cd backend
npm run strapi transfer -- --to https://sipsy.ai/admin --to-token YOUR_TRANSFER_TOKEN --exclude files --force
```

**Important Notes**:
- `--exclude files`: Recommended to avoid S3 ACL issues during transfer
- `--force`: Bypasses confirmation prompts (use with caution)
- Transfer token can be found in `.env.local` under `STRAPI_TRANSFER_TOKEN`
- Both instances must have matching schemas

### Common Issues & Solutions

**S3 ACL Error during import:**
- **Cause**: Modern S3 buckets don't support ACLs by default
- **Solution**: Already fixed in `backend/config/plugins.ts` by removing `ACL: 'public-read'` parameter
- Files will rely on bucket policy for public access

**Memory error during build on AWS:**
- **Cause**: Insufficient RAM for admin panel build
- **Solution**: Use export/import instead of live transfer for large datasets

**Schema mismatch warnings:**
- **Cause**: Content types don't exist on destination
- **Solution**: Import includes configurations which will create missing content types automatically

### AWS Production Server

**SSH Connection:**
```bash
ssh -i sipsy-lightsail-key.pem bitnami@54.243.251.248
```

**Project Location:**
```bash
cd ~/sipsywebsite
```

**Check Services:**
```bash
pm2 list
pm2 logs strapi-backend --lines 50
pm2 logs nextjs-frontend --lines 50
```

**Restart Services:**
```bash
pm2 restart strapi-backend
pm2 restart nextjs-frontend
```

**Update Code from Git:**
```bash
cd ~/sipsywebsite
git pull origin master
npm run build  # if needed (may fail due to memory constraints)
pm2 restart all
```