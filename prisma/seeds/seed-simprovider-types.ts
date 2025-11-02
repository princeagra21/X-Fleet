import { PrismaClient } from '../../generated/prisma-primary';

const prisma = new PrismaClient();

type Row = {
  name: string;
  countryCode: string; // ISO-3166-1 alpha-2 like "IN", "US"
  apnName?: string | null;
  apnUser?: string | null;
  apnPassword?: string | null;
};

const DATA: Row[] = [
  {
    "name": "2degrees",
    "countryCode": "NZ",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "9mobile",
    "countryCode": "NG",
    "apnName": "etisalat",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Airtel India",
    "countryCode": "IN",
    "apnName": "airtelgprs.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Airtel Kenya",
    "countryCode": "KE",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Airtel NG",
    "countryCode": "NG",
    "apnName": "internet.ng.airtel.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Airtel RW",
    "countryCode": "RW",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Airtel TZ",
    "countryCode": "TZ",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Airtel UG",
    "countryCode": "UG",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Airtel ZM",
    "countryCode": "ZM",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "AirtelTigo GH",
    "countryCode": "GH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "AIS TH",
    "countryCode": "TH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "AT&T",
    "countryCode": "US",
    "apnName": "NXTGENPHONE",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "AT&T MX",
    "countryCode": "MX",
    "apnName": "internet.att.mx",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "BASE",
    "countryCode": "BE",
    "apnName": "gprs.base.be",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Batelco",
    "countryCode": "BH",
    "apnName": "internet.batelco.com.bh",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Bell",
    "countryCode": "CA",
    "apnName": "pda.bell.ca",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Bouygues Telecom",
    "countryCode": "FR",
    "apnName": "ebouygtel.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "BSNL",
    "countryCode": "IN",
    "apnName": "bsnlnet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "BTC beMobile",
    "countryCode": "BW",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Cell C",
    "countryCode": "ZA",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Claro AR",
    "countryCode": "AR",
    "apnName": "igprs.claro.com.ar",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Claro BR",
    "countryCode": "BR",
    "apnName": "claro.com.br",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Claro CL",
    "countryCode": "CL",
    "apnName": "bam.clarochile.cl",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Claro CO",
    "countryCode": "CO",
    "apnName": "internet.comcel.com.co",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Claro PE",
    "countryCode": "PE",
    "apnName": "claro.pe",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "DTAC",
    "countryCode": "TH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "du",
    "countryCode": "AE",
    "apnName": "du",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Econet",
    "countryCode": "ZW",
    "apnName": "ecoweb",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "EE",
    "countryCode": "GB",
    "apnName": "everywhere",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Entel CL",
    "countryCode": "CL",
    "apnName": "entel.pe",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Entel PE",
    "countryCode": "PE",
    "apnName": "entel.pe",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Ethio Telecom",
    "countryCode": "ET",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Etisalat Misr",
    "countryCode": "EG",
    "apnName": "etisalat",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Etisalat UAE",
    "countryCode": "AE",
    "apnName": "etisalat.ae",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Free Mobile",
    "countryCode": "FR",
    "apnName": "free",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Glo",
    "countryCode": "NG",
    "apnName": "gloflat",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Globe PH",
    "countryCode": "PH",
    "apnName": "internet.globe.com.ph",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Iliad IT",
    "countryCode": "IT",
    "apnName": "iliad",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Indosat Ooredoo",
    "countryCode": "ID",
    "apnName": "indosatgprs",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "inwi",
    "countryCode": "MA",
    "apnName": "internet.inwi.ma",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Jio",
    "countryCode": "IN",
    "apnName": "jionet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "KPN",
    "countryCode": "NL",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Maroc Telecom (IAM)",
    "countryCode": "MA",
    "apnName": "iam",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Mascom",
    "countryCode": "BW",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MEO",
    "countryCode": "PT",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Mobifone",
    "countryCode": "VN",
    "apnName": "m-wap",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Mobily",
    "countryCode": "SA",
    "apnName": "web2",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Movistar AR",
    "countryCode": "AR",
    "apnName": "internet.movistar.com.ar",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Movistar CL",
    "countryCode": "CL",
    "apnName": "web.tmovil.cl",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Movistar CO",
    "countryCode": "CO",
    "apnName": "internet.movistar.com.co",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Movistar ES",
    "countryCode": "ES",
    "apnName": "movistar.es",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Movistar MX",
    "countryCode": "MX",
    "apnName": "internet.movistar.mx",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Movistar PE",
    "countryCode": "PE",
    "apnName": "movistar.pe",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MTC Namibia",
    "countryCode": "NA",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MTN GH",
    "countryCode": "GH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MTN NG",
    "countryCode": "NG",
    "apnName": "internet.mtn.ng",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MTN RW",
    "countryCode": "RW",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MTN UG",
    "countryCode": "UG",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MTN ZA",
    "countryCode": "ZA",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "MTN ZM",
    "countryCode": "ZM",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "NetOne",
    "countryCode": "ZW",
    "apnName": "netone",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "NOS",
    "countryCode": "PT",
    "apnName": "internet.nos.pt",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "o2 DE",
    "countryCode": "DE",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "O2 UK",
    "countryCode": "GB",
    "apnName": "mobile.o2.co.uk",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Oi",
    "countryCode": "BR",
    "apnName": "gprs.oi.com.br",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Omantel",
    "countryCode": "OM",
    "apnName": "omantel",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "One NZ (Vodafone)",
    "countryCode": "NZ",
    "apnName": "vodafone",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Ooredoo KW",
    "countryCode": "KW",
    "apnName": "ooredoo",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Ooredoo OM",
    "countryCode": "OM",
    "apnName": "ooredoo.om",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Ooredoo QA",
    "countryCode": "QA",
    "apnName": "ooredoo.qa",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Optus",
    "countryCode": "AU",
    "apnName": "yesinternet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Orange BE",
    "countryCode": "BE",
    "apnName": "orangeinternet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Orange BW",
    "countryCode": "BW",
    "apnName": "orange",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Orange EG",
    "countryCode": "EG",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Orange ES",
    "countryCode": "ES",
    "apnName": "orangeworld",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Orange FR",
    "countryCode": "FR",
    "apnName": "orange",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Orange MA",
    "countryCode": "MA",
    "apnName": "orange",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Personal AR",
    "countryCode": "AR",
    "apnName": "datos.personal.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Proximus",
    "countryCode": "BE",
    "apnName": "internet.proximus.be",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Rogers",
    "countryCode": "CA",
    "apnName": "internet.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Safaricom",
    "countryCode": "KE",
    "apnName": "safaricom",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "SFR",
    "countryCode": "FR",
    "apnName": "sl2sfr",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Smart PH",
    "countryCode": "PH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Spark NZ",
    "countryCode": "NZ",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "stc BH",
    "countryCode": "BH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "STC KSA",
    "countryCode": "SA",
    "apnName": "jawalnet.com.sa",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "stc KW",
    "countryCode": "KW",
    "apnName": "viva",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "T-Mobile NL",
    "countryCode": "NL",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "T-Mobile US",
    "countryCode": "US",
    "apnName": "fast.t-mobile.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telcel",
    "countryCode": "MX",
    "apnName": "internet.itelcel.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telecel ZW",
    "countryCode": "ZW",
    "apnName": "telecel",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telekom DE",
    "countryCode": "DE",
    "apnName": "internet.telekom",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telkom Kenya",
    "countryCode": "KE",
    "apnName": "telkom",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telkom Mobile",
    "countryCode": "ZA",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telkomsel",
    "countryCode": "ID",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telstra",
    "countryCode": "AU",
    "apnName": "telstra.internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Telus",
    "countryCode": "CA",
    "apnName": "sp.telus.com",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Three UK",
    "countryCode": "GB",
    "apnName": "three.co.uk",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Tigo CO",
    "countryCode": "CO",
    "apnName": "web.colombiamovil.com.co",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Tigo TZ",
    "countryCode": "TZ",
    "apnName": "tigo",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "TIM",
    "countryCode": "IT",
    "apnName": "ibox.tim.it",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "TIM BR",
    "countryCode": "BR",
    "apnName": "tim.br",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "TN Mobile",
    "countryCode": "NA",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "TrueMove H",
    "countryCode": "TH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Turkcell",
    "countryCode": "TR",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Türk Telekom",
    "countryCode": "TR",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "US Cellular",
    "countryCode": "US",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Verizon",
    "countryCode": "US",
    "apnName": "vzwinternet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vi (Vodafone Idea)",
    "countryCode": "IN",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Viettel",
    "countryCode": "VN",
    "apnName": "v-internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vinaphone",
    "countryCode": "VN",
    "apnName": "vinaphone",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vivo",
    "countryCode": "BR",
    "apnName": "apn.vivo.com.br",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodacom",
    "countryCode": "ZA",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodacom TZ",
    "countryCode": "TZ",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone AU",
    "countryCode": "AU",
    "apnName": "vfinternet.au",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone DE",
    "countryCode": "DE",
    "apnName": "web.vodafone.de",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone EG",
    "countryCode": "EG",
    "apnName": "internet.vodafone.net",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone ES",
    "countryCode": "ES",
    "apnName": "ac.vodafone.es",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone GH",
    "countryCode": "GH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone IT",
    "countryCode": "IT",
    "apnName": "mobile.vodafone.it",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone NL",
    "countryCode": "NL",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone PT",
    "countryCode": "PT",
    "apnName": "internet.vodafone.pt",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone QA",
    "countryCode": "QA",
    "apnName": "web.vodafone.qa",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone TR",
    "countryCode": "TR",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Vodafone UK",
    "countryCode": "GB",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "WindTre",
    "countryCode": "IT",
    "apnName": "internet.wind",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "XL Axiata",
    "countryCode": "ID",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Zain BH",
    "countryCode": "BH",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Zain KSA",
    "countryCode": "SA",
    "apnName": "zain",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Zain KW",
    "countryCode": "KW",
    "apnName": "zain",
    "apnUser": "",
    "apnPassword": ""
  },
  {
    "name": "Zamtel",
    "countryCode": "ZM",
    "apnName": "internet",
    "apnUser": "",
    "apnPassword": ""
  }

];

/** Seeder */
export async function seedSimProviders(client: PrismaClient) {
  await client.simProvider.createMany({
    data: DATA.map((r) => ({
      name: r.name,
      countryCode: r.countryCode,
      apnName: r.apnName ?? null,
      apnUser: r.apnUser ?? null,
      apnPassword: r.apnPassword ?? null,
    })),
    skipDuplicates: true,
  });
  console.log(`✅ SIM providers seeded: ${DATA.length}`);
}

/** Run standalone */
if (require.main === module) {
  seedSimProviders(prisma)
    .catch((e) => {
      console.error('❌ Seeding failed:', e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
