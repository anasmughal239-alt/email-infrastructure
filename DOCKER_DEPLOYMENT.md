# Docker-Based Email Infrastructure Deployment

This document provides comprehensive instructions for deploying the Email Infrastructure application using Docker, completely independent of GitHub or any version control system.

## 🚀 Quick Start

### Prerequisites

1. **Docker & Docker Compose**: Install from [Docker's official website](https://docs.docker.com/get-docker/)
2. **Git** (optional): Only needed if cloning from a repository
3. **PowerShell** (Windows) or **Bash** (Linux/Mac)

### One-Command Deployment

**Windows (PowerShell):**
```powershell
.\deploy.ps1 dev
```

**Linux/Mac (Bash):**
```bash
chmod +x deploy.sh
./deploy.sh dev
```

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Environment Setup](#environment-setup)
- [Development Deployment](#development-deployment)
- [Production Deployment](#production-deployment)
- [Configuration](#configuration)
- [Database Management](#database-management)
- [Monitoring & Logging](#monitoring--logging)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## 🏗️ Architecture Overview

The Docker deployment includes:

### Core Services
- **Next.js Application**: Main web application (Port 3000)
- **PostgreSQL**: Primary database (Port 5432)
- **Redis**: Caching and session storage (Port 6379)

### Production Services
- **Nginx**: Reverse proxy and load balancer (Ports 80/443)
- **Prometheus**: Metrics collection (Port 9090)
- **Grafana**: Monitoring dashboard (Port 3001)

### Network Architecture
```
Internet → Nginx (80/443) → Next.js App (3000)
                          ↓
                    PostgreSQL (5432)
                          ↓
                     Redis (6379)
```

## 🔧 Environment Setup

### 1. Copy Environment Template

The deployment uses `.env.docker` as a template. Environment files are automatically created when you run the deployment scripts.

### 2. Required Environment Variables

#### Database Configuration
```env
# PostgreSQL Database
POSTGRES_DB=emailinfra
POSTGRES_USER=emailinfra_user
POSTGRES_PASSWORD=your_secure_password_here
DATABASE_URL=postgresql://emailinfra_user:your_secure_password_here@postgres:5432/emailinfra
```

#### Authentication
```env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

#### Email Service
```env
# Resend API (Recommended)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Alternative: SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🛠️ Development Deployment

### Using PowerShell (Windows)

```powershell
# Start development environment
.\deploy.ps1 dev

# View logs
.\deploy.ps1 logs

# Check status
.\deploy.ps1 status

# Stop services
.\deploy.ps1 stop
```

### Using Bash (Linux/Mac)

```bash
# Make script executable
chmod +x deploy.sh

# Start development environment
./deploy.sh dev

# View logs
./deploy.sh logs

# Check status
./deploy.sh status

# Stop services
./deploy.sh stop
```

### Development Services

After successful deployment:
- **Application**: http://localhost:3000
- **Database**: localhost:5432
- **Redis**: localhost:6379

## 🚀 Production Deployment

### Environment Setup

1. Create production environment file:
```powershell
# Windows
Copy-Item .env.docker .env.production

# Linux/Mac
cp .env.docker .env.production
```

2. Edit `.env.production` with production values:
```env
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL=postgresql://emailinfra_user:strong_production_password@postgres:5432/emailinfra
```

### SSL Configuration

For HTTPS support, place your SSL certificates in:
```
docker/nginx/ssl/
├── cert.pem
└── key.pem
```

### Deploy Production

```powershell
# Windows
.\deploy.ps1 prod

# Linux/Mac
./deploy.sh prod
```

### Production Services

After successful deployment:
- **Application**: http://localhost (redirects to HTTPS)
- **HTTPS Application**: https://localhost
- **Monitoring**: http://localhost:3001 (Grafana)
- **Metrics**: http://localhost:9090 (Prometheus)

## ⚙️ Configuration

### Docker Compose Files

- `docker-compose.yml`: Development environment
- `docker-compose.prod.yml`: Production environment with monitoring

### Configuration Files

```
docker/
├── nginx/
│   ├── nginx.conf          # Development Nginx config
│   ├── nginx.prod.conf     # Production Nginx config
│   └── ssl/                # SSL certificates (production)
├── postgres/
│   └── init.sql           # Database initialization
├── redis/
│   └── redis.conf         # Redis configuration
├── prometheus/
│   └── prometheus.yml     # Metrics configuration
└── grafana/
    └── provisioning/      # Dashboard configuration
```

### Environment Files

- `.env`: Development environment
- `.env.production`: Production environment
- `.env.docker`: Template file

## 🗄️ Database Management

### Backup Database

```powershell
# Windows - Create backup
.\deploy.ps1 backup

# Windows - Create backup with custom filename
.\deploy.ps1 backup -BackupFile "my_backup.sql"

# Linux/Mac
./deploy.sh backup -f my_backup.sql
```

### Restore Database

```powershell
# Windows
.\deploy.ps1 restore -BackupFile "backup_file.sql"

# Linux/Mac
./deploy.sh restore -f backup_file.sql
```

### Database Migrations

Migrations run automatically when containers start. To run manually:

```bash
# Connect to app container
docker exec -it emailinfra-app sh

# Run Prisma migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### Database Access

```bash
# Connect to PostgreSQL
docker exec -it emailinfra-postgres psql -U emailinfra_user -d emailinfra

# Connect to Redis
docker exec -it emailinfra-redis redis-cli
```

## 📊 Monitoring & Logging

### View Logs

```powershell
# All services
.\deploy.ps1 logs

# Specific service
.\deploy.ps1 logs -Service app
.\deploy.ps1 logs -Service postgres
.\deploy.ps1 logs -Service redis
```

### Service Status

```powershell
.\deploy.ps1 status
```

### Grafana Dashboard

Access monitoring at http://localhost:3001
- Username: `admin`
- Password: `admin` (change on first login)

### Prometheus Metrics

Access metrics at http://localhost:9090

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
netstat -tulpn | grep :3000

# Stop conflicting services
docker stop $(docker ps -q)
```

#### 2. Database Connection Issues
```bash
# Check database logs
docker logs emailinfra-postgres

# Verify database is running
docker exec emailinfra-postgres pg_isready -U emailinfra_user
```

#### 3. Environment Variables Not Loading
```bash
# Verify environment file exists
ls -la .env

# Check container environment
docker exec emailinfra-app env | grep DATABASE_URL
```

#### 4. Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Health Checks

All services include health checks:
```bash
# Check service health
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Reset Everything

```powershell
# Windows - Complete cleanup
.\deploy.ps1 clean -Force

# Linux/Mac
./deploy.sh clean --force
```

## 🚀 Advanced Usage

### Custom Docker Networks

The deployment creates a custom network `emailinfra-network` for service communication.

### Resource Limits

Production deployment includes resource limits:
- **App**: 1GB RAM, 1 CPU
- **Database**: 2GB RAM, 2 CPU
- **Redis**: 512MB RAM, 0.5 CPU

### Scaling Services

```bash
# Scale app service
docker-compose up -d --scale app=3

# Scale with load balancer
docker-compose -f docker-compose.prod.yml up -d --scale app=3
```

### Custom Configurations

#### Override Docker Compose
Create `docker-compose.override.yml`:
```yaml
version: '3.8'
services:
  app:
    ports:
      - "3001:3000"  # Custom port mapping
```

#### Environment Overrides
Create `.env.local`:
```env
# Local development overrides
DEBUG=true
LOG_LEVEL=debug
```

### Development Tools

#### Database Studio
```bash
# Access Prisma Studio
docker exec -it emailinfra-app npx prisma studio
```

#### Redis CLI
```bash
# Access Redis CLI
docker exec -it emailinfra-redis redis-cli
```

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Docker and Docker Compose installed
- [ ] Environment variables configured
- [ ] SSL certificates in place (production)
- [ ] Firewall rules configured
- [ ] Domain DNS configured (production)

### Post-Deployment
- [ ] Application accessible
- [ ] Database connection working
- [ ] Email service configured
- [ ] Authentication working
- [ ] Monitoring dashboard accessible
- [ ] Backup strategy implemented

## 🔒 Security Considerations

### Environment Security
- Use strong passwords for database
- Generate secure NextAuth secret
- Configure OAuth providers properly
- Use environment-specific URLs

### Network Security
- Services communicate via internal Docker network
- Only necessary ports exposed to host
- Nginx handles SSL termination
- Rate limiting configured

### Data Security
- Database data persisted in Docker volumes
- Regular automated backups
- Redis configured with authentication
- Sensitive data encrypted at rest

## 📞 Support

### Logs Location
- Application logs: `docker logs emailinfra-app`
- Database logs: `docker logs emailinfra-postgres`
- Nginx logs: `docker logs emailinfra-nginx`

### Performance Monitoring
- Grafana: http://localhost:3001
- Prometheus: http://localhost:9090
- Application metrics: http://localhost:3000/api/health

### Backup Strategy
- Automated daily backups
- Retention policy: 30 days
- Backup verification included
- Point-in-time recovery available

---

## 🎉 Conclusion

This Docker-based deployment provides a complete, self-contained solution for the Email Infrastructure application. The deployment is:

- **Independent**: No GitHub or version control dependencies
- **Scalable**: Easy to scale services horizontally
- **Monitored**: Built-in monitoring and logging
- **Secure**: Production-ready security configurations
- **Maintainable**: Simple backup and restore procedures

For additional support or customization, refer to the individual configuration files and Docker documentation.