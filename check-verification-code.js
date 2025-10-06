const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: 'testfix123@example.com'
      }
    });

    if (user) {
      console.log('User found:');
      console.log('ID:', user.id);
      console.log('Email:', user.email);
      console.log('Name:', user.name);
      console.log('isEmailVerified:', user.isEmailVerified);
      console.log('Has Password:', !!user.hashedPassword);
      console.log('Role:', user.role);
      console.log('Created At:', user.createdAt);
    } else {
      console.log('No user found with email: testfix123@example.com');
    }

    // Also check the original user
    const originalUser = await prisma.user.findUnique({
      where: {
        email: 'pijehed619@ampdial.com'
      }
    });

    if (originalUser) {
      console.log('\nOriginal user found:');
      console.log('ID:', originalUser.id);
      console.log('Email:', originalUser.email);
      console.log('Name:', originalUser.name);
      console.log('isEmailVerified:', originalUser.isEmailVerified);
      console.log('Has Password:', !!originalUser.hashedPassword);
      console.log('Role:', originalUser.role);
      console.log('Created At:', originalUser.createdAt);
    } else {
      console.log('\nNo user found with email: pijehed619@ampdial.com');
    }

  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();