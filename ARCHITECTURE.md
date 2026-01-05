# Sunyani Municipal Platform - System Architecture

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Database Schema](#database-schema)
5. [API Structure](#api-structure)
6. [Security Architecture](#security-architecture)
7. [Deployment Architecture](#deployment-architecture)

---

## Overview

The Sunyani Municipal Platform is a comprehensive digital solution designed to serve as the official online presence for Sunyani, Ghana. The platform provides:

- **Information Hub**: History, culture, tourism, and governance
- **Business Directory**: Searchable database of local businesses
- **Job Platform**: Employment opportunities in Sunyani
- **Community Engagement**: Announcements, events, and feedback
- **Admin Dashboard**: Content management for municipal staff

**Key Characteristics**:
- Production-ready, enterprise-grade codebase
- Mobile-responsive and PWA-enabled
- SEO-optimized for discoverability
- Accessible (WCAG AA compliant)
- Secure with role-based access control

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context + SWR for data fetching
- **Charts**: Recharts (for admin dashboard)

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Authentication**: Passport.js + JWT
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

### Database
- **Primary Database**: PostgreSQL 15+
- **ORM**: Prisma
- **Migrations**: Prisma Migrate

### Infrastructure
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render / Railway
- **Database Hosting**: Supabase / Neon / PlanetScale
- **File Storage**: AWS S3 / Cloudinary
- **Email**: SendGrid / Mailgun
- **SMS**: Twilio / Africa's Talking

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Containerization**: Docker (optional)
- **Monitoring**: Sentry (error tracking)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├──────────────────────────┬──────────────────────────────────┤
│   Public Website         │   Admin Dashboard                │
│   (Next.js 14)           │   (Next.js 14)                   │
│   - Home                 │   - Analytics                    │
│   - About Sunyani        │   - Content Management           │
│   - Business Directory   │   - User Management              │
│   - Jobs                 │   - Activity Logs                │
│   - Events               │   - Settings                     │
│   - Gallery              │                                  │
│   - Contact              │                                  │
└──────────────────────────┴──────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                       │
├─────────────────────────────────────────────────────────────┤
│                    NestJS Backend                            │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Module  │  │ Business     │  │ Jobs Module  │     │
│  │ - Login      │  │ Module       │  │              │     │
│  │ - Register   │  │ - CRUD       │  │              │     │
│  │ - JWT        │  │ - Search     │  │              │     │
│  │ - 2FA        │  │ - Filter     │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Announcements│  │ Events       │  │ Gallery      │     │
│  │ Module       │  │ Module       │  │ Module       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Feedback     │  │ Upload       │  │ Users        │     │
│  │ Module       │  │ Module       │  │ Module       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Middleware & Guards                        │    │
│  │  - JWT Authentication                              │    │
│  │  - Role-Based Access Control (RBAC)               │    │
│  │  - Request Validation                              │    │
│  │  - Rate Limiting                                   │    │
│  │  - Logging & Monitoring                            │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
├──────────────────────────┬──────────────────────────────────┤
│   PostgreSQL Database    │   File Storage                   │
│   - Users                │   - Business Logos               │
│   - Businesses           │   - Gallery Images/Videos        │
│   - Jobs                 │   - Documents (PDFs)             │
│   - Announcements        │   - User Avatars                 │
│   - Events               │                                  │
│   - Gallery              │   (AWS S3 / Cloudinary)          │
│   - Feedback             │                                  │
│   - Activity Logs        │                                  │
│   - Roles/Permissions    │                                  │
└──────────────────────────┴──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
├──────────────────────────┬──────────────────────────────────┤
│   Email Service          │   SMS Service                    │
│   (SendGrid/Mailgun)     │   (Twilio/Africa's Talking)      │
│   - Notifications        │   - Emergency Alerts             │
│   - Job Alerts           │   - Event Reminders              │
└──────────────────────────┴──────────────────────────────────┘
```

---

## Database Schema

### Core Tables

#### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  role_id UUID REFERENCES roles(id),
  is_active BOOLEAN DEFAULT true,
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_secret VARCHAR(255),
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Roles & Permissions
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  resource VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);
```

#### 3. Businesses Table
```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sector VARCHAR(100),
  area VARCHAR(100),
  logo_url TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  whatsapp VARCHAR(20),
  website VARCHAR(255),
  address TEXT,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0.0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_businesses_sector ON businesses(sector);
CREATE INDEX idx_businesses_area ON businesses(area);
CREATE INDEX idx_businesses_verified ON businesses(is_verified);
```

#### 4. Jobs Table
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  location VARCHAR(255),
  job_type VARCHAR(50), -- Full-time, Part-time, Contract
  salary_range VARCHAR(100),
  application_email VARCHAR(255),
  application_url TEXT,
  deadline DATE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_jobs_active ON jobs(is_active);
CREATE INDEX idx_jobs_deadline ON jobs(deadline);
```

#### 5. Announcements Table
```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100), -- News, Alert, Update
  priority VARCHAR(50) DEFAULT 'normal', -- low, normal, high, urgent
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_announcements_published ON announcements(is_published, published_at);
```

#### 6. Events Table
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  image_url TEXT,
  organizer VARCHAR(255),
  contact_info VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_dates ON events(start_date, end_date);
```

#### 7. Gallery Table
```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_type VARCHAR(50), -- image, video
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 8. Feedback Table
```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50), -- issue, idea, contact
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewed, resolved
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 9. Activity Logs Table
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100),
  resource_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
```

---

## API Structure

### Authentication Endpoints
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
POST   /api/auth/refresh           - Refresh JWT token
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password
POST   /api/auth/enable-2fa        - Enable 2FA
POST   /api/auth/verify-2fa        - Verify 2FA code
GET    /api/auth/me                - Get current user
```

### Business Directory Endpoints
```
GET    /api/businesses             - List businesses (with filters)
GET    /api/businesses/:id         - Get business details
POST   /api/businesses             - Create business (auth required)
PUT    /api/businesses/:id         - Update business (auth required)
DELETE /api/businesses/:id         - Delete business (admin only)
GET    /api/businesses/search      - Search businesses
```

### Jobs Endpoints
```
GET    /api/jobs                   - List jobs (with filters)
GET    /api/jobs/:id               - Get job details
POST   /api/jobs                   - Create job (auth required)
PUT    /api/jobs/:id               - Update job (auth required)
DELETE /api/jobs/:id               - Delete job (admin only)
```

### Announcements Endpoints
```
GET    /api/announcements          - List published announcements
GET    /api/announcements/:id      - Get announcement details
POST   /api/announcements          - Create announcement (admin only)
PUT    /api/announcements/:id      - Update announcement (admin only)
DELETE /api/announcements/:id      - Delete announcement (admin only)
```

### Events Endpoints
```
GET    /api/events                 - List published events
GET    /api/events/:id             - Get event details
POST   /api/events                 - Create event (admin only)
PUT    /api/events/:id             - Update event (admin only)
DELETE /api/events/:id             - Delete event (admin only)
```

### Gallery Endpoints
```
GET    /api/gallery                - List gallery items
GET    /api/gallery/:id            - Get gallery item
POST   /api/gallery                - Upload media (admin only)
DELETE /api/gallery/:id            - Delete media (admin only)
```

### Feedback Endpoints
```
POST   /api/feedback               - Submit feedback (public)
GET    /api/feedback               - List feedback (admin only)
PUT    /api/feedback/:id/status    - Update feedback status (admin only)
```

### Admin Endpoints
```
GET    /api/admin/stats            - Dashboard statistics
GET    /api/admin/activity-logs    - Activity logs
GET    /api/admin/users            - User management
PUT    /api/admin/users/:id/role   - Update user role
```

---

## Security Architecture

### Authentication Flow
1. User submits credentials (email + password)
2. Backend validates credentials
3. If valid, generate JWT access token (15min expiry) + refresh token (7 days)
4. Return tokens to client
5. Client stores tokens (httpOnly cookies or localStorage)
6. Client includes access token in Authorization header for protected requests
7. Backend validates JWT on each request

### Two-Factor Authentication (2FA)
1. User enables 2FA in settings
2. Backend generates TOTP secret
3. User scans QR code with authenticator app
4. On login, user enters 6-digit code
5. Backend verifies code before issuing tokens

### Role-Based Access Control (RBAC)
```typescript
// Example permission check
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'editor')
@Post('announcements')
async createAnnouncement() { ... }
```

**Roles Hierarchy**:
- **Super Admin**: Full system access
- **Editor**: Create/edit content (announcements, events, gallery)
- **Business Manager**: Manage business directory only
- **Job Manager**: Manage job postings only
- **Traditional Council Viewer**: Read-only access
- **Reporter**: Read-only reports and feedback

### Data Protection
- Passwords hashed with bcrypt (10 rounds)
- Sensitive data encrypted at rest
- HTTPS enforced in production
- CORS configured for allowed origins
- Rate limiting on API endpoints
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection

---

## Deployment Architecture

### Development Environment
```
┌─────────────────┐
│  Local Machine  │
│                 │
│  - Next.js      │
│  - NestJS       │
│  - PostgreSQL   │
│    (Docker)     │
└─────────────────┘
```

### Production Environment
```
┌──────────────────────────────────────────────────┐
│                  VERCEL                          │
│  ┌────────────────────────────────────────┐     │
│  │  Frontend (Next.js)                    │     │
│  │  - Public Website                      │     │
│  │  - Admin Dashboard                     │     │
│  │  - CDN Edge Caching                    │     │
│  └────────────────────────────────────────┘     │
└──────────────────────────────────────────────────┘
                    │
                    │ HTTPS
                    ▼
┌──────────────────────────────────────────────────┐
│              RENDER / RAILWAY                    │
│  ┌────────────────────────────────────────┐     │
│  │  Backend (NestJS)                      │     │
│  │  - REST API                            │     │
│  │  - Auto-scaling                        │     │
│  │  - Health checks                       │     │
│  └────────────────────────────────────────┘     │
└──────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│           SUPABASE / NEON                        │
│  ┌────────────────────────────────────────┐     │
│  │  PostgreSQL Database                   │     │
│  │  - Automatic backups                   │     │
│  │  - Connection pooling                  │     │
│  └────────────────────────────────────────┘     │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│              AWS S3 / CLOUDINARY                 │
│  - Business logos                                │
│  - Gallery media                                 │
│  - Documents                                     │
└──────────────────────────────────────────────────┘
```

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    - Run linting
    - Run unit tests
    - Run E2E tests
    - Generate coverage report
  
  build:
    - Build frontend
    - Build backend
    - Run security audit
  
  deploy:
    - Deploy to staging (on develop)
    - Deploy to production (on main)
```

---

## Performance Optimization

### Frontend
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component with WebP
- **Lazy Loading**: React.lazy() for heavy components
- **Caching**: SWR for client-side data caching
- **CDN**: Vercel Edge Network for static assets
- **PWA**: Service worker for offline support

### Backend
- **Database Indexing**: Strategic indexes on frequently queried columns
- **Connection Pooling**: Prisma connection pooling
- **Caching**: Redis for session storage and API caching (optional)
- **Pagination**: Cursor-based pagination for large datasets
- **Query Optimization**: Prisma select and include optimization

### Target Metrics
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **API Response Time**: < 200ms (p95)

---

## Monitoring & Logging

### Error Tracking
- **Sentry**: Frontend and backend error tracking
- **Log Levels**: Debug, Info, Warn, Error, Fatal
- **Structured Logging**: JSON format for easy parsing

### Analytics
- **User Activity**: Track page views, interactions
- **Admin Actions**: Audit trail in activity_logs table
- **Performance Monitoring**: API response times, database query performance

---

## Scalability Considerations

### Horizontal Scaling
- Stateless backend (JWT tokens, no server sessions)
- Database connection pooling
- Load balancing (handled by hosting platform)

### Vertical Scaling
- Optimize database queries
- Implement caching strategies
- Use CDN for static assets

### Future Enhancements
- GraphQL API (optional)
- Real-time features with WebSockets
- Mobile apps (React Native)
- Multi-language support (i18n)
- Advanced analytics dashboard
- Integration with payment gateways (for business listings)

---

## Backup & Disaster Recovery

### Database Backups
- **Frequency**: Daily automated backups
- **Retention**: 30 days
- **Testing**: Monthly restore tests

### Application Backups
- **Git Repository**: Source code versioned in GitHub
- **Environment Variables**: Securely stored in hosting platform
- **Media Files**: S3 versioning enabled

### Recovery Plan
1. Identify issue and scope
2. Restore database from latest backup
3. Redeploy application from Git
4. Verify functionality
5. Post-mortem analysis

---

## Compliance & Accessibility

### WCAG AA Compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (4.5:1 minimum)
- Screen reader compatibility

### Data Privacy
- GDPR-inspired data handling
- User consent for data collection
- Right to data deletion
- Secure data storage

---

## Conclusion

This architecture provides a solid foundation for a production-ready municipal platform. The system is designed to be:
- **Scalable**: Handle growing user base and content
- **Secure**: Industry-standard authentication and authorization
- **Maintainable**: Clean code structure, comprehensive documentation
- **Performant**: Optimized for speed and efficiency
- **Accessible**: Inclusive design for all users

The modular architecture allows for future enhancements and integrations as the municipality's needs evolve.
