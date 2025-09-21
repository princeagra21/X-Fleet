import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

// helper: coerce anything to string (forgiving frontend)
const ToStringish = () =>
  Transform(({ value }) => (value == null ? value : String(value)));

export class UpdateUserDto {
  @IsOptional()
  @ToStringish()
  @IsString()
  roleId?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  name?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  email?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  mobilePrefix?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  mobileNumber?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  username?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  password?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  companyName?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  address?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  stateCode?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  city?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  pincode?: string;
}
