# X-Fleet Server Port Update Script
# This script updates the running Docker containers on EC2 to remove port 80 mapping

Write-Host "🚀 X-Fleet Server Port Update Script" -ForegroundColor Green
Write-Host "This script will update your EC2 server to remove port 80 mapping" -ForegroundColor Yellow
Write-Host ""

# Check if required variables are set
$EC2_HOST = Read-Host "Enter your EC2 Host IP/Domain"
$EC2_USER = Read-Host "Enter your EC2 Username (usually 'ubuntu' or 'ec2-user')"
$SSH_KEY_PATH = Read-Host "Enter path to your SSH private key (.pem file)"

if (-not $EC2_HOST -or -not $EC2_USER -or -not $SSH_KEY_PATH) {
    Write-Host "❌ Missing required information. Please provide EC2 host, username, and SSH key path." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $SSH_KEY_PATH)) {
    Write-Host "❌ SSH key file not found at: $SSH_KEY_PATH" -ForegroundColor Red
    exit 1
}

Write-Host "📝 Configuration:" -ForegroundColor Cyan
Write-Host "  EC2 Host: $EC2_HOST" -ForegroundColor Gray
Write-Host "  Username: $EC2_USER" -ForegroundColor Gray  
Write-Host "  SSH Key: $SSH_KEY_PATH" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Do you want to proceed with updating the server? (y/N)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ Operation cancelled." -ForegroundColor Red
    exit 0
}

# Create the server update script content as a here-string
$serverScript = @"
#!/bin/bash
set -e

echo '🚀 Starting X-Fleet server port update...'

# Navigate to deployment directory
cd ~/x-fleet-deployment || {
    echo '❌ Deployment directory not found. Please run a deployment first.'
    exit 1
}

# Check current running containers
echo '📋 Current running containers:'
docker ps --format 'table {{.Names}}\t{{.Ports}}'

# Create updated docker-compose file without port 80
echo '📝 Creating updated Docker Compose configuration...'
cat > docker-compose.prod.yml << 'COMPOSE_EOF'
services:
  x-fleet-app:
    image: rajpurohit07/x-fleet:latest
    container_name: x-fleet-app
    restart: unless-stopped
    ports:
      - "3001:3001"
    env_file:
      - .env
    depends_on:
      - x-fleet-postgres
    networks:
      - xfleet
    healthcheck:
      test: ["CMD", "sh", "-c", "node --version"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

  x-fleet-postgres:
    image: postgres:15-alpine
    container_name: x-fleet-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init-db.sql
    networks:
      - xfleet
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U `$POSTGRES_USER"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  xfleet:
    driver: bridge

volumes:
  postgres_data:
COMPOSE_EOF

echo '✅ Updated docker-compose.prod.yml created'

# Determine which docker compose command to use
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD='docker compose'
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD='docker-compose'
else
  echo '❌ Neither docker compose nor docker-compose found'
  exit 1
fi

echo "📋 Using: `$DOCKER_COMPOSE_CMD"

# Stop the current application container (keep database running)
echo '🛑 Stopping application container...'
docker stop x-fleet-app 2>/dev/null || true

# Remove the application container 
echo '🗑️ Removing old application container...'
docker rm x-fleet-app 2>/dev/null || true

# Recreate and start the application container with new port configuration
echo '🚀 Starting application with updated port configuration...'
`$DOCKER_COMPOSE_CMD -f docker-compose.prod.yml up -d x-fleet-app

# Wait a moment for container to start
sleep 10

# Check if application is running
echo '🔍 Checking application status...'
if docker ps | grep -q 'x-fleet-app'; then
    echo '✅ Application container is running'
    
    # Show current port mappings
    echo '📋 Current port mappings:'
    docker ps --format 'table {{.Names}}\t{{.Ports}}' --filter 'name=x-fleet'
    
    echo ''
    echo '🎉 Server port update completed successfully!'
    echo "🌍 Application is now accessible only on: http://`$(curl -s ifconfig.me):3001"
    echo '📄 Port 80 has been removed from the application container'
else
    echo '❌ Application container failed to start'
    echo '📋 Container logs:'
    docker logs x-fleet-app --tail 20
    exit 1
fi
"@

# Create temporary script file
$tempScript = "server-update.sh"
$serverScript | Out-File -FilePath $tempScript -Encoding UTF8

Write-Host "📁 Created server update script: $tempScript" -ForegroundColor Green

# Copy script to server and execute
try {
    Write-Host "📤 Copying update script to server..." -ForegroundColor Cyan
    $scpCommand = "scp -i `"$SSH_KEY_PATH`" -o StrictHostKeyChecking=no `"$tempScript`" `"${EC2_USER}@${EC2_HOST}:~/server-update.sh`""
    Invoke-Expression $scpCommand
    
    if ($LASTEXITCODE -ne 0) {
        throw "SCP failed with exit code $LASTEXITCODE"
    }
    
    Write-Host "🔧 Making script executable and running on server..." -ForegroundColor Cyan
    $sshCommand = "ssh -i `"$SSH_KEY_PATH`" -o StrictHostKeyChecking=no `"${EC2_USER}@${EC2_HOST}`" `"chmod +x ~/server-update.sh && ~/server-update.sh`""
    Invoke-Expression $sshCommand
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "" 
        Write-Host "✅ Server port update completed successfully!" -ForegroundColor Green
        Write-Host "🌍 Your application is now accessible only on port 3001" -ForegroundColor Yellow
        Write-Host "🚫 Port 80 is no longer mapped to your application" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Server update script failed with exit code $LASTEXITCODE" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error occurred during server update: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    # Clean up temporary file
    if (Test-Path $tempScript) {
        Remove-Item $tempScript
        Write-Host "🧹 Cleaned up temporary script file" -ForegroundColor Gray
    }
}

Write-Host "" 
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Test your application: http://$EC2_HOST:3001" -ForegroundColor Gray
Write-Host "2. Verify port 80 is no longer accessible" -ForegroundColor Gray
Write-Host "3. Future deployments will automatically use the correct port configuration" -ForegroundColor Gray
