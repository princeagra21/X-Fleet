# 🔐 CI/CD Pipeline Setup Guide

This guide will help you set up the GitHub Actions CI/CD pipeline for X-Fleet application.

## 📋 Prerequisites

- GitHub repository with admin access
- Docker Hub account (or other Docker registry)
- AWS EC2 Ubuntu server
- SSH key pair for EC2 access

## 🔑 GitHub Secrets Configuration

Navigate to your GitHub repository → Settings → Secrets and Variables → Actions → New repository secret

Add the following secrets:

### 🐳 Docker Registry Secrets

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `REGISTRY_URL` | Docker registry URL | `docker.io` (for Docker Hub) |
| `REGISTRY_USERNAME` | Docker registry username | `princeagra21` |
| `REGISTRY_PASSWORD` | Docker registry password/token | `your-docker-hub-token` |

**Note**: For Docker Hub, create a Personal Access Token instead of using your password:
1. Go to Docker Hub → Account Settings → Security → Access Tokens
2. Create New Access Token
3. Use this token as `REGISTRY_PASSWORD`

### 🖥️ EC2 Server Secrets

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `EC2_HOST` | EC2 server public IP or domain | `ec2-13-204-91-22.ap-south-1.compute.amazonaws.com` |
| `EC2_USER` | EC2 server username | `ubuntu` |
| `EC2_SSH_KEY` | Private SSH key content | `-----BEGIN RSA PRIVATE KEY-----\n...` |

**For `EC2_SSH_KEY`**: Copy the entire content of your `.pem` file, including the header and footer lines.

## 🏗️ Server-Side Setup (First-time Only)

SSH into your EC2 server and run the following commands:

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Required Packages
```bash
# Install curl and wget (usually pre-installed)
sudo apt install -y curl wget

# Install Docker (automated by CI/CD, but you can do manually)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose Plugin
sudo apt-get install -y docker-compose-plugin

# Logout and login again to apply group changes
exit
```

### 3. Create Application Directory
```bash
# SSH back into server
mkdir -p ~/x-fleet-deployment
cd ~/x-fleet-deployment
```

### 4. Configure Firewall (if needed)
```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp
sudo ufw allow 3001/tcp

# Allow PostgreSQL (if external access needed)
sudo ufw allow 5432/tcp

# Allow SSH (if not already allowed)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw --force enable
```

### 5. Set up Docker Daemon
```bash
# Start Docker daemon
sudo systemctl start docker
sudo systemctl enable docker

# Test Docker installation
docker --version
docker compose version
```

## 🔄 Pipeline Workflow Overview

### 1. **Build Stage** (`build` job)
- Triggers on push to `main` branch and pull requests
- Builds Docker image using multi-stage Dockerfile
- Tags image with:
  - `latest` (for main branch)
  - `main-<git-sha>` (with commit SHA)
- Pushes image to Docker registry
- Tests built image

### 2. **Deploy Stage** (`deploy` job)
- Only runs on push to `main` branch
- Creates deployment configuration files
- Connects to EC2 server via SSH
- Installs Docker/Docker Compose if needed
- Copies deployment files to server
- Executes blue-green deployment with rollback capability

### 3. **Notification Stage** (`notify` job)
- Reports deployment status
- Provides application URLs

## 🚀 Deployment Features

### ✅ **Health Checks**
- Application health check using wget
- PostgreSQL health check using pg_isready
- 30 attempts with 10-second intervals

### 🔄 **Automatic Rollback**
- Creates backup of current container before deployment
- Rolls back to previous version if new deployment fails health checks
- Removes backup container after successful deployment

### 📦 **Blue-Green Deployment**
- Zero-downtime deployment
- Database container remains running during app updates
- Only restarts application container

### 🗄️ **Database Management**
- PostgreSQL in separate container
- Persistent data volumes
- Automatic database creation (FleetStack_db, FleetStack_logs, FleetStack_Address)
- External access on port 5432

## 📁 Generated Files Structure

After first deployment, your server will have:

```
~/x-fleet-deployment/
├── docker-compose.prod.yml    # Production Docker Compose
├── init-db.sql               # Database initialization
├── deploy.sh                 # Deployment script
├── .env                      # Environment variables
└── logs/                     # Application logs (created automatically)
```

## 🧪 Testing the Pipeline

