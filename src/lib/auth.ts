import bcrypt from 'bcrypt'
import { db } from './db'
import { Role, SubscriptionStatus } from '@prisma/client'
import { randomBytes, createHash } from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hashPassword(password)
  
  return db.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role: Role.USER,
      subscriptionStatus: SubscriptionStatus.FREE,
      isEmailVerified: true, // Set to true since user is created after email verification
    },
  })
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email },
  })
}

export async function getUserById(id: string) {
  return db.user.findUnique({
    where: { id },
  })
}

export async function updateUserSubscription(userId: string, subscriptionStatus: SubscriptionStatus) {
  return db.user.update({
    where: { id: userId },
    data: { subscriptionStatus },
  })
}

export async function getAllUsers() {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      subscriptionStatus: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function generatePasswordResetToken(email: string): Promise<{ token: string; expiresAt: Date }> {
  console.log('Generating password reset token for:', email);
  
  try {
    // Generate a random token
    const token = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(token).digest('hex');
    
    // Set expiration to 1 hour from now
    const expiresAt = new Date(Date.now() + 3600000);

    console.log('Creating password reset token in database');
    // Store the hashed token in the database
    await db.passwordResetToken.create({
      data: {
        email,
        token: hashedToken,
        expiresAt,
      },
    });

    console.log('Password reset token generated successfully');
    return { token, expiresAt };
  } catch (error) {
    console.error('Error generating password reset token:', error);
    throw error;
  }
}

export async function validatePasswordResetToken(token: string, email: string): Promise<boolean> {
  const hashedToken = createHash('sha256').update(token).digest('hex');
  
  const resetToken = await db.passwordResetToken.findFirst({
    where: {
      email,
      token: hashedToken,
      expiresAt: {
        gt: new Date(),
      },
      used: false,
    },
  });

  if (!resetToken) {
    return false;
  }

  // Mark token as used
  await db.passwordResetToken.update({
    where: { id: resetToken.id },
    data: { used: true },
  });

  return true;
}

export async function resetPassword(email: string, newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);
  
  await db.user.update({
    where: { email },
    data: { hashedPassword }, // Fixed field name from password to hashedPassword
  });
}
