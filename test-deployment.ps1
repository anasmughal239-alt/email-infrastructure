# Email Infrastructure Deployment Test Script
# This script validates the deployment configuration without requiring Docker

param(
    [switch]$Verbose,
    [switch]$SkipDocker
)

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Test-FileExists {
    param(
        [string]$FilePath,
        [string]$Description
    )
    
    if (Test-Path $FilePath) {
        Write-ColorOutput "✓ $Description exists" "Green"
        return $true
    } else {
        Write-ColorOutput "✗ $Description missing: $FilePath" "Red"
        return $false
    }
}

Write-ColorOutput "Email Infrastructure Deployment Test" "Blue"
Write-ColorOutput "=====================================" "Blue"

# Test Directory Structure
Write-ColorOutput "`n=== Testing Directory Structure ===" "Cyan"
$dirTests = @(
    @{ Path = "docker"; Description = "Docker configuration directory" },
    @{ Path = "docker\nginx"; Description = "Nginx configuration directory" },
    @{ Path = "docker\postgres"; Description = "PostgreSQL configuration directory" },
    @{ Path = "docker\redis"; Description = "Redis configuration directory" },
    @{ Path = "prisma"; Description = "Prisma schema directory" }
)

$dirsPassed = 0
foreach ($dir in $dirTests) {
    if (Test-FileExists $dir.Path $dir.Description) {
        $dirsPassed++
    }
}

# Test Configuration Files
Write-ColorOutput "`n=== Testing Configuration Files ===" "Cyan"
$fileTests = @(
    @{ Path = "Dockerfile"; Description = "Main Dockerfile" },
    @{ Path = "docker-compose.yml"; Description = "Development Docker Compose" },
    @{ Path = "docker-compose.prod.yml"; Description = "Production Docker Compose" },
    @{ Path = ".env.docker"; Description = "Environment template" },
    @{ Path = "next.config.js"; Description = "Next.js configuration" },
    @{ Path = "package.json"; Description = "Package configuration" },
    @{ Path = "prisma\schema.prisma"; Description = "Database schema" }
)

$filesPassed = 0
foreach ($file in $fileTests) {
    if (Test-FileExists $file.Path $file.Description) {
        $filesPassed++
    }
}

# Test Deployment Scripts
Write-ColorOutput "`n=== Testing Deployment Scripts ===" "Cyan"
$scriptTests = @(
    @{ Path = "deploy.ps1"; Description = "PowerShell deployment script" },
    @{ Path = "deploy.sh"; Description = "Bash deployment script" }
)

$scriptsPassed = 0
foreach ($script in $scriptTests) {
    if (Test-FileExists $script.Path $script.Description) {
        $scriptsPassed++
    }
}

# Test Documentation
Write-ColorOutput "`n=== Testing Documentation ===" "Cyan"
$docTests = @(
    @{ Path = "DOCKER_DEPLOYMENT.md"; Description = "Deployment documentation" },
    @{ Path = "INSTALLATION_GUIDE.md"; Description = "Installation guide" }
)

$docsPassed = 0
foreach ($doc in $docTests) {
    if (Test-FileExists $doc.Path $doc.Description) {
        $docsPassed++
    }
}

# Test Dockerfile Content
Write-ColorOutput "`n=== Testing Dockerfile Content ===" "Cyan"
$dockerfilePassed = $false
if (Test-Path "Dockerfile") {
    $dockerfileContent = Get-Content "Dockerfile" -Raw
    $dockerChecks = @("FROM node", "WORKDIR", "COPY package", "RUN npm", "EXPOSE 3000")
    
    $dockerChecksPassed = 0
    foreach ($check in $dockerChecks) {
        if ($dockerfileContent -like "*$check*") {
            Write-ColorOutput "✓ $check found in Dockerfile" "Green"
            $dockerChecksPassed++
        } else {
            Write-ColorOutput "✗ $check missing from Dockerfile" "Red"
        }
    }
    
    if ($dockerChecksPassed -eq $dockerChecks.Count) {
        $dockerfilePassed = $true
    }
} else {
    Write-ColorOutput "✗ Dockerfile not found" "Red"
}

