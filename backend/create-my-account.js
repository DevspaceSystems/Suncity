// Simple script to create your admin account
// Run this once: node create-my-account.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAccount() {
  console.log('\n🔐 Create Your Admin Account\n');
  console.log('========================================\n');

  try {
    // Get user input
    const email = await question('Enter your email: ');
    const password = await question('Enter your password (min 6 characters): ');
    const fullName = await question('Enter your full name: ');
    const phone = await question('Enter your phone (optional, press Enter to skip): ') || null;

    if (password.length < 6) {
      console.log('\n❌ Password must be at least 6 characters!');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Creating your account...\n');

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('❌ User with this email already exists!');
      console.log('   Use a different email or login with existing account.');
      rl.close();
      await prisma.$disconnect();
      process.exit(1);
    }

    // Get or create Super Admin role
    let role = await prisma.role.findFirst({
      where: { name: 'Super Admin' },
    });

    if (!role) {
      // Check if any roles exist
      const roleCount = await prisma.role.count();
      
      if (roleCount === 0) {
        // No roles exist - create Super Admin
        role = await prisma.role.create({
          data: {
            name: 'Super Admin',
            description: 'Full system access',
          },
        });
        console.log('✅ Created Super Admin role');
      } else {
        // Roles exist but not Super Admin - use first role
        role = await prisma.role.findFirst();
        console.log(`⚠️  Super Admin role not found, using: ${role.name}`);
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        fullName,
        phone,
        roleId: role.id,
        isActive: true,
        emailVerified: true,
      },
      include: { role: true },
    });

    console.log('\n========================================');
    console.log('✅ ACCOUNT CREATED SUCCESSFULLY!');
    console.log('========================================\n');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.fullName);
    console.log('🔑 Role:', user.role.name);
    console.log('✅ Status: Active');
    console.log('\n========================================\n');
    console.log('🚀 You can now login at: http://localhost:3002/login');
    console.log('\n📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('\n========================================\n');

  } catch (error) {
    console.error('\n❌ Error creating account:', error.message);
    
    if (error.code === 'P1001') {
      console.error('\n⚠️  Database connection error!');
      console.error('   Make sure your .env file has the correct DATABASE_URL');
      console.error('   Connection string should be:');
      console.error('   postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public');
      console.error('\n   (Replace %21 with ! and %24 with $ if needed)');
    } else if (error.code === 'P2002') {
      console.error('\n⚠️  Email already exists!');
      console.error('   Use a different email or login with existing account.');
    } else {
      console.error('\nFull error:', error);
    }
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createAccount();

