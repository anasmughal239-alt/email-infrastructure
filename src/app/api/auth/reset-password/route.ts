import { NextRequest, NextResponse } from 'next/server'
import { validatePasswordResetToken, resetPassword } from '@/lib/auth'
import { rateLimit, getClientIP, validatePassword } from '@/lib/security'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address').max(254),
  token: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`reset-password:${clientIP}`, 3, 15 * 60 * 1000) // 3 attempts per 15 minutes
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many password reset attempts. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = resetPasswordSchema.parse(body)
    const { email, token, password } = validatedData

    // Enhanced password validation
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Password does not meet requirements', details: passwordValidation.errors },
        { status: 400 }
      )
    }

    // Validate reset token
    const isValid = await validatePasswordResetToken(token, email)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Reset password
    await resetPassword(email, password)

    return NextResponse.json(
      { message: 'Password reset successful. You can now log in with your new password.' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}