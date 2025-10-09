# 📋 Web Service Deployment Checklist

## Pre-Deployment Setup

- [ ] **Repository Ready**
  - [ ] Code pushed to GitHub: `anasmughal239-alt/email-infrastructure`
  - [ ] Main branch is up to date
  - [ ] All dependencies in package.json

- [ ] **Environment Variables Prepared**
  - [ ] NEXTAUTH_SECRET generated (secure random string)
  - [ ] RESEND_API_KEY obtained
  - [ ] FROM_EMAIL domain configured

## Render Dashboard Setup

### 1. Web Service Creation
- [ ] **Create New Web Service**
  - [ ] Connected to GitHub repository
  - [ ] Branch: `main`
  - [ ] Name: `email-infrastructure`
  - [ ] Environment: `Node`

- [ ] **Build Configuration**
  - [ ] Build Command: `npm ci && npx prisma generate && npm run build`
  - [ ] Start Command: `npm start`
  - [ ] Health Check Path: `/api/health`

### 2. Database Setup
- [ ] **PostgreSQL Service**
  - [ ] Created PostgreSQL service
  - [ ] Name: `email-infra-db`
  - [ ] Same region as web service
  - [ ] Internal Database URL copied

### 3. Redis Setup (Optional)
- [ ] **Redis Service**
  - [ ] Created Redis service
  - [ ] Name: `email-infra-redis`
  - [ ] Same region as web service
  - [ ] Internal Redis URL copied

### 4. Environment Variables
- [ ] **Required Variables Set**
  - [ ] `NODE_ENV=production`
  - [ ] `DATABASE_URL=[from PostgreSQL service]`
  - [ ] `NEXTAUTH_URL=https://email-infrastructure.onrender.com`
  - [ ] `NEXTAUTH_SECRET=[secure random string]`
  - [ ] `RESEND_API_KEY=[your API key]`
  - [ ] `FROM_EMAIL=[your domain email]`
  - [ ] `NEXT_TELEMETRY_DISABLED=1`
  - [ ] `PORT=3000`

- [ ] **Optional Variables**
  - [ ] `REDIS_URL=[from Redis service]`

## Deployment & Testing

### 5. Deploy
- [ ] **Initial Deployment**
  - [ ] Click "Create Web Service"
  - [ ] Monitor build logs
  - [ ] Wait for successful deployment

### 6. Verification
- [ ] **Basic Functionality**
  - [ ] App loads: `https://email-infrastructure.onrender.com`
  - [ ] Health check works: `/api/health`
  - [ ] Database connection successful
  - [ ] Redis connection working (if configured)

- [ ] **Feature Testing**
  - [ ] User registration works
  - [ ] Email verification sends
  - [ ] Login functionality
  - [ ] Dashboard accessible
  - [ ] Admin panel works

## Post-Deployment

### 7. Monitoring Setup
- [ ] **Configure Alerts**
  - [ ] Uptime monitoring
  - [ ] Error notifications
  - [ ] Performance alerts

### 8. Security Review
- [ ] **Security Checklist**
  - [ ] All secrets properly set
  - [ ] CORS configuration correct
  - [ ] Authentication working
  - [ ] HTTPS enforced

### 9. Documentation
- [ ] **Update Documentation**
  - [ ] Deployment URL documented
  - [ ] Environment variables documented
  - [ ] Troubleshooting guide updated

## 🎯 Success Criteria

✅ **Deployment Complete When:**
- Web service is running and accessible
- Database migrations completed
- All core features working
- Health checks passing
- No critical errors in logs

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Application Logs**: Available in Render dashboard
- **Health Endpoint**: `/api/health`
- **Deployment Guide**: `WEB_SERVICE_DEPLOYMENT.md`

---

**Deployment URL**: https://email-infrastructure.onrender.com
**Status**: 🔄 In Progress / ✅ Complete