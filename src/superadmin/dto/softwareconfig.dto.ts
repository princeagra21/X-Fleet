import {
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsString,
  IsBoolean,
  Matches,
  IsIn,
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

  // Accept backupDays as a string from frontend (e.g. "180") but validate it's a non-negative integer string
  @IsOptional()
  @Matches(/^\d+$/, { message: 'backupDays must be a non-negative integer string' })
  backupDays?: string;

  @IsOptional()
  @Matches(/^[A-Z]{3}$/, { message: 'currencyCode must be a 3-letter ISO code' })
  currencyCode?: string;

  // OpenAI
  // Accept boolean flags as strings from frontend ("true"/"false")
  @IsOptional()
  @Matches(/^(true|false)$/i, { message: 'isOpenAiEnabled must be a boolean string ("true" or "false")' })
  isOpenAiEnabled?: string;

  @IsOptional()
  @IsString()
  openAiApiKey?: string;

  @IsOptional()
  @IsString()
  openAiModel?: string;

  // WhatsApp
  @IsOptional()
  @Matches(/^(true|false)$/i, { message: 'isWhatsappEnabled must be a boolean string ("true" or "false")' })
  isWhatsappEnabled?: string;

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
  @Matches(/^(true|false)$/i, { message: 'isGoogleSsoEnabled must be a boolean string ("true" or "false")' })
  isGoogleSsoEnabled?: string;

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
  @Matches(/^(true|false)$/i, { message: 'isReverseGeoEnabled must be a boolean string ("true" or "false")' })
  isReverseGeoEnabled?: string;

  @IsOptional()
  @IsString()
  reverseGeoApiKey?: string;

  @IsOptional()
  @IsString()
  reverseGeoProvider?: string;  //  "Google" | "Mapbox" | "OSM"
}
