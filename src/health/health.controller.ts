import { Controller, Get } from '@nestjs/common';
import { PrimaryDatabaseService } from '../database/primary-database.service';
import { LogsDatabaseService } from '../database/logs-database.service';
import { AddressDatabaseService } from '../database/address-database.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly primaryDb: PrimaryDatabaseService,
    private readonly logsDb: LogsDatabaseService,
    private readonly addressDb: AddressDatabaseService,
  ) {}

  @Get()
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'NestJS Backend',
    };
  }

  @Get('databases')
  async getDatabasesHealth() {
    const [primaryHealth, logsHealth, addressHealth] = await Promise.all([
      this.primaryDb.healthCheck(),
      this.logsDb.healthCheck(),
      this.addressDb.healthCheck(),
    ]);

    return {
      status: primaryHealth && logsHealth && addressHealth ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      databases: {
        primary: {
          status: primaryHealth ? 'connected' : 'disconnected',
          type: 'postgresql',
        },
        logs: {
          status: logsHealth ? 'connected' : 'disconnected',
          type: 'postgresql',
        },
        address: {
          status: addressHealth ? 'connected' : 'disconnected',
          type: 'postgresql',
        },
      },
    };
  }

  @Get('primary-db')
  async getPrimaryDbHealth() {
    const isHealthy = await this.primaryDb.healthCheck();
    return {
      status: isHealthy ? 'ok' : 'error',
      database: 'primary',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('logs-db')
  async getLogsDbHealth() {
    const isHealthy = await this.logsDb.healthCheck();
    return {
      status: isHealthy ? 'ok' : 'error',
      database: 'logs',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('address-db')
  async getAddressDbHealth() {
    const isHealthy = await this.addressDb.healthCheck();
    return {
      status: isHealthy ? 'ok' : 'error',
      database: 'address',
      timestamp: new Date().toISOString(),
    };
  }
}