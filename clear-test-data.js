const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearTestData() {
  try {
    console.log('Clearing test data...');
    
    // Delete verification codes for test email
    await prisma.emailVerificationCode.deleteMany({
      where: {
        email: 'anasmughal239@gmail.com'
      }
    });
    
    // Delete user for test email
    await prisma.user.deleteMany({
      where: {
        email: 'anasmughal239@gmail.com'
      }
    });
    
    console.log('✅ Test data cleared successfully!');
    console.log('You can now test registration with anasmughal239@gmail.com');
    
  } catch (error) {
    console.error('❌ Error clearing test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearTestData();