-- ============================================
-- Sunyani Municipal Platform Database Setup
-- Supabase PostgreSQL Database
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Roles Table
CREATE TABLE IF NOT EXISTS "roles" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Permissions Table
CREATE TABLE IF NOT EXISTS "permissions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL UNIQUE,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Role Permissions Table
CREATE TABLE IF NOT EXISTS "role_permissions" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    PRIMARY KEY ("role_id", "permission_id"),
    CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Users Table
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "email" TEXT NOT NULL UNIQUE,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT,
    "avatar_url" TEXT,
    "role_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_secret" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Businesses Table
CREATE TABLE IF NOT EXISTS "businesses" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sector" TEXT,
    "area" TEXT,
    "logo_url" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "address" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "businesses_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS "jobs" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "location" TEXT,
    "job_type" TEXT,
    "salary_range" TEXT,
    "application_email" TEXT,
    "application_url" TEXT,
    "deadline" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "jobs_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS "announcements" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "image_url" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "announcements_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Events Table
CREATE TABLE IF NOT EXISTS "events" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "image_url" TEXT,
    "organizer" TEXT,
    "contact_info" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS "gallery" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "media_type" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "category" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "gallery_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Feedback Table
CREATE TABLE IF NOT EXISTS "feedback" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Leaders Table
CREATE TABLE IF NOT EXISTS "leaders" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "constituency" TEXT,
    "image_url" TEXT,
    "message" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "leaders_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Page Content Table
CREATE TABLE IF NOT EXISTS "page_content" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "image_url" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "page_content_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    UNIQUE ("page", "section")
);

-- News Table
CREATE TABLE IF NOT EXISTS "news" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "image_url" TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "author" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "news_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS "activity_logs" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT,
    "resource_id" TEXT,
    "details" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ============================================
-- INDEXES
-- ============================================

-- Businesses indexes
CREATE INDEX IF NOT EXISTS "businesses_sector_idx" ON "businesses"("sector");
CREATE INDEX IF NOT EXISTS "businesses_area_idx" ON "businesses"("area");
CREATE INDEX IF NOT EXISTS "businesses_is_verified_idx" ON "businesses"("is_verified");

-- Jobs indexes
CREATE INDEX IF NOT EXISTS "jobs_is_active_idx" ON "jobs"("is_active");
CREATE INDEX IF NOT EXISTS "jobs_deadline_idx" ON "jobs"("deadline");

-- Announcements indexes
CREATE INDEX IF NOT EXISTS "announcements_is_published_published_at_idx" ON "announcements"("is_published", "published_at");

-- Events indexes
CREATE INDEX IF NOT EXISTS "events_start_date_end_date_idx" ON "events"("start_date", "end_date");

-- Leaders indexes
CREATE INDEX IF NOT EXISTS "leaders_position_idx" ON "leaders"("position");
CREATE INDEX IF NOT EXISTS "leaders_is_active_idx" ON "leaders"("is_active");
CREATE INDEX IF NOT EXISTS "leaders_order_idx" ON "leaders"("order");

-- Page Content indexes
CREATE INDEX IF NOT EXISTS "page_content_page_section_idx" ON "page_content"("page", "section");
CREATE INDEX IF NOT EXISTS "page_content_is_active_idx" ON "page_content"("is_active");

-- News indexes
CREATE INDEX IF NOT EXISTS "news_is_published_published_at_idx" ON "news"("is_published", "published_at");
CREATE INDEX IF NOT EXISTS "news_slug_idx" ON "news"("slug");
CREATE INDEX IF NOT EXISTS "news_category_idx" ON "news"("category");

-- Activity Logs indexes
CREATE INDEX IF NOT EXISTS "activity_logs_user_id_idx" ON "activity_logs"("user_id");
CREATE INDEX IF NOT EXISTS "activity_logs_created_at_idx" ON "activity_logs"("created_at");

-- ============================================
-- TRIGGERS (for updated_at)
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON "businesses" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON "jobs" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON "announcements" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON "events" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON "gallery" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON "feedback" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leaders_updated_at BEFORE UPDATE ON "leaders" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON "page_content" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON "news" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA (Roles)
-- ============================================

-- Insert Roles
INSERT INTO "roles" ("id", "name", "description") VALUES
    (uuid_generate_v4()::text, 'Super Admin', 'Full system access'),
    (uuid_generate_v4()::text, 'Editor', 'Content management access'),
    (uuid_generate_v4()::text, 'Business Manager', 'Business directory management'),
    (uuid_generate_v4()::text, 'Job Manager', 'Job postings management'),
    (uuid_generate_v4()::text, 'Traditional Council Viewer', 'Read-only access'),
    (uuid_generate_v4()::text, 'Reporter', 'Read-only reports and feedback')
ON CONFLICT ("name") DO NOTHING;

-- ============================================
-- INITIAL DATA (Permissions)
-- ============================================

-- Insert Permissions
INSERT INTO "permissions" ("id", "name", "resource", "action") VALUES
    (uuid_generate_v4()::text, 'create:announcement', 'announcement', 'create'),
    (uuid_generate_v4()::text, 'read:announcement', 'announcement', 'read'),
    (uuid_generate_v4()::text, 'update:announcement', 'announcement', 'update'),
    (uuid_generate_v4()::text, 'delete:announcement', 'announcement', 'delete'),
    (uuid_generate_v4()::text, 'create:business', 'business', 'create'),
    (uuid_generate_v4()::text, 'read:business', 'business', 'read'),
    (uuid_generate_v4()::text, 'update:business', 'business', 'update'),
    (uuid_generate_v4()::text, 'delete:business', 'business', 'delete'),
    (uuid_generate_v4()::text, 'create:job', 'job', 'create'),
    (uuid_generate_v4()::text, 'read:job', 'job', 'read'),
    (uuid_generate_v4()::text, 'update:job', 'job', 'update'),
    (uuid_generate_v4()::text, 'delete:job', 'job', 'delete')
ON CONFLICT ("name") DO NOTHING;

-- ============================================
-- INITIAL DATA (Admin User)
-- ============================================
-- Password hash for 'Admin@2024!' using bcrypt

-- Get Super Admin role ID and create admin user
DO $$
DECLARE
    super_admin_role_id TEXT;
    admin_password_hash TEXT := '$2b$10$.XvKXS7l0Xaf9gapUv5FQuXY1uJWs8vFpmCBAFN6u3whc7W1BKuMi';
BEGIN
    SELECT "id" INTO super_admin_role_id FROM "roles" WHERE "name" = 'Super Admin' LIMIT 1;
    
    IF super_admin_role_id IS NOT NULL THEN
        INSERT INTO "users" ("email", "password_hash", "full_name", "phone", "role_id", "is_active", "email_verified")
        VALUES (
            'admin@sunyani.gov.gh',
            admin_password_hash,
            'System Administrator',
            '+233000000000',
            super_admin_role_id,
            true,
            true
        )
        ON CONFLICT ("email") DO UPDATE SET
            "password_hash" = EXCLUDED."password_hash",
            "is_active" = true,
            "email_verified" = true;
    END IF;
END $$;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Database setup completed successfully!';
    RAISE NOTICE '📝 Next steps:';
    RAISE NOTICE '   1. Run the seed script to create admin user with proper password hash';
    RAISE NOTICE '   2. Verify all tables were created';
    RAISE NOTICE '   3. Test the connection from your backend';
END $$;

