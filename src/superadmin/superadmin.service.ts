import { Injectable, Post } from '@nestjs/common';
import { PrimaryDatabaseService } from 'src/database/primary-database.service';
import { CreateAdminDto } from './dto/admin.dto';
import { Country, State } from 'country-state-city';
import * as bcrypt from 'bcryptjs';
import { AdminPasswordUpdateDto } from './dto/adminpasswordupdate.dto';
import { UpdateAdminDto } from './dto/updateadmin.dto';
import { CreditsUpdateDto } from './dto/creditassign.dto';
import { SmtpSettingDto } from './dto/smtp.dto';
import { CompanyDto } from './dto/company.dto';
import type { FastifyRequest } from 'fastify';
import { UploadType } from './dto/upload.types';


type AnyObj = Record<string, unknown>;

/** Utility: remove undefined keys for clean partial update */
function stripUndefined<T extends AnyObj>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== undefined),
    ) as Partial<T>;
}

@Injectable()
export class SuperadminService {
    constructor(private readonly primaryDb: PrimaryDatabaseService) { }

    private readonly Super_Admin_Id = 1; // Assuming the Super Admin has a fixed user ID of 1

    async createAdmin(AdminDto: CreateAdminDto): Promise<any> {
        const { name, email, mobilePrefix, mobileNumber, username, password, companyName, address, country, state, city, pincode, credits } = AdminDto;
        const existingAdmin = await this.primaryDb.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email },
                ],
            },
        });

        if (existingAdmin) {
            return { message: 'Admin with this username or email already exists' };
        }

        const countryName = Country.getCountryByCode(country)?.name ?? country;
        const stateName = State.getStateByCodeAndCountry(state, country)?.name ?? state;
        const fullAddress = `${address}, ${city}, ${stateName}, ${countryName}, ${pincode ? pincode : ''}`;

        const Currentaddress = await this.primaryDb.address.create({
            data: {
                addressLine: address,
                countryCode: country,
                stateCode: state,
                cityId: city,
                pincode: pincode ? pincode : null,
                fullAddress
            }
        });

        const hashedPassword = await bcrypt.hash(password, 12);

        const CurrentAdmin = await this.primaryDb.user.create({
            data: {
                loginType: 'ADMIN',
                name,
                email: email ? email : "",
                isEmailVerified: false,
                mobilePrefix,
                mobileNumber,
                username,
                passwordHash: hashedPassword,
                credits: credits ? parseInt(credits) : 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                roleId: 1,
                parentUserId: this.Super_Admin_Id,
                addressId: Currentaddress.id,

            }
        });

        const userId = CurrentAdmin.uid;

        const company = await this.primaryDb.company.create({
            data: {
                userId,
                name: companyName,
            }
        });

        if (credits && parseInt(credits) > 0) {
            await this.primaryDb.creditLog.create({
                data: {
                    adminUserId: userId,
                    credits: parseInt(credits),
                    activity: 'ASSIGN',
                    createdAt: new Date(),
                },
            });
        }

        const currency = Country.getCountryByCode(country)?.currency ?? 'USD';
        await this.primaryDb.pricingPlan.create({
            data: {
                adminUserId: userId,
                name: 'Default Plan',
                price: 120,
                currency: currency,
                durationDays: 365,
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true,
            },
        });

        return { message: 'Admin Created Successfully', data: CurrentAdmin };


    }


    getAdminList(): Promise<any> {
        return this.primaryDb.user.findMany({
            where: {
                loginType: 'ADMIN',
                parentUserId: this.Super_Admin_Id,
            },
            select: {
                uid: true,
                name: true,
                email: true,
                mobilePrefix: true,
                mobileNumber: true,
                username: true,
                credits: true,
                createdAt: true,
                updatedAt: true,
                companies: {
                    select: {
                        name: true,
                    },
                },
            },
        });

    }


    async getAdminById(id: number) {

        if (id === undefined || id === null || Number.isNaN(id)) {
            return { message: 'Invalid admin ID' };
        }

        const user = await this.primaryDb.user.findUnique({
            where: { uid: id }, // Int field
            select: {
                uid: true,
                name: true,
                email: true,
                mobilePrefix: true,
                mobileNumber: true,
                username: true,
                credits: true,
                createdAt: true,
                updatedAt: true,
                companies: {
                    select: {
                        name: true,
                        websiteUrl: true,
                        customDomain: true,
                        socialLinks: true,
                    },
                },
                address: {
                    select: {
                        id: true,
                        addressLine: true,
                        countryCode: true,
                        stateCode: true,
                        cityId: true,
                        pincode: true,
                        fullAddress: true,
                    },
                },
            },
        });


        if (!user) return { message: 'Admin not found' };
        return user;
    }

    updateAdminPassword(adminpasswordupdate: AdminPasswordUpdateDto): Promise<any> {
        const { adminid, newpassword } = adminpasswordupdate;
        const hashedPassword = bcrypt.hashSync(newpassword, 12);
        return this.primaryDb.user.update({
            where: { uid: parseInt(adminid) },
            data: { passwordHash: hashedPassword, updatedAt: new Date() },
        });
    }

    async toggleAdminStatus(id: number): Promise<any> {
        const existing = await this.primaryDb.user.findUnique({
            where: { uid: id },
            select: { isActive: true },
        });

        if (!existing) {
            return { message: 'Admin not found' };
        }

        return this.primaryDb.user.update({
            where: { uid: id },
            data: {
                isActive: !existing.isActive,  // toggle here
                updatedAt: new Date(),
            },
        });
    }

    // ...existing code...
    async updateAdmin(id: number, Adminupdatedto: UpdateAdminDto): Promise<any> {
        const { name, email, mobilePrefix, mobileNumber, addressLine, countryCode, stateCode, cityName, pincode } = Adminupdatedto;
        const admin = await this.primaryDb.user.findUnique({
            where: { uid: id }
        });



        if (!admin) {
            return { message: 'Admin not found' };
        }


        if (email) {
            const duplicate = await this.primaryDb.user.findFirst({
                where: {
                    email: { equals: email, mode: 'insensitive' },
                    NOT: { uid: id },
                },
                select: { uid: true },
            });
            if (duplicate) {
                return { message: 'Duplicate email not allowed: already exists' };
            }
        }


        const countryName = Country.getCountryByCode(countryCode)?.name ?? countryCode;
        const stateName = State.getStateByCodeAndCountry(stateCode, countryCode)?.name ?? stateCode;
        const fullAddress = `${addressLine}, ${cityName}, ${stateName}, ${countryName}, ${pincode ? pincode : ''}`;



        if (admin.addressId == null) {
            const newAddress = await this.primaryDb.address.create({
                data: {
                    addressLine,
                    countryCode,
                    stateCode,
                    cityId: cityName,
                    pincode: pincode ? pincode : null,
                    fullAddress,
                },
            });
            admin.addressId = newAddress.id;

        }
        else {
            // addressId is a number here, safe to update
            await this.primaryDb.address.update({
                where: { id: admin.addressId },
                data: {
                    addressLine,
                    countryCode,
                    stateCode,
                    cityId: cityName,
                    pincode: pincode ? pincode : null,
                    fullAddress,
                },
            });
        }

        const Updatedadmin = await this.primaryDb.user.update({
            where: { uid: id },
            data: {
                name,
                email: email ? email : "",
                mobilePrefix,
                mobileNumber,
                addressId: admin.addressId,
                updatedAt: new Date(),
            },
        });

        return { message: 'Admin updated successfully', data: Updatedadmin };


    }

    async assignCredits(id: number, creditsUpdateDto: CreditsUpdateDto): Promise<any> {
        const { credits, activity } = creditsUpdateDto;
        console.log(activity);
        if (activity !== 'ASSIGN' && activity !== 'DEDUCT') {
            return { message: 'Invalid activity. Must be ASSIGN or DEDUCT.' };
        }
        const admin = await this.primaryDb.user.findUnique({
            where: { uid: id }
        });
        if (!admin) {
            return { message: 'Admin not found' };
        }
        let newCredits = admin.credits;
        if (activity === 'ASSIGN') {
            newCredits += parseInt(credits);
        } else if (activity === 'DEDUCT') {
            newCredits -= parseInt(credits);
            if (newCredits < 0) {
                return { message: 'Insufficient credits to deduct' };
            } // Prevent negative credits
        }
        const Updatedadmin = await this.primaryDb.user.update({
            where: { uid: id },
            data: {
                credits: newCredits,
                updatedAt: new Date(),
            },
        });
        await this.primaryDb.creditLog.create({
            data: {
                adminUserId: id,
                credits: parseInt(credits),
                activity: activity === 'ASSIGN' ? 'ASSIGN' : 'DEDUCT',
                createdAt: new Date(),
            },
        });
        return { message: 'Credits updated successfully', data: Updatedadmin };
    }


    async getCreditLogs(id: number): Promise<any> {
        const admin = await this.primaryDb.user.findUnique({
            where: { uid: id }
        });
        if (!admin) {
            return { message: 'Admin not found' };
        }
        return this.primaryDb.creditLog.findMany({
            where: { adminUserId: id },
            orderBy: { createdAt: 'desc' },
        });
    }

    async deleteAdmin(id: number): Promise<any> {
        const admin = await this.primaryDb.user.findUnique({
            where: { uid: id }
        });
        if (!admin) {
            return { message: 'Admin not found' };
        }
        await this.primaryDb.user.delete({
            where: { uid: id }
        });
        return { message: 'Admin deleted successfully' };
    }

    async UpdateConfig(SoftwareConfigDto: any) {
        await this.upsertDefaults();

        const data = stripUndefined(SoftwareConfigDto);
        if (Object.keys(data).length === 0) {
            return this.primaryDb.softwareConfig.findUnique({ where: { id: this.Super_Admin_Id } });
        }

        // Convert string inputs to proper types expected by the database
        const normalized: any = { ...data };

        if (typeof normalized.backupDays === 'string') {
            const parsed = parseInt(normalized.backupDays as string, 10);
            if (!Number.isNaN(parsed)) normalized.backupDays = parsed;
            else delete normalized.backupDays;
        }

        const parseBoolString = (v: any) => {
            if (typeof v === 'string') return v.toLowerCase() === 'true';
            if (typeof v === 'boolean') return v;
            return undefined;
        };

        ['isOpenAiEnabled', 'isWhatsappEnabled', 'isGoogleSsoEnabled', 'isReverseGeoEnabled'].forEach((k) => {
            const val = (normalized as any)[k];
            const parsed = parseBoolString(val);
            if (parsed === undefined) delete (normalized as any)[k];
            else (normalized as any)[k] = parsed;
        });

        // Ensure no empty update
        if (Object.keys(normalized).length === 0) return { message: 'Nothing to update' };

        return this.primaryDb.softwareConfig.update({
            where: { id: this.Super_Admin_Id },
            data: normalized,
        });
    }

    private upsertDefaults() {
        return this.primaryDb.softwareConfig.upsert({
            where: { id: this.Super_Admin_Id },
            update: {}, // no-op if exists
            create: {
                id: this.Super_Admin_Id,
                geocodingPrecision: 'TWO_DIGIT',
                backupDays: 90,
                currencyCode: 'USD',
                isOpenAiEnabled: false,
                isWhatsappEnabled: false,
                isGoogleSsoEnabled: false,
                isReverseGeoEnabled: false,
            } as any,
        });
    }

    async GetConfig() {
        await this.upsertDefaults();
        return this.primaryDb.softwareConfig.findUnique({ where: { id: this.Super_Admin_Id } });
    }

    async getSmtpConfig(userId: number) {
        // userId is not a unique key in the Prisma schema; use findFirst
        const smtp = await this.primaryDb.smtpSetting.findFirst({
            where: { userId }
        });
        if (!smtp) return { message: 'SMTP settings Not Exists for this Admin' };
        return smtp;
    }

    async updateSmtpConfig(userId: number, smtpConfig: SmtpSettingDto) {
        const { senderName, host, port, email, type, username, password, replyTo, isActive } = smtpConfig;
        const existing = await this.primaryDb.smtpSetting.findFirst({
            where: { userId }
        });
        const data = stripUndefined({
            senderName,
            host,
            port: port !== undefined ? port : undefined,
            email,
            type,
            username,
            password,
            replyTo,
            isActive
        });

        // Normalize string inputs from frontend (allow frontend to send strings)
        const normalizedData: any = { ...data };
        if (typeof normalizedData.port === 'string') {
            const p = parseInt(normalizedData.port as string, 10);
            if (!Number.isNaN(p)) normalizedData.port = p;
            else delete normalizedData.port;
        }
        if (typeof normalizedData.isActive === 'string') {
            normalizedData.isActive = normalizedData.isActive.toLowerCase() === 'true';
        }

        if (existing) {
            if (Object.keys(normalizedData).length === 0) return { message: 'Nothing to update' };
            const updated = await this.primaryDb.smtpSetting.update({
                where: { id: existing.id },
                data: normalizedData,
            });
            return { message: 'SMTP settings updated successfully', data: updated };
        } else {  // create new
            // Ensure required fields for SmtpSetting are present
            const required = ['senderName', 'host', 'port', 'email', 'username', 'password'];
            const missing = required.filter((k) => !(k in normalizedData));
            if (missing.length > 0) {
                return { message: `Missing required SMTP fields: ${missing.join(', ')}` };
            }

            const created = await this.primaryDb.smtpSetting.create({
                data: {
                    userId,
                    // Prisma typings for create are strict; cast to any after validation
                    ...(normalizedData as any),
                } as any,
            });
            return { message: 'SMTP settings created successfully', data: created };
        }
    }

    async getCompanyConfig(userId: number) {
        const company = await this.primaryDb.company.findFirst({
            where: { userId }
        });
        if (!company) return { message: 'Company config Not Exists for this Admin' };
        return company;
    }

    async updateCompanyConfig(userId: number, companyDto: CompanyDto) {
        const { name, websiteUrl, customDomain, socialLinks, primaryColor, secondaryColor, navbarColor } = companyDto;
        const existing = await this.primaryDb.company.findFirst({
            where: { userId }
        });
        const data = stripUndefined({
            name,
            websiteUrl,
            customDomain,
            socialLinks,
            primaryColor,
            secondaryColor,
            navbarColor
        });
        if (existing) {
            if (Object.keys(data).length === 0) return { message: 'Nothing to update' };
            const updated = await this.primaryDb.company.update({
                where: { id: existing.id },
                data,
            });
            return { message: 'Company config updated successfully', data: updated };
        } else {  // create new
            if (Object.keys(data).length === 0) {
                return { message: 'No data provided to create company config' };
            }
            const created = await this.primaryDb.company.create({
                data: {
                    userId,
                    ...(data as any),
                } as any,
            });
            return { message: 'Company config created successfully', data: created };
        }
    }

    async handleUpload(req: FastifyRequest, id: number): Promise<any> {
        const admin = await this.primaryDb.user.findUnique({
            where: { uid: id }
        }); 
        if (!admin) {
            return { message: 'Admin not found' };
        }
        const { type, filePart } = await this.parseMultipart(req);
        this.validateMime(type, filePart.mimetype);
        const url = await this.saveToDisk(filePart, id, type);
        // drain file stream if needed (already piped)
        return this.applyUpdate(id, type, url);       

    }

