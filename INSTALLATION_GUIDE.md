# Installation Guide for Docker-Based Email Infrastructure

This guide will help you install all necessary dependencies to run the Email Infrastructure application using Docker.

## 📋 Prerequisites

### System Requirements

- **Windows 10/11** (64-bit) with WSL2 enabled
- **macOS 10.15** or later
- **Linux** (Ubuntu 18.04+, CentOS 7+, or equivalent)
- **4GB RAM** minimum (8GB recommended)
- **20GB free disk space**

## 🐳 Docker Installation

### Windows

#### Option 1: Docker Desktop (Recommended)

1. **Download Docker Desktop**
   - Visit: https://www.docker.com/products/docker-desktop/
   - Download "Docker Desktop for Windows"

2. **Install Docker Desktop**
   - Run the installer as Administrator
   - Follow the installation wizard
   - Enable WSL2 integration when prompted

3. **Enable WSL2 (if not already enabled)**
   ```powershell
   # Run as Administrator
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   
   # Restart your computer
   # Then set WSL2 as default
   wsl --set-default-version 2
   ```

4. **Verify Installation**
   ```powershell
   docker --version
   docker-compose --version
   ```

#### Option 2: Docker Engine (Advanced Users)

1. **Install using Chocolatey**
   ```powershell
   # Install Chocolatey first (if not installed)
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   
   # Install Docker
   choco install docker-desktop
   ```

### macOS

#### Option 1: Docker Desktop (Recommended)

1. **Download Docker Desktop**
   - Visit: https://www.docker.com/products/docker-desktop/
   - Download "Docker Desktop for Mac"

2. **Install Docker Desktop**
   - Open the downloaded `.dmg` file
   - Drag Docker to Applications folder
   - Launch Docker from Applications

3. **Verify Installation**
   ```bash
   docker --version
   docker-compose --version
   ```

#### Option 2: Using Homebrew

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker
brew install --cask docker

# Start Docker Desktop
open /Applications/Docker.app
```

### Linux (Ubuntu/Debian)

1. **Update Package Index**
   ```bash
   sudo apt-get update
   ```

2. **Install Prerequisites**
   ```bash
   sudo apt-get install \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```

3. **Add Docker's Official GPG Key**
   ```bash
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   ```

4. **Set Up Repository**
   ```bash
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

5. **Install Docker Engine**
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

6. **Add User to Docker Group**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

7. **Verify Installation**
   ```bash
   docker --version
   docker compose version
   ```

### Linux (CentOS/RHEL)

1. **Install Prerequisites**
   ```bash
   sudo yum install -y yum-utils
   ```

2. **Add Docker Repository**
   ```bash
   sudo yum-config-manager \
       --add-repo \
       https://download.docker.com/linux/centos/docker-ce.repo
   ```

3. **Install Docker**
   ```bash
   sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

4. **Start Docker Service**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

5. **Add User to Docker Group**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

## 🔧 Post-Installation Setup

### 1. Verify Docker Installation

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version
# OR (older versions)
docker-compose --version

# Test Docker installation
docker run hello-world
```

### 2. Configure Docker (Optional)

#### Increase Memory Allocation (Docker Desktop)

1. Open Docker Desktop
2. Go to Settings → Resources → Advanced
3. Increase Memory to at least 4GB (8GB recommended)
4. Click "Apply & Restart"

#### Configure Docker Daemon (Linux)

Create `/etc/docker/daemon.json`:
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
```

Restart Docker:
```bash
sudo systemctl restart docker
```

## 🚀 Quick Deployment Test

After installing Docker, test the deployment:

### Windows (PowerShell)
```powershell
# Navigate to project directory
cd "C:\path\to\Email Infra"

# Test deployment
.\deploy.ps1 dev
```

### Linux/Mac (Bash)
```bash
# Navigate to project directory
cd /path/to/Email\ Infra

# Make script executable
chmod +x deploy.sh

# Test deployment
./deploy.sh dev
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Docker Desktop Won't Start (Windows)

**Solution:**
```powershell
# Enable Hyper-V
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

# Enable WSL2
wsl --install
```

#### 2. Permission Denied (Linux)

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again, or run:
newgrp docker
```

#### 3. Docker Compose Command Not Found

**For newer Docker versions, use:**
```bash
docker compose  # Instead of docker-compose
```

**For older versions, install separately:**
```bash
# Linux
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Windows (using pip)
pip install docker-compose
```

#### 4. WSL2 Installation Issues (Windows)

**Solution:**
```powershell
# Download and install WSL2 kernel update
# Visit: https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

# Set WSL2 as default
wsl --set-default-version 2
```

#### 5. Port Already in Use

**Solution:**
```bash
# Find process using port 3000
netstat -tulpn | grep :3000

# Kill process (replace PID)
kill -9 <PID>

# Or use Docker to stop all containers
docker stop $(docker ps -q)
```

### System-Specific Issues

#### macOS Apple Silicon (M1/M2)

Ensure you download the Apple Silicon version of Docker Desktop.

#### Windows Home Edition

Docker Desktop requires Windows 10/11 Pro, Enterprise, or Education. For Windows Home:

1. Upgrade to Windows Pro, or
2. Use Docker Toolbox (legacy), or
3. Use WSL2 with Docker Engine

#### Low Disk Space

Docker images can be large. Clean up regularly:
```bash
# Remove unused containers, networks, images
docker system prune -a

# Remove unused volumes
docker volume prune
```

## 📞 Getting Help

### Official Documentation
- **Docker**: https://docs.docker.com/
- **Docker Compose**: https://docs.docker.com/compose/
- **Docker Desktop**: https://docs.docker.com/desktop/

### Community Support
- **Docker Community**: https://forums.docker.com/
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/docker
- **Reddit**: https://www.reddit.com/r/docker/

### Verification Checklist

Before proceeding with deployment, ensure:

- [ ] Docker is installed and running
- [ ] Docker Compose is available
- [ ] User has Docker permissions (Linux)
- [ ] At least 4GB RAM allocated to Docker
- [ ] Ports 3000, 5432, 6379 are available
- [ ] Internet connection for downloading images

## 🎉 Next Steps

Once Docker is installed and verified:

1. **Read the deployment guide**: `DOCKER_DEPLOYMENT.md`
2. **Configure environment**: Copy and edit `.env.docker`
3. **Start deployment**: Run `./deploy.sh dev` or `.\deploy.ps1 dev`
4. **Access application**: Visit http://localhost:3000

---

**Need help?** Check the troubleshooting section or refer to the comprehensive deployment documentation in `DOCKER_DEPLOYMENT.md`.