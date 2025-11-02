import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';
import type { PrismaClient as LogsPrismaClient } from '../../generated/prisma-logs';

// Resolve the generated Prisma client at runtime from project root to avoid dist-relative path issues
const { PrismaClient: PrismaBase }: { PrismaClient: typeof LogsPrismaClient } = require(
  path.join(process.cwd(), 'generated', 'prisma-logs')
);

@Injectable()
export class LogsDatabaseService extends PrismaBase implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get('database.logs.url');
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
      console.log('Logs database (FleetStack_logs) connected successfully');
    } catch (error) {
      console.error('Failed to connect to logs database (FleetStack_logs):', error);
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
      console.error('Logs database (FleetStack_logs) health check failed:', error);
      return false;
    }
  }
}