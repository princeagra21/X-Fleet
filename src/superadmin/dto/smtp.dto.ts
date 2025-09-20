import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsEmail,
  IsBoolean,
  IsEnum,
  Matches,
} from 'class-validator';

export enum SmtpSecurity {
  NONE = 'NONE',
  SSL = 'SSL',
  TLS = 'TLS',
}

// All fields optional → supports partial updates
export class SmtpSettingDto {
  @IsOptional()
  @IsString()
  senderName?: string;

  @IsOptional()
  @IsString()
  host?: string;

  @IsOptional()
  // Accept either a number or a numeric string for port (frontend may send as string)
  @IsOptional()
  @Matches(/^\d+$/,{message: 'port must be a numeric string or number'})
  port?: string | number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(SmtpSecurity)
  type?: SmtpSecurity; // "NONE" | "SSL" | "TLS"

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  replyTo?: string;

  @IsOptional()
  // Accept boolean or boolean string ("true"/"false")
  @IsOptional()
  @Matches(/^(true|false)$/i, { message: 'isActive must be a boolean string ("true" or "false")' })
  isActive?: string | boolean;
}
