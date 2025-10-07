# Push to GitHub Script
# Run this after creating your GitHub repository

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubRepoUrl
)

Write-Host "🚀 Pushing code to GitHub..." -ForegroundColor Green
Write-Host "Repository URL: $GitHubRepoUrl" -ForegroundColor Cyan

# Set Git executable path
$GitPath = "C:\Program Files\Git\bin\git.exe"

# Function to run Git commands
function Run-GitCommand {
    param([string]$Arguments)
    
    Write-Host "Running: git $Arguments" -ForegroundColor Yellow
    $process = Start-Process -FilePath $GitPath -ArgumentList $Arguments -Wait -PassThru -NoNewWindow -RedirectStandardOutput "git-output.txt" -RedirectStandardError "git-error.txt"
    
    if ($process.ExitCode -eq 0) {
        if (Test-Path "git-output.txt") {
            $output = Get-Content "git-output.txt" -Raw
            if ($output.Trim()) {
                Write-Host $output -ForegroundColor Gray
            }
        }
        return $true
    } else {
        if (Test-Path "git-error.txt") {
            $error = Get-Content "git-error.txt" -Raw
            Write-Host "Error: $error" -ForegroundColor Red
        }
        return $false
    }
}

try {
    # Step 1: Add remote origin
    Write-Host "`n🔗 Step 1: Adding GitHub repository as remote origin..." -ForegroundColor Blue
    if (!(Run-GitCommand "remote add origin $GitHubRepoUrl")) {
        # If remote already exists, try to set the URL
        Write-Host "Remote might already exist, trying to set URL..." -ForegroundColor Yellow
        if (!(Run-GitCommand "remote set-url origin $GitHubRepoUrl")) {
            throw "Failed to set remote origin URL"
        }
    }

    # Step 2: Push to GitHub
    Write-Host "`n📤 Step 2: Pushing code to GitHub..." -ForegroundColor Blue
    if (!(Run-GitCommand "push -u origin main")) {
        throw "Failed to push code to GitHub"
    }

    Write-Host "`n✅ Code successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "`n🎯 Next Steps for Render Deployment:" -ForegroundColor Cyan
    Write-Host "1. Go to https://render.com" -ForegroundColor White
    Write-Host "2. Click 'New +' → 'Web Service'" -ForegroundColor White
    Write-Host "3. Connect your GitHub repository: $GitHubRepoUrl" -ForegroundColor White
    Write-Host "4. Use these settings:" -ForegroundColor White
    Write-Host "   - Build Command: npm install && npm run build" -ForegroundColor Yellow
    Write-Host "   - Start Command: npm start" -ForegroundColor Yellow
    Write-Host "   - Node Version: 18" -ForegroundColor Yellow
    Write-Host "5. Add environment variables from your .env.example file" -ForegroundColor White

} catch {
    Write-Host "`n❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n💡 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "- Make sure you created the GitHub repository" -ForegroundColor White
    Write-Host "- Verify the repository URL is correct" -ForegroundColor White
    Write-Host "- Check your GitHub authentication" -ForegroundColor White
    exit 1
} finally {
    # Clean up temporary files
    if (Test-Path "git-output.txt") { Remove-Item "git-output.txt" }
    if (Test-Path "git-error.txt") { Remove-Item "git-error.txt" }
}

Write-Host "`n🎉 All done! Your Email Infrastructure is ready for deployment!" -ForegroundColor Green