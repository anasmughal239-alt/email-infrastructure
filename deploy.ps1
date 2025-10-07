# Email Infrastructure Docker Deployment Script
# This script provides easy commands to manage the Docker-based deployment

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "prod", "stop", "restart", "logs", "status", "clean", "backup", "restore")]
    [string]$Action,
    
    [string]$Service = "",
    [string]$BackupFile = "",
    [switch]$Force
)

# Configuration
$ProjectName = "emailinfra"
$DevComposeFile = "docker-compose.yml"
$ProdComposeFile = "docker-compose.prod.yml"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($message) {
    Write-ColorOutput Green $message
}

function Write-Warning($message) {
    Write-ColorOutput Yellow $message
}

function Write-Error($message) {
    Write-ColorOutput Red $message
}

function Write-Info($message) {
    Write-ColorOutput Cyan $message
}

# Check if Docker is installed and running
function Test-Docker {
    try {
        $null = docker --version
        $null = docker-compose --version
        return $true
    }
    catch {
        Write-Error "Docker or Docker Compose is not installed or not running."
        Write-Info "Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
        return $false
    }
}

# Check if environment file exists
function Test-Environment($envFile) {
    if (-not (Test-Path $envFile)) {
        Write-Warning "Environment file $envFile not found."
        Write-Info "Creating from template..."
        
        if (Test-Path ".env.docker") {
            Copy-Item ".env.docker" $envFile
            Write-Success "Environment file created. Please edit $envFile with your configuration."
            return $false
        } else {
            Write-Error "Template environment file .env.docker not found."
            return $false
        }
    }
    return $true
}

# Start development environment
function Start-Development {
    Write-Info "Starting development environment..."
    
    if (-not (Test-Environment ".env")) {
        return
    }
    
    docker-compose -f $DevComposeFile --env-file .env up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Development environment started successfully!"
        Write-Info "Application will be available at: http://localhost:3000"
        Write-Info "Database will be available at: localhost:5432"
        Write-Info "Redis will be available at: localhost:6379"
        Write-Info ""
        Write-Info "Use 'deploy.ps1 logs' to view logs"
        Write-Info "Use 'deploy.ps1 status' to check service status"
    } else {
        Write-Error "Failed to start development environment."
    }
}

# Start production environment
function Start-Production {
    Write-Info "Starting production environment..."
    
    if (-not (Test-Environment ".env.production")) {
        return
    }
    
    # Build and start production services
    docker-compose -f $ProdComposeFile --env-file .env.production up -d --build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Production environment started successfully!"
        Write-Info "Application will be available at: http://localhost (port 80)"
        Write-Info "HTTPS will be available at: https://localhost (port 443)"
        Write-Info ""
        Write-Info "Use 'deploy.ps1 logs' to view logs"
        Write-Info "Use 'deploy.ps1 status' to check service status"
    } else {
        Write-Error "Failed to start production environment."
    }
}

# Stop services
function Stop-Services {
    Write-Info "Stopping all services..."
    
    docker-compose -f $DevComposeFile down
    docker-compose -f $ProdComposeFile down
    
    if ($Force) {
        Write-Warning "Force stopping and removing all containers..."
        docker stop $(docker ps -q --filter "name=$ProjectName") 2>$null
        docker rm $(docker ps -aq --filter "name=$ProjectName") 2>$null
    }
    
    Write-Success "Services stopped."
}

# Restart services
function Restart-Services {
    Write-Info "Restarting services..."
    Stop-Services
    Start-Sleep -Seconds 3
    
    if (Test-Path ".env.production") {
        Start-Production
    } else {
        Start-Development
    }
}

# Show logs
function Show-Logs {
    if ($Service) {
        Write-Info "Showing logs for service: $Service"
        docker-compose -f $DevComposeFile logs -f $Service
    } else {
        Write-Info "Showing logs for all services..."
        docker-compose -f $DevComposeFile logs -f
    }
}

# Show status
function Show-Status {
    Write-Info "Service Status:"
    docker-compose -f $DevComposeFile ps
    
    Write-Info "`nContainer Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

# Clean up
function Clean-Environment {
    Write-Warning "This will remove all containers, images, and volumes for this project."
    
    if (-not $Force) {
        $confirm = Read-Host "Are you sure? (y/N)"
        if ($confirm -ne "y" -and $confirm -ne "Y") {
            Write-Info "Operation cancelled."
            return
        }
    }
    
    Write-Info "Cleaning up..."
    
    # Stop and remove containers
    docker-compose -f $DevComposeFile down -v --remove-orphans
    docker-compose -f $ProdComposeFile down -v --remove-orphans
    
    # Remove project-specific images
    docker images --filter "reference=*$ProjectName*" -q | ForEach-Object { docker rmi $_ -f }
    
    # Remove unused volumes
    docker volume prune -f
    
    Write-Success "Cleanup completed."
}

# Backup database
function Backup-Database {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupFile = if ($BackupFile) { $BackupFile } else { "backup_$timestamp.sql" }
    
    Write-Info "Creating database backup: $backupFile"
    
    docker exec emailinfra-postgres pg_dump -U emailinfra_user -d emailinfra > $backupFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Database backup created: $backupFile"
    } else {
        Write-Error "Failed to create database backup."
    }
}

# Restore database
function Restore-Database {
    if (-not $BackupFile -or -not (Test-Path $BackupFile)) {
        Write-Error "Backup file not specified or not found: $BackupFile"
        return
    }
    
    Write-Warning "This will restore the database from: $BackupFile"
    Write-Warning "All current data will be lost!"
    
    if (-not $Force) {
        $confirm = Read-Host "Are you sure? (y/N)"
        if ($confirm -ne "y" -and $confirm -ne "Y") {
            Write-Info "Operation cancelled."
            return
        }
    }
    
    Write-Info "Restoring database from: $BackupFile"
    
    Get-Content $BackupFile | docker exec -i emailinfra-postgres psql -U emailinfra_user -d emailinfra
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Database restored successfully."
    } else {
        Write-Error "Failed to restore database."
    }
}

# Main execution
if (-not (Test-Docker)) {
    exit 1
}

switch ($Action) {
    "dev" { Start-Development }
    "prod" { Start-Production }
    "stop" { Stop-Services }
    "restart" { Restart-Services }
    "logs" { Show-Logs }
    "status" { Show-Status }
    "clean" { Clean-Environment }
    "backup" { Backup-Database }
    "restore" { Restore-Database }
    default { 
        Write-Error "Unknown action: $Action"
        Write-Info "Available actions: dev, prod, stop, restart, logs, status, clean, backup, restore"
    }
}