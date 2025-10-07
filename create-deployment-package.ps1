# Email Infrastructure - Render.com Deployment Package Creator
Write-Host "Creating deployment package for Render.com..." -ForegroundColor Green

# Define the project directory and package name
$projectDir = Get-Location
$packageName = "email-infrastructure-render-deployment.zip"
$tempDir = Join-Path $env:TEMP "email-infra-deploy"

# Remove existing temp directory if it exists
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}

# Create temp directory
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Copying project files..." -ForegroundColor Yellow

# Files and folders to exclude
$excludeItems = @(
    ".git",
    ".next", 
    "node_modules",
    "*.log",
    "*.zip",
    "*.ps1",
    "prisma\dev.db",
    "check-*.js",
    "clear-test-data.js",
    "fix-user-verification.js"
)

# Get all items and filter out excluded ones
$allItems = Get-ChildItem -Path $projectDir -Recurse
$filteredItems = $allItems | Where-Object {
    $item = $_
    $shouldExclude = $false
    
    foreach ($pattern in $excludeItems) {
        if ($item.Name -like $pattern -or $item.FullName -like "*\$pattern\*" -or $item.FullName -like "*\$pattern") {
            $shouldExclude = $true
            break
        }
    }
    
    return -not $shouldExclude
}

# Copy filtered items to temp directory
foreach ($item in $filteredItems) {
    $relativePath = $item.FullName.Substring($projectDir.FullName.Length + 1)
    $destPath = Join-Path $tempDir $relativePath
    $destDir = Split-Path $destPath -Parent
    
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    
    if (-not $item.PSIsContainer) {
        Copy-Item $item.FullName $destPath -Force
    }
}

Write-Host "Creating ZIP package..." -ForegroundColor Yellow

# Create ZIP file
$zipPath = Join-Path $projectDir $packageName
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -CompressionLevel Optimal

# Clean up temp directory
Remove-Item $tempDir -Recurse -Force

$sizeInMB = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)

Write-Host "SUCCESS: Deployment package created!" -ForegroundColor Green
Write-Host "File: $packageName" -ForegroundColor Cyan
Write-Host "Size: $sizeInMB MB" -ForegroundColor Cyan

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Magenta
Write-Host "1. Go to https://render.com and sign in" -ForegroundColor White
Write-Host "2. Click New + then Web Service" -ForegroundColor White  
Write-Host "3. Choose Deploy without Git repository" -ForegroundColor White
Write-Host "4. Upload the ZIP file: $packageName" -ForegroundColor White
Write-Host "5. Configure your service settings" -ForegroundColor White