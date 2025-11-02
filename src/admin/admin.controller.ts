import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { HeaderId } from 'src/common/decorators/header-id.decorator';


@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

 // private readonly ADMIN_ID = 2;

  @Get('users')
  async getUsers(@HeaderId() headerId: number): Promise<any> {
    return this.adminService.getUsers(headerId);
  }

  @Post('users')
  async createUser(@Body() CreateUserDto: CreateUserDto , @HeaderId() headerId: number): Promise<any> {
    return this.adminService.createUser(headerId, CreateUserDto);
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number, @HeaderId() headerId: number) {
    return this.adminService.getUserById(id, headerId);
  }

  @Patch('users/:id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() UpdateUserDto: UpdateUserDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.updateUser(id, UpdateUserDto, headerId);

  }

  @Post('updateuserpassword/:id')
  async updatePassword(@Param('id', ParseIntPipe) id: number, @Body() body: { newPassword: string }, @HeaderId() headerId: number): Promise<any> {
    const { newPassword } = body;
    return this.adminService.updateuserPassword(id, headerId, newPassword);
  }

  @Post('device')
  async createDevice(@Body() CreateDeviceDto: CreateDeviceDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.createDevice(headerId, CreateDeviceDto);
  }

  @Patch('device/:id')
  async updateDevice(@Param('id', ParseIntPipe) id: number, @Body() UpdateDeviceDto: CreateDeviceDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.updateDevice(id, headerId, UpdateDeviceDto);
  }

  @Get('device/:id')
  async getDeviceById(@Param('id', ParseIntPipe) id: number, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.getDeviceById(id, headerId);
  }

  @Get('devices')
  async getDevices(@HeaderId() headerId: number): Promise<any> {
    return this.adminService.getDevices(headerId);
  }

  @Get('simcard')
  async getSimCards(@HeaderId() headerId: number): Promise<any> {
    return this.adminService.getSimCards(headerId);
  }

  @Post('simcard')
  async createSimCard(@Body() CreateSimCardDto: SimCardDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.createSimCard(headerId, CreateSimCardDto);
  }

  @Get('simcard/:id')
  async getSimCardById(@Param('id', ParseIntPipe) id: number, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.getSimCardById(id, headerId);
  }

  @Patch('simcard/:id')
  async updateSimCard(@Param('id', ParseIntPipe) id: number, @Body() UpdateSimCardDto: SimCardDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.updateSimCard(id, headerId, UpdateSimCardDto);
  }

  @Get('vehicles')
  async getVehicles(@HeaderId() headerId: number): Promise<any> {
    return this.adminService.getVehicles(headerId);
  }

  @Post('vehicles')
  async createVehicle(@Body() CreateVehicleDto: CreateVehicleDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.createVehicle(headerId, CreateVehicleDto);
  }

  @Patch('vehicles/:id')
  async updateVehicle(@Param('id', ParseIntPipe) id: number, @Body() UpdateVehicleDto: UpdateVehicleDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.updateVehicle(id, headerId, UpdateVehicleDto);
  }

  @Get('vehicles/:id')
  async getVehicleById(@Param('id', ParseIntPipe) id: number, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.getVehicleById(id, headerId);
  }

  @Post('drivers')
  async createDriver(@Body() CreateDriverDto: CreateDriverDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.createDriver(headerId, CreateDriverDto);
  }

  @Get('drivers')
  async getDrivers(@HeaderId() headerId: number): Promise<any> {
    return this.adminService.getDrivers(headerId);
  }
  @Get('drivers/:id')
  async getDriverById(@Param('id', ParseIntPipe) id: number, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.getDriverById(id, headerId);
  }

  @Patch('drivers/:id')
  async updateDriver(@Param('id', ParseIntPipe) id: number, @Body() UpdateDriverDto: UpdateDriverDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.updateDriver(id, headerId, UpdateDriverDto);
  }

  @Delete('drivers/:id')
  async deleteDriver(@Param('id', ParseIntPipe) id: number, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.deleteDriver(id, headerId);
  }

  @Post('userdriverassign/:userId/:driverId')
  async assignDriverToUser(@Param('userId', ParseIntPipe) userId: number, @Param('driverId', ParseIntPipe) driverId: number,
    @Body() body: { action: string } , @HeaderId() headerId: number): Promise<any> {
    return this.adminService.assignDriverToUser( driverId, userId, headerId, body.action);
  }

  @Post('updatedriverpassword/:id')
  async updateDriverPassword(@Param('id', ParseIntPipe) id: number, @Body() body: { newPassword: string }, @HeaderId() headerId: number): Promise<any> {
    const { newPassword } = body;
    return this.adminService.updateDriverPassword(id, headerId, newPassword);
  }

  @Post('uservehicleassign/:userId/:vehicleId')
  async assignVehicleToUser(@Param('userId', ParseIntPipe) userId: number, @Param('vehicleId', ParseIntPipe) vehicleId: number, @Body() body: { action: string }, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.assignVehicleToUser(vehicleId, userId, headerId, body.action);
  }

  @Get('uservehiclelist/:userId')
  async getUserVehicles(@Param('userId', ParseIntPipe) userId: number, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.getUserVehicles(userId, headerId);
  }

  @Get('vehicleuserlist/:vehicleId')
  async getVehicleUsers(@Param('vehicleId', ParseIntPipe) vehicleId: number, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.getVehicleUsers(vehicleId, headerId);
  }

  @Patch('companyinfo/:id')
  async updateCompanyInfo(@Param('id', ParseIntPipe) id: number, @Body() updateCompanydto: UpdateCompanyDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.updateCompanyInfo(id, headerId, updateCompanydto);
  }

  @Get('smtpconfig')
  async getSmtpConfig(@HeaderId() headerId: number): Promise<any> {
    return this.adminService.getSmtpConfig(headerId);
  }

  @Post('smtpconfig')
  async updateSmtpConfig(@Body() smtpConfig: UpdateSmtpConfigDto, @HeaderId() headerId: number): Promise<any> {
    return this.adminService.updateSmtpConfig(headerId, smtpConfig);
  }

  @Post('updatepassword')
  async updatePasswordAdmin(@Body() body: { currentPassword: string, newPassword: string }, @HeaderId() headerId: number): Promise<any> {
    const { currentPassword, newPassword } = body;
    return this.adminService.updateAdminPassword(headerId, currentPassword, newPassword);
  }

   @Post('upload')
    async uploadFile(@Req() req: FastifyRequest, @HeaderId() headerId: number): Promise<any> {
        console.log('Admin upload endpoint called');
        console.log('Request headers:', req.headers);
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Is multipart:', req.isMultipart?.());
        
        try {
            const result = await this.adminService.uploadFile(req, headerId);
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
  