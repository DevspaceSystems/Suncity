# 🔧 Fix Seed Script Error

## ❌ Error You're Seeing

```
Can't reach database server at `db.skbdfyjkhljjhnokmqob.supabase.co:5432`
```

## 🔍 Why This Happens

The seed script can't connect to your Supabase database. This is usually because:

1. **.env file missing or incorrect**
2. **Connection string format wrong**
3. **Database not accessible** (firewall, network)

## ✅ Solution: Create Admin User via SQL (Easiest)

Since you've already run the SQL setup script, just run this to create the admin user:

### Step 1: Go to Supabase SQL Editor

1. Open: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run Admin User Script

1. Open `backend/create_admin_user.sql`
2. Copy the entire file
3. Paste into SQL Editor
4. Click **Run**

This will create/update the admin user with:
- **Email:** `admin@sunyani.gov.gh`
- **Password:** `Admin@2024!`

## 🔧 Alternative: Fix Prisma Connection

If you want to use `npm run seed` instead:

### Step 1: Check .env File

Make sure `backend/.env` exists and has:

```env
DATABASE_URL="postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public"
```

### Step 2: Test Connection

```bash
cd backend
npm run prisma:generate
npm run prisma:studio
```

If Prisma Studio opens, connection works!

### Step 3: Run Seed

```bash
npm run seed
```

## 🎯 Recommended Approach

**Use the SQL script** (`create_admin_user.sql`) - it's simpler and works directly in Supabase!

---

**After creating the admin user, you can login at: http://localhost:3002/login**

