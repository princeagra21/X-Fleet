import { Injectable } from '@nestjs/common';
import { PrimaryDatabaseService } from 'src/database/primary-database.service';
import { CreateUserDto } from './dto/createuser.dto';
import { City, Country, State } from 'country-state-city';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateDeviceDto } from './dto/createdevice.dto';
import { SimCardDto } from './dto/sim.dto';
import { CreateVehicleDto } from './dto/createvehicle.dto';

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

    async updateUser(userid: number, userdto: UpdateUserDto) {
        const { roleId, name, email, mobilePrefix, mobileNumber, username, password, companyName, address, countryCode, stateCode, city, pincode } = userdto;
        const userexists = await this.primaryDb.user.findFirst({
            where: {
                OR: [
                    { uid: userid }
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
}