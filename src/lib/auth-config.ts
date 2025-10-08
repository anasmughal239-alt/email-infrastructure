import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// OAuth providers temporarily disabled for initial GitHub upload
// import GoogleProvider from 'next-auth/providers/google'
// import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from './db'
import { verifyPassword, getUserByEmail } from './auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await getUserByEmail(credentials.email)
        if (!user || !user.hashedPassword) {
          return null
        }

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          return null
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
          throw new Error('Please verify your email address before signing in.')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionStatus: user.subscriptionStatus,
        }
      }
    }),
    // OAuth providers temporarily disabled for initial GitHub upload
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID || '',
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    // })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.subscriptionStatus = user.subscriptionStatus
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.subscriptionStatus = token.subscriptionStatus as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' && process.env.NEXTAUTH_URL 
          ? new URL(process.env.NEXTAUTH_URL).hostname 
          : undefined,
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}
