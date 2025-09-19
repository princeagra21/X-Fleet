import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { PrimaryDatabaseService } from 'src/database/primary-database.service';

@Injectable()
export class AuthService {
  

    constructor(private jwtService: JwtService,
         private readonly primaryDb: PrimaryDatabaseService
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
        const { name, email, username, passwordHash, mobilePrefix, mobileNumber } = registerDto;

        const existingUser = await this.primaryDb.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            throw new ConflictException('User with this email or username already exists');
        }

        const hashedPassword = await bcrypt.hash(passwordHash, 12);

        const user = await this.primaryDb.user.create({
            data: {
                name,
                email,
                username,
                passwordHash: hashedPassword,
                loginType: 'SUPERADMIN',
                mobilePrefix,
                mobileNumber,
                isActive: true,
                isEmailVerified: false,
            }
        });

        const payload = {
            sub: user.uid.toString(),
            username: user.username,
            email: user.email,
            role: user.loginType,
        };

        const token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

        return {
            token,
            refresh_token,
            user: {
                id: user.uid.toString(),
                role: user.loginType,
                username: user.username,
                email: user.email,
                name: user.name,
            }
        };
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const { identifier, password } = loginDto;

        const user = await this.primaryDb.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier }
                ],
                isActive: true
            }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        await this.primaryDb.user.update({
            where: { uid: user.uid },
            data: { lastLogin: new Date() }
        });

        const payload = {
            sub: user.uid.toString(),
            username: user.username,
            email: user.email,
            role: user.loginType,
        };

        const token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

        return {
            token,
            refresh_token,
            user: {
                id: user.uid.toString(),
                role: user.loginType,
                username: user.username,
                email: user.email,
                name: user.name,
            }
        };
    }

    async validateUser(userId: string) {
        return await this.primaryDb.user.findFirst({
            where: {
                uid: parseInt(userId),
                isActive: true
            },
            select: {
                uid: true,
                username: true,
                email: true,
                name: true,
                loginType: true,
            }
        });
    }
}
