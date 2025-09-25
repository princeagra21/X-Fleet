# 🔐 GitHub Secrets Configuration

This document provides the exact values you need to configure in your GitHub repository secrets.

## 📝 Required GitHub Secrets

Navigate to: **GitHub Repository → Settings → Secrets and Variables → Actions → New Repository Secret**

### 1. Docker Registry Configuration

| Secret Name | Value | Notes |
|-------------|--------|-------|
| `REGISTRY_URL` | `docker.io` | Docker Hub registry URL |
| `REGISTRY_USERNAME` | `princeagra21` | Your Docker Hub username |
| `REGISTRY_PASSWORD` | `[Your Docker Hub Access Token]` | Create this in Docker Hub settings |

**To create Docker Hub Access Token:**
1. Login to Docker Hub
2. Go to Account Settings → Security → Access Tokens
3. Click "New Access Token"
4. Name: `github-actions-x-fleet`
5. Permissions: Read, Write, Delete
6. Copy the generated token and use as `REGISTRY_PASSWORD`

### 2. EC2 Server Configuration

| Secret Name | Value | Notes |
|-------------|--------|-------|
| `EC2_HOST` | `ec2-13-204-91-22.ap-south-1.compute.amazonaws.com` | Your EC2 public DNS/IP |
| `EC2_USER` | `ubuntu` | EC2 instance username |
| `EC2_SSH_KEY` | `[Content of zebrank.pem file]` | Full private key content |

**For `EC2_SSH_KEY`, copy the entire content of your `zebrank.pem` file:**

```
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA... [your private key content] ...
-----END RSA PRIVATE KEY-----
```

⚠️ **Important:** Copy the ENTIRE file content including the header and footer lines.

## 🔍 How to Copy SSH Key Content

### On Windows (PowerShell):
```powershell
Get-Content -Path ".\zebrank.pem" -Raw | Set-Clipboard
```

### On Windows (Command Prompt):
```cmd
type zebrank.pem | clip
```

### On Linux/Mac:
```bash
cat zebrank.pem | pbcopy  # Mac
cat zebrank.pem | xclip -selection clipboard  # Linux
```

## ✅ Verification Checklist

Before pushing to trigger the CI/CD pipeline:

- [ ] All 5 secrets are configured in GitHub
- [ ] Docker Hub access token is valid and has correct permissions
- [ ] EC2 server is accessible via SSH with the provided key
- [ ] EC2 security groups allow inbound traffic on ports: 22, 80, 3001, 5432
- [ ] Server has been set up using `server-setup.sh`

## 🧪 Test Your Secrets

You can test each secret before using the CI/CD pipeline:

### Test Docker Registry Access
```bash
echo "$REGISTRY_PASSWORD" | docker login $REGISTRY_URL -u $REGISTRY_USERNAME --password-stdin
```

### Test SSH Access
```bash
ssh -i zebrank.pem ubuntu@ec2-13-204-91-22.ap-south-1.compute.amazonaws.com "echo 'SSH connection successful'"
```

### Test EC2 Firewall
```bash
# Test HTTP access (should timeout if not configured)
curl -I http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:3001

# Test SSH port
nc -zv ec2-13-204-91-22.ap-south-1.compute.amazonaws.com 22
```

## 🔧 Common Issues and Solutions

### Issue: "Authentication failed" for Docker Hub
**Solution:** Ensure you're using an access token, not your password. Tokens are more secure and recommended.

### Issue: "Permission denied" for SSH
**Solution:** 
- Check the private key format (must include header/footer)
- Ensure the EC2 security group allows SSH (port 22)
- Verify the key corresponds to the EC2 instance

### Issue: "Host key verification failed"
**Solution:** This is normal for first-time connections. The CI/CD pipeline handles this automatically.

### Issue: Pipeline can't connect to Docker daemon
**Solution:** Ensure the `ubuntu` user is in the `docker` group on your EC2 instance:
```bash
sudo usermod -aG docker ubuntu
```

## 🔐 Security Best Practices

1. **Rotate secrets regularly** (every 90 days recommended)
2. **Use least privilege** - only grant necessary permissions
3. **Monitor secret usage** in GitHub Actions logs
4. **Use environment-specific secrets** for different deployment environments
5. **Never commit secrets** to your repository
6. **Enable 2FA** on Docker Hub and GitHub accounts

## 📊 Secret Values Summary

Here's a quick reference for your actual values:

```
REGISTRY_URL=docker.io
REGISTRY_USERNAME=princeagra21
REGISTRY_PASSWORD=[Your Docker Hub Token]
EC2_HOST=ec2-13-204-91-22.ap-south-1.compute.amazonaws.com
EC2_USER=ubuntu
EC2_SSH_KEY=[Content of zebrank.pem]
```

## 🚀 Next Steps

After configuring all secrets:

1. Push any change to the `main` branch
2. Go to GitHub → Actions tab
3. Watch the workflow execution
4. Check deployment success at your application URLs

Your CI/CD pipeline is ready! 🎉
