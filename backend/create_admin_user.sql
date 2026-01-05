-- ============================================
-- Create Admin User for Sunyani Municipal Platform
-- Run this in Supabase SQL Editor
-- ============================================

-- Password hash for 'Admin@2024!' (bcrypt, 10 rounds)
-- This hash was generated using: bcrypt.hash('Admin@2024!', 10)

DO $$
DECLARE
    super_admin_role_id TEXT;
    admin_user_id TEXT;
    admin_password_hash TEXT := '$2b$10$.XvKXS7l0Xaf9gapUv5FQuXY1uJWs8vFpmCBAFN6u3whc7W1BKuMi';
BEGIN
    -- Get Super Admin role ID
    SELECT "id" INTO super_admin_role_id 
    FROM "roles" 
    WHERE "name" = 'Super Admin' 
    LIMIT 1;
    
    -- Check if role exists
    IF super_admin_role_id IS NULL THEN
        RAISE EXCEPTION 'Super Admin role not found. Please run the main setup script first.';
    END IF;
    
    -- Check if admin user already exists
    SELECT "id" INTO admin_user_id 
    FROM "users" 
    WHERE "email" = 'admin@sunyani.gov.gh' 
    LIMIT 1;
    
    IF admin_user_id IS NOT NULL THEN
        -- Update existing admin user
        UPDATE "users" 
        SET 
            "password_hash" = admin_password_hash,
            "full_name" = 'System Administrator',
            "phone" = '+233000000000',
            "role_id" = super_admin_role_id,
            "is_active" = true,
            "email_verified" = true,
            "updated_at" = CURRENT_TIMESTAMP
        WHERE "id" = admin_user_id;
        
        RAISE NOTICE '✅ Admin user updated successfully!';
        RAISE NOTICE '📧 Email: admin@sunyani.gov.gh';
        RAISE NOTICE '🔑 Password: Admin@2024!';
    ELSE
        -- Create new admin user
        INSERT INTO "users" (
            "id",
            "email", 
            "password_hash", 
            "full_name", 
            "phone", 
            "role_id", 
            "is_active", 
            "email_verified",
            "created_at",
            "updated_at"
        )
        VALUES (
            uuid_generate_v4()::text,
            'admin@sunyani.gov.gh',
            admin_password_hash,
            'System Administrator',
            '+233000000000',
            super_admin_role_id,
            true,
            true,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        );
        
        RAISE NOTICE '✅ Admin user created successfully!';
        RAISE NOTICE '📧 Email: admin@sunyani.gov.gh';
        RAISE NOTICE '🔑 Password: Admin@2024!';
    END IF;
    
    -- Display admin user info
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Admin User Details:';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Email: admin@sunyani.gov.gh';
    RAISE NOTICE 'Password: Admin@2024!';
    RAISE NOTICE 'Role: Super Admin';
    RAISE NOTICE 'Status: Active';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  IMPORTANT: Change this password after first login!';
    
END $$;

-- Verify the admin user was created
SELECT 
    u."id",
    u."email",
    u."full_name",
    u."is_active",
    u."email_verified",
    r."name" as "role_name"
FROM "users" u
JOIN "roles" r ON u."role_id" = r."id"
WHERE u."email" = 'admin@sunyani.gov.gh';

