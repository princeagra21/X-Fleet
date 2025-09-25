# X-Fleet Backend - AI Coding Agent Instructions

## Architecture Overview

This is a **NestJS fleet management backend** with a **multi-database Prisma setup** using **Fastify** as the HTTP adapter. The system manages vehicles, drivers, devices, and users with comprehensive logging and authentication.

### Multi-Database Architecture
- **Primary DB** (`FleetStack_db`): Core business logic - users, vehicles, drivers, devices
- **Logs DB** (`FleetStack_logs`): Application and system logs  
- **Address DB** (`FleetStack_Address`): Geocoding and location data

Each database has its own Prisma schema and generated client in `generated/prisma-{name}/`.

### Key Service Patterns
```typescript
// Database services are globally available via dependency injection
constructor(
  private primaryDb: PrimaryDatabaseService,
  private logsDb: LogsDatabaseService, 
  private addressDb: AddressDatabaseService
) {}
```

## Critical Development Workflows

### Prisma Multi-Schema Setup
```bash
# Generate all clients (required after schema changes)
npx prisma generate --schema=prisma/primary.prisma
npx prisma generate --schema=prisma/logs.prisma  
npx prisma generate --schema=prisma/address.prisma

# Migrate specific database
npx prisma migrate dev --name migration_name --schema=prisma/primary.prisma
```

### Development Commands
- `npm run start:dev` - Development with hot reload
- `npm run start:debug` - Debug mode with inspector
- `npm run lint` - ESLint with auto-fix
- `npm run test:e2e` - End-to-end tests

### File Upload Configuration
The app uses Fastify multipart with 5MB limit. Static files served at `/uploads/` prefix from `/uploads` directory.

## Code Conventions

### Module Structure
Follow consistent pattern: `{feature}/{feature}.module.ts`, `{feature}.controller.ts`, `{feature}.service.ts`, `dto/` folder.

### Response Format
All controllers return data that gets wrapped by `ResponseInterceptor`:
```typescript
{
  status: "success",
  data: T,
  timestamp: "2025-01-01T00:00:00.000Z"
}
```

### Validation Pattern
- Use `class-validator` decorators in DTOs
- Custom `ValidationPipe` transforms and validates with detailed error messages
- Both custom and NestJS validation pipes are active globally

### Authentication & Authorization
- JWT-based auth with 24h expiration
- Multiple user types: `SUPERADMIN`, `ADMIN`, `USER`, `SUBUSER`
- Role-based permissions system via `RolePermission` table

## Logging & Monitoring

### Winston Logging
- Structured logging with context and metadata
- Automatic request/response logging via `LoggingMiddleware`
- Daily rotating files in `winston_logs/`: `application-*.log`, `error-*.log`, `exceptions-*.log`

### Health Checks
Each database service has `healthCheck()` method. Use `/health` endpoint for monitoring.

## Development Guidelines

### Database Queries
- Always use appropriate database service (`primaryDb`, `logsDb`, `addressDb`)
- Leverage Prisma's type safety - generated types are in `generated/` 
- Consider query optimization for vehicle/driver tracking operations

### Error Handling
- Leverage Winston logger with context: `logger.error(message, trace, context, meta)`
- Use NestJS exception filters for consistent error responses
- ValidationPipe provides detailed validation error messages

### Security
- Helmet middleware enabled globally
- File upload restrictions: 5MB, 1 file, 5 fields
- Environment-based JWT secrets and database URLs

### Key Entities & Relationships
- `User` ↔ `Company` (many-to-one)
- `Vehicle` ↔ `Device` (one-to-one)
- `Driver` ↔ `Vehicle` (many-to-many via `DriverVehicle`)
- `User` ↔ `Vehicle` (many-to-many via `UserVehicleAssignment`)

Always check existing patterns in similar modules before implementing new features.