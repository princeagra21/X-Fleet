# GitHub Commands Reference

This document provides a comprehensive guide to essential Git and GitHub commands for the X-Fleet project.

## Table of Contents
- [Basic Workflow](#basic-workflow)
- [Repository Setup](#repository-setup)
- [Staging and Committing](#staging-and-committing)
- [Pushing Changes](#pushing-changes)
- [Pulling Changes](#pulling-changes)
- [Branch Management](#branch-management)
- [Remote Management](#remote-management)
- [Useful Commands](#useful-commands)
- [Common Scenarios](#common-scenarios)

## Basic Workflow

### 1. Check Repository Status
```bash
git status
```
Shows the current state of your working directory and staging area.

### 2. Stage Changes
```bash
# Stage specific files
git add filename.txt

# Stage all changes
git add .

# Stage all changes (including deletions)
git add -A
```

### 3. Commit Changes
```bash
# Commit with message
git commit -m "Your commit message"

# Commit with detailed message
git commit -m "Short description" -m "Longer description of changes"

# Stage and commit in one command
git commit -am "Your commit message"
```

### 4. Push to GitHub
```bash
# Push to main branch (first time)
git push -u origin main

# Push to current branch
git push

# Push specific branch
git push origin branch-name
```

### 5. Pull from GitHub
```bash
# Pull from current branch
git pull

# Pull from specific branch
git pull origin main

# Fetch and merge separately
git fetch origin
git merge origin/main
```

## Repository Setup

### Initialize New Repository
```bash
# Initialize local repository
git init

# Add remote origin
git remote add origin https://github.com/username/repository-name.git

# Or with SSH
git remote add origin git@github.com:username/repository-name.git
```

### Clone Existing Repository
```bash
# Clone with HTTPS
git clone https://github.com/username/repository-name.git

# Clone with SSH
git clone git@github.com:username/repository-name.git

# Clone to specific directory
git clone https://github.com/username/repository-name.git my-project
```

## Staging and Committing

### Staging Commands
```bash
# Stage specific file
git add src/app.controller.ts

# Stage multiple files
git add src/app.controller.ts src/app.service.ts

# Stage all files in directory
git add src/

# Stage all modified files
git add -u

# Interactive staging
git add -i

# Stage parts of a file
git add -p filename.txt
```

### Commit Commands
```bash
# Simple commit
git commit -m "Fix user authentication bug"

# Commit with body
git commit -m "Add user registration feature" -m "- Add validation for email and password
- Implement password hashing
- Create user database schema"

# Amend last commit
git commit --amend -m "Updated commit message"

# Commit without pre-commit hooks
git commit --no-verify -m "Emergency fix"
```

### Commit Message Best Practices
```bash
# Good commit messages
git commit -m "Add user authentication middleware"
git commit -m "Fix memory leak in database connection"
git commit -m "Update dependencies to latest versions"
git commit -m "Refactor user service for better performance"

# Types of commits
git commit -m "feat: add new user registration endpoint"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for user service"
git commit -m "chore: update package dependencies"
```

## Pushing Changes

### Basic Push Commands
```bash
# Push to main branch (set upstream)
git push -u origin main

# Push current branch
git push

# Push specific branch
git push origin feature-branch

# Push all branches
git push --all origin

# Push tags
git push --tags
```

### Force Push (Use with Caution)
```bash
# Force push (overwrites remote)
git push --force

# Safer force push
git push --force-with-lease
```

### Push New Branch
```bash
# Create and push new branch
git checkout -b new-feature
git push -u origin new-feature
```

## Pulling Changes

### Basic Pull Commands
```bash
# Pull from current branch
git pull

# Pull from specific remote and branch
git pull origin main

# Pull with rebase
git pull --rebase

# Pull and automatically stash local changes
git pull --autostash
```

### Fetch vs Pull
```bash
# Fetch updates without merging
git fetch origin

# See what's new
git log HEAD..origin/main

# Merge manually after fetch
git merge origin/main

# Pull = Fetch + Merge
git pull origin main
```

## Branch Management

### Create and Switch Branches
```bash
# Create new branch
git branch feature-branch

# Switch to branch
git checkout feature-branch

# Create and switch in one command
git checkout -b feature-branch

# Create branch from specific commit
git checkout -b hotfix 1a2b3c4d
```

### Branch Operations
```bash
# List all branches
git branch -a

# List remote branches
git branch -r

# Delete local branch
git branch -d feature-branch

# Force delete branch
git branch -D feature-branch

# Delete remote branch
git push origin --delete feature-branch

# Rename current branch
git branch -m new-branch-name
```

### Merging Branches
```bash
# Switch to main and merge
git checkout main
git merge feature-branch

# Merge without fast-forward
git merge --no-ff feature-branch

# Merge with commit message
git merge feature-branch -m "Merge feature branch"
```

## Remote Management

### Remote Commands
```bash
# List remotes
git remote -v

# Add remote
git remote add upstream https://github.com/original/repository.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream

# Change remote URL
git remote set-url origin https://github.com/username/new-repository.git
```

## Useful Commands

### Repository Information
```bash
# View commit history
git log --oneline

# View detailed history
git log --graph --decorate --all

# View changes in specific commit
git show 1a2b3c4d

# View file history
git log --follow filename.txt
```

### Undoing Changes
```bash
# Unstage file
git reset HEAD filename.txt

# Discard changes in working directory
git checkout -- filename.txt

# Reset to last commit (keep changes)
git reset --soft HEAD~1

# Reset to last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (safe)
git revert 1a2b3c4d
```

### Stashing Changes
```bash
# Stash current changes
git stash

# Stash with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Pop stash (apply and remove)
git stash pop

# Drop stash
git stash drop stash@{0}
```

## Common Scenarios

### Daily Development Workflow
```bash
# Start of day - pull latest changes
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/new-functionality

# Make changes, then commit
git add .
git commit -m "Implement new functionality"

# Push feature branch
git push -u origin feature/new-functionality

# When feature is complete, merge to main
git checkout main
git pull origin main
git merge feature/new-functionality
git push origin main

# Clean up
git branch -d feature/new-functionality
git push origin --delete feature/new-functionality
```

### Fixing a Bug
```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Fix the bug and commit
git add .
git commit -m "Fix critical authentication bug"

# Push and create pull request
git push -u origin hotfix/critical-bug
```

### Synchronizing with Remote
```bash
# Check for changes
git fetch origin

# See what's different
git log HEAD..origin/main --oneline

# Pull changes
git pull origin main

# If there are conflicts, resolve them and:
git add .
git commit -m "Resolve merge conflicts"
```

### Emergency Rollback
```bash
# Find the commit to rollback to
git log --oneline

# Create revert commit
git revert 1a2b3c4d

# Push the revert
git push origin main
```

## Project-Specific Commands

### For X-Fleet Project
```bash
# Install dependencies after pulling
git pull origin main
npm install

# Build project after changes
npm run build

# Run tests before pushing
npm test
git add .
git commit -m "Add new feature with tests"
git push origin main

# Generate Prisma client after schema changes
npx prisma generate
git add .
git commit -m "Update Prisma schema and regenerate client"
git push origin main
```

## GitHub CLI Commands

### Repository Management
```bash
# Create repository
gh repo create project-name --public

# Clone repository
gh repo clone username/repository-name

# View repository
gh repo view

# Fork repository
gh repo fork username/repository-name
```

### Pull Requests
```bash
# Create pull request
gh pr create --title "Feature: Add new functionality" --body "Description of changes"

# List pull requests
gh pr list

# View pull request
gh pr view 123

# Merge pull request
gh pr merge 123
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git status` | Check repository status |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit with message |
| `git push` | Push to remote |
| `git pull` | Pull from remote |
| `git log --oneline` | View commit history |
| `git branch` | List branches |
| `git checkout -b branch` | Create and switch to new branch |
| `git merge branch` | Merge branch |
| `git stash` | Temporarily save changes |

---

**Remember**: Always pull before pushing to avoid conflicts, and write clear commit messages that explain what changes were made and why.
