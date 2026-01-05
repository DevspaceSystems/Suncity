# 🔧 Create .env File

Since `.env` files are protected, please create it manually:

## Steps:

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Create a new file named `.env`**

3. **Copy and paste this content:**
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

4. **Save the file**

That's it! Your connection string is ready with your password.

