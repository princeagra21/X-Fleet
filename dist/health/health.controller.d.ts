import { PrimaryDatabaseService } from '../database/primary-database.service';
import { LogsDatabaseService } from '../database/logs-database.service';
import { AddressDatabaseService } from '../database/address-database.service';
export declare class HealthController {
    private readonly primaryDb;
    private readonly logsDb;
    private readonly addressDb;
    constructor(primaryDb: PrimaryDatabaseService, logsDb: LogsDatabaseService, addressDb: AddressDatabaseService);
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        service: string;
    }>;
    getDatabasesHealth(): Promise<{
        status: string;
        timestamp: string;
        databases: {
            primary: {
                status: string;
                type: string;
            };
            logs: {
                status: string;
                type: string;
            };
            address: {
                status: string;
                type: string;
            };
        };
    }>;
    getPrimaryDbHealth(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
    getLogsDbHealth(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
    getAddressDbHealth(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
}
