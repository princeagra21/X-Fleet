import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../generated/prisma-logs';
export declare class LogsDatabaseService extends PrismaClient implements OnModuleInit {
    private configService;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    healthCheck(): Promise<boolean>;
}
