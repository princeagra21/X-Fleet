import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrimaryDatabaseService } from './primary-database.service';
import { LogsDatabaseService } from './logs-database.service';
import { AddressDatabaseService } from './address-database.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    PrimaryDatabaseService,
    LogsDatabaseService,
    AddressDatabaseService,
  ],
  exports: [
    PrimaryDatabaseService,
    LogsDatabaseService,
    AddressDatabaseService,
  ],
})
export class DatabaseModule {}