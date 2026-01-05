-- ============================================
-- FIX ADMIN USER PASSWORD HASH
-- Run this in Supabase SQL Editor
-- This will update the admin user with correct password hash
-- ============================================

-- Password hash for 'Admin@2024!' (bcrypt, 10 rounds)
-- Generated using: bcrypt.hash('Admin@2024!', 10)

UPDATE "users"
SET 
    "password_hash" = '$2b$10$.XvKXS7l0Xaf9gapUv5FQuXY1uJWs8vFpmCBAFN6u3whc7W1BKuMi',
    "is_active" = true,
    "email_verified" = true,
    "updated_at" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@sunyani.gov.gh';

-- Verify the update
SELECT 
    u."email",
    u."full_name",
    u."is_active",
    u."email_verified",
    r."name" as "role",
    SUBSTRING(u."password_hash", 1, 20) || '...' as "password_hash_preview",
    CASE 
        WHEN u."password_hash" = '$2b$10$.XvKXS7l0Xaf9gapUv5FQuXY1uJWs8vFpmCBAFN6u3whc7W1BKuMi' 
        THEN '✅ Password hash is correct'
        ELSE '❌ Password hash is incorrect'
    END as "status"
FROM "users" u
JOIN "roles" r ON u."role_id" = r."id"
WHERE u."email" = 'admin@sunyani.gov.gh';

-- Display login credentials
SELECT 
    '========================================' as "info",
    'Admin Login Credentials:' as "info",
    '========================================' as "info",
    'Email: admin@sunyani.gov.gh' as "info",
    'Password: Admin@2024!' as "info",
    '========================================' as "info";

