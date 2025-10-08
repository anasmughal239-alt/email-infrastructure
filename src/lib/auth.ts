import bcrypt from 'bcrypt'
import { db } from './db'
import { Role, SubscriptionStatus } from '@prisma/client'

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
