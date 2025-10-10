import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, generatePasswordResetToken } from '@/lib/auth'
import { rateLimit, getClientIP, validateEmail } from '@/lib/security'
import { sendPasswordResetEmail } from '@/lib/email'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').max(254),
})

export async function POST(request: NextRequest) {
  try {
    console.log('Received password reset request');
    
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`forgot-password:${clientIP}`, 3, 15 * 60 * 1000) // 3 attempts per 15 minutes
    
    if (!rateLimitResult.success) {
      console.log('Rate limit exceeded for IP:', clientIP);
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
    console.log('Received request body:', { email: body.email });
    
    // Validate input
    const validatedData = forgotPasswordSchema.parse(body)
    const { email } = validatedData

    // Additional email validation
    if (!validateEmail(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if user exists
    console.log('Checking if user exists:', email);
    const user = await getUserByEmail(email)
    if (!user) {
      console.log('User not found:', email);
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive a password reset link.' },
        { status: 200 }
      )
    }

    console.log('User found, generating reset token');
    // Generate reset token
    const { token, expiresAt } = await generatePasswordResetToken(email)

    // Send password reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`
    console.log('Generated reset URL:', resetUrl);
    
    try {
      await sendPasswordResetEmail({
        email,
        resetUrl,
        name: user.name,
        expiresAt,
      })
      console.log('Password reset email sent successfully');
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      throw emailError;
    }

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive a password reset link.' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}