param(
    [switch]$SkipBuild,
    [switch]$SkipTests,
    [switch]$Force,
    [string]$Environment = "production"
)

Write-Host "Starting Render.com Deployment Process" -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Yellow

$ProjectName = "email-infrastructure"
$GitBranch = "main"
$RenderServiceUrl = "https://email-infrastructure.onrender.com"

Write-Host "`nRunning pre-deployment checks..." -ForegroundColor Cyan

if (!(Test-Path "package.json")) {
    Write-Error "package.json not found. Please run this script from the project root."
    exit 1
}

if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "Node.js is available" -ForegroundColor Green
} else {
    Write-Warning "Node.js not found locally. Render will use its Node.js runtime."
}

$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "You have uncommitted changes:"
    git status --short
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host "Deployment cancelled" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`nValidating environment configuration..." -ForegroundColor Cyan

$envFile = ".env.production"
if (!(Test-Path $envFile)) {
    Write-Error "$envFile not found. Please create it with required environment variables."
    exit 1
}

$envContent = Get-Content $envFile
$requiredVars = @("NODE_ENV", "NEXTAUTH_URL", "RESEND_API_KEY", "FROM_EMAIL")

$missingVars = @()
foreach ($var in $requiredVars) {
    $found = $envContent | Where-Object { $_ -match "^$var=" }
    if ($found) {
        Write-Host "$var is configured" -ForegroundColor Green
    } else {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Error "Missing required environment variables: $($missingVars -join ', ')"
    Write-Host "Please add them to $envFile" -ForegroundColor Yellow
    exit 1
}

if (!$SkipBuild) {
    Write-Host "`nRunning local build validation..." -ForegroundColor Cyan
    
    try {
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        npm ci
        
        Write-Host "Generating Prisma client..." -ForegroundColor Yellow
        npx prisma generate
        
        Write-Host "Building application..." -ForegroundColor Yellow
        npm run build
        
        Write-Host "Local build successful" -ForegroundColor Green
    } catch {
        Write-Error "Local build failed. Please fix build errors before deploying."
        exit 1
    }
}

if (!$SkipTests) {
    Write-Host "`nRunning tests..." -ForegroundColor Cyan
    
    try {
        npm test
        Write-Host "Tests passed" -ForegroundColor Green
    } catch {
        Write-Warning "Tests failed. Consider fixing before deploying."
        if (!$Force) {
            $continue = Read-Host "Continue deployment anyway? (y/N)"
            if ($continue -ne "y" -and $continue -ne "Y") {
                Write-Host "Deployment cancelled" -ForegroundColor Red
                exit 1
            }
        }
    }
}

Write-Host "`nPreparing Git repository..." -ForegroundColor Cyan

$currentBranch = git branch --show-current
if ($currentBranch -ne $GitBranch) {
    Write-Warning "Current branch is '$currentBranch', expected '$GitBranch'"
    $switch = Read-Host "Switch to $GitBranch branch? (y/N)"
    if ($switch -eq "y" -or $switch -eq "Y") {
        git checkout $GitBranch
    }
}

Write-Host "Pushing to remote repository..." -ForegroundColor Yellow
git add .
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin $GitBranch

if ($LASTEXITCODE -eq 0) {
    Write-Host "Code pushed to GitHub" -ForegroundColor Green
} else {
    Write-Warning "Git push failed or no changes to commit"
}

Write-Host "`nMonitoring deployment..." -ForegroundColor Cyan

Write-Host "Render will now:" -ForegroundColor Yellow
Write-Host "  1. Detect the push to $GitBranch branch" -ForegroundColor White
Write-Host "  2. Start native Node.js build process" -ForegroundColor White
Write-Host "  3. Deploy PostgreSQL database" -ForegroundColor White
Write-Host "  4. Deploy web service with health checks" -ForegroundColor White
Write-Host "  5. Run database migrations" -ForegroundColor White
Write-Host "  6. Start the application" -ForegroundColor White

Write-Host "`nWaiting for deployment to complete..." -ForegroundColor Cyan
Write-Host "You can monitor progress at: https://dashboard.render.com" -ForegroundColor Blue

Start-Sleep -Seconds 30

Write-Host "`nWaiting for health checks to pass..." -ForegroundColor Cyan

$maxAttempts = 20
$attempt = 0
do {
    $attempt++
    Write-Host "Attempt $attempt/$maxAttempts - Checking health endpoint..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri "$RenderServiceUrl/api/health" -Method Get -TimeoutSec 10
        if ($response.status -eq "healthy") {
            Write-Host "Deployment successful! Health check passed." -ForegroundColor Green
            break
        }
    } catch {
        Write-Host "Service not ready yet..." -ForegroundColor Gray
        Start-Sleep -Seconds 30
    }
} while ($attempt -lt $maxAttempts)

if ($attempt -ge $maxAttempts) {
    Write-Warning "Health check timeout. Deployment may still be in progress."
    Write-Host "Check the Render dashboard for detailed status." -ForegroundColor Yellow
}

Write-Host "`nDeployment Summary" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green
Write-Host "Application URL: $RenderServiceUrl" -ForegroundColor Blue
Write-Host "Health Check: $RenderServiceUrl/api/health" -ForegroundColor Blue
Write-Host "Dashboard: https://dashboard.render.com" -ForegroundColor Blue

Write-Host "`nTesting key endpoints..." -ForegroundColor Cyan

$endpoints = @(
    @{ Name = "Health Check"; Url = "/api/health" },
    @{ Name = "Home Page"; Url = "/" }
)

foreach ($endpoint in $endpoints) {
    try {
        $fullUrl = "$RenderServiceUrl$($endpoint.Url)"
        $response = Invoke-WebRequest -Uri $fullUrl -Method Get -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "$($endpoint.Name): OK" -ForegroundColor Green
        } else {
            Write-Host "$($endpoint.Name): Status $($response.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "$($endpoint.Name): Failed" -ForegroundColor Red
    }
}

Write-Host "`nDeployment process completed!" -ForegroundColor Green
Write-Host "Visit your application at: $RenderServiceUrl" -ForegroundColor Blue

$openBrowser = Read-Host "`nOpen application in browser? (y/N)"
if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
    Start-Process $RenderServiceUrl
}

Write-Host "`nFor troubleshooting, check:" -ForegroundColor Yellow
Write-Host "- Render dashboard: https://dashboard.render.com" -ForegroundColor White
Write-Host "- Service logs in Render console" -ForegroundColor White
Write-Host "- Health endpoint: $RenderServiceUrl/api/health" -ForegroundColor White