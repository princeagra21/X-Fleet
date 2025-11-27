# 🔐 GitHub Secrets Setup Guide

## Quick Setup (5 minutes)

Follow these steps to enable automatic deployment:

### Step 1: Open Your GitHub Repository

Go to: https://github.com/princeagra21/X-Fleet

### Step 2: Navigate to Secrets Settings

1. Click on **Settings** (top right)
2. In the left sidebar, click **Secrets and variables** → **Actions**
3. Click **New repository secret** button

### Step 3: Add Required Secrets

Add these **3 secrets** one by one:

---

#### Secret 1: EC2_HOST

- **Name**: `EC2_HOST`
- **Value**: `15.206.76.175`
- Click **Add secret**

---

#### Secret 2: EC2_USER

- **Name**: `EC2_USER`
- **Value**: `ubuntu`
- Click **Add secret**

---

#### Secret 3: EC2_SSH_KEY

- **Name**: `EC2_SSH_KEY`
- **Value**: (Follow steps below)

**How to get the SSH key:**

1. Open this file in Notepad: `F:\Core Development\X-Fleet\zebrank.pem`
2. Copy **EVERYTHING** from the file (including the BEGIN and END lines)
3. The key should look like:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   MIIEpAIBAAKCAQEA...
   (many lines of random characters)
   ...
   -----END RSA PRIVATE KEY-----
   ```
4. Paste the entire content into the **Value** field
5. Click **Add secret**

---

### Step 4: Verify Secrets

After adding all 3 secrets, you should see:

- ✅ EC2_HOST
- ✅ EC2_USER  
- ✅ EC2_SSH_KEY

### Step 5: Test Deployment

1. Make any small change to your code (e.g., update README.md)
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Test CI/CD deployment"
   git push origin main
   ```
3. Go to **Actions** tab in your GitHub repository
4. Watch the deployment workflow run
5. If successful, your changes will be live at: http://15.206.76.175

---

## ✅ Setup Complete!

Your CI/CD pipeline is now active. Every push to the `main` branch will automatically:

1. Pull latest code to the server
2. Install dependencies
3. Run database migrations
4. Build the application
5. Restart with PM2
6. Perform health check

## 🔍 Monitoring Deployments

**View deployment logs:**
- Go to your GitHub repository
- Click on **Actions** tab
- Click on any workflow run to see detailed logs

**Check application status on server:**
```bash
ssh -i "F:\Core Development\X-Fleet\zebrank.pem" ubuntu@15.206.76.175 "pm2 status"
```

---

## ⚠️ Important Notes

- **Never** commit the `zebrank.pem` file to git (it's already in .gitignore)
- **Never** share your GitHub secrets with anyone
- Keep the `.env` file secret (also in .gitignore)
- The SSH key secret should only be visible in GitHub Actions

---

## 🆘 Troubleshooting

### Deployment Failed?

1. **Check GitHub Actions logs**: Click on the failed workflow in the Actions tab
2. **Common issues**:
   - Incorrect SSH key format (must include BEGIN/END lines)
   - Wrong server IP or username
   - Server is down or unreachable

### Still Need Help?

Check the detailed deployment guide: `DEPLOYMENT.md`

---

**Ready to deploy?** Push your code to see the magic happen! 🚀
