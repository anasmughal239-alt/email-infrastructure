Write-Host "Email Infrastructure Deployment Check" -ForegroundColor Blue
Write-Host "=====================================" -ForegroundColor Blue

$passed = 0
$total = 0

Write-Host "`nChecking directories..." -ForegroundColor Cyan

# Check docker directory
$total++
if (Test-Path "docker") {
    Write-Host "✓ docker" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ docker" -ForegroundColor Red
}

# Check docker/nginx
$total++
if (Test-Path "docker\nginx") {
    Write-Host "✓ docker\nginx" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ docker\nginx" -ForegroundColor Red
}

# Check docker/postgres
$total++
if (Test-Path "docker\postgres") {
    Write-Host "✓ docker\postgres" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ docker\postgres" -ForegroundColor Red
}

# Check docker/redis
$total++
if (Test-Path "docker\redis") {
    Write-Host "✓ docker\redis" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ docker\redis" -ForegroundColor Red
}

# Check prisma
$total++
if (Test-Path "prisma") {
    Write-Host "✓ prisma" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ prisma" -ForegroundColor Red
}

Write-Host "`nChecking files..." -ForegroundColor Cyan

# Check Dockerfile
$total++
if (Test-Path "Dockerfile") {
    Write-Host "✓ Dockerfile" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ Dockerfile" -ForegroundColor Red
}

# Check docker-compose.yml
$total++
if (Test-Path "docker-compose.yml") {
    Write-Host "✓ docker-compose.yml" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ docker-compose.yml" -ForegroundColor Red
}

# Check docker-compose.prod.yml
$total++
if (Test-Path "docker-compose.prod.yml") {
    Write-Host "✓ docker-compose.prod.yml" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ docker-compose.prod.yml" -ForegroundColor Red
}

# Check .env.docker
$total++
if (Test-Path ".env.docker") {
    Write-Host "✓ .env.docker" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ .env.docker" -ForegroundColor Red
}

# Check deploy.ps1
$total++
if (Test-Path "deploy.ps1") {
    Write-Host "✓ deploy.ps1" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ deploy.ps1" -ForegroundColor Red
}

# Check deploy.sh
$total++
if (Test-Path "deploy.sh") {
    Write-Host "✓ deploy.sh" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ deploy.sh" -ForegroundColor Red
}

# Check documentation
$total++
if (Test-Path "DOCKER_DEPLOYMENT.md") {
    Write-Host "✓ DOCKER_DEPLOYMENT.md" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ DOCKER_DEPLOYMENT.md" -ForegroundColor Red
}

$total++
if (Test-Path "INSTALLATION_GUIDE.md") {
    Write-Host "✓ INSTALLATION_GUIDE.md" -ForegroundColor Green
    $passed++
} else {
    Write-Host "✗ INSTALLATION_GUIDE.md" -ForegroundColor Red
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Tests passed: $passed/$total" -ForegroundColor Yellow

if ($passed -eq $total) {
    Write-Host "`n🎉 All deployment files are ready!" -ForegroundColor Green
    Write-Host "You can proceed with Docker deployment." -ForegroundColor Cyan
} else {
    Write-Host "`n⚠ Some files are missing." -ForegroundColor Yellow
    Write-Host "Please check the failed tests above." -ForegroundColor Yellow
}