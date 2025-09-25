#!/bin/bash

# X-Fleet Server Setup Script
# Run this script on your EC2 Ubuntu server for first-time setup

set -e

echo "🚀 X-Fleet Server Setup Starting..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root. Please run as ubuntu user."
   exit 1
fi

print_header "Updating system packages..."
sudo apt update && sudo apt upgrade -y

print_header "Installing essential packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

print_header "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    
    # Install Docker using official script
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    
    # Add user to docker group
    sudo usermod -aG docker $USER
    
    # Start and enable Docker
    sudo systemctl start docker
    sudo systemctl enable docker
    
    print_status "Docker installed successfully!"
    rm get-docker.sh
else
    print_status "Docker already installed"
fi

print_header "Checking Docker Compose installation..."
if ! docker compose version &> /dev/null; then
    print_status "Installing Docker Compose..."
    sudo apt-get update
    sudo apt-get install -y docker-compose-plugin
    print_status "Docker Compose installed successfully!"
else
    print_status "Docker Compose already installed"
fi

print_header "Setting up firewall..."
# Configure UFW firewall
sudo ufw --force reset

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow application port
sudo ufw allow 3001/tcp

# Allow PostgreSQL (for external access if needed)
sudo ufw allow 5432/tcp

# Enable firewall
sudo ufw --force enable

print_status "Firewall configured successfully!"

print_header "Creating application directories..."
# Create deployment directory
mkdir -p ~/x-fleet-deployment
mkdir -p ~/x-fleet-deployment/logs
mkdir -p ~/x-fleet-deployment/backups

# Set proper permissions
chmod 755 ~/x-fleet-deployment
chmod 755 ~/x-fleet-deployment/logs
chmod 755 ~/x-fleet-deployment/backups

print_header "Setting up log rotation..."
# Create log rotation configuration
sudo tee /etc/logrotate.d/x-fleet > /dev/null << 'EOF'
/home/ubuntu/x-fleet-deployment/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0644 ubuntu ubuntu
}
EOF

print_header "Installing system monitoring tools..."
sudo apt install -y htop iotop ncdu

print_header "Setting up Docker daemon configuration..."
# Optimize Docker daemon settings
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
EOF

# Restart Docker to apply settings
sudo systemctl restart docker

print_header "Setting up system limits..."
# Increase system limits for better performance
sudo tee -a /etc/security/limits.conf > /dev/null << 'EOF'
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536
EOF

print_header "Creating useful aliases..."
# Add useful aliases
tee -a ~/.bashrc > /dev/null << 'EOF'

# X-Fleet aliases
alias x-logs='docker logs -f x-fleet-app'
alias x-db-logs='docker logs -f x-fleet-postgres'
alias x-status='docker ps | grep x-fleet'
alias x-stats='docker stats x-fleet-app x-fleet-postgres'
alias x-restart='cd ~/x-fleet-deployment && ./deploy.sh'
alias x-backup='cd ~/x-fleet-deployment && ./backup.sh'
alias x-health='curl -s http://localhost:3001 || echo "App not responding"'
alias x-db-health='docker exec x-fleet-postgres pg_isready -U postgres'
EOF

print_header "Creating backup script..."
# Create backup script
tee ~/x-fleet-deployment/backup.sh > /dev/null << 'EOF'
#!/bin/bash

# X-Fleet Backup Script
set -e

BACKUP_DIR="$HOME/x-fleet-deployment/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="x-fleet-backup-$DATE.tar.gz"

echo "🔄 Creating backup..."

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Backup database
echo "📦 Backing up database..."
docker exec x-fleet-postgres pg_dumpall -U postgres > $BACKUP_DIR/db-backup-$DATE.sql

# Backup application data and configs
echo "📦 Backing up application files..."
cd $HOME/x-fleet-deployment
tar -czf $BACKUP_DIR/$BACKUP_FILE \
    --exclude='logs' \
    --exclude='backups' \
    .env docker-compose.prod.yml init-db.sql deploy.sh

echo "✅ Backup completed: $BACKUP_DIR/$BACKUP_FILE"

# Keep only last 7 backups
echo "🧹 Cleaning old backups..."
cd $BACKUP_DIR
ls -t x-fleet-backup-*.tar.gz | tail -n +8 | xargs -r rm
ls -t db-backup-*.sql | tail -n +8 | xargs -r rm

echo "✅ Backup process completed!"
EOF

chmod +x ~/x-fleet-deployment/backup.sh

print_header "Setting up crontab for automatic backups..."
# Add backup cron job (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * $HOME/x-fleet-deployment/backup.sh >> $HOME/x-fleet-deployment/logs/backup.log 2>&1") | crontab -

print_header "Creating health check script..."
# Create health check script
tee ~/x-fleet-deployment/health-check.sh > /dev/null << 'EOF'
#!/bin/bash

# X-Fleet Health Check Script
set -e

echo "🏥 X-Fleet Health Check - $(date)"
echo "=================================="

# Check if containers are running
if docker ps | grep -q x-fleet-app; then
    echo "✅ Application container is running"
else
    echo "❌ Application container is NOT running"
    exit 1
fi

if docker ps | grep -q x-fleet-postgres; then
    echo "✅ Database container is running"
