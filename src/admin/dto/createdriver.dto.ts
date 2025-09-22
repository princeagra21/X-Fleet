// src/drivers/dto/create-driver.dto.ts
import { IsOptional, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsString()
  @MaxLength(10)
  mobilePrefix: string; // e.g. "+91"

  @IsString()
  @MaxLength(20)
  mobile: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  primaryUserid: string | number; // userId comes as string from frontend

  @IsString()
  @MaxLength(50)
  username: string;

  @IsString()
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(5)
  countryCode: string; // e.g. "IN", "US"

  @IsOptional()
  @IsString()
  @MaxLength(10)
  stateCode?: string;

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
 @MaxLength(20)
 pincode?: string;

}
