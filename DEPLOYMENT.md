# 🚀 X-Fleet Deployment Guide

## GitHub Actions CI/CD Setup

This project uses GitHub Actions for automatic deployment to your EC2 server whenever you push to the `main` branch.

### Prerequisites

1. ✅ Server deployed at: `15.206.76.175`
2. ✅ Application running with PM2
3. ✅ PostgreSQL databases configured
4. ✅ nginx reverse proxy configured

### Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

**Go to: Repository Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `EC2_HOST` | `15.206.76.175` | Your EC2 server IP address |
| `EC2_USER` | `ubuntu` | SSH username |
| `EC2_SSH_KEY` | Contents of `zebrank.pem` file | Private SSH key for server access |

### Setting up SSH Key Secret

1. Open `F:\Core Development\X-Fleet\zebrank.pem` in a text editor
2. Copy the **entire contents** including:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   ... (key content) ...
   -----END RSA PRIVATE KEY-----
   ```
3. Paste it into the `EC2_SSH_KEY` secret value field

### One-Time Server Setup

Run this command to initialize git repository on your server:

```bash
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "cd /home/ubuntu/x-fleet && git init && git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git && git fetch && git checkout -b main origin/main"
```

**Replace** `YOUR_USERNAME/YOUR_REPO` with your actual GitHub repository path.

## How CI/CD Works

### Automatic Deployment Flow

When you push to the `main` branch:

1. **📥 Checkout**: GitHub Actions checks out your code
2. **🚀 Deploy to Server**: Connects to your EC2 server via SSH
3. **📥 Pull Changes**: Pulls latest code from GitHub
4. **📦 Install Dependencies**: Runs `npm install --production`
5. **🔧 Generate Prisma**: Generates Prisma clients for all databases
6. **🗄️ Migrate Databases**: Runs Prisma migrations
7. **🔨 Build**: Builds the NestJS application
8. **🔄 Restart**: Restarts the application with PM2
9. **🧪 Health Check**: Verifies the application is running
10. **📢 Status**: Reports deployment success/failure

### Manual Deployment

You can also deploy manually:

```bash
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175
cd /home/ubuntu/x-fleet
git pull origin main
npm install --production
npx prisma generate --schema=prisma/primary.prisma
npx prisma generate --schema=prisma/logs.prisma
npx prisma generate --schema=prisma/address.prisma
npx prisma migrate deploy --schema=prisma/primary.prisma
npx prisma migrate deploy --schema=prisma/logs.prisma
npx prisma migrate deploy --schema=prisma/address.prisma
npm run build
pm2 restart ecosystem.config.js
```

## Monitoring

### Check Application Status

```bash
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "pm2 status"
```

### View Application Logs

```bash
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "pm2 logs"
```

### Check nginx Status

```bash
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "sudo systemctl status nginx"
```

## Troubleshooting

### Deployment Failed

1. Check GitHub Actions logs
2. SSH into server and check PM2 logs: `pm2 logs`
3. Check if all services are running: `pm2 status`
4. Verify nginx: `sudo systemctl status nginx`

### Database Issues

```bash
# Check PostgreSQL status
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "sudo systemctl status postgresql"

# Test database connection
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "PGPASSWORD='Stack@321' psql -U postgres -h localhost -d FleetStack_db -c 'SELECT 1;'"
```

### Port Conflicts

```bash
# Check what's using port 3001
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "sudo lsof -i :3001"

# Restart application
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "pm2 restart x-fleet"
```

## Application URLs

- **Public URL**: http://15.206.76.175
- **Direct Port**: http://15.206.76.175:3001 (proxied through nginx)
- **Health Endpoint**: http://15.206.76.175/health (if available)

## Security Notes

- ⚠️ Never commit `.env` file or `zebrank.pem` to git
- ⚠️ Keep GitHub secrets secure
- ✅ SSH key is gitignored
- ✅ Environment variables are server-side only

## Next Steps

1. Configure GitHub secrets (see above)
2. Set up git remote on server
3. Push to main branch to trigger first deployment
4. Monitor GitHub Actions for deployment status
5. Verify application is accessible at http://15.206.76.175

---

**Questions?** Check GitHub Actions logs or SSH into the server for detailed information.
