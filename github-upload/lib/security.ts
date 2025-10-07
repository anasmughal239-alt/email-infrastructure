import { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = identifier
  
  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return {
      success: true,
      remaining: limit - 1,
      resetTime: now + windowMs
    }
  }
  
  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: current.resetTime
    }
  }
  
  current.count++
  rateLimitStore.set(key, current)
  
  return {
    success: true,
    remaining: limit - current.count,
    resetTime: current.resetTime
  }
}

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return request.ip || 'unknown'
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Limit length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60 * 1000) // Clean up every minute