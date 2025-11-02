import { Controller, Get, Put, Post, Body, Param, ParseIntPipe, UseGuards, Request, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateVehicleDto } from './dto/createvehicle.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { HeaderId } from 'src/common/decorators/header-id.decorator';


@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN', 'USER')
export class UserController {
    constructor(private readonly userService: UserService) { }

    private readonly USER_ID = 7;

    @Get('vehicles')
    async getUserVehicles(@HeaderId() headerId: number): Promise<any> {

        return this.userService.getUserVehicles(headerId);
    }

    @Post('vehicles')
    async createVehicle(@Body() CreateVehicleDto: CreateVehicleDto, @HeaderId() headerId: number): Promise<any> {
        return this.userService.createVehicle(headerId, CreateVehicleDto);
    }

    @Get('vehicles/:id')
    async getVehicleById(@Param('id', ParseIntPipe) vehicleId: number, @HeaderId() headerId: number): Promise<any> {
        return this.userService.getVehicleById(vehicleId, headerId);
    }

    @Get('profile')
    async getProfile(@Req() req): Promise<any> {
        console.log(req.user);
        return "hi this is for user id " + req.user.userId;
    }

    // @Get('profile')
    // async getProfile(@Req() req): Promise<any> {
    //     console.log(req.user);
    //     return "hi this is for user id " + req.user.userId;
    // }

}