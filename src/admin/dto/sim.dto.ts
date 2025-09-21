import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

// helper: coerce anything to string (forgiving frontend)
const ToStringish = () =>
  Transform(({ value }) => (value == null ? value : String(value)));

export class SimCardDto {
  @ToStringish()
  @IsString()
  simNumber: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  imsi?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  providerId?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  iccid?: string;

  @IsOptional()
  @ToStringish()
  @IsString()
  status?: string; // "true" or "false" as string from frontend
}
