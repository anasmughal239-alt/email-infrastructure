import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/auth'
import { rateLimit, getClientIP, sanitizeInput, validateEmail, validatePassword } from '@/lib/security'
import { createVerificationCode } from '@/lib/verification'
import { sendVerificationEmail } from '@/lib/email'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Invalid email address').max(254),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
  name: z.string().optional().transform(val => val ? sanitizeInput(val) : undefined),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`register:${clientIP}`, 5, 15 * 60 * 1000) // 5 attempts per 15 minutes
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
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
    const validatedData = registerSchema.parse(body)
    const { email, password, name } = validatedData

    // Additional email validation
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Enhanced password validation
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Password does not meet requirements', details: passwordValidation.errors },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Create verification code and send email
    try {
      const { code } = await createVerificationCode(email)
      
      await sendVerificationEmail({
        email,
        code,
        name,
      })

      return NextResponse.json(
        { 
          message: 'Verification email sent successfully. Please check your email and enter the verification code.',
          email,
          requiresVerification: true
        },
        { status: 200 }
      )
    } catch (verificationError: any) {
      console.error('Verification email error:', verificationError)
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

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}