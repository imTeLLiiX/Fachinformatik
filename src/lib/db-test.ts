import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testMongoDBConnection() {
  try {
    // Test: Create a user
    const newUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'test123',
        firstName: 'Test',
        lastName: 'User',
        role: 'USER',
      },
    });
    console.log('Created user:', newUser);

    // Test: Read the user
    const foundUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });
    console.log('Found user:', foundUser);

    // Test: Update the user
    const updatedUser = await prisma.user.update({
      where: { email: 'test@example.com' },
      data: { firstName: 'Updated' },
    });
    console.log('Updated user:', updatedUser);

    // Test: Delete the user
    const deletedUser = await prisma.user.delete({
      where: { email: 'test@example.com' },
    });
    console.log('Deleted user:', deletedUser);

    console.log('All MongoDB operations successful!');
  } catch (error) {
    console.error('Error testing MongoDB connection:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testMongoDBConnection(); 