# 🚀 Supabase Quick Setup Guide

## ✅ Connection String Ready

Your `.env` file has been created with your database password!

**Connection String:**
```
postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public
```

## 📋 Two Setup Options

### Option 1: Use Prisma Migrations (Recommended)

This is the easiest and most reliable method:

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate dev --name init
npm run seed
```

This will:
- ✅ Create all tables automatically
- ✅ Set up all indexes
- ✅ Create admin user with proper password hash
- ✅ Add sample data

### Option 2: Use SQL Script (Alternative)

If Prisma migrations don't work, use the SQL script:

1. **Go to Supabase Dashboard:**
   - Navigate to: https://supabase.com/dashboard
   - Select your project
   - Go to **SQL Editor**

2. **Run the SQL Script:**
   - Open `backend/supabase_setup.sql`
   - Copy the entire contents
   - Paste into Supabase SQL Editor
   - Click **Run**

3. **Create Admin User:**
   After running the SQL, you still need to create the admin user with the correct password hash. Run:
   ```bash
   cd backend
   npm run seed
   ```

## 🔐 Admin Login Credentials

After setup, use these credentials:

- **Email:** `admin@sunyani.gov.gh`
- **Password:** `Admin@2024!`

## ✅ Verification Steps

1. **Check Tables:**
   - Go to Supabase Dashboard → Table Editor
   - You should see all tables: `users`, `roles`, `businesses`, `jobs`, etc.

2. **Test Backend Connection:**
   ```bash
   cd backend
   npm run start:dev
   ```
   - Should start without database errors
   - Look for: `🚀 Backend server is running on: http://localhost:3001/api`

3. **Test Admin Login:**
   - Go to: http://localhost:3002/login
   - Login with admin credentials
   - Should redirect to dashboard

## 🆘 Troubleshooting

### Connection Error
- Verify password is correct: `8c!cFP7Drp$6XUn`
- Check Supabase project is active
- Ensure connection string format is correct

### Migration Errors
- Make sure Prisma schema is up to date
- Check if tables already exist (may need to reset)
- Try the SQL script instead

### Admin Login Not Working
- Run the seed script: `npm run seed`
- Verify admin user exists in `users` table
- Check password hash is correct

## 📝 Important Notes

- **Never commit** `.env` file to version control
- Change admin password after first login
- Update `JWT_SECRET` in production
- Keep database password secure

---

**Your database is ready! Choose Option 1 (Prisma) for easiest setup, or Option 2 (SQL) if needed.** 🎉

