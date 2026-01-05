# ✅ Admin User Setup - Ready to Use!

## 🚀 Quick Setup (2 Minutes)

### Step 1: Run SQL Script in Supabase

1. **Open Supabase Dashboard:**
   - Go to: https://supabase.com/dashboard
   - Select your project
   - Click **SQL Editor** (left sidebar)

2. **Run the Script:**
   - Open file: `backend/QUICK_ADMIN_SETUP.sql`
   - **Copy the entire file**
   - Paste into SQL Editor
   - Click **Run** button

3. **Verify Success:**
   - You should see: "✅ Admin user ready!"
   - A results table showing the admin user details

### Step 2: Test Login

1. **Start your backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Start your admin dashboard:**
   ```bash
   cd admin
   npm run dev
   ```

3. **Login:**
   - Go to: http://localhost:3002/login
   - **Email:** `admin@sunyani.gov.gh`
   - **Password:** `Admin@2024!`

---

## 📋 Admin Credentials

- **Email:** `admin@sunyani.gov.gh`
- **Password:** `Admin@2024!`
- **Role:** Super Admin (full access)

---

## 🆘 Troubleshooting

### "Super Admin role not found"
- Run the main setup script first: `backend/supabase_setup.sql`
- Then run the admin user script

### "Can't reach database server" (when using npm run seed)
- Your `.env` file has URL-encoded password
- Use the SQL script method instead (recommended)
- Or fix `.env` (see `backend/ADMIN_USER_SETUP.md`)

### Login not working
- Verify admin user exists in Supabase Table Editor
- Check `users` table for `admin@sunyani.gov.gh`
- Ensure `is_active` = true and `email_verified` = true

---

## ✅ That's It!

After running the SQL script, your admin user is ready to use!

**Login URL:** http://localhost:3002/login

