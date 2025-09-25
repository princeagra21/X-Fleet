import { Injectable } from '@nestjs/common';
import { PrimaryDatabaseService } from './database/primary-database.service';
import { Country, State, City } from 'country-state-city';

@Injectable()
export class AppService {

  constructor(
    private readonly primaryDb: PrimaryDatabaseService
    ,
  ) { }



  getHello(): string {
    return 'Hello World! i am testing CI CD pipeline';
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

  getMobileCode() {
    const countries = Country.getAllCountries();

    // Format into the expected JSON structure
    return countries.map(c => ({
      country: c.isoCode,         // e.g., "IN", "US"
      code: `+${c.phonecode}`     // e.g., "+91", "+1"
    }));
  }

  getCountries() {
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
  getCurrencies() {
    const countries = Country.getAllCountries();
    // Extract unique currencies
    const currencyMap: Record<string, { code: string; name: string }> = {};
    countries.forEach(c => {
      // runtime objects from `country-state-city` may have different typings; use safe access
      const cc = (c as any).currencyCode ?? (c as any).currency ?? (c as any).currency_code;
      if (!cc) return;
      if (!currencyMap[cc]) {
        const name = (c as any).currencyName ?? (c as any).currency_name ?? cc;
        // const symbol = (c as any).currencySymbol ?? (c as any).currency_symbol ?? '';
        currencyMap[cc] = { code: cc, name };
      }
    });

    // Convert map to array and sort by currency name
    const currencies = Object.values(currencyMap).sort((a, b) => a.name.localeCompare(b.name));
    return currencies;
  }

  async getSimProviders() {
    return this.primaryDb.simProvider.findMany({
      select: {
        id: true,
        name: true,
        apnName: true
      },
    });
  }


  async getTimezones(): Promise<string[]> {
    const zones: string[] = [
      "-12:00",
      "-11:00",
      "-10:30",
      "-10:00",
      "-09:30",
      "-09:00",
      "-08:00",
      "-07:00",
      "-06:00",
      "-05:00",
      "-04:00",
      "-03:30",
      "-03:00",
      "-02:30",
      "-02:00",
      "-01:00",
      "+00:00",
      "+01:00",
      "+02:00",
      "+03:00",
      "+03:30", // Iran
      "+04:00",
      "+04:30", // Afghanistan
      "+05:00",
      "+05:30", // India/Sri Lanka
      "+05:45", // Nepal
      "+06:00",
      "+06:30", // Myanmar/Cocos
      "+07:00",
      "+08:00",
      "+08:45", // Australia/Eucla
      "+09:00",
      "+09:30", // Australia (NT/SA)
      "+10:00",
      "+10:30", // Lord Howe (standard)
      "+11:00",
      "+12:00",
      "+12:45", // Chatham (standard)
      "+13:00",
      "+13:45", // Chatham (DST)
      "+14:00", // Line Islands (Kiribati)
    ];


    return zones;
  }


}
