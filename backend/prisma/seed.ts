import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create Roles
    const superAdminRole = await prisma.role.upsert({
        where: { name: 'Super Admin' },
        update: {},
        create: {
            name: 'Super Admin',
            description: 'Full system access',
        },
    });

    const editorRole = await prisma.role.upsert({
        where: { name: 'Editor' },
        update: {},
        create: {
            name: 'Editor',
            description: 'Content management access',
        },
    });

    const businessManagerRole = await prisma.role.upsert({
        where: { name: 'Business Manager' },
        update: {},
        create: {
            name: 'Business Manager',
            description: 'Business directory management',
        },
    });

    const jobManagerRole = await prisma.role.upsert({
        where: { name: 'Job Manager' },
        update: {},
        create: {
            name: 'Job Manager',
            description: 'Job postings management',
        },
    });

    const viewerRole = await prisma.role.upsert({
        where: { name: 'Traditional Council Viewer' },
        update: {},
        create: {
            name: 'Traditional Council Viewer',
            description: 'Read-only access',
        },
    });

    const reporterRole = await prisma.role.upsert({
        where: { name: 'Reporter' },
        update: {},
        create: {
            name: 'Reporter',
            description: 'Read-only reports and feedback',
        },
    });

    console.log('✅ Roles created');

    // Create default admin user
    const hashedPassword = await bcrypt.hash('Admin@2024!', 10);

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@sunyani.gov.gh' },
        update: {},
        create: {
            email: 'admin@sunyani.gov.gh',
            passwordHash: hashedPassword,
            fullName: 'System Administrator',
            phone: '+233000000000',
            roleId: superAdminRole.id,
            isActive: true,
            emailVerified: true,
        },
    });

    console.log('✅ Admin user created');
    console.log('📧 Email: admin@sunyani.gov.gh');
    console.log('🔑 Password: Admin@2024!');
    console.log('⚠️  CHANGE THIS PASSWORD IN PRODUCTION!');

    // Create sample permissions
    const permissions = [
        { name: 'create:announcement', resource: 'announcement', action: 'create' },
        { name: 'read:announcement', resource: 'announcement', action: 'read' },
        { name: 'update:announcement', resource: 'announcement', action: 'update' },
        { name: 'delete:announcement', resource: 'announcement', action: 'delete' },
        { name: 'create:business', resource: 'business', action: 'create' },
        { name: 'read:business', resource: 'business', action: 'read' },
        { name: 'update:business', resource: 'business', action: 'update' },
        { name: 'delete:business', resource: 'business', action: 'delete' },
        { name: 'create:job', resource: 'job', action: 'create' },
        { name: 'read:job', resource: 'job', action: 'read' },
        { name: 'update:job', resource: 'job', action: 'update' },
        { name: 'delete:job', resource: 'job', action: 'delete' },
    ];

    for (const perm of permissions) {
        await prisma.permission.upsert({
            where: { name: perm.name },
            update: {},
            create: perm,
        });
    }

    console.log('✅ Permissions created');

    // Create sample businesses
    const sampleBusinesses = [
        {
            name: 'Sunyani Central Market',
            description: 'The largest market in Sunyani offering fresh produce, textiles, and local goods',
            sector: 'Retail',
            area: 'Central Sunyani',
            phone: '+233244123456',
            email: 'info@sunyanmarket.com',
            isVerified: true,
            rating: 4.5,
            createdById: adminUser.id,
        },
        {
            name: 'Bono Tech Solutions',
            description: 'IT services and software development company',
            sector: 'Technology',
            area: 'Abesim',
            phone: '+233244789012',
            email: 'contact@bonotech.gh',
            website: 'https://bonotech.gh',
            isVerified: true,
            rating: 4.8,
            createdById: adminUser.id,
        },
        {
            name: 'Sunyani Guest House',
            description: 'Comfortable accommodation in the heart of Sunyani',
            sector: 'Hospitality',
            area: 'Penkwase',
            phone: '+233244567890',
            email: 'bookings@sunyanihouse.com',
            isVerified: true,
            rating: 4.3,
            createdById: adminUser.id,
        },
    ];

    for (const business of sampleBusinesses) {
        await prisma.business.create({ data: business });
    }

    console.log('✅ Sample businesses created');

    // Create sample job postings
    const sampleJobs = [
        {
            title: 'Administrative Assistant',
            companyName: 'Sunyani Municipal Assembly',
            description: 'We are seeking a qualified administrative assistant to support our operations.',
            requirements: 'Minimum 2 years experience, proficiency in MS Office, excellent communication skills',
            location: 'Sunyani',
            jobType: 'Full-time',
            salaryRange: 'GHS 1,500 - 2,500',
            applicationEmail: 'hr@sunyani.gov.gh',
            deadline: new Date('2025-01-31'),
            isActive: true,
            createdById: adminUser.id,
        },
        {
            title: 'Software Developer',
            companyName: 'Bono Tech Solutions',
            description: 'Join our team to build innovative solutions for local businesses',
            requirements: 'BSc Computer Science, 3+ years experience in web development, knowledge of React and Node.js',
            location: 'Sunyani',
            jobType: 'Full-time',
            salaryRange: 'GHS 3,000 - 5,000',
            applicationEmail: 'careers@bonotech.gh',
            deadline: new Date('2025-02-15'),
            isActive: true,
            createdById: adminUser.id,
        },
    ];

    for (const job of sampleJobs) {
        await prisma.job.create({ data: job });
    }

    console.log('✅ Sample jobs created');

    console.log('🎉 Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