### 1. **Manual Trigger**
Push to main branch:
```bash
git add .
git commit -m "test: trigger CI/CD pipeline"
git push origin main
```

### 2. **Check GitHub Actions**
- Go to your repo → Actions tab
- Watch the workflow execution
- Check logs for any issues

### 3. **Verify Deployment**
After successful deployment:
```bash
# Check application
curl http://<your-ec2-host>:3001
curl http://<your-ec2-host>:80

# Check database
docker exec x-fleet-postgres pg_isready -U postgres
```

## 🔧 Troubleshooting

### **Common Issues and Solutions**

#### 1. **SSH Connection Failed**
```
Error: Failed to connect to server
```
**Solutions:**
- Verify `EC2_HOST` is correct (IP or domain)
- Check `EC2_USER` is `ubuntu` (for Ubuntu AMI)
- Ensure `EC2_SSH_KEY` contains complete private key
- Verify EC2 security group allows SSH (port 22)

#### 2. **Docker Registry Login Failed**
```
Error: login attempt to registry failed
```
**Solutions:**
- Verify `REGISTRY_USERNAME` and `REGISTRY_PASSWORD`
- For Docker Hub, use Personal Access Token, not password
- Check `REGISTRY_URL` (should be `docker.io` for Docker Hub)

#### 3. **Health Check Failed**
```
Error: Container failed health check
```
**Solutions:**
- Check application logs: `docker logs x-fleet-app`
- Verify database is running: `docker logs x-fleet-postgres`
- Check .env file configuration on server
- Ensure all required ports are open

#### 4. **Permission Denied**
```
Error: permission denied while trying to connect to Docker daemon
```
**Solutions:**
- Add user to docker group: `sudo usermod -aG docker $USER`
- Logout and login again
- Or restart the deployment

### **Debug Commands**

SSH into your server and run:

```bash
# Check running containers
docker ps

# Check container logs
docker logs x-fleet-app
docker logs x-fleet-postgres

# Check container health
docker inspect --format='{{.State.Health}}' x-fleet-app

# Check network connectivity
docker exec x-fleet-app wget --spider http://localhost:3001

# Check database connectivity
docker exec x-fleet-postgres pg_isready -U postgres

# Restart deployment manually
cd ~/x-fleet-deployment
./deploy.sh
```

## 🔄 Environment Variables (.env)

The pipeline automatically creates a `.env` file on the server. You can customize it:

```bash
# SSH into server
cd ~/x-fleet-deployment
nano .env

# Restart containers after changes
docker-compose -f docker-compose.prod.yml restart
```

## 📊 Monitoring

### **Application Monitoring**
```bash
# Application health
curl http://localhost:3001

# Container stats
docker stats x-fleet-app x-fleet-postgres

# Application logs
docker logs -f x-fleet-app
```

### **Database Monitoring**
```bash
# Database health
docker exec x-fleet-postgres pg_isready -U postgres

# Database connection test
docker exec x-fleet-postgres psql -U postgres -c "SELECT version();"

# List databases
docker exec x-fleet-postgres psql -U postgres -c "\l"
```

## 🚀 Advanced Configuration

### **Custom Environment Variables**
Add secrets to GitHub and modify the pipeline:

```yaml
environment:
  - CUSTOM_VAR=${{ secrets.CUSTOM_VAR }}
```

### **Multiple Environments**
Create separate workflows for different environments:
- `deploy-staging.yml` for staging branch
- `deploy-production.yml` for main branch

### **Slack/Discord Notifications**
Add notification steps to the `notify` job:

```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## ✅ Security Best Practices

1. **Use Personal Access Tokens** instead of passwords
2. **Rotate secrets regularly**
3. **Use least privilege principles** for EC2 user
4. **Enable firewall** on EC2 server
5. **Keep Docker images updated**
6. **Monitor deployment logs** for suspicious activity
7. **Use HTTPS** in production (configure reverse proxy)

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub Tokens](https://docs.docker.com/docker-hub/access-tokens/)
- [AWS EC2 Security Groups](https://docs.aws.amazon.com/ec2/latest/userguide/ec2-security-groups.html)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)

---

**Setup Complete!** 🎉

Your CI/CD pipeline is now ready. Every push to the main branch will automatically:
1. Build and test your application
2. Deploy to your EC2 server
3. Perform health checks
4. Rollback if deployment fails

Monitor your deployments in the GitHub Actions tab and check your application at the configured URLs!
