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

# Generate Prisma clients first
RUN npx prisma generate --schema=prisma/primary.prisma
RUN npx prisma generate --schema=prisma/logs.prisma
RUN npx prisma generate --schema=prisma/address.prisma

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Copy package files and install only production dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
RUN npm ci --only=production --omit=dev && npm cache clean --force

# Generate Prisma clients in production stage
RUN npx prisma generate --schema=prisma/primary.prisma
RUN npx prisma generate --schema=prisma/logs.prisma
RUN npx prisma generate --schema=prisma/address.prisma

# Copy built application and generated files
COPY --from=builder /app/dist ./dist

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
