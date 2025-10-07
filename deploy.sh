#!/bin/bash

# Email Infrastructure Docker Deployment Script
# This script provides easy commands to manage the Docker-based deployment

set -e

# Configuration
PROJECT_NAME="emailinfra"
DEV_COMPOSE_FILE="docker-compose.yml"
PROD_COMPOSE_FILE="docker-compose.prod.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed."
        log_info "Please install Docker from https://docs.docker.com/get-docker/"
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed."
        log_info "Please install Docker Compose from https://docs.docker.com/compose/install/"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running."
        log_info "Please start Docker and try again."
        exit 1
    fi
}

# Check if environment file exists
check_environment() {
    local env_file=$1
    
    if [[ ! -f "$env_file" ]]; then
        log_warning "Environment file $env_file not found."
        
        if [[ -f ".env.docker" ]]; then
            log_info "Creating from template..."
            cp .env.docker "$env_file"
            log_success "Environment file created. Please edit $env_file with your configuration."
            return 1
        else
            log_error "Template environment file .env.docker not found."
            return 1
        fi
    fi
    return 0
}

# Start development environment
start_development() {
    log_info "Starting development environment..."
    
    if ! check_environment ".env"; then
        return 1
    fi
    
    docker-compose -f "$DEV_COMPOSE_FILE" --env-file .env up -d
    
    if [[ $? -eq 0 ]]; then
        log_success "Development environment started successfully!"
        log_info "Application will be available at: http://localhost:3000"
        log_info "Database will be available at: localhost:5432"
        log_info "Redis will be available at: localhost:6379"
        echo ""
        log_info "Use './deploy.sh logs' to view logs"
        log_info "Use './deploy.sh status' to check service status"
    else
        log_error "Failed to start development environment."
        return 1
    fi
}

# Start production environment
start_production() {
    log_info "Starting production environment..."
    
    if ! check_environment ".env.production"; then
        return 1
    fi
    
    # Build and start production services
    docker-compose -f "$PROD_COMPOSE_FILE" --env-file .env.production up -d --build
    
    if [[ $? -eq 0 ]]; then
        log_success "Production environment started successfully!"
        log_info "Application will be available at: http://localhost (port 80)"
        log_info "HTTPS will be available at: https://localhost (port 443)"
        echo ""
        log_info "Use './deploy.sh logs' to view logs"
        log_info "Use './deploy.sh status' to check service status"
    else
        log_error "Failed to start production environment."
        return 1
    fi
}

# Stop services
stop_services() {
    log_info "Stopping all services..."
    
    docker-compose -f "$DEV_COMPOSE_FILE" down 2>/dev/null || true
    docker-compose -f "$PROD_COMPOSE_FILE" down 2>/dev/null || true
    
    if [[ "$FORCE" == "true" ]]; then
        log_warning "Force stopping and removing all containers..."
        docker stop $(docker ps -q --filter "name=$PROJECT_NAME") 2>/dev/null || true
        docker rm $(docker ps -aq --filter "name=$PROJECT_NAME") 2>/dev/null || true
    fi
    
    log_success "Services stopped."
}

# Restart services
restart_services() {
    log_info "Restarting services..."
    stop_services
    sleep 3
    
    if [[ -f ".env.production" ]]; then
        start_production
    else
        start_development
    fi
}

# Show logs
show_logs() {
    if [[ -n "$SERVICE" ]]; then
        log_info "Showing logs for service: $SERVICE"
        docker-compose -f "$DEV_COMPOSE_FILE" logs -f "$SERVICE"
    else
        log_info "Showing logs for all services..."
        docker-compose -f "$DEV_COMPOSE_FILE" logs -f
    fi
}

