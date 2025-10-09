# 🚀 Render Web Service Deployment Guide

## Email Infrastructure - Web Service Setup

This guide will help you deploy your Email Infrastructure application using Render's Web Service interface instead of Blueprint YAML.

## ✅ Why Web Service Over Blueprint?

- **No YAML syntax errors** - GUI-based configuration
- **Easier debugging** - Clear error messages in dashboard
- **Simple modifications** - Change settings without code commits
- **Visual management** - See all services in one place
- **Better reliability** - Fewer configuration issues

---

## 📋 Step-by-Step Deployment

### Step 1: Create the Web Service

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in to your account

2. **Create New Web Service**
   - Click **"New +"** button
   - Select **"Web Service"**
   - Choose **"Build and deploy from a Git repository"**

3. **Connect Repository**
   - Select **GitHub**
   - Choose: `anasmughal239-alt/email-infrastructure`
   - Click **"Connect"**

### Step 2: Configure Web Service Settings

**Basic Configuration:**
```
Name: email-infrastructure
Environment: Node
Region: Oregon (US West) [or your preferred region]
Branch: main
Root Directory: [leave blank]
```

**Build & Deploy Settings:**
```
Build Command: npm ci && npx prisma generate && npm run build
Start Command: npm start
```

**Advanced Settings:**
```
Auto-Deploy: Yes
Health Check Path: /api/health
```

### Step 3: Environment Variables

Add these environment variables in the **Environment** tab:

```bash
NODE_ENV=production
NEXTAUTH_URL=https://email-infrastructure.onrender.com
NEXTAUTH_SECRET=your-nextauth-secret-here
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@yourdomain.com
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

**Important Notes:**
- Replace `your-nextauth-secret-here` with a secure random string
- Replace `your-resend-api-key` with your actual Resend API key
- Update `FROM_EMAIL` with your domain email

### Step 4: Create PostgreSQL Database

1. **Create Database Service**
   - Click **"New +"** → **"PostgreSQL"**
   - Name: `email-infra-db`
   - Database Name: `email_infra_db`
   - User: `email_infra_user`
   - Region: **Same as your web service**
   - Plan: **Free**

2. **Get Database URL**
   - Go to your PostgreSQL service
   - Copy the **Internal Database URL**
   - Add to your Web Service as environment variable:
     ```
     DATABASE_URL=[paste the internal database URL here]
     ```

### Step 5: Create Redis Cache (Optional but Recommended)

1. **Create Redis Service**
   - Click **"New +"** → **"Redis"**
   - Name: `email-infra-redis`
   - Region: **Same as your web service**
   - Plan: **Free**

2. **Get Redis URL**
   - Go to your Redis service
   - Copy the **Internal Redis URL**
   - Add to your Web Service as environment variable:
     ```
     REDIS_URL=[paste the internal redis URL here]
     ```

### Step 6: Deploy and Verify

1. **Deploy the Service**
   - Click **"Create Web Service"**
   - Wait for the build and deployment to complete
   - Monitor the logs for any issues

2. **Verify Deployment**
   - Visit your app URL: `https://email-infrastructure.onrender.com`
   - Check health endpoint: `https://email-infrastructure.onrender.com/api/health`
   - Test user registration and login

---

## 🔧 Configuration Details

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DATABASE_URL` | PostgreSQL connection | From PostgreSQL service |
| `REDIS_URL` | Redis connection | From Redis service |
| `NEXTAUTH_URL` | App URL for auth | `https://your-app.onrender.com` |
| `NEXTAUTH_SECRET` | Auth secret key | Random secure string |
| `RESEND_API_KEY` | Email service key | Your Resend API key |
| `FROM_EMAIL` | Default sender email | `noreply@yourdomain.com` |

### Build Process

The build command will:
1. Install dependencies with `npm ci`
2. Generate Prisma client
3. Build the Next.js application
4. Prepare for production deployment

### Health Check

The application includes a health check endpoint at `/api/health` that:
- Verifies database connectivity
- Checks Redis connection (if configured)
- Returns application status
- Enables Render's health monitoring

---

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
- Check that all environment variables are set
- Verify Prisma schema is valid
- Ensure dependencies are up to date

**Database Connection:**
- Use **Internal Database URL** (not external)
- Ensure database and web service are in same region
- Check that DATABASE_URL is correctly set

**Authentication Issues:**
- Verify NEXTAUTH_URL matches your actual domain
- Ensure NEXTAUTH_SECRET is set and secure
- Check that callback URLs are configured

### Monitoring

- **Logs**: Available in Render dashboard
- **Metrics**: CPU, memory, and response time monitoring
- **Health Checks**: Automatic monitoring of `/api/health`
- **Alerts**: Configure notifications for downtime

---

## 🎯 Next Steps After Deployment

1. **Test All Features**
   - User registration and login
   - Email verification
   - Dashboard functionality
   - Admin panel access

2. **Configure Custom Domain** (Optional)
   - Add your custom domain in Render settings
   - Update NEXTAUTH_URL to match custom domain
   - Configure DNS records

3. **Set Up Monitoring**
   - Configure uptime monitoring
   - Set up error tracking
   - Monitor performance metrics

4. **Security Review**
   - Verify all secrets are secure
   - Check CORS settings
   - Review authentication configuration

---

## 📞 Support

If you encounter any issues:
- Check Render's documentation: https://render.com/docs
- Review application logs in Render dashboard
- Verify all environment variables are correctly set
- Ensure database and Redis services are running

Your Email Infrastructure application will be live at:
**https://email-infrastructure.onrender.com**

🎉 **Congratulations! Your application is now deployed via Web Service!**