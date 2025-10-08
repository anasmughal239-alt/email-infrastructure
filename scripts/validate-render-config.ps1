# Render Configuration Validation Script
# This script validates your Render deployment configuration

param(
    [string]$ServiceUrl = "https://email-infrastructure.onrender.com",
    [switch]$Verbose,
    [switch]$SkipHealthCheck
)

Write-Host "[VALIDATION] Render Configuration Validation" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

$validationResults = @()

# Helper function to add validation result
function Add-ValidationResult {
    param($Category, $Test, $Status, $Message, $Details = "")
    
    $result = [PSCustomObject]@{
        Category = $Category
        Test = $Test
        Status = $Status
        Message = $Message
        Details = $Details
        Timestamp = Get-Date
    }
    
    $script:validationResults += $result
    
    $color = switch ($Status) {
        "PASS" { "Green" }
        "FAIL" { "Red" }
        "WARN" { "Yellow" }
        default { "White" }
    }
    
    $icon = switch ($Status) {
        "PASS" { "[PASS]" }
        "FAIL" { "[FAIL]" }
        "WARN" { "[WARN]" }
        default { "[INFO]" }
    }
    
    Write-Host "$icon [$Category] $Test`: $Message" -ForegroundColor $color
    if ($Verbose -and $Details) {
        Write-Host "   Details: $Details" -ForegroundColor Gray
    }
}

# 1. File Structure Validation
Write-Host "`n[FILES] Validating file structure..." -ForegroundColor Cyan

$requiredFiles = @(
    @{ Path = "Dockerfile"; Description = "Docker configuration" },
    @{ Path = "render.yaml"; Description = "Render deployment config" },
    @{ Path = ".env.production"; Description = "Production environment variables" },
    @{ Path = "package.json"; Description = "Node.js dependencies" },
    @{ Path = "prisma/schema.prisma"; Description = "Database schema" },
    @{ Path = "src/app/api/health/route.ts"; Description = "Health check endpoint" }
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file.Path) {
        Add-ValidationResult "Files" $file.Description "PASS" "Found at $($file.Path)"
    } else {
        Add-ValidationResult "Files" $file.Description "FAIL" "Missing: $($file.Path)"
    }
}

# 2. Dockerfile Validation
Write-Host "`n[DOCKER] Validating Dockerfile..." -ForegroundColor Cyan

if (Test-Path "Dockerfile") {
    $dockerContent = Get-Content "Dockerfile" -Raw
    
    # Check for multi-stage build
    if ($dockerContent -match "FROM.*AS builder" -and $dockerContent -match "FROM.*AS runner") {
        Add-ValidationResult "Docker" "Multi-stage build" "PASS" "Multi-stage build detected"
    } else {
        Add-ValidationResult "Docker" "Multi-stage build" "WARN" "Single-stage build detected"
    }
    
    # Check for health check
    if ($dockerContent -match "HEALTHCHECK") {
        Add-ValidationResult "Docker" "Health check" "PASS" "Health check configured"
    } else {
        Add-ValidationResult "Docker" "Health check" "WARN" "No health check in Dockerfile"
    }
    
    # Check for non-root user
    if ($dockerContent -match "USER.*nextjs" -or $dockerContent -match "adduser") {
        Add-ValidationResult "Docker" "Security" "PASS" "Non-root user configured"
    } else {
        Add-ValidationResult "Docker" "Security" "WARN" "Running as root user"
    }
    
    # Check for port exposure
    if ($dockerContent -match "EXPOSE.*3000") {
        Add-ValidationResult "Docker" "Port configuration" "PASS" "Port 3000 exposed"
    } else {
        Add-ValidationResult "Docker" "Port configuration" "FAIL" "Port 3000 not exposed"
    }
}

# 3. render.yaml Validation
Write-Host "`n[RENDER] Validating render.yaml..." -ForegroundColor Cyan

if (Test-Path "render.yaml") {
    try {
        # Read and parse YAML (basic validation)
        $renderContent = Get-Content "render.yaml" -Raw
        
        # Check for required services
        if ($renderContent -match "type: pserv") {
            Add-ValidationResult "Render" "PostgreSQL service" "PASS" "Database service configured"
        } else {
            Add-ValidationResult "Render" "PostgreSQL service" "FAIL" "No PostgreSQL service found"
        }
        
        if ($renderContent -match "type: web") {
            Add-ValidationResult "Render" "Web service" "PASS" "Web service configured"
        } else {
            Add-ValidationResult "Render" "Web service" "FAIL" "No web service found"
        }
        
        # Check for Docker environment
        if ($renderContent -match "env: docker") {
            Add-ValidationResult "Render" "Docker environment" "PASS" "Docker environment configured"
        } else {
            Add-ValidationResult "Render" "Docker environment" "WARN" "Node environment detected (consider Docker)"
        }
        
        # Check for health check path
        if ($renderContent -match "healthCheckPath: /api/health") {
            Add-ValidationResult "Render" "Health check path" "PASS" "Health check path configured"
        } else {
            Add-ValidationResult "Render" "Health check path" "WARN" "Health check path not configured"
        }
        
        # Check for auto-deploy
        if ($renderContent -match "autoDeploy: true") {
            Add-ValidationResult "Render" "Auto-deploy" "PASS" "Auto-deploy enabled"
        } else {
            Add-ValidationResult "Render" "Auto-deploy" "WARN" "Auto-deploy not enabled"
        }
        
    } catch {
        Add-ValidationResult "Render" "YAML parsing" "FAIL" "Invalid YAML syntax" $_.Exception.Message
    }
}

