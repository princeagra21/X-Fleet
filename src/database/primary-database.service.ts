import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../generated/prisma-primary';

@Injectable()
export class PrimaryDatabaseService extends PrismaClient implements OnModuleInit {
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