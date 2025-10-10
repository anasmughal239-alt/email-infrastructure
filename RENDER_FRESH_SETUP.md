# Fresh Render Setup Guide

This guide will walk you through setting up a completely new deployment on Render.com from scratch.

## Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `email-infra-db-v2`
   - **Database**: `email_infra_db`
   - **User**: `email_infra_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free (or paid for production)
4. Click "Create Database"
5. **Save the connection string** - you'll need it for the web service

## Step 2: Create Redis Cache (Optional but Recommended)

1. Click "New +" → "Redis"
2. Configure:
   - **Name**: `email-infra-redis-v2`
   - **Region**: Same as database
   - **Plan**: Free (or paid for production)
3. Click "Create Redis"
4. **Save the connection string** - you'll need it for the web service

## Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository:
   - **Repository**: `anasmughal239-alt/email-infrastructure`
   - **Branch**: `main`
3. Configure basic settings:
   - **Name**: `email-infrastructure-v2`
   - **Region**: Same as database and Redis
   - **Branch**: `main`
   - **Root Directory**: `.` (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm ci && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

## Step 4: Environment Variables

Add these environment variables to your web service:

### Required Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | |
| `DATABASE_URL` | *From PostgreSQL service* | Use "Connect" button |
| `REDIS_URL` | *From Redis service* | Use "Connect" button |
| `NEXTAUTH_URL` | `https://email-infrastructure-v2.onrender.com` | Replace with your service URL |
| `NEXTAUTH_SECRET` | *Generate new secret* | Use "Generate" button |
| `RESEND_API_KEY` | `re_xxxxxxxxxx` | Get from Resend dashboard |
| `FROM_EMAIL` | `noreply@yourdomain.com` | Your verified domain |

### Performance & Build Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_TELEMETRY_DISABLED` | `1` | Disable Next.js telemetry |
| `SKIP_ENV_VALIDATION` | `true` | Skip env validation during build |
| `DISABLE_ESLINT_PLUGIN` | `true` | Speed up build |
| `PORT` | `3000` | Default port |
| `SKIP_TYPE_CHECK` | `true` | Speed up build |
| `PRISMA_GENERATE_DATAPROXY` | `false` | Use standard Prisma client |

### Optional Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `COMPANY_NAME` | `Your Company` | For email templates |
| `SUPPORT_EMAIL` | `support@yourdomain.com` | Support contact |
| `REPLY_TO_EMAIL` | `support@yourdomain.com` | Email reply-to |

## Step 5: Advanced Settings

1. **Health Check Path**: `/api/health`
2. **Auto-Deploy**: `Yes`
3. **Pull Request Previews**: `No` (optional)

## Step 6: Deploy

1. Click "Create Web Service"
2. Wait for the build to complete (5-10 minutes)
3. Check the logs for any errors
4. Test the health endpoint: `https://your-service-url.onrender.com/api/health`

## Step 7: Post-Deployment

1. **Test the application**: Visit your service URL
2. **Check database**: Ensure migrations ran successfully
3. **Test email**: Try the registration flow
4. **Monitor logs**: Check for any runtime errors

## Troubleshooting

### Common Issues

1. **Build fails**: Check that all environment variables are set
2. **Database connection fails**: Verify DATABASE_URL is correct
3. **Prisma errors**: Ensure migrations are up to date
4. **Email not working**: Verify RESEND_API_KEY and FROM_EMAIL

### Useful Commands

```bash
# Check service status
curl https://your-service-url.onrender.com/api/health

# View logs
# Use Render dashboard logs section
```

## Environment Variables Template

Copy this template and fill in your values:

```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
NEXTAUTH_URL=https://your-service-url.onrender.com
NEXTAUTH_SECRET=your-generated-secret
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=noreply@yourdomain.com
NEXT_TELEMETRY_DISABLED=1
SKIP_ENV_VALIDATION=true
DISABLE_ESLINT_PLUGIN=true
PORT=3000
SKIP_TYPE_CHECK=true
PRISMA_GENERATE_DATAPROXY=false
```

## Next Steps

After successful deployment:

1. Set up your custom domain (if needed)
2. Configure SSL certificate
3. Set up monitoring and alerts
4. Configure backup strategy
5. Set up CI/CD pipeline