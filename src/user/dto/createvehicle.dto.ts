// src/vehicles/dto/create-vehicle.dto.ts
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  vin?: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  plateNumber?: string;

  @IsString()
  @MaxLength(32)
  imei: string;

  @IsString()
  @MaxLength(20)
  simNumber: string;

  // Vehicle type ID will still come as string from frontend
  @IsString()
  vehicleTypeId: string|number;

 @IsString()
 gmtOffset: string;

}
