// src/vehicles/dto/update-vehicle.dto.ts
import { IsOptional, IsString, IsBoolean, IsNumber, IsObject, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

// Transform helpers
const ToOptionalInt = () =>
  Transform(({ value }) => {
    if (value === undefined || value === null || String(value).trim() === '') return undefined;
    const n = parseInt(String(value), 10);
    return Number.isNaN(n) ? undefined : n;
  });

const ToOptionalBool = () =>
  Transform(({ value }) => {
    if (value === undefined || value === null || String(value).trim?.() === '') return undefined;
    if (typeof value === 'boolean') return value;
    const s = String(value).trim().toLowerCase();
    if (['true', '1', 'yes', 'y'].includes(s)) return true;
    if (['false', '0', 'no', 'n'].includes(s)) return false;
    return undefined; // let validator decide if needed
  });

const ToOptionalJSON = () =>
  Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value === 'object') return value;
    try {
      return JSON.parse(String(value));
    } catch {
      return undefined;
    }
  });

const ToTrimmedString = () =>
  Transform(({ value }) => (value === undefined || value === null ? undefined : String(value).trim()));

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsOptional()
  @IsString()
  plateNumber?: string;

  // Frontend may send as string or number
  @IsOptional()
  @ToOptionalInt()
  @IsNumber()
  deviceid?: number;

  @IsOptional()
  @ToOptionalInt()
  @IsNumber()
  vehicleTypeId?: number;

  @IsOptional()
  @ToOptionalInt()
  @IsNumber()
  planid?: number;

  // GMT offset like "+05:30", "-03:00"
  @IsOptional()
  @ToTrimmedString()
  @Matches(/^[+-](0\d|1[0-4]):[0-5]\d$/)
  gmtOffset?: string;

  // Accepts true/false, "true"/"false", 1/0
  @IsOptional()
  @ToOptionalBool()
  @IsBoolean()
  isActive?: boolean;

  // Free-form JSON metadata (object or stringified JSON)
  @IsOptional()
  @ToOptionalJSON()
  @IsObject()
  vehicleMeta?: Record<string, any>;
}
