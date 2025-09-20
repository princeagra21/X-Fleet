import { Injectable, Post } from '@nestjs/common';
import { PrimaryDatabaseService } from 'src/database/primary-database.service';
import { CreateAdminDto } from './dto/admin.dto';
import { Country, State } from 'country-state-city';
import * as bcrypt from 'bcryptjs';
import { AdminPasswordUpdateDto } from './dto/adminpasswordupdate.dto';
import { UpdateAdminDto } from './dto/updateadmin.dto';


@Injectable()
export class SuperadminService {
    constructor(private readonly primaryDb: PrimaryDatabaseService) { }

    private Super_Admin_Id = 1; // Assuming the Super Admin has a fixed user ID of 1

    async createAdmin(AdminDto: CreateAdminDto): Promise<any> {
        console.log("Admin DTO:", AdminDto);
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
                //roleId:1,
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


        // const user = await this.primaryDb.user.findUnique({
        //   where: { uid: id },            // <-- Int field
        //   select: {
        //     uid: true,
        //     name: true,
        //     email: true,
        //     mobilePrefix: true,
        //     mobileNumber: true,
        //     username: true,
        //     credits: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     companies: { select: { name: true, websiteUrl:true, customDomain:true, socialLinks: true  } },
        //   },
        // });

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



}

