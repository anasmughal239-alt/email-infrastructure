# Automated GitHub Setup Script
param(
    [string]$GitHubUsername = "your-username",
    [string]$GitHubEmail = "your-email@example.com",
    [string]$RepositoryName = "email-infrastructure"
)

Write-Host "Starting Automated GitHub Setup..." -ForegroundColor Green

# Set Git executable path
$GitPath = "C:\Program Files\Git\bin\git.exe"

try {
    # Step 1: Initialize Git repository
    Write-Host "Step 1: Initializing Git repository..." -ForegroundColor Blue
    & $GitPath init
    if ($LASTEXITCODE -ne 0) { throw "Failed to initialize Git repository" }

    # Step 2: Configure Git user
    Write-Host "Step 2: Configuring Git user..." -ForegroundColor Blue
    & $GitPath config user.name $GitHubUsername
    if ($LASTEXITCODE -ne 0) { throw "Failed to set Git username" }
    
    & $GitPath config user.email $GitHubEmail
    if ($LASTEXITCODE -ne 0) { throw "Failed to set Git email" }

    # Step 3: Add all files
    Write-Host "Step 3: Adding all files to Git..." -ForegroundColor Blue
    & $GitPath add .
    if ($LASTEXITCODE -ne 0) { throw "Failed to add files to Git" }

    # Step 4: Create initial commit
    Write-Host "Step 4: Creating initial commit..." -ForegroundColor Blue
    & $GitPath commit -m "Initial commit: Email Infrastructure Application"
    if ($LASTEXITCODE -ne 0) { throw "Failed to create initial commit" }

    # Step 5: Set main branch
    Write-Host "Step 5: Setting main branch..." -ForegroundColor Blue
    & $GitPath branch -M main
    if ($LASTEXITCODE -ne 0) { throw "Failed to set main branch" }

    Write-Host "Git setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub named: $RepositoryName" -ForegroundColor White
    Write-Host "2. Copy the repository URL" -ForegroundColor White
    Write-Host "3. Run: .\push-to-github.ps1 -GitHubRepoUrl 'YOUR_REPO_URL'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick GitHub Repository Creation:" -ForegroundColor Cyan
    Write-Host "Visit: https://github.com/new" -ForegroundColor White
    Write-Host "Repository name: $RepositoryName" -ForegroundColor White
    Write-Host "Make it Public and don't initialize with README" -ForegroundColor White

} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Setup completed! Your code is ready to be pushed to GitHub." -ForegroundColor Green