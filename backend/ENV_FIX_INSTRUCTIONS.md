# 🔧 Fix .env File - Step by Step

## 📋 Current Problem

Your `.env` file has **URL-encoded password** in the DATABASE_URL, which prevents the backend from connecting to the database.

## ✅ Step-by-Step Fix

### Step 1: Locate .env File

Go to: `backend/.env`

### Step 2: Open in Text Editor

Open the file in any text editor (VS Code, Notepad, etc.)

### Step 3: Find DATABASE_URL Line

Look for a line that starts with:
```
DATABASE_URL="postgresql://postgres:8c%21cFP7Drp%246XUn@...
```

### Step 4: Replace the Entire DATABASE_URL Line

**Replace this:**
```
DATABASE_URL="postgresql://postgres:8c%21cFP7Drp%246XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres"
```

**With this:**
```
DATABASE_URL="postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public"
```

**Changes:**
- `%21` → `!`
- `%24` → `$`
- Added `?schema=public` at the end

### Step 5: Complete .env File

Your entire `backend/.env` file should be:

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

### Step 6: Save File

**Save the file** (Ctrl+S)

### Step 7: Restart Backend

1. Go to terminal where backend is running
2. Press **Ctrl+C** to stop it
3. Run:
   ```bash
   cd backend
   npm run start:dev
   ```

4. **Wait for this message:**
   ```
   🚀 Backend server is running on: http://localhost:3001/api
   📡 CORS enabled for origins: http://localhost:3000, http://localhost:3002
   ```

   **NOT this error:**
   ```
   ❌ Can't reach database server...
   ```

### Step 8: Test Registration

Once backend is running:
1. Go to: http://localhost:3002/login
2. Click **"Create Account"** tab
3. Fill in:
   - Full Name: Your name
   - Email: your@email.com
   - Password: (minimum 6 characters)
   - Confirm Password: (same as password)
4. Click **"Create Account"**

You should now:
- ✅ See "Account created successfully!" message
- ✅ Be automatically logged in
- ✅ Redirected to dashboard

## 🔍 Visual Guide

**WRONG (URL-encoded):**
```
DATABASE_URL="...8c%21cFP7Drp%246XUn..."
                      ^^        ^^
                      !!        $$
```

**CORRECT (plain text):**
```
DATABASE_URL="...8c!cFP7Drp$6XUn...?schema=public"
                      ^        ^              ^
                      !        $         (add this)
```

## ⚠️ Important Notes

- **No spaces** around the `=` sign
- **Use quotes** around the connection string
- **Password is:** `8c!cFP7Drp$6XUn` (with `!` and `$`, not `%21` and `%24`)
- **Must include:** `?schema=public` at the end

---

**Fix your .env file and restart the backend!** 🚀

