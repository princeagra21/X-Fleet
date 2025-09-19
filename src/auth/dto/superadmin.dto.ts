import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateSuperAdminDto {
  // User fields
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  mobilePrefix: string;

  @IsString()
  mobileNumber: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  // Company fields
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  website?: string;

  // Address fields
  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  pincode?: string;
}
