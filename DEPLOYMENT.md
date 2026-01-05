# Sunyani Municipal Platform - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- PostgreSQL 15+ database
- Git for version control
- Accounts on hosting platforms (Vercel, Render/Railway, Supabase/Neon)

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and set project name
   - Set a strong database password
   - Select region closest to your users (Europe for Ghana)

2. **Get Connection String**
   - Go to Project Settings > Database
   - Copy the "Connection string" (URI format)
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

3. **Run Migrations**
   ```bash
   cd backend
   
   # Set DATABASE_URL in .env
   DATABASE_URL="your-supabase-connection-string"
   
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate deploy
   
   # Seed database
   npx prisma db seed
   ```

### Option 2: Neon

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Follow same migration steps as Supabase

### Option 3: Local PostgreSQL

```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# Create database
createdb sunyani_db

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/sunyani_db"

# Run migrations
cd backend
npx prisma migrate deploy
npx prisma db seed
```

## 🚀 Backend Deployment

### Option 1: Render (Recommended)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" > "Web Service"
   - Connect your GitHub repository
   - Select `backend` directory as root

3. **Configure Service**
   ```
   Name: sunyani-api
   Environment: Node
   Build Command: npm install && npx prisma generate && npm run build
   Start Command: npm run start:prod
   ```

4. **Add Environment Variables**
   ```
   DATABASE_URL=your-database-connection-string
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
   JWT_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d
   PORT=3001
   NODE_ENV=production
   UPLOAD_DIR=./uploads
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your API URL (e.g., `https://sunyani-api.onrender.com`)

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add service from GitHub repo
4. Set root directory to `backend`
5. Add environment variables
6. Deploy

## 🌐 Frontend Deployment

### Vercel (Recommended)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "Add New..." > "Project"
   - Import your GitHub repository
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Click "Deploy"

3. **Add Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   NEXT_PUBLIC_SITE_NAME=Sunyani Municipal Assembly
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add custom domain (e.g., sunyani.gov.gh)
   - Update DNS records as instructed

### Deploy Admin Dashboard

Repeat the same process for the admin dashboard:
- Root Directory: `admin`
- Add same environment variables
- Deploy to separate Vercel project

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings

In `backend/src/main.ts`, update allowed origins:

```typescript
app.enableCors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'https://your-admin-domain.vercel.app',
  ],
  credentials: true,
});
```

### 2. Test API Connection

```bash
# Test backend health
curl https://your-backend-url.onrender.com/health

# Test login
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sunyani.gov.gh","password":"Admin@2024!"}'
```

### 3. Change Default Admin Password

1. Login to admin dashboard
2. Go to Settings > Profile
3. Change password immediately

### 4. Configure File Uploads

For production, consider using cloud storage:

**Cloudinary Setup** (if needed later):
```bash
npm install cloudinary
```

Add to environment variables:
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📊 Monitoring & Maintenance

### Set Up Error Tracking

1. **Sentry** (Optional)
   ```bash
   npm install @sentry/node @sentry/nextjs
   ```

2. Add to environment:
   ```
   SENTRY_DSN=your-sentry-dsn
   ```

### Database Backups

**Supabase**:
- Automatic daily backups included
- Access via Dashboard > Database > Backups

**Neon**:
- Automatic backups with point-in-time recovery
- Configure retention period in settings

### Monitor Performance

- **Vercel Analytics**: Enable in project settings
- **Render Metrics**: View in dashboard
- **Database Metrics**: Monitor in Supabase/Neon dashboard

## 🔒 Security Checklist

- [ ] Changed default admin password
- [ ] Set strong JWT secrets (min 32 characters)
- [ ] Enabled HTTPS (automatic on Vercel/Render)
- [ ] Configured CORS properly
- [ ] Set up database backups
- [ ] Enabled rate limiting (if implemented)
- [ ] Reviewed and secured environment variables
- [ ] Set up monitoring and error tracking

## 🚨 Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure all environment variables are set
- Check build logs for errors
- Verify Prisma migrations ran successfully

### Frontend can't connect to API
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running and accessible
- Check browser console for errors

### Database connection issues
- Verify connection string format
- Check database is accessible from deployment platform
- Ensure IP allowlist includes deployment platform (if applicable)
- Test connection with Prisma Studio locally

## 📞 Support

For deployment issues:
1. Check platform documentation (Vercel, Render, Supabase)
2. Review error logs in platform dashboards
3. Test locally first to isolate issues
4. Check environment variables are correctly set

## 🎉 Success!

Once deployed, your platform will be accessible at:
- **Public Website**: https://your-domain.vercel.app
- **Admin Dashboard**: https://your-admin-domain.vercel.app
- **API**: https://your-backend-url.onrender.com

**Next Steps**:
1. Share URLs with stakeholders
2. Train admin users
3. Start adding content
4. Monitor performance and user feedback
5. Plan for continuous improvements

---

**Congratulations on deploying the Sunyani Municipal Platform! 🎊**
