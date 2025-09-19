import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
   
    @IsNotEmpty()
    @IsString()
    name: string;

   
    @IsEmail()
    email: string;

    
    @IsNotEmpty()
    @IsString()
    username: string;

  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    passwordHash: string;

    
    @IsOptional()
    @IsString()
    mobilePrefix?: string;

   
    @IsOptional()
    @IsString()
    mobileNumber?: string;
}
