# 🔧 Fix Database Connection - Backend Won't Start

## ❌ Problem

Your backend is **crashing during startup** because it can't connect to the database. The error shows:

```
PrismaClientInitializationError: Can't reach database server at `db.skbdfyjkhljjhnokmqob.supabase.co:5432`
```

**This means:**
- Backend never finishes starting
- No server is running on port 3001
- Frontend gets Network Error (no server to connect to)

## ✅ Solution: Fix .env File

The issue is your `.env` file has **URL-encoded password** in the DATABASE_URL.

### Step 1: Open .env File

Open: `backend/.env`

### Step 2: Check Current DATABASE_URL

You probably have something like:
```
DATABASE_URL="postgresql://postgres:8c%21cFP7Drp%246XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres"
```

See the `%21` and `%24`? Those are URL-encoded characters:
- `%21` = `!`
- `%24` = `$`

### Step 3: Fix the DATABASE_URL

Replace with (remove URL encoding, add schema):

```
DATABASE_URL="postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public"
```

**Important changes:**
- `%21` → `!`
- `%24` → `$`
- Add `?schema=public` at the end

### Step 4: Save .env File

Save the file.

### Step 5: Restart Backend

1. **Stop backend** (Ctrl+C if running)

2. **Start backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

3. **Wait for this message:**
   ```
   🚀 Backend server is running on: http://localhost:3001/api
   📡 CORS enabled for origins: http://localhost:3000, http://localhost:3002
   ```

   **NOT the error about database!**

### Step 6: Test Registration

Once backend is running:
1. Go to: http://localhost:3002/login
2. Click **"Create Account"** tab
3. Fill in the form
4. Click **"Create Account"**

## 🔍 Verify Connection String

Your complete `.env` file should look like:

```env
# Supabase Database Connection
DATABASE_URL="postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public"

# JWT Secret (for authentication)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="15m"

# CORS Origins
CORS_ORIGIN="http://localhost:3000,http://localhost:3002"

# Server Port
PORT=3001
```

## 🆘 If Still Not Working

### Check 1: Supabase Project is Active

1. Go to: https://supabase.com/dashboard
2. Make sure your project is active
3. Check if database is accessible

### Check 2: Test Connection Directly

Try connecting with a PostgreSQL client or use Supabase SQL Editor to verify the database is accessible.

### Check 3: Password is Correct

Make sure password is: `8c!cFP7Drp$6XUn`

## 📝 Quick Checklist

- [ ] Open `backend/.env` file
- [ ] Fix DATABASE_URL (remove `%21` and `%24`, add `?schema=public`)
- [ ] Save file
- [ ] Restart backend
- [ ] See "🚀 Backend server is running" message
- [ ] Try registration again

---

**Fix your .env file and restart the backend!** 🚀

