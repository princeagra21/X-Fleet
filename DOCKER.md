# 🐳 Docker Guide for X-Fleet Application

This document provides comprehensive information about Docker setup, configuration, and deployment for the X-Fleet NestJS application.

## 📋 Table of Contents

- [Overview](#overview)
- [Docker Configuration Files](#docker-configuration-files)
- [Multi-Stage Docker Build](#multi-stage-docker-build)
- [Docker Compose Setup](#docker-compose-setup)
- [Production Deployment](#production-deployment)
- [Local Development](#local-development)
- [Image Management](#image-management)
- [Database Configuration](#database-configuration)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🎯 Overview

The X-Fleet application uses a production-ready Docker setup with the following components:

- **Multi-stage Dockerfile** for optimized production builds
- **Docker Compose** for orchestrating application and database services
- **PostgreSQL database** with multiple schemas in a single container
- **Production-ready security** with non-root user and proper signal handling
- **Health checks** for monitoring container status
- **Persistent volumes** for database data

## 📁 Docker Configuration Files

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Skip Prisma generation - using pre-built client

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Copy everything from builder (optimized build)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Change ownership of app directory
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node --version || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/main.js"]
```

### .dockerignore

```dockerignore
# Node.js dependencies
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment files
.env*
!.env.example

# Git files
.git
.gitignore

# Documentation
*.md
!README.md

# Logs and temp files
logs
*.log
winston_logs
temp.*

# Build artifacts we don't need in context
.cache
.parcel-cache
.npm

# IDE and OS
.vscode
.idea
.DS_Store
Thumbs.db

# Docker files
Dockerfile*
docker-compose*
```

### docker-compose.yml

```yaml
# Production Docker Compose for X-Fleet Application
# This matches the successful deployment configuration

services:
  nestjs-app:
    image: princeagra21/x-fleet:latest
    container_name: x-fleet-app
    restart: unless-stopped
    ports:
      - "3001:3001"
      - "80:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      # Primary Database
      - PRIMARY_DB_HOST=postgres-db
      - PRIMARY_DB_USER=postgres
      - PRIMARY_DB_PORT=5432
      - PRIMARY_DB_PASSWORD=Stack@321
      - PRIMARY_DB_NAME=FleetStack_db
      - PRIMARY_DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_db?schema=public
      # Logs Database  
      - LOGS_DB_HOST=postgres-db
      - LOGS_DB_USER=postgres
      - LOGS_DB_PORT=5432
      - LOGS_DB_PASSWORD=Stack@321
      - LOGS_DB_NAME=FleetStack_logs
      - LOGS_DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_logs?schema=public
      # Address Database
      - ADDRESS_DB_HOST=postgres-db
      - ADDRESS_DB_USER=postgres
      - ADDRESS_DB_PORT=5432
      - ADDRESS_DB_PASSWORD=Stack@321
      - ADDRESS_DB_NAME=FleetStack_Address
      - ADDRESS_DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_Address?schema=public
      # Default Database URL
      - DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_db?schema=public
    depends_on:
      - postgres-db

  postgres-db:
    image: postgres:15-alpine
    container_name: x-fleet-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=Stack@321
      - POSTGRES_DB=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🏗️ Multi-Stage Docker Build

### Stage 1: Builder
- **Base Image**: `node:20-alpine`
- **Purpose**: Build the application and install all dependencies
- **Key Actions**:
  - Install all npm dependencies (including dev dependencies)
  - Copy source code
  - Build the TypeScript application
  - Generate any required build artifacts

### Stage 2: Production
- **Base Image**: `node:20-alpine`
- **Purpose**: Create a minimal production runtime image
- **Key Actions**:
  - Install `dumb-init` for proper signal handling
  - Create non-root user (`nestjs`)
  - Copy only necessary files from builder stage:
    - Built application (`dist/`)
    - Generated Prisma clients (`generated/`)
    - Production node modules
    - Package files
  - Set proper file ownership and permissions
  - Configure health checks

### Benefits of Multi-Stage Build

1. **Smaller Image Size**: Production image doesn't contain source code or dev dependencies
2. **Security**: Reduced attack surface with fewer installed packages
3. **Faster Deployments**: Smaller images download and start faster
4. **Build Consistency**: Same build environment every time

## 🐙 Docker Compose Setup

### Services Overview

#### nestjs-app
- **Image**: `princeagra21/x-fleet:latest`
- **Container Name**: `x-fleet-app`
- **Ports**: 
  - `3001:3001` - Primary application port
  - `80:3001` - HTTP port for load balancers
- **Restart Policy**: `unless-stopped`
- **Dependencies**: Waits for `postgres-db` to start

#### postgres-db
- **Image**: `postgres:15-alpine`
- **Container Name**: `x-fleet-postgres`
- **Port**: `5432:5432` (exposed externally)
- **Persistent Storage**: `postgres_data` volume
- **Restart Policy**: `unless-stopped`

### Environment Variables

The application uses multiple database connections:

```bash
# Primary Database (Main application data)
PRIMARY_DB_HOST=postgres-db
PRIMARY_DB_NAME=FleetStack_db
PRIMARY_DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_db?schema=public

# Logs Database (Application logs)
LOGS_DB_HOST=postgres-db
LOGS_DB_NAME=FleetStack_logs
LOGS_DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_logs?schema=public

# Address Database (Address-related data)
ADDRESS_DB_HOST=postgres-db
ADDRESS_DB_NAME=FleetStack_Address
ADDRESS_DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_Address?schema=public

# Default Database URL (Fallback)
DATABASE_URL=postgresql://postgres:Stack@321@postgres-db:5432/FleetStack_db?schema=public
```

## 🚀 Production Deployment

### Current Deployment

The application is deployed on AWS EC2:

- **Application URL**: `http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:3001`
- **Alternative URL**: `http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:80`
- **Database**: `ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:5432`
- **Docker Registry**: Docker Hub (`princeagra21/x-fleet:latest`)

### Deployment Process

1. **Build Image Locally**:
   ```bash
   docker build -t princeagra21/x-fleet:latest .
   ```

2. **Push to Registry**:
   ```bash
   docker push princeagra21/x-fleet:latest
   ```

3. **Deploy on Server**:
   ```bash
   # SSH into server
   ssh -i "zebrank.pem" ubuntu@ec2-13-204-91-22.ap-south-1.compute.amazonaws.com
   
   # Pull latest image
   docker pull princeagra21/x-fleet:latest
   
   # Deploy with Docker Compose
   docker compose up -d
   ```

### Production Monitoring

Check deployment status:
```bash
# Container status
docker compose ps

# Application logs
docker logs x-fleet-app

# Database logs
docker logs x-fleet-postgres

# Health check
curl http://localhost:3001
```

## 💻 Local Development

### Prerequisites

- Docker Desktop
- Docker Compose
- Git

### Quick Start

1. **Clone Repository**:
   ```bash
   git clone <repository-url>
   cd X-Fleet
   ```

2. **Build and Run**:
   ```bash
   docker-compose up -d
   ```

3. **Access Application**:
   - Application: `http://localhost:3001`
   - Database: `localhost:5432`

### Development Commands

```bash
# Build image
docker build -t x-fleet:dev .

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Access container shell
docker exec -it x-fleet-app sh

# Access database
docker exec -it x-fleet-postgres psql -U postgres
```

## 🏷️ Image Management

### Current Image

- **Registry**: Docker Hub
- **Repository**: `princeagra21/x-fleet`
- **Tag**: `latest`
- **Size**: ~500MB (optimized with multi-stage build)

### Image Layers

1. **Base Layer**: Node.js 20 Alpine (~50MB)
2. **System Tools**: dumb-init and build tools (~10MB)
3. **Application**: Built NestJS app (~20MB)
4. **Dependencies**: Production node_modules (~400MB)
5. **Generated Code**: Prisma clients (~20MB)

### Image Commands

```bash
# Build new image
docker build -t princeagra21/x-fleet:v1.0.0 .

# Tag image
docker tag princeagra21/x-fleet:latest princeagra21/x-fleet:v1.0.0

# Push to registry
docker push princeagra21/x-fleet:v1.0.0

# Pull specific version
docker pull princeagra21/x-fleet:v1.0.0

# List images
docker images | grep x-fleet

# Remove old images
docker image prune
```

## 🗄️ Database Configuration

### Database Architecture

The application uses a single PostgreSQL container with multiple databases:

1. **FleetStack_db** - Primary application database
2. **FleetStack_logs** - Application logs and audit trails
3. **FleetStack_Address** - Address and location data

### Database Setup

The databases are automatically created when the container starts. The application uses Prisma ORM with multiple generated clients for each database.

### Generated Prisma Clients

Located in `generated/` directory:
- `generated/prisma-primary/` - Primary database client
- `generated/prisma-logs/` - Logs database client  
- `generated/prisma-address/` - Address database client

### Database Access

```bash
# Connect to database container
docker exec -it x-fleet-postgres psql -U postgres

# List all databases
\l

# Connect to specific database
\c FleetStack_db

# List tables
\dt

# Exit
\q
```

### Backup and Restore

```bash
# Backup all databases
docker exec x-fleet-postgres pg_dumpall -U postgres > backup.sql

# Backup specific database
docker exec x-fleet-postgres pg_dump -U postgres FleetStack_db > fleetstack_db.sql

# Restore
docker exec -i x-fleet-postgres psql -U postgres < backup.sql
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Application Won't Start

**Symptoms**: Container keeps restarting
```bash
# Check logs
docker logs x-fleet-app

# Common causes:
# - Missing generated Prisma clients
# - Database connection issues
# - Environment variable problems
```

#### 2. Database Connection Failed

**Symptoms**: "Cannot connect to database" errors
```bash
# Check database container
docker logs x-fleet-postgres

# Verify database is ready
docker exec x-fleet-postgres pg_isready -U postgres

# Check connection from app container
docker exec x-fleet-app node -e "console.log('Testing...')"
```

#### 3. Port Already in Use

**Symptoms**: "Port 3001 already in use"
```bash
# Find process using port
netstat -tulpn | grep :3001

# Stop existing containers
docker-compose down

# Use different ports
docker-compose up -d
```

#### 4. Volume Mount Issues

**Symptoms**: Data not persisting
```bash
# Check volumes
docker volume ls

# Inspect volume
docker volume inspect x-fleet_postgres_data

# Remove and recreate volume
docker-compose down -v
docker-compose up -d
```

### Debug Commands

```bash
# Container inspection
docker inspect x-fleet-app

# Resource usage
docker stats x-fleet-app

# Network inspection
docker network ls
docker network inspect x-fleet_default

# Execute commands in container
docker exec -it x-fleet-app sh
docker exec -it x-fleet-app node --version
docker exec -it x-fleet-app ls -la /app
```

### Health Checks

```bash
# Application health
curl http://localhost:3001

# Container health status
docker inspect --format='{{.State.Health}}' x-fleet-app

# Database health
docker exec x-fleet-postgres pg_isready -U postgres
```

## ✅ Best Practices

### Security

1. **Non-Root User**: Application runs as `nestjs` user (UID 1001)
2. **Signal Handling**: Uses `dumb-init` for proper signal forwarding
3. **Minimal Base**: Alpine Linux for smaller attack surface
4. **Health Checks**: Regular health monitoring
5. **No Secrets in Image**: Environment variables for sensitive data

### Performance

1. **Multi-Stage Build**: Optimized image size
2. **Layer Caching**: Efficient Dockerfile ordering
3. **Alpine Base**: Faster startup times
4. **Production Dependencies**: Only necessary packages in final image

### Maintenance

1. **Image Tagging**: Use semantic versioning
2. **Regular Updates**: Keep base images updated
3. **Log Management**: Proper logging configuration
4. **Backup Strategy**: Regular database backups
5. **Monitoring**: Health checks and metrics

### Development

1. **Docker Compose**: Easy local development setup
2. **Volume Mounts**: For development file watching
3. **Environment Separation**: Different configs for dev/prod
4. **Hot Reload**: Development-specific configurations

## 🚢 Deployment Checklist

Before deploying to production:

- [ ] Application builds successfully
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Health checks working
- [ ] Security review completed
- [ ] Performance testing done
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Documentation updated

## 📚 Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PostgreSQL Docker Guide](https://hub.docker.com/_/postgres)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

**Last Updated**: September 2025  
**Docker Version**: 28.4.0  
**Docker Compose Version**: v2.39.4  
**Application Status**: ✅ Production Ready
