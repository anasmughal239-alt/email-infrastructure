# Generate Render Secrets Script
# This script generates secure secrets for your Render deployment

Write-Host "🔐 Generating Render Deployment Secrets" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Generate NEXTAUTH_SECRET (32+ characters)
function Generate-NextAuthSecret {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    $secret = ""
    for ($i = 0; $i -lt 64; $i++) {
        $secret += $chars[(Get-Random -Maximum $chars.Length)]
    }
    return $secret
}

# Generate database password
function Generate-DatabasePassword {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    $password = ""
    for ($i = 0; $i -lt 32; $i++) {
        $password += $chars[(Get-Random -Maximum $chars.Length)]
    }
    return $password
}

$nextAuthSecret = Generate-NextAuthSecret
$dbPassword = Generate-DatabasePassword

Write-Host "`n📋 Generated Secrets for Render:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Host "`n🔑 NEXTAUTH_SECRET:" -ForegroundColor Yellow
Write-Host $nextAuthSecret -ForegroundColor White

Write-Host "`n🗄️ Database Password (if needed):" -ForegroundColor Yellow
Write-Host $dbPassword -ForegroundColor White

Write-Host "`n📝 Environment Variables Template:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

$template = @"

# Copy these to your Render Web Service Environment Variables:

NODE_ENV=production
NEXTAUTH_SECRET=$nextAuthSecret
NEXT_TELEMETRY_DISABLED=1
SKIP_ENV_VALIDATION=true
DISABLE_ESLINT_PLUGIN=true
PORT=3000
SKIP_TYPE_CHECK=true
PRISMA_GENERATE_DATAPROXY=false

# You'll need to add these manually:
# DATABASE_URL=postgresql://user:password@host:port/database (from Render PostgreSQL)
# REDIS_URL=redis://user:password@host:port (from Render Redis)
# NEXTAUTH_URL=https://your-service-name.onrender.com
# RESEND_API_KEY=re_your_api_key_here
# FROM_EMAIL=noreply@yourdomain.com

"@

Write-Host $template -ForegroundColor Green

# Save to file
$template | Out-File -FilePath "render-env-template.txt" -Encoding UTF8

Write-Host "`n💾 Secrets saved to: render-env-template.txt" -ForegroundColor Blue
Write-Host "`n⚠️  Security Notes:" -ForegroundColor Red
Write-Host "- Keep these secrets secure and private" -ForegroundColor Yellow
Write-Host "- Don't commit them to version control" -ForegroundColor Yellow
Write-Host "- Use Render's environment variable interface" -ForegroundColor Yellow
Write-Host "- Delete this file after use" -ForegroundColor Yellow

Write-Host "`n🚀 Next Steps:" -ForegroundColor Green
Write-Host "1. Go to Render Dashboard" -ForegroundColor White
Write-Host "2. Create PostgreSQL database" -ForegroundColor White
Write-Host "3. Create Redis cache" -ForegroundColor White
Write-Host "4. Create Web Service" -ForegroundColor White
Write-Host "5. Add environment variables from template" -ForegroundColor White
Write-Host "6. Deploy and test" -ForegroundColor White

$openFile = Read-Host "`nOpen template file? (y/N)"
if ($openFile -eq "y" -or $openFile -eq "Y") {
    Start-Process "render-env-template.txt"
}