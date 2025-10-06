const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: 'anasmughal239@gmail.com'
      }
    });

    if (user) {
      console.log('User found:');
      console.log('ID:', user.id);
      console.log('Email:', user.email);
      console.log('Name:', user.name);
      console.log('Email Verified:', user.emailVerified);
      console.log('Created At:', user.createdAt);
      console.log('Updated At:', user.updatedAt);
      console.log('Has Password:', !!user.hashedPassword);
      console.log('Role:', user.role);
      console.log('Subscription:', user.subscriptionStatus);
    } else {
      console.log('No user found with email: anasmughal239@gmail.com');
    }

    // Also check all users to see what's in the database
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        createdAt: true,
        hashedPassword: true,
        role: true
      }
    });

    console.log('\nAll users in database:');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.name || 'No name'}) - Has Password: ${!!user.hashedPassword} - Created: ${user.createdAt}`);
    });

  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();