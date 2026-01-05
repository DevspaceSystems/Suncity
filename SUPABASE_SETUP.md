# Supabase Database Setup Guide

## 📋 Supabase Connection Details

**Project URL**: `https://skbdfyjkhljjhnokmqob.supabase.co`  
**Publishable API Key**: `sb_publishable_4JL1ffIU6zl-cdNkL_XiJQ_yJKIq3b7`

## 🔧 Setup Instructions

### Step 1: Get Your Supabase Database Connection String

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Settings** → **Database**
3. Find the **Connection string** section
4. Copy the **URI** connection string (it should look like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres
   ```

### Step 2: Update Backend .env File

Create or update `backend/.env` with:

```env
# Supabase Database Connection
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public"

# JWT Secret (for authentication)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="15m"

# CORS Origins
CORS_ORIGIN="http://localhost:3000,http://localhost:3002"

# Server Port
PORT=3001
```

**Important**: Replace `[YOUR-PASSWORD]` with your actual Supabase database password.

### Step 3: Run Database Migration

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate dev --name init
```

This will:
- Generate Prisma client
- Create all tables in your Supabase database
- Run the initial migration

### Step 4: Seed the Database (Optional)

```bash
cd backend
npm run seed
```

This will create:
- Admin user: `admin@sunyani.gov.gh` / `Admin@2024!`
- Default roles and permissions
- Sample data

### Step 5: Restart Backend Server

```bash
cd backend
npm run start:dev
```

## ✅ Verification

1. **Test Database Connection**:
   - Backend should start without database errors
   - Check console for "🚀 Backend server is running"

2. **Test Admin Login**:
   - Go to http://localhost:3002/login
   - Use: `admin@sunyani.gov.gh` / `Admin@2024!`
   - Should successfully log in

3. **Check Database**:
   - Go to Supabase dashboard → Table Editor
   - You should see all tables created (users, roles, businesses, jobs, etc.)

## 🔐 Security Notes

- **Never commit** your `.env` file to version control
- Keep your database password secure
- Change the JWT_SECRET in production
- The admin password should be changed after first login

## 🆘 Troubleshooting

### Connection Error
- Verify your database password is correct
- Check that your Supabase project is active
- Ensure the connection string format is correct

### Migration Errors
- Make sure Prisma schema is up to date
- Check if tables already exist (may need to reset)
- Verify database permissions

### Authentication Issues
- Ensure JWT_SECRET is set
- Check that admin user was created in seed
- Verify password hash is correct

---

**Your Supabase database is now connected!** 🎉

