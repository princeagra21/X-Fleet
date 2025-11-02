import { Injectable } from '@nestjs/common';
import { PrimaryDatabaseService } from 'src/database/primary-database.service';
import { CreateUserDto } from './dto/createuser.dto';
import { City, Country, State } from 'country-state-city';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateDeviceDto } from './dto/createdevice.dto';
import { SimCardDto } from './dto/sim.dto';
import { CreateVehicleDto } from './dto/createvehicle.dto';
import { UpdateVehicleDto } from './dto/updatevehicle.dto';
import { CreateDriverDto } from './dto/createdriver.dto';
import { UpdateDriverDto } from './dto/updatedriver.dto';
import { UpdateCompanyDto } from './dto/updatecompany.dto';
import { UpdateSmtpConfigDto } from './dto/updatesmtpconfig.dto';
import type { FastifyRequest } from 'fastify';
import { UploadType } from './dto/upload.types';

@Injectable()
export class AdminService {
    constructor(private readonly primaryDb: PrimaryDatabaseService) { }



    async getUsers(adminId: number) {
        return this.primaryDb.user.findMany({
            where: { parentUserId: adminId },
        });
    }

    async createUser(adminId: number, userdto: CreateUserDto) {
        const { roleId, name, email, mobilePrefix, mobileNumber, username, password, companyName, address, countryCode, stateCode, city, pincode } = userdto;
        const userexists = await this.primaryDb.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });
        if (userexists) {
            return { msg: 'Username or Email already exists' };
        }

        const countryName = countryCode ? Country.getCountryByCode(countryCode)?.name ?? countryCode : '';
        const stateName = (stateCode && countryCode)
            ? (State.getStateByCodeAndCountry(String(stateCode).toUpperCase(), String(countryCode).toUpperCase())?.name ?? stateCode)
            : '';
        const fullAddress = `${address}, ${city}${stateName ? `, ${stateName}` : ''}${countryName ? `, ${countryName}` : ''}${pincode ? `, ${pincode}` : ''}`;

        const Currentaddress = await this.primaryDb.address.create({
            data: {
                addressLine: address,
                countryCode,
                stateCode: stateCode ? stateCode : '',
                cityId: city ? city : '',
                pincode: pincode ? pincode : null,
                fullAddress
            }
        });

        const hashedPassword = await bcrypt.hash(password, 12);
        const CurrentUser = await this.primaryDb.user.create({
            data: {
                loginType: 'USER',
                name,
                email: email ? email : "",
                isEmailVerified: false,
                mobilePrefix,
                mobileNumber,
                username,
                passwordHash: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
                roleId,
                parentUserId: adminId,
                addressId: Currentaddress.id,

            }
        });

        if (companyName) {
            const userid = CurrentUser.uid;

            const company = await this.primaryDb.company.create({
                data: {
                    userId: userid,
                    name: companyName,
                }
            });
        }

        return { msg: 'User created successfully', user: CurrentUser };


    }

    async updateUser(userid: number, userdto: UpdateUserDto, adminid: number) {
        const { roleId, name, email, mobilePrefix, mobileNumber, username, password, companyName, address, countryCode, stateCode, city, pincode } = userdto;
        const userexists = await this.primaryDb.user.findFirst({
            where: {
                OR: [
                    { uid: userid, parentUserId: adminid }
                ]
            }
        });
        if (!userexists) {
            return { msg: 'User not found' };
        }
        const countryName = countryCode ? Country.getCountryByCode(countryCode)?.name ?? countryCode : '';
        const stateName = (stateCode && countryCode)
            ? (State.getStateByCodeAndCountry(String(stateCode).toUpperCase(), String(countryCode).toUpperCase())?.name ?? stateCode)
            : '';
        const fullAddress = `${address}, ${city}${stateName ? `, ${stateName}` : ''}${countryName ? `, ${countryName}` : ''}${pincode ? `, ${pincode}` : ''}`;

        // load existing address when available so we can fall back to required fields
        const existingAddress = userexists.addressId
            ? await this.primaryDb.address.findUnique({ where: { id: userexists.addressId } })
            : null;

        let Currentaddress: any;
        const addressData: any = {
            addressLine: address ?? existingAddress?.addressLine ?? '',
            countryCode: countryCode ?? existingAddress?.countryCode ?? '',
            stateCode: stateCode ?? existingAddress?.stateCode ?? '',
            cityId: city ?? existingAddress?.cityId ?? '',
            pincode: pincode ?? existingAddress?.pincode ?? null,
            fullAddress,
        };

        if (!userexists.addressId) {
            Currentaddress = await this.primaryDb.address.create({ data: addressData });
        } else {
            Currentaddress = await this.primaryDb.address.update({ where: { id: userexists.addressId }, data: addressData });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;

        // Build user update object only with provided fields to satisfy Prisma/TS types
        const userUpdateData: any = { loginType: 'USER', updatedAt: new Date(), addressId: Currentaddress.id };
        if (name !== undefined) userUpdateData.name = name;
        if (email !== undefined) userUpdateData.email = email;
        if (mobilePrefix !== undefined) userUpdateData.mobilePrefix = mobilePrefix;
        if (mobileNumber !== undefined) userUpdateData.mobileNumber = mobileNumber;
        if (username !== undefined) userUpdateData.username = username;
        if (password) userUpdateData.passwordHash = hashedPassword;
        if (roleId !== undefined) {
            const parsedRole = parseInt(String(roleId), 10);
            if (!Number.isNaN(parsedRole)) userUpdateData.roleId = parsedRole;
        }

        if (userUpdateData.email != undefined) {
            const emailExists = await this.primaryDb.user.findFirst({
                where: {
                    email: userUpdateData.email,
                    uid: { not: userexists.uid }
                }
            });
            if (emailExists) {
                return { msg: 'Email already exists' };
            }
        }
        if (userUpdateData.username != undefined) {
            const usernameExists = await this.primaryDb.user.findFirst({
                where: {
                    username: userUpdateData.username,
                    uid: { not: userexists.uid }
                }
            });
            if (usernameExists) {
                return { msg: 'Username already exists' };
            }
        }

        const CurrentUser = await this.primaryDb.user.update({ where: { uid: userexists.uid }, data: userUpdateData });

        if (companyName) {
            const userid = CurrentUser.uid;

            const company = await this.primaryDb.company.create({
                data: {
                    userId: userid,
                    name: companyName,
                }
            });
        }

        return { msg: 'User updated successfully', user: CurrentUser };


    }



    async getUserById(id: number, adminid: number) {
        const user = await this.primaryDb.user.findUnique({
            where: { uid: id, parentUserId: adminid },
            include: { address: true, companies: true }
        });
        if (!user) {
            return { msg: 'User not found' };
        }
        return { message: "user details fetched successfully", user };
    }

    async createDevice(adminId: number, createDeviceDto: CreateDeviceDto) {
        const { imei, simId, deviceTypeId } = createDeviceDto;

        // Check if the device already exists
        const existingDevice = await this.primaryDb.device.findFirst({
            where: { imei }
        });
        if (existingDevice) {
            return { msg: 'Device with this IMEI already exists' };
        }

        // Create the new device, include simId only when provided and valid
        const deviceData: any = {
            imei,
            deviceTypeId,
            adminUserId: adminId,
        };

        if (simId !== undefined && simId !== null && String(simId).trim() !== '') {
            const parsedSimId = parseInt(String(simId), 10);
            if (!Number.isNaN(parsedSimId)) {
                deviceData.simId = parsedSimId;
            }
        }

        const newDevice = await this.primaryDb.device.create({ data: deviceData });

        return { msg: 'Device created successfully', device: newDevice };
    }


    async updateDevice(deviceId: number, adminId: number, updateDeviceDto: CreateDeviceDto) {
        const { imei, simId, deviceTypeId } = updateDeviceDto;
        const device = await this.primaryDb.device.findFirst({
            where: { id: deviceId, adminUserId: adminId }
        });
        if (!device) {
            return { msg: 'Device not found or not belongs to admin' };
        }

        // Normalize simId (accept string|number|null|undefined) to number|null|undefined for Prisma
        let simIdValue: number | null | undefined;
        if (simId === undefined) {
            simIdValue = device.simId; // keep existing (number | null)
        } else if (simId === null) {
            simIdValue = null;
        } else if (typeof simId === 'string') {
            const parsed = parseInt(simId, 10);
            simIdValue = Number.isNaN(parsed) ? device.simId : parsed;
        } else {
            simIdValue = simId as number;
        }

        // Update the device with normalized values
        const updatedDevice = await this.primaryDb.device.update({
            where: { id: deviceId },
            data: {
                imei: imei !== undefined ? imei : device.imei,
                simId: simIdValue,
                deviceTypeId: deviceTypeId !== undefined ? deviceTypeId : device.deviceTypeId,
            }
        });

        return { msg: 'Device updated successfully', device: updatedDevice };
    }


    async getDeviceById(deviceId: number, adminId: number) {
        const device = await this.primaryDb.device.findFirst({
            where: { id: deviceId, adminUserId: adminId },
            include: { sim: true }
        });
        if (!device) {
            return { msg: 'Device not found or not belongs to admin' };
        }
        return { device };
    }

    async getDevices(adminId: number) {
        return this.primaryDb.device.findMany({
            where: { adminUserId: adminId },
            include: { sim: true }
        });
    }

    async getSimCards(adminId: number) {
        return this.primaryDb.sim.findMany({
            where: { adminUserId: adminId },
            include: { provider: true }
        });
    }

    async createSimCard(adminId: number, simCardDto: SimCardDto) {
        const { simNumber, imsi, providerId, iccid, status } = simCardDto;

        // normalize and validate simNumber (required, keep as string)
        const parsedSimNumber = String(simNumber).trim();
        if (!parsedSimNumber) {
            return { msg: 'Invalid simNumber; expected non-empty string' };
        }

        // normalize optional identifiers used in uniqueness checks (imsi, iccid)
        let parsedImsi: string | undefined = undefined;
        if (imsi !== undefined && imsi !== null && String(imsi).trim() !== '') {
            parsedImsi = String(imsi).trim();
        }
        const trimmedIccid = iccid !== undefined && iccid !== null ? String(iccid).trim() : '';

        // Check if the SIM card already exists (check simNumber, imsi, iccid scoped to this admin)
        const conflictWhere: any = {
            adminUserId: adminId,
            OR: [
                { simNumber: parsedSimNumber as any }
            ]
        };

        if (parsedImsi !== undefined && parsedImsi !== null && parsedImsi !== '') {
            conflictWhere.OR.push({ imsi: parsedImsi });
        }
        if (trimmedIccid !== '') {
            conflictWhere.OR.push({ iccid: trimmedIccid });
        }

        const existingSim = await this.primaryDb.sim.findFirst({ where: conflictWhere });
        if (existingSim) {
            // Determine which field caused the conflict for a better message
            if (existingSim.simNumber === parsedSimNumber) return { msg: 'SIM card with this number already exists' };
            if (parsedImsi !== undefined && existingSim.imsi && existingSim.imsi === parsedImsi) return { msg: 'SIM card with this IMSI already exists' };
            if (trimmedIccid !== '' && existingSim.iccid && existingSim.iccid === trimmedIccid) return { msg: 'SIM card with this ICCID already exists' };
            return { msg: 'SIM card with provided identifier already exists' };
        }

        // normalize optional fields
        let parsedProviderId: number | undefined = undefined;
        if (providerId !== undefined && providerId !== null && String(providerId).trim() !== '') {
            const p = parseInt(String(providerId).trim(), 10);
            if (!Number.isNaN(p)) parsedProviderId = p;
        }

        let parsedStatus: boolean | undefined;
        if (status === undefined || status === null) {
            // default to true when not provided
            parsedStatus = true;
        } else if (typeof status === 'boolean') {
            parsedStatus = status;
        } else {
            const s = String(status).toLowerCase().trim();
            parsedStatus = s === 'false' ? false : true;
        }


        // Build create payload only with present values
        const simData: any = {
            simNumber: parsedSimNumber,
            adminUserId: adminId,
        };
        if (parsedImsi !== undefined) simData.imsi = parsedImsi;
        if (parsedProviderId !== undefined) simData.providerId = parsedProviderId;
        if (iccid !== undefined && iccid !== null && String(iccid).trim() !== '') simData.iccid = String(iccid).trim();
        if (parsedStatus !== undefined) simData.status = parsedStatus;

        // Create the new SIM card
        const newSim = await this.primaryDb.sim.create({ data: simData });

        return { msg: 'SIM card created successfully', sim: newSim };
    }

    async updateSimCard(simId: number, adminId: number, simCardDto: SimCardDto) {
        const { simNumber, imsi, providerId, iccid, status } = simCardDto;
        const sim = await this.primaryDb.sim.findFirst({
            where: { id: simId, adminUserId: adminId }
        });

        if (!sim) {
            return { msg: 'SIM card not found' };
        }

        // Build update payload only with fields provided by the client (partial update)
        const simData: any = {};

        // simNumber (optional): validate non-empty string and uniqueness if changing
        if (simNumber !== undefined) {
            const parsedSimNumber = String(simNumber).trim();
            if (!parsedSimNumber) return { msg: 'Invalid simNumber; expected non-empty string' };
            // check uniqueness (exclude current sim id)
            const other = await this.primaryDb.sim.findFirst({ where: { simNumber: parsedSimNumber as any, adminUserId: adminId, id: { not: simId } } as any });
            if (other) return { msg: 'Another SIM with this number already exists' };
            simData.simNumber = parsedSimNumber;
        }

        // imsi (optional) - keep as string, set to null if explicitly empty
        if (imsi !== undefined) {
            const v = String(imsi).trim();
            // if changing (or setting) to a non-empty IMSI, ensure uniqueness excluding current sim
            if (v !== '') {
                const otherImsi = await this.primaryDb.sim.findFirst({ where: { imsi: v, adminUserId: adminId, id: { not: simId } } as any });
                if (otherImsi) return { msg: 'Another SIM with this IMSI already exists' };
                simData.imsi = v;
            } else {
                simData.imsi = null;
            }
        }

        // providerId (optional) - parse to number or set null
        if (providerId !== undefined) {
            const v = String(providerId).trim();
            if (v === '') {
                simData.providerId = null;
            } else {
                const parsed = parseInt(v, 10);
                simData.providerId = Number.isNaN(parsed) ? null : parsed;
            }
        }

        // iccid (optional) - ensure uniqueness when non-empty and changing
        if (iccid !== undefined) {
            const v = String(iccid).trim();
            if (v !== '') {
                const otherIccid = await this.primaryDb.sim.findFirst({ where: { iccid: v, adminUserId: adminId, id: { not: simId } } as any });
                if (otherIccid) return { msg: 'Another SIM with this ICCID already exists' };
                simData.iccid = v;
            } else {
                simData.iccid = null;
            }
        }

        // status (optional) - change only if provided
        if (status !== undefined) {
            if (status === null) {
                simData.status = true; // treat null as default true
            } else if (typeof status === 'boolean') {
                simData.status = status;
            } else {
                const s = String(status).toLowerCase().trim();
                simData.status = s === 'false' ? false : true;
            }
        }

        // always ensure adminUserId remains unchanged
        simData.adminUserId = adminId;

        // Update the SIM card
        const updatedSim = await this.primaryDb.sim.update({
            where: { id: simId },
            data: simData as any
        });

        return { msg: 'SIM card updated successfully', sim: updatedSim };
    }

    async getSimCardById(simId: number, adminId: number) {
        const sim = await this.primaryDb.sim.findFirst({
            where: { id: simId, adminUserId: adminId },
            include: { provider: true }
        });

        if (!sim) {
            return { msg: 'SIM card not found' };
        }

        return { sim };
    }


    async getVehicles(adminId: number) {
        return this.primaryDb.vehicle.findMany({
            where: { addedByUserId: adminId },
        });

    }

    async createVehicle(adminId: number, createVehicleDto: CreateVehicleDto) {
        const { name, vin, plateNumber, deviceId, vehicleTypeId, primaryUserId, planId } = createVehicleDto;

        // validate VIN uniqueness for this admin
        const existingVehicle = await this.primaryDb.vehicle.findFirst({ where: { vin, addedByUserId: adminId } });
        if (existingVehicle) return { msg: 'Vehicle with this VIN already exists' };

        const planData = await this.primaryDb.pricingPlan.findUnique({ where: { id: parseInt(String(planId), 10) } });
        const primaryExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        const secondaryExpiry = planData?.durationDays ? new Date(Date.now() + planData.durationDays * 24 * 60 * 60 * 1000) : null;

        const UserDetails = await this.primaryDb.user.findUnique({ where: { uid: adminId }, include: { address: true } });
        const countyCode = UserDetails?.address?.countryCode ?? "IN";
        const the_zone = (Country.getCountryByCode(countyCode)?.timezones?.[0]?.gmtOffsetName ?? 'UTC+5:00').replace(/^UTC\s*/i, '').trim();

        // parse possible string ids coming from client
        const deviceIdNum = deviceId ? parseInt(String(deviceId), 10) : undefined;
        const vehicleTypeIdNum = vehicleTypeId ? parseInt(String(vehicleTypeId), 10) : undefined;
        const primaryUserIdNum = primaryUserId ? parseInt(String(primaryUserId), 10) : undefined;
        const planIdNum = planId ? parseInt(String(planId), 10) : undefined;

        // build create payload with nested connect relations for Prisma
        const vehiclePayload: any = {
            name: name ?? null,
            vin: vin ? vin : null,
            plateNumber: plateNumber ? plateNumber : null,
            primaryExpiry: primaryExpiry,
            secondaryExpiry: secondaryExpiry,
            gmtOffset: the_zone,
            createdAt: new Date(),
            isActive: true,
            // always connect the user who added the vehicle
            userAddedBy: { connect: { uid: adminId } },
        };

        if (deviceIdNum) vehiclePayload.device = { connect: { id: deviceIdNum } };
        if (vehicleTypeIdNum) vehiclePayload.vehicleType = { connect: { id: vehicleTypeIdNum } };
        if (primaryUserIdNum) vehiclePayload.userPrimary = { connect: { uid: primaryUserIdNum } };
        if (planIdNum) vehiclePayload.plan = { connect: { id: planIdNum } };

        const newVehicle = await this.primaryDb.vehicle.create({ data: vehiclePayload });

        await this.primaryDb.userVehicleAssignment.create({
            data: {
                userId: primaryUserIdNum!,
                vehicleId: newVehicle.id,
            }
        });

        return { msg: 'Vehicle created successfully', vehicle: newVehicle };

    }

    async updateVehicle(vehicleId: number, adminId: number, updateVehicleDto: UpdateVehicleDto) {
        const { name, vin, plateNumber, deviceid, vehicleTypeId, planid, gmtOffset, isActive, vehicleMeta } = updateVehicleDto;
        const vehicle = await this.primaryDb.vehicle.findFirst({
            where: { id: vehicleId, addedByUserId: adminId }
        });

        if (!vehicle) {
            return { msg: 'Vehicle not found' };
        }

        // Parse and normalize incoming values
        let parsedIsActive: boolean | undefined = undefined;
        if (isActive !== undefined) {
            if (typeof isActive === 'boolean') {
                parsedIsActive = isActive;
            } else {
                const s = String(isActive).toLowerCase().trim();
                parsedIsActive = s === 'true' || s === '1';
            }
        }

        let parsedVehicleMeta: any = undefined;
        if (vehicleMeta !== undefined) {
            if (typeof vehicleMeta === 'string') {
                try {
                    parsedVehicleMeta = JSON.parse(vehicleMeta);
                } catch {
                    parsedVehicleMeta = vehicleMeta; // keep as string if parse fails
                }
            } else {
                parsedVehicleMeta = vehicleMeta;
            }
        }

        // Build update data object with only provided fields
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (vin !== undefined) updateData.vin = vin;
        if (plateNumber !== undefined) updateData.plateNumber = plateNumber;
        if (gmtOffset !== undefined) updateData.gmtOffset = gmtOffset;
        if (parsedIsActive !== undefined) updateData.isActive = parsedIsActive;
        if (parsedVehicleMeta !== undefined) updateData.vehicleMeta = parsedVehicleMeta;

        // Handle relations with validation and connect/disconnect
        if (deviceid !== undefined) {
            const did = Number(deviceid);
            if (did === 0) {
                // treat 0 as a request to disconnect device
                updateData.device = { disconnect: true };
            } else {
                const deviceExists = await this.primaryDb.device.findFirst({ where: { id: did, adminUserId: adminId } });
                if (!deviceExists) {
                    return { msg: 'Device not found or not belongs to admin' };
                }
                updateData.device = { connect: { id: did } };
            }
        }

        if (vehicleTypeId !== undefined) {
            const vtid = Number(vehicleTypeId);
            const vtExists = await this.primaryDb.vehicleType.findFirst({ where: { id: vtid } });
            if (!vtExists) {
                return { msg: 'Vehicle type not found' };
            }
            updateData.vehicleType = { connect: { id: vtid } };
        }

        if (planid !== undefined) {
            const pid = Number(planid);
            const planExists = await this.primaryDb.pricingPlan.findFirst({ where: { id: pid } });
            if (!planExists) {
                return { msg: 'Pricing plan not found' };
            }
            updateData.plan = { connect: { id: pid } };

            // If plan changed, adjust secondaryExpiry correctly using Date arithmetic
            if (vehicle.planId != pid) {
                const MS_PER_DAY = 24 * 60 * 60 * 1000;
                if (vehicle.planId) {
                    const previousPlanData = await this.primaryDb.pricingPlan.findUnique({ where: { id: vehicle.planId } });
                    const currentPlanData = await this.primaryDb.pricingPlan.findUnique({ where: { id: pid } });
                    const prevDays = previousPlanData?.durationDays ?? 0;
                    const currDays = currentPlanData?.durationDays ?? 0;

                    const baseDate = vehicle.secondaryExpiry ? new Date(vehicle.secondaryExpiry) : new Date();
                    const diffMs = (currDays - prevDays) * MS_PER_DAY;
                    updateData.secondaryExpiry = new Date(baseDate.getTime() + diffMs);
                } else {
                    // No previous plan: set secondaryExpiry from now using the new plan duration
                    const currentPlanData = await this.primaryDb.pricingPlan.findUnique({ where: { id: pid } });
                    const currDays = currentPlanData?.durationDays ?? 0;
                    updateData.secondaryExpiry = new Date(Date.now() + currDays * MS_PER_DAY);
                }
            }

        }

        // Update vehicle properties
        const updatedVehicle = await this.primaryDb.vehicle.update({
            where: { id: vehicleId },
            data: updateData
        });

        return { msg: 'Vehicle updated successfully', vehicle: updatedVehicle };
    }

    async getVehicleById(vehicleId: number, adminId: number) {
        const vehicle = await this.primaryDb.vehicle.findFirst({
            where: { id: vehicleId, addedByUserId: adminId },
            include: {
                device: true,
                vehicleType: true,
                plan: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        currency: true,
                        durationDays: true,
                        features: true,
                    }
                }
            }
        });


        if (!vehicle) {
            return { msg: 'Vehicle not found' };
        }
        return { "message": "Vehicle Details successfully retrieved", vehicle };
    }


    async createDriver(adminId: number, createDriverDto: CreateDriverDto) {
        const { name, mobilePrefix, mobile, email, primaryUserid, username, password, countryCode, stateCode, city, address, pincode } = createDriverDto;
        const driverExists = await this.primaryDb.driver.findFirst({
            where: {
                OR: [

                    { username: username },
                    { email: email },
                    { mobile: mobile }
                ]
            }
        });
        if (driverExists) {
            return { msg: 'Driver with this username or email or mobile already exists' };
        }

        const countryName = countryCode ? Country.getCountryByCode(countryCode)?.name ?? countryCode : '';
        const stateName = (stateCode && countryCode)
            ? (State.getStateByCodeAndCountry(String(stateCode).toUpperCase(), String(countryCode).toUpperCase())?.name ?? stateCode)
            : '';
        const fullAddress = `${address || ''}, ${city || ''}${stateName ? `, ${stateName}` : ''}${countryName ? `, ${countryName}` : ''}${pincode ? `, ${pincode}` : ''}`;

        const Currentaddress = await this.primaryDb.address.create({
            data: {
                addressLine: address || '',
                countryCode: countryCode,
                stateCode: stateCode || '',
                cityId: city || '',
                pincode: pincode ? pincode : null,
                fullAddress
            }
        });

        const hashedPassword = await bcrypt.hash(password, 12);
        const primaryUserIdNum = parseInt(String(primaryUserid), 10);

        const newDriver = await this.primaryDb.driver.create({
            data: {
                name,
                mobileCode: mobilePrefix,
                mobile: mobile,
                email: email || '',
                username,
                passwordHash: hashedPassword,
                primaryUserId: primaryUserIdNum,
                createdByUserId: adminId,
                addressId: Currentaddress.id,
                createdAt: new Date(),
                isActive: true,
                isVerified: false,

            }
        });

        return { msg: 'Driver created successfully', driver: newDriver };




    }


    async getDrivers(adminId: number) {
        return this.primaryDb.driver.findMany({
            where: { createdByUserId: adminId },
            include: { address: true }
        });
    }
    async getDriverById(driverId: number, adminId: number) {
        const driver = await this.primaryDb.driver.findFirst({
            where: { id: driverId, createdByUserId: adminId },
            include: { address: true }
        });
        if (!driver) {
            return { msg: 'Driver not found' };
        }
        return { "message": "Driver Details successfully retrieved", driver };
    }

    async updateDriver(driverId: number, adminId: number, updateDriverDto: UpdateDriverDto) {
        const { name, mobilePrefix, mobile, email, username, password, countryCode, StateCode, city, address, pincode, isactive, attributes } = updateDriverDto;
        const driver = await this.primaryDb.driver.findFirst({
            where: { id: driverId, createdByUserId: adminId },
            include: { address: true }
        });
        if (!driver) {
            return { msg: 'Driver not found' };
        }

        // Check for conflicts on username/email/mobile if changing
        if (username !== undefined && username !== driver.username) {
            const usernameExists = await this.primaryDb.driver.findFirst({
                where: { username, id: { not: driverId } }
            });
            if (usernameExists) {
                return { msg: 'Username already exists' };
            }
        }

        if (email !== undefined && email !== driver.email) {
            const emailExists = await this.primaryDb.driver.findFirst({
                where: { email, id: { not: driverId } }
            });
            if (emailExists) {
                return { msg: 'Email already exists' };
            }
        }

        const combinedMobile = mobilePrefix && mobile ? `${mobilePrefix}${mobile}` : mobile;
        if (combinedMobile !== undefined && combinedMobile !== driver.mobile) {
            const mobileExists = await this.primaryDb.driver.findFirst({
                where: { mobile: combinedMobile, id: { not: driverId } }
            });
            if (mobileExists) {
                return { msg: 'Mobile number already exists' };
            }
        }

        // Handle address update if any address fields provided
        if (countryCode || StateCode || city || address || pincode) {
            const countryName = countryCode ? Country.getCountryByCode(countryCode)?.name ?? countryCode : '';
            const stateName = (StateCode && countryCode)
                ? (State.getStateByCodeAndCountry(String(StateCode).toUpperCase(), String(countryCode).toUpperCase())?.name ?? StateCode)
                : '';
            const fullAddress = `${address || driver.address?.addressLine || ''}, ${city || driver.address?.cityId || ''}${stateName ? `, ${stateName}` : ''}${countryName ? `, ${countryName}` : ''}${pincode ? `, ${pincode}` : ''}`;

            const addressData: any = {
                addressLine: address !== undefined ? address : driver.address?.addressLine || '',
                countryCode: countryCode !== undefined ? countryCode : driver.address?.countryCode || '',
                stateCode: StateCode !== undefined ? StateCode : driver.address?.stateCode || '',
                cityId: city !== undefined ? city : driver.address?.cityId || '',
                pincode: pincode !== undefined ? pincode : driver.address?.pincode,
                fullAddress
            };
            await this.UpdateAddress(driver.addressId!, addressData);
        }

        // Build driver update object with only provided fields
        const driverUpdateData: any = {};
        if (name !== undefined) driverUpdateData.name = name;
        if (username !== undefined) driverUpdateData.username = username;
        if (email !== undefined) driverUpdateData.email = email;
        if (combinedMobile !== undefined) {
            driverUpdateData.mobile = combinedMobile;
        }
        if (mobilePrefix !== undefined) {
            driverUpdateData.mobileCode = mobilePrefix;
        }
        if (password !== undefined) {
            driverUpdateData.passwordHash = await bcrypt.hash(password, 12);
        }
        if (isactive !== undefined) {
            const s = String(isactive).toLowerCase().trim();
            driverUpdateData.isActive = s === 'true' || s === '1';
        }
        if (attributes !== undefined) {
            driverUpdateData.attributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
        }

        // Update driver if there are changes
        if (Object.keys(driverUpdateData).length > 0) {
            await this.primaryDb.driver.update({
                where: { id: driverId },
                data: driverUpdateData
            });
        }

        const updatedDriver = await this.primaryDb.driver.findUnique({ where: { id: driverId }, include: { address: true } });

        return { msg: 'Driver updated successfully', driver: updatedDriver };
    }

    async UpdateAddress(addressId: number, addressData: any) {
        await this.primaryDb.address.update({
            where: { id: addressId },
            data: addressData
        });
    }

    async updateuserPassword(userId: number, adminId: number, newPassword: string) {
        // Find the user and verify it belongs to the admin
        const user = await this.primaryDb.user.findFirst({
            where: { uid: userId, parentUserId: adminId }
        });

        if (!user) {
            return { msg: 'User not found or not belongs to admin' };
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update the user's password
        await this.primaryDb.user.update({
            where: { uid: userId },
            data: {
                passwordHash: hashedPassword,
                updatedAt: new Date()
            }
        });

        return { msg: 'Password updated successfully' };
    }

    async deleteDriver(driverId: number, adminId: number) {
        const driver = await this.primaryDb.driver.findFirst({
            where: { id: driverId, createdByUserId: adminId }
        });
        if (!driver) {
            return { msg: 'Driver not found or access denied' };
        }

        await this.primaryDb.driver.delete({
            where: { id: driverId }
        });
        return { msg: 'Driver deleted successfully' };
    }

    async updateDriverPassword(driverId: number, adminId: number, newPassword: string) {
        // Find the driver and verify it belongs to the admin
        const driver = await this.primaryDb.driver.findFirst({
            where: { id: driverId, createdByUserId: adminId }
        });
        if (!driver) {
            return { msg: 'Driver not found or access denied' };
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        // Update the driver's password
        await this.primaryDb.driver.update({
            where: { id: driverId },
            data: { passwordHash: hashedPassword }
        });
        return { msg: 'Driver password updated successfully' };
    }

    async assignVehicleToUser(vehicleId: number, userId: number, adminId: number, action: string) {
        const vehicle = await this.primaryDb.vehicle.findFirst({
            where: { id: vehicleId, addedByUserId: adminId }
        });

        if (!vehicle) {
            return { msg: 'Vehicle not found or access denied' };
        }

        //UserVehicleAssignment
        if (action.toUpperCase() === 'ASSIGN') {
            const existingAssignment = await this.primaryDb.userVehicleAssignment.findFirst({
                where: { vehicleId, userId }
            });

            if (existingAssignment) {
                return { msg: 'Vehicle is already assigned to a user' };
            }

            await this.primaryDb.userVehicleAssignment.create({
                data: {
                    userId,
                    vehicleId
                }
            });

            return { msg: 'Vehicle assigned to user successfully' };
        }
        if (action.toUpperCase() === 'UNASSIGN') {
            const existingAssignment = await this.primaryDb.userVehicleAssignment.findFirst({
                where: { vehicleId, userId }
            });

            if (!existingAssignment) {
                return { msg: 'Vehicle is not assigned to this user' };
            }

            await this.primaryDb.userVehicleAssignment.delete({
                where: { id: existingAssignment.id }
            });

            return { msg: 'Vehicle unassigned from user successfully' };
        }
        return { msg: 'Invalid action. Use "assign" or "unassign".' };
    }

    async getUserVehicles(userId: number, adminId: number) {
        // Verify the user belongs to the admin
        const user = await this.primaryDb.user.findFirst({
            where: { uid: userId, parentUserId: adminId }
        });

        if (!user) {
            return { msg: 'User not found or access denied' };
        }

        // Get the vehicles assigned to the user
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

    async getVehicleUsers(vehicleId: number, adminId: number) {
        // Verify the vehicle belongs to the admin
        const vehicle = await this.primaryDb.vehicle.findFirst({
            where: { id: vehicleId, addedByUserId: adminId }
        });

        if (!vehicle) {
            return { msg: 'Vehicle not found or access denied' };
        }

        // Get the users assigned to the vehicle
        const users = await this.primaryDb.userVehicleAssignment.findMany({
            where: { vehicleId: vehicleId },
            select: {
                user: {
                    select: {
                        uid: true,
                        name: true,
                        mobilePrefix: true,
                        mobileNumber: true,
                        email: true,
                        username: true,
                        address: {
                            select: { fullAddress: true }
                        }
                    }
                }
            }
        });

        return users;
    }

    async assignDriverToUser(driverId: number, userId: number, adminId: number, action: string) {
        const driver = await this.primaryDb.driver.findFirst({
            where: { id: driverId, createdByUserId: adminId }
        });
        if (!driver) {
            return { msg: 'Driver not found or access denied' };
        }
        //UserDriverAssignment
        if (action.toUpperCase() === 'ASSIGN') {
            const existingAssignment = await this.primaryDb.driverUser.findFirst({
                where: { driverId, userId }
            });

            if (existingAssignment) {
                return { msg: 'Driver is already assigned to this user' };
            }

            await this.primaryDb.driverUser.create({
                data: {
                    userId,
                    driverId
                }
            });

            return { msg: 'Driver assigned to user successfully' };
        }
        if (action.toUpperCase() === 'UNASSIGN') {
            const existingAssignment = await this.primaryDb.driverUser.findFirst({
                where: { driverId, userId }
            });

            if (!existingAssignment) {
                return { msg: 'Driver is not assigned to this user' };
            }

            await this.primaryDb.driverUser.delete({
                where: { id: existingAssignment.id }
            });

            return { msg: 'Driver unassigned from user successfully' };
        }
        return { msg: 'Invalid action. Use "assign" or "unassign".' };
    }

    async updateCompanyInfo(userid: number, adminId: number, companyInfoDto: UpdateCompanyDto) {

        if (userid != adminId) {
            const user = await this.primaryDb.user.findFirst({
                where: { uid: userid, parentUserId: adminId }
            });

            if (!user) {
                return { msg: 'User not found or access denied' };
            }
        }

        const currentcompanydata = await this.primaryDb.company.findFirst({
            where: { userId: userid }
        });
        if (!currentcompanydata) {
            return { msg: 'Company information not found for this user' };
        }

        const { name, websiteUrl, customDomain, socialLinks, primaryColor, secondaryColor, navbarColor } = companyInfoDto;
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl;
        if (customDomain !== undefined) updateData.customDomain = customDomain;
        if (socialLinks !== undefined) updateData.socialLinks = socialLinks;
        if (primaryColor !== undefined) updateData.primaryColor = primaryColor;
        if (secondaryColor !== undefined) updateData.secondaryColor = secondaryColor;
        if (navbarColor !== undefined) updateData.navbarColor = navbarColor;

        const updatedCompany = await this.primaryDb.company.update({
            where: { id: currentcompanydata.id },
            data: { ...updateData }
        });

        return { msg: 'Company information updated successfully', company: updatedCompany };
    }

    async getSmtpConfig(adminId: number) {
        const smtpConfig = await this.primaryDb.smtpSetting.findFirst({
            where: { userId: adminId }
        });
        return { smtpConfig };
    }

    async updateSmtpConfig(adminId: number, smtpConfigDto: UpdateSmtpConfigDto) {
        const smtpConfig = await this.primaryDb.smtpSetting.findFirst({
            where: { userId: adminId }
        });

        if (!smtpConfig) {
            const { senderName, host, port, email, type, username, password, replyTo, isActive } = smtpConfigDto;

            // Parse and validate port
            let parsedPort = 587; // default port
            if (port !== undefined) {
                parsedPort = typeof port === 'string' ? parseInt(port, 10) : port;
                if (Number.isNaN(parsedPort) || parsedPort <= 0) {
                    return { msg: 'Invalid port number; expected a positive integer' };
                }
            }

            // Parse isActive boolean
            let parsedIsActive = false; // default
            if (isActive !== undefined) {
                if (typeof isActive === 'boolean') {
                    parsedIsActive = isActive;
                } else {
                    const s = String(isActive).toLowerCase().trim();
                    parsedIsActive = s === 'true' || s === '1';
                }
            }

            const newSmtpConfig = await this.primaryDb.smtpSetting.create({
                data: {
                    userId: adminId,
                    senderName: senderName ? senderName : 'No Reply',
                    host: host ? host : '',
                    port: parsedPort,
                    email: email ? email : 'no-reply@example.com',
                    type: type ? type : 'NONE',
                    username: username ? username : '',
                    password: password ? password : '',
                    replyTo: replyTo ? replyTo : '',
                    isActive: parsedIsActive,
                }
            });
            return { msg: 'SMTP configuration created successfully', smtpConfig: newSmtpConfig };
        } else {
            const { senderName, host, port, email, type, username, password, replyTo, isActive } = smtpConfigDto;
            const updateData: any = {};
            if (senderName !== undefined) updateData.senderName = senderName;
            if (host !== undefined) updateData.host = host;
            if (port !== undefined) {
                const parsedPort = typeof port === 'string' ? parseInt(port, 10) : port;
                if (Number.isNaN(parsedPort) || parsedPort <= 0) {
                    return { msg: 'Invalid port number; expected a positive integer' };
                }
                updateData.port = parsedPort;
            }
            if (email !== undefined) updateData.email = email;
            if (type !== undefined) updateData.type = type;
            if (username !== undefined) updateData.username = username;
            if (password !== undefined) updateData.password = password;
            if (replyTo !== undefined) updateData.replyTo = replyTo;
            if (isActive !== undefined) {
                if (typeof isActive === 'boolean') {
                    updateData.isActive = isActive;
                } else {
                    const s = String(isActive).toLowerCase().trim();
                    updateData.isActive = s === 'true' || s === '1';
                }
            }

            const updatedSmtpConfig = await this.primaryDb.smtpSetting.update({
                where: { id: smtpConfig.id },
                data: { ...updateData }
            });

            return { msg: 'SMTP configuration updated successfully', smtpConfig: updatedSmtpConfig };

        }


    }

    async updateAdminPassword(adminId: number, currentPassword: string, newPassword: string) {
        // Find the admin user
        const adminUser = await this.primaryDb.user.findUnique({
            where: { uid: adminId }
        });

        if (!adminUser) {
            return { msg: 'Admin user not found' };
        }

        // Verify current password
        const isPasswordValid = await this.verifyPassword(currentPassword, adminUser.passwordHash);
        if (!isPasswordValid) {
            return { msg: 'Current password is incorrect' };
        }

        // Update password
        const hashedNewPassword = await this.hashPassword(newPassword);
        await this.primaryDb.user.update({
            where: { uid: adminId },
            data: { passwordHash: hashedNewPassword }
        });

        return {  msg: 'Password updated successfully' };
    }

    async verifyPassword(plainText: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainText, hashedPassword);
    }
    async hashPassword(plainText: string): Promise<string> {
        return bcrypt.hash(plainText, 12);
    }


    async uploadFile(req: FastifyRequest, adminId: number): Promise<any> {
        console.log('Admin uploadFile called with admin ID:', adminId);
        console.log('Request method:', req.method);
        console.log('Request URL:', req.url);
        console.log('Content-Type:', req.headers['content-type']);
        
        try {
            const admin = await this.primaryDb.user.findUnique({
                where: { uid: adminId }
            }); 
            if (!admin) {
                return { message: 'Admin not found' };
            }

            console.log('Admin found, proceeding with multipart parsing...');
            const { type, filePart } = await this.parseMultipart(req);
            
            console.log('Multipart parsed successfully, type:', type);
            const mimetype = (filePart as any).mimetype || 'application/octet-stream';
            console.log('File mimetype:', mimetype);
            
            this.validateMime(type, mimetype);
            console.log('MIME validation passed');
            
            const url = await this.saveToDisk(filePart, adminId, type);
            console.log('File saved to:', url);
            
            const result = await this.applyUpdate(adminId, type, url);
            console.log('Database update completed:', result);
            
            return result;
        } catch (error) {
            console.error('Upload error:', error);
            console.error('Error stack:', error.stack);
            return { 
                message: 'Upload failed', 
                error: error.message 
            };
        }
    }

    async parseMultipart(req: FastifyRequest): Promise<{ type: UploadType, filePart: any }> {
        console.log('parseMultipart called, req.isMultipart():', req.isMultipart?.());
        
        let filePart: any = null;
        let type: UploadType | null = null;

        try {
            // Check if the request has multipart data available
            if (!req.isMultipart || !req.isMultipart()) {
                throw new Error('Request is not multipart');
            }

            console.log('Starting multipart parsing...');

            // Process multipart parts using async iterator
            const parts = req.parts();
            let partCount = 0;
            const maxParts = 10; // Safety limit
            
            try {
                for await (const part of parts) {
                    partCount++;
                    console.log(`Processing part ${partCount}:`, {
                        type: part.type,
                        fieldname: part.fieldname
                    });

                    if (partCount > maxParts) {
                        console.log('Max parts limit reached, breaking loop');
                        break;
                    }

                    if (part.type === 'file') {
                        if (filePart) {
                            throw new Error('Only one file allowed');
                        }
                        filePart = part;
                        console.log('File part found:', {
                            filename: (part as any).filename,
                            mimetype: (part as any).mimetype,
                            encoding: (part as any).encoding
                        });
                        
                        console.log('File part stored for processing');
                        
                    } else if (part.type === 'field' && part.fieldname === 'type') {
                        // For field parts, the value should be directly accessible
                        const rawVal = (part as any).value;
                        console.log('Raw type value:', rawVal, typeof rawVal);
                        
                        const val = rawVal ? String(rawVal).trim().replace(/^"|"$/g, '') : undefined;
                        
                        console.log('Processed type value:', val);
                        
                        if (val && ['PROFILE', 'DARKLOGO', 'LIGHTLOGO', 'FAVICON'].includes(val)) {
                            type = val as UploadType;
                            console.log('Valid type set:', type);
                        } else {
                            throw new Error(`Invalid upload type: ${val}. Must be one of: PROFILE, DARKLOGO, LIGHTLOGO, FAVICON`);
                        }
                    } else {
                        // For any other field parts, just log and continue
                        console.log('Skipping unknown part:', part.fieldname, 'type:', part.type);
                    }
                    
                    console.log(`Part ${partCount} processed successfully`);
                    
                    // If we have both required parts, break early to avoid hanging
                    if (filePart && type) {
                        console.log('Both required parts found, breaking early to avoid hanging');
                        break;
                    }
                }
                
                console.log('For-await loop completed naturally');
            } catch (loopError) {
                console.log('Loop ended with error (this might be normal):', loopError.message);
                // This might be normal - the iterator might throw when it's done
            }

            console.log(`Completed processing ${partCount} parts. File part:`, !!filePart, 'Type:', type);

            // Better error messages
            if (!type) {
                throw new Error('Type field is required. Please include a "type" field with values: PROFILE, DARKLOGO, LIGHTLOGO, or FAVICON');
            }
            
            if (!filePart) {
                throw new Error('File field is required. Please include a "file" field with an image file');
            }

            console.log('parseMultipart completed successfully');
            return { type, filePart };
        } catch (error) {
            console.error('Multipart parsing error:', error);
            console.error('Error stack:', error.stack);
            
            // Provide more helpful error message
            if (error.message.includes('File field is required')) {
                throw new Error('File field is required. Make sure you are sending a multipart form with both "type" and "file" fields');
            }
            
            throw new Error(`Multipart parsing failed: ${error.message}`);
        }
    }

    validateMime(type: UploadType, mimetype: string) {
        console.log('validateMime called with:', { type, mimetype });
        
        const imageMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'];
        
        if (!imageMimes.includes(mimetype)) {
            console.log('Invalid mimetype detected:', mimetype);
            throw new Error('Invalid file type. Only image files are allowed.');
        }
        
        if (type === 'FAVICON' && !['image/x-icon', 'image/vnd.microsoft.icon', 'image/png'].includes(mimetype)) {
            console.log('Invalid favicon format:', { type, mimetype });
            throw new Error('Favicon must be .ico or .png format.');
        }
        
        console.log('MIME validation passed');
    }

    async saveToDisk(filePart: any, adminId: number, type: UploadType): Promise<string> {
        const path = require('path');
        const fs = require('fs');
        const { pipeline } = require('stream/promises');
        
        console.log('saveToDisk called with:', {
            adminId,
            type,
            filePartType: typeof filePart,
            hasFile: !!(filePart.file),
            filename: filePart.filename,
            mimetype: filePart.mimetype
        });
        
        // Use the same users directory structure as superadmin
        const uploadsRoot = path.join(process.cwd(), 'uploads', 'users', adminId.toString());
        console.log('Upload directory:', uploadsRoot);
        
        if (!fs.existsSync(uploadsRoot)) {
            console.log('Creating upload directory...');
            fs.mkdirSync(uploadsRoot, { recursive: true });
        }
        
        // Get file extension from filename or mimetype
        const filename = filePart.filename || 'file';
        const ext = path.extname(filename) || this.getExtensionFromMimetype(filePart.mimetype);
        const newFilename = `${type.toLowerCase()}${ext}`;
        const filepath = path.join(uploadsRoot, newFilename);
        
        console.log('File details:', {
            originalFilename: filename,
            newFilename,
            filepath,
            mimetype: filePart.mimetype
        });
        
        try {
            console.log('Starting file write...');
            // For Fastify multipart, the file stream is directly on the part object
            let fileStream = filePart.file || filePart;
            
            console.log('Using stream:', {
                streamType: typeof fileStream,
                hasPipe: typeof fileStream.pipe === 'function',
                isReadable: fileStream.readable !== undefined ? fileStream.readable : 'unknown'
            });
            
            await pipeline(fileStream, fs.createWriteStream(filepath));
            console.log('File written successfully to:', filepath);
        } catch (error) {
            console.error('File write error:', error);
            throw new Error(`Failed to save file: ${error.message}`);
        }
        
        const urlPath = `/uploads/users/${adminId}/${newFilename}`;
        console.log('Returning URL path:', urlPath);
        return urlPath;
    }

    private getExtensionFromMimetype(mimetype: string): string {
        const mimeMap: Record<string, string> = {
            'image/jpeg': '.jpg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
            'image/svg+xml': '.svg',
            'image/x-icon': '.ico',
            'image/vnd.microsoft.icon': '.ico'
        };
        return mimeMap[mimetype] || '.jpg';
    }

    async applyUpdate(adminId: number, type: UploadType, url: string): Promise<any> {
        const updateData: any = {};
        if (type === 'PROFILE') {
            // Update admin user profile image
            updateData.profileUrl = url;
        } else {
            // Update company images (logo, favicon)
            const company = await this.primaryDb.company.findFirst({ where: { userId: adminId } });
            if (!company) {
                throw new Error('Company config not found for this Admin');
            }
            if (type === 'DARKLOGO') {
                updateData.logoDarkUrl = url;
            } else if (type === 'LIGHTLOGO') {
                updateData.logoLightUrl = url;
            } else if (type === 'FAVICON') {
                updateData.faviconUrl = url;
            }
            await this.primaryDb.company.update({
                where: { id: company.id },
                data: updateData,
            });
            return { message: `${type} updated successfully`, url };
        }
        
        // Update admin user profile
        await this.primaryDb.user.update({
            where: { uid: adminId },
            data: updateData,
        });
        return { message: 'Profile image updated successfully', url };
    }

}
