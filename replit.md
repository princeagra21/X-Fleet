# NestJS Backend

## Overview

This is a NestJS backend application built with TypeScript that provides a scalable server-side architecture. The application is designed as a RESTful API service with multiple database connections and health monitoring capabilities. It uses Prisma as the ORM for database operations and follows NestJS best practices with modular architecture, dependency injection, and configuration management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Framework
The application is built on **NestJS**, a progressive Node.js framework that uses decorators and dependency injection. This choice provides:
- **Strong TypeScript support** for type safety and better developer experience
- **Modular architecture** allowing for clean separation of concerns
- **Built-in dependency injection** for better testability and maintainability
- **Decorator-based routing** for clean and declarative API endpoints

### Multi-Database Architecture
The system implements a **multi-database strategy** with three separate PostgreSQL databases:
- **Primary Database**: Main application data storage
- **Logs Database**: Dedicated logging and audit trail storage  
- **Address Database**: Specialized address-related data storage

This separation provides:
- **Data isolation** for different concerns
- **Independent scaling** of different data types
- **Specialized optimization** for each database's use case

### Database Layer (Prisma ORM)
**Prisma** is used as the ORM, providing:
- **Type-safe database queries** with generated TypeScript types
- **Database schema management** with migrations
- **Multi-database support** with separate client instances
- **Connection pooling** and performance optimization

Each database has its own service class (`PrimaryDatabaseService`, `LogsDatabaseService`, `AddressDatabaseService`) that extends PrismaClient, providing:
- **Isolated database connections** for each database
- **Health check capabilities** for monitoring
- **Proper connection lifecycle management**

### Configuration Management
Uses **NestJS ConfigModule** with:
- **Environment-based configuration** for different deployment environments
- **Centralized database configuration** in `database.config.ts`
- **Type-safe configuration access** throughout the application
- **Global configuration module** for easy access across all modules

### Health Monitoring
Implements comprehensive **health check endpoints**:
- **General application health** at `/health`
- **Database-specific health checks** at `/health/databases`
- **Individual database monitoring** for all three databases
- **Structured health responses** with timestamps and detailed status

### Module Organization
Follows **NestJS modular architecture**:
- **DatabaseModule**: Global module providing database services
- **HealthModule**: Health monitoring functionality
- **ConfigModule**: Application configuration management
- **Separation of concerns** with dedicated modules for different features

## External Dependencies

### Core Framework Dependencies
- **@nestjs/core & @nestjs/common**: Core NestJS framework components
- **@nestjs/platform-express**: Express.js integration for HTTP handling
- **@nestjs/config**: Configuration management with environment variable support

### Database & ORM
- **@prisma/client**: Type-safe database client with query builder
- **prisma**: Database toolkit for schema management and migrations

### Validation & Transformation
- **class-validator**: Decorator-based validation for DTOs and request bodies
- **class-transformer**: Object transformation and serialization

### Environment & Configuration
- **dotenv**: Environment variable loading from .env files

### Development & Testing Tools
- **@nestjs/testing**: Testing utilities for NestJS applications
- **jest**: JavaScript testing framework
- **supertest**: HTTP assertion library for API testing
- **typescript**: TypeScript compiler and language support
- **eslint & prettier**: Code linting and formatting tools

### Database Configuration
The application is configured to connect to **PostgreSQL databases** with the following setup:
- **Three separate database connections** (Primary, Logs, Address)
- **Environment variable configuration** for database URLs and credentials
- **Connection pooling** and health monitoring for each database
- **Fallback default values** for development environments