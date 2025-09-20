import { Controller, Post, Get, Body, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { CreateAdminDto } from './dto/admin.dto';
import { AdminPasswordUpdateDto } from './dto/adminpasswordupdate.dto';
import { UpdateAdminDto } from './dto/updateadmin.dto';

@Controller('superadmin')
export class SuperadminController {
    constructor(private readonly superadminService: SuperadminService) { }

    @Post('createadmin')
    async createAdmin(@Body() Admindto: CreateAdminDto): Promise<any> {
        return this.superadminService.createAdmin(Admindto);
    }

    @Get('adminlist')
    async getAdminList(): Promise<any> {
        return this.superadminService.getAdminList();
    }

    @Get('admin/:id')
    async getAdminById(@Param('id', ParseIntPipe) id: number) {
        return this.superadminService.getAdminById(id);
    }

    @Post('adminpasswordupdate')
    async updateAdminPassword(@Body() adminpasswordupdate: AdminPasswordUpdateDto): Promise<any> {
        return this.superadminService.updateAdminPassword(adminpasswordupdate);
    }

    @Get('activedeactiveadmin/:id')
    async toggleAdminStatus(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.superadminService.toggleAdminStatus(id);
    }

    @Post('updateadmin/:id')
    async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() Adminupdatedto: UpdateAdminDto): Promise<any> {
       return this.superadminService.updateAdmin(id, Adminupdatedto);
    }



}
