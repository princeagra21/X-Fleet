import { Controller, Post, Get, Body, HttpCode, HttpStatus, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { CreateAdminDto } from './dto/admin.dto';
import { AdminPasswordUpdateDto } from './dto/adminpasswordupdate.dto';
import { UpdateAdminDto } from './dto/updateadmin.dto';
import { CreditsUpdateDto } from './dto/creditassign.dto';
import { UpdateSoftwareConfigDto } from './dto/softwareconfig.dto';

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

    @Post('assigncredits/:id')
    async assignCredits(@Param('id', ParseIntPipe) id: number, @Body() creditsUpdateDto: CreditsUpdateDto): Promise<any> {
        return this.superadminService.assignCredits(id, creditsUpdateDto);
    }

    @Get('creditlogs/:id')
    async getCreditLogs(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.superadminService.getCreditLogs(id);
    }

    @Delete('deleteadmin/:id')
    async deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.superadminService.deleteAdmin(id);
    }

    @Patch('softwareconfig')
    async updateConfig(@Body() SoftwareConfigDto: UpdateSoftwareConfigDto) {
        return this.superadminService.UpdateConfig(SoftwareConfigDto);
    }

}