# 4. Environment Variables Validation
Write-Host "`n[ENV] Validating environment variables..." -ForegroundColor Cyan

if (Test-Path ".env.production") {
    $envContent = Get-Content ".env.production"
    
    $requiredEnvVars = @(
        @{ Name = "NODE_ENV"; Pattern = "NODE_ENV=production" },
        @{ Name = "NEXTAUTH_URL"; Pattern = "NEXTAUTH_URL=https://" },
        @{ Name = "RESEND_API_KEY"; Pattern = "RESEND_API_KEY=re_" },
        @{ Name = "FROM_EMAIL"; Pattern = "FROM_EMAIL=.*@" }
    )
    
    foreach ($envVar in $requiredEnvVars) {
        $found = $envContent | Where-Object { $_ -match $envVar.Pattern }
        if ($found) {
            Add-ValidationResult "Environment" $envVar.Name "PASS" "Configured correctly"
        } else {
            $basic = $envContent | Where-Object { $_ -match "^$($envVar.Name)=" }
            if ($basic) {
                Add-ValidationResult "Environment" $envVar.Name "WARN" "Configured but may need review"
            } else {
                Add-ValidationResult "Environment" $envVar.Name "FAIL" "Not configured"
            }
        }
    }
    
    # Check for sensitive data exposure
    $sensitivePatterns = @(
        @{ Name = "Hardcoded passwords"; Pattern = "password=\w+" },
        @{ Name = "API keys in comments"; Pattern = "#.*api.*key" },
        @{ Name = "Localhost URLs"; Pattern = "localhost|127\.0\.0\.1" }
    )
    
    foreach ($pattern in $sensitivePatterns) {
        $found = $envContent | Where-Object { $_ -match $pattern.Pattern }
        if ($found) {
            Add-ValidationResult "Security" $pattern.Name "WARN" "Potential security issue detected"
        }
    }
}

# 5. Package.json Validation
Write-Host "`n[PACKAGE] Validating package.json..." -ForegroundColor Cyan

if (Test-Path "package.json") {
    try {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        
        # Check for required scripts
        $requiredScripts = @("build", "start", "dev")
        foreach ($script in $requiredScripts) {
            if ($packageJson.scripts.$script) {
                Add-ValidationResult "Package" "Script: $script" "PASS" "Script configured"
            } else {
                Add-ValidationResult "Package" "Script: $script" "FAIL" "Missing script"
            }
        }
        
        # Check for required dependencies
        $requiredDeps = @("next", "react", "prisma", "@prisma/client")
        foreach ($dep in $requiredDeps) {
            if ($packageJson.dependencies.$dep -or $packageJson.devDependencies.$dep) {
                Add-ValidationResult "Package" "Dependency: $dep" "PASS" "Dependency found"
            } else {
                Add-ValidationResult "Package" "Dependency: $dep" "WARN" "Dependency not found"
            }
        }
        
        # Check Node.js version
        if ($packageJson.engines.node) {
            Add-ValidationResult "Package" "Node.js version" "PASS" "Version specified: $($packageJson.engines.node)"
        } else {
            Add-ValidationResult "Package" "Node.js version" "WARN" "No Node.js version specified"
        }
        
    } catch {
        Add-ValidationResult "Package" "JSON parsing" "FAIL" "Invalid JSON syntax" $_.Exception.Message
    }
}

# 6. Health Check Endpoint Validation
Write-Host "`n[HEALTH] Validating health check endpoint..." -ForegroundColor Cyan

$healthCheckPath = "src/app/api/health/route.ts"
if (Test-Path $healthCheckPath) {
    $healthContent = Get-Content $healthCheckPath -Raw
    
    # Check for database connection test
    if ($healthContent -match "db\.\`$queryRaw" -or $healthContent -match "database.*connect") {
        Add-ValidationResult "Health" "Database check" "PASS" "Database connectivity test included"
    } else {
        Add-ValidationResult "Health" "Database check" "WARN" "No database connectivity test"
    }
    
    # Check for proper error handling
    if ($healthContent -match "try.*catch" -and $healthContent -match "status.*503") {
        Add-ValidationResult "Health" "Error handling" "PASS" "Proper error handling implemented"
    } else {
        Add-ValidationResult "Health" "Error handling" "WARN" "Error handling may be incomplete"
    }
    
    # Check for response format
    if ($healthContent -match "status.*healthy" -and $healthContent -match "timestamp") {
        Add-ValidationResult "Health" "Response format" "PASS" "Standard response format"
    } else {
        Add-ValidationResult "Health" "Response format" "WARN" "Non-standard response format"
    }
}

