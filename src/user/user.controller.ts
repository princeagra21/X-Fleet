import { Controller, Get, Put, Post, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';


@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    private readonly USER_ID = 7;

    @Get('vehicles')
    async getUserVehicles() : Promise<any> {

        return this.userService.getUserVehicles(this.USER_ID);
    }

}