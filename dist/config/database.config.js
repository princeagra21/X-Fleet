"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const config_1 = require("@nestjs/config");
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    primary: {
        host: process.env.PRIMARY_DB_HOST || process.env.PGHOST,
        port: parseInt(process.env.PRIMARY_DB_PORT || process.env.PGPORT || '5432', 10),
        username: process.env.PRIMARY_DB_USER || process.env.PGUSER,
        password: process.env.PRIMARY_DB_PASSWORD || process.env.PGPASSWORD,
        database: process.env.PRIMARY_DB_NAME || 'FleetStack_db',
        url: process.env.PRIMARY_DATABASE_URL || process.env.DATABASE_URL
    },
    logs: {
        host: process.env.LOGS_DB_HOST || process.env.PGHOST,
        port: parseInt(process.env.LOGS_DB_PORT || process.env.PGPORT || '5432', 10),
        username: process.env.LOGS_DB_USER || process.env.PGUSER,
        password: process.env.LOGS_DB_PASSWORD || process.env.PGPASSWORD,
        database: process.env.LOGS_DB_NAME || 'FleetStack_logs',
        url: process.env.LOGS_DATABASE_URL || process.env.DATABASE_URL
    },
    address: {
        host: process.env.ADDRESS_DB_HOST || process.env.PGHOST,
        port: parseInt(process.env.ADDRESS_DB_PORT || process.env.PGPORT || '5432', 10),
        username: process.env.ADDRESS_DB_USER || process.env.PGUSER,
        password: process.env.ADDRESS_DB_PASSWORD || process.env.PGPASSWORD,
        database: process.env.ADDRESS_DB_NAME || 'FleetStack_Address',
        url: process.env.ADDRESS_DATABASE_URL || process.env.DATABASE_URL
    }
}));
//# sourceMappingURL=database.config.js.map