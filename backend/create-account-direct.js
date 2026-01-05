// SIMPLEST WAY - Create Your Account Directly
// Run: node create-account-direct.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const readline = require('readline');

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
    // Use direct connection string (bypasses .env file issues)
    const connectionString = 'postgresql://postgres:8c!cFP7Drp$6XUn@db.skbdfyjkhljjhnokmqob.supabase.co:5432/postgres?schema=public';
    
    // Set DATABASE_URL environment variable for this process
    process.env.DATABASE_URL = connectionString;
    
    const prisma = new PrismaClient();

    // Get user input
    const email = await question('Enter your email: ');
    const password = await question('Enter your password (min 6 characters): ');
    const fullName = await question('Enter your full name: ');
    const phone = await question('Enter your phone (optional, press Enter to skip): ') || null;

    if (password.length < 6) {
      console.log('\n❌ Password must be at least 6 characters!');
      rl.close();
      await prisma.$disconnect();
      process.exit(1);
    }

    console.log('\n⏳ Connecting to database...');

    // Test connection
    await prisma.$connect();
    console.log('✅ Connected to database\n');

    console.log('⏳ Creating your account...\n');

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
      const roleCount = await prisma.role.count();
      
      if (roleCount === 0) {
        role = await prisma.role.create({
          data: {
            name: 'Super Admin',
            description: 'Full system access',
          },
        });
        console.log('✅ Created Super Admin role');
      } else {
        role = await prisma.role.findFirst();
        console.log(`⚠️  Using role: ${role.name}`);
      }
    }

    // Hash password
    console.log('⏳ Hashing password...');
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
    console.error('\n❌ Error:', error.message);
    
    if (error.code === 'P1001') {
      console.error('\n⚠️  Cannot connect to database!');
      console.error('   Check your Supabase project is active');
      console.error('   Check your password is correct: 8c!cFP7Drp$6XUn');
    } else if (error.code === 'P2002') {
      console.error('\n⚠️  Email already exists!');
      console.error('   Use a different email.');
    } else {
      console.error('\nFull error:', error);
    }
  } finally {
    rl.close();
    try {
      await prisma.$disconnect();
    } catch {}
  }
}

createAccount();

