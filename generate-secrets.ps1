# Generate Secure Secrets for Render Deployment
# Run this script to generate secure values for your environment variables

Write-Host "🔐 Generating Secure Secrets for Render Deployment" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Generate NEXTAUTH_SECRET
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
$nextAuthSecret = [Convert]::ToBase64String($bytes)

Write-Host "✅ NEXTAUTH_SECRET Generated:" -ForegroundColor Yellow
Write-Host $nextAuthSecret -ForegroundColor White
Write-Host ""

# Display environment variables template
Write-Host "📋 Copy these environment variables to Render:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$envTemplate = @"
NODE_ENV=production
NEXTAUTH_URL=https://email-infrastructure.onrender.com
NEXTAUTH_SECRET=$nextAuthSecret
RESEND_API_KEY=REPLACE_WITH_YOUR_RESEND_API_KEY
FROM_EMAIL=noreply@yourdomain.com
NEXT_TELEMETRY_DISABLED=1
PORT=3000
DATABASE_URL=REPLACE_WITH_INTERNAL_POSTGRESQL_URL_FROM_RENDER
REDIS_URL=REPLACE_WITH_INTERNAL_REDIS_URL_FROM_RENDER
"@

Write-Host $envTemplate -ForegroundColor White
Write-Host ""

# Save to file
$envTemplate | Out-File -FilePath "render-env-vars.txt" -Encoding UTF8

Write-Host "💾 Environment variables saved to: render-env-vars.txt" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 Next Steps:" -ForegroundColor Magenta
Write-Host "1. Go to https://dashboard.render.com" -ForegroundColor White
Write-Host "2. Create a new Web Service" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Copy the environment variables above" -ForegroundColor White
Write-Host "5. Replace RESEND_API_KEY and database URLs with actual values" -ForegroundColor White
Write-Host ""

Write-Host "📖 For detailed instructions, see: WEB_SERVICE_DEPLOYMENT.md" -ForegroundColor Blue