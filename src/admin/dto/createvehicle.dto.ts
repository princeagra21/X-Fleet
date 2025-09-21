import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

const toNumberIfNumeric = (v: unknown) => {
  if (typeof v === 'string' && /^\s*\d+\s*$/.test(v)) return Number(v.trim());
  return v;
};

const trim = (v: unknown) => (typeof v === 'string' ? v.trim() : v);

export class CreateVehicleDto {
  // Required: vehicle display/name
  @IsDefined()
  @IsString()
  @Transform(({ value }) => trim(value))
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  // Optional: VIN
  @IsOptional()
  @IsString()
  @Transform(({ value }) => trim(value))
  @MaxLength(64)
  vin?: string;

  // Optional: Plate number
  @IsOptional()
  @IsString()
  @Transform(({ value }) => trim(value))
  @MaxLength(32)
  plateNumber?: string;

  // deviceId: accepts number or string (uuid/external code)
  @IsDefined()
  @Transform(({ value }) => toNumberIfNumeric(value))
  @ValidateIf((_, v) => typeof v === 'number' || (typeof v === 'string' && /^\d+$/.test(v)))
  @IsInt()
  @ValidateIf((_, v) => typeof v === 'string' && !/^\d+$/.test(v))
  @IsString()
  deviceId!: number | string;

  // vehicleTypeId: number or string
  @IsDefined()
  @Transform(({ value }) => toNumberIfNumeric(value))
  @ValidateIf((_, v) => typeof v === 'number' || (typeof v === 'string' && /^\d+$/.test(v)))
  @IsInt()
  @ValidateIf((_, v) => typeof v === 'string' && !/^\d+$/.test(v))
  @IsString()
  vehicleTypeId!: number | string;

  // primaryUserId: number or string
  @IsDefined()
  @Transform(({ value }) => toNumberIfNumeric(value))
  @ValidateIf((_, v) => typeof v === 'number' || (typeof v === 'string' && /^\d+$/.test(v)))
  @IsInt()
  @ValidateIf((_, v) => typeof v === 'string' && !/^\d+$/.test(v))
  @IsString()
  primaryUserId!: number | string;

  // planId: number or string
  @IsDefined()
  @Transform(({ value }) => toNumberIfNumeric(value))
  @ValidateIf((_, v) => typeof v === 'number' || (typeof v === 'string' && /^\d+$/.test(v)))
  @IsInt()
  @ValidateIf((_, v) => typeof v === 'string' && !/^\d+$/.test(v))
  @IsString()
  planId!: number | string;
}