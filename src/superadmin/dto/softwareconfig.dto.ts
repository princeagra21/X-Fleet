import {
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsString,
  IsBoolean,
  Matches,
} from 'class-validator';

export enum GeocodingPrecision {
  TWO_DIGIT = 'TWO_DIGIT',
  THREE_DIGIT = 'THREE_DIGIT'

}


export class UpdateSoftwareConfigDto {
  // General
  @IsOptional()
  @IsEnum(GeocodingPrecision)
  geocodingPrecision?: GeocodingPrecision;

  @IsOptional()
  @IsInt()
  @Min(0)
  backupDays?: number;

  @IsOptional()
  @Matches(/^[A-Z]{3}$/, { message: 'currencyCode must be a 3-letter ISO code' })
  currencyCode?: string;

  // OpenAI
  @IsOptional()
  @IsBoolean()
  isOpenAiEnabled?: boolean;

  @IsOptional()
  @IsString()
  openAiApiKey?: string;

  @IsOptional()
  @IsString()
  openAiModel?: string;

  // WhatsApp
  @IsOptional()
  @IsBoolean()
  isWhatsappEnabled?: boolean;

  @IsOptional()
  @IsString()
  whatsappBusinessAccountId?: string;

  @IsOptional()
  @IsString()
  whatsappAccessToken?: string;

  @IsOptional()
  @IsString()
  whatsappPhoneNumberId?: string;

  // Google SSO
  @IsOptional()
  @IsBoolean()
  isGoogleSsoEnabled?: boolean;

  @IsOptional()
  @IsString()
  googleClientId?: string;

  @IsOptional()
  @IsString()
  googleClientSecret?: string;

  @IsOptional()
  @IsString()
  googleRedirectUri?: string;

  // Reverse Geocoding
  @IsOptional()
  @IsBoolean()
  isReverseGeoEnabled?: boolean;

  @IsOptional()
  @IsString()
  reverseGeoApiKey?: string;

  @IsOptional()
  @IsString()
  reverseGeoProvider?: string;
}