# Test Environment Template
Write-ColorOutput "`n=== Testing Environment Template ===" "Cyan"
$envPassed = $false
if (Test-Path ".env.docker") {
    $envContent = Get-Content ".env.docker" -Raw
    $envVars = @("DATABASE_URL", "POSTGRES_DB", "NEXTAUTH_URL", "NEXTAUTH_SECRET")
    
    $envChecksPassed = 0
    foreach ($var in $envVars) {
        if ($envContent -like "*$var=*") {
            Write-ColorOutput "✓ Environment variable $var defined" "Green"
            $envChecksPassed++
        } else {
            Write-ColorOutput "✗ Environment variable $var missing" "Red"
        }
    }
    
    if ($envChecksPassed -eq $envVars.Count) {
        $envPassed = $true
    }
} else {
    Write-ColorOutput "✗ .env.docker template not found" "Red"
}

# Test Docker Installation (if not skipped)
Write-ColorOutput "`n=== Testing Docker Installation ===" "Cyan"
$dockerInstalled = $false
if ($SkipDocker) {
    Write-ColorOutput "⚠ Skipping Docker installation check" "Yellow"
    $dockerInstalled = $true
} else {
    try {
        $null = docker --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✓ Docker is installed" "Green"
            $dockerInstalled = $true
        } else {
            Write-ColorOutput "✗ Docker not found" "Red"
            Write-ColorOutput "  Please install Docker Desktop from https://www.docker.com/products/docker-desktop/" "Yellow"
        }
    } catch {
        Write-ColorOutput "✗ Docker not installed or not in PATH" "Red"
        Write-ColorOutput "  Please install Docker Desktop from https://www.docker.com/products/docker-desktop/" "Yellow"
    }
}

# Summary
Write-ColorOutput "`n=== DEPLOYMENT READINESS SUMMARY ===" "Cyan"

$totalTests = $dirTests.Count + $fileTests.Count + $scriptTests.Count + $docTests.Count + 3  # +3 for dockerfile, env, docker
$passedTests = $dirsPassed + $filesPassed + $scriptsPassed + $docsPassed

if ($dockerfilePassed) { $passedTests++ }
if ($envPassed) { $passedTests++ }
if ($dockerInstalled) { $passedTests++ }

Write-ColorOutput "Directory Structure: $dirsPassed/$($dirTests.Count)" $(if ($dirsPassed -eq $dirTests.Count) { "Green" } else { "Red" })
Write-ColorOutput "Configuration Files: $filesPassed/$($fileTests.Count)" $(if ($filesPassed -eq $fileTests.Count) { "Green" } else { "Red" })
Write-ColorOutput "Deployment Scripts: $scriptsPassed/$($scriptTests.Count)" $(if ($scriptsPassed -eq $scriptTests.Count) { "Green" } else { "Red" })
Write-ColorOutput "Documentation: $docsPassed/$($docTests.Count)" $(if ($docsPassed -eq $docTests.Count) { "Green" } else { "Red" })
Write-ColorOutput "Dockerfile Content: $(if ($dockerfilePassed) { "✓" } else { "✗" })" $(if ($dockerfilePassed) { "Green" } else { "Red" })
Write-ColorOutput "Environment Template: $(if ($envPassed) { "✓" } else { "✗" })" $(if ($envPassed) { "Green" } else { "Red" })
Write-ColorOutput "Docker Installation: $(if ($dockerInstalled) { "✓" } else { "✗" })" $(if ($dockerInstalled) { "Green" } else { "Red" })

Write-ColorOutput "`nOverall: $passedTests/$totalTests tests passed" $(if ($passedTests -eq $totalTests) { "Green" } else { "Yellow" })

if ($passedTests -eq $totalTests) {
    Write-ColorOutput "`n🎉 Deployment is ready! You can proceed with:" "Green"
    Write-ColorOutput "   .\deploy.ps1 dev    # Start development environment" "Cyan"
    Write-ColorOutput "   .\deploy.ps1 prod   # Start production environment" "Cyan"
} else {
    Write-ColorOutput "`n⚠ Some issues need to be resolved before deployment." "Yellow"
    Write-ColorOutput "   Please check the failed tests above and refer to:" "Yellow"
    Write-ColorOutput "   - INSTALLATION_GUIDE.md for Docker installation" "Cyan"
    Write-ColorOutput "   - DOCKER_DEPLOYMENT.md for deployment instructions" "Cyan"
}