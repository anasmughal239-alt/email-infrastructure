const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixUserVerification() {
  try {
    const result = await prisma.user.update({
      where: {
        email: 'pijehed619@ampdial.com'
      },
      data: {
        isEmailVerified: true
      }
    });

    console.log('User verification status updated successfully:');
    console.log('Email:', result.email);
    console.log('isEmailVerified:', result.isEmailVerified);
    console.log('Updated At:', result.updatedAt);

  } catch (error) {
    console.error('Error updating user verification status:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixUserVerification();