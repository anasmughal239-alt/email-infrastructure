# Email Infrastructure - Render.com Deployment Guide

## Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **OAuth App Credentials** - Google and GitHub OAuth applications
4. **Resend API Key** - For email functionality

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Email Infrastructure App"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub and create a new repository
   - Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/email-infrastructure.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Set Up OAuth Applications

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://your-app-name.onrender.com/api/auth/callback/google`

### GitHub OAuth Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `https://your-app-name.onrender.com/api/auth/callback/github`

## Step 3: Deploy to Render

### Option A: Using render.yaml (Recommended)
1. Your project already includes `render.yaml`
2. In Render dashboard, click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the configuration

### Option B: Manual Setup
1. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `email-infra-db`
   - Plan: Free
   - Note the connection string

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - **Name**: `email-infrastructure`
     - **Environment**: `Node`
     - **Build Command**: `npm ci && npx prisma generate && npm run build`
     - **Start Command**: `npx prisma migrate deploy && npm start`

## Step 4: Configure Environment Variables

In your Render web service, add these environment variables:

```env
# Database (from your Render PostgreSQL service)
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth
NEXTAUTH_SECRET=your-super-secret-production-key-min-32-chars
NEXTAUTH_URL=https://your-app-name.onrender.com

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email Service
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@yourdomain.com

# Environment
NODE_ENV=production
```

## Step 5: Deploy and Test

1. **Deploy**: Render will automatically build and deploy
2. **Monitor**: Check build logs for any errors
3. **Test**: Visit your app at `https://your-app-name.onrender.com`
4. **Health Check**: Visit `/api/health` to verify database connection

## Step 6: Post-Deployment

1. **Update OAuth Redirect URIs** with your actual Render URL
2. **Test Authentication** with Google and GitHub
3. **Test Email Functionality** 
4. **Monitor Application** using Render dashboard

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correctly set
   - Check if migrations ran successfully
   - Visit `/api/health` to test connection

3. **Authentication Issues**:
   - Verify NEXTAUTH_URL matches your Render URL
   - Check OAuth redirect URIs are correct
   - Ensure NEXTAUTH_SECRET is set and secure

4. **Email Issues**:
   - Verify RESEND_API_KEY is valid
   - Check FROM_EMAIL domain is verified in Resend

### Useful Commands

```bash
# Check build locally
npm run build:production

# Test database migration
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# View database
npx prisma studio
```

## Performance Optimization

1. **Enable Caching**: Render automatically caches static assets
2. **Database Optimization**: Use connection pooling for high traffic
3. **Monitoring**: Set up alerts in Render dashboard

## Security Checklist

- ✅ NEXTAUTH_SECRET is secure (32+ characters)
- ✅ OAuth credentials are production-ready
- ✅ Database credentials are secure
- ✅ API keys are not exposed in client-side code
- ✅ HTTPS is enabled (automatic on Render)

## Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Prisma Deployment**: [prisma.io/docs/guides/deployment](https://prisma.io/docs/guides/deployment)