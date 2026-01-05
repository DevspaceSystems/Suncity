-- ============================================
-- QUICK ADMIN USER SETUP
-- Copy and paste this into Supabase SQL Editor
-- ============================================

-- Create/Update Admin User
DO $$
DECLARE
    super_admin_role_id TEXT;
    admin_password_hash TEXT := '$2b$10$.XvKXS7l0Xaf9gapUv5FQuXY1uJWs8vFpmCBAFN6u3whc7W1BKuMi';
BEGIN
    -- Get Super Admin role
    SELECT "id" INTO super_admin_role_id FROM "roles" WHERE "name" = 'Super Admin' LIMIT 1;
    
    IF super_admin_role_id IS NULL THEN
        RAISE EXCEPTION 'Super Admin role not found! Run the main setup script first.';
    END IF;
    
    -- Insert or update admin user
    INSERT INTO "users" (
        "id", "email", "password_hash", "full_name", "phone", 
        "role_id", "is_active", "email_verified", "created_at", "updated_at"
    )
    VALUES (
        COALESCE((SELECT "id" FROM "users" WHERE "email" = 'admin@sunyani.gov.gh'), uuid_generate_v4()::text),
        'admin@sunyani.gov.gh',
        admin_password_hash,
        'System Administrator',
        '+233000000000',
        super_admin_role_id,
        true,
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    )
    ON CONFLICT ("email") DO UPDATE SET
        "password_hash" = EXCLUDED."password_hash",
        "role_id" = EXCLUDED."role_id",
        "is_active" = true,
        "email_verified" = true,
        "updated_at" = CURRENT_TIMESTAMP;
    
    RAISE NOTICE '✅ Admin user ready!';
    RAISE NOTICE '📧 Email: admin@sunyani.gov.gh';
    RAISE NOTICE '🔑 Password: Admin@2024!';
END $$;

-- Show admin user details
SELECT 
    '✅ Admin User Created!' as status,
    u."email",
    u."full_name",
    r."name" as role,
    u."is_active",
    u."email_verified"
FROM "users" u
JOIN "roles" r ON u."role_id" = r."id"
WHERE u."email" = 'admin@sunyani.gov.gh';

