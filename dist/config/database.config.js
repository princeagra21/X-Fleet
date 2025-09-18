"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const config_1 = require("@nestjs/config");
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    primary: {
        host: process.env.PRIMARY_DB_HOST || 'localhost',
        port: parseInt(process.env.PRIMARY_DB_PORT || '5432', 10),
        username: process.env.PRIMARY_DB_USER || 'postgres',
        password: process.env.PRIMARY_DB_PASSWORD || 'Stack@321',
        database: process.env.PRIMARY_DB_NAME || 'FleetStack_db',
        url: process.env.PRIMARY_DATABASE_URL || `postgresql://${process.env.PRIMARY_DB_USER || 'postgres'}:${process.env.PRIMARY_DB_PASSWORD || 'Stack@321'}@${process.env.PRIMARY_DB_HOST || 'localhost'}:${process.env.PRIMARY_DB_PORT || '5432'}/${process.env.PRIMARY_DB_NAME || 'FleetStack_db'}?schema=public`
    },
    logs: {
        host: process.env.LOGS_DB_HOST || 'localhost',
        port: parseInt(process.env.LOGS_DB_PORT || '5432', 10),
        username: process.env.LOGS_DB_USER || 'postgres',
        password: process.env.LOGS_DB_PASSWORD || 'Stack@321',
        database: process.env.LOGS_DB_NAME || 'FleetStack_logs',
        url: process.env.LOGS_DATABASE_URL || `postgresql://${process.env.LOGS_DB_USER || 'postgres'}:${process.env.LOGS_DB_PASSWORD || 'Stack@321'}@${process.env.LOGS_DB_HOST || 'localhost'}:${process.env.LOGS_DB_PORT || '5432'}/${process.env.LOGS_DB_NAME || 'FleetStack_logs'}?schema=public`
    },
    address: {
        host: process.env.ADDRESS_DB_HOST || 'localhost',
        port: parseInt(process.env.ADDRESS_DB_PORT || '5432', 10),
        username: process.env.ADDRESS_DB_USER || 'postgres',
        password: process.env.ADDRESS_DB_PASSWORD || 'Stack@321',
        database: process.env.ADDRESS_DB_NAME || 'FleetStack_Address',
        url: process.env.ADDRESS_DATABASE_URL || `postgresql://${process.env.ADDRESS_DB_USER || 'postgres'}:${process.env.ADDRESS_DB_PASSWORD || 'Stack@321'}@${process.env.ADDRESS_DB_HOST || 'localhost'}:${process.env.ADDRESS_DB_PORT || '5432'}/${process.env.ADDRESS_DB_NAME || 'FleetStack_Address'}?schema=public`
    }
}));
//# sourceMappingURL=database.config.js.map