import { Injectable } from '@nestjs/common';
import { PrimaryDatabaseService } from './database/primary-database.service';

@Injectable()
export class AppService {

   constructor(
      private readonly primaryDb: PrimaryDatabaseService
      ,     
    ) {}



  getHello(): string {
    return 'Hello World!';
  }

  getDeviceTypes() {
    return this.primaryDb.deviceType.findMany({
    select: {
       id: true,
      name: true,
      port: true,
    },
  });
  }

}
