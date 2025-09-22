import { IsOptional, IsString, MaxLength, IsEmail } from 'class-validator';

export class UpdateDriverDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  // e.g., "+91"
  @IsOptional()
  @IsString()
  @MaxLength(10)
  mobilePrefix?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  mobile?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  password?: string;

  // ISO 3166-1 alpha-2 like "IN", "US" (keep as string from frontend)
  @IsOptional()
  @IsString()
  @MaxLength(5)
  countryCode?: string;

  // Kept as "StateCode" to match your exact field casing
  @IsOptional()
  @IsString()
  @MaxLength(10)
  StateCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(12)
  pincode?: string;

  // Usually comes as string from frontend: "true" | "false" | "1" | "0"
  // Keep as string here; coerce to boolean in service if needed.
  @IsOptional()
  @IsString()
  @MaxLength(10)
  isactive?: string;

  // Free-form JSON. Accept object or stringified JSON from frontend.
  @IsOptional()
  attributes?: Record<string, any> | string;
}