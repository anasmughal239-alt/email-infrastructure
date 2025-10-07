import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { Role } from '@prisma/client'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== Role.ADMIN) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // Dashboard routes protection
    if (pathname.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // API admin routes protection
    if (pathname.startsWith('/api/admin')) {
      if (!token || token.role !== Role.ADMIN) {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      }
    }

    // Protected API routes
    if (pathname.startsWith('/api/auth/profile')) {
      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    // Add security headers
    const response = NextResponse.next()
    
    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';"
    )
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
    
    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow public routes
        if (
          pathname.startsWith('/api/auth/register') ||
          pathname.startsWith('/api/auth/signin') ||
          pathname.startsWith('/api/auth/callback') ||
          pathname.startsWith('/api/auth/session') ||
          pathname.startsWith('/api/auth/providers') ||
          pathname.startsWith('/auth/') ||
          pathname === '/' ||
          pathname.startsWith('/terms') ||
          pathname.startsWith('/privacy') ||
          pathname.startsWith('/contact') ||
          pathname.startsWith('/integrations') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon')
        ) {
          return true
        }

        // For protected routes, require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/auth/profile',
    '/api/admin/:path*'
  ]
}