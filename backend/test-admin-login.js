// Test script to verify admin user exists and password works
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function testAdminLogin() {
    console.log('🔍 Testing admin login...\n');

    try {
        // 1. Check if admin user exists
        console.log('1. Checking if admin user exists...');
        const adminUser = await prisma.user.findUnique({
            where: { email: 'admin@sunyani.gov.gh' },
            include: { role: true },
        });

        if (!adminUser) {
            console.log('❌ Admin user NOT found!');
            console.log('   Run the SQL script to create admin user.');
            return;
        }

        console.log('✅ Admin user found!');
        console.log('   Email:', adminUser.email);
        console.log('   Name:', adminUser.fullName);
        console.log('   Role:', adminUser.role.name);
        console.log('   Is Active:', adminUser.isActive);
        console.log('   Email Verified:', adminUser.emailVerified);
        console.log('   Password Hash:', adminUser.passwordHash.substring(0, 20) + '...');

        // 2. Test password
        console.log('\n2. Testing password...');
        const testPassword = 'Admin@2024!';
        const isPasswordValid = await bcrypt.compare(testPassword, adminUser.passwordHash);
        
        if (isPasswordValid) {
            console.log('✅ Password is VALID!');
        } else {
            console.log('❌ Password is INVALID!');
            console.log('   The password hash in database does not match "Admin@2024!"');
            console.log('   You need to update the password hash.');
        }

        // 3. Check user status
        console.log('\n3. Checking user status...');
        if (!adminUser.isActive) {
            console.log('❌ User is NOT active!');
        } else {
            console.log('✅ User is active');
        }

        if (!adminUser.emailVerified) {
            console.log('⚠️  Email is NOT verified (but login should still work)');
        } else {
            console.log('✅ Email is verified');
        }

        // 4. Summary
        console.log('\n========================================');
        if (isPasswordValid && adminUser.isActive) {
            console.log('✅ ADMIN LOGIN SHOULD WORK!');
            console.log('   If login still fails, check:');
            console.log('   1. Backend is running on port 3001');
            console.log('   2. API URL is correct: http://localhost:3001/api');
            console.log('   3. CORS is enabled in backend');
        } else {
            console.log('❌ ADMIN LOGIN WILL NOT WORK');
            if (!isPasswordValid) {
                console.log('   - Password hash is incorrect');
                console.log('   - Run: node scripts/update-admin-password.js');
            }
            if (!adminUser.isActive) {
                console.log('   - User is not active');
                console.log('   - Update user in database: is_active = true');
            }
        }
        console.log('========================================\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('\nFull error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testAdminLogin();

