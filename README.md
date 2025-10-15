# sipsy.ai - AI & RPA Consulting Website

Modern, professional website for sipsy.ai built with Next.js 15, TypeScript, Tailwind CSS, and Strapi CMS.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Strapi CMS (Headless)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
sipsywebsite/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   └── sections/         # Page sections
├── lib/                   # Utility functions
│   ├── strapi/           # Strapi API integration
│   └── utils/            # Helper functions
├── types/                 # TypeScript type definitions
│   └── strapi/           # Strapi content types
├── public/                # Static assets
│   └── images/           # Image files
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Strapi backend (instructions below)

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your Strapi URL and API token

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 2. Strapi Backend Setup

```bash
# Navigate to parent directory
cd ..

# Create Strapi project
npx create-strapi-app@latest sipsy-backend

# Choose:
# - Custom installation
# - SQLite (for development) or PostgreSQL (for production)
# - Skip example content

# Navigate to Strapi
cd sipsy-backend

# Start Strapi
npm run develop
```

Strapi admin panel will open at [http://localhost:1337/admin](http://localhost:1337/admin)

### 3. Configure Strapi

#### Create Content Types:

1. **Blog Post**
   - title (Text)
   - excerpt (Text)
   - content (Rich Text)
   - slug (UID)
   - category (Text)
   - readTime (Number)
   - featuredImage (Media)
   - publishedAt (DateTime)

2. **Case Study**
   - title (Text)
   - client (Text)
   - industry (Text)
   - challenge (Rich Text)
   - solution (Rich Text)
   - results (Rich Text)
   - slug (UID)
   - featuredImage (Media)
   - publishedAt (DateTime)

3. **Service**
   - title (Text)
   - description (Text)
   - icon (Text)
   - features (JSON)
   - slug (UID)

#### Configure API Permissions:

1. Go to Settings → Users & Permissions → Roles → Public
2. Enable `find` and `findOne` for all content types
3. Save

#### Get API Token:

1. Go to Settings → API Tokens
2. Create new token with "Read-only" access
3. Copy token to `.env.local` as `STRAPI_API_TOKEN`

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Design System

### Colors

- **Primary**: `#0F172A` (Deep Navy)
- **Secondary**: `#3B82F6` (Professional Blue)
- **Accent**: `#10B981` (Success Green)

### Typography

- **Font**: Inter
- **Headings**: Bold, tight line-height
- **Body**: Regular, relaxed line-height

### Components

Reusable classes:
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card component
- `.container-custom` - Container with max-width
- `.section-padding` - Consistent section spacing

## 🔗 API Integration

The site uses Strapi as a headless CMS. API utilities are in `lib/strapi/api.ts`:

```typescript
import { getAll, getBySlug } from '@/lib/strapi/api';

// Get all blog posts
const posts = await getAll('blog-posts');

// Get single post by slug
const post = await getBySlug('blog-posts', 'my-post-slug');
```

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Backend (Strapi Cloud) - Recommended

This project uses a **monorepo structure** with Strapi in the `backend/` directory. Follow these steps:

#### Prerequisites
- Strapi Cloud account (https://cloud.strapi.io)
- GitHub repository with code pushed
- PostgreSQL-compatible database (provided by Strapi Cloud)

#### Deployment Steps

1. **Login to Strapi Cloud**
   - Visit https://cloud.strapi.io
   - Sign in with GitHub, Google, or GitLab

2. **Create New Project**
   - Click "Create Project"
   - Select a plan (Free tier available)
   - Choose this GitHub repository: `alimehmetoglu-sipsy/sipsywebsite`

3. **Configure Deployment Settings**
   - **Base Directory**: Enter `backend` (CRITICAL - this is a monorepo)
   - **Branch**: Select `master`
   - **Region**: Choose closest to your users
   - **Node Version**: Keep default (18+)

4. **Environment Variables**
   Strapi Cloud automatically provides:
   - `DATABASE_*` variables (PostgreSQL)
   - `APP_KEYS`, `API_TOKEN_SALT`, etc.

   Add custom variables if needed:
   - `NODE_ENV=production`
   - Any plugin-specific variables

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (5-10 minutes)
   - Create your first admin user

6. **Update Frontend Environment**
   - Copy your Strapi Cloud URL
   - Update `.env.local` in frontend:
     ```
     NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com
     STRAPI_TOKEN=your-api-token
     ```

#### Troubleshooting

**Error: "Strapi was not found in the project dependencies"**
- Solution: Ensure "Base Directory" is set to `backend` in project settings
- Location: Project Settings → Repository Settings → Base Directory

**Database Connection Issues**
- Strapi Cloud provides PostgreSQL automatically
- No manual database configuration needed
- Verify `pg` package is in `backend/package.json`

### Alternative Deployment Options

- Railway: Deploy from `backend/` directory
- Heroku: Use `heroku.yml` with base directory
- DigitalOcean App Platform: Specify component path
- AWS/Azure/GCP: Manual Docker deployment

## 📚 Next Steps

1. ✅ Basic setup complete
2. 🔄 Create component library (buttons, cards, forms)
3. 🔄 Build homepage using v0.dev prompts
4. 🔄 Create additional pages (Services, Case Studies, Contact)
5. 🔄 Integrate with Strapi for dynamic content
6. 🔄 Add animations and interactions
7. 🔄 SEO optimization
8. 🔄 Performance optimization
9. 🔄 Deploy to production

## 🤝 Contributing

This is a private project for sipsy.ai. For questions or support, contact the development team.

## 📄 License

Proprietary - All rights reserved sipsy.ai © 2025
