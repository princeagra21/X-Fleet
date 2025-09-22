import { Injectable } from '@nestjs/common';
import { PrimaryDatabaseService } from 'src/database/primary-database.service';
import { Country, State } from 'country-state-city';
import * as bcrypt from 'bcryptjs';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class UserService {
    constructor(private readonly primaryDb: PrimaryDatabaseService) { }

    async getUserVehicles(userId: number): Promise<any> {
       
        const vehicles = await this.primaryDb.userVehicleAssignment.findMany({
            where: { userId: userId },
            select: {
                vehicle: {
                    select: {
                        id: true,
                        name: true,
                        plateNumber: true,
                        vin: true,
                        isActive: true,
                        vehicleType: { select: { name: true } },
                        device: { select: { imei: true } }
                    },
                },
            },
        });

        return vehicles;
    }
}