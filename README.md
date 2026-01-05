# Sunyani Municipal Platform

A comprehensive, production-ready digital platform for the Municipality of Sunyani, Ghana (Bono Region).

## 🌟 Features

### Public Website
- **Town Information Hub**: History, culture, tourism, geography, and climate
- **Leadership & Governance**: Traditional Council, Municipal Assembly, development projects
- **Business Directory**: Searchable database of local businesses with filtering
- **Job Opportunities**: Employment listings and career resources
- **Community Engagement**: Announcements, events calendar, news updates
- **Gallery**: Photos and videos showcasing Sunyani
- **Contact & Feedback**: Report issues, submit ideas, contact municipal offices

### Admin Dashboard
- **Content Management**: Manage announcements, events, businesses, jobs, and gallery
- **User Management**: Role-based access control with 6 permission levels
- **Analytics**: Dashboard with charts and statistics
- **Activity Logs**: Comprehensive audit trail
- **Secure Authentication**: JWT with 2FA support
- **Dark/Light Mode**: Modern, responsive interface

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Admin**: Next.js 14 (App Router) + TypeScript + Tailwind CSS

### Project Structure
```
sunyani-municipal-platform/
├── frontend/              # Next.js 14 public website
├── admin/                 # Next.js 14 admin dashboard
└── docs/                  # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 15+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sunyani-municipal-platform
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install admin dependencies
cd ../admin
npm install
```

3. **Set up Supabase**
- Create a project on [Supabase](https://supabase.com)
- Run the SQL script in `SUPABASE_SETUP.md` (if provided) in the SQL Editor.
- Copy your Supabase URL and Anon Key.
- Create `.env.local` in both `frontend` and `admin` with:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
  ```

4. **Start development servers**

```bash
# Terminal 1: Start frontend (port 3000)
cd frontend
npm run dev

# Terminal 2: Start admin dashboard (port 3002)
cd admin
npm run dev
```

5. **Access the applications**
- Public Website: http://localhost:3000
- Admin Dashboard: http://localhost:3002
- API Documentation: http://localhost:3001/api/docs

### Default Admin Credentials
```
Email: admin@sunyani.gov.gh
Password: Admin@2024!
```
**⚠️ Change this password immediately in production!**

## 📚 Documentation

- [System Architecture](./ARCHITECTURE.md)
- [API Documentation](./backend/API.md)
- [Deployment Guide](./deployment/DEPLOYMENT.md)
- [User Manual](./docs/USER_MANUAL.md)
- [Admin Guide](./docs/ADMIN_GUIDE.md)

## 🎨 Branding

### Color Palette (Bono Culture Inspired)
- **Primary (Gold)**: `#C8A882` - Representing Kente cloth
- **Secondary (Forest Green)**: `#2D5016` - Bono Region forests
- **Accent (Terracotta)**: `#D84315` - Traditional pottery
- **Neutral Dark**: `#1A1A1A`
- **Neutral Light**: `#F5F5F5`

### Typography
- **Headings**: Inter (Bold, 600-800)
- **Body**: Inter (Regular, 400-500)
- **Cultural Sections**: Playfair Display

## 🔒 Security

- JWT authentication with refresh tokens
- Two-factor authentication (2FA) support
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization
- HTTPS enforced in production
- Rate limiting on API endpoints

## 👥 User Roles

1. **Super Admin**: Full system access
2. **Editor**: Content management (announcements, events, gallery)
3. **Business Manager**: Business directory management
4. **Job Manager**: Job postings management
5. **Traditional Council Viewer**: Read-only access
6. **Reporter**: Read-only reports and feedback

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test              # Unit tests
npm run test:e2e          # E2E tests
npm run test:cov          # Coverage report

# Frontend tests
cd frontend
npm run test              # Jest tests
npm run test:e2e          # Playwright E2E tests
```

## 📦 Deployment

### Production Deployment

**Frontend (Vercel)**
```bash
cd frontend
vercel --prod
```

**Admin Dashboard (Vercel)**
```bash
cd admin
vercel --prod
```

**Backend (Render/Railway)**
```bash
cd backend
# Follow deployment guide in deployment/DEPLOYMENT.md
```

**Database (Supabase/Neon)**
- Create PostgreSQL instance
- Update DATABASE_URL in environment variables
- Run migrations: `npx prisma migrate deploy`

See [Deployment Guide](./deployment/DEPLOYMENT.md) for detailed instructions.

## 🌍 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sunyani_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
PORT=3001
NODE_ENV=development
UPLOAD_DIR="./uploads"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📊 Performance Targets

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **API Response Time**: < 200ms (p95)

## ♿ Accessibility

- WCAG AA compliant
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Color contrast ratios: 4.5:1 minimum

## 🤝 Contributing

This is an official municipal platform. For contributions or issues, please contact the Sunyani Municipal Assembly IT Department.

## 📄 License

Copyright © 2024 Sunyani Municipal Assembly, Ghana. All rights reserved.

## 📞 Support

For technical support or inquiries:
- Email: it@sunyani.gov.gh
- Phone: +233 (0) XXX XXX XXX
- Address: Sunyani Municipal Assembly, Bono Region, Ghana

---

**Built with ❤️ for the people of Sunyani, Ghana**
