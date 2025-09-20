import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateAdminDto {
 
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  mobilePrefix: string;

  @IsNotEmpty()
  @IsString()
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  addressLine: string;

  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  stateCode: string;

  @IsNotEmpty()
  @IsString()
  cityName: string;

  @IsOptional()
  @IsString()
  pincode?: string;
}
