import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateDeviceDto } from './dto/createdevice.dto';
import { SimCardDto } from './dto/sim.dto';
import { CreateVehicleDto } from './dto/createvehicle.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  private readonly ADMIN_ID = 2;

  @Get('users')
  async getUsers(): Promise<any> {
    return this.adminService.getUsers(this.ADMIN_ID);
  }

  @Post('users')
  async createUser(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return this.adminService.createUser(this.ADMIN_ID, CreateUserDto);
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getUserById(id, this.ADMIN_ID);
  }

  @Patch('users/:id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() UpdateUserDto: UpdateUserDto): Promise<any> {
    return this.adminService.updateUser(id, UpdateUserDto);

  }

  @Post('device')
  async createDevice(@Body() CreateDeviceDto: CreateDeviceDto): Promise<any> {
    return this.adminService.createDevice(this.ADMIN_ID, CreateDeviceDto);
  }

  @Patch('device/:id')
  async updateDevice(@Param('id', ParseIntPipe) id: number, @Body() UpdateDeviceDto: CreateDeviceDto): Promise<any> {
    return this.adminService.updateDevice(id, this.ADMIN_ID, UpdateDeviceDto);
  }

  @Get('device/:id')
  async getDeviceById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.getDeviceById(id, this.ADMIN_ID);
  }

  @Get('devices')
  async getDevices(): Promise<any> {
    return this.adminService.getDevices(this.ADMIN_ID);
  }

  @Get('simcard')
  async getSimCards(): Promise<any> {
    return this.adminService.getSimCards(this.ADMIN_ID);
  }

  @Post('simcard')
  async createSimCard(@Body() CreateSimCardDto: SimCardDto): Promise<any> {
    return this.adminService.createSimCard(this.ADMIN_ID, CreateSimCardDto);
  }

  @Get('simcard/:id')
  async getSimCardById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.getSimCardById(id, this.ADMIN_ID);
  }

  @Patch('simcard/:id')
  async updateSimCard(@Param('id', ParseIntPipe) id: number, @Body() UpdateSimCardDto: SimCardDto): Promise<any> {
    return this.adminService.updateSimCard(id, this.ADMIN_ID, UpdateSimCardDto);
  }

  @Get('vehicles')
  async getVehicles(): Promise<any> {
    return this.adminService.getVehicles(this.ADMIN_ID);
  }

  @Post('vehicles')
  async createVehicle(@Body() CreateVehicleDto: CreateVehicleDto): Promise<any> {
    return this.adminService.createVehicle(this.ADMIN_ID, CreateVehicleDto);
  }


}
