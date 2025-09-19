import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



@Get('devicestypes')
getDeviceTypes() {
  return this.appService.getDeviceTypes();   
}

@Get('vehicletypes')  
getVehicleTypes() {
  return this.appService.getVehicleTypes();   
}

@Get('mobileprefix') 
getMobileCode() {
  return this.appService.getMobileCode();
}

@Get('countires') 
getCountries() {
  return this.appService.getCountries();  
}

  @Get('states/:countryCode')
  getStates(@Param('countryCode') countryCode: string) {
    return this.appService.getStatesByCountry(countryCode);
  }

    @Get('cities/:countryCode/:stateCode')
  getCities(
    @Param('countryCode') countryCode: string,
    @Param('stateCode') stateCode: string,
  ) {
    return this.appService.getCitiesByState(countryCode, stateCode);
  }




}
