# 🚀 Complete Render.com Deployment Guide with Docker Support

## 📋 Overview

This guide provides comprehensive instructions for deploying your Email Infrastructure application to Render.com using Docker with full production configuration.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Render.com Infrastructure                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Web Service   │  │   PostgreSQL    │  │     Redis       │ │
│  │   (Docker)      │  │   Database      │  │     Cache       │ │
│  │                 │  │                 │  │   (Optional)    │ │
│  │ • Next.js App   │  │ • email_infra_db│  │ • Session Store │ │
│  │ • Health Checks │  │ • Auto Backups  │  │ • Rate Limiting │ │
│  │ • Auto Scaling  │  │ • SSL/TLS       │  │ • Caching       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Prerequisites

- [x] GitHub repository with your code
- [x] Render.com account (free tier available)
- [x] Resend API key for email functionality
- [x] Domain name (optional, for custom domains)

## 📁 Project Structure

```
Email Infra/
├── Dockerfile                    # Multi-stage Docker build
├── render.yaml                   # Render deployment configuration
├── .env.production               # Production environment variables
├── src/app/api/health/route.ts   # Health check endpoint
├── prisma/schema.prisma          # Database schema
└── package.json                  # Dependencies and scripts
```

## 🚀 Deployment Methods

### Method 1: Blueprint Deployment (Recommended)

1. **Fork or Clone Repository**
   ```bash
   git clone https://github.com/yourusername/email-infrastructure.git
   cd email-infrastructure
   ```

2. **Deploy with Render Blueprint**
   - Visit: https://render.com/deploy
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Click "Apply" to deploy all services

### Method 2: Manual Service Creation

1. **Create PostgreSQL Database**
   - Service Type: PostgreSQL
   - Name: `email-infra-db`
   - Database: `email_infra_db`
   - User: `email_infra_user`
   - Plan: Free

2. **Create Redis Cache (Optional)**
   - Service Type: Redis
   - Name: `email-infra-redis`
   - Plan: Free

3. **Create Web Service**
   - Service Type: Web Service
   - Environment: Docker
   - Repository: Your GitHub repo
   - Branch: `main`
   - Dockerfile Path: `./Dockerfile`

## 🔐 Environment Variables Configuration

### Required Variables

| Variable | Value | Source |
|----------|-------|--------|
| `NODE_ENV` | `production` | Manual |
| `DATABASE_URL` | Auto-generated | PostgreSQL service |
| `NEXTAUTH_URL` | `https://your-app.onrender.com` | Manual |
| `NEXTAUTH_SECRET` | Auto-generated | Render |
| `RESEND_API_KEY` | Your Resend API key | Manual |
| `FROM_EMAIL` | `noreply@yourdomain.com` | Manual |

### Optional Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `REDIS_URL` | Auto-generated | Session storage |
| `GOOGLE_CLIENT_ID` | Your Google OAuth ID | Social login |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth secret | Social login |
| `GITHUB_CLIENT_ID` | Your GitHub OAuth ID | Social login |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth secret | Social login |

### Adding Environment Variables

#### Option 1: From .env File
1. In Render dashboard, go to your web service
2. Navigate to "Environment" tab
3. Click "Add from .env"
4. Copy contents from `.env.production`
5. Click "Save Changes"

#### Option 2: Manual Entry
1. Go to Environment tab in your service
2. Click "Add Environment Variable"
3. Enter key-value pairs manually
4. Click "Save Changes"

## 🐳 Docker Configuration

### Multi-Stage Build Process

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder
# Install dependencies, build app, generate Prisma client

