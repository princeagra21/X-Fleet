import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreditsUpdateDto {

    @IsNotEmpty()
    @IsString()
    credits: string;

    @IsNotEmpty()
    @IsString()
    activity: string; // 'ASSIGN' or 'DEDUCT'
 
}