# 🔐 Fix Login NOW - Simple Solution

## ❌ Problem: Login Failed

Since you're using the SQL method, here's the **easiest fix**:

## ✅ Quick Fix (2 Minutes)

### Step 1: Fix Admin Password in Supabase

1. **Open Supabase Dashboard:**
   - Go to: https://supabase.com/dashboard
   - Select your project
   - Click **SQL Editor** (left sidebar)

2. **Run This SQL Script:**
   - Open: `backend/FIX_ADMIN_PASSWORD.sql`
   - **Copy the entire file**
   - Paste into SQL Editor
   - Click **Run** button

3. **Verify:**
   - You should see: "✅ Password hash is correct"
   - Results showing admin user details

### Step 2: Make Sure Backend is Running

Open a terminal and run:

```bash
cd backend
npm run start:dev
```

Wait until you see:
```
🚀 Backend server is running on: http://localhost:3001/api
```

### Step 3: Try Login Again

1. Open: http://localhost:3002/login
2. Use these credentials:
   - **Email:** `admin@sunyani.gov.gh`
   - **Password:** `Admin@2024!`
3. Click **Login**

---

## 🔍 If Still Not Working - Check These

### 1. Check Admin User Exists

Run this SQL in Supabase:

```sql
SELECT 
    u."email",
    u."full_name",
    u."is_active",
    u."email_verified",
    r."name" as "role"
FROM "users" u
JOIN "roles" r ON u."role_id" = r."id"
WHERE u."email" = 'admin@sunyani.gov.gh';
```

**Should show:**
- Email: `admin@sunyani.gov.gh`
- Full name: `System Administrator`
- Is active: `true` ✅
- Email verified: `true` ✅
- Role: `Super Admin`

### 2. Check Password Hash

Run this SQL in Supabase:

```sql
SELECT 
    "email",
    LENGTH("password_hash") as "hash_length",
    SUBSTRING("password_hash", 1, 7) as "hash_start"
FROM "users" 
WHERE "email" = 'admin@sunyani.gov.gh';
```

**Should show:**
- Hash length: `60`
- Hash start: `$2b$10$`

### 3. Check Backend is Running

Look at your terminal where backend is running. Should see:
```
🚀 Backend server is running on: http://localhost:3001/api
```

### 4. Test Login API Directly

Open PowerShell and run:

```powershell
$body = @{
    email = "admin@sunyani.gov.gh"
    password = "Admin@2024!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

**Should return:**
- `access_token` (long string)
- `user` object with email, name, role

If you get an error, check what it says.

### 5. Check Browser Console

1. Open http://localhost:3002/login
2. Press **F12** (open DevTools)
3. Go to **Console** tab
4. Try to login
5. Check for errors

**Common errors:**
- **Network Error**: Backend not running
- **401 Unauthorized**: Password hash wrong
- **404 Not Found**: Backend URL wrong
- **CORS Error**: CORS not enabled

---

## 📋 Admin Credentials (After Fix)

- **Email:** `admin@sunyani.gov.gh`
- **Password:** `Admin@2024!`
- **Login URL:** http://localhost:3002/login

---

## 🎯 Summary

1. ✅ Run `backend/FIX_ADMIN_PASSWORD.sql` in Supabase
2. ✅ Make sure backend is running (`npm run start:dev`)
3. ✅ Try login again
4. ✅ If still fails, check the items above

---

**The SQL script method is the easiest - just run it in Supabase!** 🚀

