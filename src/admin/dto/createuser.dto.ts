import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @Type(() => Number)         // "123" -> 123
  @IsInt()
  roleId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  mobilePrefix: string;

  @IsString()
  mobileNumber: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsString()
  address: string;

  @IsString()
  countryCode: string;

  @IsOptional()
  @IsString()
  stateCode?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  pincode?: string;


}
