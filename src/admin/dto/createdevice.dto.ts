import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateDeviceDto {
    // IMEI is typically 15 digits
    @IsString()
    @IsNotEmpty()
    @Length(15, 15)
    @Matches(/^\d+$/, { message: 'IMEI must contain only digits' })
    imei: string;

    // SIM identifier (ICCID or other), keep as required string
    @Type(() => String)
    @IsString()
    @IsOptional()
    simId?: string;

    // device type id as an integer (e.g. FK to device types table)
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    deviceTypeId: number;
}