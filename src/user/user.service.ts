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

    async createVehicle(userId: number, CreateVehicleDto: any): Promise<any> {
        const { name, vin, plateNumber, imei, simNumber, vehicleTypeId , gmtOffset} = CreateVehicleDto;
        const CurrentUser = await this.primaryDb.user.findUnique({
            where: { uid: userId }           
        });

        const checkimei = await this.primaryDb.device.findUnique({
            where: { imei: imei }
        });
        if(!checkimei){
            return { status: 'error', message: 'Device with this IMEI does not exist' };
        }

        const isvehicleAssigned = await this.primaryDb.vehicle.findFirst({
            where: { deviceId: checkimei.id! }
        });
        if(isvehicleAssigned){
            return { status: 'error', message: 'This device is already assigned to another vehicle' };
        }

        const checksim = await this.primaryDb.sim.findUnique({
            where: { simNumber: simNumber }
        });
        if(!checksim){
            return { status: 'error', message: 'SIM card with this number does not exist' };
        }
        const issimAssigned = await this.primaryDb.device.findFirst({
            where: { simId: checksim.id! }
        });
        if(issimAssigned){
            if(issimAssigned.id !== checkimei.id){  
            return { status: 'error', message: 'This SIM card is already assigned to another device' };
            }
        }

        const checkplan = await this.primaryDb.pricingPlan.findFirst({
            where: { adminUserId: CurrentUser?.parentUserId!, isActive: true }
        });

        const primaryExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        const Planduration = checkplan?.durationDays ? checkplan.durationDays : 365;
        const secondaryExpiry = new Date(Date.now() + Planduration * 24 * 60 * 60 * 1000);


        const vehicle = await this.primaryDb.vehicle.create({
            data: {
                name: name,
                vin: vin,
                plateNumber: plateNumber,
                deviceId: checkimei.id!,
                vehicleTypeId: Number(vehicleTypeId),
                primaryUserId: userId,
                addedByUserId: CurrentUser?.parentUserId!,
                createdAt: new Date(),
                primaryExpiry: primaryExpiry,
                secondaryExpiry: secondaryExpiry,
                isActive: true,
                planId: checkplan?.id,
                gmtOffset: gmtOffset
               
            },
        });

        return { message : 'Vehicle created successfully', vehicle}
    }

    async getVehicleById(vehicleId: number, userId: number): Promise<any> {
        
        const isathaurity = await this.primaryDb.userVehicleAssignment.findFirst({
            where: { userId: userId , vehicleId: vehicleId },
            select: { vehicleId: true }
        });
        if(!isathaurity){
            return { status: 'error', message: 'You are not authorized to view this vehicle' };
        }  
        const vehicle = await this.primaryDb.vehicle.findUnique({
            where: { id: vehicleId },
            select: {
                id: true,
                name: true,
                plateNumber: true,
                vin: true,
                isActive: true,
                vehicleType: { select: { name: true } },
                device: { select: { imei: true } }
            }
        });

        return {message : 'Vehicle details fetched successfully', vehicle}
    }

}