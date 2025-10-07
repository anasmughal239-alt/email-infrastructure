# 🚀 Email Infrastructure - Render.com Deployment Guide

## ✅ **Package Ready**
Your deployment package has been created: `email-infrastructure-render-deployment.zip` (0.84 MB)

## 📋 **Step-by-Step Deployment**

### **Step 1: Access Render.com**
1. Go to [https://render.com](https://render.com)
2. Sign in to your account (or create one if needed)

### **Step 2: Create New Web Service**
1. Click **"New +"** button in the top right
2. Select **"Web Service"**
3. Choose **"Deploy without Git repository"**
4. Upload your ZIP file: `email-infrastructure-render-deployment.zip`

### **Step 3: Configure Service Settings**
Fill in the following details:

**Basic Settings:**
- **Name:** `email-infrastructure` (or your preferred name)
- **Region:** Choose closest to your users
- **Branch:** `main` (default)
- **Runtime:** `Node`

**Build & Deploy Settings:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Node Version:** `18` (or latest LTS)

### **Step 4: Environment Variables**
Add these environment variables in the Render dashboard:

#### **Required Variables:**
```
NODE_ENV=production
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=your-super-secret-key-here
DATABASE_URL=your-postgresql-database-url
RESEND_API_KEY=your-resend-api-key
```

#### **Optional Variables (for future OAuth):**
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### **Step 5: Database Setup**
1. In Render dashboard, create a **PostgreSQL** database
2. Copy the **External Database URL**
3. Use it as your `DATABASE_URL` environment variable

### **Step 6: Get Resend API Key**
1. Go to [https://resend.com](https://resend.com)
2. Sign up/login and create an API key
3. Add it as `RESEND_API_KEY` environment variable

### **Step 7: Deploy**
1. Click **"Create Web Service"**
2. Wait for the build and deployment to complete
3. Your app will be available at: `https://your-app-name.onrender.com`

## 🔧 **Important Notes**

### **NEXTAUTH_SECRET Generation**
Generate a secure secret key:
```bash
openssl rand -base64 32
```
Or use an online generator: [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

### **Database Migration**
After deployment, your database will automatically migrate using Prisma.

### **Custom Domain (Optional)**
You can add a custom domain in the Render dashboard under "Settings" → "Custom Domains"

## 🧪 **Testing Your Deployment**

1. **Health Check:** Visit `https://your-app-name.onrender.com/api/health`
2. **Registration:** Try creating a test account
3. **Email Sending:** Test the contact form
4. **Dashboard:** Login and check dashboard functionality

## 🔍 **Troubleshooting**

### **Build Failures**
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### **Database Connection Issues**
- Verify `DATABASE_URL` is correct
- Check database is running and accessible
- Ensure IP whitelist includes Render's IPs

### **Email Issues**
- Verify `RESEND_API_KEY` is valid
- Check Resend dashboard for sending limits
- Ensure domain is verified in Resend

## 📞 **Support**
If you encounter issues:
1. Check Render logs in the dashboard
2. Review environment variables
3. Test locally with production environment variables
4. Contact Render support if needed

---

**🎉 Your Email Infrastructure app is ready for production!**