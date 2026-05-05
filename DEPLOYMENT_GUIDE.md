# Template Builder Platform - Deployment Guide

## Project Overview

A complete Website Template Builder & Deployer Platform with:
- 1000+ website templates across 20 categories
- Username-based authentication (no passwords needed)
- Template customization with live preview
- Instant deployment with unique URLs
- Credit-based deployment system (2 free deploys/day)
- Full admin panel for management
- JSON file-based storage (no database required)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Frontend
```bash
npm run build
```

### 3. Start Server
```bash
npm run server
```

Server will start on port 3000 (or PORT env variable).

### 4. Access the Platform
Open http://localhost:3000 in your browser.

## Deployment on Railway

### Step 1: Create Project
1. Go to https://railway.app
2. Create a new project
3. Deploy from GitHub repository

### Step 2: Environment Variables
No special environment variables needed. The server runs on port 3000 by default.

### Step 3: Build Command
```
npm install && npm run build
```

### Step 4: Start Command
```
npm run start
```

### Step 5: Deploy
Railway will automatically deploy your app and provide a public URL.

## Admin Panel Access

- URL: `/admin` or click "Admin" button on homepage
- Default Password: `SHADOW`

### Admin Features:
- View dashboard statistics
- Manage users (ban/unban)
- View all deployments
- Assign/remove credits
- Change theme colors
- Update contact info (WhatsApp, Telegram, Email)
- Toggle maintenance mode
- Change deployment limits

## User Flow

1. **Homepage**: Enter a unique username
2. **Dashboard**: Browse 1000+ templates across 20 categories
3. **Template Editor**: Customize template fields with live preview
4. **Deploy**: Click Deploy button to get a unique live URL
5. **My Sites**: View and manage all deployed websites

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/check/:username` - Check username availability
- `GET /api/auth/user/:username` - Get user info

### Templates
- `GET /api/templates/categories` - Get all categories
- `GET /api/templates/category/:id` - Get templates by category
- `GET /api/templates/all` - Get all templates
- `GET /api/templates/:id` - Get single template

### Deploy
- `POST /api/deploy/check` - Check deploy eligibility
- `POST /api/deploy` - Deploy a template
- `GET /api/deploy/user/:username` - Get user's deployments

### Credits
- `GET /api/credits/:username` - Get user credits
- `POST /api/credits/assign` - Assign credits (admin)
- `POST /api/credits/remove` - Remove credits (admin)

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/users` - List users
- `GET /api/admin/deployments` - List deployments
- `POST /api/admin/theme` - Update theme
- `POST /api/admin/contact` - Update contact
- `POST /api/admin/limits` - Update limits
- `POST /api/admin/maintenance` - Toggle maintenance

## File Structure

```
/mnt/agents/output/app/
├── server/                  # Express backend
│   ├── index.cjs           # Main server entry
│   ├── initData.cjs        # Data initialization
│   ├── generateTemplates.cjs # Template generator
│   ├── data/               # JSON storage files
│   ├── routes/             # API routes
│   └── templates/          # 1000+ HTML templates
├── src/                     # React frontend
│   ├── pages/              # Page components
│   ├── components/         # Reusable components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # API utilities
│   └── types/              # TypeScript types
├── dist/                    # Built frontend
├── deployments/             # User deployed sites
└── package.json
```

## Data Storage

All data is stored in JSON files (no database needed):
- `server/data/users.json` - User accounts
- `server/data/deployments.json` - Deployment records
- `server/data/admin.json` - Admin settings
- `server/data/credits.json` - Credit transactions
- `server/data/templatesMeta.json` - Template metadata
- `server/data/dailyLimits.json` - Daily usage tracking
- `server/data/activity.json` - Activity log

## Template Categories

1. Gaming (80 templates)
2. Business (80 templates)
3. Landing Pages (100 templates)
4. Portfolio (60 templates)
5. Social Media (50 templates)
6. Automation (40 templates)
7. E-Commerce (60 templates)
8. Education (40 templates)
9. Entertainment (50 templates)
10. Tools & Utilities (60 templates)
11. Fun & Quirky (40 templates)
12. Freelancing (50 templates)
13. Health & Fitness (40 templates)
14. Food & Restaurant (40 templates)
15. Travel & Tourism (40 templates)
16. Real Estate (30 templates)
17. Technology (50 templates)
18. Fashion & Beauty (30 templates)
19. Music & Audio (30 templates)
20. Sports & Fitness (30 templates)

## Support

For help or credit purchases, contact admin via:
- WhatsApp: Available in Contact page
- Telegram: Available in Contact page
- Email: Available in Contact page
