import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../generated/prisma-address';

@Injectable()
export class AddressDatabaseService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get('database.address.url');
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
      console.log('Address database (FleetStack_Address) connected successfully');
    } catch (error) {
      console.error('Failed to connect to address database (FleetStack_Address):', error);
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
      console.error('Address database (FleetStack_Address) health check failed:', error);
      return false;
    }
  }
}