async parseMultipart(req: FastifyRequest): Promise<{ type: UploadType, filePart: any }> {
        // parts() may be available on req or req.raw depending on wrapper/fastify version
        const partsIter = typeof (req as any).parts === 'function'
            ? (req as any).parts()
            : typeof (req as any).raw?.parts === 'function'
                ? (req as any).raw.parts()
                : null;

        let filePart: any = null;
        let type: UploadType | null = null;

        if (partsIter) {
            for await (const part of partsIter) {
                if (part.type === 'file') {
                    if (filePart) {
                        throw new Error('Only one file allowed');
                    }
                    filePart = part;
                } else if (part.type === 'field' && part.fieldname === 'type') {
                    // part.value can be unknown according to types; guard before using
                    const rawVal = typeof (part as any).value === 'string' ? (part as any).value : undefined;
                    const val = rawVal ? rawVal.trim().replace(/^"|"$/g, '') : undefined; // remove surrounding quotes
                    if (val && ['PROFILE', 'DARKLOGO', 'LIGHTLOGO', 'FAVICON'].includes(val)) {
                        type = val as UploadType;
                    } else {
                        throw new Error('Invalid upload type');
                    }
                }
            }
        } else {
            // If parts iterator isn't available, plugin may have attached fields to body
            const body = (req as any).body ?? (req as any).raw?.body ?? null;
            if (!body) {
                throw new Error('Multipart parser not available on request. Ensure @fastify/multipart is registered and used.');
            }
            // try to extract type and file from body/req.raw
            const rawType = typeof body.type === 'string' ? body.type : undefined;
            const val = rawType ? rawType.trim().replace(/^"|"$/g, '') : undefined;
            if (!val || !['PROFILE', 'DARKLOGO', 'LIGHTLOGO', 'FAVICON'].includes(val)) {
                throw new Error('Invalid or missing upload type');
            }
            type = val as UploadType;
            // for file, @fastify/multipart with attachFieldsToBody places files under body.files or body.file depending on config
            filePart = body.file ?? body.files?.file ?? body.files?.[0] ?? null;
        }
        if (!filePart) {
            throw new Error('File is required');
        }
        if (!type) {
            throw new Error('Type field is required');
        }
        return { type, filePart };
    }
    validateMime(type: UploadType, mimetype: string) {
        const imageMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'];
        if (!imageMimes.includes(mimetype)) {
            throw new Error('Invalid file type. Only image files are allowed.');
        }
        if (type === 'FAVICON' && !['image/x-icon', 'image/vnd.microsoft.icon', 'image/png'].includes(mimetype)) {
            throw new Error('Favicon must be .ico or .png format.');
        }
    }

    async saveToDisk(filePart: any, userId: number, type: UploadType): Promise<string> {
        const path = require('path');
        const fs = require('fs');
        const uploadDir = path.join(__dirname, '../../uploads/users', userId.toString());
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const ext = path.extname(filePart.filename);
        const filename = `${type.toLowerCase()}${ext}`;
        const filepath = path.join(uploadDir, filename);
        const writeStream = fs.createWriteStream(filepath);
        await new Promise((resolve, reject) => {
            filePart.file.pipe(writeStream);
            filePart.file.on('end', resolve);
            filePart.file.on('error', reject);
        });
        return `/uploads/users/${userId}/${filename}`; // URL path
    }
    async applyUpdate(userId: number, type: UploadType, url: string): Promise<any> {
        const updateData: any = {};
        if (type === 'PROFILE') {
            // Prisma User model uses `profileUrl`
            updateData.profileUrl = url;
        } else {
            const company = await this.primaryDb.company.findFirst({ where: { userId } });
            if (!company) {
                throw new Error('Company config not found for this Admin');
            }
            if (type === 'DARKLOGO') {
                // Prisma Company model fields: logoDarkUrl, logoLightUrl, faviconUrl
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
        await this.primaryDb.user.update({
            where: { uid: userId },
            data: updateData,
        });
        return { message: 'Profile image updated successfully', url };
    }




}

