import {
  IsOptional,
  IsString,
  IsUrl,
  IsObject,
} from 'class-validator';

export class CompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl({}, { message: 'websiteUrl must be a valid URL' })
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  customDomain?: string;

  @IsOptional()
  @IsObject()
  socialLinks?: Record<string, string>;  
  // Example: { "facebook": "https://facebook.com", "twitter": "https://twitter.com" }

  @IsOptional()
  @IsString()
  primaryColor?: string;   // Hex code or CSS color

  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @IsOptional()
  @IsString()
  navbarColor?: string;
}
