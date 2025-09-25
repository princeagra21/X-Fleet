import { Controller, Get, Put, Post, Body, Param, ParseIntPipe, UseGuards, Request, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateVehicleDto } from './dto/createvehicle.dto';


@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    private readonly USER_ID = 7;

    @Get('vehicles')
    async getUserVehicles() : Promise<any> {

        return this.userService.getUserVehicles(this.USER_ID);
    }

    @Post('vehicles')
    async createVehicle(@Body() CreateVehicleDto: CreateVehicleDto): Promise<any> {
        return this.userService.createVehicle(this.USER_ID, CreateVehicleDto);
    }

    @Get('vehicles/:id')
    async getVehicleById(@Param('id', ParseIntPipe) vehicleId: number): Promise<any> {
        return this.userService.getVehicleById(vehicleId , this.USER_ID);
    }  
    
    @Get('profile')
    async getProfile(@Req() req): Promise<any> {
        console.log(req.user);
        return "hi this is for user id " + req.user.userId;
    }

}