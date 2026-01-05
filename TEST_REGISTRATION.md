# 🔍 Test Registration - Find the Error

## Quick Test

### Step 1: Test Registration API Directly

Open PowerShell and run this:

```powershell
$body = @{
    email = "test@example.com"
    password = "test123"
    fullName = "Test User"
    phone = "+233123456789"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/register" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ SUCCESS!"
    Write-Host "Response:" 
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ ERROR!"
    Write-Host "Message: $($_.Exception.Message)"
    if ($_.ErrorDetails) {
        Write-Host "Details: $($_.ErrorDetails.Message)"
    }
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
}
```

This will show you the **exact error message**.

## Common Errors

### Error 1: "Can't reach database server"

**Problem:** Database connection issue (same as seed script)

**Fix:** 
- Check `.env` file has correct DATABASE_URL
- Make sure Supabase project is active
- Try running registration from Supabase SQL Editor instead (see below)

### Error 2: "Email already exists"

**Problem:** Email is already in database

**Fix:** Use a different email address

### Error 3: "Failed to find or create role"

**Problem:** Roles don't exist in database

**Fix:** Run the setup SQL script to create roles

### Error 4: Network Error / CORS Error

**Problem:** Backend not running or CORS not enabled

**Fix:** 
- Make sure backend is running: `cd backend && npm run start:dev`
- Check CORS is enabled in `main.ts`

## Quick Fix: Create User via SQL Instead

If registration keeps failing, you can create your user directly in Supabase:

1. **Go to Supabase SQL Editor:**
   - https://supabase.com/dashboard
   - Select your project
   - Click **SQL Editor**

2. **Run this SQL (replace with your details):**

```sql
-- Get Super Admin role
DO $$
DECLARE
    super_admin_role_id TEXT;
    user_email TEXT := 'your@email.com';  -- CHANGE THIS
    user_password TEXT := 'yourpassword123';  -- CHANGE THIS
    user_full_name TEXT := 'Your Name';  -- CHANGE THIS
    hashed_password TEXT;
BEGIN
    -- Get or create Super Admin role
    SELECT "id" INTO super_admin_role_id 
    FROM "roles" 
    WHERE "name" = 'Super Admin' 
    LIMIT 1;
    
    IF super_admin_role_id IS NULL THEN
        -- Create Super Admin role if it doesn't exist
        INSERT INTO "roles" ("id", "name", "description")
        VALUES (uuid_generate_v4()::text, 'Super Admin', 'Full system access')
        RETURNING "id" INTO super_admin_role_id;
    END IF;
    
    -- Generate password hash (you'll need to use bcrypt)
    -- For now, we'll create user without password hash
    -- You'll need to use the backend to hash it properly
    
    RAISE NOTICE 'Role ID: %', super_admin_role_id;
    RAISE NOTICE 'Email: %', user_email;
    RAISE NOTICE 'Full Name: %', user_full_name;
    RAISE NOTICE '⚠️  Note: You need to use backend registration API to hash password properly';
END $$;
```

**Actually, it's better to use the registration API** - just need to find the error first!

## Next Steps

1. ✅ Run the PowerShell test above
2. ✅ Check what error you get
3. ✅ Share the error message
4. ✅ I'll help fix it!

---

**Run the PowerShell test and share the error message!** 🔍

