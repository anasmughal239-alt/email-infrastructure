import { db } from './db';
import { generateVerificationCode, getCodeExpirationTime, isCodeExpired } from './email';

const MAX_VERIFICATION_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_CODES_PER_EMAIL = 3;

export interface VerificationResult {
  success: boolean;
  message: string;
  attemptsRemaining?: number;
}

export async function createVerificationCode(email: string): Promise<{ code: string; id: string }> {
  try {
    // Check rate limiting - max 3 codes per email in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCodes = await db.emailVerificationCode.count({
      where: {
        email,
        createdAt: {
          gte: oneHourAgo,
        },
      },
    });

    if (recentCodes >= MAX_CODES_PER_EMAIL) {
      throw new Error('Too many verification codes requested. Please wait before requesting a new code.');
    }

    // Invalidate any existing unverified codes for this email
    await db.emailVerificationCode.updateMany({
      where: {
        email,
        verified: false,
      },
      data: {
        verified: true, // Mark as used to prevent reuse
      },
    });

    // Generate new verification code
    const code = generateVerificationCode();
    const expiresAt = getCodeExpirationTime();

    const verificationRecord = await db.emailVerificationCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    return {
      code,
      id: verificationRecord.id,
    };
  } catch (error) {
    console.error('Error in createVerificationCode:', error);
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name
    });
    throw error;
  }
}

export async function verifyCode(email: string, code: string): Promise<VerificationResult> {
  try {
    // Find the verification record
    const verificationRecord = await db.emailVerificationCode.findFirst({
      where: {
        email,
        code,
        verified: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verificationRecord) {
      return {
        success: false,
        message: 'Invalid verification code. Please check the code and try again.',
      };
    }

    // Check if code has expired
    if (isCodeExpired(verificationRecord.expiresAt)) {
      await db.emailVerificationCode.update({
        where: { id: verificationRecord.id },
        data: { verified: true }, // Mark as used
      });

      return {
        success: false,
        message: 'Verification code has expired. Please request a new code.',
      };
    }

    // Check attempt limits
    if (verificationRecord.attempts >= MAX_VERIFICATION_ATTEMPTS) {
      await db.emailVerificationCode.update({
        where: { id: verificationRecord.id },
        data: { verified: true }, // Mark as used
      });

      return {
        success: false,
        message: 'Too many failed attempts. Please request a new verification code.',
      };
    }

    // Increment attempt counter
    await db.emailVerificationCode.update({
      where: { id: verificationRecord.id },
      data: {
        attempts: verificationRecord.attempts + 1,
      },
    });

    // Verify the code
    if (verificationRecord.code === code) {
      // Mark as verified
      await db.emailVerificationCode.update({
        where: { id: verificationRecord.id },
        data: { verified: true },
      });

      return {
        success: true,
        message: 'Email verified successfully!',
      };
    } else {
      const attemptsRemaining = MAX_VERIFICATION_ATTEMPTS - (verificationRecord.attempts + 1);
      return {
        success: false,
        message: `Invalid verification code. ${attemptsRemaining} attempts remaining.`,
        attemptsRemaining,
      };
    }
  } catch (error) {
    console.error('Verification error:', error);
    return {
      success: false,
      message: 'An error occurred during verification. Please try again.',
    };
  }
}

export async function cleanupExpiredCodes(): Promise<void> {
  try {
    const now = new Date();
    await db.emailVerificationCode.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: now } },
          { verified: true },
        ],
      },
    });
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

export async function hasValidVerificationCode(email: string): Promise<boolean> {
  const verificationRecord = await db.emailVerificationCode.findFirst({
    where: {
      email,
      verified: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  return !!verificationRecord;
}

export async function getVerificationAttempts(email: string): Promise<number> {
  const verificationRecord = await db.emailVerificationCode.findFirst({
    where: {
      email,
      verified: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return verificationRecord?.attempts || 0;
}