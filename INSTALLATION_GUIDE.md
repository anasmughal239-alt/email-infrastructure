# Installation Guide for Native Email Infrastructure

This guide will help you install all necessary dependencies to run the Email Infrastructure application natively on your host system.

## 📋 Prerequisites

### System Requirements

- **Windows 10/11** (64-bit) with WSL2 enabled
- **macOS 10.15** or later
- **Linux** (Ubuntu 18.04+, CentOS 7+, or equivalent)
- **4GB RAM** minimum (8GB recommended)
- **20GB free disk space**

## 🟢 Node.js Installation

### Windows

#### Option 1: Official Installer (Recommended)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version (recommended)

2. **Install Node.js**
   - Run the installer
   - Follow the installation wizard
   - Ensure "Add to PATH" is checked

3. **Verify Installation**
   ```powershell
   # Open PowerShell and run:
   node --version
   npm --version
   ```

#### Option 2: Package Manager Installation

Using Chocolatey:
```powershell
# Install Node.js
choco install nodejs
```

Using Winget:
```powershell
# Install Node.js
winget install OpenJS.NodeJS
```

### macOS

#### Option 1: Official Installer (Recommended)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the LTS version for macOS

2. **Install Node.js**
   - Open the downloaded `.pkg` file
   - Follow the installation wizard

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

#### Option 2: Homebrew Installation

```bash
# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

### Linux (Ubuntu/Debian)

#### Option 1: NodeSource Repository (Recommended)

```bash
# Update package index
sudo apt-get update

# Install curl if not present
sudo apt-get install -y curl

# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Option 2: Package Manager

```bash
# Install Node.js from default repository
sudo apt-get update
sudo apt-get install -y nodejs npm

# Verify installation
node --version
npm --version
```

### Linux (CentOS/RHEL)

#### Option 1: NodeSource Repository (Recommended)

```bash
# Add NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -

# Install Node.js
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

#### Option 2: Package Manager

```bash
# Install Node.js from EPEL
sudo yum install -y epel-release
sudo yum install -y nodejs npm

# Verify installation
node --version
npm --version
```

## 🔧 Post-Installation Setup

### 1. Verify Node.js Installation

```bash
# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version
npm --version

# Check npx availability
npx --version
```

### 2. Install Global Dependencies (Optional)

```bash
# Install useful global packages
npm install -g pm2          # Process manager for production
npm install -g prisma       # Database toolkit
npm install -g typescript   # TypeScript compiler
```

### 3. Configure npm (Optional)

```bash
# Set npm registry (if needed)
npm config set registry https://registry.npmjs.org/

# Configure npm cache location (optional)
npm config set cache ~/.npm-cache

# View current configuration
npm config list
```

### 4. Database Setup

For production deployment, you'll need PostgreSQL and Redis. You can:

#### Option 1: Use Render.com Services (Recommended)
- PostgreSQL and Redis are configured in `render.yaml`
- No local setup required

#### Option 2: Local Development Setup
```bash
# Install PostgreSQL locally
# Windows: Download from https://www.postgresql.org/download/windows/
# macOS: brew install postgresql
# Linux: sudo apt-get install postgresql postgresql-contrib

# Install Redis locally
# Windows: Download from https://redis.io/download
# macOS: brew install redis
# Linux: sudo apt-get install redis-server
```

## 🚀 Quick Start

After installing Node.js, test the application:

### Windows (PowerShell)
```powershell
# Clone the repository (if not already done)
git clone <repository-url>
cd email-infrastructure

# Install dependencies
npm install

# Copy environment template
Copy-Item .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations (if database is configured)
npx prisma migrate dev

# Start the development server
npm run dev
```

### macOS/Linux (Bash)
```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd email-infrastructure

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations (if database is configured)
npx prisma migrate dev

# Start the development server
npm run dev
```

### Verify Installation
```bash
# Check if the application is running
curl http://localhost:3000/api/health

# View application logs in the terminal where npm run dev is running

# Access the application
# Open browser to: http://localhost:3000
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Node.js Version Issues

**Problem:** Application requires Node.js 18.x or higher

**Solution:**
```bash
# Check current version
node --version

# Update Node.js to latest LTS
# Windows: Download from nodejs.org
# macOS: brew upgrade node
# Linux: Use NodeSource repository (see installation section)
```

#### 2. npm Permission Issues (Linux/macOS)

**Solution:**
```bash
# Option 1: Use a Node version manager (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts

# Option 2: Change npm's default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

#### 3. Package Installation Failures

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

#### 4. Prisma Client Issues

**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (development only)
npx prisma migrate reset

# Push schema changes
npx prisma db push
```

#### 5. Port Already in Use

**Solution:**
```bash
# Find process using port 3000
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000

# Kill process (replace PID)
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

#### 6. Environment Variables Not Loading

**Solution:**
```bash
# Check if .env file exists
ls -la .env*

# Verify environment variables are set
node -e "console.log(process.env.NODE_ENV)"

# Copy from template if missing
cp .env.example .env
```

### System-Specific Issues

#### macOS Apple Silicon (M1/M2)

Some npm packages may need native compilation:
```bash
# Install Xcode command line tools
xcode-select --install

# Use Rosetta if needed for specific packages
arch -x86_64 npm install
```

#### Windows PowerShell Execution Policy

If scripts won't run:
```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy to allow scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Low Disk Space

Node.js projects can accumulate large dependencies:
```bash
# Clean npm cache
npm cache clean --force

# Remove node_modules in all projects
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Clean global packages (if needed)
npm list -g --depth=0
```

## 📞 Getting Help

### Official Documentation
- **Node.js**: https://nodejs.org/docs/
- **npm**: https://docs.npmjs.com/
- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs

### Community Support
- **Node.js Community**: https://nodejs.org/community/
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/node.js
- **Reddit**: https://www.reddit.com/r/node/

### Verification Checklist

Before proceeding with deployment, ensure:

- [ ] Node.js 18.x or higher is installed
- [ ] npm is available and working
- [ ] npx is available for running packages
- [ ] Git is installed for version control
- [ ] Ports 3000 is available for the application
- [ ] Internet connection for downloading packages
- [ ] Environment variables are configured

## 🎉 Next Steps

Once Node.js is installed and verified:

1. **Clone the repository**: `git clone <repository-url>`
2. **Install dependencies**: `npm install`
3. **Configure environment**: Copy and edit `.env.example` to `.env`
4. **Generate Prisma client**: `npx prisma generate`
5. **Start development**: Run `npm run dev`
6. **Access application**: Visit http://localhost:3000

## 🚀 Production Deployment

For production deployment to Render.com:

1. **Configure render.yaml**: Already set up for native Node.js
2. **Set environment variables**: Configure in Render dashboard
3. **Deploy**: Push to GitHub and connect to Render
4. **Monitor**: Check deployment logs and health endpoints

---

**Need help?** Check the troubleshooting section above or refer to the Next.js and Prisma documentation for specific issues.