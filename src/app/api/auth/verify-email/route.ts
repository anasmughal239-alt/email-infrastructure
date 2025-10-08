import { NextRequest, NextResponse } from 'next/server'
import { verifyCode } from '@/lib/verification'
import { createUser } from '@/lib/auth'
import { rateLimit, getClientIP, sanitizeInput, validateEmail, validatePassword } from '@/lib/security'
import { z } from 'zod'

const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
  name: z.string().optional().transform(val => val ? sanitizeInput(val) : undefined),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for verification attempts
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`verify:${clientIP}`, 10, 15 * 60 * 1000) // 10 attempts per 15 minutes
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please try again later.' },
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
    const validatedData = verifyEmailSchema.parse(body)
    const { email, code, password, name } = validatedData

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

    // Verify the email code
    const verificationResult = await verifyCode(email, code)
    
    if (!verificationResult.success) {
      return NextResponse.json(
        { 
          error: verificationResult.message,
          attemptsRemaining: verificationResult.attemptsRemaining 
        },
        { status: 400 }
      )
    }

    // Create the user after successful verification
    try {
      const user = await createUser(email, password, name)

      // Return user data without password
      const { hashedPassword, ...userWithoutPassword } = user
      
      return NextResponse.json(
        { 
          message: 'Email verified and account created successfully!',
          user: userWithoutPassword,
          verified: true
        },
        { status: 201 }
      )
    } catch (userCreationError: any) {
      console.error('User creation error:', userCreationError)
      return NextResponse.json(
        { error: 'Failed to create user account. Please try again.' },
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

    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
