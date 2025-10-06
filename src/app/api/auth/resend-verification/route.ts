import { NextRequest, NextResponse } from 'next/server'
import { createVerificationCode, hasValidVerificationCode } from '@/lib/verification'
import { sendVerificationEmail } from '@/lib/email'
import { getUserByEmail } from '@/lib/auth'
import { rateLimit, getClientIP, validateEmail } from '@/lib/security'
import { z } from 'zod'

const resendSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Strict rate limiting for resend requests
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`resend:${clientIP}`, 3, 60 * 60 * 1000) // 3 attempts per hour
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many resend requests. Please wait before requesting another code.' },
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
    const validatedData = resendSchema.parse(body)
    const { email, name } = validatedData

    // Additional email validation
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if user already exists (shouldn't resend for existing users)
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists. Please try logging in instead.' },
        { status: 400 }
      )
    }

    // Check if there's already a valid verification code
    const hasValidCode = await hasValidVerificationCode(email)
    if (hasValidCode) {
      return NextResponse.json(
        { error: 'A verification code is already active. Please check your email or wait for it to expire.' },
        { status: 400 }
      )
    }

    // Create new verification code and send email
    try {
      const { code } = await createVerificationCode(email)
      
      await sendVerificationEmail({
        email,
        code,
        name,
      })

      return NextResponse.json(
        { 
          message: 'New verification code sent successfully. Please check your email.',
          email
        },
        { status: 200 }
      )
    } catch (verificationError: any) {
      console.error('Resend verification error:', verificationError)
      return NextResponse.json(
        { error: verificationError.message || 'Failed to send verification email' },
        { status: 500 }
      )
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}