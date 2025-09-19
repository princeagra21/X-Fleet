import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsInt,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateAdminDto {
  // -------- User --------
  @IsString()
  @Transform(({ value }) => String(value).trim())
  name: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  mobilePrefix?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  mobileNumber?: string;

  @IsString()
  @Transform(({ value }) => String(value).trim())
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  // -------- Company --------
  @IsString()
  @Transform(({ value }) => String(value).trim())
  companyName: string;

  // -------- Address --------
  @IsString()
  @Transform(({ value }) => String(value).trim())
  address: string;

  @IsString()
  @Transform(({ value }) => String(value).trim())
  country: string; // e.g., "IN"

  @IsString()
  @Transform(({ value }) => String(value).trim())
  state: string;   // e.g., "DL"

  @IsString()
  @Transform(({ value }) => String(value).trim())
  city: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toString().trim())
  pincode?: string;

  // -------- Commercials --------
  @IsOptional()
  @IsString()
  credits: string;     // Prisma: Int
}