# Stage 2: Production Runtime
FROM node:18-alpine AS runner
# Copy built app, set up non-root user, configure security
```

### Key Features

- **Security**: Non-root user execution
- **Optimization**: Multi-stage build reduces image size
- **Health Checks**: Built-in health monitoring
- **Performance**: Optimized for production workloads

## 🏥 Health Monitoring

### Health Check Endpoint

```typescript
// /api/health
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "connected",
  "environment": "production"
}
```

### Monitoring Configuration

- **Path**: `/api/health`
- **Interval**: 30 seconds
- **Timeout**: 15 seconds
- **Failure Threshold**: 3 consecutive failures
- **Success Threshold**: 2 consecutive successes

## 🔒 Security Features

### HTTP Security Headers

```yaml
headers:
  - path: /*
    name: X-Frame-Options
    value: DENY
  - path: /*
    name: X-Content-Type-Options
    value: nosniff
  - path: /*
    name: Referrer-Policy
    value: strict-origin-when-cross-origin
```

### Additional Security

- SSL/TLS encryption (automatic)
- Environment variable encryption
- Non-root container execution
- Database connection encryption

## 📊 Performance Optimization

### Caching Strategy

```yaml
routes:
  - type: rewrite
    source: /_next/static/*
    destination: /_next/static/$1
    headers:
      Cache-Control: public, max-age=31536000, immutable
```

### Resource Allocation

- **Disk**: 2GB persistent storage for Next.js cache
- **Memory**: Optimized for Node.js applications
- **CPU**: Auto-scaling based on demand

## 🔄 Deployment Process

### Automatic Deployment

1. **Code Push**: Push to `main` branch
2. **Build Trigger**: Render detects changes
3. **Docker Build**: Multi-stage build process
4. **Health Check**: Verify application health
5. **Traffic Switch**: Zero-downtime deployment

### Build Process

```bash
# 1. Docker build starts
echo "Building with Docker..."

# 2. Dependencies installation
npm ci

# 3. Prisma client generation
npx prisma generate

# 4. Next.js build
npm run build

# 5. Database migration (on startup)
npx prisma migrate deploy

# 6. Application start
npm start
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Failures

**Problem**: Docker build fails
```bash
Error: Cannot find module 'xyz'
```

**Solution**:
```bash
# Check package.json dependencies
npm install
npm run build  # Test locally first
```

#### 2. Database Connection Issues

**Problem**: Database connection fails
```bash
Error: P1001: Can't reach database server
```

**Solution**:
- Verify `DATABASE_URL` environment variable
- Check PostgreSQL service status
- Ensure database is in same region

#### 3. Health Check Failures

**Problem**: Health checks failing
```bash
Health check failed: timeout
```

**Solution**:
- Check `/api/health` endpoint locally
- Verify database connectivity
- Increase health check timeout

#### 4. Environment Variable Issues

**Problem**: Missing environment variables
```bash
Error: RESEND_API_KEY is not defined
```

**Solution**:
- Verify all required variables are set
- Check variable names for typos
- Ensure variables are saved in Render

### Debug Commands

```bash
# Check service logs
render logs --service-id your-service-id

# Test health endpoint
curl https://your-app.onrender.com/api/health

# Verify environment variables
echo $DATABASE_URL
```

## 📈 Monitoring & Maintenance

### Service Monitoring

- **Uptime**: 99.9% SLA on paid plans
- **Response Time**: Monitor via health checks
- **Error Rates**: Check service logs
- **Resource Usage**: CPU, memory, disk metrics

### Maintenance Tasks

- **Database Backups**: Automatic daily backups
- **Log Rotation**: Automatic log management
- **Security Updates**: Automatic OS updates
- **SSL Certificates**: Automatic renewal

## 🔄 Scaling & Upgrades

### Horizontal Scaling

```yaml
# In render.yaml
numInstances: 3  # Scale to 3 instances
```

### Vertical Scaling

- Upgrade to paid plans for more resources
- Increase disk size for larger applications
- Add dedicated CPU for better performance

## 📚 Additional Resources

### Documentation Links

- [Render.com Documentation](https://render.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/best-practices/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

### Support Channels

- [Render Community](https://community.render.com/)
- [GitHub Issues](https://github.com/yourusername/email-infrastructure/issues)
- [Email Support](mailto:support@render.com)

## ✅ Deployment Checklist

### Pre-Deployment

- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database schema finalized
- [ ] Health check endpoint tested
- [ ] Docker build tested locally

### During Deployment

- [ ] Services created in correct order
- [ ] Environment variables applied
- [ ] Database migrations successful
- [ ] Health checks passing
- [ ] SSL certificate issued

### Post-Deployment

- [ ] Application accessible via URL
- [ ] Database connectivity verified
- [ ] Email functionality tested
- [ ] Performance monitoring enabled
- [ ] Backup strategy confirmed

## 🎯 Success Metrics

- ✅ **Build Time**: < 5 minutes
- ✅ **Startup Time**: < 30 seconds
- ✅ **Health Check**: 200 OK response
- ✅ **Database**: Connection successful
- ✅ **Email**: Test email sent successfully

---

## 🚀 Quick Deploy

Ready to deploy? Use this one-click deployment:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/yourusername/email-infrastructure)

---

**Need help?** Check the troubleshooting section or open an issue on GitHub.