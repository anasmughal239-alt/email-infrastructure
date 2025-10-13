import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() })

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session and trying to access protected routes
    if (!session) {
      const isProtectedRoute =
        request.nextUrl.pathname.startsWith('/admin') ||
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/api/admin') ||
        request.nextUrl.pathname.startsWith('/api/dashboard')

      if (isProtectedRoute) {
        const redirectUrl = new URL('/auth/signin', request.url)
        redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Check role-based access
    if (session) {
      const userRole = session.user.user_metadata.role

      // Admin routes protection
      if (
        request.nextUrl.pathname.startsWith('/admin') ||
        request.nextUrl.pathname.startsWith('/api/admin')
      ) {
        if (userRole !== 'ADMIN') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }

      // Dashboard routes protection (allow both admin and regular users)
      if (
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/api/dashboard')
      ) {
        if (!['ADMIN', 'USER'].includes(userRole)) {
          return NextResponse.redirect(new URL('/auth/signin', request.url))
        }
      }
    }

    // Security headers
    const response = NextResponse.next()
    response.headers.set('x-frame-options', 'DENY')
    response.headers.set('x-content-type-options', 'nosniff')
    response.headers.set('x-xss-protection', '1; mode=block')
    response.headers.set(
      'strict-transport-security',
      'max-age=31536000; includeSubDomains; preload'
    )

    return response
  } catch (error) {
    // Log error and redirect to sign-in page
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
