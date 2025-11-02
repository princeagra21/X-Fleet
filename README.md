Commands 

## Quick commands (Windows PowerShell)

### Prisma: generate clients

npx prisma migrate dev --name init --schema=prisma/primary.prisma

npx prisma migrate dev --name init --schema=prisma/logs.prisma

npx prisma migrate dev --name init --schema=prisma/address.prisma


### Run the app

```powershell
# Development (watch)
npm run start:dev

# Debug mode
npm run start:debug

# Production build + run
npm run build; node dist/main
```

### Lint and tests

```powershell
# Lint (auto-fix)
npm run lint

# E2E tests
npm run test:e2e
```

### Notes
- Ensure environment variables (e.g., `PRIMARY_DATABASE_URL`) are set before running migrate/seed.
- The Prisma client is generated to `generated/prisma-primary` and seed files import from there.
Commands 

