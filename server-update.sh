#!/bin/bash
set -e

echo "🚀 Starting X-Fleet server port update..."

# Navigate to deployment directory
cd ~/x-fleet-deployment || {
    echo "❌ Deployment directory not found. Please run a deployment first."
    exit 1
}

# Check current running containers
echo "📋 Current running containers:"
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Create updated docker-compose file without port 80
echo "📝 Creating updated Docker Compose configuration..."
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
      test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  xfleet:
    driver: bridge

volumes:
  postgres_data:
COMPOSE_EOF

echo "✅ Updated docker-compose.prod.yml created"

# Show the updated compose file content
echo "🔍 Updated Docker Compose file content:"
cat docker-compose.prod.yml
echo "========================="

# Determine which docker compose command to use
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE_CMD="docker-compose"
else
  echo "❌ Neither docker compose nor docker-compose found"
  exit 1
fi

echo "📋 Using: $DOCKER_COMPOSE_CMD"

# Stop the current application container (keep database running)
echo "🛑 Stopping application container..."
docker stop x-fleet-app 2>/dev/null || true

# Remove the application container 
echo "🗑️ Removing old application container..."
docker rm x-fleet-app 2>/dev/null || true

# Recreate and start the application container with new port configuration
echo "🚀 Starting application with updated port configuration..."
$DOCKER_COMPOSE_CMD -f docker-compose.prod.yml up -d x-fleet-app

# Wait a moment for container to start
echo "⏳ Waiting for container to start..."
sleep 15

# Check if application is running
echo "🔍 Checking application status..."
if docker ps | grep -q "x-fleet-app"; then
    echo "✅ Application container is running"
    
    # Show current port mappings
    echo "📋 Current port mappings after update:"
    docker ps --format "table {{.Names}}\t{{.Ports}}" --filter "name=x-fleet"
    
    echo ""
    echo "🎉 Server port update completed successfully!"
    echo "🌍 Application is now accessible only on: http://$(curl -s ifconfig.me 2>/dev/null || echo 'YOUR_EC2_IP'):3001"
    echo "📄 Port 80 has been removed from the application container"
    
    # Test the application endpoint
    echo "🧪 Testing application endpoint..."
    if curl -s -f http://localhost:3001 >/dev/null 2>&1; then
        echo "✅ Application is responding on port 3001"
    else
        echo "⚠️ Application may still be starting up. Please test manually: http://YOUR_EC2_IP:3001"
    fi
else
    echo "❌ Application container failed to start"
    echo "📋 Container logs:"
    docker logs x-fleet-app --tail 20
    exit 1
fi

echo ""
echo "🔧 Cleanup completed. Your application now only uses port 3001!"
