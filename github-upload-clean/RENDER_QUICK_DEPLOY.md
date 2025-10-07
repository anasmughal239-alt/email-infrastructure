# 🚀 Render Quick Deploy Guide

## Files Ready
✅ `email-infrastructure-deployment.zip` on your Desktop

## Step-by-Step Deployment

### 1. Create Render Account
- Go to render.com
- Sign up (free)
- Verify email

### 2. Create GitLab Repository (5 minutes)
- Go to gitlab.com
- Sign up (free)
- Create new project: "email-infrastructure"
- Set to Public
- Don't initialize with README

### 3. Upload Files to GitLab
- Extract your ZIP file
- Upload all files to GitLab repository
- Commit with message: "Initial deployment"

### 4. Deploy on Render
- New + → Web Service
- Connect GitLab repository
- Configure settings:
  ```
  Name: email-infrastructure
  Runtime: Node
  Build: npm install && npm run build
  Start: npm start
  Node: 18
  ```

### 5. Environment Variables
```
NODE_ENV=production
NEXTAUTH_URL=https://email-infrastructure.onrender.com
NEXTAUTH_SECRET=iRBpInJXnPzjW98Wsm/z0jJD6zOMu2SvJEhAzQqc5Xg=
DATABASE_URL=[from Render PostgreSQL]
RESEND_API_KEY=[from resend.com]
```

### 6. Create Database
- New + → PostgreSQL
- Name: email-infrastructure-db
- Plan: Free
- Copy DATABASE_URL to environment variables

### 7. Get Resend API Key
- Go to resend.com
- Sign in
- Create API Key
- Add to environment variables

## 🎉 Deploy!
Your app will be live at: https://email-infrastructure.onrender.com

## Need Help?
- Render builds take 5-10 minutes
- Check deployment logs for errors
- Verify all environment variables are set
- Test database connection first