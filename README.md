# X-Fleet NestJS Application

A production-ready NestJS application with multi-database PostgreSQL support, deployed using Docker.

## 🚀 Production Deployment

The application is successfully deployed and running on AWS EC2:

- **Application URL**: `http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:3001`
- **Alternative URL**: `http://ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:80`
- **Database Host**: `ec2-13-204-91-22.ap-south-1.compute.amazonaws.com:5432`

### Docker Image

- **Registry**: Docker Hub
- **Image**: `princeagra21/x-fleet:latest`

## 🗄️ Database Setup

The application uses three PostgreSQL databases:

1. **FleetStack_db** - Primary database
2. **FleetStack_logs** - Logs database
3. **FleetStack_Address** - Address database

**Database Credentials:**
- Username: `postgres`
- Password: `Stack@321`
- Port: `5432`

## 🛠️ Local Development

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd X-Fleet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Generate Prisma clients**
   ```bash
   npx prisma generate
   ```

5. **Build the application**
   ```bash
   npm run build
   ```

6. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 📋 Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t x-fleet:latest .
```

### Deploy with Docker Compose
```bash
docker-compose up -d
```

## 🏗️ Architecture

- **Framework**: NestJS
- **Database**: PostgreSQL (Multi-database setup)
- **ORM**: Prisma
- **Containerization**: Docker
- **Deployment**: AWS EC2

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🔒 Security Features

- Helmet for security headers
- CORS configuration
- Input validation with class-validator
- JWT authentication support
- Non-root Docker user
- Production-ready security headers

## 📊 Health Check

The application includes health check endpoints for monitoring:

- Application health check available at container level
- Database connectivity verification
- Proper Docker health checks configured

## 🚀 Production Features

- Multi-stage Docker build for optimized images
- Production-ready logging with Winston
- Error handling and validation
- Database connection pooling
- Container restart policies
- Persistent data volumes
- External database access
- Load balancer ready (ports 80 & 3001)

---

**Status**: ✅ Successfully deployed and running in production
