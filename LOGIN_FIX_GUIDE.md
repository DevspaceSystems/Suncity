# 🔐 Fix Login Issue - Complete Guide

## ❌ Problem: "Login failed" 

If you're getting "Login failed" when trying to login, follow these steps:

## 🚀 Quick Fix (Choose One Method)

### Method 1: SQL Script (Easiest) ⭐ Recommended

1. **Go to Supabase SQL Editor:**
   - https://supabase.com/dashboard
   - Select your project
   - Click **SQL Editor**

2. **Run the Fix Script:**
   - Open: `backend/FIX_ADMIN_PASSWORD.sql`
   - Copy entire file
   - Paste into SQL Editor
   - Click **Run**

3. **Verify:**
   - Should see: "✅ Password hash is correct"
   - Results table showing admin user details

4. **Try Login Again:**
   - Email: `admin@sunyani.gov.gh`
   - Password: `Admin@2024!`

### Method 2: Test Script (Diagnostic)

Run this to check what's wrong:

```bash
cd backend
node test-admin-login.js
```

This will tell you exactly what's wrong:
- ✅ User exists?
- ✅ Password hash correct?
- ✅ User active?
- ✅ Email verified?

Then fix the issue based on the output.

### Method 3: Update Password Script

If password hash is wrong, run:

```bash
cd backend
node scripts/update-admin-password.js
```

This will:
- Generate correct password hash
- Update admin user
- Set user to active
- Set email as verified

## 🔍 Step-by-Step Debugging

### Step 1: Check Admin User Exists

Run SQL in Supabase:
```sql
SELECT * FROM "users" WHERE "email" = 'admin@sunyani.gov.gh';
```

Should see:
- Email: `admin@sunyani.gov.gh`
- Full name: `System Administrator`
- Is active: `true`
- Email verified: `true`

### Step 2: Check Password Hash

Run SQL in Supabase:
```sql
SELECT 
    "email",
    SUBSTRING("password_hash", 1, 20) || '...' as "hash_preview",
    LENGTH("password_hash") as "hash_length"
FROM "users" 
WHERE "email" = 'admin@sunyani.gov.gh';
```

Should see:
- Hash length: 60 characters
- Hash starts with: `$2b$10$`

### Step 3: Check Backend is Running

```bash
cd backend
npm run start:dev
```

Should see:
```
🚀 Backend server is running on: http://localhost:3001/api
```

### Step 4: Test Login API

Test directly with PowerShell:
```powershell
$body = @{
    email = "admin@sunyani.gov.gh"
    password = "Admin@2024!"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Login successful!"
    Write-Host "Access token:", $response.access_token
} catch {
    Write-Host "❌ Login failed!"
    Write-Host "Error:", $_.Exception.Message
    Write-Host "Response:", $_.Exception.Response
}
```

Should get:
- ✅ Status 200
- ✅ `access_token` in response
- ✅ User data in response

### Step 5: Check Browser Console

1. Open: http://localhost:3002/login
2. Press F12 (open DevTools)
3. Go to **Console** tab
4. Try to login
5. Check for errors

Common errors:
- **Network Error**: Backend not running
- **401 Unauthorized**: Wrong credentials or password hash
- **404 Not Found**: Wrong API URL
- **CORS Error**: Backend CORS not configured

## ✅ Common Issues & Fixes

### Issue 1: "User not found"
**Fix:** Run `backend/supabase_setup.sql` to create admin user

### Issue 2: "Invalid credentials"
**Fix:** Run `backend/FIX_ADMIN_PASSWORD.sql` to fix password hash

### Issue 3: "User is not active"
**Fix:** Run this SQL:
```sql
UPDATE "users" SET "is_active" = true WHERE "email" = 'admin@sunyani.gov.gh';
```

### Issue 4: "Can't reach database server"
**Fix:** Check `.env` file has correct DATABASE_URL

### Issue 5: "CORS error"
**Fix:** Check `backend/src/main.ts` has CORS enabled

### Issue 6: "Network error"
**Fix:** 
- Check backend is running on port 3001
- Check admin API URL is correct: `http://localhost:3001/api`
- Check firewall/antivirus isn't blocking

## 🎯 Quick Fix Checklist

- [ ] Admin user exists in database
- [ ] Password hash is correct (run FIX_ADMIN_PASSWORD.sql)
- [ ] User is active (is_active = true)
- [ ] Backend is running (npm run start:dev)
- [ ] Backend shows: "🚀 Backend server is running"
- [ ] API endpoint works: http://localhost:3001/api/auth/login
- [ ] CORS is enabled in backend
- [ ] Browser console shows no errors
- [ ] Network request shows 200 status

## 📝 Admin Credentials

After fixing, use these to login:

- **Email:** `admin@sunyani.gov.gh`
- **Password:** `Admin@2024!`
- **Login URL:** http://localhost:3002/login

---

**Try Method 1 first (SQL Script) - it's the fastest way to fix everything!** 🚀

