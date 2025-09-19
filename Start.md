npx prisma generate --schema=prisma/primary.prisma

npx prisma generate --schema=prisma/logs.prisma

npx prisma generate --schema=prisma/address.prisma


npx prisma migrate dev --name init --schema=prisma/primary.prisma


npx prisma migrate dev --name init --schema=prisma/logs.prisma


npx prisma migrate dev --name init --schema=prisma/address.prisma

