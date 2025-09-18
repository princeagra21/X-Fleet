"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const primary_database_service_1 = require("../database/primary-database.service");
const logs_database_service_1 = require("../database/logs-database.service");
const address_database_service_1 = require("../database/address-database.service");
let HealthController = class HealthController {
    primaryDb;
    logsDb;
    addressDb;
    constructor(primaryDb, logsDb, addressDb) {
        this.primaryDb = primaryDb;
        this.logsDb = logsDb;
        this.addressDb = addressDb;
    }
    async getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'NestJS Backend',
        };
    }
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
    async getPrimaryDbHealth() {
        const isHealthy = await this.primaryDb.healthCheck();
        return {
            status: isHealthy ? 'ok' : 'error',
            database: 'primary',
            timestamp: new Date().toISOString(),
        };
    }
    async getLogsDbHealth() {
        const isHealthy = await this.logsDb.healthCheck();
        return {
            status: isHealthy ? 'ok' : 'error',
            database: 'logs',
            timestamp: new Date().toISOString(),
        };
    }
    async getAddressDbHealth() {
        const isHealthy = await this.addressDb.healthCheck();
        return {
            status: isHealthy ? 'ok' : 'error',
            database: 'address',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('databases'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getDatabasesHealth", null);
__decorate([
    (0, common_1.Get)('primary-db'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getPrimaryDbHealth", null);
__decorate([
    (0, common_1.Get)('logs-db'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getLogsDbHealth", null);
__decorate([
    (0, common_1.Get)('address-db'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getAddressDbHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [primary_database_service_1.PrimaryDatabaseService,
        logs_database_service_1.LogsDatabaseService,
        address_database_service_1.AddressDatabaseService])
], HealthController);
//# sourceMappingURL=health.controller.js.map