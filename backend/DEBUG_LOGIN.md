# 🔍 Debug Login Issue - Step by Step Guide

## Step 1: Check Admin User Exists

Run this test script to verify your admin user:

```bash
cd backend
node test-admin-login.js
```

This will tell you:
- ✅ If admin user exists
- ✅ If password hash is correct
- ✅ If user is active
- ✅ What the issue is

## Step 2: Fix Password Hash (if needed)

If the password hash is incorrect, run:

```bash
cd backend
node scripts/update-admin-password.js
```

This will:
- Generate a new password hash for "Admin@2024!"
- Update the admin user in database
- Set user to active
- Set email as verified

## Step 3: Check Backend is Running

Make sure your backend is running:

```bash
cd backend
npm run start:dev
```

You should see:
```
🚀 Backend server is running on: http://localhost:3001/api
```

## Step 4: Test Login API Directly

Test the login endpoint directly:

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sunyani.gov.gh","password":"Admin@2024!"}'
```

Or use PowerShell:
```powershell
$body = @{
    email = "admin@sunyani.gov.gh"
    password = "Admin@2024!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

You should get a response with `access_token` if login works.

## Step 5: Check Browser Console

1. Open admin dashboard: http://localhost:3002/login
2. Open browser DevTools (F12)
3. Go to Console tab
4. Try to login
5. Check for errors in console
6. Go to Network tab
7. Try login again
8. Check the login request:
   - Status code (should be 200)
   - Response body
   - Request URL (should be http://localhost:3001/api/auth/login)

## Common Issues & Fixes

### Issue 1: "Can't reach database server"
**Fix:** Check your `.env` file has correct DATABASE_URL

### Issue 2: "Invalid credentials" but user exists
**Fix:** Run `node scripts/update-admin-password.js` to fix password hash

### Issue 3: "User not found"
**Fix:** Run the SQL script to create admin user

### Issue 4: "CORS error"
**Fix:** Make sure backend has CORS enabled in `main.ts`

### Issue 5: "Network error"
**Fix:** 
- Check backend is running
- Check API URL is correct: http://localhost:3001/api
- Check firewall/antivirus isn't blocking

## Quick Fix Script

Run this to fix everything at once:

```bash
cd backend

# 1. Test admin user
node test-admin-login.js

# 2. Fix password if needed
node scripts/update-admin-password.js

# 3. Restart backend
npm run start:dev
```

---

**After running these scripts, try logging in again!**