# Show status
show_status() {
    log_info "Service Status:"
    docker-compose -f "$DEV_COMPOSE_FILE" ps
    
    echo ""
    log_info "Container Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

# Clean up
clean_environment() {
    log_warning "This will remove all containers, images, and volumes for this project."
    
    if [[ "$FORCE" != "true" ]]; then
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Operation cancelled."
            return 0
        fi
    fi
    
    log_info "Cleaning up..."
    
    # Stop and remove containers
    docker-compose -f "$DEV_COMPOSE_FILE" down -v --remove-orphans 2>/dev/null || true
    docker-compose -f "$PROD_COMPOSE_FILE" down -v --remove-orphans 2>/dev/null || true
    
    # Remove project-specific images
    docker images --filter "reference=*$PROJECT_NAME*" -q | xargs -r docker rmi -f
    
    # Remove unused volumes
    docker volume prune -f
    
    log_success "Cleanup completed."
}

# Backup database
backup_database() {
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="${BACKUP_FILE:-backup_$timestamp.sql}"
    
    log_info "Creating database backup: $backup_file"
    
    docker exec emailinfra-postgres pg_dump -U emailinfra_user -d emailinfra > "$backup_file"
    
    if [[ $? -eq 0 ]]; then
        log_success "Database backup created: $backup_file"
    else
        log_error "Failed to create database backup."
        return 1
    fi
}

# Restore database
restore_database() {
    if [[ -z "$BACKUP_FILE" ]] || [[ ! -f "$BACKUP_FILE" ]]; then
        log_error "Backup file not specified or not found: $BACKUP_FILE"
        return 1
    fi
    
    log_warning "This will restore the database from: $BACKUP_FILE"
    log_warning "All current data will be lost!"
    
    if [[ "$FORCE" != "true" ]]; then
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Operation cancelled."
            return 0
        fi
    fi
    
    log_info "Restoring database from: $BACKUP_FILE"
    
    cat "$BACKUP_FILE" | docker exec -i emailinfra-postgres psql -U emailinfra_user -d emailinfra
    
    if [[ $? -eq 0 ]]; then
        log_success "Database restored successfully."
    else
        log_error "Failed to restore database."
        return 1
    fi
}

# Show help
show_help() {
    echo "Email Infrastructure Docker Deployment Script"
    echo ""
    echo "Usage: $0 <action> [options]"
    echo ""
    echo "Actions:"
    echo "  dev         Start development environment"
    echo "  prod        Start production environment"
    echo "  stop        Stop all services"
    echo "  restart     Restart services"
    echo "  logs        Show logs (use -s <service> for specific service)"
    echo "  status      Show service status and resource usage"
    echo "  clean       Remove all containers, images, and volumes"
    echo "  backup      Create database backup (use -f <file> to specify filename)"
    echo "  restore     Restore database (use -f <file> to specify backup file)"
    echo "  help        Show this help message"
    echo ""
    echo "Options:"
    echo "  -s <service>    Specify service name for logs"
    echo "  -f <file>       Specify backup file for backup/restore"
    echo "  --force         Force operation without confirmation"
    echo ""
    echo "Examples:"
    echo "  $0 dev                          # Start development environment"
    echo "  $0 logs -s app                  # Show logs for app service"
    echo "  $0 backup -f my_backup.sql     # Create backup with custom filename"
    echo "  $0 clean --force                # Clean without confirmation"
}

# Parse command line arguments
ACTION=""
SERVICE=""
BACKUP_FILE=""
FORCE="false"

while [[ $# -gt 0 ]]; do
    case $1 in
        dev|prod|stop|restart|logs|status|clean|backup|restore|help)
            ACTION="$1"
            shift
            ;;
        -s|--service)
            SERVICE="$2"
            shift 2
            ;;
        -f|--file)
            BACKUP_FILE="$2"
            shift 2
            ;;
        --force)
            FORCE="true"
            shift
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Check if action is provided
if [[ -z "$ACTION" ]]; then
    log_error "No action specified."
    show_help
    exit 1
fi

# Check Docker before proceeding (except for help)
if [[ "$ACTION" != "help" ]]; then
    check_docker
fi

# Execute action
case "$ACTION" in
    "dev")
        start_development
        ;;
    "prod")
        start_production
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        restart_services
        ;;
    "logs")
        show_logs
        ;;
    "status")
        show_status
        ;;
    "clean")
        clean_environment
        ;;
    "backup")
        backup_database
        ;;
    "restore")
        restore_database
        ;;
    "help")
        show_help
        ;;
    *)
        log_error "Unknown action: $ACTION"
        show_help
        exit 1
        ;;
esac