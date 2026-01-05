# ✅ SIMPLE SOLUTION - Create Your Account

## 🎯 The Simplest Way (3 Steps)

Since the backend keeps having connection issues, here's the **SIMPLEST solution** that works directly:

## 📋 Step 1: Fix .env File (If Not Done)

Open `backend/.env` and make sure DATABASE_URL looks like this:

```
DATABASE_URL="postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public"
```

**Important:**
- `!` not `%21`
- `$` not `%24`
- Must have `?schema=public` at the end

## 📋 Step 2: Run the Script

Open PowerShell/Terminal and run:

```bash
cd backend
node create-my-account.js
```

The script will ask you:
- Email
- Password
- Full Name
- Phone (optional)

## 📋 Step 3: Login

1. Go to: http://localhost:3002/login
2. Enter your email and password
3. Click **Login**

**That's it!** ✅

---

## 🎯 Why This Works

- ✅ Works directly with database (no backend needed)
- ✅ Hashes password properly
- ✅ Creates user with Super Admin role
- ✅ One simple script
- ✅ No complex setup

---

## 📝 Complete Steps (Copy-Paste)

```bash
# 1. Go to backend folder
cd backend

# 2. Run the script
node create-my-account.js

# 3. Follow the prompts:
#    - Enter your email
#    - Enter your password (min 6 characters)
#    - Enter your full name
#    - Enter phone (optional, press Enter to skip)

# 4. Done! Use the credentials to login at:
#    http://localhost:3002/login
```

---

**This is the simplest way - just run one script!** 🚀

