import { Injectable } from '@nestjs/common';
import { PrimaryDatabaseService } from './database/primary-database.service';
import { Country, State , City   } from 'country-state-city';

@Injectable()
export class AppService {

   constructor(
      private readonly primaryDb: PrimaryDatabaseService
      ,     
    ) {}



  getHello(): string {
    return 'Hello World!';
  }

  getDeviceTypes() {
    return this.primaryDb.deviceType.findMany({
    select: {
       id: true,
      name: true,
      port: true,
    },
  });
  }

  getVehicleTypes() {
    return this.primaryDb.vehicleType.findMany({
    select: {
       id: true,
      name: true,
    },
  });
  }

  getMobileCode(){
      const countries = Country.getAllCountries();

    // Format into the expected JSON structure
    return countries.map(c => ({
      country: c.isoCode,         // e.g., "IN", "US"
      code: `+${c.phonecode}`     // e.g., "+91", "+1"
    }));
  }

  getCountries(){
      const countries = Country.getAllCountries();
      return countries.map(c => ({
        name: c.name,               // e.g., "India", "United States"
        isoCode: c.isoCode   
      }));
  }

   getStatesByCountry(countryCode: string) {
    const states = State.getStatesOfCountry(countryCode.toUpperCase());

    return states.map(s => ({
      name: s.name,        // e.g., "Maharashtra"
      isoCode: s.isoCode,  // e.g., "MH"
    }));
  }


   getCitiesByState(countryCode: string, stateCode: string) {
    const cities = City.getCitiesOfState(countryCode.toUpperCase(), stateCode.toUpperCase());

    return cities.map(c => ({
      name: c.name,        // e.g., "Mumbai"
      stateCode: c.stateCode,
      countryCode: c.countryCode,
    }));
  }

}
