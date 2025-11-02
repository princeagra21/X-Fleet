// prisma/seeds/seed-document-types.ts
// Run directly: npx ts-node prisma\seeds\seed-document-types.ts
// Or via orchestrator: npx prisma db seed

import { PrismaClient } from '../../generated/prisma-primary';
const prisma = new PrismaClient();

type Row = { name: string; doc_for: 'VEHICLE' | 'DRIVER' | 'USER' };

const DATA: Row[] = [
  // ===== VEHICLE =====
  { name: 'Vehicle Registration Certificate', doc_for: 'VEHICLE' }, // RC / Istimara / Mulkiya
  { name: 'Vehicle Title', doc_for: 'VEHICLE' },                     // US/CA
  { name: 'Road Tax / MV Tax', doc_for: 'VEHICLE' },
  { name: 'Motor Insurance - Third Party (TPL)', doc_for: 'VEHICLE' },
  { name: 'Motor Insurance - Comprehensive', doc_for: 'VEHICLE' },
  { name: 'Roadworthiness Inspection Certificate', doc_for: 'VEHICLE' }, // MOT / PTI / Fahes
  { name: 'Emissions / Pollution Certificate', doc_for: 'VEHICLE' },     // PUC / Smog
  { name: 'Fitness Certificate', doc_for: 'VEHICLE' },
  { name: 'National/State Permit', doc_for: 'VEHICLE' },
  { name: 'Interstate / IRP Cab Card', doc_for: 'VEHICLE' },             // US/CA
  { name: 'IFTA Decal / License', doc_for: 'VEHICLE' },
  { name: 'Hazardous Materials Permit', doc_for: 'VEHICLE' },
  { name: 'Oversize / Overweight Permit', doc_for: 'VEHICLE' },
  { name: 'International Travel Carnet (CPD)', doc_for: 'VEHICLE' },
  { name: 'Toll Tag / Transponder Registration', doc_for: 'VEHICLE' },    // FASTag / E-ZPass / Salik
  { name: 'Warranty Certificate', doc_for: 'VEHICLE' },
  { name: 'Maintenance / Service Record', doc_for: 'VEHICLE' },
  { name: 'Recall Notice', doc_for: 'VEHICLE' },
  { name: 'Tyre Certificate / Proof of Purchase', doc_for: 'VEHICLE' },
  { name: 'Reefer Calibration Certificate', doc_for: 'VEHICLE' },
  { name: 'Speed Limiter Certificate', doc_for: 'VEHICLE' },
  { name: 'Fire Extinguisher Service Certificate', doc_for: 'VEHICLE' },
  { name: 'Telematics SIM / APN Contract', doc_for: 'VEHICLE' },
  { name: 'AIS-140 Compliance Certificate', doc_for: 'VEHICLE' },         // India
  { name: 'Tachograph Calibration Certificate', doc_for: 'VEHICLE' },
  { name: 'Purchase Invoice', doc_for: 'VEHICLE' },

  // ===== DRIVER =====
  { name: 'Driver License', doc_for: 'DRIVER' },
  { name: 'License Endorsement - HAZMAT', doc_for: 'DRIVER' },
  { name: 'License Endorsement - Tanker', doc_for: 'DRIVER' },
  { name: 'National ID / Government ID', doc_for: 'DRIVER' },
  { name: 'Passport', doc_for: 'DRIVER' },
  { name: 'Visa / Work Permit', doc_for: 'DRIVER' },
  { name: 'Medical Fitness Certificate', doc_for: 'DRIVER' },
  { name: 'Drug & Alcohol Test Report', doc_for: 'DRIVER' },
  { name: 'Background Check / MVR', doc_for: 'DRIVER' },
  { name: 'Training Certificate - Defensive Driving', doc_for: 'DRIVER' },
  { name: 'Training Certificate - HAZMAT', doc_for: 'DRIVER' },
  { name: 'First Aid / CPR Certificate', doc_for: 'DRIVER' },
  { name: 'Tachograph Driver Card', doc_for: 'DRIVER' },                  // EU
  { name: 'Accident Report', doc_for: 'DRIVER' },
  { name: 'Violation / Penalty Notice', doc_for: 'DRIVER' },
  { name: 'Police Clearance Certificate', doc_for: 'DRIVER' },
  { name: 'Address Proof', doc_for: 'DRIVER' },

  // ===== USER (non-driver staff / KYC) =====
  { name: 'National ID / Government ID', doc_for: 'USER' },
  { name: 'PAN Card', doc_for: 'USER' },                                  // India
  { name: 'Address Proof', doc_for: 'USER' },
  { name: 'Passport', doc_for: 'USER' },
  { name: 'Employment Contract', doc_for: 'USER' },
  { name: 'NDA / Confidentiality Agreement', doc_for: 'USER' },
];

/** Seeder */
export async function seedDocumentTypes(client: PrismaClient) {
  await client.documentType.createMany({
    data: DATA.map((r) => ({
      name: r.name,
      docFor: r.doc_for, // matches Prisma enum DocFor
    })),
    // With your current schema (@unique on name), duplicates by name will be skipped.
    skipDuplicates: true,
  });
  console.log(`✅ Document types seeded: ${DATA.length}`);
}

/** Run standalone */
if (require.main === module) {
  seedDocumentTypes(prisma)
    .catch((e) => {
      console.error('❌ Seeding failed:', e);
      process.exitCode = 1;
    })
    .finally(async () => prisma.$disconnect());
}