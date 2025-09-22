import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateDeviceDto } from './dto/createdevice.dto';
import { SimCardDto } from './dto/sim.dto';
import { CreateVehicleDto } from './dto/createvehicle.dto';
import { UpdateVehicleDto } from './dto/updatevehicle.dto';
import { CreateDriverDto } from './dto/createdriver.dto';
import { UpdateDriverDto } from './dto/updatedriver.dto';
import { UpdateCompanyDto } from './dto/updatecompany.dto';
import { UpdateSmtpConfigDto } from './dto/updatesmtpconfig.dto';
import type { FastifyRequest } from 'fastify';


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

  @Post('updateuserpassword/:id')
  async updatePassword(@Param('id', ParseIntPipe) id: number, @Body() body: { newPassword: string }): Promise<any> {
    const { newPassword } = body;
    return this.adminService.updateuserPassword(id, this.ADMIN_ID, newPassword);
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

  @Patch('vehicles/:id')
  async updateVehicle(@Param('id', ParseIntPipe) id: number, @Body() UpdateVehicleDto: UpdateVehicleDto): Promise<any> {
    return this.adminService.updateVehicle(id, this.ADMIN_ID, UpdateVehicleDto);
  }

  @Get('vehicles/:id')
  async getVehicleById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.getVehicleById(id, this.ADMIN_ID);
  }

  @Post('drivers')
  async createDriver(@Body() CreateDriverDto: CreateDriverDto): Promise<any> {
    return this.adminService.createDriver(this.ADMIN_ID, CreateDriverDto);
  }

  @Get('drivers')
  async getDrivers(): Promise<any> {
    return this.adminService.getDrivers(this.ADMIN_ID);
  }
  @Get('drivers/:id')
  async getDriverById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.getDriverById(id, this.ADMIN_ID);
  }

  @Patch('drivers/:id')
  async updateDriver(@Param('id', ParseIntPipe) id: number, @Body() UpdateDriverDto: UpdateDriverDto): Promise<any> {
    return this.adminService.updateDriver(id, this.ADMIN_ID, UpdateDriverDto);
  }

  @Delete('drivers/:id')
  async deleteDriver(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.deleteDriver(id, this.ADMIN_ID);
  }

  @Post('userdriverassign/:userId/:driverId')
  async assignDriverToUser(@Param('userId', ParseIntPipe) userId: number, @Param('driverId', ParseIntPipe) driverId: number,
    @Body() body: { action: string }): Promise<any> {
    return this.adminService.assignDriverToUser( driverId, userId, this.ADMIN_ID, body.action);
  }

  @Post('updatedriverpassword/:id')
  async updateDriverPassword(@Param('id', ParseIntPipe) id: number, @Body() body: { newPassword: string }): Promise<any> {
    const { newPassword } = body;
    return this.adminService.updateDriverPassword(id, this.ADMIN_ID, newPassword);
  }

  @Post('uservehicleassign/:userId/:vehicleId')
  async assignVehicleToUser(@Param('userId', ParseIntPipe) userId: number, @Param('vehicleId', ParseIntPipe) vehicleId: number, @Body() body: { action: string }): Promise<any> {
    return this.adminService.assignVehicleToUser(vehicleId, userId, this.ADMIN_ID, body.action);
  }

  @Get('uservehiclelist/:userId')
  async getUserVehicles(@Param('userId', ParseIntPipe) userId: number): Promise<any> {
    return this.adminService.getUserVehicles(userId, this.ADMIN_ID);
  }

  @Get('vehicleuserlist/:vehicleId')
  async getVehicleUsers(@Param('vehicleId', ParseIntPipe) vehicleId: number): Promise<any> {
    return this.adminService.getVehicleUsers(vehicleId, this.ADMIN_ID);
  }

  @Patch('companyinfo/:id')
  async updateCompanyInfo(@Param('id', ParseIntPipe) id: number, @Body() updateCompanydto: UpdateCompanyDto): Promise<any> {
    return this.adminService.updateCompanyInfo(id, this.ADMIN_ID, updateCompanydto);
  }

  @Get('smtpconfig')
  async getSmtpConfig(): Promise<any> {
    return this.adminService.getSmtpConfig(this.ADMIN_ID);
  }

  @Post('smtpconfig')
  async updateSmtpConfig(@Body() smtpConfig: UpdateSmtpConfigDto): Promise<any> {
    return this.adminService.updateSmtpConfig(this.ADMIN_ID, smtpConfig);
  }

  @Post('updatepassword')
  async updatePasswordAdmin(@Body() body: { currentPassword: string, newPassword: string }): Promise<any> {
    const { currentPassword, newPassword } = body;
    return this.adminService.updateAdminPassword(this.ADMIN_ID, currentPassword, newPassword);
  }

   @Post('upload')
    async uploadFile(@Req() req: FastifyRequest): Promise<any> {
        console.log('Admin upload endpoint called');
        console.log('Request headers:', req.headers);
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Is multipart:', req.isMultipart?.());
        
        try {
            const result = await this.adminService.uploadFile(req, this.ADMIN_ID);
            console.log('Admin upload result:', result);
            return result;
        } catch (error) {
            console.error('Admin upload controller error:', error);
            return { 
                message: 'Upload failed', 
                error: error.message 
            };
        }
    }
  }
  