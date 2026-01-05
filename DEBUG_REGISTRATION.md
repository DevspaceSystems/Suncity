# 🔍 Debug Registration Error

## ❌ "Registration failed" Error

If you're getting "Registration failed", let's debug it step by step:

## 🔍 Step 1: Check Browser Console

1. Open: http://localhost:3002/login
2. Press **F12** (open DevTools)
3. Go to **Console** tab
4. Click **Create Account** tab
5. Fill in the form
6. Click **Create Account**
7. Check the console for errors

**Look for:**
- Network errors
- CORS errors
- API errors
- Error messages

## 🔍 Step 2: Check Network Tab

1. In DevTools, go to **Network** tab
2. Try to register again
3. Find the `/auth/register` request
4. Click on it
5. Check:
   - **Status Code** (should be 200)
   - **Response** tab (see error message)
   - **Request** tab (see what was sent)

## 🔍 Step 3: Check Backend Console

Look at your backend terminal where `npm run start:dev` is running.

**Look for:**
- Error messages
- Stack traces
- Database connection errors
- Any red error text

## 🔍 Step 4: Test Registration API Directly

Test the registration endpoint directly with PowerShell:

```powershell
$body = @{
    email = "test@example.com"
    password = "test123"
    fullName = "Test User"
    phone = "+233123456789"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/register" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Registration successful!"
    Write-Host "Access token:", $response.access_token
} catch {
    Write-Host "❌ Registration failed!"
    Write-Host "Error:", $_.Exception.Message
    Write-Host "Response:", $_.Exception.Response
    if ($_.ErrorDetails) {
        Write-Host "Details:", $_.ErrorDetails.Message
    }
}
```

This will show you the exact error.

## 🔍 Step 5: Check Database Connection

The most common issue is database connection. Check:

1. **Backend .env file exists:**
   ```bash
   cd backend
   # Check if .env file exists
   ```

2. **Backend is running:**
   ```bash
   cd backend
   npm run start:dev
   ```
   Should see: `🚀 Backend server is running on: http://localhost:3001/api`

3. **Database is accessible:**
   - Check Supabase dashboard
   - Make sure project is active
   - Check connection string is correct

## 🔍 Step 6: Check Roles Exist

Registration needs roles to exist. Run this SQL in Supabase:

```sql
SELECT * FROM "roles";
```

**Should see:**
- Super Admin
- Editor
- Business Manager
- etc.

If no roles exist, run: `backend/supabase_setup.sql`

## 🚀 Quick Fixes

### Fix 1: Backend Not Running

```bash
cd backend
npm run start:dev
```

Wait for: `🚀 Backend server is running`

### Fix 2: Database Connection

Check `.env` file has correct DATABASE_URL

### Fix 3: Roles Don't Exist

Run SQL in Supabase:
```sql
-- Check if roles exist
SELECT * FROM "roles";

-- If empty, run the setup script
-- Copy from: backend/supabase_setup.sql
```

### Fix 4: CORS Error

Make sure backend has CORS enabled in `main.ts`

### Fix 5: Check Error Message

Look at the actual error message in:
- Browser console
- Network tab response
- Backend terminal

The error message will tell you exactly what's wrong!

## 📝 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Can't reach database server" | Database connection issue | Check .env DATABASE_URL |
| "Email already exists" | User with email exists | Use different email |
| "Failed to find or create role" | Roles don't exist | Run setup SQL script |
| "Network Error" | Backend not running | Start backend server |
| "CORS Error" | CORS not enabled | Check backend CORS config |
| "404 Not Found" | Wrong API URL | Check API endpoint |

## 🎯 Next Steps

1. ✅ Check browser console for errors
2. ✅ Check network tab for API response
3. ✅ Check backend terminal for errors
4. ✅ Test API directly with PowerShell
5. ✅ Check database connection
6. ✅ Check roles exist in database

**Share the error message you see, and I can help fix it!**

