import { Controller, Post, Get, Body, HttpCode, HttpStatus, Param, ParseIntPipe, Delete, Patch, Req } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { CreateAdminDto } from './dto/admin.dto';
import { AdminPasswordUpdateDto } from './dto/adminpasswordupdate.dto';
import { UpdateAdminDto } from './dto/updateadmin.dto';
import { CreditsUpdateDto } from './dto/creditassign.dto';
import { UpdateSoftwareConfigDto } from './dto/softwareconfig.dto';
import { SmtpSettingDto } from './dto/smtp.dto';
import { CompanyDto } from './dto/company.dto';
import type { FastifyRequest } from 'fastify';

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

    @Get('softwareconfig')
    async getConfig() {
        return this.superadminService.GetConfig();
    }

    @Get('smtpconfig/:id')
    async getSmtpConfig(@Param('id', ParseIntPipe) id: number) {
        return this.superadminService.getSmtpConfig(id);
    }

    @Patch('smtpconfig/:id')
    async updateSmtpConfig(@Param('id', ParseIntPipe) id: number, @Body() smtpConfig: SmtpSettingDto): Promise<any> {
        return this.superadminService.updateSmtpConfig(id, smtpConfig);
    }

    @Get('companyconfig/:id')
    async getCompanyConfig(@Param('id', ParseIntPipe) id: number) {
        return this.superadminService.getCompanyConfig(id);
    }

    @Patch('companyconfig/:id')
    async updateCompanyConfig(@Param('id', ParseIntPipe) id: number, @Body() companyConfig: CompanyDto): Promise<any> {
        return this.superadminService.updateCompanyConfig(id, companyConfig);
    }

    @Post('upload/:id')
    upload(@Param('id', ParseIntPipe) id: number, @Req() req: FastifyRequest) {
        console.log(id, req);
        return this.superadminService.handleUpload(req, id);
    }

}
