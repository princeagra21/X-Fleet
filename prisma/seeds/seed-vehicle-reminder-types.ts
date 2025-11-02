// seed-vehicle-reminder-types.ts
import { PrismaClient } from '../../generated/prisma-primary';

const prisma = new PrismaClient();

// Literal unions matching your Prisma enums
type RecurrenceTypeL = 'TIME' | 'MILEAGE' | 'ENGINE_HOURS';
type AdvanceUnitL = 'DAYS' | 'KM' | 'HOURS';

type Row = {
  name: string;
  description?: string | null;
  recurrenceType: RecurrenceTypeL;   // TIME | MILEAGE | ENGINE_HOURS
  recurrenceInterval: number;
  notifyAdvanceValue: number;
  notifyAdvanceUnit: AdvanceUnitL;   // DAYS | KM | HOURS
  isActive?: boolean;
};

const DATA: Row[] = [
  {
    name: 'Oil Change',
    description: 'Replace engine oil',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 10_000,
    notifyAdvanceValue: 500,
    notifyAdvanceUnit: 'KM',
  },
  {
    name: 'Coolant Flush',
    description: 'Flush and refill engine coolant',
    recurrenceType: 'TIME',
    recurrenceInterval: 365,
    notifyAdvanceValue: 7,
    notifyAdvanceUnit: 'DAYS',
  },
  {
    name: 'Transmission Fluid Change',
    description: 'Replace gearbox/ATF fluid',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 40_000,
    notifyAdvanceValue: 1_000,
    notifyAdvanceUnit: 'KM',
  },
  {
    name: 'Brake Pad Replacement',
    description: 'Replace worn brake pads',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 20_000,
    notifyAdvanceValue: 500,
    notifyAdvanceUnit: 'KM',
  },
  {
    name: 'Brake Fluid Replacement',
    description: 'Replace hydraulic brake fluid',
    recurrenceType: 'TIME',
    recurrenceInterval: 730,
    notifyAdvanceValue: 14,
    notifyAdvanceUnit: 'DAYS',
  },
  {
    name: 'Tyre Rotation',
    description: 'Rotate tyres for even wear',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 10_000,
    notifyAdvanceValue: 500,
    notifyAdvanceUnit: 'KM',
  },
  {
    name: 'Tyre Replacement',
    description: 'Replace worn-out tyres',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 40_000,
    notifyAdvanceValue: 1_000,
    notifyAdvanceUnit: 'KM',
  },
  {
    name: 'Wheel Alignment & Balancing',
    description: 'Alignment and balancing service',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 10_000,
    notifyAdvanceValue: 500,
    notifyAdvanceUnit: 'KM',
  },
  {
    name: 'Air Filter Replacement',
    description: 'Replace engine air filter',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 15_000,
    notifyAdvanceValue: 500,
    notifyAdvanceUnit: 'KM',
  },
  {
    name: 'AC Service',
    description: 'AC gas & HVAC service',
    recurrenceType: 'TIME',
    recurrenceInterval: 365,
    notifyAdvanceValue: 7,
    notifyAdvanceUnit: 'DAYS',
  },
  {
    name: 'Vehicle Wash',
    description: 'Regular exterior cleaning',
    recurrenceType: 'MILEAGE',
    recurrenceInterval: 3_000,
    notifyAdvanceValue: 100,
    notifyAdvanceUnit: 'KM',
  },
];

/** Seeder */
export async function seedVehicleReminderTypes(client: PrismaClient) {
  await client.vehicleReminderType.createMany({
    data: DATA.map((r) => ({
      name: r.name,
      description: r.description ?? null,
      recurrenceType: r.recurrenceType, // now correctly typed
      recurrenceInterval: r.recurrenceInterval,
      notifyAdvanceValue: r.notifyAdvanceValue,
      notifyAdvanceUnit: r.notifyAdvanceUnit, // now correctly typed
      isActive: r.isActive ?? true,
    })),
    skipDuplicates: true,
  });
  console.log(`✅ Vehicle reminder types seeded: ${DATA.length}`);
}

/** Run standalone */
if (require.main === module) {
  seedVehicleReminderTypes(prisma)
    .catch((e) => {
      console.error('❌ Seeding failed:', e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
