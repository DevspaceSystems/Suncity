# 🔐 Create Admin User - Quick Guide

## ✅ Easiest Method: Use SQL Script

Since you've already run the main SQL setup, just create the admin user:

### Steps:

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select your project
   - Click **SQL Editor**

2. **Run the Admin User Script:**
   - Open `backend/create_admin_user.sql`
   - Copy the entire file
   - Paste into SQL Editor
   - Click **Run**

3. **Verify:**
   - You should see: "✅ Admin user created successfully!"
   - Check the results table at the bottom

### Admin Credentials:

- **Email:** `admin@sunyani.gov.gh`
- **Password:** `Admin@2024!`

---

## 🔧 Alternative: Fix .env and Use Seed Script

If you want to use `npm run seed`, fix your `.env` file:

### Current Issue:

Your `.env` has URL-encoded password:
```
DATABASE_URL="postgresql://postgres:8c%21cFP7Drp%246XUn@..."
```

### Fix:

Update `backend/.env` to:
```env
DATABASE_URL="postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public"
```

**Important:** 
- Remove URL encoding (`%21` → `!`, `%24` → `$`)
- Add `?schema=public` at the end

Then run:
```bash
cd backend
npm run prisma:generate
npm run seed
```

---

## 🎯 Recommendation

**Use the SQL script method** - it's faster and doesn't require fixing .env!

Just run `backend/create_admin_user.sql` in Supabase SQL Editor.