# 7. Live Service Validation (if not skipped)
if (!$SkipHealthCheck -and $ServiceUrl) {
    Write-Host "`n[LIVE] Validating live service..." -ForegroundColor Cyan
    
    try {
        # Test main endpoint
        $response = Invoke-WebRequest -Uri $ServiceUrl -Method Get -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Add-ValidationResult "Live" "Main endpoint" "PASS" "Service is accessible"
        } else {
            Add-ValidationResult "Live" "Main endpoint" "WARN" "Unexpected status: $($response.StatusCode)"
        }
    } catch {
        Add-ValidationResult "Live" "Main endpoint" "FAIL" "Service not accessible" $_.Exception.Message
    }
    
    try {
        # Test health endpoint
        $healthUrl = "$ServiceUrl/api/health"
        $healthResponse = Invoke-RestMethod -Uri $healthUrl -Method Get -TimeoutSec 10
        
        if ($healthResponse.status -eq "healthy") {
            Add-ValidationResult "Live" "Health endpoint" "PASS" "Health check passing"
        } else {
            Add-ValidationResult "Live" "Health endpoint" "WARN" "Health check not healthy: $($healthResponse.status)"
        }
        
        # Check response structure
        if ($healthResponse.database -and $healthResponse.timestamp) {
            Add-ValidationResult "Live" "Health response" "PASS" "Complete health response"
        } else {
            Add-ValidationResult "Live" "Health response" "WARN" "Incomplete health response"
        }
        
    } catch {
        Add-ValidationResult "Live" "Health endpoint" "FAIL" "Health endpoint not accessible" $_.Exception.Message
    }
}

# 8. Generate Summary Report
Write-Host "`n[SUMMARY] Validation Summary" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green

$summary = $validationResults | Group-Object Status | ForEach-Object {
    [PSCustomObject]@{
        Status = $_.Name
        Count = $_.Count
        Percentage = [math]::Round(($_.Count / $validationResults.Count) * 100, 1)
    }
}

foreach ($status in $summary) {
    $color = switch ($status.Status) {
        "PASS" { "Green" }
        "FAIL" { "Red" }
        "WARN" { "Yellow" }
        default { "White" }
    }
    Write-Host "$($status.Status): $($status.Count) tests ($($status.Percentage)%)" -ForegroundColor $color
}

# Show failed tests
$failedTests = $validationResults | Where-Object { $_.Status -eq "FAIL" }
if ($failedTests) {
    Write-Host "`n[FAILED] Failed Tests:" -ForegroundColor Red
    foreach ($test in $failedTests) {
        Write-Host "  - [$($test.Category)] $($test.Test): $($test.Message)" -ForegroundColor Red
    }
}

# Show warnings
$warnings = $validationResults | Where-Object { $_.Status -eq "WARN" }
if ($warnings) {
    Write-Host "`n[WARNINGS] Warnings:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  - [$($warning.Category)] $($warning.Test): $($warning.Message)" -ForegroundColor Yellow
    }
}

# Overall status
$overallStatus = if ($failedTests) { "FAIL" } elseif ($warnings) { "WARN" } else { "PASS" }
$overallColor = switch ($overallStatus) {
    "PASS" { "Green" }
    "FAIL" { "Red" }
    "WARN" { "Yellow" }
}

Write-Host "`n[STATUS] Overall Status: $overallStatus" -ForegroundColor $overallColor

if ($overallStatus -eq "PASS") {
    Write-Host "[SUCCESS] Your Render configuration is ready for deployment!" -ForegroundColor Green
} elseif ($overallStatus -eq "WARN") {
    Write-Host "[WARNING] Your configuration has some warnings but should work." -ForegroundColor Yellow
} else {
    Write-Host "[ERROR] Please fix the failed tests before deploying." -ForegroundColor Red
}

# Export detailed report
$reportPath = "render-validation-report.json"
$validationResults | ConvertTo-Json -Depth 3 | Out-File $reportPath
Write-Host "`n[REPORT] Detailed report saved to: $reportPath" -ForegroundColor Blue

Write-Host "`n[NEXT] Next Steps:" -ForegroundColor Cyan
if ($overallStatus -ne "FAIL") {
    Write-Host "  1. Run: .\scripts\deploy-render.ps1" -ForegroundColor White
    Write-Host "  2. Monitor deployment at: https://dashboard.render.com" -ForegroundColor White
    Write-Host "  3. Test your application at: $ServiceUrl" -ForegroundColor White
} else {
    Write-Host "  1. Fix the failed validation tests" -ForegroundColor White
    Write-Host "  2. Re-run this validation script" -ForegroundColor White
    Write-Host "  3. Deploy when all tests pass" -ForegroundColor White
}