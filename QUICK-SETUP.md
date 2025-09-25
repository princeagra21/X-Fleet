# ⚡ Quick CI/CD Setup Commands

This is a rapid setup guide for experienced developers who want to get the CI/CD pipeline running quickly.

## 🚀 Server Setup (Run on EC2)

SSH into your EC2 server and run:

```bash
# Transfer and run setup script
curl -sSL https://raw.githubusercontent.com/[your-repo]/server-setup.sh | bash

# Or manually:
wget -O setup.sh https://raw.githubusercontent.com/[your-repo]/server-setup.sh
chmod +x setup.sh
./setup.sh

# Then logout/login to apply Docker group changes
exit
ssh -i zebrank.pem ubuntu@ec2-13-204-91-22.ap-south-1.compute.amazonaws.com
newgrp docker
```

## 🔑 GitHub Secrets (Copy-Paste Ready)

Go to: `GitHub Repo → Settings → Secrets and Variables → Actions`

Create these 5 secrets:

```
REGISTRY_URL = docker.io
REGISTRY_USERNAME = princeagra21  
REGISTRY_PASSWORD = [Docker Hub Access Token]
EC2_HOST = ec2-13-204-91-22.ap-south-1.compute.amazonaws.com
EC2_USER = ubuntu
EC2_SSH_KEY = [Content of zebrank.pem file]
```

### Get Docker Hub Token:
```
Docker Hub → Account Settings → Security → Access Tokens → New Access Token
```

### Copy SSH Key Content:
```powershell
# Windows PowerShell
Get-Content -Path ".\zebrank.pem" -Raw | Set-Clipboard

# Linux/Mac  
cat zebrank.pem | pbcopy  # Mac
cat zebrank.pem | xclip -selection clipboard  # Linux
```

## 🧪 Quick Test

```bash
# Test SSH access
ssh -i zebrank.pem ubuntu@ec2-13-204-91-22.ap-south-1.compute.amazonaws.com "docker --version"

# Test Docker Hub login
docker login docker.io -u princeagra21

# Test EC2 ports
curl -I http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:3001
```

## 🎯 Trigger Deployment

```bash
# Commit and push to main branch
git add .
git commit -m "feat: trigger CI/CD pipeline"
git push origin main

# Watch at: GitHub Repo → Actions tab
```

## 🔍 Post-Deployment Check

```bash
# Application URLs
curl http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:3001
curl http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:80

# SSH into server to check containers
ssh -i zebrank.pem ubuntu@ec2-13-204-91-22.ap-south-1.compute.amazonaws.com
docker ps
x-status
x-health
```

## 🆘 Quick Debug

If deployment fails:

```bash
# Check GitHub Actions logs first
# Then SSH and check:

ssh -i zebrank.pem ubuntu@ec2-13-204-91-22.ap-south-1.compute.amazonaws.com

# Container logs
docker logs x-fleet-app
docker logs x-fleet-postgres

# Manual deployment
cd ~/x-fleet-deployment
./deploy.sh

# Health check
./health-check.sh
```

## 📋 File Checklist

Ensure these files exist in your repo:
- [ ] `.github/workflows/deploy.yml` ✅
- [ ] `Dockerfile` ✅  
- [ ] `docker-compose.yml` ✅
- [ ] `.dockerignore` ✅
- [ ] `server-setup.sh` ✅

## ⚡ One-Line Setup

For the truly impatient:

```bash
# 1. Configure GitHub secrets (manual step)
# 2. Run on server:
curl -sSL https://your-repo/server-setup.sh | bash && exit

# 3. Push to main:
git add . && git commit -m "deploy" && git push origin main
```

That's it! Your CI/CD pipeline is ready in under 5 minutes! 🎉

---

**Full documentation available in:**
- `CICD-SETUP.md` - Complete setup guide  
- `secrets-config.md` - Detailed secrets configuration
- `DOCKER.md` - Docker configuration details