else
    echo "❌ Database container is NOT running"
    exit 1
fi

# Check application health
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Application is responding"
else
    echo "❌ Application is NOT responding"
    exit 1
fi

# Check database health
if docker exec x-fleet-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ Database is ready"
else
    echo "❌ Database is NOT ready"
    exit 1
fi

echo "✅ All health checks passed!"
EOF

chmod +x ~/x-fleet-deployment/health-check.sh

print_header "Setting up system monitoring..."
# Create monitoring script
tee ~/x-fleet-deployment/monitor.sh > /dev/null << 'EOF'
#!/bin/bash

# X-Fleet System Monitor
echo "🖥️ System Status - $(date)"
echo "========================="

echo "💾 Disk Usage:"
df -h / | tail -1

echo ""
echo "🧠 Memory Usage:"
free -h | grep -E "Mem|Swap"

echo ""
echo "⚡ CPU Usage:"
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//'

echo ""
echo "🐳 Docker Status:"
docker system df

echo ""
echo "📊 Container Stats:"
docker stats --no-stream x-fleet-app x-fleet-postgres 2>/dev/null || echo "Containers not running"
EOF

chmod +x ~/x-fleet-deployment/monitor.sh

print_header "Setting up log monitoring..."
# Add log monitoring cron job (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * $HOME/x-fleet-deployment/health-check.sh >> $HOME/x-fleet-deployment/logs/health.log 2>&1") | crontab -

print_header "Creating environment template..."
# Create .env template if not exists
if [ ! -f ~/x-fleet-deployment/.env ]; then
    tee ~/x-fleet-deployment/.env.template > /dev/null << 'EOF'
# Environment Configuration for X-Fleet Backend
NODE_ENV=production
PORT=3001

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Stack@321
POSTGRES_DB=postgres

# Primary Database Configuration (FleetStack_db)
PRIMARY_DB_HOST=x-fleet-postgres
PRIMARY_DB_USER=postgres
PRIMARY_DB_PORT=5432
PRIMARY_DB_PASSWORD=Stack@321
PRIMARY_DB_NAME=FleetStack_db
PRIMARY_DATABASE_URL="postgresql://postgres:Stack@321@x-fleet-postgres:5432/FleetStack_db?schema=public"

# Logs Database Configuration (FleetStack_logs)
LOGS_DB_HOST=x-fleet-postgres
LOGS_DB_USER=postgres
LOGS_DB_PORT=5432
LOGS_DB_PASSWORD=Stack@321
LOGS_DB_NAME=FleetStack_logs
LOGS_DATABASE_URL="postgresql://postgres:Stack@321@x-fleet-postgres:5432/FleetStack_logs?schema=public"

# Address Database Configuration (FleetStack_Address)
ADDRESS_DB_HOST=x-fleet-postgres
ADDRESS_DB_USER=postgres
ADDRESS_DB_PORT=5432
ADDRESS_DB_PASSWORD=Stack@321
ADDRESS_DB_NAME=FleetStack_Address
ADDRESS_DATABASE_URL="postgresql://postgres:Stack@321@x-fleet-postgres:5432/FleetStack_Address?schema=public"

# Default DATABASE_URL for Prisma
DATABASE_URL="postgresql://postgres:Stack@321@x-fleet-postgres:5432/FleetStack_db?schema=public"
EOF
fi

print_header "Final system optimizations..."
# Set kernel parameters for better performance
sudo tee -a /etc/sysctl.conf > /dev/null << 'EOF'

# X-Fleet optimizations
net.core.somaxconn = 65536
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_max_syn_backlog = 65536
vm.swappiness = 10
EOF

# Apply sysctl settings
sudo sysctl -p

print_header "Setting up completion message..."
# Create welcome message
tee ~/.motd > /dev/null << 'EOF'

🚀 X-Fleet Server Ready!

Quick Commands:
  x-status      - Check container status
  x-logs        - View application logs
  x-db-logs     - View database logs
  x-health      - Check application health
  x-restart     - Restart application
  x-backup      - Create backup

Directories:
  ~/x-fleet-deployment/     - Application files
  ~/x-fleet-deployment/logs - Log files
  ~/x-fleet-deployment/backups - Backup files

EOF

# Add motd to bashrc
echo 'cat ~/.motd' >> ~/.bashrc

echo ""
echo "🎉 ================================="
echo "🎉 SERVER SETUP COMPLETED!"
echo "🎉 ================================="
echo ""
print_status "Docker Version: $(docker --version)"
print_status "Docker Compose Version: $(docker compose version)"
print_status "Firewall Status: $(sudo ufw status | grep Status)"
print_status "Application Directory: ~/x-fleet-deployment"
echo ""
print_warning "IMPORTANT: Please logout and login again to apply all changes!"
print_warning "Then run: newgrp docker"
echo ""
print_status "Your server is now ready for X-Fleet deployment!"
print_status "The CI/CD pipeline will handle the rest automatically."
echo ""
print_header "Next steps:"
echo "1. Logout and login again (or run 'newgrp docker')"
echo "2. Test Docker: docker run hello-world"
echo "3. Configure GitHub Secrets as per CICD-SETUP.md"
echo "4. Push to main branch to trigger deployment"
echo ""
print_status "Setup completed at: $(date)"
