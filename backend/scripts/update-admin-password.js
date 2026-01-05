// Script to update admin user password hash
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function updateAdminPassword() {
    console.log('🔐 Updating admin password...\n');

    try {
        // Generate new password hash
        const password = 'Admin@2024!';
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log('New password hash:', hashedPassword);
        console.log('');

        // Update admin user
        const adminUser = await prisma.user.update({
            where: { email: 'admin@sunyani.gov.gh' },
            data: {
                passwordHash: hashedPassword,
                isActive: true,
                emailVerified: true,
            },
            include: { role: true },
        });

        console.log('✅ Admin password updated successfully!');
        console.log('   Email:', adminUser.email);
        console.log('   Role:', adminUser.role.name);
        console.log('   Is Active:', adminUser.isActive);
        console.log('   Email Verified:', adminUser.emailVerified);
        console.log('');
        console.log('🔑 Login credentials:');
        console.log('   Email: admin@sunyani.gov.gh');
        console.log('   Password: Admin@2024!');

    } catch (error) {
        if (error.code === 'P2025') {
            console.error('❌ Admin user not found!');
            console.error('   Run the SQL script to create admin user first.');
        } else {
            console.error('❌ Error:', error.message);
            console.error('\nFull error:', error);
        }
    } finally {
        await prisma.$disconnect();
    }
}

updateAdminPassword();

