import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';
import type { PrismaClient as PrimaryPrismaClient } from '../../generated/prisma-primary';

// Resolve the generated Prisma client at runtime from project root to avoid dist-relative path issues
const { PrismaClient: PrismaBase }: { PrismaClient: typeof PrimaryPrismaClient } = require(
  path.join(process.cwd(), 'generated', 'prisma-primary')
);

@Injectable()
export class PrimaryDatabaseService extends PrismaBase implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get('database.primary.url');
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Primary database (FleetStack_db) connected successfully');
    } catch (error) {
      console.error('Failed to connect to primary database (FleetStack_db):', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Primary database (FleetStack_db) health check failed:', error);
      return false;
    }
  }
}