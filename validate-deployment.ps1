param([switch]$SkipDocker)

Write-Host "Email Infrastructure Deployment Validation" -ForegroundColor Blue
Write-Host "===========================================" -ForegroundColor Blue

$passed = 0
$total = 0

# Check directories
Write-Host "`nChecking directories..." -ForegroundColor Cyan
$dirs = @("docker", "docker\nginx", "docker\postgres", "docker\redis", "prisma")
foreach ($dir in $dirs) {
    $total++
    if (Test-Path $dir) {
        Write-Host "✓ $dir" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "✗ $dir" -ForegroundColor Red
    }
}

# Check files
Write-Host "`nChecking files..." -ForegroundColor Cyan
$files = @("Dockerfile", "docker-compose.yml", "docker-compose.prod.yml", ".env.docker", "next.config.js", "package.json", "prisma\schema.prisma", "deploy.ps1", "deploy.sh", "DOCKER_DEPLOYMENT.md", "INSTALLATION_GUIDE.md")
foreach ($file in $files) {
    $total++
    if (Test-Path $file) {
        Write-Host "✓ $file" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "✗ $file" -ForegroundColor Red
    }
}

# Check Dockerfile content
Write-Host "`nChecking Dockerfile content..." -ForegroundColor Cyan
if (Test-Path "Dockerfile") {
    $dockerContent = Get-Content "Dockerfile" -Raw
    $dockerChecks = @("FROM node", "WORKDIR", "COPY package", "RUN npm", "EXPOSE 3000")
    
    foreach ($check in $dockerChecks) {
        $total++
        if ($dockerContent -like "*$check*") {
            Write-Host "✓ $check found" -ForegroundColor Green
            $passed++
        } else {
            Write-Host "✗ $check missing" -ForegroundColor Red
        }
    }
}

# Check environment template
Write-Host "`nChecking environment template..." -ForegroundColor Cyan
if (Test-Path ".env.docker") {
    $envContent = Get-Content ".env.docker" -Raw
    $envVars = @("DATABASE_URL", "POSTGRES_DB", "NEXTAUTH_URL", "NEXTAUTH_SECRET")
    
    foreach ($var in $envVars) {
        $total++
        if ($envContent -like "*$var=*") {
            Write-Host "✓ $var defined" -ForegroundColor Green
            $passed++
        } else {
            Write-Host "✗ $var missing" -ForegroundColor Red
        }
    }
}

# Check Docker installation
Write-Host "`nChecking Docker installation..." -ForegroundColor Cyan
if ($SkipDocker) {
    Write-Host "⚠ Skipping Docker check" -ForegroundColor Yellow
} else {
    $total++
    $dockerInstalled = $false
    try {
        $dockerVersion = docker --version 2>$null
        if ($dockerVersion) {
            Write-Host "✓ Docker is installed" -ForegroundColor Green
            $passed++
            $dockerInstalled = $true
        }
    } catch {
        Write-Host "✗ Docker not installed" -ForegroundColor Red
    }
    
    if (-not $dockerInstalled) {
        Write-Host "✗ Docker not found" -ForegroundColor Red
    }
}

# Summary
Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
if ($passed -eq $total) {
    Write-Host "Tests passed: $passed/$total" -ForegroundColor Green
    Write-Host "`n🎉 Deployment is ready!" -ForegroundColor Green
    Write-Host "You can now run: .\deploy.ps1 dev" -ForegroundColor Cyan
} else {
    Write-Host "Tests passed: $passed/$total" -ForegroundColor Yellow
    Write-Host "`n⚠ Some issues need to be resolved." -ForegroundColor Yellow
    Write-Host "Please check the failed tests above." -ForegroundColor Yellow
}